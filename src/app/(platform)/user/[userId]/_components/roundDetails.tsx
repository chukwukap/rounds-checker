import React from "react";
import { Round } from "@/lib/types";

interface RoundDetailsProps {
  round: Round;
}

export function RoundDetails({ round }: RoundDetailsProps) {
  return (
    <div className="bg-base-200 rounded-xl shadow-xl p-6 mb-8 backdrop-blur-sm bg-opacity-80">
      <h2 className="text-2xl font-bold mb-4 text-primary">{round.name}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Round ID:</p>
          <p>{round.roundId}</p>
        </div>
        <div>
          <p className="font-semibold">Status:</p>
          <p>{round.status}</p>
        </div>
        <div>
          <p className="font-semibold">Token:</p>
          <p>{round.denomination}</p>
        </div>
        <div>
          <p className="font-semibold">Start Date:</p>
          <p>{new Date(round.startsAt).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="font-semibold">Winners Reported:</p>
          <p>{round.areWinnersReported ? "Yes" : "No"}</p>
        </div>
      </div>
    </div>
  );
}
