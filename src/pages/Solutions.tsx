import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Factory, Building2, Landmark, Stethoscope, ShoppingBag, Truck, ArrowRight } from "lucide-react";

const industries = [
  { icon: Factory, title: "Manufacturing", description: "Optimize production workflows, vendor coordination, and supply chain processes with voice-driven automation.", features: ["Production scheduling", "Quality control flows", "Supplier integration"] },
  { icon: Building2, title: "Financial Services", description: "Automate compliance workflows, risk assessment, and client onboarding with intelligent process mining.", features: ["KYC automation", "Risk scoring", "Audit trails"] },
  { icon: Landmark, title: "Government & Public Sector", description: "Streamline citizen services, procurement, and inter-agency coordination with secure workflows.", features: ["Permit processing", "Budget workflows", "Document management"] },
  { icon: Stethoscope, title: "Healthcare", description: "Manage patient intake, billing workflows, and regulatory compliance with HIPAA-ready automation.", features: ["Patient onboarding", "Claims processing", "Compliance tracking"] },
  { icon: ShoppingBag, title: "Retail & E-Commerce", description: "Coordinate inventory, vendor management, and omnichannel order fulfillment at scale.", features: ["Order orchestration", "Inventory sync", "Vendor scoring"] },
  { icon: Truck, title: "Logistics & Supply Chain", description: "End-to-end visibility and automation for shipments, warehousing, and last-mile delivery.", features: ["Route optimization", "Shipment tracking", "Warehouse flows"] },
];

const Solutions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="h-[var(--nav-height)]" />

      <main>
        {/* Hero */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-[1200px] mx-auto text-center">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary text-sm font-medium tracking-widest uppercase mb-4">Solutions</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-display-md font-bold text-foreground mb-6">
              Built for every industry
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From manufacturing floors to financial trading desks — Ase adapts to your domain with pre-built templates and voice-first workflows.
            </motion.p>
          </div>
        </section>

        {/* Industry Grid */}
        <section className="pb-32 px-6">
          <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="bg-card border border-border p-8 group hover:border-primary/40 transition-colors"
              >
                <div className="w-12 h-12 bg-muted flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                  <ind.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{ind.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{ind.description}</p>
                <ul className="space-y-2 mb-6">
                  {ind.features.map((f) => (
                    <li key={f} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1 h-1 bg-primary rounded-full" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Solutions;
