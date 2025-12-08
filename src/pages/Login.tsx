import { Lock, User, Key, Shield, AlertTriangle, FileText, CreditCard, Mail, Phone, Building, LogOut } from "lucide-react";
import RetroLayout from "@/layouts/RetroLayout";
import RetroPanel from "@/components/RetroPanel";
import RetroButton from "@/components/RetroButton";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

// Database utenti hardcoded (simulazione sistema legacy)
const USERS_DATABASE: Record<string, UserData> = {
  "d.bellapianta": {
    password: "eden2001",
    nome: "Davide Bellapianta",
    ruolo: "CEO - Amministratore Delegato",
    livello: "5 - Massima Sicurezza",
    email: "d.bellapianta@coolplant.it",
    telefono: "+39 030 555 0001",
    interno: "1500",
    ufficio: "Piano 15 - Suite Dirigenziale",
    dataAssunzione: "15/03/1995",
    stipendio: "€ 485.000 / anno",
    bonus: "€ 120.000 (2001)",
    contoAziendale: "IT45 X054 2811 1010 0000 0123 456",
    codFiscale: "BLLDVD65M22B157K",
    files: [
      { nome: "CONTRATTO_CEO_1995.pdf", size: "2.4 MB", stato: "RISERVATO" },
      { nome: "STOCK_OPTIONS_2001.xls", size: "156 KB", stato: "CONFIDENZIALE" },
      { nome: "EDEN_MASTER_KEY.dat", size: "8 KB", stato: "CLASSIFICATO" },
      { nome: "TESTAMENTO_DIGITALE.doc", size: "89 KB", stato: "SIGILLATO" },
    ],
    accessiRecenti: [
      { data: "24/12/2001 07:42", azione: "Login sistema", ip: "192.168.1.150" },
      { data: "24/12/2001 07:38", azione: "Accesso EDEN.DAT", ip: "192.168.1.150" },
      { data: "23/12/2001 22:15", azione: "Modifica password", ip: "192.168.1.150" },
    ],
    note: "ATTENZIONE: Ultimo accesso registrato 24/12/2001 07:42. Account non più attivo.",
  },
  "g.rossi": {
    password: "admin123",
    nome: "Giuseppe Rossi",
    ruolo: "System Administrator",
    livello: "4 - Accesso Tecnico",
    email: "g.rossi@coolplant.it",
    telefono: "+39 030 555 0042",
    interno: "1234",
    ufficio: "Piano 3 - Sala Server",
    dataAssunzione: "10/09/1998",
    stipendio: "€ 65.000 / anno",
    bonus: "€ 8.500 (2001)",
    contoAziendale: "IT72 R054 2811 1010 0000 0789 012",
    codFiscale: "RSSGPP72H10B157L",
    files: [
      { nome: "BACKUP_PROCEDURES.doc", size: "1.2 MB", stato: "INTERNO" },
      { nome: "SERVER_PASSWORDS.txt", size: "4 KB", stato: "RISERVATO" },
      { nome: "NETWORK_MAP_2001.vsd", size: "856 KB", stato: "TECNICO" },
      { nome: "INCIDENT_REPORT_2412.log", size: "234 KB", stato: "URGENTE" },
    ],
    accessiRecenti: [
      { data: "24/12/2001 07:45", azione: "Alert IDS attivato", ip: "192.168.1.42" },
      { data: "24/12/2001 07:44", azione: "Tentativo accesso /EDEN", ip: "192.168.1.42" },
      { data: "24/12/2001 06:30", azione: "Avvio backup notturno", ip: "192.168.1.42" },
    ],
    note: "Ultimo dipendente ad accedere ai sistemi prima dell'incidente.",
  },
  "m.verdi": {
    password: "contab2001",
    nome: "Maria Verdi",
    ruolo: "Chief Financial Officer",
    livello: "4 - Accesso Finanziario",
    email: "m.verdi@coolplant.it",
    telefono: "+39 030 555 0015",
    interno: "1502",
    ufficio: "Piano 14 - Direzione Finanza",
    dataAssunzione: "22/01/1997",
    stipendio: "€ 145.000 / anno",
    bonus: "€ 35.000 (2001)",
    contoAziendale: "IT88 K054 2811 1010 0000 0456 789",
    codFiscale: "VRDMRA68D55B157M",
    files: [
      { nome: "BILANCIO_2001.xls", size: "4.8 MB", stato: "CONFIDENZIALE" },
      { nome: "FONDI_NERI_ANALISI.doc", size: "567 KB", stato: "CLASSIFICATO" },
      { nome: "TRANSAZIONI_SOSPETTE.pdf", size: "1.1 MB", stato: "SIGILLATO" },
      { nome: "EDEN_BUDGET_SECRET.xls", size: "234 KB", stato: "CLASSIFICATO" },
    ],
    accessiRecenti: [
      { data: "23/12/2001 18:30", azione: "Logout sistema", ip: "192.168.1.15" },
      { data: "23/12/2001 14:22", azione: "Download BILANCIO_2001", ip: "192.168.1.15" },
      { data: "23/12/2001 09:00", azione: "Login sistema", ip: "192.168.1.15" },
    ],
    note: "Ha segnalato anomalie nei conti il 20/12/2001. Report mai consegnato.",
  },
  "l.bianchi": {
    password: "security",
    nome: "Luca Bianchi",
    ruolo: "Direttore Sicurezza",
    livello: "5 - Sicurezza Massima",
    email: "l.bianchi@coolplant.it",
    telefono: "+39 030 555 0007",
    interno: "1507",
    ufficio: "Piano 2 - Security Operations Center",
    dataAssunzione: "05/06/1996",
    stipendio: "€ 98.000 / anno",
    bonus: "€ 22.000 (2001)",
    contoAziendale: "IT33 P054 2811 1010 0000 0321 654",
    codFiscale: "BNCLCU70F05B157N",
    files: [
      { nome: "PROTOCOLLO_EDEN.pdf", size: "2.1 MB", stato: "TOP SECRET" },
      { nome: "SORVEGLIANZA_CEO.avi", size: "156 MB", stato: "CLASSIFICATO" },
      { nome: "CHIAVI_FISICHE_LOG.xls", size: "89 KB", stato: "RISERVATO" },
      { nome: "RAPPORTO_MINACCE_DIC2001.doc", size: "445 KB", stato: "URGENTE" },
    ],
    accessiRecenti: [
      { data: "24/12/2001 08:15", azione: "Chiamata emergenza 112", ip: "N/D" },
      { data: "24/12/2001 07:52", azione: "Attivazione lockdown", ip: "192.168.1.7" },
      { data: "24/12/2001 07:46", azione: "Alert intrusion Piano 15", ip: "192.168.1.7" },
    ],
    note: "Primo a rispondere all'emergenza del 24/12. Testimone chiave.",
  },
};

interface UserFile {
  nome: string;
  size: string;
  stato: string;
}

interface AccessLog {
  data: string;
  azione: string;
  ip: string;
}

interface UserData {
  password: string;
  nome: string;
  ruolo: string;
  livello: string;
  email: string;
  telefono: string;
  interno: string;
  ufficio: string;
  dataAssunzione: string;
  stipendio: string;
  bonus: string;
  contoAziendale: string;
  codFiscale: string;
  files: UserFile[];
  accessiRecenti: AccessLog[];
  note: string;
}

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showEden, setShowEden] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<{ username: string; data: UserData } | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = USERS_DATABASE[credentials.username.toLowerCase()];
    
    if (user && user.password === credentials.password) {
      setLoggedInUser({ username: credentials.username.toLowerCase(), data: user });
      toast({
        title: "Accesso autorizzato",
        description: `Benvenuto, ${user.nome}. Ultimo accesso: ${user.accessiRecenti[0]?.data || "N/D"}`,
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
    setLoggedInUser(null);
    setCredentials({ username: "", password: "" });
    toast({
      title: "Disconnesso",
      description: "Sessione terminata correttamente.",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Pagina utente loggato
  if (loggedInUser) {
    const { data } = loggedInUser;
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
