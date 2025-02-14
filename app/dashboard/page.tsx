"use client";

import AICards from "@/components/AICards";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export interface AIApp {
  id: string;
  type: string;
  name: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
  category: string;
  createdAt: Date;
  votes: { isLiked: boolean }[];
  comments: {
    id: string;
    content: string;
    username: {
      username: string;
    };
    createdAt: Date;
  }[];
}

export interface AIModel {
  id: string;
  name: string;
  type: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
  category: string;
  createdAt: Date;
  votes: { isLiked: boolean }[];
  comments: {
    id: string;
    content: string;
    username: {
      username: string;
    };
    createdAt: Date;
  }[];
}

interface DashboardProps {
  session: Session | null;
  aiApps: AIApp[];
  aiModels: AIModel[];
}

// Ts infers id properties as string without "as const"
const tabs = [
  { id: "apps" as const, label: "AI Apps" },
  { id: "models" as const, label: "AI Models" },
];

export default function Dashboard({
  aiApps = [],
  aiModels = [],
}: DashboardProps) {
  const { data: session, status } = useSession();

  const [activeTab, setActiveTab] = useState<"apps" | "models">("apps");

  return (
    <div className="min-h-screen bg-black text-white">
      {/* // Main Container // */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
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
              <Link href="/signin" className="text-blue/50 hover:text-blue/80">
                Sign In{" "}
              </Link>
              to vote and comment for your favourite apps and models
            </p>
          )}
        </div>

        {/* Tabs */}

        <div className="flex space-x-1 bg-white/5 backdrop-blur-sm p-1 rounded-xl mb-8 max-w-xs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={` flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors
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
