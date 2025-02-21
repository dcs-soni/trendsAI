import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/auth.config";
import { prisma } from "@/lib/prisma";
import ManageCategory from "../ManageCategory";
import { redirect } from "next/navigation";

export default async function AdminModelsPage() {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  const aiModels = await prisma.aIModel.findMany({
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
      <ManageCategory category="Model" aiCategory={aiModels} />
    )
  );
}
