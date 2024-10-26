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

export default function Testimonials() {
  return (
    <section className="py-20 bg-accent">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <blockquote
              key={index}
              className="bg-card p-6 rounded-lg shadow-lg"
            >
              <p className="text-lg mb-4">&quot;{testimonial.quote}&quot;</p>
              <footer className="text-right text-muted-foreground">
                - {testimonial.author}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
