import React from "react";
import { fetchUserRoundsInfo } from "@/actions/api";
import UserIdClient from "./_components/userIdClient";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { userId: string };
}) {
  return {
    title: `${params.userId}'s Rounds | Rounds Caster`,
    description: `Check ${params.userId}'s participation and earnings in rounds.wtf events.`,
  };
}

export default async function RoundsPage({
  params,
}: {
  params: { userId: string };
}) {
  const userData = await fetchUserRoundsInfo(params.userId);
  console.log("userData", userData);

  if (!userData) {
    console.log("userData not found");
    notFound(); // This will render the closest not-found page
  }

  return <UserIdClient userRoundsInfo={userData} userId={params.userId} />;
}
