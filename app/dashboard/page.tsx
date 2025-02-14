"use client";

import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface AIApp {}

interface AIModel {}

interface DashboardProps {
  session: Session | null;
  aiApps: AIApp[];
  aiModels: AIModel[];
}

export default function Dashboard({
  aiApps = [],
  aiModels = [],
}: DashboardProps) {
  const { data: session, status } = useSession();

  console.log(session);
  console.log(status);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div>
          <h1 className="text-3xl font-bold">Explore</h1>
          {session ? (
            <div>
              <p>Welcome back, {session.user?.name}</p>
            </div>
          ) : (
            <p>
              <Link href="/signin" className="text-blue/40 hover:text-blue/80">
                Sign In
              </Link>
              to vote and comment for your favourite apps and models
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
