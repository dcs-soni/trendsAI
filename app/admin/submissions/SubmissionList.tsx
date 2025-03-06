"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Submission {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
  type: string;
  status: string;
  createdAt: Date;
  user: {
    email: string;
    username: string;
  };
}

interface SubmissionListProps {
  submissions: Submission[];
}

export default function SubmissionList({ submissions }: SubmissionListProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleStatusUpdate = async (
    submissionId: string,
    newStatus: string
  ) => {
    try {
      setIsLoading(submissionId);
      const response = await fetch(`/api/submissions/${submissionId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      router.refresh();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsLoading(null);
    }
  };

  if (submissions.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No submissions found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {submissions.map((submission) => (
        <div
          key={submission.id}
          className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-white/10">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">{submission.name}</h3>
                <p className="text-sm text-gray-400">
                  Submitted by {submission.user.username} (
                  {submission.user.email})
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    submission.status === "PENDING"
                      ? "bg-yellow-500/20 text-yellow-500"
                      : submission.status === "APPROVED"
                      ? "bg-green-500/20 text-green-500"
                      : "bg-red-500/20 text-red-500"
                  }`}>
                  {submission.status}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(submission.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <p className="text-gray-300">{submission.description}</p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Type:</span>
                <span className="text-sm text-gray-400">
                  {submission.type === "app" ? "AI Application" : "AI Model"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Website:</span>
                <a
                  href={submission.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue hover:underline">
                  {submission.websiteUrl}
                </a>
              </div>
            </div>

            {submission.status === "PENDING" && (
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => handleStatusUpdate(submission.id, "APPROVED")}
                  disabled={isLoading === submission.id}
                  className="px-4 py-2 text-sm bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 transition-colors disabled:opacity-50">
                  {isLoading === submission.id ? "Updating..." : "Approve"}
                </button>
                <button
                  onClick={() => handleStatusUpdate(submission.id, "REJECTED")}
                  disabled={isLoading === submission.id}
                  className="px-4 py-2 text-sm bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50">
                  {isLoading === submission.id ? "Updating..." : "Reject"}
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
