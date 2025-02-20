import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/auth.config";

export async function POST(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    console.log("POST /api/models/[id]/like - Started");
    const session = await getServerSession(authOptions);
    const { id } = context.params;

    console.log("Session:", {
      exists: !!session,
      userId: session?.user?.id,
      userEmail: session?.user?.email,
    });

    if (!session?.user?.id) {
      console.log("Unauthorized - No session or user ID");
      return new NextResponse("Please sign in to like items", { status: 401 });
    }

    // Check if user has already liked this model
    const existingLike = await prisma.vote.findFirst({
      where: {
        userId: session.user.id,
        aiModelId: id,
      },
    });
    console.log("Existing like check:", { exists: !!existingLike });

    if (existingLike) {
      console.log("Already liked by user");
      return new NextResponse("Already liked", { status: 400 });
    }

    // Create new like
    const like = await prisma.vote.create({
      data: {
        userId: session.user.id,
        aiModelId: id,
        isLiked: true,
      },
    });
    console.log("Created like:", like);

    return NextResponse.json(like);
  } catch (error) {
    console.error("Error in POST /api/models/[id]/like:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    console.log("DELETE /api/models/[id]/like - Started");
    const session = await getServerSession(authOptions);
    const { id } = context.params;

    console.log("Session:", {
      exists: !!session,
      userId: session?.user?.id,
      userEmail: session?.user?.email,
    });

    if (!session?.user?.id) {
      console.log("Unauthorized - No session or user ID");
      return new NextResponse("Please sign in to unlike items", {
        status: 401,
      });
    }

    // First find the existing like
    const existingLike = await prisma.vote.findFirst({
      where: {
        userId: session.user.id,
        aiModelId: id,
      },
    });

    console.log("Found existing like:", existingLike);

    if (!existingLike) {
      console.log("Like not found");
      return new NextResponse("Like not found", { status: 404 });
    }

    // Delete the specific like using its ID
    const deletedLike = await prisma.vote.delete({
      where: {
        id: existingLike.id,
      },
    });

    console.log("Deleted like:", deletedLike);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error in DELETE /api/models/[id]/like:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
