import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, CheckCircle, Key } from "lucide-react";
import RetroLayout from "@/layouts/RetroLayout";
import RetroPanel from "@/components/RetroPanel";
import RetroButton from "@/components/RetroButton";
import { toast } from "sonner";
import { isAuthServerRestored, setAuthServerRestored } from "@/lib/systemState";

// Puzzle: Decifrare la password dell'admin
// Indizio: ROT13 di "security" = "frphevgl"
const CORRECT_PASSWORD = "SECURITY";
const ENCRYPTED_HINT = "FRPHEVGL"; // ROT13

const AuthServerPage = () => {
  const navigate = useNavigate();
  const [isRestored, setIsRestored] = useState(false);
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (isAuthServerRestored()) {
      setIsRestored(true);
    }
  }, []);

  const checkPassword = () => {
    setAttempts(prev => prev + 1);
    
    if (password.toUpperCase() === CORRECT_PASSWORD) {
      setAuthServerRestored(true);
      setIsRestored(true);
      toast.success("AUTH SERVER RIPRISTINATO!", {
        description: "Accesso amministratore ripristinato con successo.",
      });
    } else {
      toast.error("Password errata", {
        description: `Tentativo ${attempts + 1} fallito. La password non corrisponde.`,
      });
      if (attempts >= 2) {
        setShowHint(true);
      }
    }
  };

  const resetPuzzle = () => {
    setPassword("");
    setAttempts(0);
    setShowHint(false);
  };

  return (
    <RetroLayout>
      <RetroPanel header={`🔐 AUTH SERVER - ${isRestored ? "ATTIVO" : "N/D"}`}>
        {isRestored ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle className="w-16 h-16 mx-auto text-[hsl(var(--status-success))]" />
            <h2 className="text-xl font-bold text-[hsl(var(--status-success))]">
              SISTEMA RIPRISTINATO
            </h2>
            <p className="text-muted-foreground">
              Il server di autenticazione è tornato online.
            </p>
            <RetroButton onClick={() => navigate("/")}>
              ← Torna alla Home
            </RetroButton>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="retro-panel-inset p-3 text-[11px] space-y-2">
              <p className="text-muted-foreground font-bold">
                ⚠️ STATO: N/D - Credenziali admin corrotte
              </p>
              <p className="text-muted-foreground">
                Il sistema richiede la password dell'amministratore per il ripristino.
              </p>
            </div>

            {/* Login form simulato */}
            <div className="retro-panel-inset p-4 space-y-4 max-w-sm mx-auto">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 border-2 border-muted-foreground flex items-center justify-center bg-muted">
                  <Lock className="w-8 h-8 text-muted-foreground" />
                </div>
              </div>
              
              <div>
                <label className="text-[10px] text-muted-foreground block mb-1">USERNAME:</label>
                <input
                  type="text"
                  value="ADMIN"
                  disabled
                  className="w-full retro-input text-[11px] bg-muted"
                />
              </div>
              
              <div>
                <label className="text-[10px] text-muted-foreground block mb-1">PASSWORD:</label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === "Enter" && checkPassword()}
                  className="w-full retro-input text-[11px] font-mono uppercase"
                  placeholder="Inserisci password..."
                  maxLength={20}
                />
              </div>

              <RetroButton className="w-full" onClick={checkPassword} disabled={!password}>
                <Key className="w-3 h-3 mr-2" /> Accedi
              </RetroButton>
            </div>

            <div className="text-center text-[10px] text-muted-foreground">
              Tentativi falliti: {attempts}
            </div>

            {/* Indizi */}
            <div className="retro-panel-inset p-3 text-[9px] space-y-2">
              <p className="font-mono text-muted-foreground">
                [LOG] Last successful login: ADMIN @ 23/12/2001 18:30
              </p>
              <p className="font-mono text-muted-foreground">
                [SYS] Password recovery file: /etc/shadow.bak <span className="text-[hsl(var(--status-danger))]">[ENCRYPTED]</span>
              </p>
              
              {showHint && (
                <div className="border border-[hsl(var(--status-warning))] p-2 mt-2 bg-[hsl(var(--status-warning))]/10">
                  <p className="text-[hsl(var(--status-warning))] font-bold">🔍 INDIZIO SBLOCCATO:</p>
                  <p className="font-mono mt-1">
                    Password cifrata (ROT13): <span className="text-primary font-bold">{ENCRYPTED_HINT}</span>
                  </p>
                  <p className="text-muted-foreground mt-1">
                    Suggerimento: ROT13 sposta ogni lettera di 13 posizioni nell'alfabeto.
                  </p>
                </div>
              )}

              {!showHint && attempts > 0 && (
                <p className="text-[hsl(var(--status-warning))]">
                  Ancora {3 - attempts} tentativi per sbloccare un indizio...
                </p>
              )}
            </div>

            <div className="text-center">
              <RetroButton size="sm" onClick={resetPuzzle}>
                Reset Tentativi
              </RetroButton>
            </div>
          </div>
        )}
      </RetroPanel>
    </RetroLayout>
  );
};

export default AuthServerPage;
