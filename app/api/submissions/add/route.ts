import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email!,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const body = await req.json();
    const { name, description, imageUrl, websiteUrl, type, category } = body;

    const submission = await prisma.submission.create({
      data: {
        name,
        description,
        imageUrl,
        websiteUrl,
        type,
        category,
        status: "PENDING",
        userId: user.id,
      },
    });

    return NextResponse.json(submission);
  } catch (error) {
    console.error("[SUBMISSIONS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
