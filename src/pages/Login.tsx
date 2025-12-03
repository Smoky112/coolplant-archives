import { Lock, User, Key, Shield, AlertTriangle } from "lucide-react";
import RetroLayout from "@/layouts/RetroLayout";
import RetroPanel from "@/components/RetroPanel";
import RetroButton from "@/components/RetroButton";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showEden, setShowEden] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Accesso negato",
      description: "Credenziali non valide. Contattare l'amministratore di sistema.",
      variant: "destructive",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <RetroLayout>
      <div className="max-w-2xl mx-auto">
        <RetroPanel header="🔐 Area Riservata - Accesso Sicuro">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Login Form */}
            <div>
              <div className="retro-panel-inset p-3 mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="font-bold text-[11px]">Connessione Sicura SSL 128-bit</span>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Questa pagina utilizza crittografia SSL per proteggere i tuoi dati.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-3">
                <div>
                  <label className="flex items-center gap-1 text-[11px] font-bold mb-1">
                    <User className="w-3 h-3" />
                    Nome Utente
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                    className="retro-input w-full"
                    placeholder="username"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1 text-[11px] font-bold mb-1">
                    <Key className="w-3 h-3" />
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    className="retro-input w-full"
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex items-center gap-2 text-[10px]">
                  <input type="checkbox" id="remember" className="retro-input" />
                  <label htmlFor="remember">Ricorda questo computer</label>
                </div>

                <div className="flex gap-2">
                  <RetroButton type="submit" className="flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Accedi
                  </RetroButton>
                </div>

                <div className="text-[10px] space-y-1">
                  <a href="#" className="block hover:text-primary">
                    → Password dimenticata?
                  </a>
                  <a href="#" className="block hover:text-primary">
                    → Richiedi accesso
                  </a>
                </div>
              </form>
            </div>

            {/* Info Panel */}
            <div className="space-y-3">
              <RetroPanel header="ℹ️ Informazioni Accesso" variant="inset">
                <div className="text-[10px] space-y-2">
                  <p>
                    <strong>Area Clienti:</strong> Accesso a report, ticket supporto 
                    e documentazione riservata.
                  </p>
                  <p>
                    <strong>SOC Portal:</strong> Dashboard monitoraggio sicurezza 
                    in tempo reale.
                  </p>
                  <p>
                    <strong>Dipendenti:</strong> Intranet aziendale e strumenti 
                    di lavoro.
                  </p>
                </div>
              </RetroPanel>

              <RetroPanel header="⚠️ Avviso Sicurezza" variant="inset">
                <div className="text-[10px] space-y-2">
                  <div className="flex items-start gap-1">
                    <AlertTriangle className="w-3 h-3 text-[hsl(var(--status-warning))] mt-0.5" />
                    <p>
                      Ogni tentativo di accesso non autorizzato viene registrato 
                      e monitorato dal SOC.
                    </p>
                  </div>
                  <p className="text-muted-foreground">
                    Max. 3 tentativi errati prima del blocco account.
                  </p>
                </div>
              </RetroPanel>

              <RetroPanel header="🖥️ Requisiti Sistema" variant="inset">
                <div className="text-[10px] space-y-1">
                  <p>• Internet Explorer 5.5 o superiore</p>
                  <p>• JavaScript abilitato</p>
                  <p>• Cookie abilitati</p>
                  <p>• Risoluzione min. 800x600</p>
                </div>
              </RetroPanel>
            </div>
          </div>
        </RetroPanel>

        {/* Hidden Easter Egg - Project Eden */}
        <div className="mt-4">
          <p 
            className="text-[9px] text-muted-foreground text-center cursor-pointer hover:text-primary"
            onClick={() => setShowEden(!showEden)}
          >
            [Accesso Livello 5 - Solo personale autorizzato]
          </p>
          
          {showEden && (
            <RetroPanel header="🔒 PROGETTO EDEN - CLASSIFICATO" className="mt-2 border-destructive">
              <div className="text-[10px] text-center space-y-2">
                <p className="text-destructive font-bold blink">
                  ⚠️ ACCESSO RISERVATO - LIVELLO DIRIGENZIALE ⚠️
                </p>
                <div className="retro-panel-inset p-3">
                  <p className="font-mono text-[9px]">
                    C:\COOLPLANT\EDEN&gt; ACCESS DENIED
                  </p>
                  <p className="font-mono text-[9px]">
                    AUTHORIZATION CODE REQUIRED
                  </p>
                  <p className="font-mono text-[9px] text-muted-foreground">
                    Last access: 24/12/2001 07:45 - D.BELLAPIANTA
                  </p>
                </div>
                <p className="text-muted-foreground">
                  Per accedere al Progetto Eden contattare direttamente 
                  il CEO o il Direttore Sicurezza.
                </p>
              </div>
            </RetroPanel>
          )}
        </div>
      </div>
    </RetroLayout>
  );
};

export default Login;
