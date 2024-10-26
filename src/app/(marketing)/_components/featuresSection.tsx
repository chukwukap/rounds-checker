import { CheckCircleIcon } from "@heroicons/react/24/solid";

const features = [
  "View your total earnings across all Farcaster communities",
  "See detailed breakdowns by community",
  "Monitor active rounds you're participating in",
  "Stay informed about upcoming opportunities",
];

export default function Features() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Track Your Earnings
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircleIcon className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
