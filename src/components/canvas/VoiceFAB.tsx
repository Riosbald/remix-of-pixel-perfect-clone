import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X, Send } from 'lucide-react';
import { useWorkflowStore } from '@/stores/workflowStore';

export const VoiceFAB = () => {
  const { voiceActive, setVoiceActive } = useWorkflowStore();
  const [expanded, setExpanded] = useState(false);
  const [transcript, setTranscript] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mini waveform animation
  useEffect(() => {
    if (!voiceActive || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const draw = () => {
      animId = requestAnimationFrame(draw);
      const w = canvasRef.current!.width;
      const h = canvasRef.current!.height;
      ctx.clearRect(0, 0, w, h);

      const bars = 12;
      const barW = 3;
      const gap = (w - bars * barW) / (bars + 1);

      for (let i = 0; i < bars; i++) {
        const barH = (Math.sin(Date.now() / 150 + i * 0.5) + 1) * (h * 0.35) + 2;
        ctx.fillStyle = 'hsl(120, 100%, 50%)';
        ctx.fillRect(gap + i * (barW + gap), (h - barH) / 2, barW, barH);
      }
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [voiceActive]);

  return (
    <>
      {/* FAB Button - visible on mobile */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            if (expanded) {
              setExpanded(false);
              setVoiceActive(false);
            } else {
              setExpanded(true);
              setVoiceActive(true);
            }
          }}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors ${
            voiceActive ? 'bg-primary text-primary-foreground shadow-primary/40' : 'bg-card text-foreground border border-border'
          }`}
        >
          {expanded ? <X className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </motion.button>

        {/* Pulse ring */}
        {voiceActive && !expanded && (
          <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping pointer-events-none" />
        )}
      </div>

      {/* Expanded voice panel (mobile slide-up) */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-card border-t border-border rounded-t-2xl p-4 pb-8 md:hidden"
          >
            {/* Handle */}
            <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-4" />

            {/* Waveform */}
            <div className="flex justify-center mb-4">
              <canvas ref={canvasRef} width={200} height={40} className="opacity-80" />
            </div>

            <p className="text-center text-xs text-muted-foreground mb-3">
              {voiceActive ? 'Listening... say a command' : 'Tap mic to start'}
            </p>

            {transcript && (
              <div className="bg-muted/50 p-2 rounded-sm mb-3">
                <p className="text-xs text-foreground">{transcript}</p>
              </div>
            )}

            <div className="flex gap-2">
              <input
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Or type a command..."
                className="flex-1 bg-muted border border-border text-xs text-foreground px-3 py-2 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="bg-primary text-primary-foreground p-2 rounded-sm">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
