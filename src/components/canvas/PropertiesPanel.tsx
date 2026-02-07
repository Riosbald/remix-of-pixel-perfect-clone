import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Settings, Zap, Info } from 'lucide-react';
import { useWorkflowStore } from '@/stores/workflowStore';
import { useState } from 'react';

const nodeConfigs: Record<string, { label: string; fields: { name: string; label: string; type: string; options?: string[] }[] }[]> = {
  condition: [
    { label: 'General', fields: [
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
    ]},
    { label: 'Configuration', fields: [
      { name: 'expression', label: 'Expression', type: 'text' },
      { name: 'operator', label: 'Operator', type: 'select', options: ['equals', 'not equals', 'greater than', 'less than', 'contains'] },
    ]},
  ],
  api: [
    { label: 'General', fields: [
      { name: 'name', label: 'Name', type: 'text' },
    ]},
    { label: 'Configuration', fields: [
      { name: 'url', label: 'URL', type: 'text' },
      { name: 'method', label: 'Method', type: 'select', options: ['GET', 'POST', 'PUT', 'DELETE'] },
      { name: 'headers', label: 'Headers', type: 'textarea' },
      { name: 'body', label: 'Body', type: 'textarea' },
    ]},
  ],
  'vendor-lookup': [
    { label: 'General', fields: [
      { name: 'name', label: 'Name', type: 'text' },
    ]},
    { label: 'Vendor Config', fields: [
      { name: 'vendorId', label: 'Vendor ID', type: 'text' },
      { name: 'lookupField', label: 'Lookup Field', type: 'select', options: ['name', 'id', 'category', 'region'] },
      { name: 'returnFields', label: 'Return Fields', type: 'text' },
    ]},
  ],
};

export const PropertiesPanel = () => {
  const { selectedNode, propertiesOpen, setPropertiesOpen } = useWorkflowStore();
  const [expandedSections, setExpandedSections] = useState<string[]>(['General']);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  if (!propertiesOpen || !selectedNode) return null;

  const sections = nodeConfigs[selectedNode.data.type] || [
    { label: 'General', fields: [
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
    ]},
  ];

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 280, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-card border-l border-border flex flex-col h-full overflow-hidden"
      style={{ width: 280 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-sm flex items-center justify-center" style={{ background: `${selectedNode.data.color}20`, color: selectedNode.data.color }}>
            <Settings className="w-3 h-3" />
          </div>
          <span className="text-xs font-semibold text-foreground">{selectedNode.data.label}</span>
        </div>
        <button onClick={() => setPropertiesOpen(false)} className="p-1 hover:bg-muted rounded-sm text-muted-foreground">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Node info */}
      <div className="px-3 py-2 border-b border-border/50 flex items-center gap-2">
        <Info className="w-3 h-3 text-muted-foreground" />
        <span className="text-[10px] text-muted-foreground">Type: {selectedNode.data.type} • ID: {selectedNode.id}</span>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.label} className="border-b border-border/30">
            <button
              onClick={() => toggleSection(section.label)}
              className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>{section.label}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${expandedSections.includes(section.label) ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {expandedSections.includes(section.label) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-3 pb-3 space-y-2 overflow-hidden"
                >
                  {section.fields.map((field) => (
                    <div key={field.name}>
                      <label className="text-[10px] text-muted-foreground block mb-1">{field.label}</label>
                      {field.type === 'text' && (
                        <input
                          type="text"
                          defaultValue={field.name === 'name' ? selectedNode.data.label : ''}
                          className="w-full bg-muted border border-border text-xs text-foreground px-2 py-1.5 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      )}
                      {field.type === 'textarea' && (
                        <textarea
                          rows={3}
                          className="w-full bg-muted border border-border text-xs text-foreground px-2 py-1.5 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                        />
                      )}
                      {field.type === 'select' && (
                        <select className="w-full bg-muted border border-border text-xs text-foreground px-2 py-1.5 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary">
                          {field.options?.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="p-3 border-t border-border space-y-2">
        <button className="w-full bg-primary text-primary-foreground text-xs font-medium py-2 hover:bg-primary/90 transition-colors flex items-center justify-center gap-1.5">
          <Zap className="w-3 h-3" /> Apply Changes
        </button>
        <button className="w-full bg-destructive/10 text-destructive text-xs py-1.5 hover:bg-destructive/20 transition-colors">
          Delete Node
        </button>
      </div>
    </motion.div>
  );
};
