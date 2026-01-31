import { motion } from "framer-motion";
import { Mic, Volume2, Globe2, Brain, Eye, Waves, Radio, Languages, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true }
};

const staggerItem = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const voiceCapabilities = [
  {
    icon: Mic,
    title: "Speech-to-Text",
    description: "Whisper large-v3 + Vosk offline fallback",
    specs: ["Multi-language", "Accent detection", "<50ms latency"]
  },
  {
    icon: Volume2,
    title: "Text-to-Speech",
    description: "Coqui TTS with regional voices",
    specs: ["29+ languages", "Emotion synthesis", "Natural prosody"]
  },
  {
    icon: Brain,
    title: "LLM Processing",
    description: "Ollama Llama 3.1 + Claude 3.5 Sonnet",
    specs: ["Context-aware", "Multi-turn", "Domain expertise"]
  },
  {
    icon: Eye,
    title: "Vision AI",
    description: "OpenCV + YOLO v8 + Tesseract OCR",
    specs: ["Object detection", "Document parsing", ">85% accuracy"]
  }
];

const languages = [
  { code: "EN", name: "English" },
  { code: "FR", name: "French" },
  { code: "SW", name: "Swahili" },
  { code: "AR", name: "Arabic" },
  { code: "YO", name: "Yoruba" },
  { code: "AF", name: "Afrikaans" }
];

// Waveform Visualizer Component
const WaveformVisualizer = ({ isActive }: { isActive: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = 128;
    let phase = 0;

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = isActive ? 'hsl(120, 100%, 50%)' : 'hsl(0, 0%, 40%)';
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const amplitude = isActive ? 0.3 + Math.random() * 0.2 : 0.05;
        const frequency = 0.05 + (i / bufferLength) * 0.1;
        const v = 0.5 + Math.sin(phase + i * frequency) * amplitude;
        const y = v * canvas.height;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.stroke();
      phase += isActive ? 0.15 : 0.02;
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={100}
      className="w-full h-24 rounded-lg bg-background/50"
    />
  );
};

// Frequency Spectrum Visualizer
const SpectrumVisualizer = ({ isActive }: { isActive: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const barsRef = useRef<number[]>(Array(32).fill(0));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / 32) - 2;
      let x = 0;

      for (let i = 0; i < 32; i++) {
        // Smooth animation with target values
        const targetHeight = isActive 
          ? 20 + Math.random() * (canvas.height - 40) * (1 - i / 64)
          : 5 + Math.random() * 10;
        
        barsRef.current[i] += (targetHeight - barsRef.current[i]) * 0.15;
        const barHeight = barsRef.current[i];

        // Create gradient
        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
        gradient.addColorStop(0, 'hsl(120, 100%, 50%)');
        gradient.addColorStop(0.5, 'hsl(120, 80%, 40%)');
        gradient.addColorStop(1, 'hsl(120, 60%, 25%)');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 2;
      }
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={120}
      className="w-full h-28 rounded-lg bg-background/50"
    />
  );
};

// Voice Activity Indicator
const VoiceActivityIndicator = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className={`w-4 h-4 rounded-full transition-colors duration-300 ${
          isActive ? 'bg-primary animate-pulse' : 'bg-muted-foreground/30'
        }`} />
        {isActive && (
          <>
            <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary/50 animate-ping" />
            <div className="absolute -inset-1 w-6 h-6 rounded-full bg-primary/20 animate-pulse" />
          </>
        )}
      </div>
      <span className={`text-sm font-medium transition-colors ${
        isActive ? 'text-primary' : 'text-muted-foreground'
      }`}>
        {isActive ? 'Voice Active' : 'Listening...'}
      </span>
    </div>
  );
};

