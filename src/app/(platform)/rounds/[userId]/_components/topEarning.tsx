import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TopEarningsProps {
  data: { name: string; usdAmount: number }[];
  onBarClick: (data: any) => void;
}

export const TopEarnings: React.FC<TopEarningsProps> = ({
  data,
  onBarClick,
}) => (
  <div className="h-48">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data.slice(0, 5)}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="usdAmount" fill="#8884d8" onClick={onBarClick} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);
