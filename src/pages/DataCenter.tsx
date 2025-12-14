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
    "> Server EDEN: CRITICO - Richiesto intervento manuale",
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
  }, [phase, introStep, introTexts.length]);

  const handleWireSuccess = () => {
    toast({
      title: "ALIMENTAZIONE STABILIZZATA",
      description: "Patch bay riconnessa. Inizializzazione analisi forense...",
      className: "bg-green-900 border-green-500 text-green-100"
    });
    setTimeout(() => setPhase('image'), 1500);
  };

  const handleImageSuccess = () => {
    toast({
      title: "DATI ESTRATTI",
      description: "File audio recuperato. Avvio decrittazione finale...",
      className: "bg-green-900 border-green-500 text-green-100"
    });
    setTimeout(() => setPhase('crossword'), 1500);
  };

  const handleCrosswordSuccess = () => {
    setServerFarmRestored(true);
    setPhase('complete');
    toast({
      title: "SERVER EDEN ONLINE",
      description: "Tutti i sistemi sono operativi.",
      className: "bg-green-900 border-green-500 text-green-100"
    });
  };

  if (!user || user.username !== 'l.tagliaferri') {
    return null;
  }

  return (
    <RetroLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <RetroPanel header="🖥️ Data Center - Piano -1 - Emergenza">
          <div className="flex justify-between items-center text-[10px] text-muted-foreground mb-2 font-mono">
             <span>HOST: COOLPLANT-DC01</span>
             <span>DATE: 24/12/2001</span>
          </div>
          <p className="text-xs font-mono">
            <span className="text-destructive font-bold animate-pulse">⚠️ CRITICAL ERROR:</span> Server EDEN offline. 
            Seguire le procedure di ripristino manuale.
          </p>
        </RetroPanel>

        {/* Progress Bar */}
        <div className="flex justify-between items-center px-4 py-2 bg-black/40 border border-green-900/30 rounded font-mono text-[10px]">
           {['CABLAGGIO', 'ANALISI SPETTRALE', 'DECODIFICA'].map((label, idx) => {
             const phases = ['wire', 'image', 'crossword', 'complete'];
             const currentIdx = phases.indexOf(phase);
             const isActive = currentIdx === idx;
             const isDone = currentIdx > idx;
             
             return (
               <div key={label} className={`flex items-center gap-2 ${isActive ? 'text-green-400 font-bold' : isDone ? 'text-green-700' : 'text-gray-700'}`}>
                 <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : isDone ? 'bg-green-700' : 'bg-gray-800'}`} />
                 {label}
               </div>
             )
           })}
        </div>

        {/* Game Content */}
        {phase === 'intro' && (
          <RetroPanel header="System Boot">
            <div className="retro-panel-inset p-6 bg-black min-h-[300px] flex flex-col justify-end">
              <div className="space-y-2 font-mono text-xs">
                {introTexts.slice(0, introStep).map((text, idx) => (
                  <div key={idx} className={`${text.includes('ATTENZIONE') || text.includes('CRITICO') ? 'text-red-500' : 'text-green-500'}`}>
                    {text}
                  </div>
                ))}
                {introStep < introTexts.length && <span className="text-green-500 animate-pulse">_</span>}
              </div>
            </div>
          </RetroPanel>
        )}

        {phase === 'wire' && (
          <RetroPanel header="Fase 1: Patch Bay Reconnection">
            <WirePuzzle onSuccess={handleWireSuccess} />
          </RetroPanel>
        )}

        {phase === 'image' && (
          <RetroPanel header="Fase 2: Spectral Image Forensics">
            <ImageAnalyzer onSuccess={handleImageSuccess} />
          </RetroPanel>
        )}

        {phase === 'crossword' && (
          <RetroPanel header="Fase 3: Override Protocol">
            <CrosswordPuzzle onSuccess={handleCrosswordSuccess} />
          </RetroPanel>
        )}

        {phase === 'complete' && (
          <RetroPanel header="System Restore Complete">
            <div className="text-center py-12 space-y-6">
              <div className="text-6xl animate-bounce">💾</div>
              <h2 className="text-2xl font-bold text-green-500 font-mono tracking-widest">
                SYSTEM ONLINE
              </h2>
              <div className="retro-panel-inset p-6 max-w-md mx-auto bg-black text-left font-mono text-xs text-green-400 space-y-2">
                <p>STATUS: NORMAL</p>
                <p>PASSWORD: TARNISHED</p>
                <p>UPTIME: 00:00:01</p>
                <p className="text-white pt-4">Benvenuto, Lorenzo.</p>
              </div>
              <RetroButton onClick={() => navigate('/')}>
                TORNA ALLA DASHBOARD
              </RetroButton>
            </div>
          </RetroPanel>
        )}
      </div>
    </RetroLayout>
  );
};

export default DataCenter;
