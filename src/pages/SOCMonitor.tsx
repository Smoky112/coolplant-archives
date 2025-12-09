import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, CheckCircle, AlertTriangle } from "lucide-react";
import RetroLayout from "@/layouts/RetroLayout";
import RetroPanel from "@/components/RetroPanel";
import RetroButton from "@/components/RetroButton";
import { toast } from "sonner";
import { isSOCMonitorRestored, setSOCMonitorRestored } from "@/lib/systemState";

// Puzzle: Trovare le anomalie nei log
const LOG_ENTRIES = [
  { id: 1, time: "07:42:15", message: "User login: g.rossi@coolplant.it", isAnomaly: false },
  { id: 2, time: "07:43:22", message: "File access: /reports/monthly.pdf", isAnomaly: false },
  { id: 3, time: "07:44:01", message: "User login: root@192.168.1.100", isAnomaly: true },
  { id: 4, time: "07:44:33", message: "Firewall rule modified: ALLOW ALL", isAnomaly: true },
  { id: 5, time: "07:45:00", message: "Camera CAM-15 disconnected", isAnomaly: true },
  { id: 6, time: "07:45:12", message: "Backup job completed", isAnomaly: false },
  { id: 7, time: "07:45:25", message: "Door access: Piano 15 - Badge #000", isAnomaly: true },
  { id: 8, time: "07:46:00", message: "Email sent: newsletter@coolplant.it", isAnomaly: false },
];

const TOTAL_ANOMALIES = LOG_ENTRIES.filter(l => l.isAnomaly).length;

const SOCMonitor = () => {
  const navigate = useNavigate();
  const [isRestored, setIsRestored] = useState(false);
  const [selectedLogs, setSelectedLogs] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (isSOCMonitorRestored()) {
      setIsRestored(true);
    }
  }, []);

  const toggleLog = (id: number) => {
    if (isRestored || showResult) return;
    setSelectedLogs(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const checkAnomalies = () => {
    const correctSelections = selectedLogs.filter(id => 
      LOG_ENTRIES.find(l => l.id === id)?.isAnomaly
    );
    const incorrectSelections = selectedLogs.filter(id => 
      !LOG_ENTRIES.find(l => l.id === id)?.isAnomaly
    );

    if (correctSelections.length === TOTAL_ANOMALIES && incorrectSelections.length === 0) {
      setSOCMonitorRestored(true);
      setIsRestored(true);
      toast.success("SOC MONITOR RIPRISTINATO!", {
        description: "Tutte le anomalie sono state identificate correttamente.",
      });
    } else {
      setShowResult(true);
      toast.error("Analisi incorretta", {
        description: `Trovate ${correctSelections.length}/${TOTAL_ANOMALIES} anomalie. ${incorrectSelections.length} falsi positivi.`,
      });
    }
  };

  const resetPuzzle = () => {
    setSelectedLogs([]);
    setShowResult(false);
  };

  return (
    <RetroLayout>
      <RetroPanel header={`👁️ SOC MONITOR - ${isRestored ? "OPERATIVO" : "DEGRADATO"}`}>
        {isRestored ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle className="w-16 h-16 mx-auto text-[hsl(var(--status-success))]" />
            <h2 className="text-xl font-bold text-[hsl(var(--status-success))]">
              SISTEMA RIPRISTINATO
            </h2>
            <p className="text-muted-foreground">
              Il Security Operations Center è tornato operativo al 100%.
            </p>
            <RetroButton onClick={() => navigate("/")}>
              ← Torna alla Home
            </RetroButton>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="retro-panel-inset p-3 text-[11px] space-y-2">
              <p className="text-[hsl(var(--status-warning))] font-bold">
                ⚠️ STATO: DEGRADATO - Analisi automatica offline
              </p>
              <p className="text-muted-foreground">
                Identifica tutte le {TOTAL_ANOMALIES} anomalie nei log del 24/12/2001.
                Clicca sulle righe sospette per selezionarle.
              </p>
            </div>

            <div className="retro-panel-inset p-2 font-mono text-[10px] max-h-64 overflow-y-auto">
              {LOG_ENTRIES.map((log) => (
                <div
                  key={log.id}
                  onClick={() => toggleLog(log.id)}
                  className={`
                    p-1 cursor-pointer border-b border-border/30 transition-colors
                    ${selectedLogs.includes(log.id) 
                      ? "bg-primary/20 text-primary" 
                      : "hover:bg-muted"
                    }
                    ${showResult && log.isAnomaly && !selectedLogs.includes(log.id)
                      ? "bg-destructive/20"
                      : ""
                    }
                  `}
                >
                  <span className="text-muted-foreground">[24/12/2001 {log.time}]</span>{" "}
                  <span className={log.isAnomaly && showResult ? "text-[hsl(var(--status-danger))]" : ""}>
                    {log.message}
                  </span>
                  {selectedLogs.includes(log.id) && (
                    <AlertTriangle className="w-3 h-3 inline ml-2 text-[hsl(var(--status-warning))]" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[10px] text-muted-foreground">
                Selezionate: {selectedLogs.length} righe
              </span>
              <div className="flex gap-2">
                <RetroButton size="sm" onClick={resetPuzzle}>
                  Reset
                </RetroButton>
                <RetroButton size="sm" onClick={checkAnomalies} disabled={selectedLogs.length === 0}>
                  Analizza Anomalie
                </RetroButton>
              </div>
            </div>

            <div className="retro-panel-inset p-2 text-[9px] text-muted-foreground">
              <p>HINT: Cerca accessi non autorizzati, modifiche sospette e disconnessioni anomale.</p>
            </div>
          </div>
        )}
      </RetroPanel>
    </RetroLayout>
  );
};

export default SOCMonitor;
