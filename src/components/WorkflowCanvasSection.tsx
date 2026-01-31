import { motion } from "framer-motion";
import { 
  ArrowRight, 
  GitBranch, 
  Play, 
  Pause, 
  ZoomIn, 
  ZoomOut, 
  Grid3X3,
  Mic,
  Workflow,
  Box,
  Diamond,
  Circle,
  Square,
  Users,
  Clock,
  CheckCircle2
} from "lucide-react";
import { useState, useEffect } from "react";
import bpmnWorkflow from "@/assets/bpmn-workflow.png";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

// Animated Node Component
const AnimatedNode = ({ 
  type, 
  label, 
  x, 
  y, 
  delay = 0,
  isActive = false 
}: { 
  type: 'start' | 'task' | 'gateway' | 'end' | 'voice' | 'vendor';
  label: string;
  x: number;
  y: number;
  delay?: number;
  isActive?: boolean;
}) => {
  const getNodeStyles = () => {
    switch (type) {
      case 'start':
        return { shape: 'rounded-full', bg: 'bg-primary/20', border: 'border-primary', icon: Circle };
      case 'end':
        return { shape: 'rounded-full', bg: 'bg-destructive/20', border: 'border-destructive', icon: Circle };
      case 'gateway':
        return { shape: 'rotate-45', bg: 'bg-yellow-500/20', border: 'border-yellow-500', icon: Diamond };
      case 'voice':
        return { shape: 'rounded-lg', bg: 'bg-blue-500/20', border: 'border-blue-500', icon: Mic };
      case 'vendor':
        return { shape: 'rounded-lg', bg: 'bg-purple-500/20', border: 'border-purple-500', icon: Users };
      default:
        return { shape: 'rounded', bg: 'bg-secondary', border: 'border-border', icon: Square };
    }
  };

  const styles = getNodeStyles();
  const IconComponent = styles.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <motion.div
        animate={isActive ? { 
          boxShadow: ['0 0 0 0 rgba(0,255,0,0)', '0 0 20px 10px rgba(0,255,0,0.3)', '0 0 0 0 rgba(0,255,0,0)']
        } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
        className={`relative flex flex-col items-center`}
      >
        <div className={`w-12 h-12 ${styles.bg} ${styles.shape} border-2 ${styles.border} flex items-center justify-center ${
          isActive ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
        }`}>
          <IconComponent className={`w-5 h-5 ${type === 'gateway' ? '-rotate-45' : ''} ${
            isActive ? 'text-primary' : 'text-muted-foreground'
          }`} />
        </div>
        <span className="mt-2 text-xs text-muted-foreground whitespace-nowrap max-w-[80px] text-center truncate">
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
};

// Connection Line Component
const ConnectionLine = ({ 
  from, 
  to, 
  delay = 0,
  animated = false 
}: { 
  from: { x: number; y: number };
  to: { x: number; y: number };
  delay?: number;
  animated?: boolean;
}) => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <motion.line
        x1={`${from.x}%`}
        y1={`${from.y}%`}
        x2={`${to.x}%`}
        y2={`${to.y}%`}
        stroke={animated ? "hsl(120, 100%, 50%)" : "hsl(0, 0%, 30%)"}
        strokeWidth="2"
        strokeDasharray={animated ? "5,5" : "0"}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      />
      {animated && (
        <motion.circle
          r="4"
          fill="hsl(120, 100%, 50%)"
          animate={{
            cx: [`${from.x}%`, `${to.x}%`],
            cy: [`${from.y}%`, `${to.y}%`]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      )}
    </motion.svg>
  );
};

const nodePalette = [
  { type: 'start', label: 'Start Event', icon: Circle, color: 'text-primary' },
  { type: 'task', label: 'Task', icon: Square, color: 'text-foreground' },
  { type: 'gateway', label: 'Gateway', icon: Diamond, color: 'text-yellow-500' },
  { type: 'voice', label: 'Voice Trigger', icon: Mic, color: 'text-blue-500' },
  { type: 'vendor', label: 'Vendor Node', icon: Users, color: 'text-purple-500' },
  { type: 'end', label: 'End Event', icon: Circle, color: 'text-destructive' }
];

const workflowFeatures = [
  { icon: GitBranch, title: "BPMN 2.0 Compliant", description: "Industry standard modeling" },
  { icon: Users, title: "Real-time Collaboration", description: "See team cursors live" },
  { icon: Mic, title: "Voice Commands", description: "Build by speaking" },
  { icon: Play, title: "Instant Execution", description: "Test workflows immediately" }
];

export const WorkflowCanvasSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNode, setActiveNode] = useState(0);

  // Simulate workflow execution
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 5);
    }, 1500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section className="py-24 lg:py-32 bg-card">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div {...fadeInUp} className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <Workflow className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Visual Workflow Editor</span>
          </div>
          
          <h2 className="text-display-md font-light text-foreground mb-6">
            Design. Connect.
            <br />
            <span className="text-muted-foreground">Execute.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Drag-and-drop BPMN 2.0 workflow builder with React Flow, ELKjs auto-layout,
            and real-time collaboration via Liveblocks.
          </p>
        </motion.div>

        {/* Canvas Demo */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="bg-background border border-border rounded-xl overflow-hidden">
            {/* Canvas Toolbar */}
            <div className="bg-secondary/50 px-4 py-3 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-primary/60" />
                </div>
                <span className="text-sm text-muted-foreground ml-2">workflow-demo.bpmn</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-secondary rounded transition-colors">
                  <ZoomOut className="w-4 h-4 text-muted-foreground" />
                </button>
                <span className="text-xs text-muted-foreground px-2">100%</span>
                <button className="p-2 hover:bg-secondary rounded transition-colors">
                  <ZoomIn className="w-4 h-4 text-muted-foreground" />
                </button>
                <div className="w-px h-6 bg-border mx-2" />
                <button className="p-2 hover:bg-secondary rounded transition-colors">
                  <Grid3X3 className="w-4 h-4 text-muted-foreground" />
                </button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`p-2 rounded transition-colors ${
                    isPlaying ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                  }`}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex">
              {/* Node Palette */}
              <div className="w-48 bg-secondary/30 border-r border-border p-4 hidden lg:block">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Node Palette
                </h4>
                <div className="space-y-2">
                  {nodePalette.map((node) => (
                    <div
                      key={node.type}
                      className="flex items-center gap-3 p-2 bg-background border border-border rounded cursor-grab hover:border-primary/50 transition-colors"
                    >
                      <node.icon className={`w-4 h-4 ${node.color}`} />
                      <span className="text-sm text-foreground">{node.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Canvas Area */}
              <div className="flex-1 h-[400px] relative bg-[radial-gradient(circle,_hsl(var(--border))_1px,_transparent_1px)] bg-[length:20px_20px]">
                {/* Connection Lines */}
                <ConnectionLine from={{ x: 12, y: 50 }} to={{ x: 28, y: 50 }} delay={0.1} animated={isPlaying && activeNode >= 0} />
                <ConnectionLine from={{ x: 32, y: 50 }} to={{ x: 48, y: 50 }} delay={0.2} animated={isPlaying && activeNode >= 1} />
                <ConnectionLine from={{ x: 52, y: 50 }} to={{ x: 68, y: 50 }} delay={0.3} animated={isPlaying && activeNode >= 2} />
                <ConnectionLine from={{ x: 72, y: 50 }} to={{ x: 88, y: 50 }} delay={0.4} animated={isPlaying && activeNode >= 3} />

                {/* Nodes */}
                <AnimatedNode type="start" label="Start" x={8} y={44} delay={0.1} isActive={isPlaying && activeNode === 0} />
                <AnimatedNode type="voice" label="Voice Input" x={25} y={44} delay={0.2} isActive={isPlaying && activeNode === 1} />
                <AnimatedNode type="gateway" label="Decision" x={45} y={44} delay={0.3} isActive={isPlaying && activeNode === 2} />
                <AnimatedNode type="vendor" label="Vendor API" x={65} y={44} delay={0.4} isActive={isPlaying && activeNode === 3} />
                <AnimatedNode type="end" label="Complete" x={85} y={44} delay={0.5} isActive={isPlaying && activeNode === 4} />

                {/* Live Collaboration Cursors */}
                <motion.div
                  animate={{ 
                    x: [0, 30, -20, 10, 0],
                    y: [0, -20, 10, -10, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                  className="absolute top-[30%] left-[40%] pointer-events-none"
                >
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">Sarah</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ 
                    x: [0, -20, 30, -10, 0],
                    y: [0, 10, -20, 5, 0]
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="absolute top-[60%] left-[60%] pointer-events-none"
                >
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-purple-500 rounded-full" />
                    <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded">Ahmed</span>
                  </div>
                </motion.div>
              </div>

              {/* Properties Panel */}
              <div className="w-56 bg-secondary/30 border-l border-border p-4 hidden xl:block">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Properties
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-muted-foreground">Node Type</label>
                    <p className="text-sm text-foreground">Voice Trigger</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">ID</label>
                    <p className="text-sm text-foreground font-mono">voice_input_01</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Status</label>
                    <div className="flex items-center gap-2 mt-1">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className="text-sm text-primary">Active</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Execution Time</label>
                    <p className="text-sm text-foreground">~150ms</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* BPMN Image Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="bg-background border border-border rounded-xl overflow-hidden p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-foreground">AI Agent Workflow Example</h3>
              <span className="text-xs text-muted-foreground">BPMN 2.0</span>
            </div>
            <img 
              src={bpmnWorkflow} 
              alt="AI Agent BPMN Workflow Example" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowFeatures.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-background border border-border p-6 hover:border-primary/30 transition-colors"
            >
              <feature.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
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
            Open Workflow Editor
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 text-sm font-medium hover:bg-secondary transition-colors"
          >
            View Documentation
          </a>
        </motion.div>
      </div>
    </section>
  );
};
