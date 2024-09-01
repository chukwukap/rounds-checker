import FeatureCard from "./featureCard";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const FeaturesSection = () => {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-semibold mb-12 text-center">
          Why Choose Our Platform?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<SunIcon className="w-10 h-10" />}
            title="Real-Time Updates"
            description="Get instant notifications on round updates. Receive alerts for new earning opportunities. Never miss a chance to participate with timely reminders."
          />
          <FeatureCard
            icon={<MoonIcon className="w-10 h-10" />}
            title="Gamified Experience"
            description="Earn badges and level up as you participate. Compete on global and community-specific leaderboards."
          />
          <FeatureCard
            icon={<SunIcon className="w-10 h-10" />}
            title="Learn and Grow"
            description="Access our comprehensive Farcaster ecosystem guide. Explore different types of rounds and earning strategies. Get inspired by community spotlights and success stories."
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
