import { authOptions } from "@/app/api/auth/auth.config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import ManageCategory from "../ManageCategory";
import { redirect } from "next/navigation";

export default async function AdminAIAppsPage() {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  const aiApps = await prisma.aIApp.findMany({
    include: {
      _count: {
        select: {
          votes: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    session?.user.role === "ADMIN" && (
      <ManageCategory aiCategory={aiApps} category="App" />
    )
  );
}
