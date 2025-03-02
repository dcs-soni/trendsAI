import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/auth.config";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { name, description, imageUrl, websiteUrl, category } = body;

    if (!name || !description || !imageUrl || !websiteUrl || !category) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const newModel = await prisma.aIModel.create({
      data: {
        name,
        description,
        imageUrl,
        websiteUrl,
        category,
      },
    });

    return NextResponse.json(newModel);
  } catch (error) {
    console.error("Error adding AI model:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
