import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RetroLayout from "@/layouts/RetroLayout";
import RetroPanel from "@/components/RetroPanel";
import RetroButton from "@/components/RetroButton";

interface FileSystem {
  [key: string]: {
    type: "file" | "dir";
    content?: string;
    children?: string[];
    corrupted?: boolean;
    restricted?: boolean;
    downloadable?: boolean;
  };
}

const fileSystem: FileSystem = {
  "/": {
    type: "dir",
    children: [
      "BACKUP",
      "LOGS",
      "EDEN",
      "MAIL",
      "DOCUMENTI",
      "SISTEMA.INI",
      "LEGGIMI.TXT",
    ],
  },
  "/LEGGIMI.TXT": {
    type: "file",
    downloadable: true,
    content: `========================================
  COOLPLANT CORPORATION - SERVER PRINCIPALE
  Ultimo accesso: 24/12/2001 07:45
========================================

ATTENZIONE: Questo sistema contiene dati 
riservati. Ogni accesso non autorizzato 
verra' perseguito a norma di legge.

Per assistenza: interno 1234
Amministratore: G.Rossi

[NOTA SISTEMA: Backup automatico FALLITO]
[NOTA SISTEMA: 3 file corrotti rilevati]`,
  },
  "/SISTEMA.INI": {
    type: "file",
    content: `[CoolPlant Server Config]
Version=2.1.4
LastBoot=24/12/2001 03:00
Status=DEGRADED

[Security]
FirewallStatus=COMPROMISED
IDSAlerts=47
LastScan=23/12/2001 23:00

[EDEN Module]
Status=LOCKED
AccessLevel=5
LastAccess=D.BELLAPIANTA 24/12/2001 07:30
; ERRORE: Chiave di decrittazione non valida`,
  },
  "/BACKUP": {
    type: "dir",
    children: ["BACKUP_231201.DAT", "BACKUP_221201.DAT", "EDEN_BACKUP.DAT"],
  },
  "/BACKUP/BACKUP_231201.DAT": {
    type: "file",
    downloadable: true,
    content: `BACKUP GIORNALIERO - 23/12/2001
================================
Dimensione: 2.4 GB
Stato: COMPLETATO
Checksum: OK

File inclusi: 15.847
Database: SQL_MAIN, SQL_CLIENTI
Email: Exchange Server (14.523 messaggi)

[Backup eseguito con successo]`,
  },
  "/BACKUP/BACKUP_221201.DAT": {
    type: "file",
    content: `BACKUP GIORNALIERO - 22/12/2001
================================
Dimensione: 2.3 GB
Stato: COMPLETATO
Checksum: OK`,
  },
  "/BACKUP/EDEN_BACKUP.DAT": {
    type: "file",
    corrupted: true,
    content: `ERR0R: F1LE C0RRUPTED
======================
CRC Ch3ck F41LED
S3ct0r 0x7F2A unr34d4ble

P4rt14l d4t4 r3c0v3r3d:
------------------------
...PR0G3TT0 3D3N - CL4SS1F1C4T0...
...sc4nd4l0 f1n4nz14r10 M1l4n0...
...D.B3LL4P14NT4 - 4cc3ss0 n3g4t0...
...f1l3 PROVA_001.DOC - 3l1m1n4t0...
...t3st1m0n14nz4 - R0SS1 M4RC0...
...ERR0R 0x0000F4T4L...
[F1N3 D4T1 R3CUP3R4B1L1]`,
  },
  "/LOGS": {
    type: "dir",
    children: ["ACCESSI.LOG", "SICUREZZA.LOG", "ERRORI.LOG", "SOC_241201.LOG"],
  },
  "/LOGS/ACCESSI.LOG": {
    type: "file",
    downloadable: true,
    content: `=== LOG ACCESSI 24/12/2001 ===

03:00:15 SYSTEM    Boot automatico
03:05:22 SYSTEM    Servizi avviati
07:15:00 SYSTEM    Morning_Check eseguito
07:28:33 D.BELLAPIANTA Login - Piano 15
07:29:01 D.BELLAPIANTA Accesso EDEN - OK
07:30:45 D.BELLAPIANTA File: PROVA_FINALE.DOC
07:35:12 D.BELLAPIANTA Stampa: 3 pagine
07:42:18 ???       Login tentativo - FALLITO
07:43:55 ???       Login tentativo - FALLITO  
07:44:58 admin     Login tentativo - FALLITO
07:45:23 ???       ACCESSO FORZATO RILEVATO
07:45:24 SYSTEM    !!! IDS ALERT !!!
07:45:25 SYSTEM    Connessione interrotta
---FINE LOG---`,
  },
  "/LOGS/SICUREZZA.LOG": {
    type: "file",
    content: `=== SECURITY LOG ===

[24/12/2001 07:45:23] CRITICAL
Tipo: Accesso non autorizzato
Origine: Piano 15 - Ufficio CEO
Dettagli: Porta forzata - Sensore attivato
Risposta: Allarme silenzioso attivato

[24/12/2001 07:45:24] CRITICAL  
Tipo: IDS Alert
Pattern: Brute force attack
Target: EDEN Module
Tentativi: 3
IP Origine: 192.168.15.???

[24/12/2001 07:45:25] FATAL
Sistema di monitoraggio: OFFLINE
Ultima immagine: CAM_15_CORRUPTED.BMP
Motivo: Segnale perso`,
  },
  "/LOGS/ERRORI.LOG": {
    type: "file",
    corrupted: true,
    content: `ERR_DISK_READ_FAILURE
ERR_CHECKSUM_INVALID
ERR_FILE_NOT_FOUND: EDEN.KEY
ERR_ACCESS_DENIED: Level 5 required
ERR_CORR%%%%%%%%UPTED_S%%%ECTOR
ERR_D4T4_L0ST_0x7F2A
...
[Log troncato - settori danneggiati]`,
  },
  "/LOGS/SOC_241201.LOG": {
    type: "file",
    downloadable: true,
    content: `SOC REPORT - 24 DICEMBRE 2001
=============================
Turno: Notturno (00:00-08:00)
Operatore: Ferretti M.

00:00-03:00 Situazione normale
03:22 - Alert IDS: Scansione porte esterna
        Azione: Bloccato, IP in blacklist
        
04:15 - Anomalia traffico interno
        Origine: Piano 15
        Azione: Monitoraggio attivo
        
07:30 - CEO D.Bellapianta in ufficio
        Nota: Insolito - vigilia di Natale
        
07:45 - ALERT CRITICO MULTIPLO
        - Intrusione fisica Piano 15
        - Tentativo accesso EDEN
        - Perdita feed telecamere
        
07:46 - Tentativo contatto CEO: FALLITO
07:47 - Allertata sicurezza fisica
07:48 - [RAPPORTO INTERROTTO]

=== FINE TURNO NON COMPLETATO ===`,
  },
  "/EDEN": {
    type: "dir",
    restricted: true,
    children: ["ACCESS_DENIED"],
  },
  "/EDEN/ACCESS_DENIED": {
    type: "file",
    restricted: true,
    content: `
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓                                 ▓
▓   PROGETTO EDEN - CLASSIFICATO  ▓
▓                                 ▓
▓   ACCESSO LIVELLO 5 RICHIESTO   ▓
▓                                 ▓
▓   Inserire codice autorizzazione▓
▓   o contattare D.Bellapianta    ▓
▓                                 ▓
▓   [ERRORE: Utente non trovato]  ▓
▓                                 ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓`,
  },
  "/MAIL": {
    type: "dir",
    children: ["INBOX", "SENT", "DELETED"],
  },
  "/MAIL/INBOX": {
    type: "dir",
    children: ["MSG_001.EML", "MSG_002.EML", "MSG_003.EML"],
  },
  "/MAIL/INBOX/MSG_001.EML": {
    type: "file",
    downloadable: true,
    content: `From: g.rossi@coolplant.it
To: d.bellapianta@coolplant.it
Date: 23/12/2001 18:45
Subject: RE: Urgente - Documenti EDEN

Dottore,

Ho preparato i documenti che mi ha chiesto.
Sono nella cartella EDEN come richiesto.
La password e' quella solita.

Mi preoccupa la situazione. Quei nomi...
Non dovremmo coinvolgere le autorita'?

Buon Natale, ci vediamo a gennaio.

Giuseppe Rossi
IT Manager`,
  },
  "/MAIL/INBOX/MSG_002.EML": {
    type: "file",
    content: `From: anonimo@??????.???
To: d.bellapianta@coolplant.it  
Date: 23/12/2001 22:15
Subject: [NESSUN OGGETTO]

Sappiamo cosa stai facendo.
Fermati finche' sei in tempo.
Non costringerci ad agire.

Questo e' l'ultimo avviso.`,
  },
  "/MAIL/INBOX/MSG_003.EML": {
    type: "file",
    corrupted: true,
    content: `From: d.bell%%%%%%%%
To: ???@???
Date: 24/12/20%%
Subject: SOS - S3 succ3d3 qu4lc0s4

C4r0 %%%,

S3 st41 l3gg3nd0 qu3st0 m3ss4gg10,
s1gn1f1c4 ch3 qu4lc0s4 m1 3' succ3ss0.

1 d0cum3nt1 s0n0 n4sc0st1 1n %%%ERROR%%%
L4 p4ssw0rd 3' %%CORRUPTED%%

N0n f1d4rt1 d1 n3ss%%%
%%%%%%%%ERROR%%%%%%%%
[MESSAGGIO INCOMPLETO - SETTORI DANNEGGIATI]`,
  },
  "/MAIL/SENT": {
    type: "dir",
    children: ["SENT_001.EML"],
  },
  "/MAIL/SENT/SENT_001.EML": {
    type: "file",
    content: `From: d.bellapianta@coolplant.it
To: avv.marchetti@legale.it
Date: 23/12/2001 16:30
Subject: Documentazione riservata

Avvocato,

Come concordato telefonicamente, le confermo
che i documenti sono pronti. Contengono prove
inconfutabili riguardo alla vicenda di cui
abbiamo discusso.

Passero' in studio il 27 dicembre.

Cordiali saluti,
Davide Bellapianta
CEO - CoolPlant Corporation`,
  },
  "/MAIL/DELETED": {
    type: "dir",
    children: ["[VUOTO]"],
  },
  "/MAIL/DELETED/[VUOTO]": {
    type: "file",
    content: `[Cartella vuota]
[Nota: 15 messaggi eliminati permanentemente il 24/12/2001 07:40]`,
  },
  "/DOCUMENTI": {
    type: "dir",
    children: ["ORGANIGRAMMA.DOC", "CLIENTI_2001.XLS", "NOTA_SPESE.DOC"],
  },
  "/DOCUMENTI/ORGANIGRAMMA.DOC": {
    type: "file",
    downloadable: true,
    content: `COOLPLANT CORPORATION
Organigramma Aziendale - Dicembre 2001
======================================

CEO: Davide Bellapianta [Piano 15]
  |
  +-- CFO: Marco Trevisan [Piano 14]
  |
  +-- CTO: Alessandro Negri [Piano 13]
  |     |
  |     +-- IT Manager: Giuseppe Rossi
  |     +-- Security: Franco Ferretti
  |     +-- SOC Team (12 operatori)
  |
  +-- COO: Stefania Colombo [Piano 12]
  |
  +-- Legal: Avv. Ext. Marchetti

Dipendenti totali: 156
Sedi: Brescia (HQ), Milano (commerciale)`,
  },
  "/DOCUMENTI/CLIENTI_2001.XLS": {
    type: "file",
    content: `ELENCO CLIENTI TOP 2001
=======================
1. Banca Nazionale Italiana - DLP
2. Gruppo Industriale Lombardo - SOC
3. ??? [DATI RIMOSSI] ???
4. Assicurazioni Unite - Compliance
5. ??? [DATI RIMOSSI] ???
6. Pharma Italia Spa - Backup

[NOTA: Alcuni nominativi rimossi per
 ordine della Direzione - 20/12/2001]`,
  },
  "/DOCUMENTI/NOTA_SPESE.DOC": {
    type: "file",
    content: `Nota Spese - D.Bellapianta
Dicembre 2001

15/12 - Viaggio Milano: €245
        Motivo: "Incontro riservato"
        
18/12 - Cena lavoro: €180  
        Partecipanti: [CENSURATO]
        
20/12 - Acquisto: €85
        "Cassetta sicurezza - copia chiavi"
        
22/12 - Taxi notturno: €120
        "Rientro urgente in sede"`,
  },
};

