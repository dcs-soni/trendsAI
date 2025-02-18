import { Session } from "next-auth";
import Link from "next/link";
import { AIApp, AIModel } from "../dashboard/page";

interface AIAppWithVotes extends AIApp {
  _count: {
    votes: number;
  };
}

interface AIModelWithVotes extends AIModel {
  _count: {
    votes: number;
  };
}

interface AdminDashboardProps {
  session: Session | null;
  aiApps: AIAppWithVotes[];
  aiModels: AIModelWithVotes[];
  totalUsers: number;
}

export default function AdminDashboard({
  session,
  aiApps,
  aiModels,
  totalUsers,
}: AdminDashboardProps) {
  if (!session) {
    return <div>Loading....</div>;
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
            <h3 className="text-gray-400 mb-2">Total Apps</h3>
            <p className="text-4xl font-bold">{aiApps.length}</p>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
            <h3 className="text-gray-400 mb-2">Total Models</h3>
            <p className="text-4xl font-bold">{aiModels.length}</p>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
            <h3 className="text-gray-400 mb-2">Total Users</h3>
            <p className="text-4xl font-bold">{totalUsers}</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Apps */}
          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Recent Apps</h2>
            <div className="space-y-4">
              {aiApps.slice(0, 5).map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                  <div>
                    <h3 className="font-medium">{app.name}</h3>
                    <p className="text-sm text-gray-400">{app.category}</p>
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Models */}
          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Recent Models</h2>
            <div className="space-y-4">
              {aiModels.slice(0, 5).map((model) => (
                <div
                  key={model.id}
                  className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                  <div>
                    <h3 className="font-medium">{model.name}</h3>
                    <p className="text-sm text-gray-400">
                      {model._count.votes} votes
                    </p>
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date(model.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex gap-4">
          <Link
            href="/admin/aiApps"
            className="px-4 py-2 bg-green/20 text-green rounded-lg hover:bg-green/30 transition-colors">
            Manage Apps
          </Link>
          <Link
            href="/admin/aiModels"
            className="px-4 py-2 bg-blue/20 text-blue rounded-lg hover:bg-blue/30 transition-colors">
            Manage Models
          </Link>
        </div>
      </div>
    </div>
  );
}
