import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Target, Eye, Gem, Users, MapPin, Mail } from "lucide-react";

const values = [
  { icon: Target, title: "Execution over ideas", description: "We ship fast, learn faster, and never confuse motion with progress." },
  { icon: Eye, title: "Radical transparency", description: "Open roadmaps, public changelogs, and honest communication — always." },
  { icon: Gem, title: "Craft matters", description: "Every pixel, every API response, every error message is an opportunity to delight." },
  { icon: Users, title: "Voice of the user", description: "We build what customers need, not what looks good in a pitch deck." },
];

const team = [
  { name: "Amara Osei", role: "CEO & Co-Founder", location: "London" },
  { name: "Kai Tanaka", role: "CTO & Co-Founder", location: "Tokyo" },
  { name: "Priya Mehta", role: "VP Engineering", location: "Bangalore" },
  { name: "Lucas Fernandez", role: "Head of Product", location: "São Paulo" },
  { name: "Elena Volkov", role: "Head of Design", location: "Berlin" },
  { name: "Marcus Chen", role: "VP Sales", location: "San Francisco" },
];

const Company = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="h-[var(--nav-height)]" />

      <main>
        {/* Hero */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-[1200px] mx-auto">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary text-sm font-medium tracking-widest uppercase mb-4">Company</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-display-md font-bold text-foreground mb-6 max-w-3xl">
              Making enterprise automation accessible to everyone
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-muted-foreground text-lg max-w-2xl">
              Ase was founded on a simple belief: complex business processes shouldn't require complex tools. We're building the voice-first platform that puts automation in the hands of every team.
            </motion.p>
          </div>
        </section>

        {/* Values */}
        <section className="pb-24 px-6">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-10">Our values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="bg-card border border-border p-8">
                  <v.icon className="w-6 h-6 text-primary mb-4" />
                  <h3 className="text-foreground font-semibold mb-2">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="pb-24 px-6">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-10">Leadership</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((t, i) => (
                <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} className="bg-card border border-border p-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted flex items-center justify-center text-muted-foreground font-semibold text-sm">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-foreground font-medium">{t.name}</p>
                    <p className="text-muted-foreground text-sm">{t.role}</p>
                    <p className="text-muted-foreground text-xs flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {t.location}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="pb-32 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="bg-card border border-border p-12 text-center">
              <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-3">Get in touch</h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">Whether you're exploring Ase for your organization or interested in joining the team, we'd love to hear from you.</p>
              <button className="bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors">
                Contact us
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Company;
