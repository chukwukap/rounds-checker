import React from "react";
import { Winning, Round } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface RecentRoundsProps {
  winnings: Winning[];
  onRowClick: (round: Round) => void;
}

export function RecentRounds({ winnings, onRowClick }: RecentRoundsProps) {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Round Name</th>
            <th>Earnings</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {winnings.slice(0, 5).map((winning, index) => (
            <tr
              key={index}
              className="hover:bg-base-300 cursor-pointer"
              onClick={() => onRowClick(winning.round)}
            >
              <td>{winning.round.name}</td>
              <td>{`${formatNumber(winning.amount)} ${
                winning.round.denomination
              }`}</td>
              <td>{new Date(winning.round.startsAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