const Terminal = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<string[]>([
    "CoolPlant Corporation - Sistema Legacy",
    "Windows 2000 Server [Versione 5.00.2195]",
    "(C) Copyright 1985-2000 Microsoft Corp.",
    "",
    "ATTENZIONE: Sistema in stato DEGRADATO",
    "Ultimo backup valido: 23/12/2001",
    "Digitare 'help' per la lista dei comandi.",
    "",
  ]);
  const [currentPath, setCurrentPath] = useState("/");
  const [input, setInput] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const addToHistory = (lines: string[]) => {
    setHistory((prev) => [...prev, ...lines]);
  };

  const getFullPath = (path: string): string => {
    if (path.startsWith("/")) return path;
    if (currentPath === "/") return "/" + path;
    return currentPath + "/" + path;
  };

  const downloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const executeCommand = (cmd: string) => {
    const parts = cmd.trim().split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ").toUpperCase();

    addToHistory([`C:${currentPath.replace(/\//g, "\\")}> ${cmd}`, ""]);

    switch (command) {
      case "help":
      case "?":
        addToHistory([
          "Comandi disponibili:",
          "  DIR           - Mostra contenuto directory",
          "  CD <dir>      - Cambia directory",
          "  TYPE <file>   - Visualizza contenuto file",
          "  DOWNLOAD <file> - Scarica file (se disponibile)",
          "  CLS           - Pulisce lo schermo",
          "  DATE          - Mostra data di sistema",
          "  TREE          - Mostra struttura directory",
          "  HELP          - Mostra questo messaggio",
          "",
        ]);
        break;

      case "cls":
      case "clear":
        setHistory([]);
        break;

      case "date":
        addToHistory([
          "Data corrente: Lun 24/12/2001",
          "Ora corrente: 07:45:23",
          "[AVVISO: Orologio di sistema potrebbe non essere sincronizzato]",
          "",
        ]);
        break;

      case "dir":
      case "ls":
        const currentDir = fileSystem[currentPath];
        if (currentDir && currentDir.type === "dir" && currentDir.children) {
          addToHistory([
            ` Volume in unita' C: COOLPLANT_SRV`,
            ` Numero di serie: 1A2B-3C4D`,
            "",
            ` Directory di C:${currentPath.replace(/\//g, "\\")}`,
            "",
          ]);
          currentDir.children.forEach((item) => {
            const fullPath = getFullPath(item);
            const entry = fileSystem[fullPath];
            const isDir = entry?.type === "dir";
            const isCorrupt = entry?.corrupted;
            const isRestricted = entry?.restricted;
            const marker = isCorrupt
              ? " [CORROTTO]"
              : isRestricted
              ? " [BLOCCATO]"
              : "";
            addToHistory([`${isDir ? "<DIR>" : "     "}  ${item}${marker}`]);
          });
          addToHistory(["", `       ${currentDir.children.length} file`, ""]);
        }
        break;

      case "cd":
        if (!args || args === "\\") {
          setCurrentPath("/");
        } else if (args === "..") {
          const parts = currentPath.split("/").filter(Boolean);
          parts.pop();
          setCurrentPath(parts.length ? "/" + parts.join("/") : "/");
        } else {
          const newPath = getFullPath(args);
          const target = fileSystem[newPath];
          if (target && target.type === "dir") {
            if (target.restricted) {
              addToHistory([
                "ACCESSO NEGATO",
                "Livello autorizzazione insufficiente.",
                "Contattare l'amministratore di sistema.",
                "",
              ]);
            } else {
              setCurrentPath(newPath);
            }
          } else {
            addToHistory([`Directory non trovata: ${args}`, ""]);
          }
        }
        break;

      case "type":
      case "cat":
        if (!args) {
          addToHistory(["Sintassi: TYPE <nomefile>", ""]);
        } else {
          const filePath = getFullPath(args);
          const file = fileSystem[filePath];
          if (file && file.type === "file") {
            if (file.restricted) {
              addToHistory([
                "ACCESSO NEGATO",
                "File classificato - Livello 5 richiesto",
                "",
              ]);
            } else {
              addToHistory([file.content || "[File vuoto]", ""]);
            }
          } else {
            addToHistory([`File non trovato: ${args}`, ""]);
          }
        }
        break;

      case "download":
        if (!args) {
          addToHistory(["Sintassi: DOWNLOAD <nomefile>", ""]);
        } else {
          const filePath = getFullPath(args);
          const file = fileSystem[filePath];
          if (file && file.type === "file") {
            if (file.downloadable) {
              downloadFile(
                args.replace(/\//g, "_") + ".txt",
                file.content || ""
              );
              addToHistory([
                `Download avviato: ${args}`,
                "File salvato nella cartella download del browser.",
                "",
              ]);
            } else if (file.corrupted) {
              addToHistory([
                "ERRORE: File corrotto - download non possibile",
                "Alcuni settori del disco sono danneggiati.",
                "",
              ]);
            } else if (file.restricted) {
              addToHistory([
                "ACCESSO NEGATO",
                "Autorizzazione insufficiente per il download.",
                "",
              ]);
            } else {
              addToHistory([
                `File ${args} non disponibile per il download.`,
                "",
              ]);
            }
          } else {
            addToHistory([`File non trovato: ${args}`, ""]);
          }
        }
        break;

      case "tree":
        addToHistory([
          "C:\\",
          "├── BACKUP",
          "│   ├── BACKUP_231201.DAT",
          "│   ├── BACKUP_221201.DAT",
          "│   └── EDEN_BACKUP.DAT [CORROTTO]",
          "├── LOGS",
          "│   ├── ACCESSI.LOG",
          "│   ├── SICUREZZA.LOG",
          "│   ├── ERRORI.LOG",
          "│   └── SOC_241201.LOG",
          "├── EDEN [BLOCCATO]",
          "├── MAIL",
          "│   ├── INBOX",
          "│   ├── SENT",
          "│   └── DELETED",
          "├── DOCUMENTI",
          "├── SISTEMA.INI",
          "└── LEGGIMI.TXT",
          "",
        ]);
        break;

      case "eden":
      case "unlock":
        addToHistory([
          "▓▓▓ TENTATIVO DI ACCESSO NON AUTORIZZATO ▓▓▓",
          "",
          "Il tuo tentativo e' stato registrato.",
          "IP: 192.168.1.???",
          "Data: 24/12/2001 07:45",
          "",
          "L'amministratore e' stato notificato.",
          "[ERRORE: Amministratore non raggiungibile]",
          "",
        ]);
        break;

      case "access_eden_241201":
        addToHistory([
          "",
          "▓▓▓ CODICE DI EMERGENZA RICONOSCIUTO ▓▓▓",
          "",
          "Bypass sicurezza in corso...",
          "Caricamento archivio classificato...",
          "",
          "[AVVISO: Connessione non sicura]",
          "[AVVISO: Tracciamento IP attivo]",
          "",
        ]);
        setTimeout(() => {
          navigate("/eden");
        }, 2000);
        break;

      case "6024857":
        addToHistory([
          "",
          "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓",
          "▓                                ▓",
          "▓   CODICE SEGRETO RICONOSCIUTO   ▓",
          "▓                                ▓",
          "▓    Bravo! Hai trovato 6024857   ▓",
          "▓                                ▓",
          "▓   Tuttavia, nessun effetto      ▓",
          "▓   speciale attivato...          ▓",
          "▓                                ▓",
          "▓   Richiedi un indizio quando    ▓",
          "▓   vuoi! [wink]                  ▓",
          "▓                                ▓",
          "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓",
          "",
        ]);
        break;
      case "save_me":
      case "SAVE_ME":
      case "saveme":
        addToHistory([
          "",
          "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓",
          "▓                                  ▓",
          "▓   PROTOCOLLO E*** RICONOSCIUTO   ▓",
          "▓                                  ▓",
          "▓   Connessione in corso...        ▓",
          "▓                                  ▓",
          "▓   Chiave mancante richiesta al   ▓",
          "▓   server remoto...               ▓",
          "▓                                  ▓",
          "▓   RICALCOLO...                   ▓",
          "▓                                  ▓",
          "▓   *** DATI CORROTTI ***          ▓",
          "▓   Ripristino NON possibile       ▓",
          "▓                                  ▓",
          "▓   CONNESSIONE INTERROTTA         ▓",
          "▓                                  ▓",
          "▓   [ERRORE: KEY ***** mancante]   ▓",
          "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓",
          "",
        ]);
        break;

      default:
        if (cmd.trim()) {
          addToHistory([
            `'${command}' non e' riconosciuto come comando interno o esterno,`,
            `un programma eseguibile o un file batch.`,
            "",
          ]);
        }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput("");
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <RetroLayout>
      <RetroPanel
        header="💻 Terminal Legacy - CoolPlant Server"
        className="mb-4"
      >
        <div className="text-[10px] mb-2 text-muted-foreground">
          Connesso a: COOLPLANT-SRV01 | Stato: DEGRADATO | Data Sistema:
          24/12/2001
        </div>

        <div
          ref={terminalRef}
          onClick={handleTerminalClick}
          className="bg-[hsl(220,30%,8%)] text-[hsl(120,100%,65%)] font-mono text-[11px] p-4 h-[400px] overflow-y-auto cursor-text border-4 border-[hsl(220,10%,25%)]"
          style={{
            textShadow: "0 0 5px hsl(120 100% 50% / 0.5)",
            fontFamily: "'Courier New', 'Lucida Console', monospace",
          }}
        >
          {history.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap leading-tight">
              {line || "\u00A0"}
            </div>
          ))}

          <form onSubmit={handleSubmit} className="flex">
            <span>C:{currentPath.replace(/\//g, "\\")}&gt; </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none border-none text-[hsl(120,100%,65%)] font-mono text-[11px]"
              style={{ textShadow: "0 0 5px hsl(120 100% 50% / 0.5)" }}
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </form>
        </div>

        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
          <RetroButton
            size="sm"
            onClick={() => {
              executeCommand("help");
            }}
          >
            HELP
          </RetroButton>
          <RetroButton
            size="sm"
            onClick={() => {
              executeCommand("dir");
            }}
          >
            DIR
          </RetroButton>
          <RetroButton
            size="sm"
            onClick={() => {
              executeCommand("tree");
            }}
          >
            TREE
          </RetroButton>
          <RetroButton
            size="sm"
            onClick={() => {
              executeCommand("cls");
            }}
          >
            CLS
          </RetroButton>
        </div>
      </RetroPanel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RetroPanel header="📁 File Scaricabili">
          <div className="text-[10px] space-y-1">
            <p className="text-muted-foreground mb-2">
              Alcuni file sono disponibili per il download. Usa il comando
              DOWNLOAD.
            </p>
            <div className="retro-panel-inset p-2 space-y-1">
              <p>✓ LEGGIMI.TXT</p>
              <p>✓ BACKUP/BACKUP_231201.DAT</p>
              <p>✓ LOGS/ACCESSI.LOG</p>
              <p>✓ LOGS/SOC_241201.LOG</p>
              <p>✓ MAIL/INBOX/MSG_001.EML</p>
              <p>✓ DOCUMENTI/ORGANIGRAMMA.DOC</p>
            </div>
          </div>
        </RetroPanel>

        <RetroPanel header="⚠️ Avviso Sistema">
          <div className="text-[10px] space-y-2">
            <p className="text-[hsl(var(--status-danger))]">
              ATTENZIONE: Questo sistema è rimasto inattivo dal 24/12/2001.
            </p>
            <p>
              Alcuni file risultano corrotti o inaccessibili. La cartella EDEN
              richiede autorizzazione di Livello 5.
            </p>
            <p className="text-muted-foreground">
              Per recuperare dati corrotti, contattare il supporto tecnico.
              [ERRORE: Supporto non disponibile]
            </p>
          </div>
        </RetroPanel>
      </div>
    </RetroLayout>
  );
};

export default Terminal;
