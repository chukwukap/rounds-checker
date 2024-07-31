"use client";

import React, { useState, useEffect, useRef } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length > 2) {
        setIsLoading(true);
        // Replace this with an actual API call
        const mockSuggestions = ["user1", "user2", "user3"].filter((user) =>
          user.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setTimeout(() => {
          setSuggestions(mockSuggestions);
          setIsLoading(false);
        }, 500); // Simulating API delay
      } else {
        setSuggestions([]);
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error("Please enter a Farcaster handle");
      return;
    }

    toast.loading("Searching for " + searchQuery);
    // Here you would typically make an API call
    // For now, we'll simulate a search with a timeout
    setTimeout(() => {
      toast.success("Search completed for " + searchQuery);
      // Navigate to results page
      router.push(`/results?handle=${encodeURIComponent(searchQuery)}`);
    }, 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    inputRef.current?.focus();
  };

  const handleClearSearch = () => {
    setSearchQuery("");
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
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </Button>
      </form>
      {isFocused && searchQuery.length > 2 && (
        <div className="absolute mt-2 w-full bg-background rounded-lg shadow-lg border border-border overflow-hidden z-10">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <div
                key={suggestion}
                className="px-4 py-3 hover:bg-secondary cursor-pointer transition-colors duration-150"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-center">
                  <MagnifyingGlassIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{suggestion}</span>
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
