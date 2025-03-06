import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (user?.role !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const body = await req.json();
    const { status } = body;

    if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      return new NextResponse("Invalid status", { status: 400 });
    }

    const submission = await prisma.submission.findUnique({
      where: { id: params.id },
    });

    if (!submission) {
      return new NextResponse("Submission not found", { status: 404 });
    }

    // If approving, create the corresponding AI app or model
    if (status === "APPROVED") {
      if (submission.type === "app") {
        await prisma.aIApp.create({
          data: {
            name: submission.name,
            description: submission.description,
            imageUrl: submission.imageUrl,
            websiteUrl: submission.websiteUrl,
            category: submission.category,
          },
        });
      } else {
        await prisma.aIModel.create({
          data: {
            name: submission.name,
            description: submission.description,
            imageUrl: submission.imageUrl,
            websiteUrl: submission.websiteUrl,
            category: submission.category,
          },
        });
      }
    }

    const updatedSubmission = await prisma.submission.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json(updatedSubmission);
  } catch (error) {
    console.error("[SUBMISSION_STATUS_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
