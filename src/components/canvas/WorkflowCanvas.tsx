import { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  NodeMouseHandler,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from './CustomNode';
import { useWorkflowStore, WorkflowNode } from '@/stores/workflowStore';

const nodeTypes = { custom: CustomNode };

export const WorkflowCanvas = () => {
  const {
    nodes, edges, onNodesChange, onEdgesChange, onConnect, selectNode, addNode,
  } = useWorkflowStore();

  const onNodeClick: NodeMouseHandler = useCallback((_event, node) => {
    selectNode(node as WorkflowNode);
  }, [selectNode]);

  const onPaneClick = useCallback(() => {
    selectNode(null);
  }, [selectNode]);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const raw = event.dataTransfer.getData('application/reactflow');
      if (!raw) return;

      const { type, label, color } = JSON.parse(raw);
      const bounds = (event.target as HTMLElement).closest('.react-flow')?.getBoundingClientRect();
      if (!bounds) return;

      const position = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };

      const newNode: WorkflowNode = {
        id: `node-${Date.now()}`,
        type: 'custom',
        position,
        data: { label, type, category: 'custom', color },
      };

      addNode(newNode);
    },
    [addNode]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div className="flex-1 h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        className="bg-background"
        defaultEdgeOptions={{ animated: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="hsl(0 0% 15%)" />
        <Controls
          className="!bg-card !border-border !rounded-none [&>button]:!bg-card [&>button]:!border-border [&>button]:!text-muted-foreground [&>button:hover]:!bg-muted [&>button]:!rounded-none"
          position="bottom-left"
        />
        <MiniMap
          className="!bg-card !border-border !rounded-none"
          nodeColor={(n) => (n as WorkflowNode).data?.color || 'hsl(0 0% 30%)'}
          maskColor="hsl(0 0% 0% / 0.7)"
          position="bottom-right"
        />
      </ReactFlow>
    </div>
  );
};
