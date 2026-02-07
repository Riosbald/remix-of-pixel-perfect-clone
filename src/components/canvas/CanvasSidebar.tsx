import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers, Mic, ShoppingCart, Search, Package, Sparkles,
  Play, Square, GitBranch, RotateCcw, Variable, Globe, Database,
  Mail, Cpu, FileText, X, ChevronRight
} from 'lucide-react';
import { useWorkflowStore, WorkflowNode } from '@/stores/workflowStore';

const tabs = [
  { id: 'nodes', label: 'Nodes', icon: Layers },
  { id: 'voice', label: 'Voice', icon: Mic },
  { id: 'vendor', label: 'Vendor', icon: ShoppingCart },
  { id: 'search', label: 'Search', icon: Search },
];

const nodeCategories = [
  {
    name: 'Flow Control',
    nodes: [
      { type: 'start', label: 'Start', icon: Play, color: 'hsl(120 100% 50%)' },
      { type: 'end', label: 'End', icon: Square, color: 'hsl(0 80% 55%)' },
      { type: 'condition', label: 'Condition', icon: GitBranch, color: 'hsl(45 100% 50%)' },
      { type: 'loop', label: 'Loop', icon: RotateCcw, color: 'hsl(280 80% 60%)' },
      { type: 'variable', label: 'Variable', icon: Variable, color: 'hsl(200 80% 55%)' },
    ],
  },
  {
    name: 'Integrations',
    nodes: [
      { type: 'api', label: 'API Call', icon: Globe, color: 'hsl(210 100% 60%)' },
      { type: 'database', label: 'Database', icon: Database, color: 'hsl(170 70% 45%)' },
      { type: 'email', label: 'Email', icon: Mail, color: 'hsl(340 80% 55%)' },
    ],
  },
  {
    name: 'AI & Voice',
    nodes: [
      { type: 'voice-trigger', label: 'Voice Trigger', icon: Mic, color: 'hsl(180 100% 50%)' },
      { type: 'stt', label: 'Speech to Text', icon: Mic, color: 'hsl(180 80% 45%)' },
      { type: 'tts', label: 'Text to Speech', icon: Mic, color: 'hsl(180 60% 40%)' },
      { type: 'ai-analyze', label: 'AI Analyze', icon: Cpu, color: 'hsl(270 80% 60%)' },
    ],
  },
  {
    name: 'Vendor',
    nodes: [
      { type: 'vendor-lookup', label: 'Vendor Lookup', icon: ShoppingCart, color: 'hsl(30 100% 55%)' },
      { type: 'purchase-order', label: 'Purchase Order', icon: FileText, color: 'hsl(30 80% 50%)' },
    ],
  },
];

const voiceCommands = [
  { category: 'Canvas', commands: ['Add [type] node', 'Connect [A] to [B]', 'Delete selected', 'Arrange nodes'] },
  { category: 'Workflow', commands: ['Save workflow', 'Run workflow', 'Test workflow'] },
  { category: 'Vendor', commands: ['Add vendor node', 'Create purchase order'] },
];

export const CanvasSidebar = () => {
  const { sidebarOpen, setSidebarOpen, activeTab, setActiveTab, addNode } = useWorkflowStore();
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Flow Control');

  const handleDragStart = (e: React.DragEvent, nodeData: { type: string; label: string; color: string }) => {
    e.dataTransfer.setData('application/reactflow', JSON.stringify(nodeData));
    e.dataTransfer.effectAllowed = 'move';
  };

  if (!sidebarOpen) {
    return (
      <div className="flex flex-col bg-card border-r border-border w-10 items-center py-3 gap-2">
        <button onClick={() => setSidebarOpen(true)} className="p-1.5 hover:bg-muted rounded-sm transition-colors">
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSidebarOpen(true); }}
            className={`p-1.5 rounded-sm transition-colors ${activeTab === tab.id ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
            title={tab.label}
          >
            <tab.icon className="w-4 h-4" />
          </button>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 260, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-card border-r border-border flex flex-col h-full overflow-hidden"
      style={{ width: 260 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-1.5 rounded-sm text-xs transition-colors ${
                activeTab === tab.id ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-muted'
              }`}
              title={tab.label}
            >
              <tab.icon className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>
        <button onClick={() => setSidebarOpen(false)} className="p-1 hover:bg-muted rounded-sm text-muted-foreground">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        <AnimatePresence mode="wait">
          {activeTab === 'nodes' && (
            <motion.div key="nodes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
              {nodeCategories.map((category) => (
                <div key={category.name}>
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === category.name ? null : category.name)}
                    className="flex items-center justify-between w-full text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 hover:text-foreground transition-colors"
                  >
                    {category.name}
                    <ChevronRight className={`w-3 h-3 transition-transform ${expandedCategory === category.name ? 'rotate-90' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {expandedCategory === category.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-1 overflow-hidden"
                      >
                        {category.nodes.map((node) => (
                          <div
                            key={node.type}
                            draggable
                            onDragStart={(e) => handleDragStart(e, { type: node.type, label: node.label, color: node.color })}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-sm cursor-grab hover:bg-muted transition-colors active:cursor-grabbing"
                          >
                            <div className="w-5 h-5 rounded-sm flex items-center justify-center" style={{ background: `${node.color}20`, color: node.color }}>
                              <node.icon className="w-3 h-3" />
                            </div>
                            <span className="text-xs text-foreground">{node.label}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'voice' && (
            <motion.div key="voice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <p className="text-xs text-muted-foreground">Voice commands for canvas control:</p>
              {voiceCommands.map((cat) => (
                <div key={cat.category}>
                  <h4 className="text-xs font-semibold text-primary mb-1">{cat.category}</h4>
                  <div className="space-y-1">
                    {cat.commands.map((cmd) => (
                      <div key={cmd} className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-sm font-mono">
                        "{cmd}"
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'vendor' && (
            <motion.div key="vendor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quick Actions</h4>
              {['New Vendor', 'Create PO', 'Risk Assessment', 'Performance Report'].map((action) => (
                <button key={action} className="w-full text-left text-xs px-2 py-2 bg-muted/30 hover:bg-muted rounded-sm text-foreground transition-colors">
                  {action}
                </button>
              ))}
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-4">Recent Vendors</h4>
              {['TechCorp Ltd', 'Afri Supplies', 'CloudNet Inc'].map((v) => (
                <div key={v} className="flex items-center gap-2 px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {v}
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'search' && (
            <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search nodes, workflows..."
                  className="w-full bg-muted border border-border text-xs text-foreground pl-7 pr-3 py-2 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
