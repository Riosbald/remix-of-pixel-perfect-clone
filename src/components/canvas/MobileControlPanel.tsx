import { useRef, useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { GripHorizontal, Layers, Settings, ShoppingCart, Mic } from 'lucide-react';
import { useWorkflowStore } from '@/stores/workflowStore';

const mobileTabs = [
  { id: 'nodes', label: 'Nodes', icon: Layers },
  { id: 'props', label: 'Properties', icon: Settings },
  { id: 'vendor', label: 'Vendor', icon: ShoppingCart },
  { id: 'voice', label: 'Voice', icon: Mic },
];

const nodeList = [
  { type: 'start', label: 'Start', color: 'hsl(120 100% 50%)' },
  { type: 'condition', label: 'Condition', color: 'hsl(45 100% 50%)' },
  { type: 'api', label: 'API Call', color: 'hsl(210 100% 60%)' },
  { type: 'database', label: 'Database', color: 'hsl(170 70% 45%)' },
  { type: 'vendor-lookup', label: 'Vendor Lookup', color: 'hsl(30 100% 55%)' },
  { type: 'voice-trigger', label: 'Voice Trigger', color: 'hsl(180 100% 50%)' },
  { type: 'end', label: 'End', color: 'hsl(0 80% 55%)' },
];

export const MobileControlPanel = () => {
  const { mobilePanelOpen, setMobilePanelOpen, mobilePanelHeight, setMobilePanelHeight, selectedNode } = useWorkflowStore();
  const [activeTab, setActiveTab] = useState('nodes');
  const constraintsRef = useRef(null);

  const heights = { collapsed: 48, half: 280, full: 500 };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.velocity.y > 100 || info.offset.y > 50) {
      if (mobilePanelHeight === 'full') setMobilePanelHeight('half');
      else { setMobilePanelHeight('collapsed'); setMobilePanelOpen(false); }
    } else if (info.velocity.y < -100 || info.offset.y < -50) {
      if (mobilePanelHeight === 'collapsed') { setMobilePanelHeight('half'); setMobilePanelOpen(true); }
      else setMobilePanelHeight('full');
    }
  };

  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-40">
      <motion.div
        animate={{ height: mobilePanelOpen ? heights[mobilePanelHeight] : heights.collapsed }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-card border-t border-border rounded-t-xl overflow-hidden"
      >
        {/* Drag handle */}
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          onClick={() => {
            if (!mobilePanelOpen) { setMobilePanelOpen(true); setMobilePanelHeight('half'); }
          }}
          className="panel-handle flex items-center justify-center py-2 cursor-grab active:cursor-grabbing touch-none"
        >
          <GripHorizontal className="w-6 h-6 text-muted-foreground" />
        </motion.div>

        {/* Tabs */}
        <div className="flex border-b border-border/50">
          {mobileTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); if (!mobilePanelOpen) { setMobilePanelOpen(true); setMobilePanelHeight('half'); } }}
              className={`flex-1 flex items-center justify-center gap-1 py-2 text-[10px] transition-colors ${
                activeTab === tab.id ? 'text-primary border-b border-primary' : 'text-muted-foreground'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-3" style={{ maxHeight: heights[mobilePanelHeight] - 80 }}>
          <AnimatePresence mode="wait">
            {activeTab === 'nodes' && (
              <motion.div key="m-nodes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-3 gap-2">
                {nodeList.map((node) => (
                  <button
                    key={node.type}
                    className="flex flex-col items-center gap-1 p-2 bg-muted/30 rounded-sm border border-border/30 hover:border-primary/50 transition-colors"
                  >
                    <div className="w-4 h-4 rounded-sm" style={{ background: node.color }} />
                    <span className="text-[10px] text-muted-foreground">{node.label}</span>
                  </button>
                ))}
              </motion.div>
            )}

            {activeTab === 'props' && (
              <motion.div key="m-props" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {selectedNode ? (
                  <div className="space-y-2">
                    <div>
                      <label className="text-[10px] text-muted-foreground">Name</label>
                      <input defaultValue={selectedNode.data.label} className="w-full bg-muted border border-border text-xs text-foreground px-2 py-1.5 rounded-sm mt-0.5" />
                    </div>
                    <div>
                      <label className="text-[10px] text-muted-foreground">Type</label>
                      <p className="text-xs text-foreground">{selectedNode.data.type}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground text-center py-4">Select a node to edit properties</p>
                )}
              </motion.div>
            )}

            {activeTab === 'vendor' && (
              <motion.div key="m-vendor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                {['New Vendor', 'Create PO', 'Risk Assessment'].map((a) => (
                  <button key={a} className="w-full text-left text-xs px-3 py-2 bg-muted/30 rounded-sm text-foreground">{a}</button>
                ))}
              </motion.div>
            )}

            {activeTab === 'voice' && (
              <motion.div key="m-voice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-4">
                <Mic className="w-8 h-8 mx-auto text-primary mb-2" />
                <p className="text-xs text-muted-foreground">Tap the mic FAB to start voice mode</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
