import { motion } from "framer-motion";
import { 
  Users, 
  TrendingUp, 
  FileCheck, 
  ShoppingCart, 
  FileText, 
  AlertTriangle,
  DollarSign,
  Building2,
  ArrowRight,
  CheckCircle2,
  Clock,
  Star
} from "lucide-react";
import { useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

const vendorModules = [
  {
    id: "registration",
    icon: Building2,
    title: "Registration & Onboarding",
    description: "Automated vendor registration with OCR document extraction and regional compliance",
    features: ["OCR extraction", "Multi-language forms", "Auto-verification"]
  },
  {
    id: "performance",
    icon: TrendingUp,
    title: "Performance Tracking",
    description: "Real-time KPIs for delivery, quality, and response time with AI insights",
    features: ["On-time delivery %", "Quality scoring", "Trend analysis"]
  },
  {
    id: "assessment",
    icon: FileCheck,
    title: "Qualification & Assessment",
    description: "Comprehensive vendor assessments with risk scoring and compliance checks",
    features: ["Financial stability", "Operational capacity", "Quality management"]
  },
  {
    id: "purchase",
    icon: ShoppingCart,
    title: "Purchase Order Management",
    description: "Voice-enabled PO creation with automated approval workflows",
    features: ["Voice commands", "Auto-routing", "Status tracking"]
  },
  {
    id: "contracts",
    icon: FileText,
    title: "Contract Management",
    description: "AI-powered contract analysis with renewal alerts and OCR extraction",
    features: ["OCR parsing", "Term extraction", "Renewal alerts"]
  },
  {
    id: "risk",
    icon: AlertTriangle,
    title: "Risk Management",
    description: "Proactive risk identification with mitigation planning and monitoring",
    features: ["Risk scoring", "Mitigation plans", "Continuous monitoring"]
  }
];

const vendorStats = [
  { label: "Active Vendors", value: "2,450", change: "+12%", icon: Users },
  { label: "On-Time Delivery", value: "94.2%", change: "+3.1%", icon: Clock },
  { label: "Quality Score", value: "4.6/5", change: "+0.2", icon: Star },
  { label: "Cost Savings", value: "$2.4M", change: "+18%", icon: DollarSign }
];

const sampleVendors = [
  { name: "TechSupply Co.", category: "Technology", score: 4.8, status: "active", region: "Nigeria" },
  { name: "AfriLogistics", category: "Logistics", score: 4.5, status: "active", region: "Kenya" },
  { name: "GlobalParts Ltd", category: "Manufacturing", score: 4.2, status: "pending", region: "South Africa" }
];

export const VendorManagementSection = () => {
  const [activeModule, setActiveModule] = useState("registration");
  const selectedModule = vendorModules.find(m => m.id === activeModule);

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div {...fadeInUp} className="mb-16 lg:mb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">Vendor Management</span>
              </div>
              
              <h2 className="text-display-md font-light text-foreground mb-6">
                Complete vendor
                <br />
                <span className="text-muted-foreground">lifecycle control.</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                From registration to performance analytics — manage your entire vendor ecosystem 
                with voice commands, AI insights, and automated workflows.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {vendorStats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-card border border-border p-5 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="w-5 h-5 text-primary" />
                    <span className="text-xs text-primary font-medium">{stat.change}</span>
                  </div>
                  <p className="text-2xl font-medium text-foreground mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Module Tabs & Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          {/* Module Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-border">
            {vendorModules.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all rounded ${
                  activeModule === module.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                <module.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{module.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Module Detail */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Module Info */}
            <div>
              {selectedModule && (
                <motion.div
                  key={selectedModule.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-primary/10 flex items-center justify-center">
                      <selectedModule.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-medium text-foreground">{selectedModule.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                    {selectedModule.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {selectedModule.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors group"
                  >
                    <span className="w-2 h-2 bg-primary" />
                    <span>Learn more about {selectedModule.title.toLowerCase()}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              )}
            </div>

            {/* Right: Sample Vendor List */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              {/* List Header */}
              <div className="bg-secondary/50 px-6 py-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-foreground">Recent Vendors</h4>
                  <button className="text-xs text-primary hover:underline">View all</button>
                </div>
              </div>

              {/* Vendor Items */}
              <div className="divide-y divide-border">
                {sampleVendors.map((vendor, idx) => (
                  <motion.div
                    key={vendor.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="p-4 hover:bg-secondary/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{vendor.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {vendor.category} • {vendor.region}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium text-foreground">{vendor.score}</span>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          vendor.status === 'active' 
                            ? 'bg-primary/20 text-primary' 
                            : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {vendor.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="p-4 bg-secondary/30 border-t border-border">
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                    + Add Vendor
                  </button>
                  <button className="flex-1 py-2 border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors">
                    Import
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Voice Command Callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-8 text-center"
        >
          <h3 className="text-xl font-medium text-foreground mb-3">
            Voice-Enabled Vendor Operations
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Say <span className="text-primary font-medium">"Create PO for 100 units from TechSupply"</span> or{" "}
            <span className="text-primary font-medium">"Show vendor performance analytics"</span> to interact naturally.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-background border border-border text-sm text-muted-foreground">
              "Add new vendor"
            </span>
            <span className="px-4 py-2 bg-background border border-border text-sm text-muted-foreground">
              "Show risk assessment"
            </span>
            <span className="px-4 py-2 bg-background border border-border text-sm text-muted-foreground">
              "Generate contract"
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
