import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Winning } from "@/lib/types";

interface RecentRoundsProps {
  winnings: Winning[];
  ethPrice: number;
  onRowClick: (round: Winning["round"]) => void;
}

export const RecentRounds: React.FC<RecentRoundsProps> = ({
  winnings,
  ethPrice,
  onRowClick,
}) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="bg-base-300 text-primary">
          <th className="px-4 py-2 text-left rounded-tl-lg">Round</th>
          <th className="px-4 py-2 text-left">Earnings</th>
          <th className="px-4 py-2 text-left">Earnings (USD)</th>
          <th className="px-4 py-2 text-left rounded-tr-lg">Date</th>
        </tr>
      </thead>
      <tbody>
        {winnings.map((winning, index) => (
          <motion.tr
            key={index}
            className="border-b border-base-300 hover:bg-base-300 cursor-pointer transition-colors duration-200"
            onClick={() => onRowClick(winning.round)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <td className="px-4 py-3">{winning.round.name}</td>
            <td className="px-4 py-3">
              {winning.amount.toFixed(6)} {winning.round.denomination}
            </td>
            <td className="px-4 py-3">
              $
              {(
                winning.amount *
                (winning.round.denomination === "ETH" ? ethPrice : 1)
              ).toFixed(2)}
            </td>
            <td className="px-4 py-3">
              {format(new Date(winning.round.startsAt), "PP")}
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </div>
);
