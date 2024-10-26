import { TokenRow, TokenChip } from "@coinbase/onchainkit/token";
import { getTokens } from "@coinbase/onchainkit/api";
import type { Token } from "@coinbase/onchainkit/token";
import { useState, useCallback, useRef } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { useOnClickOutside } from "@/hooks/useClickOutside";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import debounce from "lodash/debounce";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";

interface EnhancedTokenSearchProps {
  onTokenSelect: (token: Token | null) => void;
  selectedToken?: Token | null;
  label?: string;
}

export const EnhancedTokenSearch = ({
  onTokenSelect,
  selectedToken: propSelectedToken,
  label = "Select Token",
}: EnhancedTokenSearchProps) => {
  const [searchResults, setSearchResults] = useState<Token[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const handleSearch = useCallback(
    debounce(async (value: string) => {
      if (value.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const tokens = await getTokens({ search: value, limit: "10" });
        if (Array.isArray(tokens)) {
          setSearchResults(tokens);
          setIsOpen(true);
        }
      } catch (error) {
        console.error("Error fetching tokens:", error);
        toast.error("Failed to fetch tokens");
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    handleSearch(value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setSearchResults([]);
    onTokenSelect(null);
    inputRef.current?.focus();
  };

  const handleTokenSelect = (token: Token) => {
    onTokenSelect(token);
    setSearchValue(token.symbol);
    setIsOpen(false);
    toast.success(`Selected ${token.name}`);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="flex items-center gap-2">
        {propSelectedToken && (
          <TokenChip token={propSelectedToken} className="min-w-[120px]" />
        )}
        <div className="flex-1 relative">
          <Input
            ref={inputRef}
            value={searchValue}
            onChange={handleInputChange}
            placeholder="Search tokens by name or symbol..."
            className="w-full pl-4 pr-20"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {searchValue && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={handleClearSearch}
              >
                <XMarkIcon className="h-4 w-4" />
              </Button>
            )}
            <MagnifyingGlassIcon className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (searchValue.length >= 2 || isLoading) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-popover rounded-md shadow-lg border border-border max-h-[300px] overflow-y-auto"
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
              </div>
            ) : searchResults.length > 0 ? (
              <Command>
                <Command.List>
                  {searchResults.map((token) => (
                    <Command.Item
                      key={`${token.chainId}-${token.address}`}
                      onSelect={() => handleTokenSelect(token)}
                      className="flex items-center gap-2 p-2 hover:bg-accent cursor-pointer"
                    >
                      <TokenRow token={token} />
                    </Command.Item>
                  ))}
                </Command.List>
              </Command>
            ) : (
              <div className="px-4 py-3 text-muted-foreground text-center">
                No tokens found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
