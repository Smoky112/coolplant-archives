// Stato dei sistemi - variabili globali per lo stato dei server
// Se TRUE = online/ripristinato, se FALSE = stato corrotto

export interface SystemStatus {
  isOnline: boolean;
  onlineLabel: string;
  onlineClass: string;
  offlineLabel: string;
  offlineClass: string;
}

// Stato iniziale: tutti i sistemi sono corrotti/offline
export let systemsRestored = false;

export const setSystemsRestored = (value: boolean) => {
  systemsRestored = value;
};

// Configurazione stati per ogni sistema
export const getServerFarmStatus = (restored: boolean): { label: string; className: string } => {
  return restored 
    ? { label: "● ONLINE", className: "text-[hsl(var(--status-success))] font-bold" }
    : { label: "● OFFLINE", className: "text-[hsl(var(--status-danger))] font-bold blink" };
};

export const getSOCMonitorStatus = (restored: boolean): { label: string; className: string } => {
  return restored
    ? { label: "● OPERATIVO", className: "text-[hsl(var(--status-success))] font-bold" }
    : { label: "● DEGRADATO", className: "text-[hsl(var(--status-warning))] font-bold" };
};

export const getFirewallStatus = (restored: boolean): { label: string; className: string } => {
  return restored
    ? { label: "● ATTIVO", className: "text-[hsl(var(--status-success))] font-bold" }
    : { label: "● BREACH", className: "text-[hsl(var(--status-danger))] font-bold" };
};

export const getBackupStatus = (restored: boolean): { label: string; className: string } => {
  return restored
    ? { label: "● INTEGRO", className: "text-[hsl(var(--status-success))] font-bold" }
    : { label: "● CORROTTO", className: "text-[hsl(var(--status-corrupt))] font-bold" };
};

export const getAuthServerStatus = (restored: boolean): { label: string; className: string } => {
  return restored
    ? { label: "● ATTIVO", className: "text-[hsl(var(--status-success))] font-bold" }
    : { label: "● N/D", className: "text-muted-foreground font-bold" };
};
