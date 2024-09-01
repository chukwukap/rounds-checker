"use client";

import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { Winning, Round } from "@/lib/types";
import { useTokenPrices } from "@/hooks/useTokenPrices";

interface TopEarningsProps {
  winnings: Winning[];
  onBarClick: (round: Round) => void;
}

export const TopEarnings: React.FC<TopEarningsProps> = ({
  winnings,
  onBarClick,
}) => {
  const tokens = useMemo(
    () => Array.from(new Set(winnings.map((w) => w.round.denomination))),
    [winnings]
  );
  const { prices, loading, error } = useTokenPrices(tokens);

  const { sortedData, totalEarningsETH } = useMemo(() => {
    if (loading || error || !prices.ETH)
      return { sortedData: [], totalEarningsETH: 0 };

    const convertedWinnings = winnings.map((winning) => {
      const tokenPriceInUSD = prices[winning.round.denomination] || 0;
      const ethPriceInUSD = prices.ETH;
      const valueInETH = (winning.amount * tokenPriceInUSD) / ethPriceInUSD;
      return {
        name: winning.round.name,
        amount: winning.amount,
        denomination: winning.round.denomination,
        valueInETH,
        round: winning.round,
      };
    });

    const totalEarningsETH = convertedWinnings.reduce(
      (sum, winning) => sum + winning.valueInETH,
      0
    );

    const sortedData = convertedWinnings
      .sort((a, b) => b.valueInETH - a.valueInETH)
      .slice(0, 5);

    return { sortedData, totalEarningsETH };
  }, [winnings, prices, loading, error]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="h-80">
      {" "}
      {/* Increased height to accommodate total earnings */}
      <h3 className="text-lg font-semibold mb-2">
        Total Earnings: {totalEarningsETH.toFixed(6)} ETH
      </h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={sortedData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(value, name, props) => [
              `${props.payload.valueInETH.toFixed(
                6
              )} ETH (${props.payload.amount.toFixed(6)} ${
                props.payload.denomination
              })`,
              name,
            ]}
          />
          <Bar
            dataKey="valueInETH"
            fill="#8884d8"
            onClick={(data) => onBarClick(data.round)}
          >
            <LabelList
              dataKey="valueInETH"
              position="top"
              formatter={(value: number) => `${value.toFixed(4)} ETH`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
