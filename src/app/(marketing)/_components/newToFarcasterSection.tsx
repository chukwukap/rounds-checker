import { motion } from "framer-motion";
import Link from "next/link";

const NewToFarcasterSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-10 rounded-xl shadow-lg text-white text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-4">New to Farcaster?</h2>
            <p className="text-lg mb-6">
              We&apos;ve got you covered! Our platform offers:
            </p>
            <ul className="list-disc list-inside mb-6">
              <li>Step-by-step guide to create your Farcaster account</li>
              <li>Curated list of beginner-friendly rounds</li>
              <li>Interactive tour of Farcaster features</li>
            </ul>
            <Link href="#join-farcaster">
              <a className="inline-block bg-white text-primary font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                Join Farcaster Now
              </a>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewToFarcasterSection;
