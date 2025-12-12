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
  // Ensure it's not already solved
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

  // Timer
  useEffect(() => {
    if (isSuccess || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [isSuccess, timeLeft]);

  // Check solution
  useEffect(() => {
    if (JSON.stringify(wires) === JSON.stringify(CORRECT_SEQUENCE)) {
      setIsSuccess(true);
      setStatus('STABILIZED');
      setTimeout(() => onSuccess(), 2000);
    }
  }, [wires, onSuccess]);

  // Show hint after 3 errors
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
        
        // Check if both positions are now correct
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

  if (timeLeft <= 0 && !isSuccess) {
    return (
      <div className="font-mono text-center">
        <div className="text-red-500 text-2xl mb-4 animate-pulse">⚠️ TIMEOUT - SYSTEM FAILURE ⚠️</div>
        <button 
          onClick={() => {
            setWires(shuffleArray([...CORRECT_SEQUENCE]));
            setTimeLeft(90);
            setErrors(0);
            setShowHint(false);
          }}
          className="retro-button"
        >
          RETRY
        </button>
      </div>
    );
  }

  return (
    <div className={`font-mono relative ${isShaking ? 'animate-shake' : ''}`}>
      {/* Scanlines overlay */}
      <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-20" />
      
      {/* Sparks effect */}
      {showSparks && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-spark"
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
      <div className="border-2 border-green-500/70 bg-black/95 p-4 text-green-400 max-w-md mx-auto">
        {/* Header */}
        <div className="border-b border-green-500/50 pb-2 mb-4">
          <div className="flex justify-between items-center">
            <span>╔══ COOLPLANT EMERGENCY PANEL v1.2 ══╗</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-red-400 animate-pulse">⚠️ CRITICAL OVERLOAD - REWIRE NOW</span>
            <span className={`${timeLeft < 20 ? 'text-red-400 animate-pulse' : ''}`}>
              [{formatTime(timeLeft)}]
            </span>
          </div>
        </div>

        {/* Timer bar */}
        <div className="h-2 bg-gray-800 mb-4 overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${timeLeft < 20 ? 'bg-red-500' : 'bg-green-500'}`}
            style={{ width: `${(timeLeft / 90) * 100}%` }}
          />
        </div>

        {/* Hint diagram */}
        {showHint && (
          <div className="mb-4 p-2 border border-yellow-500/50 bg-yellow-500/10">
            <div className="text-yellow-400 text-sm glitch-text">
              [CORRUPTED DIAGRAM: R--B--G--Y--P--O]
            </div>
            <div className="text-xs text-yellow-600 mt-1">
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
                ${selectedSlot === index ? 'border-white scale-105' : 'border-green-500/50'}
                ${isWireCorrect(index) && isSuccess ? 'border-green-400 shadow-[0_0_10px_#22c55e]' : ''}
                hover:border-green-300
              `}
            >
              {/* Wire SVG */}
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
              
              {/* Slot number */}
              <div className="absolute bottom-0 right-1 text-xs text-green-600">
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Status */}
        <div className="flex justify-between items-center text-sm border-t border-green-500/50 pt-2">
          <span>
            {showSparks && <span className="text-yellow-400">[SPARKS] </span>}
            STATUS: <span className={isSuccess ? 'text-green-400' : 'text-red-400'}>[{status}]</span>
          </span>
          <span className="text-red-400">ERRORS: {errors}</span>
        </div>

        {/* Success message */}
        {isSuccess && (
          <div className="mt-4 text-center animate-pulse">
            <div className="text-green-400 text-lg">✓ SISTEMA STABILIZZATO</div>
            <div className="text-green-300">EDEN ONLINE</div>
            <div className="text-xs text-green-600 mt-2">LOG: Accesso G.Rossi sbloccato</div>
          </div>
        )}

        {/* Instructions */}
        {!isSuccess && (
          <div className="mt-4 text-xs text-green-600 text-center">
            Clicca due slot per scambiare i fili. Sequenza: R→B→G→Y→P→O
          </div>
        )}
      </div>
    </div>
  );
};
