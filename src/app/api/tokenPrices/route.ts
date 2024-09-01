import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tokens = searchParams.get("tokens");

  if (!tokens) {
    return NextResponse.json(
      { error: "Invalid tokens parameter" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${tokens}&vs_currencies=usd`,
      {
        headers: {
          "Cache-Control": "s-maxage=300, stale-while-revalidate=59",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch token prices");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching token prices:", error);
    return NextResponse.json(
      { error: "Failed to fetch token prices" },
      { status: 500 }
    );
  }
}
