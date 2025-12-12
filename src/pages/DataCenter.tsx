import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { setServerFarmRestored } from '@/lib/systemState';
import { WirePuzzle } from '@/components/datacenter/WirePuzzle';
import { ImageAnalyzer } from '@/components/datacenter/ImageAnalyzer';
import { CrosswordPuzzle } from '@/components/datacenter/CrosswordPuzzle';

type GamePhase = 'intro' | 'wire' | 'image' | 'crossword' | 'complete';

const DataCenter = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [introStep, setIntroStep] = useState(0);

  // Check authorization
  useEffect(() => {
    if (!user || user.username !== 'l.tagliaferri') {
      toast({
        title: "Accesso Negato",
        description: "Non hai le autorizzazioni per accedere al Data Center.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [user, navigate]);

  // Intro cutscene text
  const introTexts = [
    "> ACCESSO RILEVATO: l.tagliaferri",
    "> CARICAMENTO PROTOCOLLO DI EMERGENZA...",
    "> Piano -1 | DATA CENTER | CoolPlant Corp.",
    "> ATTENZIONE: Alimentazione instabile",
    "> Le luci del corridoio tremolano...",
    "> Temperatura: 8°C | Umidità: 45%",
    "> Server EDEN: CRITICO - Richiesto intervento manuale",
    "> INIZIALIZZAZIONE PANNELLO DI EMERGENZA..."
  ];

  // Intro animation
  useEffect(() => {
    if (phase === 'intro' && introStep < introTexts.length) {
      const timer = setTimeout(() => {
        setIntroStep(s => s + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else if (phase === 'intro' && introStep >= introTexts.length) {
      const timer = setTimeout(() => {
        setPhase('wire');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [phase, introStep]);

  const handleWireSuccess = () => {
    toast({
      title: "Fase 1 Completata",
      description: "Pannello elettrico stabilizzato. Procedere all'analisi immagini.",
    });
    setTimeout(() => setPhase('image'), 1500);
  };

  const handleImageSuccess = () => {
    toast({
      title: "Fase 2 Completata", 
      description: "Codici estratti. Procedere al cruciverba finale.",
    });
    setTimeout(() => setPhase('crossword'), 1500);
  };

  const handleCrosswordSuccess = () => {
    setServerFarmRestored(true);
    setPhase('complete');
    toast({
      title: "SERVER EDEN RIPRISTINATO",
      description: "Tutti i sistemi sono stati stabilizzati.",
    });
  };

  if (!user || user.username !== 'l.tagliaferri') {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Scanlines overlay */}
      <div className="fixed inset-0 pointer-events-none bg-scanlines opacity-10 z-50" />
      
      {/* Flickering light effect */}
      <div className="fixed inset-0 pointer-events-none animate-flicker opacity-5 bg-white z-40" />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 border-b border-green-500/30 pb-4">
          <h1 className="text-2xl md:text-3xl glitch-text">
            ╔══════════════════════════════════════╗
          </h1>
          <h2 className="text-xl md:text-2xl my-2">
            ║ DATA CENTER - PIANO -1 - EMERGENZA ║
          </h2>
          <h1 className="text-2xl md:text-3xl glitch-text">
            ╚══════════════════════════════════════╝
          </h1>
          <div className="mt-2 text-sm text-green-600">
            CoolPlant Corporation | Server EDEN Recovery Protocol
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-4 mb-8">
          {(['wire', 'image', 'crossword'] as const).map((p, idx) => (
            <div
              key={p}
              className={`
                px-4 py-2 border text-sm
                ${phase === p ? 'border-green-400 bg-green-500/20 text-green-300' : ''}
                ${(['wire', 'image', 'crossword'].indexOf(phase) > idx) || phase === 'complete'
                  ? 'border-green-500 text-green-400' 
                  : 'border-green-500/30 text-green-600'}
              `}
            >
              {idx + 1}. {p === 'wire' ? 'WIRE PUZZLE' : p === 'image' ? 'IMAGE ANALYZER' : 'CROSSWORD'}
              {((['wire', 'image', 'crossword'].indexOf(phase) > idx) || phase === 'complete') && ' ✓'}
            </div>
          ))}
        </div>

        {/* Game content */}
        <div className="max-w-4xl mx-auto">
          {/* Intro cutscene */}
          {phase === 'intro' && (
            <div className="border-2 border-green-500/50 bg-black/90 p-6">
              <div className="space-y-2">
                {introTexts.slice(0, introStep).map((text, idx) => (
                  <div 
                    key={idx} 
                    className={`
                      ${idx === introStep - 1 ? 'animate-fade-in' : ''}
                      ${text.includes('ATTENZIONE') || text.includes('CRITICO') ? 'text-red-400' : ''}
                      ${text.includes('tremolano') ? 'animate-pulse' : ''}
                    `}
                  >
                    {text}
                  </div>
                ))}
                {introStep < introTexts.length && (
                  <span className="animate-pulse">█</span>
                )}
              </div>
            </div>
          )}

          {/* Wire Puzzle */}
          {phase === 'wire' && (
            <WirePuzzle onSuccess={handleWireSuccess} />
          )}

          {/* Image Analyzer */}
          {phase === 'image' && (
            <ImageAnalyzer onSuccess={handleImageSuccess} />
          )}

          {/* Crossword Puzzle */}
          {phase === 'crossword' && (
            <CrosswordPuzzle onSuccess={handleCrosswordSuccess} />
          )}

          {/* Complete */}
          {phase === 'complete' && (
            <div className="text-center border-2 border-green-500 bg-black/90 p-8">
              <div className="text-4xl text-green-400 mb-4 animate-pulse">
                ✓ SERVER EDEN ONLINE
              </div>
              <div className="text-xl text-green-300 mb-6">
                Tutti i sistemi sono stati ripristinati con successo.
              </div>
              <div className="text-sm text-green-600 mb-8">
                <div>Password finale utilizzata: TARNISHED</div>
                <div>Operatore: Lorenzo Tagliaferri (CTO)</div>
                <div>Timestamp: {new Date().toISOString()}</div>
              </div>
              <button
                onClick={() => navigate('/')}
                className="retro-button px-6 py-2"
              >
                TORNA ALLA HOMEPAGE
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-green-600">
          Piano -1 | Temperatura Server Room: 18°C | UPS: 87% | 
          <span className="text-red-400 animate-pulse"> BACKUP POWER ACTIVE</span>
        </div>
      </div>
    </div>
  );
};

export default DataCenter;
