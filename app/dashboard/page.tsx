import { prisma } from "@/lib/prisma";
import DashboardClient from "./DashboardClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/auth.config";

export interface AIApp {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
  category: string;
  createdAt: Date;
  votes: {
    id: string;
    userId: string;
    isLiked: boolean;
  }[];
}

export interface AIModel {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
  category: string;
  createdAt: Date;
  votes: {
    id: string;
    userId: string;
    isLiked: boolean;
  }[];
}

async function getData() {
  const [aiApps, aiModels] = await Promise.all([
    prisma.aIApp.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        websiteUrl: true,
        category: true,
        createdAt: true,
        votes: {
          select: {
            id: true,
            userId: true,
            isLiked: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.aIModel.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        websiteUrl: true,
        category: true,
        createdAt: true,
        votes: {
          select: {
            id: true,
            userId: true,
            isLiked: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  return { aiApps, aiModels };
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/signin");
  // }

  const { aiApps, aiModels } = await getData();
  return (
    <DashboardClient aiApps={aiApps} aiModels={aiModels} session={session} />
  );
}
