import { AIApp, AIModel } from "@/app/dashboard/page";
import Image from "next/image";
import Link from "next/link";

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

  return contentArray.map((category) => (
    <div
      key={category.id}
      className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
      <div className="relative h-40 mb-4 bg-white/5 rounded-xl overflow-hidden">
        <Image
          src={category.imageUrl || "/placeholder.png"}
          alt={category.name}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
      <p className="text-gray-400 mb-4 line-clamp-2">{category.description}</p>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-400">
          Added {formatDate(category.createdAt)}
        </span>
        <span className="px-3 py-1 text-sm bg-white/5 rounded-full">
          {/* Here second category is the category defined while creating apps and models on dashboard */}
          {category.category}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-gray-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>{category.votes.filter((v) => v.isLiked).length}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            {/* <span>{category?.comments.length}</span> */}
          </div>
        </div>
        <Link
          href={category.websiteUrl}
          target="_blank"
          className="text-blue-400 hover:text-blue-300 transition-colors">
          Visit →
        </Link>
      </div>
    </div>
  ));
};

export default function AICards({
  activeTab,
  aiApps,
  aiModels,
}: {
  aiApps?: AIApp[];
  aiModels?: AIModel[];
  activeTab: "apps" | "models";
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
