import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

const posts = [
  { category: "Product", title: "Introducing Voice-First Workflow Automation", excerpt: "How natural language commands are reshaping enterprise process management — and why clicking is becoming optional.", readTime: "5 min", date: "Feb 2026" },
  { category: "Engineering", title: "Building a Real-Time BPMN Engine in the Browser", excerpt: "A deep dive into our React Flow-based visual programming layer and how we achieve sub-50ms node evaluation.", readTime: "8 min", date: "Jan 2026" },
  { category: "Industry", title: "The Future of Vendor Management is Autonomous", excerpt: "AI-powered vendor scoring, automated PO generation, and predictive risk assessment are changing procurement forever.", readTime: "6 min", date: "Jan 2026" },
  { category: "Product", title: "BPMN 2.0 Meets Drag-and-Drop: Our Visual Modeler", excerpt: "Standards-based process modeling shouldn't require a PhD. Here's how we made it accessible to everyone.", readTime: "4 min", date: "Dec 2025" },
  { category: "Case Study", title: "How Meridian Corp Cut Process Time by 73%", excerpt: "A global manufacturer deployed Ase's voice-first workflows across 12 factories — here are the results.", readTime: "7 min", date: "Dec 2025" },
  { category: "Engineering", title: "Scaling WebRTC for Enterprise Voice Interfaces", excerpt: "Lessons learned building low-latency voice pipelines that handle 10,000+ concurrent sessions.", readTime: "10 min", date: "Nov 2025" },
];

const Insights = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="h-[var(--nav-height)]" />

      <main>
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-[1200px] mx-auto">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary text-sm font-medium tracking-widest uppercase mb-4">Insights</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-display-md font-bold text-foreground mb-6">
              Ideas shaping the future of work
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-muted-foreground text-lg max-w-2xl mb-16">
              Engineering deep-dives, product updates, and industry perspectives from the Ase team.
            </motion.p>

            {/* Featured Post */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card border border-border p-10 md:p-14 mb-10 group hover:border-primary/40 transition-colors cursor-pointer"
            >
              <span className="text-primary text-xs font-semibold uppercase tracking-widest">{posts[0].category}</span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-3 mb-4 group-hover:text-primary transition-colors">{posts[0].title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">{posts[0].excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{posts[0].date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {posts[0].readTime}</span>
              </div>
            </motion.div>

            {/* Post Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(1).map((post, i) => (
                <motion.article
                  key={post.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.4 }}
                  className="bg-card border border-border p-8 group hover:border-primary/40 transition-colors cursor-pointer"
                >
                  <span className="text-primary text-xs font-semibold uppercase tracking-widest">{post.category}</span>
                  <h3 className="text-lg font-semibold text-foreground mt-3 mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Insights;
