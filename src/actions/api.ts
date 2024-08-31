"use server";

import { UserRoundsData } from "@/lib/types";
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
// Type guard function to check if the data matches UserRoundsData interface
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
