import { useNavigate } from 'react-router-dom';
import {
  Play, Save, Undo2, Redo2, ZoomIn, ZoomOut, Grid3X3,
  ChevronLeft, User, Mic, MicOff, MoreHorizontal
} from 'lucide-react';
import { useWorkflowStore } from '@/stores/workflowStore';

export const CanvasHeader = () => {
  const navigate = useNavigate();
  const { voiceActive, setVoiceActive } = useWorkflowStore();

  return (
    <header className="h-12 bg-card border-b border-border flex items-center justify-between px-3 shrink-0">
      {/* Left: Logo + Back */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm font-semibold text-foreground hidden sm:inline">Ase</span>
        </button>
        <div className="hidden sm:block h-4 w-px bg-border" />
        <div className="hidden sm:flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground">Workflow:</span>
          <span className="text-xs font-medium text-foreground">Vendor Onboarding</span>
        </div>
      </div>

      {/* Center: Edit Tools */}
      <div className="flex items-center gap-1">
        <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-sm transition-colors" title="Undo">
          <Undo2 className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-sm transition-colors" title="Redo">
          <Redo2 className="w-4 h-4" />
        </button>
        <div className="h-4 w-px bg-border mx-1 hidden sm:block" />
        <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-sm transition-colors hidden sm:block" title="Zoom In">
          <ZoomIn className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-sm transition-colors hidden sm:block" title="Zoom Out">
          <ZoomOut className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-sm transition-colors hidden sm:block" title="Grid">
          <Grid3X3 className="w-4 h-4" />
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setVoiceActive(!voiceActive)}
          className={`p-1.5 rounded-sm transition-colors ${
            voiceActive ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
          title="Voice Mode"
        >
          {voiceActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
        </button>
        <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-sm transition-colors" title="Save">
          <Save className="w-4 h-4" />
        </button>
        <button className="flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-1.5 text-xs font-medium hover:bg-primary/90 transition-colors">
          <Play className="w-3 h-3" /> Run
        </button>
        <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-sm transition-colors hidden sm:block">
          <User className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-sm transition-colors sm:hidden">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
