import React from "react";
import { fetchUserRoundsInfo } from "@/actions/api";
import UserIdClient from "./_components/userIdClient";
import { AlertCircle } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: { userId: string };
}) {
  return {
    title: `${params.userId}'s Rounds | Rounds Caster`,
    description: `Check your participation and earnings in rounds.wtf events.`,
  };
}

export default async function RoundsPage({
  params,
}: {
  params: { userId: string };
}) {
  const userData = await fetchUserRoundsInfo(params.userId);

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500" />
          <h1 className="text-2xl font-semibold">No Rounds Data Found</h1>
          <p className="text-muted-foreground">
            We couldn&apos;t find any rounds information for {params.userId}.
            This could mean:
          </p>
          <ul className="text-sm text-muted-foreground list-disc list-inside text-left">
            <li>The ID hasn&apos;t participated in any rounds yet</li>
            <li>There might be an issue with our data fetching</li>
            <li>The ID might be incorrect</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            Please verify the ID and try again later. If the issue persists,
            feel free to contact our support.
          </p>
        </div>
      </div>
    );
  }

  return <UserIdClient userRoundsInfo={userData} userId={params.userId} />;
}
