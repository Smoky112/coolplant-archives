// Stato dei sistemi - gestito con localStorage per persistenza

export interface SystemStatus {
  label: string;
  className: string;
}

// Chiavi localStorage per ogni sistema
const STORAGE_KEYS = {
  serverFarm: "coolplant_server_farm_restored",
  socMonitor: "coolplant_soc_monitor_restored",
  firewall: "coolplant_firewall_restored",
  backup: "coolplant_backup_restored",
  authServer: "coolplant_auth_server_restored",
};

// Funzioni per leggere lo stato da localStorage
export const isServerFarmRestored = (): boolean => {
  return localStorage.getItem(STORAGE_KEYS.serverFarm) === "true";
};

export const isSOCMonitorRestored = (): boolean => {
  return localStorage.getItem(STORAGE_KEYS.socMonitor) === "true";
};

export const isFirewallRestored = (): boolean => {
  return localStorage.getItem(STORAGE_KEYS.firewall) === "true";
};

export const isBackupRestored = (): boolean => {
  return localStorage.getItem(STORAGE_KEYS.backup) === "true";
};

export const isAuthServerRestored = (): boolean => {
  return localStorage.getItem(STORAGE_KEYS.authServer) === "true";
};

// Funzioni per salvare lo stato in localStorage
export const setServerFarmRestored = (value: boolean) => {
  localStorage.setItem(STORAGE_KEYS.serverFarm, value.toString());
};

export const setSOCMonitorRestored = (value: boolean) => {
  localStorage.setItem(STORAGE_KEYS.socMonitor, value.toString());
};

export const setFirewallRestored = (value: boolean) => {
  localStorage.setItem(STORAGE_KEYS.firewall, value.toString());
};

export const setBackupRestored = (value: boolean) => {
  localStorage.setItem(STORAGE_KEYS.backup, value.toString());
};

export const setAuthServerRestored = (value: boolean) => {
  localStorage.setItem(STORAGE_KEYS.authServer, value.toString());
};

// Verifica se tutti i sistemi sono ripristinati
export const areAllSystemsRestored = (): boolean => {
  return (
    isServerFarmRestored() &&
    isSOCMonitorRestored() &&
    isFirewallRestored() &&
    isBackupRestored() &&
    isAuthServerRestored()
  );
};

// Reset tutti i sistemi (per debug/testing)
export const resetAllSystems = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};

// Configurazione stati per ogni sistema
export const getServerFarmStatus = (): SystemStatus => {
  return isServerFarmRestored()
    ? { label: "● ONLINE", className: "text-[hsl(var(--status-success))] font-bold" }
    : { label: "● OFFLINE", className: "text-[hsl(var(--status-danger))] font-bold blink" };
};

export const getSOCMonitorStatus = (): SystemStatus => {
  return isSOCMonitorRestored()
    ? { label: "● OPERATIVO", className: "text-[hsl(var(--status-success))] font-bold" }
    : { label: "● DEGRADATO", className: "text-[hsl(var(--status-warning))] font-bold" };
};

export const getFirewallStatus = (): SystemStatus => {
  return isFirewallRestored()
    ? { label: "● ATTIVO", className: "text-[hsl(var(--status-success))] font-bold" }
    : { label: "● BREACH", className: "text-[hsl(var(--status-danger))] font-bold" };
};

export const getBackupStatus = (): SystemStatus => {
  return isBackupRestored()
    ? { label: "● INTEGRO", className: "text-[hsl(var(--status-success))] font-bold" }
    : { label: "● CORROTTO", className: "text-[hsl(var(--status-corrupt))] font-bold" };
};

export const getAuthServerStatus = (): SystemStatus => {
  return isAuthServerRestored()
    ? { label: "● ATTIVO", className: "text-[hsl(var(--status-success))] font-bold" }
    : { label: "● N/D", className: "text-muted-foreground font-bold" };
};

// Legacy export per compatibilità
export const systemsRestored = false;
