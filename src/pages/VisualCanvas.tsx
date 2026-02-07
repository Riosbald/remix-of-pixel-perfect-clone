import { CanvasHeader } from '@/components/canvas/CanvasHeader';
import { CanvasSidebar } from '@/components/canvas/CanvasSidebar';
import { WorkflowCanvas } from '@/components/canvas/WorkflowCanvas';
import { PropertiesPanel } from '@/components/canvas/PropertiesPanel';
import { VoiceFAB } from '@/components/canvas/VoiceFAB';
import { MobileControlPanel } from '@/components/canvas/MobileControlPanel';
import { useWorkflowStore } from '@/stores/workflowStore';
import { AnimatePresence } from 'framer-motion';

const VisualCanvas = () => {
  const { propertiesOpen, selectedNode } = useWorkflowStore();

  return (
    <div className="h-screen w-full flex flex-col bg-background overflow-hidden">
      <CanvasHeader />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - hidden on mobile */}
        <div className="hidden md:flex">
          <CanvasSidebar />
        </div>

        {/* Canvas */}
        <WorkflowCanvas />

        {/* Properties Panel - hidden on mobile */}
        <div className="hidden md:flex">
          <AnimatePresence>
            {propertiesOpen && selectedNode && <PropertiesPanel />}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Controls */}
      <MobileControlPanel />
      <VoiceFAB />
    </div>
  );
};

export default VisualCanvas;
