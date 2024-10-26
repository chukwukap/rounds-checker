import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="py-20 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Roundscaster: Your Gateway to Community Rewards
      </h1>
      <p className="text-xl mb-8 text-muted-foreground">
        Discover, track, and maximize your earnings from Farcaster community
        rounds!
      </p>
      <Button size="lg">Get Started</Button>
    </section>
  );
}
