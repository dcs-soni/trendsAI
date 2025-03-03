"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

interface AiItem {
  id: string;
  imageUrl: string;
  name: string;
}

export default function ImageCarousel() {
  const [aiApps, setAiApps] = useState<AiItem[]>([]);
  const [aiModels, setAiModels] = useState<AiItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("/api/carousel");

        if (!response.ok) {
          throw new Error("Failed to fetch carousel data");
        }

        const { aiApps, aiModels } = await response.json();
        setAiApps(aiApps);
        setAiModels(aiModels);
      } catch (error) {
        console.error("Error fetching carousel data:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load items"
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const allItems = [...aiApps, ...aiModels];

  if (isLoading) {
    return (
      <div className="relative w-full overflow-hidden h-24 mb-12">
        <div className="flex gap-4 items-center">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="relative w-20 h-20 flex-shrink-0 animate-pulse">
              <div className="absolute inset-0 rounded-full overflow-hidden bg-white/5 border-2 border-white/10" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 mb-12">
        Error loading carousel: {error}
      </div>
    );
  }

  if (allItems.length === 0) {
    return (
      <div className="text-center text-gray-400 mb-12">
        No items available for carousel
      </div>
    );
  }

  // Duplicate items to create a seamless loop
  const duplicatedItems = [...allItems, ...allItems, ...allItems];

  return (
    <div>
      {/* Moving Images Carousel */}
      <div
        className="relative w-full overflow-hidden h-10 my-14 border border-transparent rounded-full
      ">
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="absolute flex gap-4 items-center"
          style={{ width: "fit-content" }}>
          {duplicatedItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="relative w-10 h-10 flex-shrink-0">
              <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-white/10">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                  priority={index < 10}
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Gradient Overlays
        <div className="absolute left-0 top-0  w-16 h-24 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 w-16 h-24 bg-gradient-to-l from-black to-transparent z-10" /> */}
      </div>
    </div>
  );
}
