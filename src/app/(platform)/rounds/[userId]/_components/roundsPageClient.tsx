"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  TrophyIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";

interface UserData {
  _id: string;
  farcasterId: string;
  roundsParticipated: string[];
  winnings: { fid: number; amount: number }[];
  totalEarnings: { denomination: string; amount: number }[];
}

interface RoundsPageClientProps {
  initialUserData: UserData;
  userId: string;
}

export default function RoundsPageClient({
  initialUserData,
  userId,
}: RoundsPageClientProps) {
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [ethPrice, setEthPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await fetchEthPrice();
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const fetchEthPrice = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      const data = await response.json();
      setEthPrice(data.ethereum.usd);
    } catch (error) {
      console.error("Error fetching ETH price:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ArrowPathIcon className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const totalEthEarnings = userData.totalEarnings[0].amount;
  const totalUsdEarnings = totalEthEarnings * ethPrice;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card rounded-lg shadow-lg p-6 mb-8"
      >
        <div className="flex items-center mb-6">
          <Image
            src={`https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_256/${userId}.png`}
            alt={`${userId}'s avatar`}
            width={64}
            height={64}
            className="rounded-full mr-4"
          />
          <div>
            <h1 className="text-3xl font-bold">{userId}</h1>
            <p className="text-muted-foreground">
              Farcaster ID: {userData.farcasterId}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={<CurrencyDollarIcon className="w-8 h-8 text-green-500" />}
            title="Total Earnings"
            value={`$${totalUsdEarnings.toFixed(2)}`}
            subtitle={`${totalEthEarnings.toFixed(6)} ETH`}
          />
          <StatCard
            icon={<ChartBarIcon className="w-8 h-8 text-blue-500" />}
            title="Rounds Participated"
            value={userData.roundsParticipated.length.toString()}
          />
          <StatCard
            icon={<TrophyIcon className="w-8 h-8 text-yellow-500" />}
            title="Win Rate"
            value={`${(
              (userData.winnings.length / userData.roundsParticipated.length) *
              100
            ).toFixed(2)}%`}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-card rounded-lg shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-4">Recent Rounds</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-2 text-left">Round</th>
                <th className="px-4 py-2 text-left">Earnings (ETH)</th>
                <th className="px-4 py-2 text-left">Earnings (USD)</th>
              </tr>
            </thead>
            <tbody>
              {userData.winnings.map((winning, index) => (
                <tr key={index} className="border-b border-muted">
                  <td className="px-4 py-2">
                    {userData.roundsParticipated[index]}
                  </td>
                  <td className="px-4 py-2">{winning.amount.toFixed(6)}</td>
                  <td className="px-4 py-2">
                    ${(winning.amount * ethPrice).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

const StatCard = ({
  icon,
  title,
  value,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle?: string;
}) => (
  <div className="bg-muted p-4 rounded-lg flex items-center">
    <div className="mr-4">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  </div>
);
