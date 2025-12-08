// Dati condivisi per le news
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
}

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
];

// News speciale dell'incidente
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

// News backup corrotto
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
