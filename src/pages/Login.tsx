import { Lock, User, Key, Shield, AlertTriangle, FileText, CreditCard, Mail, Phone, Building, LogOut, Trash2 } from "lucide-react";
import RetroLayout from "@/layouts/RetroLayout";
import RetroPanel from "@/components/RetroPanel";
import RetroButton from "@/components/RetroButton";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useAuth, resetAllGameData } from "@/contexts/AuthContext";

const Login = () => {
  const { user, login, logout } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showEden, setShowEden] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = login(credentials.username, credentials.password);
    
    if (success) {
      toast({
        title: "Accesso autorizzato",
        description: `Benvenuto nel sistema.`,
      });
    } else {
      toast({
        title: "Accesso negato",
        description: "Credenziali non valide. Contattare l'amministratore di sistema.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    logout();
    setCredentials({ username: "", password: "" });
    toast({
      title: "Disconnesso",
      description: "Sessione terminata correttamente.",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleResetGame = () => {
    resetAllGameData();
    logout();
    toast({
      title: "Reset completato",
      description: "Tutti i dati del gioco sono stati cancellati. Ricarica la pagina.",
    });
    setTimeout(() => window.location.reload(), 1500);
  };

  // Pagina utente loggato
  if (user) {
    const { data } = user;
    const isCTO = (data as any).isCTO;
    
    // Pannello debug per utente debug
    if (data.isDebug) {
      return (
        <RetroLayout>
          <div className="max-w-2xl mx-auto">
            <RetroPanel header="🔧 Debug Panel - System Admin">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-bold">Livello Accesso: DEBUG</span>
                </div>
                <RetroButton onClick={handleLogout} size="sm" className="flex items-center gap-1">
                  <LogOut className="w-3 h-3" />
                  Disconnetti
                </RetroButton>
              </div>

              <RetroPanel header="⚠️ Reset Game Data" variant="inset">
                <p className="text-[10px] mb-4 text-muted-foreground">
                  Questi comandi resettano tutte le variabili del gioco salvate in localStorage.
                </p>
                
                <div className="space-y-3">
                  <RetroButton 
                    onClick={handleResetGame} 
                    className="w-full flex items-center justify-center gap-2 bg-destructive text-destructive-foreground"
                  >
                    <Trash2 className="w-4 h-4" />
                    RESET COMPLETO - Cancella Tutto
                  </RetroButton>

                  <div className="grid grid-cols-2 gap-2">
                    <RetroButton 
                      size="sm"
                      onClick={() => {
                        localStorage.removeItem("coolplant_popup_dismissed");
                        toast({ title: "Reset popup home completato" });
                      }}
                    >
                      Reset Popup Home
                    </RetroButton>
                    
                    <RetroButton 
                      size="sm"
                      onClick={() => {
                        localStorage.removeItem("coolplant_server_farm_restored");
                        localStorage.removeItem("coolplant_soc_monitor_restored");
                        localStorage.removeItem("coolplant_firewall_restored");
                        localStorage.removeItem("coolplant_backup_restored");
                        localStorage.removeItem("coolplant_auth_server_restored");
                        toast({ title: "Reset stato sistemi completato" });
                      }}
                    >
                      Reset Stato Sistemi
                    </RetroButton>
                    
                    <RetroButton 
                      size="sm"
                      onClick={() => {
                        localStorage.removeItem("glitchStated");
                        toast({ title: "Reset glitch completato" });
                      }}
                    >
                      Reset Glitch
                    </RetroButton>
                    
                    <RetroButton 
                      size="sm"
                      onClick={() => {
                        localStorage.removeItem("edenTried");
                        toast({ title: "Reset Eden terminale completato" });
                      }}
                    >
                      Reset Eden Terminale
                    </RetroButton>
                  </div>
                </div>
              </RetroPanel>

              <RetroPanel header="📊 Stato Variabili" variant="inset" className="mt-4">
                <div className="text-[9px] font-mono space-y-1">
                  <p>popup_dismissed: {localStorage.getItem("coolplant_popup_dismissed") || "null"}</p>
                  <p>server_farm_restored: {localStorage.getItem("coolplant_server_farm_restored") || "null"}</p>
                  <p>soc_monitor_restored: {localStorage.getItem("coolplant_soc_monitor_restored") || "null"}</p>
                  <p>firewall_restored: {localStorage.getItem("coolplant_firewall_restored") || "null"}</p>
                  <p>backup_restored: {localStorage.getItem("coolplant_backup_restored") || "null"}</p>
                  <p>auth_server_restored: {localStorage.getItem("coolplant_auth_server_restored") || "null"}</p>
                  <p>glitchStated: {localStorage.getItem("glitchStated") || "null"}</p>
                  <p>edenTried: {localStorage.getItem("edenTried") || "null"}</p>
                </div>
              </RetroPanel>
            </RetroPanel>
          </div>
        </RetroLayout>
      );
    }

    // Profilo speciale CTO - Tagliaferri Lorenzo
    if (isCTO) {
      return (
        <RetroLayout>
          <div className="max-w-4xl mx-auto">
            <RetroPanel header={`🔧 Profilo CTO - ${data.nome}`}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-bold">Livello Accesso: {data.livello}</span>
                </div>
                <RetroButton onClick={handleLogout} size="sm" className="flex items-center gap-1">
                  <LogOut className="w-3 h-3" />
                  Disconnetti
                </RetroButton>
              </div>

              {/* Quote Elden Ring */}
              <div className="mb-4 p-3 border border-dashed border-muted-foreground/40 text-center">
                <p className="text-[10px] italic text-muted-foreground">
                  "Rise, Tarnished. Claim your destiny in the Lands Between..."
                </p>
                <p className="text-[8px] text-muted-foreground/60 mt-1">- Nota personale</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Informazioni Personali */}
                <RetroPanel header="📋 Dati Personali" variant="inset">
                  <div className="space-y-2 text-[10px]">
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3" />
                      <span className="font-bold">Nome:</span> {data.nome}
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-3 h-3" />
                      <span className="font-bold">Ruolo:</span> {data.ruolo}
                    </div>
                    <div className="text-[9px] text-muted-foreground italic ml-5">
                      31 anni - Responsabile infrastrutture tecniche
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3" />
                      <span className="font-bold">Email:</span> {data.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      <span className="font-bold">Telefono:</span> {data.telefono}
                    </div>
                    <div>
                      <span className="font-bold">Interno:</span> {data.interno}
                    </div>
                    <div>
                      <span className="font-bold">Ufficio:</span> {data.ufficio}
                    </div>
                  </div>
                </RetroPanel>

                {/* Responsabilità */}
                <RetroPanel header="⚙️ Responsabilità" variant="inset">
                  <div className="space-y-2 text-[10px]">
                    <div className="retro-panel-inset p-2">
                      <p className="font-bold text-[9px] text-primary">SUPERVISIONE SOC</p>
                      <p className="text-[9px] text-muted-foreground">Piano -1 - Security Operations Center</p>
                    </div>
                    <div className="retro-panel-inset p-2">
                      <p className="font-bold text-[9px] text-primary">SERVER FARM</p>
                      <p className="text-[9px] text-muted-foreground">Infrastrutture critiche aziendali</p>
                    </div>
                    <div className="retro-panel-inset p-2 border border-[hsl(var(--status-warning))]">
                      <p className="font-bold text-[9px] text-[hsl(var(--status-warning))]">🔑 CHIAVI DATA CENTER</p>
                      <p className="text-[9px] text-muted-foreground">Accesso fisico Piano -1</p>
                      <p className="text-[8px] text-muted-foreground/70 italic mt-1">
                        "Le chiavi che aprono la porta dell'abisso..."
                      </p>
                    </div>
                  </div>
                </RetroPanel>

                {/* File Personali */}
                <RetroPanel header="📁 File Personali" variant="inset">
                  <div className="space-y-1">
                    {data.files.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-1 hover:bg-muted/50 text-[9px]">
                        <div className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          <span className="font-mono">{file.nome}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">{file.size}</span>
                          <span className={`px-1 text-[8px] font-bold ${
                            file.stato === "CLASSIFICATO" 
                              ? "bg-destructive text-destructive-foreground" 
                              : file.stato === "PERSONALE"
                                ? "bg-primary/30 text-primary"
                                : "bg-muted"
                          }`}>
                            {file.stato}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </RetroPanel>

                {/* Note Personali */}
                <RetroPanel header="📝 Note Personali [PRIVATO]" variant="inset">
                  <div className="space-y-2 text-[9px]">
                    <div className="retro-panel-inset p-2">
                      <p className="text-muted-foreground italic">
                        "Strano, timido, parlo poco. Ma osservo tutto."
                      </p>
                    </div>
                    <div className="retro-panel-inset p-2 border border-primary/30">
                      <p className="font-bold text-[8px] text-primary mb-1">🎮 INTERESSI PERSONALI:</p>
                      <p className="text-muted-foreground">
                        Elden Ring completato al 100%<br/>
                        "Maidenless behavior detected"
                      </p>
                    </div>
                    <div className="retro-panel-inset p-2 opacity-70">
                      <p className="text-[8px] text-muted-foreground">
                        "Five Nights... qualcuno ha notato attività strane nei server di notte.
                        Animatronics? No, solo backup automatici. Forse."
                      </p>
                      <p className="text-[8px] text-primary/70 mt-1 italic">
                        "It's me."
                      </p>
                    </div>
                  </div>
                </RetroPanel>
              </div>

              {/* Comando esclusivo */}
              <div className="mt-4 p-3 border border-primary/50 bg-primary/5">
                <div className="flex items-start gap-2">
                  <Key className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold text-primary">COMANDO TERMINALE ESCLUSIVO:</p>
                    <p className="text-[10px] font-mono bg-muted px-2 py-1 mt-1 inline-block">DATACENTER</p>
                    <p className="text-[9px] text-muted-foreground mt-1">
                      Utilizza le tue chiavi fisiche per accedere alla Server Farm dal terminale.
                    </p>
                  </div>
                </div>
              </div>

              {/* Easter Egg FNAF */}
              <div className="mt-4 text-center">
                <p className="text-[8px] text-muted-foreground/40 hover:text-primary/60 transition-colors cursor-default">
                  "Was it me? It's always been me." - Turno notturno, 12:00 AM
                </p>
              </div>
            </RetroPanel>
          </div>
        </RetroLayout>
      );
    }

    // Pagina utente normale
    return (
      <RetroLayout>
        <div className="max-w-4xl mx-auto">
          <RetroPanel header={`👤 Profilo Utente - ${data.nome}`}>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold">Livello Accesso: {data.livello}</span>
              </div>
              <RetroButton onClick={handleLogout} size="sm" className="flex items-center gap-1">
                <LogOut className="w-3 h-3" />
                Disconnetti
              </RetroButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Informazioni Personali */}
              <RetroPanel header="📋 Dati Personali" variant="inset">
                <div className="space-y-2 text-[10px]">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3" />
                    <span className="font-bold">Nome:</span> {data.nome}
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-3 h-3" />
                    <span className="font-bold">Ruolo:</span> {data.ruolo}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                    <span className="font-bold">Email:</span> {data.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3" />
                    <span className="font-bold">Telefono:</span> {data.telefono}
                  </div>
                  <div>
                    <span className="font-bold">Interno:</span> {data.interno}
                  </div>
                  <div>
                    <span className="font-bold">Ufficio:</span> {data.ufficio}
                  </div>
                  <div>
                    <span className="font-bold">Data Assunzione:</span> {data.dataAssunzione}
                  </div>
                  <div>
                    <span className="font-bold">Codice Fiscale:</span> {data.codFiscale}
                  </div>
                </div>
              </RetroPanel>

              {/* Informazioni Finanziarie */}
              <RetroPanel header="💰 Dati Finanziari [RISERVATO]" variant="inset">
                <div className="space-y-2 text-[10px]">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-3 h-3 text-primary" />
                    <span className="font-bold">Stipendio:</span> {data.stipendio}
                  </div>
                  <div>
                    <span className="font-bold">Bonus Annuale:</span> {data.bonus}
                  </div>
                  <div className="retro-panel-inset p-2 mt-2">
                    <p className="font-bold text-[9px] mb-1">IBAN Aziendale:</p>
                    <p className="font-mono text-[9px] break-all">{data.contoAziendale}</p>
                  </div>
                </div>
              </RetroPanel>

              {/* File Personali */}
              <RetroPanel header="📁 File Personali" variant="inset">
                <div className="space-y-1">
                  {data.files.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-1 hover:bg-muted/50 text-[9px]">
                      <div className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        <span className="font-mono">{file.nome}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">{file.size}</span>
                        <span className={`px-1 text-[8px] font-bold ${
                          file.stato === "CLASSIFICATO" || file.stato === "TOP SECRET" 
                            ? "bg-destructive text-destructive-foreground" 
                            : file.stato === "SIGILLATO" 
                              ? "bg-[hsl(var(--status-warning))] text-background"
                              : "bg-muted"
                        }`}>
                          {file.stato}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <RetroButton size="sm" className="w-full mt-2" onClick={() => {
                  toast({
                    title: "Errore Download",
                    description: "Connessione al file server interrotta - 24/12/2001",
                    variant: "destructive",
                  });
                }}>
                  📥 Scarica Tutti
                </RetroButton>
              </RetroPanel>

              {/* Log Accessi */}
              <RetroPanel header="📊 Ultimi Accessi" variant="inset">
                <div className="space-y-1">
                  {data.accessiRecenti.map((accesso, idx) => (
                    <div key={idx} className="retro-panel-inset p-1 text-[9px]">
                      <div className="flex justify-between">
                        <span className="font-mono">{accesso.data}</span>
                        <span className="text-muted-foreground">{accesso.ip}</span>
                      </div>
                      <p className="text-muted-foreground">{accesso.azione}</p>
                    </div>
                  ))}
                </div>
              </RetroPanel>
            </div>

            {/* Note di Sistema */}
            {data.note && (
              <div className="mt-4 p-3 border border-destructive bg-destructive/10">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold text-destructive">NOTA DI SISTEMA:</p>
                    <p className="text-[10px]">{data.note}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Easter Egg - Progetto Eden */}
            <div 
              className="mt-4 opacity-30 hover:opacity-100 transition-opacity cursor-pointer"
              onClick={() => setShowEden(!showEden)}
            >
              <p className="text-[9px] text-center">• • •</p>
            </div>
            
            {showEden && (
              <div className="mt-2 p-3 border border-dashed border-muted-foreground/30">
                <p className="text-[9px] text-muted-foreground text-center">
                  🔒 Progetto Eden - Accesso riservato<br/>
                  Per informazioni contattare il CEO o il Direttore Sicurezza
                </p>
              </div>
            )}
          </RetroPanel>
        </div>
      </RetroLayout>
    );
  }

  // Pagina di login
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
                  <a href="#" className="block hover:text-primary" onClick={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Sistema non disponibile",
                      description: "Il server di recupero password è offline dal 24/12/2001.",
                      variant: "destructive",
                    });
                  }}>
                    → Password dimenticata?
                  </a>
                  <a href="#" className="block hover:text-primary" onClick={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Richiesta impossibile",
                      description: "Le nuove registrazioni sono state sospese.",
                      variant: "destructive",
                    });
                  }}>
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
                <div className="text-[10px] text-muted-foreground">
                  <p className="mb-2">
                    Ogni tentativo di accesso non autorizzato viene registrato 
                    e segnalato alle autorità competenti.
                  </p>
                  <p className="font-mono text-[9px]">
                    IP corrente: 192.168.1.???<br/>
                    Sessione: #00000000
                  </p>
                </div>
              </RetroPanel>
            </div>
          </div>
        </RetroPanel>
      </div>
    </RetroLayout>
  );
};

export default Login;
