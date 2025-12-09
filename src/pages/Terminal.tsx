import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RetroLayout from "@/layouts/RetroLayout";
import RetroPanel from "@/components/RetroPanel";
import RetroButton from "@/components/RetroButton";
import { useAuth } from "@/contexts/AuthContext";

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
import { setEdenTried } from '@/lib/terminalState';

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
      "INFO.TXT",
    ],
  },
  "/INFO.TXT": {
    type: "file",
    downloadable: true,
    content: `========================================
 COOLPLANT CORPORATION - SERVER PRINCIPALE
 Ultimo accesso: 24/12/2001 07:45
========================================

ATTENZIONE: Questo sistema contiene dati 
riservati. Ogni accesso non autorizzato 
verra' perseguito a norma di legge.

Per assistenza: interno 4004
Amministratore: F.Griotti

[NOTA SISTEMA: Backup automatico FALLITO]
[NOTA SISTEMA: ERRORE CRITICO - Settore 0x7F2A]
[AVVISO: Contattare SOC Piano -1 per dettagli]
[AVVISO: Data: 24/12/2001 - Sistema in stato anomalo]
`,
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

[System Status]
LastUserAccess=07:30
ModuleStatus=LOCKED
AccessLevel=REQUIRED`,
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
Data: 23/12/2001
Ora: 23:59:15
Dimensione: 2.4 GB
Stato: COMPLETATO
Checksum: OK

Operatore: Francesco Griotti (Sistemista Senior)
Database: SQL_MAIN, SQL_CLIENTI
Email: 14.523 messaggi (Exchange Server)
File inclusi: 15.847

Special Archives: *D** (encrypted, size: 847 MB)

[Backup eseguito con successo]
[Nota: Prossimo backup pianificato 24/12 06:00]
[Nota: Backup non completato il 24/12]
`,
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
    content: `──────────────────────────────────────────
ERR0R: F1LE C0RRUPTED
======================
CRC Ch3ck F41LED
S3ct0r 0x7F2A unr34d4ble
Data Loss: ~87%

P4rt14l d4t4 r3c0v3r3d:
------------------------
...ARCH1V10 R1S3RV4T0 - 4CC3SS0 L1V3LL0 5...
...PR0G3TT0 "3D3N" - CL4SS1F1C4T0...
...cont1n3nt3: SCAND4L1 F1N4NZ14R1 N4Z10N4L1...
...r1m3ss10n3: "M1l4n0 - G1ugno 2001"...
...n0m1 1nv0lt1: T4GL14F3RR1, C4ND10, Z1M0L0...
...d0cum3nt1 3L1M1N4T1 il 24/12/2001 07:40...
...t3st1m0n14nz4 tr4sc0lt4: "GR10TT1 FR4NC3SC0"...
...R3F3R3NZ3: CL13NT3 "M3T4LL1" - R1M0SS0 20/12...
...C4SS3TT4 S1CUR3ZZ4: M1L4n0...
...3D3N.K3Y: L0C4Z10N3 SCOND0SC14NT4...
...ERR0R 0x0000F4T4L - Settore 0x7F2A...
[F1N3 D4T1 R3CUP3R4B1L1]
`,
  },
  "/LOGS": {
    type: "dir",
    children: ["ACCESSI.LOG", "SICUREZZA.LOG", "ERRORI.LOG", "SOC_241201.LOG"],
  },
  "/LOGS/ACCESSI.LOG": {
    type: "file",
    downloadable: true,
    content: `S1st3m4: C00LPL4NT-%%%%%-01

03:00:15 SYST3M      B00t 4ut0m4t1c0 [S0C T34m: 0K]
03:05:22 SYST3M      S3rv1z1 4vv14t1
07:15:00 SYST3M      M0rn1ng_Ch3ck 3s3gu1t0 [N0 4N0M4L13S]
07:28:33 D.B3LL4P14NT4 L0g1n - P14n0 15 [%%%%%%%%reader]
07:29:01 D.B3LL4P14NT4 4cc3ss0 %%%% - 0K [L1v3ll0 5]
07:30:45 D.B3LL4P14NT4 F1l3: PROV4_F1N4L3.D0C [R34D 4CC3SS]
07:35:12 D.B3LL4P14NT4 St4mp4: 3 p4g1n3 [Pr1nt3r P14n0 15]
07:42:18 %%%         L0g1n t3nt4t1v0 - F4LL1T0 [SSH %%%%%%%%%%]
07:43:55 ???         L0g1n t3nt4t1v0 - F4LL1T0 [R3try p4tt3rn]
07:44:58 4dm1n       L0g1n t3nt4t1v0 - F4LL1T0 [Bruit3 f0rc3 d3t3ct3d]
07:45:23 ???         4CC3SS0 F0RZ4T0 R1L3V4T0 [PHYSIC4L D00R SENS0R]
07:45:24 SYSTEM      !!! 1DS 4L3RT !!! [Bruit3 f0rc3 %%%% M0dul3]
07:45:25 SYSTEM      C0nn3ss10n3 C4M-15 1NT3RROTT4 [SIGN4L L0ST - S4B0T4GG10?]
07:45:26 SYSTEM      4ll4rm3 s1l3nz10s0 4tt1v4t0 [S3CURITY - N0T1F1ED]
07:45:27 SYSTEM      L0g P14n0 15 - C0RRU2T10N D3T3CT3D
--- F1N3 L0G ---

[N0T4: 15 m3ss4gg1 3l1m1n4t1 d4 1NB0X il 24/12/2001 07:40]
[N0T4: 4cc3ss l0g P14n0 15 c0rr0tt0 p4rz14lm3nt3 - S3tt0r3 0x7F2A]
[3RR0R: D4T4 r3c0v3ry n0t p0ss1bl3]
[3RR0R: %%%%%%%%%%%ERROR%%%%%%%%%%%]
`,
  },
  "/LOGS/SICUREZZA.LOG": {
    type: "file",
    content: `=== SECURITY LOG - 24/12/2001 ===

[07:45:23] CRITICAL
Tipo: INTRUSIONE FISICA
Origine: Piano 15 - Ufficio CEO
Dettagli: Porta forzata - Sensore attivato
Risposta: Allarme silenzioso + SOC notificato
Stato: IN CORSO

[07:45:24] CRITICAL
Tipo: IDS ALERT - BRUTE FORCE
Pattern: Tentativo accesso EDEN Module
Tentativi: 3 in 2 minuti
IP Origine: 192.168.15.???: SSH port 22
Profilo: "admin" account
Stato: BLOCCATO

[07:45:25] FATAL
Sistema di monitoraggio: OFFLINE
Ultima immagine: CAM-15_24122001_074525.BMP
Ora perdita segnale: 07:45:25
Dimensione: 0 bytes [CORRUPTED/DELETED]
Motivo segnalato: "Perdita segnale cavo"
Sospetto: SABOTAGGIO

[07:45:26] CRITICAL
Status: Security Desk tentativo contatto CEO
Risultato: NESSUNA RISPOSTA
Azione: Allerta Security fisica in corso

[07:47:00] FATAL
Status: Security Desk trova Davide Bellapianta
Condizione: NON RESPIRA
Causa apparente: TRAUMA CRANICO SEVERO
Posizione: Ufficio Piano 15, accanto a PC
Documento: PROVA_FINALE.DOC trovato per terra
`,
  },
  "/LOGS/ERRORI.LOG": {
    type: "file",
    corrupted: true,
    content: `ERR_DISK_READ_FAILURE [Settore 0x7F2A]
ERR_CHECKSUM_INVALID [EDEN backup integrity]
ERR_FILE_NOT_FOUND: EDEN.KEY [MANCANTE - CRITICO]
ERR_ACCESS_DENIED: Level 5 required [Tentativo illegale]
ERR_CORR%%%%%%%%UPTED_S%%%ECTOR [DANNI FISICI]
ERR_D4T4_L0ST_0x7F2A [IRRECUPERABILE]
ERR_SYS_HALT: Settore critico inaccessibile
ERR_CAM_15: Cable disconnected manually?
ERR_BACKUP_FAIL: 24/12 06:00 not executed
[AVVISO: Sistema in stato DEGRADATO]`,
  },
  "/LOGS/SOC_241201.LOG": {
    type: "file",
    downloadable: true,
    content: `=============================
Turno: Notturno (00:00-08:00)
Operatore Capo: Nazary Ciola (Responsabile SOC)
Team: Giuseppe Sapio, Matteo Paiella, Silvia Sardone

--- REPORT NOTTURNO 23/12 ---
22:00-23:59 Situazione normale, monitoraggio passivo

23:22 - IDS Alert: Scansione porte esterna
        Target: Router Cisco [Port 22, 3306, 1433]
        Azione: Bloccato automatico, IP in blacklist
        Note: Probabilmente script bot automatico
        
23:45 - Email notturne: 15 messaggi in INBOX
        Mittenti: Vari
        Note: Controllo rapido - niente strano

--- REPORT MATTUTINO 24/12 ---
04:15 - Anomalia traffico interno rilevata
        Origine: Piano 15 (Ufficio CEO)
        Destinazione: ...
        Pattern: Legittimo, accesso autorizzato
        Azione: Monitoraggio continuo
        Operatore assegnato: Paiella
        
07:15 - Morning Check automatico completato
        Status: NORMAL
        
07:28:33 - D.B3LL4P14NT4 L0g1n %%%CORRUPTED%%%
        0r4: 07:28:33
        M3t0d0: B10m3tr1c %%%%%%%% P14*@ 15
        N0t4: :)@3§^?^! - ... ... ... ..., C30 %%%ERROR%%%
        
07:29 - 4cc3ss0 *£2* r1usc1t0
        L1v3ll0: 5 (M4ss1m0)
        D4t4b4s3: %%%SETTORE 0x7+** ILLEGGIBILE%%%
        [DATI IRRECUPERABILI]
      
07:30 - Stampa rilevata da Piano 15
        3 pagine stampate
        Tempo: R3pido
        
07:42-07:44 - Brute force attack rilevato
        Tentativi: 3 (admin, ???, ???)
        Provenienza: Interno da 192.168.15.???
        
07:45:23 - ALERT CRITICO MULTIPLO !!!
        - Sensore porta Piano 15 attivato
        - Camera Piano 15 perdita segnale
        
07:45:30 - Ho contattato Filippo Zimolo (HR/Security)
        Risultato: Avviso ricevuto, in arrivo subito
        
07:47:00 - Filippo Zimolo ha raggiunto Piano 15
        Ha aperto la porta (chiave di Security)
        
07:47:15 - *** CORPO TROVATO ***
        Davide Bellapianta - Non respira
        Trauma cranico visibile
        Posizione: Davanti PC
      
07:48:30 - Rapporto interrotto per ordine di Zimolo
        [Bloccato - Responsabile Security]
=== FINE TURNO ===
`,
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
    content: `CEO: Davide Bellapianta [Piano 15]
  |
  +-- CFO: Daniela Candio [Piano 14]
  |    └─ Accesso: Report finanziari, Contratti client
  |    └─ Ultima modifica report: 20/12/2001
  |
  +-- CTO: Tagliaferri Lorenzo [Piano 13]
  |     |
  |     +-- IT Manager: Francesco Griotti
  |     |    └─ Accesso: Sistema amministratore, backup, password
  |     |
  |     +-- Responsabile SOC: Nazary Ciola [Piano -1]
  |     |    └─ Accesso: Tutti i log, monitoring 24/7
  |     |    └─ Team: Giuseppe Sapio, Matteo Paiella, Silvia Sardone
  |     |
  |     +-- Network Admin: Aurora Nicolini
  |     |    └─ Accesso: Firewall, VPN, router Cisco
  |     |    └─ Note: "Molto vicina al CEO"
  |
  +-- COO: [NOME NON REGISTRATO]
  |    └─ Operazioni generali
  |
  +-- HR & Security Fisica: Filippo Zimolo [Piano 15]
  |    └─ Accesso: Badge, telecamere, file dipendenti
  |
  +-- Comunicazione & PR: Charlotte Dicks
  |    └─ Accesso: Sito web, comunicati, newsletter
  |    └─ Note: "Ordine di censura su *D**"
  |
  +-- Consulente *D**: Prof. Mirko Alessandrini
  |    └─ Accesso: Archivio ***N, dataset sensibili
  |
  +-- Data Analyst EDEN: Francesca Moretti
  |    └─ Accesso: Dataset (sotto supervisione)
  |
  +-- Assistente CEO: Giulia Magri [Piano 15]
       └─ Accesso: Agenda, email, chiavi ufficio
       └─ Note: "Relazione professionale stretta"

Dipendenti totali: 156
Sedi: Brescia (HQ), Milano (commerciale)
`,
  },
  "/DOCUMENTI/CLIENTI_2001.XLS": {
    type: "file",
    content: `ELENCO CLIENTI TOP 2001 - RISERVATO
===================================

1. Banca Nazionale Italiana
   Servizio: DLP Completo
   Importanza: CRITICA
   Status: ATTIVO
   
2. Gruppo Industriale Lombardo
   Servizio: SOC Gestito
   Importanza: ALTA
   Status: ATTIVO
   
3. [NOME RIMOSSO - ORDINE DIREZIONE]
   Servizio: [RIMOSSO]
   Importanza: MASSIMA
   Status: [RIMOSSO] 
   Notes: "Contatti potenzialmente compromessi"
   Data rimozione: 20/12/2001
   Rimosso da: D.Bellapianta
   Motivo: [CENSURATO]
   
4. Assicurazioni Unite Italia
   Servizio: Compliance Audit
   Importanza: MEDIA
   Status: ATTIVO
   
5. [NOME RIMOSSO - ORDINE DIREZIONE]
   Servizio: [RIMOSSO]
   Importanza: ALTA
   Status: [RIMOSSO]
   Notes: "Scandalo potenziale - vedi EDEN"
   Data rimozione: 20/12/2001
   Rimosso da: D.Bellapianta
   
6. Pharma Italia Spa
   Servizio: Backup Critico
   Importanza: MEDIA
   Status: ATTIVO

[NOTA AMMINISTRATIVA]
Alcuni nominativi rimossi per ordine della Direzione (D.Bellapianta)
Data: 20/12/2001
Motivo: "Riservatezza e sensibilità informazioni"
Accesso documento completo: Solo Bellapianta + Daniela Candio
Backup completo: Francesco Griotti
`,
  },
  "/DOCUMENTI/NOTA_SPESE.DOC": {
    type: "file",
    content: `Nota Spese - D.Bellapianta
Dicembre 2001
==============

15/12 - Viaggio Milano: €245
        Motivo: "Incontro riservato - Cliente importante"
        Accompagnato: [CENSURATO]
        Durata: Giorno intero
        Note: Viaggio urgente organizzato
        
18/12 - Cena lavoro: €180
        Luogo: Ristorante Milano
        Partecipanti: [CENSURATO]
        Tipo: "Discussione sensibile"
        Note: Non registrato in agenda ufficiale
        
20/12 - Acquisto: €85
        Negozio: "Cassaforte Milano - Bravetti & Co"
        Oggetto: "Cassetta sicurezza - copia chiavi"
        Note: "URGENTE - Necessario per documenti riservati"
        
22/12 - Taxi notturno: €120
        Orario: 22:30-23:45
        Partenza: Milano (zona uffici)
        Destinazione: Brescia (grattacielo)
        Motivo: "Rientro urgente in sede"
        Note: Ha portato qualcosa da Milano?
        
23/12 - Nessuna spesa registrata
        NOTA: Lavorò da ufficio tutto il giorno
        
24/12 -
`,
  },
};

