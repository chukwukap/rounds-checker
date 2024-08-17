"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";

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
];
const sortOptions = [
  { value: "earnings", label: "Earnings" },
  { value: "participations", label: "Participations" },
  { value: "winRate", label: "Win Rate" },
];

export default function LeaderboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [sortField, setSortField] = useState<keyof User>("earnings");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const usersPerPage = 10;
  const { theme } = useTheme();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setUsers(mockUsers);
      setIsLoading(false);
    }, 1000);
  };

  const sortedUsers = useMemo(() => {
    return users
      .sort((a, b) => {
        if (a[sortField] < b[sortField])
          return sortDirection === "asc" ? -1 : 1;
        if (a[sortField] > b[sortField])
          return sortDirection === "asc" ? 1 : -1;
        return 0;
      })
      .filter((user) =>
        user.handle.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [users, sortField, sortDirection, searchTerm]);

  const paginatedUsers = useMemo(() => {
    return sortedUsers.slice(
      (currentPage - 1) * usersPerPage,
      currentPage * usersPerPage
    );
  }, [sortedUsers, currentPage]);

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
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold mb-4 text-foreground">
            Rounds Checker Leaderboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover the top performers in the Rounds ecosystem
          </p>
        </motion.div>

        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-auto">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by handle"
              className="pl-10 pr-4 py-2 w-full md:w-64"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-4">
            <Select
              value={sortField}
              onValueChange={(value) => setSortField(value as keyof User)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={fetchUsers} variant="outline">
              <ArrowPathIcon className="w-5 h-5 mr-2" />
              Refresh
            </Button>
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
                        {sortField ===
                          header.toLowerCase().replace(" ", "") && (
                          <motion.div
                            initial={{ rotate: 0 }}
                            animate={{
                              rotate: sortDirection === "asc" ? 0 : 180,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronUpIcon className="w-4 h-4" />
                          </motion.div>
                        )}
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
                          <div className="flex items-center">
                            {user.rank <= 3 && (
                              <TrophyIcon
                                className={`w-5 h-5 mr-2 ${
                                  user.rank === 1
                                    ? "text-yellow-500"
                                    : user.rank === 2
                                    ? "text-gray-400"
                                    : "text-amber-600"
                                }`}
                              />
                            )}
                            {user.rank}
                          </div>
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
                          <div className="flex items-center">
                            <div
                              className="w-16 bg-muted rounded-full h-2 mr-2"
                              style={{
                                background: `linear-gradient(to right, ${
                                  theme === "dark" ? "#22c55e" : "#16a34a"
                                } ${user.winRate * 100}%, ${
                                  theme === "dark" ? "#3f3f46" : "#e5e7eb"
                                } ${user.winRate * 100}%)`,
                              }}
                            ></div>
                            {(user.winRate * 100).toFixed(2)}%
                          </div>
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
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="outline"
          >
            Previous
          </Button>
          <span className="text-sm font-medium text-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            variant="outline"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
