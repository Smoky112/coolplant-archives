import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { setServerFarmRestored } from '@/lib/systemState';
import { WirePuzzle } from '@/components/datacenter/WirePuzzle';
import { ImageAnalyzer } from '@/components/datacenter/ImageAnalyzer';
import { CrosswordPuzzle } from '@/components/datacenter/CrosswordPuzzle';
import RetroLayout from '@/layouts/RetroLayout';
import RetroPanel from '@/components/RetroPanel';
import RetroButton from '@/components/RetroButton';

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
    <RetroLayout>
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <RetroPanel header="🖥️ Data Center - Piano -1 - Emergenza">
          <div className="text-[11px] text-muted-foreground mb-2">
            Connesso a: COOLPLANT-DC01 | Stato: CRITICO | Data Sistema: 24/12/2001
          </div>
          <p className="text-[11px]">
            <span className="text-destructive font-bold">⚠️ ATTENZIONE:</span> Server EDEN in stato critico. 
            Completare le procedure di emergenza per ripristinare i sistemi.
          </p>
        </RetroPanel>

        {/* Progress indicator */}
        <RetroPanel header="📊 Stato Procedure">
          <div className="flex flex-wrap gap-2 justify-center">
            {(['wire', 'image', 'crossword'] as const).map((p, idx) => {
              const isActive = phase === p;
              const isCompleted = (['wire', 'image', 'crossword'].indexOf(phase) > idx) || phase === 'complete';
              
              return (
                <div
                  key={p}
                  className={`
                    retro-panel-inset px-4 py-2 text-[11px]
                    ${isActive ? 'border-2 border-primary' : ''}
                  `}
                >
                  <span className={isCompleted ? 'text-[hsl(var(--status-online))]' : isActive ? 'text-primary font-bold' : 'text-muted-foreground'}>
                    {idx + 1}. {p === 'wire' ? 'WIRE PUZZLE' : p === 'image' ? 'IMAGE ANALYZER' : 'CROSSWORD'}
                    {isCompleted && ' ✓'}
                  </span>
                </div>
              );
            })}
          </div>
        </RetroPanel>

        {/* Game content */}
        {phase === 'intro' && (
          <RetroPanel header="⏳ Inizializzazione Sistema">
            <div className="retro-panel-inset p-4 bg-[hsl(220,30%,8%)] min-h-[200px]">
              <div className="space-y-1 font-mono text-[11px]">
                {introTexts.slice(0, introStep).map((text, idx) => (
                  <div 
                    key={idx} 
                    className={`
                      ${text.includes('ATTENZIONE') || text.includes('CRITICO') ? 'text-destructive' : 'text-[hsl(120,100%,50%)]'}
                      ${text.includes('tremolano') ? 'animate-pulse' : ''}
                    `}
                  >
                    {text}
                  </div>
                ))}
                {introStep < introTexts.length && (
                  <span className="text-[hsl(120,100%,50%)] animate-pulse">█</span>
                )}
              </div>
            </div>
          </RetroPanel>
        )}

        {phase === 'wire' && (
          <RetroPanel header="🔌 Fase 1: Sequence Wire Puzzle">
            <p className="text-[10px] text-muted-foreground mb-3">
              Riordina i fili nel pannello elettrico per stabilizzare l'alimentazione del server EDEN.
            </p>
            <WirePuzzle onSuccess={handleWireSuccess} />
          </RetroPanel>
        )}

        {phase === 'image' && (
          <RetroPanel header="🔍 Fase 2: Image Code Analyzer">
            <p className="text-[10px] text-muted-foreground mb-3">
              Analizza le immagini corrotte per estrarre i codici di accesso nascosti.
            </p>
            <ImageAnalyzer onSuccess={handleImageSuccess} />
          </RetroPanel>
        )}

        {phase === 'crossword' && (
          <RetroPanel header="🧩 Fase 3: Crossword Decoder">
            <p className="text-[10px] text-muted-foreground mb-3">
              Risolvi il cruciverba per ottenere la password finale di ripristino.
            </p>
            <CrosswordPuzzle onSuccess={handleCrosswordSuccess} />
          </RetroPanel>
        )}

        {phase === 'complete' && (
          <RetroPanel header="✅ Ripristino Completato">
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🖥️</div>
              <h2 className="text-lg font-bold text-[hsl(var(--status-online))] mb-4">
                SERVER EDEN ONLINE
              </h2>
              <p className="text-[11px] mb-4">
                Tutti i sistemi sono stati ripristinati con successo.
              </p>
              <div className="retro-panel-inset p-4 mb-4 text-left max-w-md mx-auto">
                <p className="text-[10px] font-mono text-[hsl(var(--status-online))]">
                  PASSWORD FINALE: TARNISHED<br/>
                  OPERATORE: Lorenzo Tagliaferri (CTO)<br/>
                  TIMESTAMP: {new Date().toISOString()}<br/>
                  STATUS: SYSTEM RESTORED
                </p>
              </div>
              <RetroButton onClick={() => navigate('/')}>
                Torna alla Home
              </RetroButton>
            </div>
          </RetroPanel>
        )}

        {/* Footer info */}
        <RetroPanel header="ℹ️ Informazioni Sistema">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-[10px]">
            <div className="retro-panel-inset p-2">
              <div className="font-bold">Piano</div>
              <div className="text-muted-foreground">-1</div>
            </div>
            <div className="retro-panel-inset p-2">
              <div className="font-bold">Temperatura</div>
              <div className="text-muted-foreground">18°C</div>
            </div>
            <div className="retro-panel-inset p-2">
              <div className="font-bold">UPS</div>
              <div className="text-[hsl(var(--status-warning))]">87%</div>
            </div>
            <div className="retro-panel-inset p-2">
              <div className="font-bold">Power</div>
              <div className="text-destructive animate-pulse">BACKUP</div>
            </div>
          </div>
        </RetroPanel>
      </div>
    </RetroLayout>
  );
};

export default DataCenter;
