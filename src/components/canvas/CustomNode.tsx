import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Mic, Database, Mail, Globe, GitBranch, Play, Square, RotateCcw, Cpu, ShoppingCart, FileText } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  start: Play,
  end: Square,
  condition: GitBranch,
  loop: RotateCcw,
  api: Globe,
  database: Database,
  email: Mail,
  'voice-trigger': Mic,
  stt: Mic,
  tts: Mic,
  'ai-analyze': Cpu,
  'vendor-lookup': ShoppingCart,
  'purchase-order': FileText,
};

interface CustomNodeData {
  label: string;
  type: string;
  category: string;
  color: string;
}

const CustomNode = ({ data, selected }: { data: CustomNodeData; selected: boolean }) => {
  const Icon = iconMap[data.type] || Play;

  return (
    <div
      className={`
        relative px-4 py-3 min-w-[140px] border transition-all duration-200
        ${selected ? 'ring-2 ring-primary shadow-[0_0_20px_hsl(120_100%_50%/0.3)]' : ''}
      `}
      style={{
        background: 'hsl(0 0% 8%)',
        borderColor: selected ? data.color : 'hsl(0 0% 20%)',
      }}
    >
      <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-primary !border-none" />
      <div className="flex items-center gap-2">
        <div
          className="w-7 h-7 flex items-center justify-center rounded-sm"
          style={{ background: `${data.color}20`, color: data.color }}
        >
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-xs font-medium text-foreground">{data.label}</span>
      </div>
      <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-primary !border-none" />
    </div>
  );
};

export default memo(CustomNode);
