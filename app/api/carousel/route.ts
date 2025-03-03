import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [aiApps, aiModels] = await Promise.all([
      prisma.aIApp.findMany({
        select: {
          id: true,
          name: true,
          imageUrl: true,
        },
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.aIModel.findMany({
        select: {
          id: true,
          name: true,
          imageUrl: true,
        },
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    return NextResponse.json({ aiApps, aiModels });
  } catch (error) {
    console.error("Error fetching carousel data:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
