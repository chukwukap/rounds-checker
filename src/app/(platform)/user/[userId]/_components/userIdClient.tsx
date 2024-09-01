"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";
import { UserRoundsData, Round } from "@/lib/types";
import { StatCard } from "./statCard";
import { TopEarnings } from "./topEarning";
import { RoundDetails } from "./roundDetails";
import { RecentRounds } from "./recentRounds";
import { useRootStore } from "@/components/providers/zustandStoresProvider";
import { EarningsDistribution } from "./earningDistribution";
import { useTokenPrices } from "@/hooks/useTokenPrices";

interface UserDetailsPageClientProps {
  userId: string;
  userRoundsInfo: UserRoundsData;
}

export default function UserIdClient({
  userId,
  userRoundsInfo,
}: UserDetailsPageClientProps) {
  const [selectedRound, setSelectedRound] = useState<Round | null>(null);
  const { user: _user } = useRootStore();
  const user = _user((state) => state);

  const hasParticipated = userRoundsInfo.roundsParticipated.length > 0;

  const { prices, loading: pricesLoading } = useTokenPrices([
    "ETH",
    ...userRoundsInfo.totalEarnings.map((e) => e.denomination),
  ]);

  const totalEarningsETH = useMemo(() => {
    if (pricesLoading || !prices.ETH) return 0;
    return userRoundsInfo.totalEarnings.reduce((sum, earning) => {
      const tokenPriceInUSD = prices[earning.denomination] || 0;
      return sum + (earning.amount * tokenPriceInUSD) / prices.ETH;
    }, 0);
  }, [userRoundsInfo.totalEarnings, prices, pricesLoading]);

  const totalEarningsUSD = totalEarningsETH * (prices.ETH || 0);

  const winRate = hasParticipated
    ? (
        (userRoundsInfo.winnings.length /
          userRoundsInfo.roundsParticipated.length) *
        100
      ).toFixed(2)
    : "N/A";

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-base-100 to-base-300 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-base-200 rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 mb-8 backdrop-blur-sm bg-opacity-80"
      >
        <div className="flex flex-col sm:flex-row items-center mb-6">
          <Image
            unoptimized
            src={user.profileImage}
            alt={`${user.userName}'s avatar`}
            width={96}
            height={96}
            className="rounded-full mb-4 sm:mb-0 sm:mr-6 border-4 border-primary"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary">
              {user.userName}
            </h1>
            <p className="text-lg sm:text-xl text-secondary">{userId}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <StatCard
            icon={
              <CurrencyDollarIcon className="w-8 h-8 sm:w-10 sm:h-10 text-success" />
            }
            title="Total Earnings"
            primaryValue={`${totalEarningsETH.toFixed(4)} ETH`}
            secondaryValue={`$${totalEarningsUSD.toFixed(2)} USD`}
            className="col-span-1 sm:col-span-2 lg:col-span-1"
          />
          <StatCard
            icon={
              <ChartBarIcon className="w-8 h-8 sm:w-10 sm:h-10 text-info" />
            }
            title="Rounds Participated"
            primaryValue={userRoundsInfo.roundsParticipated.length.toString()}
          />
          <StatCard
            icon={
              <TrophyIcon className="w-8 h-8 sm:w-10 sm:h-10 text-warning" />
            }
            title="Win Rate"
            primaryValue={`${winRate}%`}
          />
        </div>
      </motion.div>

      {hasParticipated ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-base-200 rounded-xl shadow-xl p-4 sm:p-6 backdrop-blur-sm bg-opacity-80"
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-primary">
                Earnings Distribution
              </h2>
              <EarningsDistribution data={userRoundsInfo.totalEarnings} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-base-200 rounded-xl shadow-xl p-4 sm:p-6 backdrop-blur-sm bg-opacity-80"
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-primary">
                Top 5 Earnings
              </h2>
              <TopEarnings
                winnings={userRoundsInfo.winnings}
                onBarClick={(round) => setSelectedRound(round)}
              />
            </motion.div>
          </div>

          {selectedRound && <RoundDetails round={selectedRound} />}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-base-200 rounded-xl shadow-xl p-4 sm:p-6 backdrop-blur-sm bg-opacity-80"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-primary">
              Recent Rounds
            </h2>
            <RecentRounds
              winnings={userRoundsInfo.winnings}
              onRowClick={(round) => setSelectedRound(round)}
            />
          </motion.div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-base-200 rounded-xl shadow-xl p-4 sm:p-6 backdrop-blur-sm bg-opacity-80 text-center"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-primary">
            No Rounds Participation Yet
          </h2>
          <p className="text-base sm:text-lg text-secondary mb-6">
            It looks like {user.userName} hasn&apos;t participated in any rounds
            yet. Check back later or explore available rounds to get started!
          </p>
          <motion.a
            href="https://rounds.wtf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-secondary text-secondary-content font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            Explore Available Rounds on rounds.wtf
          </motion.a>
        </motion.div>
      )}
    </div>
  );
}
