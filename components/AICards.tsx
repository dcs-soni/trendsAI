"use client";

import { AIApp, AIModel } from "@/app/dashboard/page";
import Image from "next/image";
import Link from "next/link";
import LikeSVG from "@/components/icons/LikeSVG";
import { useSession } from "next-auth/react";
import { useState } from "react";
import React from "react";

interface CardContentProps {
  aiApps?: AIApp[];
  aiModels?: AIModel[];
  typeOfCards: "aiApps" | "aiModels";
}

const CardContent = ({
  aiApps = [],
  aiModels = [],
  typeOfCards,
}: CardContentProps) => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});
  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>(
    () => {
      const contentArray = typeOfCards === "aiApps" ? aiApps : aiModels;
      const liked: { [key: string]: boolean } = {};

      contentArray.forEach((item) => {
        liked[item.id] = item.votes.some(
          (vote) => vote.userId === session?.user?.id && vote.isLiked
        );
      });

      return liked;
    }
  );

  // Add local state for like counts
  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>(
    () => {
      const counts: { [key: string]: number } = {};
      const contentArray = typeOfCards === "aiApps" ? aiApps : aiModels;

      contentArray.forEach((item) => {
        counts[item.id] = item.votes.filter((v) => v.isLiked).length;
      });

      return counts;
    }
  );

  const handleLikeToggle = async (itemId: string) => {
    if (status === "loading") {
      return;
    }

    if (!session?.user?.id) {
      alert("Please sign in to like items");
      return;
    }

    try {
      setIsLoading((prev) => ({ ...prev, [itemId]: true }));
      const endpoint = typeOfCards === "aiApps" ? "apps" : "models";
      const isCurrentlyLiked = likedItems[itemId];
      const method = isCurrentlyLiked ? "DELETE" : "POST";

      const response = await fetch(`/api/${endpoint}/${itemId}/like`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        // Toggle the like state
        setLikedItems((prev) => ({
          ...prev,
          [itemId]: !isCurrentlyLiked,
        }));

        setLikeCounts((prev) => ({
          ...prev,
          [itemId]: prev[itemId] + (isCurrentlyLiked ? -1 : 1),
        }));
      } else if (response.status !== 400) {
        const errorData = await response.text();
        throw new Error(errorData || "Failed to update like status");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      alert(
        error instanceof Error ? error.message : "Failed to update like status"
      );
    } finally {
      setIsLoading((prev) => ({ ...prev, [itemId]: false }));
    }
  };

  const EmptyState = ({ type }: { type: string }) => (
    <div className="col-span-full py-12">
      <div className="text-center bg-white/5 rounded-2xl p-8 backdrop-blur-sm border-white/10 max-w-md mx-auto">
        <h3 className="text-xl font-semibold mb-2">No {type} Found</h3>
        <p className="text-gray-400">
          There are no AI {type} available at the moment.
        </p>
      </div>
    </div>
  );

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Determine which array and type to use based on typeOfCards
  const contentArray = typeOfCards === "aiApps" ? aiApps : aiModels;
  const emptyStateType = typeOfCards === "aiApps" ? "Apps" : "Models";

  // Check if the array is empty
  if (!contentArray || contentArray.length === 0) {
    return <EmptyState type={emptyStateType} />;
  }

  return contentArray.map((item) => {
    const likeCount = likeCounts[item.id] || 0;
    const isLiked = likedItems[item.id] || false;
    // const isItemLoading = isLoading[item.id] || false;

    return (
      <div
        key={item.id}
        className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
        <div className="relative h-40 mb-4 bg-white/5 rounded-xl overflow-hidden">
          <Image
            src={item.imageUrl || "/placeholder.png"}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
        <p className="text-gray-400 mb-4 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-400">
            Added {formatDate(item.createdAt)}
          </span>
          <span className="px-3 py-1 text-sm bg-white/5 rounded-full">
            {item.category}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleLikeToggle(item.id)}
              disabled={isLoading[item.id] || status === "loading"}
              className={`flex items-center gap-1 ${
                isLiked ? "text-red-500 fill-red-600" : "text-gray-400"
              } 
                hover:scale-110 transition-transform 
                
                `}>
              <LikeSVG isLiked={isLiked} />
              <span>{likeCount}</span>
            </button>
          </div>
          <Link
            href={item.websiteUrl}
            target="_blank"
            className="text-blue/60 hover:text-blue/80 transition-colors">
            Visit →
          </Link>
        </div>
      </div>
    );
  });
};

export default function AICards({
  activeTab,
  aiApps,
  aiModels,
}: {
  activeTab: "apps" | "models";
  aiApps: AIApp[];
  aiModels: AIModel[];
}) {
  return (
    <>
      {activeTab === "apps" ? (
        <CardContent typeOfCards="aiApps" aiApps={aiApps} />
      ) : (
        <CardContent typeOfCards="aiModels" aiModels={aiModels} />
      )}
    </>
  );
}
