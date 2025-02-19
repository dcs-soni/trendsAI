import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/auth.config";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminDashboard from "@/app/admin/AdminDashboard";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const [aiApps, aiModels, users] = await Promise.all([
    prisma.aIApp.findMany({
      include: {
        _count: {
          select: {
            votes: true,
          },
        },
        votes: {
          select: {
            id: true,
            userId: true,
            isLiked: true,
          },
        },
      },
    }),

    prisma.aIModel.findMany({
      include: {
        _count: {
          select: {
            votes: true,
          },
        },
        votes: {
          select: {
            id: true,
            userId: true,
            isLiked: true,
          },
        },
      },
    }),

    prisma.user.count(),
  ]);

  return (
    <AdminDashboard
      session={session}
      aiApps={aiApps}
      aiModels={aiModels}
      totalUsers={users}
    />
  );
}
