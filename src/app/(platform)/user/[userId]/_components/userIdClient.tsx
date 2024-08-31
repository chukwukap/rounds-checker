"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  TrophyIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
// import { useFarcasterUser } from "@/contexts/user";
import { fetchUserRoundsInfo } from "@/actions/api";
import { toast } from "sonner";
import { UserRoundsData, Round } from "@/lib/types";
import { StatCard } from "./statCard";
import { EarningsDistribution } from "./earningDistribution";
import { TopEarnings } from "./topEarning";
import { RoundDetails } from "./roundDetails";
import { RecentRounds } from "./recentRounds";
import Link from "next/link";
import { useRootStore } from "@/components/providers/zustandStoresProvider";

interface UserDetailsPageClientProps {
  userId: string;
  userRoundsInfo: UserRoundsData;
}

export default function UserIdClient({
  userId,
  userRoundsInfo,
}: UserDetailsPageClientProps) {
  const [ethPrice, setEthPrice] = useState(0);
  const [selectedRound, setSelectedRound] = useState<Round | null>(null);
  const { user: _user, rounds: _rounds, ui: _ui } = useRootStore();
  const ui = _ui((state) => state);

  const rounds = _rounds((state) => state);

  const { setUser, userName, profileImage } = _user((state) => state);

  // useEffect(() => {
  //   const getUserRoundsInfo = async () => {
  //     try {
  //       ui.setLoading(true);

  //       const data = await fetchUserRoundsInfo(userId);
  //       if (data) {
  //         // rounds.(data);
  //         console.log(data);
  //       } else {
  //         toast.error("Failed to fetch user data. Please try again later.");
  //       }
  //     } catch (error) {
  //       toast.error("Failed to load user data. Please try again later.");
  //     } finally {
  //       ui.setLoading(false);
  //     }
  //   };

  //   getUserRoundsInfo();
  // }, [userId]);

  const fetchEthPrice = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      const data = await response.json();
      console.log("ethPrice data: ", data);
      setEthPrice(data.ethereum.usd);
    } catch (error) {
      console.error("Error fetching ETH price:", error);
      toast.error("Failed to fetch ETH price. Using default value.");
      setEthPrice(2000); // Fallback to a default value
    }
  };

  const totalEthEarnings =
    userRoundsInfo.totalEarnings.find((e) => e.denomination === "ETH")
      ?.amount ?? 0;
  const totalUsdEarnings = totalEthEarnings * ethPrice;

  const winningsByDenomination = userRoundsInfo.winnings.reduce(
    (acc, winning) => {
      const { denomination } = winning.round;
      acc[denomination] = (acc[denomination] || 0) + winning.amount;
      return acc;
    },
    {} as Record<string, number>
  );

  const pieChartData = Object.entries(winningsByDenomination).map(
    ([name, value]) => ({ name, value })
  );

  const barChartData = userRoundsInfo.winnings.map((winning) => ({
    name: winning.round.name,
    amount: winning.amount,
    usdAmount:
      winning.round.denomination === "ETH"
        ? winning.amount * ethPrice
        : winning.amount,
  }));

  const hasParticipated = userRoundsInfo.roundsParticipated.length > 0;

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-base-100 to-base-300 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-base-200 rounded-xl shadow-2xl p-8 mb-8 backdrop-blur-sm bg-opacity-80"
      >
        <div className="flex items-center mb-6">
          <Image
            src={"https://placehold.co/600x400/png"}
            alt={`${userRoundsInfo.farcasterId || userId}'s avatar`}
            unoptimized={true}
            width={96}
            height={96}
            className="rounded-full mr-6 border-4 border-primary"
          />
          <div>
            <h1 className="text-4xl font-bold text-primary">
              {userRoundsInfo.farcasterId || userId}
            </h1>
            <p className="text-xl text-secondary">
              Farcaster ID: {userRoundsInfo.farcasterId || "N/A"}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard
            icon={<CurrencyDollarIcon className="w-10 h-10 text-success" />}
            title="Total Earnings"
            value={hasParticipated ? `$${totalUsdEarnings.toFixed(2)}` : "N/A"}
            subtitle={
              hasParticipated
                ? `${totalEthEarnings.toFixed(6)} ETH`
                : "No earnings yet"
            }
          />
          <StatCard
            icon={<ChartBarIcon className="w-10 h-10 text-info" />}
            title="Rounds Participated"
            value={userRoundsInfo.roundsParticipated.length.toString()}
          />
          <StatCard
            icon={<TrophyIcon className="w-10 h-10 text-warning" />}
            title="Win Rate"
            value={
              hasParticipated
                ? `${(
                    (userRoundsInfo.winnings.length /
                      userRoundsInfo.roundsParticipated.length) *
                    100
                  ).toFixed(2)}%`
                : "N/A"
            }
          />
        </div>
      </motion.div>

      {hasParticipated ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-base-200 rounded-xl shadow-xl p-6 backdrop-blur-sm bg-opacity-80"
            >
              <h2 className="text-2xl font-bold mb-4 text-primary">
                Earnings Distribution
              </h2>
              <EarningsDistribution data={pieChartData} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-base-200 rounded-xl shadow-xl p-6 backdrop-blur-sm bg-opacity-80"
            >
              <h2 className="text-2xl font-bold mb-4 text-primary">
                Top 5 Earnings
              </h2>
              <TopEarnings
                data={barChartData}
                onBarClick={(data) => {
                  const round = userRoundsInfo.winnings.find(
                    (w) => w.round.name === data.name
                  )?.round;
                  setSelectedRound(round || null);
                }}
              />
            </motion.div>
          </div>

          <AnimatePresence>
            {selectedRound && <RoundDetails round={selectedRound} />}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-base-200 rounded-xl shadow-xl p-6 backdrop-blur-sm bg-opacity-80"
          >
            <h2 className="text-2xl font-bold mb-4 text-primary">
              Recent Rounds
            </h2>
            <RecentRounds
              winnings={userRoundsInfo.winnings}
              ethPrice={ethPrice}
              onRowClick={(round) => setSelectedRound(round)}
            />
          </motion.div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-base-200 rounded-xl shadow-xl p-6 backdrop-blur-sm bg-opacity-80 text-center"
        >
          <h2 className="text-2xl font-bold mb-4 text-primary">
            No Rounds Participation Yet
          </h2>
          <p className="text-lg text-secondary mb-6">
            It looks like {userRoundsInfo.farcasterId || userId} hasn&apos;t
            participated in any rounds yet. Check back later or explore
            available rounds to get started!
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
