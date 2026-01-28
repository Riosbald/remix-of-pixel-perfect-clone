import { ArrowRight, GitBranch, Repeat, Variable, Layers, Globe, Calendar, Play, Users, MousePointer2 } from "lucide-react";
import { motion } from "framer-motion";
import flowLogicSvg from "@/assets/flow-logic.svg";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.15
    }
  },
  viewport: { once: true }
};

const staggerItem = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export const VisualProgrammingSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Main Header */}
        <motion.div 
          {...fadeInUp}
          className="text-center mb-16 lg:mb-24"
        >
          <h2 className="text-display-md font-light text-foreground mb-6">
            Visual programming
            <br />
            <span className="text-muted-foreground">for the web</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Build real logic in a blueprint-style editor where the flow is the code.
          </p>
        </motion.div>

        {/* Flow Illustration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="mb-24 flex justify-center"
        >
          <div className="relative w-full max-w-2xl">
            <img 
              src={flowLogicSvg} 
              alt="Flow logic visualization" 
              className="w-full h-auto"
            />
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {/* Logic without black boxes */}
          <motion.div variants={staggerItem} className="group">
            <div className="mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary flex items-center justify-center">
                <Layers className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-foreground">Logic without black boxes</h3>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Build complex behavior with branches, loops, variables, and nested flows — all visible, inspectable, and composable.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-sm text-secondary-foreground">
                <GitBranch className="w-3.5 h-3.5" />
                Branches
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-sm text-secondary-foreground">
                <Repeat className="w-3.5 h-3.5" />
                Loops
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-sm text-secondary-foreground">
                <Variable className="w-3.5 h-3.5" />
                Variables
              </span>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors group/link"
            >
              <span className="w-1.5 h-1.5 bg-primary" />
              Learn more
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Run flows from anywhere */}
          <motion.div variants={staggerItem} className="group">
            <div className="mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-foreground">Run flows from anywhere</h3>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Expose flows as REST endpoints, trigger them on a schedule, or run them ad-hoc inside your workspace.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-sm text-secondary-foreground">
                <Globe className="w-3.5 h-3.5" />
                REST API
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-sm text-secondary-foreground">
                <Calendar className="w-3.5 h-3.5" />
                Scheduled
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-sm text-secondary-foreground">
                <Play className="w-3.5 h-3.5" />
                Ad-hoc
              </span>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors group/link"
            >
              <span className="w-1.5 h-1.5 bg-primary" />
              Learn more
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Collaborate with your team */}
          <motion.div variants={staggerItem} className="group">
            <div className="mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-foreground">Collaborate with your team</h3>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Build, debug, and ship together. See your team's cursors in real-time as you construct workflows.
            </p>
            <p className="text-sm text-muted-foreground/80 mb-4 italic">
              No more screen sharing to explain logic—just jump in and fix it together.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-sm text-secondary-foreground">
                <MousePointer2 className="w-3.5 h-3.5" />
                Live cursors
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 text-sm font-medium hover:bg-secondary transition-colors"
          >
            Check the Docs
          </a>
        </motion.div>
      </div>
    </section>
  );
};
