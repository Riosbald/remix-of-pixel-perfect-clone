import { ArrowRight, PenTool, Share2, Zap, ShieldCheck, FormInput, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import buildFormSvg from "@/assets/build-form.svg";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" }
};

export const FormsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-card">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Main Header */}
        <motion.div 
          {...fadeInUp}
          className="text-center mb-16 lg:mb-24"
        >
          <h2 className="text-display-md font-light text-foreground mb-6">
            Forms, but <span className="text-primary">programmable.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Build simple forms fast, or design dynamic, validated, logic-driven forms powered by flows.
          </p>
        </motion.div>

        {/* Form Illustration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="mb-24 flex justify-center"
        >
          <div className="relative w-full max-w-2xl bg-background p-8 border border-border">
            <img 
              src={buildFormSvg} 
              alt="Form builder visualization" 
              className="w-full h-auto"
            />
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Design forms visually */}
          <motion.div 
            {...cardVariants}
            transition={{ duration: 0.5, delay: 0 }}
            className="group bg-background p-8 border border-border hover:border-primary/30 transition-colors"
          >
            <div className="mb-6">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                <PenTool className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-foreground">Design forms visually</h3>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Compose forms with a visual editor, from simple surveys to complex, conditional experiences.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors group/link"
            >
              <span className="w-1.5 h-1.5 bg-primary" />
              Learn more
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Use them anywhere */}
          <motion.div 
            {...cardVariants}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="group bg-background p-8 border border-border hover:border-primary/30 transition-colors"
          >
            <div className="mb-6">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                <Share2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-foreground">Use them anywhere</h3>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Share a hosted form, embed it anywhere, or render it yourself using the FlowGenie SDK. Edit structure, logic, and validation in one place — deploy everywhere.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-xs text-secondary-foreground">
                <FormInput className="w-3 h-3" />
                Hosted
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-xs text-secondary-foreground">
                <Code2 className="w-3 h-3" />
                Embed
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-xs text-secondary-foreground">
                SDK
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

          {/* Combine Forms with Flows */}
          <motion.div 
            {...cardVariants}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group bg-background p-8 border border-border hover:border-primary/30 transition-colors"
          >
            <div className="mb-6">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-foreground">Combine Forms with Flows</h3>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Trigger flows on submission to handle complex validation, payment processing, or multi-step workflows.
            </p>
            <div className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/20 mb-4">
              <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Never worry about spam or invalid data hitting your database again.
              </p>
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
        </div>
      </div>
    </section>
  );
};
