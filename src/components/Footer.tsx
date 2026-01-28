import { ArrowUpRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const moreLinks = [
  { label: "Careers", hasArrow: true },
  { label: "Academy", hasArrow: true },
  { label: "Community Ase", hasArrow: true },
  { label: "Partner Portal", hasArrow: true },
  { label: "Documentation", hasArrow: true },
];

const questionsLinks = [
  { label: "Talk to an expert", icon: "arrow-right" },
  { label: "Support", hasArrow: true },
  { label: "FAQs", icon: "arrow-right" },
  { label: "Glossary", icon: "arrow-right" },
];

const socialLinks = [
  { label: "LinkedIn", hasArrow: true },
  { label: "YouTube", hasArrow: true },
  { label: "Instagram", hasArrow: true },
  { label: "Facebook", hasArrow: true },
  { label: "TikTok", hasArrow: true },
];

export const Footer = () => {
  return (
    <footer className="py-16 lg:py-24 border-t border-border/20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-12 gap-12 lg:gap-8"
        >
          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h3 className="text-2xl lg:text-3xl font-medium text-foreground mb-2">
              Newsletter.
            </h3>
            <p className="text-xl lg:text-2xl font-light text-muted-foreground">
              Monthly news and updates.
            </p>
            <div className="mt-8">
              <button className="bg-transparent text-foreground border border-foreground/30 py-3 px-6 text-sm font-medium hover:border-foreground/60 transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          {/* More Ase */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-6">
              More Ase
            </h4>
            <ul className="space-y-3">
              {moreLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {link.label}
                    {link.hasArrow && (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Any Questions */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-6">
              Any Questions?
            </h4>
            <ul className="space-y-3">
              {questionsLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {link.label}
                    {link.hasArrow && (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    )}
                    {link.icon === "arrow-right" && (
                      <ArrowRight className="w-3.5 h-3.5" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-6">
              Follow Us
            </h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {link.label}
                    {link.hasArrow && (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Ase. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
