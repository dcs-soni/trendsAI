"use client";

import InputElement from "@/components/InputElement";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface AddModalProps {
  category: "App" | "Model";
  setShowAddModal: (show: boolean) => void;
}

export default function AddModal({ category, setShowAddModal }: AddModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    websiteUrl: "",
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = category === "App" ? "/api/apps/add" : "/api/models/add";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add item");
      }

      // Close modal and refresh the page
      setShowAddModal(false);
      router.refresh();
    } catch (error) {
      console.error("Error adding item:", error);
      alert(error instanceof Error ? error.message : "Failed to add item");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 w-full max-w-md relative">
        <button
          onClick={() => setShowAddModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white">
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6">Add New {category}</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputElement
            htmlFor="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={`${category} Name`}
            required>
            Name
          </InputElement>

          <InputElement
            htmlFor="description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required>
            Description
          </InputElement>

          <InputElement
            htmlFor="imageUrl"
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            required>
            Image URL
          </InputElement>

          <InputElement
            htmlFor="websiteUrl"
            type="url"
            name="websiteUrl"
            value={formData.websiteUrl}
            onChange={handleChange}
            placeholder="Website URL"
            required>
            Website URL
          </InputElement>

          <InputElement
            htmlFor="category"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            required>
            Category
          </InputElement>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-blue/20 text-blue rounded-lg hover:bg-blue/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? "Adding..." : `Add ${category}`}
          </button>
        </form>
      </div>
    </div>
  );
}
