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
      <section className="bg-background py-20">
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

      {/* Stats Section */}
      {/* <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              className="p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold mb-2">10,000+</h3>
              <p className="text-xl">Active Users</p>
            </motion.div>
            <motion.div
              className="p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold mb-2">500+</h3>
              <p className="text-xl">Rounds Tracked</p>
            </motion.div>
            <motion.div
              className="p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold mb-2">$1M+</h3>
              <p className="text-xl">Total Earnings Tracked</p>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-semibold mb-6">
          Ready to track your rounds?
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          Join thousands of Farcaster users who are already using Rounds Caster
          to monitor their performance.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button size="lg" className="text-lg px-8 py-6">
            Get Started <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
