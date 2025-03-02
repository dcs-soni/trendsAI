"use client";

import InputElement from "@/components/InputElement";
import { useEffect, useState } from "react";
import SearchSVG from "@/components/icons/SearchSVG";
import Image from "next/image";
import AddModal from "./AddModal";
import { useAIStore } from "../store/aiStore";

interface ManageCategoryProps {
  aiCategory: any;
  category: "App" | "Model";
}

interface CardProps {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
}

export default function ManageCategory({
  category,
  aiCategory,
}: ManageCategoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  //   const [editingCategory, setEditingCategory] = useState(null);

  const { setAIApps } = useAIStore();

  useEffect(() => {
    setAIApps(aiCategory);
  }, [aiCategory, setAIApps]);

  console.log("ai caegory", aiCategory);

  const filteredCategory = aiCategory.filter((app: CardProps) => {
    return app.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  console.log("Received aiCattegory", aiCategory);
  console.log("Filtered category", filteredCategory);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <InputElement
            htmlFor="search"
            placeholder="Search apps..."
            type="text"
            value={searchQuery}
            className="py-2"
            onChange={(e) => setSearchQuery(e.target.value)}>
            {""}
          </InputElement>
          <SearchSVG />
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="ml-4 px-4 py-2 bg-blue-500 text-blue rounded-lg bg-blue/20 hover:bg-blue/30 transition-colors">
          Add New {category}
        </button>
      </div>
      {/* // Apps or Cards displayed here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategory.map((card: CardProps) => (
          <div
            key={card.id}
            className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
            <div className="relative h-40 mb-4 bg-white/5 rounded-xl overflow-hidden">
              <Image
                src={card.imageUrl || "/placeholder.png"}
                alt={card.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">{card.name}</h3>
            <p className="text-gray-400 mb-4 line-clamp-2">
              {card.description}
            </p>
            <div className="flex justify-end gap-2">
              <button
                // onClick={() => setEditingCategory(category)}
                className="px-3 py-1 bg-blue-500/20 text-blue rounded-lg bg-blue/20 hover:bg-blue/30 transition-colors">
                Edit
              </button>
              {/* <button
                onClick={() => handleDelete(category.id)}
                className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                Delete
              </button> */}
            </div>
          </div>
        ))}
      </div>

      {/* Add Apps/Models modal  */}
      {showAddModal && (
        <AddModal category={category} setShowAddModal={setShowAddModal} />
      )}
    </div>
  );
}
