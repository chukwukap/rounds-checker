import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-secondary text-primary-foreground text-center">
      <h2 className="text-3xl font-bold mb-4">
        Ready to Boost Your Farcaster Experience?
      </h2>
      <p className="text-xl mb-8">
        Join thousands of users who are already tracking and maximizing their
        round earnings!
      </p>
      <div className="space-x-4">
        <Link
          href="#"
          className="bg-background text-primary px-6 py-3 rounded-md font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Sign Up
        </Link>
        <Link
          href="#"
          className="bg-secondary text-secondary-foreground px-6 py-3 rounded-md font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Learn More
        </Link>
      </div>
    </section>
  );
}
