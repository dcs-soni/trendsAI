"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputElement from "@/components/InputElement";
import { AIImage } from "@/app/constants/constants";

export default function SubmitForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<"app" | "model">("app");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    websiteUrl: "",
    category: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const finalFormData = {
        ...formData,
        imageUrl: formData.imageUrl || AIImage,
        type: type,
      };

      const response = await fetch("/api/submissions/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalFormData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      alert("Submitted");

      router.push("/dashboard?status=submitted");
    } catch (error) {
      console.error("Error submitting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-4 mb-8">
          <button
            type="button"
            onClick={() => setType("app")}
            className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              type === "app"
                ? "bg-blue/20 text-blue"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}>
            AI Application
          </button>
          <button
            type="button"
            onClick={() => setType("model")}
            className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              type === "model"
                ? "bg-blue/20 text-blue"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}>
            AI Model
          </button>
        </div>

        <InputElement
          htmlFor="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={`Enter the name of the AI ${type}`}
          required>
          Name
        </InputElement>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full min-h-[100px] p-4 bg-white/5 border border-white/10 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue/50 focus:border-transparent transition-colors"
            placeholder={`Describe the AI ${type} and its features`}
            required
          />
        </div>

        <InputElement
          htmlFor="imageUrl"
          type="url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Enter the URL of an image representing your tool">
          Image URL (Optional)
        </InputElement>

        <InputElement
          htmlFor="websiteUrl"
          type="url"
          name="websiteUrl"
          value={formData.websiteUrl}
          onChange={handleChange}
          placeholder="Enter the website URL"
          required>
          Website URL
        </InputElement>

        <InputElement
          htmlFor="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder={`Enter the category of AI ${type}`}
          required>
          Category
        </InputElement>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue/60 to-green/60 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
          {isLoading ? "Submitting..." : "Submit for Review"}
        </button>

        <p className="text-sm text-gray-400 text-center mt-4">
          Your submission will be reviewed by our admins before being published.
        </p>
      </form>
    </div>
  );
}
