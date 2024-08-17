"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Issue {
  title: string;
  state: string;
  user: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  body: string;
  labels: {
    id: number;
    name: string;
    color: string;
  }[];
}

const IssueDetails: React.FC<{ issueId: string }> = ({ issueId }) => {
  const [issue, setIssue] = useState<Issue | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIssue = async () => {
      if (!issueId) return; 

      try {
        const response = await axios.get(
          `https://api.github.com/repos/facebook/react/issues/${issueId}`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        if (response.data) {
          setIssue(response.data);
        } else {
          throw new Error("Empty response from server");
        }
      } catch (err: any) {
        console.error("Error fetching issue:", err.message || err);
        setError("Failed to fetch issue details. Please try again later.");
      }
    };

    fetchIssue();
  }, [issueId]);
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-xl">{error}</div>;
  }

  if (!issue) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-900 text-white p-8">
      {/* Issue Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{issue.title} #{issueId}</h1>
        <div className="flex items-center mt-2 text-gray-400">
          <span
            className={`px-2 py-1 rounded-full text-sm`}
            style={{ backgroundColor: issue.state === "closed" ? "purple" : "green" }}
          >
            {issue.state.charAt(0).toUpperCase() + issue.state.slice(1)}
          </span>
          <span className="ml-2">
            {issue.user.login} opened this issue on{" "}
            {new Date(issue.created_at).toLocaleDateString()} · {issue.labels.length} labels
          </span>
        </div>
      </div>

      {/* Comment Section */}
      <div className="flex items-start mb-6">
        {/* User Avatar */}
        <img
          src={issue.user.avatar_url}
          alt={issue.user.login}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div className="flex-1 bg-gray-800 p-4 rounded-md">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">
              {issue.user.login} commented on{" "}
              {new Date(issue.created_at).toLocaleDateString()}
            </span>
            <button className="text-gray-400 hover:text-gray-200">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 3a7 7 0 100 14 7 7 0 000-14zM8 8a1 1 0 112 0v2a1 1 0 01-2 0V8zM9 13a1 1 0 102 0 1 1 0 00-2 0z" />
              </svg>
            </button>
          </div>
          <div className="mt-4 text-gray-300">
            <p>{issue.body}</p>
            <ul className="mt-4 list-disc list-inside">
              {issue.labels.map((label) => (
                <li key={label.id} className="mt-2">
                  <strong>Label:</strong> {label.name}{" "}
                  <span
                    className="inline-block w-4 h-4 rounded-full"
                    style={{ backgroundColor: `#${label.color}` }}
                  ></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
