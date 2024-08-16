"use server";

import { init, fetchQuery } from "@airstack/node";

// Initialize Airstack with your API key

// init(process.env.NEXT_PUBLIC_AIRSTACK_API_KEY || "");
init("1cdce8f5b28b94245b9e354dfbef9a1f5");
export async function searchFarcasterUsers(query: string) {
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
        }
      }
    }
  `;

  const variables = {
    query: `(?i)${query}`, // Case-insensitive regex
  };

  try {
    const response = await fetchQuery(graphqlQuery, variables);
    console.log("response", response);
    return response.data.Socials.Social.map((social: any) => ({
      fid: social.userId,
      username: social.profileName,
    }));
  } catch (error) {
    console.error("Error searching Farcaster users:", error);
    throw error;
  }
}
