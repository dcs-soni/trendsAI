import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import SubmissionList from "@/app/admin/submissions/SubmissionList";

export default async function SubmissionsPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });

  if (user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const submissions = await prisma.submission.findMany({
    include: {
      user: {
        select: {
          email: true,
          username: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">Manage Submissions</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Review and approve user submissions for AI applications and models.
          </p>
        </div>
        <SubmissionList submissions={submissions} />
      </div>
    </div>
  );
}
