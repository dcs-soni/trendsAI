"use client";

import AICards from "@/components/AICards";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { AIApp, AIModel } from "./page";

// Ts infers id properties as string without "as const" but these strings are literal types
const tabs = [
  { id: "apps" as const, label: "AI Apps" },
  { id: "models" as const, label: "AI Models" },
];

interface DashboardClientProps {
  aiApps: AIApp[];
  aiModels: AIModel[];
}

export default function DashboardClient({
  aiApps,
  aiModels,
}: DashboardClientProps) {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<"apps" | "models">("apps");

  return (
    <div className="min-h-screen bg-black text-white">
      {/* // Main Container // */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex justify-between ">
          <div>
            <h1 className="text-3xl font-bold">Explore</h1>

            {session ? (
              <div>
                <p>
                  Welcome back,{" "}
                  <span className="text-blue/40">{session.user?.name}</span>
                </p>
              </div>
            ) : (
              <p className="text-gray-400 mt-1">
                <Link
                  href="/signin"
                  className="text-blue/50 hover:text-blue/80">
                  Sign In{" "}
                </Link>
                to vote and comment for your favourite apps and models
              </p>
            )}
          </div>

          <div>
            {session && (
              <button
                onClick={() => signOut()}
                className="ml-4 px-4 py-2 text-sm bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                Sign Out
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white/5 backdrop-blur-sm p-1 rounded-xl mb-8 max-w-xs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors
              ${
                activeTab === tab.id
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}>
              <span className="relative">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AICards activeTab={activeTab} aiApps={aiApps} aiModels={aiModels} />
        </div>
      </div>
    </div>
  );
}
