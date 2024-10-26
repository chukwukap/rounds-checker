"use client";

import React from "react";
import { Toaster } from "sonner";
import Image from "next/image";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Footer from "@/components/footer";
import CTA from "./_components/cta";
import Testimonials from "./_components/testimonialSection";
import Hero from "./_components/heroSection";

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-border"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Toaster />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/logo.svg"
            alt="Rounds Caster Logo"
            width={120}
            height={120}
            className="mx-auto mb-8"
          />
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Rounds Caster
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Track your Farcaster rounds participation and earnings from
            rounds.wtf with ease
          </p>
          <SearchBar />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-background py-20 ">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-semibold mb-12 text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<CurrencyDollarIcon className="w-10 h-10" />}
              title="Earnings Tracker"
              description="Aggregate and breakdown your earnings from different tokens and currencies."
            />
            <FeatureCard
              icon={<ChartBarIcon className="w-10 h-10" />}
              title="Real-Time Data"
              description="Get up-to-date information on your rounds participation and earnings."
            />
            <FeatureCard
              icon={<UserGroupIcon className="w-10 h-10" />}
              title="Leaderboard"
              description="Compare your performance with other top earners from rounds.wtf."
            />
          </div>
        </div>
      </section>
      <Hero />
      <CTA />
      <Testimonials />
    </div>
  );
}
