import { useState, useEffect, useCallback } from 'react';

interface WirePuzzleProps {
  onSuccess: () => void;
}

const CORRECT_SEQUENCE = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
const WIRE_COLORS: Record<string, { bg: string; glow: string; label: string }> = {
  red: { bg: '#dc2626', glow: '#ef4444', label: 'R' },
  blue: { bg: '#2563eb', glow: '#3b82f6', label: 'B' },
  green: { bg: '#16a34a', glow: '#22c55e', label: 'G' },
  yellow: { bg: '#ca8a04', glow: '#eab308', label: 'Y' },
  purple: { bg: '#9333ea', glow: '#a855f7', label: 'P' },
  orange: { bg: '#ea580c', glow: '#f97316', label: 'O' },
};

const shuffleArray = (array: string[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  if (JSON.stringify(shuffled) === JSON.stringify(CORRECT_SEQUENCE)) {
    [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
  }
  return shuffled;
};

export const WirePuzzle = ({ onSuccess }: WirePuzzleProps) => {
  const [wires, setWires] = useState<string[]>(() => shuffleArray([...CORRECT_SEQUENCE]));
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(90);
  const [errors, setErrors] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showSparks, setShowSparks] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [status, setStatus] = useState('UNSTABLE');

  useEffect(() => {
    if (isSuccess || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [isSuccess, timeLeft]);

  useEffect(() => {
    if (JSON.stringify(wires) === JSON.stringify(CORRECT_SEQUENCE)) {
      setIsSuccess(true);
      setStatus('STABILIZED');
      setTimeout(() => onSuccess(), 2000);
    }
  }, [wires, onSuccess]);

  useEffect(() => {
    if (errors >= 3) setShowHint(true);
  }, [errors]);

  const playBeep = useCallback(() => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.frequency.value = 200;
      oscillator.type = 'square';
      gainNode.gain.value = 0.1;
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      console.log('Audio not available');
    }
  }, []);

  const triggerError = useCallback(() => {
    setErrors(e => e + 1);
    setIsShaking(true);
    setShowSparks(true);
    playBeep();
    setTimeout(() => setIsShaking(false), 500);
    setTimeout(() => setShowSparks(false), 800);
  }, [playBeep]);

  const handleSlotClick = (index: number) => {
    if (isSuccess) return;
    
    if (selectedSlot === null) {
      setSelectedSlot(index);
    } else {
      if (selectedSlot !== index) {
        const newWires = [...wires];
        [newWires[selectedSlot], newWires[index]] = [newWires[index], newWires[selectedSlot]];
        setWires(newWires);
        
        const slot1Correct = newWires[selectedSlot] === CORRECT_SEQUENCE[selectedSlot];
        const slot2Correct = newWires[index] === CORRECT_SEQUENCE[index];
        
        if (!slot1Correct && !slot2Correct) {
          triggerError();
        }
      }
      setSelectedSlot(null);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isWireCorrect = (index: number) => wires[index] === CORRECT_SEQUENCE[index];

  const resetPuzzle = () => {
    setWires(shuffleArray([...CORRECT_SEQUENCE]));
    setTimeLeft(90);
    setErrors(0);
    setShowHint(false);
    setSelectedSlot(null);
  };

  if (timeLeft <= 0 && !isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="text-destructive text-lg mb-4 animate-pulse">⚠️ TIMEOUT - SYSTEM FAILURE ⚠️</div>
        <button onClick={resetPuzzle} className="retro-button">RETRY</button>
      </div>
    );
  }

  return (
    <div className={`relative ${isShaking ? 'animate-shake' : ''}`}>
      {/* Sparks effect */}
      {showSparks && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[hsl(var(--status-warning))] rounded-full animate-spark"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${30 + Math.random() * 40}%`,
                animationDelay: `${Math.random() * 0.3}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Terminal frame */}
      <div className="retro-panel-inset p-4 bg-[hsl(220,30%,8%)]">
        {/* Header */}
        <div className="border-b border-[hsl(120,50%,30%)] pb-2 mb-4 font-mono text-[10px]">
          <div className="flex justify-between items-center text-[hsl(120,100%,50%)]">
            <span>╔══ COOLPLANT EMERGENCY PANEL v1.2 ══╗</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-destructive animate-pulse">⚠️ CRITICAL OVERLOAD - REWIRE NOW</span>
            <span className={`${timeLeft < 20 ? 'text-destructive animate-pulse' : 'text-[hsl(120,100%,50%)]'}`}>
              [{formatTime(timeLeft)}]
            </span>
          </div>
        </div>

        {/* Timer bar */}
        <div className="h-2 bg-muted mb-4 overflow-hidden border border-border">
          <div 
            className={`h-full transition-all duration-1000 ${timeLeft < 20 ? 'bg-destructive' : 'bg-[hsl(var(--status-online))]'}`}
            style={{ width: `${(timeLeft / 90) * 100}%` }}
          />
        </div>

        {/* Hint diagram */}
        {showHint && (
          <div className="mb-4 p-2 border border-[hsl(var(--status-warning))] bg-[hsl(var(--status-warning)/0.1)] text-[10px] font-mono">
            <div className="text-[hsl(var(--status-warning))]">
              [CORRUPTED DIAGRAM: R--B--G--Y--P--O]
            </div>
            <div className="text-[9px] text-muted-foreground mt-1">
              ░░▓▓░ SEQUENCE FRAGMENT DETECTED ░▓▓░░
            </div>
          </div>
        )}

        {/* Wire grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {wires.map((color, index) => (
            <div
              key={index}
              onClick={() => handleSlotClick(index)}
              className={`
                relative h-16 border-2 cursor-pointer transition-all duration-200
                ${selectedSlot === index ? 'border-primary scale-105' : 'border-[hsl(120,50%,30%)]'}
                ${isWireCorrect(index) && isSuccess ? 'border-[hsl(var(--status-online))]' : ''}
                hover:border-[hsl(120,50%,50%)]
                bg-[hsl(220,30%,5%)]
              `}
            >
              <svg className="w-full h-full" viewBox="0 0 60 40">
                <defs>
                  <linearGradient id={`wire-${color}-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={WIRE_COLORS[color].bg} />
                    <stop offset="50%" stopColor={WIRE_COLORS[color].glow} />
                    <stop offset="100%" stopColor={WIRE_COLORS[color].bg} />
                  </linearGradient>
                </defs>
                <rect
                  x="5"
                  y="15"
                  width="50"
                  height="10"
                  rx="2"
                  fill={`url(#wire-${color}-${index})`}
                  className={`${isWireCorrect(index) && isSuccess ? 'animate-pulse' : ''}`}
                  style={{
                    filter: isWireCorrect(index) && isSuccess ? `drop-shadow(0 0 5px ${WIRE_COLORS[color].glow})` : 'none'
                  }}
                />
                <text
                  x="30"
                  y="24"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {WIRE_COLORS[color].label}
                </text>
              </svg>
              
              <div className="absolute bottom-0 right-1 text-[9px] text-[hsl(120,50%,40%)] font-mono">
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Status */}
        <div className="flex justify-between items-center text-[10px] border-t border-[hsl(120,50%,30%)] pt-2 font-mono">
          <span className="text-[hsl(120,100%,50%)]">
            {showSparks && <span className="text-[hsl(var(--status-warning))]">[SPARKS] </span>}
            STATUS: <span className={isSuccess ? 'text-[hsl(var(--status-online))]' : 'text-destructive'}>[{status}]</span>
          </span>
          <span className="text-destructive">ERRORS: {errors}</span>
        </div>

        {/* Success message */}
        {isSuccess && (
          <div className="mt-4 text-center animate-pulse font-mono">
            <div className="text-[hsl(var(--status-online))] text-sm">✓ SISTEMA STABILIZZATO</div>
            <div className="text-[hsl(120,100%,40%)] text-[11px]">EDEN ONLINE</div>
            <div className="text-[9px] text-[hsl(120,50%,40%)] mt-2">LOG: Accesso G.Rossi sbloccato</div>
          </div>
        )}

        {/* Instructions */}
        {!isSuccess && (
          <div className="mt-4 text-[9px] text-muted-foreground text-center font-mono">
            Clicca due slot per scambiare i fili. Sequenza: R→B→G→Y→P→O
          </div>
        )}
      </div>
    </div>
  );
};
