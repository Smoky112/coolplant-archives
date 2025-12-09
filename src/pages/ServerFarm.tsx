import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Server, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import RetroLayout from "@/layouts/RetroLayout";
import RetroPanel from "@/components/RetroPanel";
import RetroButton from "@/components/RetroButton";
import { toast } from "sonner";
import { isServerFarmRestored, setServerFarmRestored } from "@/lib/systemState";

// Puzzle: Riordinare i server nella sequenza corretta
const CORRECT_SEQUENCE = ["SRV-01", "SRV-02", "SRV-03", "SRV-04", "SRV-05"];
const INITIAL_SHUFFLED = ["SRV-03", "SRV-01", "SRV-05", "SRV-02", "SRV-04"];

const ServerFarm = () => {
  const navigate = useNavigate();
  const [isRestored, setIsRestored] = useState(false);
  const [servers, setServers] = useState<string[]>(INITIAL_SHUFFLED);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (isServerFarmRestored()) {
      setIsRestored(true);
    }
  }, []);

  const handleServerClick = (index: number) => {
    if (isRestored) return;

    if (selectedIndex === null) {
      setSelectedIndex(index);
    } else {
      // Scambia i server
      const newServers = [...servers];
      [newServers[selectedIndex], newServers[index]] = [newServers[index], newServers[selectedIndex]];
      setServers(newServers);
      setSelectedIndex(null);
      setAttempts(prev => prev + 1);

      // Verifica se la sequenza è corretta
      if (JSON.stringify(newServers) === JSON.stringify(CORRECT_SEQUENCE)) {
        setServerFarmRestored(true);
        setIsRestored(true);
        toast.success("SERVER FARM RIPRISTINATA!", {
          description: "Tutti i server sono ora online e operativi.",
        });
      }
    }
  };

  const resetPuzzle = () => {
    setServers(INITIAL_SHUFFLED);
    setSelectedIndex(null);
    setAttempts(0);
  };

  return (
    <RetroLayout>
      <RetroPanel header={`🖥️ SERVER FARM - ${isRestored ? "ONLINE" : "OFFLINE"}`}>
        {isRestored ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle className="w-16 h-16 mx-auto text-[hsl(var(--status-success))]" />
            <h2 className="text-xl font-bold text-[hsl(var(--status-success))]">
              SISTEMA RIPRISTINATO
            </h2>
            <p className="text-muted-foreground">
              La Server Farm è tornata operativa. Tutti i 5 server sono online.
            </p>
            <RetroButton onClick={() => navigate("/")}>
              ← Torna alla Home
            </RetroButton>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="retro-panel-inset p-3 text-[11px] space-y-2">
              <p className="text-[hsl(var(--status-danger))] font-bold blink">
                ⚠️ ERRORE CRITICO: Sequenza di boot corrotta
              </p>
              <p className="text-muted-foreground">
                I server devono essere riavviati nella sequenza corretta: SRV-01 → SRV-02 → SRV-03 → SRV-04 → SRV-05
              </p>
              <p className="text-muted-foreground text-[10px]">
                Clicca su due server per scambiarli di posizione.
              </p>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {servers.map((server, index) => (
                <button
                  key={index}
                  onClick={() => handleServerClick(index)}
                  className={`
                    p-4 border-2 flex flex-col items-center gap-2 transition-all
                    ${selectedIndex === index 
                      ? "border-primary bg-primary/20" 
                      : "border-border hover:border-primary/50 bg-muted"
                    }
                  `}
                >
                  <Server className={`w-8 h-8 ${selectedIndex === index ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="font-mono text-[10px] font-bold">{server}</span>
                  <span className="text-[9px] text-[hsl(var(--status-danger))]">
                    <XCircle className="w-3 h-3 inline" /> OFFLINE
                  </span>
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center text-[10px] text-muted-foreground">
              <span>Tentativi: {attempts}</span>
              <RetroButton size="sm" onClick={resetPuzzle}>
                <RotateCcw className="w-3 h-3 mr-1" /> Reset
              </RetroButton>
            </div>

            <div className="retro-panel-inset p-2 text-[9px] font-mono text-muted-foreground">
              <p>[LOG] Ultimo boot riuscito: 23/12/2001 23:45:00</p>
              <p>[ERR] Boot sequence interrupted at 24/12/2001 07:45:25</p>
              <p className="text-[hsl(var(--status-danger))]">[CRITICAL] Manual intervention required</p>
            </div>
          </div>
        )}
      </RetroPanel>
    </RetroLayout>
  );
};

export default ServerFarm;
