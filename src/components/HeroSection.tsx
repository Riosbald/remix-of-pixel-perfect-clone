import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-32 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-display-lg font-light text-foreground mb-2">
            When processes work,
          </h1>
          <h1 className="text-display-lg font-light text-foreground mb-8">
            IT works
          </h1>

          <a
            href="#solutions"
            className="inline-flex items-center gap-2 text-base text-foreground hover:text-primary transition-colors group"
          >
            <span className="w-2 h-2 bg-primary" />
            <span>Discover our solutions</span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-6 lg:left-10">
          <ArrowDown className="w-5 h-5 text-foreground/60 animate-bounce" />
        </div>
      </div>

      {/* 3D Globe Visualization - CSS representation */}
      <div className="absolute right-0 bottom-0 w-full lg:w-2/3 h-[60vh] lg:h-[80vh] pointer-events-none">
        <div className="absolute inset-0 flex items-end justify-center lg:justify-end overflow-hidden">
          {/* Globe base */}
          <div className="relative w-[600px] h-[600px] lg:w-[900px] lg:h-[900px]">
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-celonis-gray-700/30 to-transparent animate-pulse-glow" />

            {/* Globe grid lines - horizontal */}
            {[...Array(12)].map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute left-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-celonis-gray-600/40 to-transparent"
                style={{
                  top: `${(i + 1) * (100 / 13)}%`,
                  transform: `translateX(-50%) scaleX(${Math.sin((i + 1) * (Math.PI / 13))})`,
                }}
              />
            ))}

            {/* Globe grid lines - vertical curves */}
            {[...Array(16)].map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-celonis-gray-600/30 to-transparent"
                style={{
                  left: `${(i + 1) * (100 / 17)}%`,
                  transform: `scaleY(${0.5 + Math.sin((i + 1) * (Math.PI / 17)) * 0.5})`,
                  transformOrigin: 'center',
                }}
              />
            ))}

            {/* Center sphere effect */}
            <div className="absolute inset-[15%] rounded-full border border-celonis-gray-700/50" />
            <div className="absolute inset-[25%] rounded-full border border-celonis-gray-700/30" />
            <div className="absolute inset-[35%] rounded-full border border-celonis-gray-700/20" />
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="absolute right-6 lg:right-10 bottom-20 lg:bottom-32 z-20">
        <div className="bg-primary p-4 lg:p-5 max-w-[200px]">
          <p className="text-primary-foreground text-xs leading-relaxed mb-2">
            Process automation opportunities discovered and implemented
          </p>
          <p className="text-primary-foreground text-3xl lg:text-4xl font-light">
            1,100+
          </p>
        </div>
      </div>

      {/* Floating image card */}
      <div className="absolute right-6 lg:right-10 top-32 lg:top-40 z-20">
        <div className="w-32 h-24 lg:w-40 lg:h-28 bg-celonis-gray-800 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-celonis-gray-600 to-celonis-gray-800 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-celonis-gray-500" />
          </div>
        </div>
      </div>
    </section>
  );
};
