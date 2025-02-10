import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import AIAppCard from "@/components/AIAppCard";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  // Fetch AI apps and models from the database
  const aiApps = await prisma.aIApp.findMany({
    include: {
      votes: true,
      comments: {
        include: {
          username: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">trendAI</h1>
        {session && (
          <p className="text-gray-600">Welcome, {session.user?.name}!</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiApps.map((app) => (
          <AIAppCard
            key={app.id}
            app={app}
            isAuthenticated={!!session}
            currentUserId={session?.user?.id}
          />
        ))}
      </div>
    </div>
  );
}
