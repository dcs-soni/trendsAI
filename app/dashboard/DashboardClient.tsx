"use client";

import AICards from "@/components/AICards";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { AIApp, AIModel } from "./page";
import { motion } from "framer-motion";

// Add pagination utilities
const ITEMS_PER_PAGE = 20;

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

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
  const [currentPage, setCurrentPage] = useState(1);

  // Get current items based on pagination
  const getCurrentItems = () => {
    const items = activeTab === "apps" ? aiApps : aiModels;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  // Calculate total pages
  const totalItems = activeTab === "apps" ? aiApps.length : aiModels.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToTop();
  };

  // Reset page when tab changes
  const handleTabChange = (tab: "apps" | "models") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* // Main Container // */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex justify-between items-center">
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

          <div className="flex items-center gap-4">
            {session && (
              <>
                <Link
                  href="/submit"
                  className="px-4 py-2 text-sm bg-gradient-to-r from-blue/60 to-green/60 text-white rounded-lg hover:opacity-90 transition-opacity">
                  Submit AI Tool
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/signin" })}
                  className="px-4 py-2 text-sm bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white/5 backdrop-blur-sm p-1 rounded-xl mb-8 max-w-xs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
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
              aiApps={getCurrentItems()}
              aiModels={getCurrentItems()}
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

        {/* Pagination Controls */}
        {session && totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  currentPage === page
                    ? "bg-white/20 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
