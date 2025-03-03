"use client";

import AICards from "@/components/AICards";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { AIApp, AIModel } from "./page";
import { motion } from "framer-motion";

// Ts infers id properties as string without "as const" but these strings are literal types
const tabs = [
  { id: "apps" as const, label: "AI Apps" },
  { id: "models" as const, label: "AI Models" },
];

interface DashboardClientProps {
  aiApps: AIApp[];
  aiModels: AIModel[];
  session: Session | null;
}

export default function DashboardClient({
  aiApps,
  aiModels,
  session,
}: DashboardClientProps) {
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
                  <span className="text-blue/40">{session?.user.name}</span>
                </p>
              </div>
            ) : (
              <div>
                <p>
                  <Link className="text-blue/40" href="/signin">
                    Sign in{" "}
                  </Link>

                  <span>
                    {" "}
                    to vote and comment for your favourite apps and models
                  </span>
                </p>
              </div>
            )}
          </div>

          {session && (
            <div>
              <button
                onClick={() => signOut({ callbackUrl: "/signin" })}
                className="ml-4 px-4 py-2 text-sm bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                Sign Out
              </button>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white/5 backdrop-blur-sm p-1 rounded-xl mb-8 max-w-xs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors
              ${
                activeTab === tab.id
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/10 rounded-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {session ? (
            <AICards
              activeTab={activeTab}
              aiApps={aiApps}
              aiModels={aiModels}
            />
          ) : (
            <>
              <AICards
                activeTab={activeTab}
                aiApps={aiApps.sort(() => Math.random() - 0.9).slice(0, 5)}
                aiModels={aiModels
                  .sort(() => Math.random() - 0.8)
                  .slice(0, 5)}></AICards>
              <div className="flex flex-col md:col-span-3 items-center justify-center gap-3 p-4 rounded-lg">
                <Link
                  href="/signin"
                  className="px-6 py-3 bg-gradient-to-br from-blue/60 to-green/60 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
                  Sign in
                </Link>
                <p className="text-gray-600 text-sm text-center">
                  To view and interact with all the AI Apps and Models.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="md:flex md:flex-col md:col-span-3 flex flex-col items-center justify-center gap-3 p-4 rounded-lg"> */
}
