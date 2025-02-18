import InputElement from "@/components/InputElement";
import { useState } from "react";

export default function AddModal({
  category,
  aiCategory,
  setShowAddModal,
}: {
  category: string;
  aiCategory: [];
  setShowAddModal: (show: boolean) => void;
}) {
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    imageUrl: "",
    websiteUrl: "",
    category: "",
  });

  const handleAddApp = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/admin/${aiCategory}`, {
        method: "POST",
        headers: {
          "Content-Type": "applocation/json",
        },
        body: JSON.stringify(newCategory),
      });

      if (response.ok) {
        setShowAddModal(false);
        setNewCategory({
          name: "",
          description: "",
          imageUrl: "",
          websiteUrl: "",
          category: "",
        });
        window.location.reload();
      }
    } catch (error) {
      console.error("Error adding app:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add New {category}</h2>
        <form onSubmit={handleAddApp} className="space-y-4">
          <div>
            <InputElement
              labelClassname="block text-sm font-medium text-gray-400 mb-1"
              className="py-2 rounded-lg"
              htmlFor="username"
              placeholder={`AI ${category} name`}
              type="text"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }>
              Name
            </InputElement>
          </div>
          <div>
            <InputElement
              labelClassname="block text-sm font-medium text-gray-400 mb-1"
              className="py-6 rounded-lg"
              htmlFor="description"
              placeholder={`AI ${category}'s description`}
              type="textarea"
              value={newCategory.description}
              onChange={(e) =>
                setNewCategory({ ...newCategory, description: e.target.value })
              }>
              Description
            </InputElement>
          </div>
          <div>
            <InputElement
              labelClassname="block text-sm font-medium text-gray-400 mb-1"
              className="py-2 rounded-lg"
              htmlFor="imageurl"
              placeholder={`AI ${category} URL`}
              type="url"
              value={newCategory.imageUrl}
              onChange={(e) =>
                setNewCategory({ ...newCategory, imageUrl: e.target.value })
              }>
              Image URL
            </InputElement>
          </div>
          <div>
            <InputElement
              labelClassname="block text-sm font-medium text-gray-400 mb-1"
              className="py-2 rounded-lg"
              htmlFor="websiteurl"
              placeholder={`AI ${category} website URL`}
              type="url"
              value={newCategory.websiteUrl}
              onChange={(e) =>
                setNewCategory({ ...newCategory, websiteUrl: e.target.value })
              }>
              Website URL
            </InputElement>
          </div>
          <div>
            <InputElement
              labelClassname="block text-sm font-medium text-gray-400 mb-1"
              className="py-2 rounded-lg"
              htmlFor="category"
              placeholder={`AI ${category} category`}
              type="text"
              value={newCategory.category}
              onChange={(e) =>
                setNewCategory({ ...newCategory, category: e.target.value })
              }>
              Category
            </InputElement>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Add {category}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
