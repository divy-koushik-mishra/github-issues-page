"use client";
import { RiCheckFill } from "@remixicon/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, ChangeEvent } from "react";

interface Issue {
  id: number;
  title: string;
  number: number;
  created_at: string;
  user: {
    login: string;
  };
  state: string;
}

const IssuesTable: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  const fetchIssues = async () => {
    try {
      const response = await axios.get<Issue[]>(
        "https://api.github.com/repos/facebook/react/issues",
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
      setIssues(response.data);
      setFilteredIssues(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleClick = (issueNumber: number) => {
    router.push(`/issue/${issueNumber}`);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      const filtered = issues.filter(issue =>
        issue.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredIssues(filtered);
    } else {
      setFilteredIssues(issues);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="px-24 py-10">
      <div className="flex items-center bg-[#0d1117] p-2 rounded-lg">
        <div className="relative">
          <button className="bg-[#21262d] text-white text-sm font-semibold py-3 px-3 rounded-l-md border border-[#30363d]">
            Filters
            <span className="ml-1">▼</span>
          </button>
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="bg-[#0d1117] text-white text-sm px-3 py-3 border-t border-b border-r border-[#30363d] rounded-r-md focus:outline-none focus:border-blue-500 flex-grow"
          placeholder="Search issues"
        />

        <button className="bg-[#21262d] text-white text-sm font-semibold py-3 px-3 rounded-md ml-2 border border-[#30363d] flex items-center cursor-not-allowed">
          <svg
            className="h-4 w-4 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M2.166 9.142l6.62-6.62a4.5 4.5 0 116.364 6.364l-6.62 6.621a1.5 1.5 0 01-2.121 0L2.165 11.264a1.5 1.5 0 010-2.122l.001-.001zM9.28 6.707l-.707-.707a3 3 0 10-4.243 4.243l5.657 5.656a.5.5 0 00.707 0l6.621-6.621a3 3 0 10-4.243-4.243l-.707.707-2.828-2.828 1.415-1.414L14.828 3l2.829-2.829-1.415-1.415L12.414 3 9.28 6.707z"
              clipRule="evenodd"
            ></path>
          </svg>
          Labels
          <span className="ml-1 bg-gray-600 text-xs rounded-full px-2">71</span>
        </button>

        <button className="bg-[#21262d] text-white text-sm font-semibold py-3 px-3 rounded-md ml-2 border border-[#30363d] cursor-not-allowed flex items-center">
          <svg
            className="h-4 w-4 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 2C6.686 2 4 4.686 4 8s2.686 6 6 6 6-2.686 6-6S13.314 2 10 2zm0 11a4.978 4.978 0 01-3.536-1.464 4.978 4.978 0 01-1.464-3.536c0-1.403.548-2.74 1.464-3.536A4.978 4.978 0 0110 4c1.403 0 2.74.548 3.536 1.464A4.978 4.978 0 0115 8c0 1.403-.548 2.74-1.464 3.536A4.978 4.978 0 0110 13zm4-2a1 1 0 11-2 0 1 1 0 012 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          Milestones
          <span className="ml-1 bg-gray-600 text-xs rounded-full px-2">1</span>
        </button>

        <button className="bg-green-600 text-white text-sm font-semibold py-3 px-4 rounded-md ml-2">
          New issue
        </button>
      </div>

      <div className="bg-[#161B22] text-white p-6 my-5">
        <div className="container mx-auto">
          <div className="flex justify-between items-center pb-4">
            <div className="flex items-center space-x-4">
              <p className="text-2xl font-bold">673 Open</p>
              <p className="text-gray-400 flex items-center">
                <RiCheckFill /> 12,413 Closed
              </p>
            </div>
          </div>

          <div className="bg-[#0D1116] rounded-lg shadow-md">
            <div className="divide-y divide-gray-700">
              {filteredIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="flex items-center p-4 hover:bg-gray-700 transition cursor-pointer"
                  onClick={() => handleClick(issue.number)}
                >
                  <div className="text-green-400 flex-shrink-0">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2l4-4"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 20c4.418 0 8-3.582 8-8S16.418 4 12 4S4 7.582 4 12s3.582 8 8 8z"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-white">{issue.title}</p>
                    <p className="text-gray-400">{`${issue.number} opened ${new Date(issue.created_at).toLocaleDateString()} by ${issue.user.login}`}</p>
                  </div>
                  <div className="ml-auto flex space-x-2">
                    <span className="bg-gray-700 text-purple-400 rounded-full px-2 py-1 text-xs font-medium">
                      Status: {issue.state}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuesTable;
