import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Search, Star, Download, Zap, Bot, FileText, BarChart3, Shield, Globe } from "lucide-react";
import { useState } from "react";

const categories = ["All", "Agents", "Workflows", "Integrations", "Templates"];

const agents = [
  { name: "Invoice Processor", category: "Agents", icon: FileText, rating: 4.8, installs: "2.3k", description: "Automatically extract, validate, and route invoice data using OCR and AI.", tags: ["Finance", "OCR"] },
  { name: "Vendor Scorer", category: "Agents", icon: BarChart3, rating: 4.6, installs: "1.8k", description: "AI-powered vendor performance scoring with risk assessment and recommendations.", tags: ["Procurement", "AI"] },
  { name: "Compliance Guardian", category: "Agents", icon: Shield, rating: 4.9, installs: "3.1k", description: "Automated regulatory compliance checks with audit trail generation.", tags: ["Legal", "Compliance"] },
  { name: "Multi-Language Bot", category: "Agents", icon: Globe, rating: 4.5, installs: "1.2k", description: "Voice-first chatbot supporting 40+ languages with real-time translation.", tags: ["Voice", "NLP"] },
  { name: "Smart Onboarding", category: "Workflows", icon: Zap, rating: 4.7, installs: "2.9k", description: "End-to-end employee onboarding workflow with automated task assignment.", tags: ["HR", "Automation"] },
  { name: "Sales Pipeline AI", category: "Agents", icon: Bot, rating: 4.4, installs: "980", description: "Intelligent lead scoring and pipeline management with CRM integration.", tags: ["Sales", "CRM"] },
];

const Marketplace = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = agents.filter((a) => {
    const matchesCategory = activeCategory === "All" || a.category === activeCategory;
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="h-[var(--nav-height)]" />

      <main>
        {/* Hero */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-[1200px] mx-auto text-center">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary text-sm font-medium tracking-widest uppercase mb-4">Marketplace</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-display-md font-bold text-foreground mb-6">
              Extend your platform
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
              Discover pre-built agents, workflows, and integrations from our community of creators.
            </motion.p>

            {/* Search */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search agents, workflows, integrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card border border-border pl-12 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm"
              />
            </motion.div>
          </div>
        </section>

        {/* Categories + Grid */}
        <section className="pb-32 px-6">
          <div className="max-w-[1200px] mx-auto">
            {/* Category Tabs */}
            <div className="flex gap-2 mb-10 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Agent Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((agent, i) => (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="bg-card border border-border p-6 group hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <agent.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                      {agent.rating}
                    </div>
                  </div>
                  <h3 className="text-foreground font-semibold mb-2">{agent.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{agent.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {agent.tags.map((t) => (
                        <span key={t} className="text-xs bg-muted text-muted-foreground px-2 py-0.5">{t}</span>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Download className="w-3 h-3" /> {agent.installs}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Marketplace;
