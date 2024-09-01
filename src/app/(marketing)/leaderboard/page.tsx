"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

export default function ComingSoonLeaderboard() {
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 10,
    minutes: 30,
    seconds: 30,
  });

  useEffect(() => {
    const targetDate = new Date("2023-12-31T00:00:00"); // Set your target launch date here

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });

      if (difference < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-300 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold mb-4 text-primary">
          Leaderboard Coming Soon!
        </h1>
        <p className="text-xl text-secondary mb-8">
          We&apos;re working hard to bring you the ultimate Rounds Checker
          leaderboard experience.
        </p>

        {/* <div className="flex justify-center space-x-4 mb-12">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="text-center">
              <div className="text-4xl font-bold text-accent">{value}</div>
              <div className="text-sm text-muted-foreground">
                {unit.toUpperCase()}
              </div>
            </div>
          ))}
        </div> */}

        {/* <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <button
            className="bg-primary text-primary-foreground font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
            onClick={(e) => {
              e.preventDefault();
              // Add your notification logic here
              alert("We'll notify you when the leaderboard is live!");
            }}
            disabled={true}
          >
            Notify Me
            <ChevronDoubleRightIcon className="w-5 h-5 ml-2" />
          </button>
          </motion.div> */}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-16 text-center"
      >
        <h2 className="text-2xl font-semibold mb-4 text-secondary">
          What to expect?
        </h2>
        <ul className="text-muted-foreground">
          <li>Real-time rankings</li>
          <li>Detailed performance metrics</li>
          <li>Historical data analysis</li>
          <li>Personalized insights</li>
        </ul>
      </motion.div>
    </div>
  );
}
