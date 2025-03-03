import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/auth.config";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    const id = (await params).id;

    if (!params || !id) {
      return NextResponse.json(
        { error: "Missing or invalid ID" },
        { status: 400 }
      );
    }

    console.log("POST /api/apps/[id]/like - Started", { id });
    console.log("Session:", {
      exists: !!session,
      userId: session?.user?.id,
      userEmail: session?.user?.email,
    });

    if (!session?.user?.id) {
      console.log("Unauthorized - No session or user ID");
      return new NextResponse("Please sign in to like items", { status: 401 });
    }

    // Check if user has already liked this app
    const existingLike = await prisma.vote.findFirst({
      where: {
        userId: session.user.id,
        aiAppId: id,
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
        aiAppId: id,
        isLiked: true,
      },
    });
    console.log("Created like:", like);

    return NextResponse.json(like);
  } catch (error) {
    console.error("Error in POST /api/apps/[id]/like:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const id = (await params).id;

    if (!params || !id) {
      return NextResponse.json(
        { error: "Missing or invalid ID" },
        { status: 400 }
      );
    }

    console.log("DELETE /api/apps/[id]/like - Started", { id });
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

    // Find and delete the like
    const existingLike = await prisma.vote.findFirst({
      where: {
        userId: session.user.id,
        aiAppId: id,
      },
    });

    console.log("Found existing like:", existingLike);

    if (!existingLike) {
      console.log("Like not found");
      return new NextResponse("Like not found", { status: 404 });
    }

    // Delete the like
    const deletedLike = await prisma.vote.delete({
      where: {
        id: existingLike.id,
      },
    });

    console.log("Deleted like:", deletedLike);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error in DELETE /api/apps/[id]/like:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