const Terminal = () => {
  const navigate = useNavigate();
  const { isTerminalAuthorized } = useAuth();
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
          "└── INFO.TXT",
          "",
        ]);
        break;

      case "eden":
      case "unlock":
        setEdenTried(true)
        addToHistory([
          "▓▓▓ TENTATIVO DI ACCESSO NON AUTORIZZATO ▓▓▓",
          "",
          "Il tuo tentativo e' stato registrato.",
          "IP: 192.168.1.???",
          "Data: 24/12/2001 07:45",
          "",
          "Chiave mancante: ***** .",
          "[ERRORE: Amministratore non raggiungibile]",
          "",
        ]);
        break;

      case "access_eden_241201":
        if (!isTerminalAuthorized()) {
          addToHistory([
            "",
            "▓▓▓ ACCESSO NEGATO ▓▓▓",
            "",
            "Sessione utente non autorizzata.",
            "Effettuare login con credenziali valide.",
            "",
            "[ERRORE: Livello accesso insufficiente]",
            "",
          ]);
          break;
        }
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
        }, 4000);
        break;
      case "/firewall":
      case "repair":
      case "restore":
        if (!isTerminalAuthorized()) {
          addToHistory([
            "",
            "▓▓▓ ACCESSO NEGATO ▓▓▓",
            "",
            "Sessione utente non autorizzata.",
            "Effettuare login con credenziali valide.",
            "",
            "[ERRORE: Livello accesso insufficiente]",
            "",
          ]);
          break;
        }
        addToHistory([
          "",
          "▓▓▓ Protocollo ripristino attivato ▓▓▓",
          "",
          "Sistemi disponibili per ripristino:",
          "  /server-farm    - Ripristina Server Farm",
          "  /soc-monitor    - Ripristina SOC Monitor",
          "  /firewall       - Ripristina Firewall",
          "  /backup         - Ripristina Backup",
          "  /auth-server    - Ripristina Auth Server",
          "",
          "Digitare il percorso del sistema da ripristinare.",
          "",
        ]);
        break;
      
      case "/server-farm":
        if (!isTerminalAuthorized()) {
          addToHistory(["", "▓▓▓ ACCESSO NEGATO - Login richiesto ▓▓▓", ""]);
          break;
        }
        addToHistory(["", "Reindirizzamento a Server Farm...", ""]);
        setTimeout(() => navigate("/server-farm"), 2000);
        break;
        
      case "/soc-monitor":
        if (!isTerminalAuthorized()) {
          addToHistory(["", "▓▓▓ ACCESSO NEGATO - Login richiesto ▓▓▓", ""]);
          break;
        }
        addToHistory(["", "Reindirizzamento a SOC Monitor...", ""]);
        setTimeout(() => navigate("/soc-monitor"), 2000);
        break;
        
      case "/backup":
        if (!isTerminalAuthorized()) {
          addToHistory(["", "▓▓▓ ACCESSO NEGATO - Login richiesto ▓▓▓", ""]);
          break;
        }
        addToHistory(["", "Reindirizzamento a Backup System...", ""]);
        setTimeout(() => navigate("/backup"), 2000);
        break;
        
      case "/auth-server":
        if (!isTerminalAuthorized()) {
          addToHistory(["", "▓▓▓ ACCESSO NEGATO - Login richiesto ▓▓▓", ""]);
          break;
        }
        addToHistory(["", "Reindirizzamento a Auth Server...", ""]);
        setTimeout(() => navigate("/auth-server"), 2000);
        break;
        
      case "firewall":
        if (!isTerminalAuthorized()) {
          addToHistory(["", "▓▓▓ ACCESSO NEGATO - Login richiesto ▓▓▓", ""]);
          break;
        }
        addToHistory([
          "",
          "▓▓▓ Protocollo firewall disattivato ▓▓▓",
          "",
          "Reindirizzamento ripristino firewall...",
          "",
        ]);
        setTimeout(() => navigate("/firewall"), 2000);
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
              <p>✓ INFO.TXT</p>
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
