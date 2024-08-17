"use server";

import { init, fetchQuery } from "@airstack/node";

// Initialize Airstack with your API key
init(
  process.env.NEXT_PUBLIC_AIRSTACK_API_KEY ||
    "1cdce8f5b28b94245b9e354dfbef9a1f5"
);

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
        username: social.profileName,
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
