import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Round } from "@/lib/types";

interface RoundDetailsProps {
  round: Round;
}

export const RoundDetails: React.FC<RoundDetailsProps> = ({ round }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="bg-base-200 rounded-xl shadow-xl p-6 mb-8 backdrop-blur-sm bg-opacity-80"
  >
    <h2 className="text-2xl font-bold mb-4 text-primary">
      Round Details: {round.name}
    </h2>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p>
          <strong>Start Date:</strong> {format(new Date(round.startsAt), "PPP")}
        </p>
        <p>
          <strong>Status:</strong> {round.status}
        </p>
        <p>
          <strong>Denomination:</strong> {round.denomination}
        </p>
      </div>
      <div>
        <p>
          <strong>Community ID:</strong> {round.communityId}
        </p>
        <p>
          <strong>Winners Reported:</strong>{" "}
          {round.areWinnersReported ? "Yes" : "No"}
        </p>
        <p>
          <strong>Token Address:</strong> {round.tokenAddress || "N/A"}
        </p>
      </div>
    </div>
  </motion.div>
);
