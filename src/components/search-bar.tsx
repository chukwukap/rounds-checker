"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { searchFarcasterUsers } from "@/actions/api";
import debounce from "lodash/debounce";
import Image from "next/image";
import { useRootStore } from "./providers/zustandStoresProvider";
import { User } from "@/lib/types";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { user } = useRootStore();
  const setUser = user((state) => state.setUser);

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
      setIsLoading(true);
      try {
        const users = await searchFarcasterUsers(query);
        console.log("users", users);
        setSuggestions(users);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        toast.error("Failed to fetch suggestions");
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery, debouncedSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const user = suggestions.find(
        (user) =>
          user.userName.toLowerCase() === searchQuery.trim().toLowerCase()
      );
      if (user) {
        handleSuggestionClick(user);
      } else {
        toast.error(
          "User not found. Please select a user from the suggestions."
        );
      }
    }
  };

  const handleSuggestionClick = (user: User) => {
    // setUser(user.fid, user.userName);
    navigateToUserRounds(user.fid);
  };

  const navigateToUserRounds = (fid: string) => {
    router.push(`/user/${encodeURIComponent(fid)}`);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <form onSubmit={handleSearch} className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search your Farcaster handle"
          className="w-full pl-4 pr-12 py-6 text-lg rounded-full shadow-lg focus:ring-2 focus:ring-primary transition-all duration-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            className="absolute right-14 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full p-0"
            onClick={handleClearSearch}
          >
            <XMarkIcon className="h-5 w-5" />
          </Button>
        )}
        <Button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full transition-all duration-300"
          disabled={isLoading}
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </Button>
      </form>
      {isFocused && (searchQuery.length >= 3 || isLoading) && (
        <div className="absolute mt-2 w-full bg-background rounded-lg shadow-lg border border-border overflow-hidden z-10">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          ) : suggestions.length > 0 ? (
            suggestions.map((user) => (
              <div
                key={user.fid}
                className="px-4 py-3 hover:bg-secondary cursor-pointer transition-colors duration-150"
                onClick={() => handleSuggestionClick(user)}
              >
                <div className="flex items-center">
                  {user.profileImage ? (
                    <Image
                      unoptimized
                      src={user.profileImage}
                      alt={`${user.userName}'s profile`}
                      width={32}
                      height={32}
                      className="rounded-full mr-3"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-secondary rounded-full mr-3 flex items-center justify-center ">
                      <span className="text-secondary-content text-sm">
                        {user.userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className="text-secondary-content">
                    {user.userName}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-muted-foreground">
              No suggestions found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
