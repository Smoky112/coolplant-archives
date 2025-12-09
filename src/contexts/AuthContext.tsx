import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface UserFile {
  nome: string;
  size: string;
  stato: string;
}

export interface AccessLog {
  data: string;
  azione: string;
  ip: string;
}

export interface UserData {
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
  isDebug?: boolean;
}

// Database utenti hardcoded (simulazione sistema legacy)
export const USERS_DATABASE: Record<string, UserData> = {
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
  "debug": {
    password: "debug2024",
    nome: "Debug Admin",
    ruolo: "System Debug",
    livello: "DEBUG - Accesso Totale",
    email: "debug@coolplant.it",
    telefono: "N/D",
    interno: "0000",
    ufficio: "N/D",
    dataAssunzione: "N/D",
    stipendio: "N/D",
    bonus: "N/D",
    contoAziendale: "N/D",
    codFiscale: "N/D",
    files: [],
    accessiRecenti: [],
    note: "Account di debug per testing.",
    isDebug: true,
  },
};

// Lista utenti che possono usare comandi speciali nel terminale
export const TERMINAL_AUTHORIZED_USERS = ["d.bellapianta", "g.rossi", "l.bianchi", "debug"];

interface AuthContextType {
  user: { username: string; data: UserData } | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isTerminalAuthorized: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ username: string; data: UserData } | null>(null);

  // Carica sessione da localStorage al mount
  useEffect(() => {
    const savedUser = localStorage.getItem("coolplant_logged_user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (USERS_DATABASE[parsed.username]) {
          setUser({ username: parsed.username, data: USERS_DATABASE[parsed.username] });
        }
      } catch {
        localStorage.removeItem("coolplant_logged_user");
      }
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const normalizedUsername = username.toLowerCase();
    const userData = USERS_DATABASE[normalizedUsername];
    
    if (userData && userData.password === password) {
      const userSession = { username: normalizedUsername, data: userData };
      setUser(userSession);
      localStorage.setItem("coolplant_logged_user", JSON.stringify({ username: normalizedUsername }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("coolplant_logged_user");
  };

  const isTerminalAuthorized = () => {
    return user !== null && TERMINAL_AUTHORIZED_USERS.includes(user.username);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isTerminalAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

// Funzione per resettare tutto il gioco
export const resetAllGameData = () => {
  // Reset popup home
  localStorage.removeItem("coolplant_popup_dismissed");
  localStorage.removeItem("coolplant_intro_seen");
  
  // Reset stato sistemi
  localStorage.removeItem("coolplant_server_farm_restored");
  localStorage.removeItem("coolplant_soc_monitor_restored");
  localStorage.removeItem("coolplant_firewall_restored");
  localStorage.removeItem("coolplant_backup_restored");
  localStorage.removeItem("coolplant_auth_server_restored");
  
  // Reset glitch e Eden
  localStorage.removeItem("glitchStated");
  localStorage.removeItem("edenTried");
  
  // Reset utente loggato
  localStorage.removeItem("coolplant_logged_user");
};
