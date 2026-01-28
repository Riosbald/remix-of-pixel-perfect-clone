import { motion } from "framer-motion";

export const CTASection = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-4 justify-center max-w-3xl mx-auto"
        >
          <button className="flex-1 bg-foreground text-background py-4 px-8 text-base font-medium hover:bg-foreground/90 transition-colors">
            Try for free
          </button>
          <button className="flex-1 bg-transparent text-foreground border border-foreground/30 py-4 px-8 text-base font-medium hover:border-foreground/60 transition-colors">
            Join a demo
          </button>
        </motion.div>
      </div>
    </section>
  );
};
