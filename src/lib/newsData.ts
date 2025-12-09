export interface NewsItem {
  id: number;
  date: string;
  month: string;
  title: string;
  author: string;
  category: string;
  content: string;
  fullContent: string;
  highlight: boolean;
  isSecret?: boolean; // Flag per stile speciale (rosso/glitch)
}

// --- 1. News Segreta (EDEN) ---
export const secretNews: NewsItem = {
  id: 999,
  date: "24/12/2001", //cambiare in data reale
  month: "Dicembre 2001",
  title: "⚠️ ALERT: Violazione di sicurezza",
  author: "SYSTEM",
  category: "URGENTE",
  content: "Rilevato tentativo di intrusione non autorizzato nei server EDEN. Protocollo di sicurezza attivato.",
  fullContent: `⚠️ ALERT DI SICUREZZA - LIVELLO CRITICO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Data: 24/12/2001
Ora: 07:45:00
Sorgente: Terminale Amministratore

È stato rilevato un tentativo di accesso forzato all'archivio protetto EDEN.

Dettagli incidente:
-Server Farm OFFLINE
-SOC Monitor DEGRADATO
-Firewall BREACH
-Backup CORROTTO
-Auth Server N/D

[NOTA AUTOMATICA]: I log suggeriscono che l'utente stia cercando informazioni sul "Progetto EDEN".
Sistemi corrotti, ripristinarli è necessario per proseguire nel progetto.

STATO SISTEMA: COMPROMESSO`,
  highlight: true,
  isSecret: true
};

