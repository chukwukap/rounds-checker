import { motion } from "framer-motion";
import Link from "next/link";

const CallToActionSection = () => {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <h2 className="text-4xl font-semibold mb-6">
        Ready to Boost Your Farcaster Experience?
      </h2>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
        Join thousands of users who are already tracking and maximizing their
        round earnings!
      </p>
      <div className="flex justify-center space-x-4">
        <Link href="#sign-up">
          <a className="inline-block bg-primary text-primary-foreground font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
            Sign Up
          </a>
        </Link>
        <Link href="#learn-more">
          <a className="inline-block bg-secondary text-secondary-foreground font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
            Learn More
          </a>
        </Link>
      </div>
    </section>
  );
};

export default CallToActionSection;
