import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-32 relative z-10">
        <div className="max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-display-lg font-light text-foreground mb-2"
          >
            When processes work,
          </motion.h1>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-display-lg font-light text-foreground mb-8"
          >
            IT works
          </motion.h1>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            href="#solutions"
            className="inline-flex items-center gap-2 text-base text-foreground hover:text-primary transition-colors group"
          >
            <span className="w-2 h-2 bg-primary" />
            <span>Discover our solutions</span>
          </motion.a>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-8 left-6 lg:left-10"
        >
          <ArrowDown className="w-5 h-5 text-foreground/60 animate-bounce" />
        </motion.div>
      </div>

      {/* 3D Globe Visualization - Animated CSS */}
      <div className="absolute right-0 bottom-0 w-full lg:w-2/3 h-[60vh] lg:h-[80vh] pointer-events-none">
        <div className="absolute inset-0 flex items-end justify-center lg:justify-end overflow-hidden">
          {/* Globe base with rotation */}
          <div className="relative w-[600px] h-[600px] lg:w-[900px] lg:h-[900px] animate-globe-rotate">
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-muted/30 to-transparent animate-pulse-glow" />

            {/* Globe grid lines - horizontal */}
            {[...Array(12)].map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute left-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-muted-foreground/40 to-transparent"
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
                className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-muted-foreground/30 to-transparent"
                style={{
                  left: `${(i + 1) * (100 / 17)}%`,
                  transform: `scaleY(${0.5 + Math.sin((i + 1) * (Math.PI / 17)) * 0.5})`,
                  transformOrigin: 'center',
                }}
              />
            ))}

            {/* Center sphere effect */}
            <div className="absolute inset-[15%] rounded-full border border-muted/50" />
            <div className="absolute inset-[25%] rounded-full border border-muted/30" />
            <div className="absolute inset-[35%] rounded-full border border-muted/20" />
            
            {/* Floating particles */}
            <div className="absolute w-2 h-2 bg-primary rounded-full animate-float-particle" style={{ top: '20%', left: '30%' }} />
            <div className="absolute w-1.5 h-1.5 bg-primary/70 rounded-full animate-float-particle-delayed" style={{ top: '40%', right: '25%' }} />
            <div className="absolute w-1 h-1 bg-primary/50 rounded-full animate-float-particle" style={{ bottom: '30%', left: '40%' }} />
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute right-6 lg:right-10 bottom-20 lg:bottom-32 z-20"
      >
        <div className="bg-primary p-4 lg:p-5 max-w-[200px]">
          <p className="text-primary-foreground text-xs leading-relaxed mb-2">
            Process automation opportunities discovered and implemented
          </p>
          <p className="text-primary-foreground text-3xl lg:text-4xl font-light">
            1,100+
          </p>
        </div>
      </motion.div>

      {/* Floating image card */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute right-6 lg:right-10 top-32 lg:top-40 z-20"
      >
        <div className="w-32 h-24 lg:w-40 lg:h-28 bg-card overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-muted to-card flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-muted-foreground/30" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