// --- 2. News Standard (Lista completa) ---
export const baseNewsItems: NewsItem[] = [
  {
    id: 1,
    date: "20/12/2001",
    month: "Dicembre 2001",
    title: "Nuovo Data Center Tier IV operativo",
    author: "Ufficio Stampa",
    category: "Infrastruttura",
    content: "CoolPlant Corporation annuncia l'apertura ufficiale del nuovo Data Center Tier IV situato al piano interrato del grattacielo High-Tech di Brescia.",
    fullContent: `CoolPlant Corporation annuncia l'apertura ufficiale del nuovo Data Center Tier IV situato al piano interrato del grattacielo High-Tech di Brescia.

La struttura, dotata di sistemi di raffreddamento ridondanti e alimentazione UPS garantita, offre la massima affidabilità per i dati dei nostri clienti.

SPECIFICHE TECNICHE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Superficie: 2.500 mq su due livelli
• Rack disponibili: 200 unità 42U
• Potenza elettrica: 4 MW ridondati
• Raffreddamento: Sistema N+1 con chiller di backup
• Connettività: Fibra ottica 10 Gbps multi-carrier
• Sicurezza fisica: Accesso biometrico + badge RFID
• Monitoraggio: 24/7 con sistema CCTV digitale

Il Data Center è stato progettato secondo le più rigorose normative internazionali e rappresenta un investimento strategico di oltre 15 miliardi di lire per garantire ai nostri clienti enterprise la massima continuità operativa.

[NOTA INTERNA: Verificare anomalie rilevate nel sistema di climatizzazione Piano -2 - Ticket #4521]`,
    highlight: true,
  },
  {
    id: 2,
    date: "15/12/2001",
    month: "Dicembre 2001",
    title: "Partnership strategica con Cisco Systems",
    author: "Marketing",
    category: "Partnership",
    content: "Siamo orgogliosi di annunciare la nuova partnership con Cisco Systems come Security Partner certificato.",
    fullContent: `Siamo orgogliosi di annunciare la nuova partnership con Cisco Systems come Security Partner certificato.

Questa collaborazione ci permetterà di offrire soluzioni firewall e IDS/IPS di ultima generazione ai nostri clienti enterprise.

VANTAGGI PER I CLIENTI:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Accesso a tecnologie Cisco PIX Firewall serie 500
• Implementazione Cisco Secure IDS 4200
• Supporto tecnico certificato di primo livello
• Formazione dedicata per il personale IT
• Sconti riservati su hardware e licenze

CoolPlant Corporation diventa così uno dei 12 partner italiani autorizzati alla vendita e configurazione di soluzioni Cisco per la sicurezza perimetrale.

Il CEO Davide Bellapianta ha commentato: "Questa partnership rappresenta un passo fondamentale nella nostra strategia di crescita. La sicurezza informatica non è più un optional, ma una necessità per ogni azienda moderna."

Per maggiori informazioni contattare: partnership@coolplant.it`,
    highlight: false,
  },
  {
    id: 3,
    date: "10/12/2001",
    month: "Dicembre 2001",
    title: "Certificazione ISO 27001 conseguita",
    author: "Quality Assurance",
    category: "Certificazioni",
    content: "CoolPlant Corporation ha ottenuto la prestigiosa certificazione ISO 27001:2000 per il Sistema di Gestione della Sicurezza delle Informazioni.",
    fullContent: `CoolPlant Corporation ha ottenuto la prestigiosa certificazione ISO 27001:2000 per il Sistema di Gestione della Sicurezza delle Informazioni.

Un traguardo importante che conferma il nostro impegno nella protezione dei dati.

AMBITO DELLA CERTIFICAZIONE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Gestione servizi di Data Protection
• Attività di Security Operations Center
• Servizi di Vulnerability Assessment
• Consulenza compliance e audit
• Formazione e awareness sulla sicurezza

L'audit è stato condotto da DNV (Det Norske Veritas) nel mese di novembre 2001 e ha verificato la conformità di tutti i processi aziendali agli standard internazionali.

"La certificazione ISO 27001 non è un punto di arrivo, ma un punto di partenza per il miglioramento continuo dei nostri servizi" - Ing. Marco Ferretti, Quality Manager

PROSSIMI OBIETTIVI:
• Certificazione BS 7799-2 entro Q2 2002
• Audit di mantenimento previsto per dicembre 2002

[FILE ALLEGATO: cert_iso27001_coolplant.pdf - DOCUMENTO RISERVATO]`,
    highlight: true,
  },
  {
    id: 4,
    date: "05/12/2001",
    month: "Dicembre 2001",
    title: "SOC Piano -1: operatività full 24/7",
    author: "IT Operations",
    category: "Servizi",
    content: "Il nostro Security Operations Center situato al piano -1 è ora pienamente operativo con copertura 24 ore su 24, 7 giorni su 7.",
    fullContent: `Il nostro Security Operations Center situato al piano -1 è ora pienamente operativo con copertura 24 ore su 24, 7 giorni su 7.

Il team di analisti monitora costantemente le infrastrutture dei clienti per garantire la massima sicurezza.

COMPOSIZIONE DEL TEAM SOC:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• 4 Security Analyst Senior (turni diurni)
• 6 Security Analyst Junior (turni notturni)
• 2 Incident Response Manager
• 1 SOC Manager (Dott. Paolo Vezzoli)

TECNOLOGIE IMPLEMENTATE:
• SIEM: HP OpenView + moduli custom
• IDS: Snort 1.8 su piattaforma Linux
• Ticketing: Remedy ARS 5.0
• Monitoring: Nagios + MRTG per bandwidth
• Log Management: Syslog-ng centralizzato

METRICHE DI SERVIZIO (SLA):
• Tempo medio risposta alert: < 5 minuti
• Escalation incidenti critici: < 15 minuti
• Report mensile clienti: entro il 5 del mese

[ACCESSO RISERVATO: Procedure di emergenza disponibili su \\\\FILESRV01\\SOC\\RUNBOOK]

NOTA: Il SOC è collegato direttamente all'ufficio del CEO al Piano 15 tramite linea dedicata per comunicazioni prioritarie.`,
    highlight: false,
  },
  {
    id: 5,
    date: "20/11/2001",
    month: "Novembre 2001",
    title: "Nuovo servizio di Threat Intelligence",
    author: "R&D",
    category: "Servizi",
    content: "Lanciamo il nuovo servizio di Threat Intelligence che utilizza algoritmi avanzati per l'analisi predittiva delle minacce informatiche.",
    fullContent: `Lanciamo il nuovo servizio di Threat Intelligence che utilizza algoritmi avanzati per l'analisi predittiva delle minacce informatiche.

Il sistema elabora informazioni da molteplici fonti per identificare potenziali attacchi.

FONTI DI INTELLIGENCE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Feed CERT nazionali e internazionali
• Honeypot distribuiti in 12 data center europei
• Analisi malware proprietaria (Lab interno)
• Monitoraggio dark web e forum underground
• Correlazione con database CVE/MITRE

FUNZIONALITÀ PRINCIPALI:
• Early warning su nuove vulnerabilità
• Indicatori di Compromissione (IoC) aggiornati
• Report settimanali personalizzati per settore
• Alert real-time via SMS e email
• Dashboard web con threat map globale

Il servizio è sviluppato in collaborazione con il nostro team R&D guidato dal Dott. Andrea Zanetti, che ha implementato algoritmi proprietari per la correlazione degli eventi.

[CLASSIFICATO: Il progetto EDEN utilizza parte di questa infrastruttura per analisi avanzate - Rif. interno PRJ-EDEN-2001]

Costo servizio: da 2.500.000 Lire/mese per PMI`,
    highlight: false,
  },
  {
    id: 6,
    date: "15/11/2001",
    month: "Novembre 2001",
    title: "Aggiornamento piattaforma DLP",
    author: "Product Team",
    category: "Prodotti",
    content: "Rilasciata la versione 3.2 della nostra piattaforma DLP Enterprise con nuove funzionalità di content inspection.",
    fullContent: `Rilasciata la versione 3.2 della nostra piattaforma DLP Enterprise con nuove funzionalità di content inspection e supporto per i formati Microsoft Office XP.

Tutti i clienti riceveranno l'aggiornamento gratuito.

NOVITÀ VERSIONE 3.2:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Supporto completo Office XP (.docx, .xlsx, .pptx)
• Nuovo motore OCR per documenti scansionati
• Fingerprinting avanzato per dati strutturati
• Policy template per GDPR (in preparazione normativa UE)
• Console web migliorata con grafici real-time
• Agent ottimizzato per Windows XP Professional

REQUISITI DI SISTEMA:
• Server: Windows 2000 Server SP2, 512MB RAM, 20GB HD
• Client: Windows 98SE/2000/XP, 64MB RAM minimo
• Database: SQL Server 7.0 o superiore

PROCEDURA DI AGGIORNAMENTO:
1. Scaricare patch da ftp.coolplant.it/updates/dlp32
2. Eseguire backup database esistente
3. Lanciare setup.exe come Administrator
4. Riavviare servizi CoolPlant DLP Agent

SUPPORTO: Per assistenza tecnica contattare [support@coolplant.it](mailto:support@coolplant.it) o chiamare il numero verde 800-COOLPLA`,
    highlight: false,
  },
  {
    id: 7,
    date: "01/11/2001",
    month: "Novembre 2001",
    title: "Seminario sulla sicurezza informatica",
    author: "Formazione",
    category: "Eventi",
    content: "Il 15 novembre si è tenuto presso la nostra sede il seminario 'La sicurezza informatica nell'era di Internet' con oltre 100 partecipanti.",
    fullContent: `Il 15 novembre si è tenuto presso la nostra sede il seminario 'La sicurezza informatica nell'era di Internet' con oltre 100 partecipanti tra IT manager e responsabili sicurezza delle principali aziende bresciane.

PROGRAMMA DELL'EVENTO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
09:00 - Registrazione e welcome coffee
09:30 - "Lo scenario delle minacce informatiche nel 2001"
        Relatore: Dott. Davide Bellapianta, CEO CoolPlant
10:30 - "Implementare una strategia di sicurezza efficace"
        Relatore: Ing. Lucia Marchetti, Security Consultant
11:30 - Coffee break
12:00 - "Case study: proteggere i dati sensibili in azienda"
        Relatore: Dott. Paolo Vezzoli, SOC Manager
13:00 - Light lunch e networking
14:30 - Workshop pratico: "Vulnerability Assessment hands-on"
16:30 - Q&A e chiusura lavori

FEEDBACK PARTECIPANTI:
• 94% soddisfatti o molto soddisfatti
• 87% interessati a ulteriori eventi
• 65% richiesta preventivi per servizi

Il prossimo seminario è previsto per febbraio 2002 con focus su "Compliance e normative: prepararsi al futuro della privacy".

[NOTA: Durante il seminario il CEO ha accennato brevemente al Progetto EDEN definendolo "il futuro della protezione dati". Nessun dettaglio aggiuntivo è stato fornito ai partecipanti.]

Foto dell'evento disponibili su: http://intranet.coolplant.local/gallery/sem_nov2001`,
    highlight: false,
  },
  {
    id: 8,
    date: "25/10/2001",
    month: "Ottobre 2001",
    title: "Apertura nuova sede operativa Milano",
    author: "Ufficio Stampa",
    category: "Infrastruttura",
    content: "CoolPlant espande la propria presenza con una nuova sede operativa a Milano, in zona Porta Nuova.",
    fullContent: `CoolPlant Corporation espande la propria presenza con una nuova sede operativa a Milano, in zona Porta Nuova.

DETTAGLI SEDE MILANO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Indirizzo: Via Melchiorre Gioia 45, 20124 Milano
• Superficie: 400 mq open space
• Personale: 12 consulenti senior
• Servizi: Consulenza, Pre-sales, Account Management

La sede milanese permetterà di servire meglio i clienti del Nord Italia e di rafforzare la nostra presenza nel mercato enterprise lombardo.

Inaugurazione ufficiale prevista per il 10 novembre 2001.`,
    highlight: false,
  },
  {
    id: 9,
    date: "15/10/2001",
    month: "Ottobre 2001",
    title: "Nuovo contratto con Banca Popolare di Brescia",
    author: "Sales",
    category: "Partnership",
    content: "Firmato importante contratto pluriennale con Banca Popolare di Brescia per servizi di sicurezza gestita.",
    fullContent: `Firmato importante contratto pluriennale con Banca Popolare di Brescia per servizi di sicurezza gestita.

SCOPE DEL CONTRATTO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Monitoraggio SOC 24/7 per tutte le filiali
• Vulnerability Assessment trimestrale
• Penetration Testing annuale
• Formazione personale IT bancario
• Incident Response con SLA garantito

Valore contratto: 1.2 miliardi di lire su 3 anni.

"Siamo orgogliosi di questa partnership che conferma la fiducia del settore bancario nei nostri servizi" - Davide Bellapianta, CEO`,
    highlight: false,
  },
  {
    id: 10,
    date: "01/10/2001",
    month: "Ottobre 2001",
    title: "Rilascio CoolGuard Enterprise 2.0",
    author: "Product Team",
    category: "Prodotti",
    content: "Disponibile la nuova versione del nostro prodotto di punta per la protezione endpoint.",
    fullContent: `Disponibile la nuova versione del nostro prodotto di punta per la protezione endpoint: CoolGuard Enterprise 2.0.

NUOVE FUNZIONALITÀ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Protezione real-time contro virus e worm
• Firewall personale integrato
• Content filtering per navigazione web
• Console centralizzata web-based
• Supporto Windows XP (beta)

Upgrade gratuito per tutti i clienti con contratto di manutenzione attivo.

Download disponibile su: ftp.coolplant.it/products/coolguard20`,
    highlight: false,
  },
  {
    id: 11,
    date: "20/09/2001",
    month: "Settembre 2001",
    title: "Attivato servizio di Disaster Recovery",
    author: "IT Operations",
    category: "Servizi",
    content: "Nuovo servizio di Disaster Recovery as a Service per garantire la continuità operativa dei clienti.",
    fullContent: `Nuovo servizio di Disaster Recovery as a Service per garantire la continuità operativa dei clienti enterprise.

CARATTERISTICHE DEL SERVIZIO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• RPO (Recovery Point Objective): 15 minuti
• RTO (Recovery Time Objective): 4 ore
• Replica dati su Data Center secondario
• Test di failover semestrale incluso
• Documentazione procedure disaster recovery

Il servizio utilizza tecnologia di replica sincrona su fibra ottica dedicata verso il nostro sito di DR situato a Verona.

Costo: a partire da 5.000.000 Lire/mese`,
    highlight: false,
  },
  {
    id: 12,
    date: "05/09/2001",
    month: "Settembre 2001",
    title: "CoolPlant al Security Summit Roma",
    author: "Marketing",
    category: "Eventi",
    content: "Grande successo per CoolPlant al Security Summit di Roma con oltre 500 visitatori allo stand.",
    fullContent: `Grande successo per CoolPlant Corporation al Security Summit di Roma (3-5 settembre 2001).

HIGHLIGHTS DELL'EVENTO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Oltre 500 visitatori allo stand CoolPlant
• 45 demo prodotto effettuate
• 120 lead qualificati raccolti
• Speech del CEO su "Il futuro della Data Protection"

Il CEO Davide Bellapianta ha tenuto un keynote molto apprezzato sulla visione strategica della sicurezza informatica per il decennio 2000-2010.

"L'Italia deve investire di più in sicurezza informatica. Il gap con gli altri paesi europei è ancora significativo." - D. Bellapianta

Prossimo evento: Smau Milano, 18-22 ottobre 2001`,
    highlight: false,
  },
];

