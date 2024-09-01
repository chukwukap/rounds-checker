import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 py-20 text-center" id="hero">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/logo.svg"
          alt="Rounds Checker Logo"
          width={120}
          height={120}
          className="mx-auto mb-8"
        />
        <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Roundscaster: Your Gateway to Community Rewards
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          Discover, track, and maximize your earnings from Farcaster community
          rounds!
        </p>
        <Link href="#get-started">
          <a className="inline-block bg-primary text-primary-foreground font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
            Get Started
          </a>
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;
