"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

interface User {
  rank: number;
  handle: string;
  avatar: string;
  earnings: number;
  participations: number;
  winRate: number;
}

const mockUsers: User[] = [
  {
    rank: 1,
    handle: "crypto_king",
    avatar: "https://i.pravatar.cc/150?img=1",
    earnings: 15000,
    participations: 50,
    winRate: 0.8,
  },
  {
    rank: 2,
    handle: "blockchain_queen",
    avatar: "https://i.pravatar.cc/150?img=2",
    earnings: 12000,
    participations: 45,
    winRate: 0.75,
  },
  {
    rank: 3,
    handle: "nft_collector",
    avatar: "https://i.pravatar.cc/150?img=3",
    earnings: 10000,
    participations: 40,
    winRate: 0.7,
  },
  // ... add more mock users
];

const CustomInput = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) => (
  <div className="relative">
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full py-2 px-4 pr-10 rounded-full bg-background border border-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
    />
    <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
  </div>
);

const CustomSelect = ({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="py-2 px-4 rounded-full bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
  >
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

const CustomButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className="py-2 px-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
  >
    {children}
  </button>
);

export default function LeaderboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [sortField, setSortField] = useState<keyof User>("earnings");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const usersPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    // Simulating API call
    setTimeout(() => {
      setUsers(mockUsers);
      setIsLoading(false);
    }, 1000);
  };

  const sortedUsers = users
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    })
    .filter((user) =>
      user.handle.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  const handleSort = (field: keyof User) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background py-20">
      <div className="container mx-auto px-4">
        <motion.h1
          className=" h-28 text-5xl font-bold mb-12 text-center text-foreground"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Rounds Checker Leaderboard
        </motion.h1>

        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <CustomInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by handle"
          />
          <div className="flex items-center gap-4">
            <CustomSelect
              value={sortField}
              onChange={(value) => setSortField(value as keyof User)}
              options={["earnings", "participations", "winRate"]}
            />
            <CustomButton onClick={fetchUsers}>
              <ArrowPathIcon className="w-5 h-5 mr-2 inline" />
              Refresh
            </CustomButton>
          </div>
        </div>

        <div className="bg-card rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  {[
                    "Rank",
                    "User",
                    "Earnings",
                    "Participations",
                    "Win Rate",
                  ].map((header, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                      onClick={() =>
                        handleSort(
                          header.toLowerCase().replace(" ", "") as keyof User
                        )
                      }
                    >
                      <div className="flex items-center gap-1">
                        {header}
                        {sortField === header.toLowerCase().replace(" ", "") &&
                          (sortDirection === "asc" ? (
                            <ChevronUpIcon className="w-4 h-4" />
                          ) : (
                            <ChevronDownIcon className="w-4 h-4" />
                          ))}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center">
                        <div className="flex justify-center items-center">
                          <ArrowPathIcon className="w-6 h-6 animate-spin text-primary" />
                          <span className="ml-2">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginatedUsers.map((user, index) => (
                      <motion.tr
                        key={user.handle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-muted/50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                          {user.rank}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                          <div className="flex items-center">
                            <Image
                              src={user.avatar}
                              alt={user.handle}
                              width={32}
                              height={32}
                              className="w-8 h-8 rounded-full mr-3"
                            />
                            {user.handle}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                          ${user.earnings.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                          {user.participations}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                          {(user.winRate * 100).toFixed(2)}%
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 flex justify-center items-center gap-4">
          <CustomButton
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </CustomButton>
          <span className="text-sm font-medium text-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <CustomButton
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
