import React from "react";
import { fetchUserData } from "@/actions/api";
import RoundsPageClient from "./_components/roundsPageClient";

export async function generateMetadata({
  params,
}: {
  params: { userId: string };
}) {
  return {
    title: `${params.userId}'s Rounds | Rounds Checker`,
    description: `Check ${params.userId}'s participation and earnings in rounds.wtf events.`,
  };
}

export default async function RoundsPage({
  params,
}: {
  params: { userId: string };
}) {
  const userData = await fetchUserData(params.userId);
  console.log("userData", userData);

  return <RoundsPageClient initialUserData={userData} userId={params.userId} />;
}
