import React from "react";
import { fetchUserData } from "@/actions/api";
import RoundsPageClient from "./_components/roundsPageClient";
import { notFound } from "next/navigation";

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

  if (!userData) {
    notFound(); // This will render the closest not-found page
  }

  return <RoundsPageClient initialUserData={userData} userId={params.userId} />;
}