// --- News speciali aggiuntive (extra) ---
export const incidentNews: NewsItem = {
  id: 0,
  date: "24/12/2001",
  month: "Dicembre 2001",
  title: "[URGENTE] Incidente sicurezza Piano 15",
  author: "SYSTEM",
  category: "URGENTE",
  content: "ALERT CRITICO: Rilevata intrusione non autorizzata al Piano 15 - Ufficio CEO. Tutti i sistemi compromessi.",
  fullContent: `⚠️ ALERT DI SICUREZZA - LIVELLO CRITICO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Data: 24/12/2001
Ora: 07:45:00
Sorgente: Sistema di Allarme Automatico

DETTAGLI INCIDENTE:
• Intrusione rilevata: Piano 15 - Ufficio CEO
• Tipo: Accesso fisico non autorizzato
• Stato: CRITICO
• Telecamere: OFFLINE
• Testimoni: N/D

AZIONI AUTOMATICHE INTRAPRESE:
• Lockdown Piano 15 attivato
• Notifica alle autorità competenti
• Backup di emergenza avviato
• Log di sistema preservati

[ERRORE: Connessione al sistema di sorveglianza interrotta]
[ERRORE: Impossibile contattare il personale di sicurezza]

NOTA SISTEMA: Ultimo accesso registrato - Badge #001 (D. Bellapianta) ore 06:45`,
  highlight: true,
};

export const backupNews: NewsItem = {
  id: -1,
  date: "23/12/2001",
  month: "Dicembre 2001",
  title: "Backup natalizio completato",
  author: "IT Operations",
  category: "Infrastruttura",
  content: "Backup completo dei sistemi eseguito con successo. Tutti i dati sono stati archiviati.",
  fullContent: `Backup natalizio dei sistemi completato.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STATO BACKUP:
• Server principali: ████████ CORROTTO
• Database clienti: ████████ CORROTTO  
• File utenti: ████████ CORROTTO
• Log di sistema: ████████ PARZIALE

[ERRORE CRC: 0x45524F52]
[SETTORI DANNEGGIATI: 2,451]

NOTA: Il backup presenta anomalie.
Alcuni file risultano illeggibili.
Verificare integrità nastri DAT.

Ultimo backup valido: 20/12/2001`,
  highlight: false,
};
