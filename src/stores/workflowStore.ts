import { create } from 'zustand';
import { Node, Edge, addEdge, Connection, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange } from '@xyflow/react';

export interface WorkflowNode extends Node {
  data: {
    label: string;
    type: string;
    category: string;
    color: string;
    config?: Record<string, unknown>;
  };
}

interface WorkflowState {
  nodes: WorkflowNode[];
  edges: Edge[];
  selectedNode: WorkflowNode | null;
  sidebarOpen: boolean;
  propertiesOpen: boolean;
  voiceActive: boolean;
  mobilePanelOpen: boolean;
  mobilePanelHeight: 'collapsed' | 'half' | 'full';
  activeTab: string;

  setNodes: (nodes: WorkflowNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  selectNode: (node: WorkflowNode | null) => void;
  addNode: (node: WorkflowNode) => void;
  setSidebarOpen: (open: boolean) => void;
  setPropertiesOpen: (open: boolean) => void;
  setVoiceActive: (active: boolean) => void;
  setMobilePanelOpen: (open: boolean) => void;
  setMobilePanelHeight: (height: 'collapsed' | 'half' | 'full') => void;
  setActiveTab: (tab: string) => void;
}

const initialNodes: WorkflowNode[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 100, y: 100 },
    data: { label: 'Start', type: 'start', category: 'flow', color: 'hsl(120 100% 50%)' },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 350, y: 100 },
    data: { label: 'Check Condition', type: 'condition', category: 'flow', color: 'hsl(45 100% 50%)' },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 600, y: 50 },
    data: { label: 'API Call', type: 'api', category: 'integration', color: 'hsl(210 100% 60%)' },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 600, y: 200 },
    data: { label: 'Vendor Lookup', type: 'vendor-lookup', category: 'vendor', color: 'hsl(30 100% 55%)' },
  },
  {
    id: '5',
    type: 'custom',
    position: { x: 850, y: 100 },
    data: { label: 'End', type: 'end', category: 'flow', color: 'hsl(0 80% 55%)' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: 'hsl(120, 100%, 50%)' } },
  { id: 'e2-3', source: '2', target: '3', label: 'Yes', style: { stroke: 'hsl(120, 100%, 50%)' } },
  { id: 'e2-4', source: '2', target: '4', label: 'No', style: { stroke: 'hsl(0, 0%, 40%)' } },
  { id: 'e3-5', source: '3', target: '5', style: { stroke: 'hsl(0, 0%, 40%)' } },
  { id: 'e4-5', source: '4', target: '5', style: { stroke: 'hsl(0, 0%, 40%)' } },
];

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  selectedNode: null,
  sidebarOpen: true,
  propertiesOpen: true,
  voiceActive: false,
  mobilePanelOpen: false,
  mobilePanelHeight: 'collapsed',
  activeTab: 'nodes',

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  onNodesChange: (changes) => set({ nodes: applyNodeChanges(changes, get().nodes) as WorkflowNode[] }),
  onEdgesChange: (changes) => set({ edges: applyEdgeChanges(changes, get().edges) }),
  onConnect: (connection) => set({ edges: addEdge({ ...connection, animated: true, style: { stroke: 'hsl(120, 100%, 50%)' } }, get().edges) }),
  selectNode: (node) => set({ selectedNode: node, propertiesOpen: !!node }),
  addNode: (node) => set({ nodes: [...get().nodes, node] }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setPropertiesOpen: (open) => set({ propertiesOpen: open }),
  setVoiceActive: (active) => set({ voiceActive: active }),
  setMobilePanelOpen: (open) => set({ mobilePanelOpen: open }),
  setMobilePanelHeight: (height) => set({ mobilePanelHeight: height }),
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
