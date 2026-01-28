import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const solutions = [
  {
    id: "ai",
    title: "Artificial Intelligence (AI)",
    heading: "Give AI context",
    description: "Give AI the business context it needs to succeed.",
  },
  {
    id: "supply",
    title: "Supply Chain",
    heading: "Optimize supply",
    description: "Build resilient, efficient supply chains that adapt.",
  },
  {
    id: "process",
    title: "Process Excellence",
    heading: "Drive excellence",
    description: "Transform how work gets done across your organization.",
  },
  {
    id: "sustainability",
    title: "Sustainability",
    heading: "Enable sustainability",
    description: "Make sustainability a business advantage.",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

export const SolutionsSection = () => {
  const [activeTab, setActiveTab] = useState("ai");
  const activeSolution = solutions.find((s) => s.id === activeTab);

  return (
    <section id="solutions" className="py-20 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div 
          {...fadeInUp}
          className="grid lg:grid-cols-2 gap-16 lg:gap-24"
        >
          {/* Left Column */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-medium text-foreground mb-4">
              Solutions
            </h2>
            <p className="text-display-md font-light text-gradient-muted leading-tight">
              Business-critical challenges. Transformational impact.
            </p>
          </div>

          {/* Right Column */}
          <div className="flex justify-end items-start">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-base text-foreground hover:text-primary transition-colors"
            >
              <span className="w-2 h-2 bg-primary" />
              <span>See all solutions</span>
            </a>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 lg:mt-32 grid lg:grid-cols-2 gap-16"
        >
          {/* Tab List */}
          <div className="space-y-0">
            {solutions.map((solution) => (
              <button
                key={solution.id}
                onClick={() => setActiveTab(solution.id)}
                className={`w-full text-left py-4 border-t border-border/30 transition-colors ${
                  activeTab === solution.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span
                  className={`text-lg lg:text-xl ${
                    activeTab === solution.id ? "font-medium" : "font-light"
                  }`}
                >
                  {solution.title}
                </span>
              </button>
            ))}
            <div className="border-t border-border/30" />
          </div>

          {/* Tab Content */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {activeSolution && (
                <motion.div
                  key={activeSolution.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl lg:text-3xl font-medium text-foreground mb-4">
                    {activeSolution.heading}
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    {activeSolution.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
