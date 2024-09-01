"use server";

import { TokenDenomination, UserRoundsData } from "@/lib/types";
import { init, fetchQuery } from "@airstack/node";

import { revalidatePath } from "next/cache";

init(
  process.env.NEXT_PUBLIC_AIRSTACK_API_KEY ||
    "1cdce8f5b28b94245b9e354dfbef9a1f5"
);

export async function searchFarcasterUsers(query: string) {
  console.log("query", query);
  const graphqlQuery = `
    query SearchFarcasterUsers($query: String!) {
      Socials(
        input: {
          filter: {
            dappName: { _eq: farcaster },
            profileName: { _regex: $query }
          },
          blockchain: ethereum,
          limit: 5
        }
      ) {
        Social {
          userId
          profileName
          profileImage
          
        }
      }
    }
  `;

  const variables = {
    query: `(?i)${query}`, // Case-insensitive regex
  };

  try {
    const response = await fetchQuery(graphqlQuery, variables);
    if (
      response &&
      response.data &&
      response.data.Socials &&
      response.data.Socials.Social
    ) {
      return response.data.Socials.Social.map((social: any) => ({
        fid: social.userId,
        userName: social.profileName,
        profileImage: social.profileImage,
      }));
    } else {
      console.warn("Unexpected API response structure:", response);
      return [];
    }
  } catch (error) {
    console.error("Error searching Farcaster users:", error);
    return [];
  }
}

export async function fetchUserRoundsInfo(
  userId: string
): Promise<UserRoundsData | null> {
  try {
    const response = await fetch(
      `https://rounds-checker.adaptable.app/api/v1/rounds/user?userId=${userId}`,
      {
        next: { revalidate: 60 },
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch user data: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const data: unknown = await response.json();

    if (!isUserRoundsData(data)) {
      console.log("data:", data);
      console.error(
        "Received data does not match expected UserRoundsData structure"
      );
      return null;
    }

    console.log("Data from API:", data);
    revalidatePath(`/user/${userId}`);
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

export async function fetchTokenPrices(
  denominations: TokenDenomination[]
): Promise<Record<string, number>> {
  const coinGeckoIds: Record<string, string> = {
    ETH: "ethereum",
    USDC: "usd-coin",
    // Add more mappings as needed
  };

  const uniqueDenominations = Array.from(new Set(denominations));
  const ids = uniqueDenominations
    .map((d) => coinGeckoIds[d])
    .filter(Boolean)
    .join(",");

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`,
      { next: { revalidate: 60 } } // Cache for 1 minute
    );

    if (!response.ok) {
      throw new Error(
        `CoinGecko API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    const prices: Record<string, number> = {};
    uniqueDenominations.forEach((denomination) => {
      const geckoId = coinGeckoIds[denomination];
      if (geckoId && data[geckoId]) {
        prices[denomination] = data[geckoId].usd;
      } else {
        console.warn(`Price not found for ${denomination}`);
        prices[denomination] = 0; // Default to 0 if price not found
      }
    });

    return prices;
  } catch (error) {
    console.error("Error fetching token prices:", error);
    // Return default prices in case of error
    return uniqueDenominations.reduce((acc, denomination) => {
      acc[denomination] = denomination === "USDC" ? 1 : 0;
      return acc;
    }, {} as Record<string, number>);
  }
}

function isUserRoundsData(data: unknown): data is UserRoundsData {
  return (
    typeof data === "object" &&
    data !== null &&
    "farcasterId" in data &&
    "roundsParticipated" in data &&
    "winnings" in data &&
    "totalEarnings" in data
  );
}
