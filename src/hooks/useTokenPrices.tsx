import { tokenMapping } from "@/lib/constants";
import { useState, useEffect } from "react";

export const useTokenPrices = (tokens: string[]) => {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const ids = tokens.map((token) => token.toUpperCase()).join(",");

        const response = await fetch(`/api/tokenPrices?tokens=${ids}`);
        if (!response.ok) {
          throw new Error("Failed to fetch token prices");
        }
        const data = await response.json();
        const formattedPrices: Record<string, number> = {};

        tokens.forEach((token) => {
          const id = token.toUpperCase();
          if (data[tokenMapping[id]]) {
            formattedPrices[id] = data[tokenMapping[id]].usd;
          }
        });

        setPrices(formattedPrices);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    fetchPrices();
  }, [tokens]);

  return { prices, loading, error };
};
