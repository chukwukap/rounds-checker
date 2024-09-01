import FeatureCard from "./featureCard";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const testimonials = [
  {
    quote:
      "This platform revolutionized how I engage with Farcaster communities!",
    author: "CryptoEnthusiast92",
  },
  {
    quote: "I've doubled my round earnings since I started using this tracker!",
    author: "FarcasterFan23",
  },
];

const CommunityEngagementSection = () => {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-semibold mb-12 text-center">
          Community Engagement
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<SunIcon className="w-10 h-10" />}
            title="Refer Friends"
            description="Refer friends and earn bonuses. Share your achievements on social media. Participate in collaborative rounds."
          />
          <FeatureCard
            icon={<MoonIcon className="w-10 h-10" />}
            title="Testimonials"
            description={testimonials.map((testimonial, index) => (
              <div key={index} className="mb-4">
                <p className="italic">&quot;{testimonial.quote}&quot;</p>
                <p className="font-semibold">- {testimonial.author}</p>
              </div>
            ))}
          />
        </div>
      </div>
    </section>
  );
};

export default CommunityEngagementSection;
