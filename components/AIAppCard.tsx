"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface AIAppCardProps {
  app: {
    createdAt: Date;
    imageUrl: string;
    name: string;
    websiteUrl: string;
    category: string;
    description: string;
    id: string;
    votes: {
      id: string;
      userId: string;
      isLiked: boolean;
      createdAt: Date;
    }[];

    comments: {
      id: string;
      content: string;
      username: {
        id: string;
        name: string;
        imageUrl: string;
      };
      createdAt: Date;
    }[];
  };
  isAuthenticated: boolean;
  currentUserId?: string;
}

export default function AIAppCard({
  app,
  isAuthenticated,
  currentUserId,
}: AIAppCardProps) {
  const [isLiked, setIsLiked] = useState(
    app.votes.some((vote) => vote.userId === currentUserId)
  );
  const [votesCount, setVotesCount] = useState(app.votes.length);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  // Handle like button click
  const handleLike = async () => {
    if (!isAuthenticated) {
      alert("Please sign in to like this app");
      return;
    }

    try {
      const response = await fetch(`/api/apps/${app.id}/like`, {
        method: isLiked ? "DELETE" : "POST",
      });

      if (response.ok) {
        setIsLiked(!isLiked);
        setVotesCount(isLiked ? votesCount - 1 : votesCount + 1);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  // Handle comment form submission
  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Please sign in to comment");
      return;
    }

    try {
      const response = await fetch(`/api/apps/${app.id}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        setNewComment("");
        // Refresh comments (can implement real-time updates with WebSocket, future release)
        window.location.reload();
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={app.imageUrl || "/default-app-image.png"}
          alt={app.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{app.name}</h2>
        <p className="text-gray-600 mb-4">{app.description}</p>

        <div className="flex items-center justify-between mb-4">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
            {app.category}
          </span>
          <Link
            href={app.websiteUrl}
            target="_blank"
            className="text-blue-600 hover:text-blue-800">
            Visit Website →
          </Link>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 ${
              isLiked ? "text-red-600" : "text-gray-600"
            }`}>
            <svg
              className="w-5 h-5"
              fill={isLiked ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>{votesCount}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1 text-gray-600">
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
            <span>{app.comments.length}</span>
          </button>
        </div>

        {showComments && (
          <div className="mt-4">
            <div className="space-y-2 mb-4">
              {app.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 p-2 rounded">
                  <div className="flex items-center gap-2 mb-1">
                    {comment.username.id && (
                      <Image
                        src={comment.username.imageUrl}
                        alt={comment.username.name}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    )}
                    <span className="font-medium text-sm">
                      {comment.username.name}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{comment.content}</p>
                </div>
              ))}
            </div>

            {isAuthenticated ? (
              <form onSubmit={handleComment} className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-1 border rounded"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  Post
                </button>
              </form>
            ) : (
              <p className="text-sm text-gray-500">
                Please{" "}
                <Link href="/auth/signin" className="text-blue-600">
                  sign in
                </Link>{" "}
                to comment
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
