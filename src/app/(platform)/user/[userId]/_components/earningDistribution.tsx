import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { TotalEarning } from "@/lib/types";
import { useTokenPrices } from "@/hooks/useTokenPrices";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

interface EarningsDistributionProps {
  data: TotalEarning[];
}

export const EarningsDistribution: React.FC<EarningsDistributionProps> = ({
  data,
}) => {
  const tokens = useMemo(
    () => Array.from(new Set(data.map((item) => item.denomination))),
    [data]
  );
  const { prices, loading, error } = useTokenPrices(tokens);

  const chartData = useMemo(() => {
    if (loading || error || !prices.ETH) return [];
    return data.map((item, index) => {
      const tokenPriceInUSD = prices[item.denomination] || 0;
      const ethPriceInUSD = prices.ETH;
      const valueInETH = (item.amount * tokenPriceInUSD) / ethPriceInUSD;
      return {
        ...item,
        color: COLORS[index % COLORS.length],
        valueInETH,
      };
    });
  }, [data, prices, loading, error]);

  const formatValue = (
    amount: number,
    denomination: string,
    valueInETH: number
  ) => {
    return `${amount.toFixed(6)} ${denomination} (${valueInETH.toFixed(
      6
    )} ETH)`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="valueInETH"
            label={({ denomination, percent }) =>
              `${denomination} ${(percent * 100).toFixed(0)}%`
            }
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name, { payload }) => [
              formatValue(
                payload.amount,
                payload.denomination,
                payload.valueInETH
              ),
              payload.denomination,
            ]}
          />
          <Legend
          // formatter={(value, entry) => `${entry.payload.denomination}`}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
