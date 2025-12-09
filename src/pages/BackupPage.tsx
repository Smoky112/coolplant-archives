import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Database, CheckCircle, FileWarning, RotateCcw } from "lucide-react";
import RetroLayout from "@/layouts/RetroLayout";
import RetroPanel from "@/components/RetroPanel";
import RetroButton from "@/components/RetroButton";
import { toast } from "sonner";
import { isBackupRestored, setBackupRestored } from "@/lib/systemState";

// Puzzle: Ricostruire l'hash CRC corretto
const CORRECT_HASH = "A7F3D9E2";
const HASH_FRAGMENTS = ["A7", "F3", "D9", "E2"];
const SHUFFLED_FRAGMENTS = ["E2", "A7", "D9", "F3", "B1", "C4"];

const BackupPage = () => {
  const navigate = useNavigate();
  const [isRestored, setIsRestored] = useState(false);
  const [selectedFragments, setSelectedFragments] = useState<string[]>([]);
  const [availableFragments, setAvailableFragments] = useState<string[]>(SHUFFLED_FRAGMENTS);

  useEffect(() => {
    if (isBackupRestored()) {
      setIsRestored(true);
    }
  }, []);

  const selectFragment = (fragment: string) => {
    if (isRestored || selectedFragments.length >= 4) return;
    setSelectedFragments(prev => [...prev, fragment]);
    setAvailableFragments(prev => {
      const idx = prev.indexOf(fragment);
      return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
    });
  };

  const removeFragment = (index: number) => {
    if (isRestored) return;
    const fragment = selectedFragments[index];
    setSelectedFragments(prev => [...prev.slice(0, index), ...prev.slice(index + 1)]);
    setAvailableFragments(prev => [...prev, fragment]);
  };

  const verifyHash = () => {
    const builtHash = selectedFragments.join("");
    if (builtHash === CORRECT_HASH) {
      setBackupRestored(true);
      setIsRestored(true);
      toast.success("BACKUP RIPRISTINATO!", {
        description: "L'integrità dei dati è stata verificata.",
      });
    } else {
      toast.error("Hash CRC non valido", {
        description: `Hash costruito: ${builtHash || "(vuoto)"} - Atteso: ${CORRECT_HASH}`,
      });
    }
  };

  const resetPuzzle = () => {
    setSelectedFragments([]);
    setAvailableFragments(SHUFFLED_FRAGMENTS);
  };

  return (
    <RetroLayout>
      <RetroPanel header={`💾 BACKUP SYSTEM - ${isRestored ? "INTEGRO" : "CORROTTO"}`}>
        {isRestored ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle className="w-16 h-16 mx-auto text-[hsl(var(--status-success))]" />
            <h2 className="text-xl font-bold text-[hsl(var(--status-success))]">
              SISTEMA RIPRISTINATO
            </h2>
            <p className="text-muted-foreground">
              Il sistema di backup è integro e operativo.
            </p>
            <RetroButton onClick={() => navigate("/")}>
              ← Torna alla Home
            </RetroButton>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="retro-panel-inset p-3 text-[11px] space-y-2">
              <p className="text-[hsl(var(--status-corrupt))] font-bold">
                ⚠️ ERRORE CRC: Checksum corrotto
              </p>
              <p className="text-muted-foreground">
                Ricostruisci l'hash CRC originale selezionando i frammenti nell'ordine corretto.
              </p>
              <p className="text-[10px] text-muted-foreground font-mono">
                Formato atteso: 8 caratteri esadecimali (4 frammenti da 2)
              </p>
            </div>

            {/* Hash builder */}
            <div className="retro-panel-inset p-4 text-center">
              <p className="text-[10px] text-muted-foreground mb-2">HASH CRC COSTRUITO:</p>
              <div className="flex justify-center gap-1 mb-4">
                {[0, 1, 2, 3].map((i) => (
                  <button
                    key={i}
                    onClick={() => selectedFragments[i] && removeFragment(i)}
                    className={`
                      w-12 h-12 border-2 font-mono font-bold text-lg flex items-center justify-center
                      ${selectedFragments[i] 
                        ? "border-primary bg-primary/20 text-primary cursor-pointer hover:bg-destructive/20"
                        : "border-dashed border-muted-foreground/50 text-muted-foreground"
                      }
                    `}
                  >
                    {selectedFragments[i] || "??"}
                  </button>
                ))}
              </div>
              <p className="font-mono text-[11px]">
                <span className="text-muted-foreground">Risultato: </span>
                <span className={selectedFragments.length === 4 ? "text-primary font-bold" : "text-muted-foreground"}>
                  {selectedFragments.join("") || "--------"}
                </span>
              </p>
            </div>

            {/* Available fragments */}
            <div className="retro-panel-inset p-3">
              <p className="text-[10px] text-muted-foreground mb-2 text-center">FRAMMENTI DISPONIBILI:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {availableFragments.map((fragment, index) => (
                  <button
                    key={index}
                    onClick={() => selectFragment(fragment)}
                    className="w-12 h-12 border-2 border-border bg-muted hover:bg-primary/10 hover:border-primary font-mono font-bold text-sm transition-colors"
                  >
                    {fragment}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[10px] text-muted-foreground">
                Frammenti usati: {selectedFragments.length}/4
              </span>
              <div className="flex gap-2">
                <RetroButton size="sm" onClick={resetPuzzle}>
                  <RotateCcw className="w-3 h-3 mr-1" /> Reset
                </RetroButton>
                <RetroButton size="sm" onClick={verifyHash} disabled={selectedFragments.length !== 4}>
                  Verifica CRC
                </RetroButton>
              </div>
            </div>

            <div className="retro-panel-inset p-2 text-[9px] text-muted-foreground space-y-1">
              <p><FileWarning className="w-3 h-3 inline text-[hsl(var(--status-warning))]" /> File: EDEN.DAT - Ultimo backup: 23/12/2001</p>
              <p>HINT: L'hash originale inizia con "A7" e termina con "E2".</p>
              <p>NOTA: Non tutti i frammenti fanno parte dell'hash corretto!</p>
            </div>
          </div>
        )}
      </RetroPanel>
    </RetroLayout>
  );
};

export default BackupPage;
