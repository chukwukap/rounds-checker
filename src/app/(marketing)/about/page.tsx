"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TeamMember {
  name: string;
  role: string;
  contribution: string;
  image: string;
  twitterX: string;
  warpcast: string;
}

const features: Feature[] = [
  {
    icon: <CurrencyDollarIcon className="w-8 h-8" />,
    title: "Earnings Tracker",
    description:
      "Aggregate and visualize your earnings from different tokens and currencies.",
  },
  {
    icon: <ChartBarIcon className="w-8 h-8" />,
    title: "Real-Time Data",
    description:
      "Get up-to-date information on your rounds participation and earnings.",
  },
  {
    icon: <UserGroupIcon className="w-8 h-8" />,
    title: "Leaderboard",
    description:
      "Compare your performance with other top earners from rounds.wtf.",
  },
  {
    icon: <LightBulbIcon className="w-8 h-8" />,
    title: "Insights",
    description:
      "Gain valuable insights into your participation patterns and earning potential.",
  },
];

const teamMembers: TeamMember[] = [
  {
    name: "Chukwuka",
    role: "Full Stack Blockchain Developer",
    contribution: "Frontend & UI/UX Design",
    image: "/chukwuka.jpg",
    twitterX: "chukwukadefi",
    warpcast: "chukwukauba",
  },
  {
    name: "Celestine",
    role: "Backend Engineer & Smart Contract Developer",
    contribution: "Backend & API Development",
    image: "/celestine.jpg",
    twitterX: "thecyberverse",
    warpcast: "thecyberverse",
  },
];

const FeatureCard: React.FC<Feature> = ({ icon, title, description }) => (
  <motion.div
    className="bg-card text-card-foreground p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
    whileHover={{ y: -5 }}
  >
    <div className="text-primary mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

const TeamMember: React.FC<TeamMember> = ({
  name,
  role,
  contribution,
  image,
  twitterX,
  warpcast,
}) => (
  <motion.div
    className="bg-card text-card-foreground p-6 rounded-xl shadow-lg text-center"
    whileHover={{ y: -5 }}
  >
    <Image
      src={image}
      alt={name}
      width={120}
      height={120}
      className="rounded-full mx-auto mb-4"
    />
    <h3 className="text-xl font-semibold mb-2">{name}</h3>
    <p className="text-muted-foreground mb-2">{role}</p>
    <p className="text-sm text-primary mb-4">{contribution}</p>
    <div className="flex justify-center space-x-4">
      <a
        href={`https://twitter.com/${twitterX}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-primary/80 transition-colors"
      >
        Twitter
      </a>
      <a
        href={`https://warpcast.com/${warpcast}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-primary/80 transition-colors"
      >
        Warpcast
      </a>
    </div>
  </motion.div>
);

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center text-primary-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Rounds Checker
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Empowering Farcaster users to track, analyze, and optimize their
              rounds.wtf participation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-12 text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TeamMember {...member} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-12">Our Technology Stack</h2>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Tailwind CSS",
              "Framer Motion",
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="bg-accent text-accent-foreground px-6 py-3 rounded-full shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-semibold mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of Farcaster users who are already using Rounds
              Checker.
            </p>
            <motion.a
              href="/#search"
              className="bg-background text-foreground px-8 py-3 rounded-full text-lg font-semibold hover:bg-background/90 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Rounds Checker Now
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
