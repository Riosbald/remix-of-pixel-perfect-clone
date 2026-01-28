import { ArrowUpRight } from "lucide-react";

export const MarqueeSection = () => {
  const marqueeContent = (
    <>
      <span className="flex items-center gap-4 text-display-xl font-light text-foreground whitespace-nowrap">
        <ArrowUpRight className="w-16 h-16 lg:w-24 lg:h-24" strokeWidth={1} />
        Get started
      </span>
      <span className="flex items-center gap-4 text-display-xl font-light text-muted-foreground/40 whitespace-nowrap">
        <ArrowUpRight className="w-16 h-16 lg:w-24 lg:h-24" strokeWidth={1} />
        Get started
      </span>
    </>
  );

  return (
    <section className="relative overflow-hidden py-8 lg:py-12 border-b border-border/20">
      {/* Background faded text */}
      <div className="absolute inset-0 flex items-center opacity-20 pointer-events-none">
        <div className="flex gap-8 animate-marquee">
          {marqueeContent}
          {marqueeContent}
          {marqueeContent}
          {marqueeContent}
        </div>
      </div>

      {/* Main marquee */}
      <div className="flex items-center overflow-hidden">
        <div className="flex gap-8 animate-marquee">
          {marqueeContent}
          {marqueeContent}
          {marqueeContent}
          {marqueeContent}
        </div>
      </div>
    </section>
  );
};
