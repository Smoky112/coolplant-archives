import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, CheckCircle, Lock, Unlock } from "lucide-react";
import RetroLayout from "@/layouts/RetroLayout";
import RetroPanel from "@/components/RetroPanel";
import RetroButton from "@/components/RetroButton";
import { toast } from "sonner";
import { isFirewallRestored, setFirewallRestored } from "@/lib/systemState";

// Puzzle: Bloccare le porte corrette
const PORTS = [
  { port: 21, name: "FTP", shouldBlock: false },
  { port: 22, name: "SSH", shouldBlock: false },
  { port: 23, name: "TELNET", shouldBlock: true },
  { port: 80, name: "HTTP", shouldBlock: false },
  { port: 135, name: "RPC", shouldBlock: true },
  { port: 443, name: "HTTPS", shouldBlock: false },
  { port: 445, name: "SMB", shouldBlock: true },
  { port: 1433, name: "MSSQL", shouldBlock: true },
  { port: 3389, name: "RDP", shouldBlock: false },
  { port: 4444, name: "BACKDOOR", shouldBlock: true },
];

const FirewallPage = () => {
  const navigate = useNavigate();
  const [isRestored, setIsRestored] = useState(false);
  const [blockedPorts, setBlockedPorts] = useState<number[]>([]);

  useEffect(() => {
    if (isFirewallRestored()) {
      setIsRestored(true);
    }
  }, []);

  const togglePort = (port: number) => {
    if (isRestored) return;
    setBlockedPorts(prev => 
      prev.includes(port) ? prev.filter(p => p !== port) : [...prev, port]
    );
  };

  const applyRules = () => {
    const shouldBeBlocked = PORTS.filter(p => p.shouldBlock).map(p => p.port);
    const shouldBeOpen = PORTS.filter(p => !p.shouldBlock).map(p => p.port);

    const correctlyBlocked = shouldBeBlocked.every(p => blockedPorts.includes(p));
    const correctlyOpen = shouldBeOpen.every(p => !blockedPorts.includes(p));

    if (correctlyBlocked && correctlyOpen) {
      setFirewallRestored(true);
      setIsRestored(true);
      toast.success("FIREWALL RIPRISTINATO!", {
        description: "Le regole sono state applicate correttamente.",
      });
    } else {
      toast.error("Configurazione errata", {
        description: "Alcune porte non sono configurate correttamente. Riprova.",
      });
    }
  };

  const resetPuzzle = () => {
    setBlockedPorts([]);
  };

  return (
    <RetroLayout>
      <RetroPanel header={`🛡️ FIREWALL - ${isRestored ? "ATTIVO" : "BREACH"}`}>
        {isRestored ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle className="w-16 h-16 mx-auto text-[hsl(var(--status-success))]" />
            <h2 className="text-xl font-bold text-[hsl(var(--status-success))]">
              SISTEMA RIPRISTINATO
            </h2>
            <p className="text-muted-foreground">
              Il Firewall è attivo con configurazione sicura.
            </p>
            <RetroButton onClick={() => navigate("/")}>
              ← Torna alla Home
            </RetroButton>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="retro-panel-inset p-3 text-[11px] space-y-2">
              <p className="text-[hsl(var(--status-danger))] font-bold blink">
                ⚠️ BREACH RILEVATO - Regole firewall corrotte
              </p>
              <p className="text-muted-foreground">
                Configura correttamente il firewall: blocca le porte pericolose e lascia aperte quelle necessarie.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {PORTS.map((p) => (
                <button
                  key={p.port}
                  onClick={() => togglePort(p.port)}
                  className={`
                    p-3 border-2 flex flex-col items-center gap-1 transition-all text-center
                    ${blockedPorts.includes(p.port)
                      ? "border-destructive bg-destructive/20"
                      : "border-[hsl(var(--status-success))] bg-[hsl(var(--status-success))]/10"
                    }
                  `}
                >
                  {blockedPorts.includes(p.port) ? (
                    <Lock className="w-5 h-5 text-destructive" />
                  ) : (
                    <Unlock className="w-5 h-5 text-[hsl(var(--status-success))]" />
                  )}
                  <span className="font-mono text-[11px] font-bold">:{p.port}</span>
                  <span className="text-[9px] text-muted-foreground">{p.name}</span>
                  <span className={`text-[8px] ${blockedPorts.includes(p.port) ? "text-destructive" : "text-[hsl(var(--status-success))]"}`}>
                    {blockedPorts.includes(p.port) ? "BLOCKED" : "OPEN"}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[10px] text-muted-foreground">
                Porte bloccate: {blockedPorts.length}/{PORTS.length}
              </span>
              <div className="flex gap-2">
                <RetroButton size="sm" onClick={resetPuzzle}>
                  Reset
                </RetroButton>
                <RetroButton size="sm" onClick={applyRules}>
                  Applica Regole
                </RetroButton>
              </div>
            </div>

            <div className="retro-panel-inset p-2 text-[9px] text-muted-foreground space-y-1">
              <p>HINT: Blocca porte usate per attacchi comuni (TELNET, RPC, SMB vulnerabili).</p>
              <p>Lascia aperte porte per servizi legittimi (HTTP, HTTPS, SSH, FTP, RDP).</p>
              <p className="text-[hsl(var(--status-danger))]">⚠️ Porta 4444 rilevata come backdoor!</p>
            </div>
          </div>
        )}
      </RetroPanel>
    </RetroLayout>
  );
};

export default FirewallPage;
