import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Video, Users } from "lucide-react";

const events = [
  { type: "Conference", title: "Ase World 2026", date: "Mar 18–20, 2026", location: "London, UK", format: "In-Person", description: "Our flagship annual conference. Three days of keynotes, workshops, and hands-on labs covering the future of voice-first automation.", featured: true },
  { type: "Webinar", title: "Voice-First Workflows: A Live Demo", date: "Feb 27, 2026", location: "Online", format: "Virtual", description: "See how to build end-to-end vendor management workflows using only voice commands." },
  { type: "Workshop", title: "BPMN Masterclass for Citizen Developers", date: "Mar 5, 2026", location: "Online", format: "Virtual", description: "Learn visual programming with our drag-and-drop BPMN modeler — no coding required." },
  { type: "Meetup", title: "Ase Community Berlin", date: "Mar 12, 2026", location: "Berlin, Germany", format: "In-Person", description: "Connect with fellow Ase users, share workflows, and learn tips from power users in the Berlin community." },
  { type: "Webinar", title: "AI Agents in Procurement: What's Next", date: "Apr 3, 2026", location: "Online", format: "Virtual", description: "Industry experts discuss how AI agents are transforming procurement and vendor management." },
  { type: "Hackathon", title: "Build with Ase: Spring Hackathon", date: "Apr 15–17, 2026", location: "Online", format: "Virtual", description: "48 hours to build the most innovative workflow automation. $25k in prizes." },
];

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="h-[var(--nav-height)]" />

      <main>
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-[1200px] mx-auto">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary text-sm font-medium tracking-widest uppercase mb-4">Events</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-display-md font-bold text-foreground mb-6">
              Learn, connect, build
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-muted-foreground text-lg max-w-2xl mb-16">
              Join us at conferences, webinars, and community events around the world.
            </motion.p>

            {/* Featured Event */}
            {events.filter(e => e.featured).map((event) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card border border-primary/30 p-10 md:p-14 mb-10 relative overflow-hidden group cursor-pointer"
              >
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-xs font-semibold">Featured</div>
                <span className="text-primary text-xs font-semibold uppercase tracking-widest">{event.type}</span>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-3 mb-4 group-hover:text-primary transition-colors">{event.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">{event.description}</p>
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {event.date}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {event.location}</span>
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {event.format}</span>
                </div>
                <button className="mt-8 bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors">
                  Register now
                </button>
              </motion.div>
            ))}

            {/* Event List */}
            <div className="space-y-4">
              {events.filter(e => !e.featured).map((event, i) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.4 }}
                  className="bg-card border border-border p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 group hover:border-primary/40 transition-colors cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-primary text-xs font-semibold uppercase tracking-widest">{event.type}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        {event.format === "Virtual" ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                        {event.format}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">{event.title}</h3>
                    <p className="text-muted-foreground text-sm">{event.description}</p>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2 md:min-w-[180px]">
                    <span className="text-sm text-foreground font-medium">{event.date}</span>
                    <span className="text-xs text-muted-foreground">{event.location}</span>
                    <button className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all mt-2">
                      Register <ArrowRight className="w-4 h-4" />
                    </button>
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

export default Events;