export const VoiceFirstSection = () => {
  const [isListening, setIsListening] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [demoPhase, setDemoPhase] = useState(0);

  // Demo animation
  useEffect(() => {
    const phrases = [
      "Create a purchase order workflow...",
      "Add vendor assessment node...",
      "Connect to approval gateway...",
      "Enable voice notifications..."
    ];

    const interval = setInterval(() => {
      setDemoPhase((prev) => (prev + 1) % 4);
      if (isListening) {
        setCurrentTranscript(phrases[demoPhase]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [demoPhase, isListening]);

  return (
    <section className="py-24 lg:py-32 bg-card relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <motion.div {...fadeInUp} className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <Radio className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">Voice-First Interface</span>
          </div>
          
          <h2 className="text-display-md font-light text-foreground mb-6">
            Speak to automate.
            <br />
            <span className="text-muted-foreground">See it respond.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            WebRTC-powered real-time voice with STT, TTS, and Vision AI. 
            Build workflows, manage vendors, and execute commands — all by voice.
          </p>
        </motion.div>

        {/* Main Demo Area */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="bg-background border border-border rounded-xl overflow-hidden">
            {/* Demo Header */}
            <div className="bg-secondary/50 px-6 py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-primary/60" />
                </div>
                <span className="text-sm text-muted-foreground">Voice Interface Demo</span>
              </div>
              <VoiceActivityIndicator isActive={isListening} />
            </div>

            {/* Demo Content */}
            <div className="p-8 grid lg:grid-cols-2 gap-8">
              {/* Left: Visualizers */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Waves className="w-4 h-4 text-primary" />
                      Waveform
                    </span>
                    <span className="text-xs text-muted-foreground">Real-time audio</span>
                  </div>
                  <WaveformVisualizer isActive={isListening} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Radio className="w-4 h-4 text-primary" />
                      Frequency Spectrum
                    </span>
                    <span className="text-xs text-muted-foreground">20Hz - 20kHz</span>
                  </div>
                  <SpectrumVisualizer isActive={isListening} />
                </div>

                {/* Language Selection */}
                <div>
                  <span className="text-sm font-medium text-foreground flex items-center gap-2 mb-3">
                    <Languages className="w-4 h-4 text-primary" />
                    Supported Languages
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang) => (
                      <span
                        key={lang.code}
                        className="px-3 py-1.5 bg-secondary text-secondary-foreground text-xs font-medium rounded"
                      >
                        {lang.code}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Controls & Transcript */}
              <div className="space-y-6">
                {/* Microphone Button */}
                <div className="flex flex-col items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsListening(!isListening)}
                    className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isListening
                        ? 'bg-primary shadow-lg shadow-primary/30'
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                  >
                    {isListening && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-primary/30"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                    <Mic className={`w-10 h-10 relative z-10 ${
                      isListening ? 'text-primary-foreground' : 'text-foreground'
                    }`} />
                  </motion.button>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {isListening ? 'Tap to stop' : 'Tap to speak'}
                  </p>
                </div>

                {/* Live Transcript */}
                <div className="bg-secondary/30 border border-border rounded-lg p-4 min-h-[100px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      Live Transcript
                    </span>
                  </div>
                  <p className="text-foreground">
                    {isListening ? (
                      <span className="flex items-center gap-2">
                        {currentTranscript}
                        <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
                      </span>
                    ) : (
                      <span className="text-muted-foreground italic">
                        Click the microphone to start...
                      </span>
                    )}
                  </p>
                </div>

                {/* Voice Command Suggestions */}
                <div>
                  <span className="text-sm font-medium text-foreground mb-3 block">
                    Try saying:
                  </span>
                  <div className="space-y-2">
                    {[
                      '"Create a vendor onboarding workflow"',
                      '"Show purchase order analytics"',
                      '"Add voice trigger node"'
                    ].map((cmd, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2 bg-secondary/50 rounded text-sm text-muted-foreground"
                      >
                        <Zap className="w-3 h-3 text-primary" />
                        {cmd}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Capabilities Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {voiceCapabilities.map((cap, idx) => (
            <motion.div
              key={cap.title}
              variants={staggerItem}
              className="group bg-background border border-border p-6 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <cap.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">{cap.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{cap.description}</p>
              <div className="flex flex-wrap gap-1">
                {cap.specs.map((spec) => (
                  <span
                    key={spec}
                    className="text-xs px-2 py-1 bg-secondary text-secondary-foreground"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">Powered by</p>
          <div className="flex flex-wrap justify-center gap-6">
            {['WebRTC', 'WebAudio API', 'Whisper', 'LangChain', 'YOLO v8'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-secondary/50 text-muted-foreground text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
