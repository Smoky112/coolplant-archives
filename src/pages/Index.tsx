import { Shield, Lock, Database, Server, Eye, FileCheck, AlertTriangle, CheckCircle, XCircle, AlertOctagon } from "lucide-react";
import RetroLayout from "@/layouts/RetroLayout";
import RetroPanel from "@/components/RetroPanel";
import RetroButton from "@/components/RetroButton";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <RetroLayout>
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Main welcome panel */}
        <div className="md:col-span-2">
          <RetroPanel header="Benvenuti in CoolPlant Corporation">
            <div className="space-y-3 text-[11px]">
              <p className="leading-relaxed">
                <strong>CoolPlant Corporation</strong> è un'azienda italiana leader nel settore della 
                <em> Data Protection</em> e dell'analisi avanzata dei dati. Con sede nel moderno grattacielo 
                High-Tech di Brescia, offriamo soluzioni all'avanguardia per la sicurezza informatica aziendale.
              </p>
              
              <div className="retro-panel-inset p-3">
                <p className="text-center font-bold text-primary">
                  "La sicurezza dei vostri dati è la nostra missione"
                </p>
                <p className="text-center text-[10px] text-muted-foreground mt-1">
                  — Davide Bellapianta, CEO
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="flex items-center gap-2 p-2 bg-muted">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>DLP Enterprise</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-muted">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>GDPR Compliance</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-muted">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Threat Detection AI</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-muted">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>SOC 24/7</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Link to="/servizi">
                  <RetroButton>Scopri i Servizi →</RetroButton>
                </Link>
                <Link to="/contatti">
                  <RetroButton>Richiedi Info</RetroButton>
                </Link>
              </div>
            </div>
          </RetroPanel>
        </div>

        {/* Side panel - CORRUPTED STATUS */}
        <div className="space-y-4">
          <RetroPanel header="Stato Sistemi">
            <div className="space-y-2 text-[10px]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Server className="w-3 h-3" />
                  Server Farm
                </span>
                <span className="text-[hsl(var(--status-danger))] font-bold blink">● OFFLINE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  SOC Monitor
                </span>
                <span className="text-[hsl(var(--status-warning))] font-bold">● DEGRADATO</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Firewall
                </span>
                <span className="text-[hsl(var(--status-danger))] font-bold">● BREACH</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Database className="w-3 h-3" />
                  Backup
                </span>
                <span className="text-[hsl(var(--status-corrupt))] font-bold">● CORROTTO</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Auth Server
                </span>
                <span className="text-muted-foreground font-bold">● N/D</span>
              </div>
              <hr className="border-border my-2" />
              <p className="text-center text-muted-foreground">
                Ultimo aggiornamento: 24/12/2001 <span className="text-[hsl(var(--status-danger))]">07:45</span>
              </p>
              <p className="text-center text-[9px] text-[hsl(var(--status-corrupt))]">
                [ERRORE: Connessione interrotta]
              </p>
            </div>
          </RetroPanel>

          <RetroPanel header="⚠️ ALERT CRITICO">
            <div className="space-y-2 text-[10px]">
              <div className="flex items-start gap-1 p-1 bg-destructive/10 border border-destructive/30">
                <AlertOctagon className="w-3 h-3 text-destructive mt-0.5 blink" />
                <div>
                  <p className="font-bold text-destructive">INTRUSIONE RILEVATA</p>
                  <p className="text-muted-foreground">Piano 15 - Ufficio CEO</p>
                </div>
              </div>
              <div className="flex items-start gap-1 p-1 bg-muted">
                <AlertTriangle className="w-3 h-3 text-[hsl(var(--status-warning))] mt-0.5" />
                <div>
                  <p className="font-bold">Virus: CODE RED II</p>
                  <p className="text-muted-foreground">3 sistemi infetti</p>
                </div>
              </div>
              <div className="flex items-start gap-1 p-1 bg-muted">
                <XCircle className="w-3 h-3 text-[hsl(var(--status-corrupt))] mt-0.5" />
                <div>
                  <p className="font-bold">File EDEN.DAT</p>
                  <p className="text-muted-foreground text-[9px]">CRC Error - Dati non recuperabili</p>
                </div>
              </div>
              <p className="text-center text-[hsl(var(--status-danger))] font-bold">
                Livello minaccia: <span className="blink">CRITICO</span>
              </p>
            </div>
          </RetroPanel>
        </div>
      </div>

      {/* Services Preview */}
      <RetroPanel header="I Nostri Servizi" className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-[11px]">
          <div className="retro-panel-inset p-3 text-center">
            <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
            <h3 className="font-bold mb-1">Data Loss Prevention</h3>
            <p className="text-[10px] text-muted-foreground">
              Protezione avanzata contro la perdita di dati sensibili
            </p>
          </div>
          <div className="retro-panel-inset p-3 text-center">
            <Lock className="w-8 h-8 mx-auto mb-2 text-primary" />
            <h3 className="font-bold mb-1">Compliance</h3>
            <p className="text-[10px] text-muted-foreground">
              Consulenza GDPR e normative sulla privacy
            </p>
          </div>
          <div className="retro-panel-inset p-3 text-center">
            <Eye className="w-8 h-8 mx-auto mb-2 text-primary" />
            <h3 className="font-bold mb-1">SOC 24/7</h3>
            <p className="text-[10px] text-muted-foreground">
              Monitoraggio continuo delle minacce
            </p>
          </div>
          <div className="retro-panel-inset p-3 text-center">
            <FileCheck className="w-8 h-8 mx-auto mb-2 text-primary" />
            <h3 className="font-bold mb-1">Audit Security</h3>
            <p className="text-[10px] text-muted-foreground">
              Valutazione vulnerabilità e penetration test
            </p>
          </div>
        </div>
      </RetroPanel>

      {/* News Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RetroPanel header="Ultime News">
          <table className="retro-table w-full">
            <thead>
              <tr>
                <th>Data</th>
                <th>Titolo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>24/12/2001</td>
                <td className="text-[hsl(var(--status-danger))]">
                  <span className="blink">●</span> <a href="#" className="text-[hsl(var(--status-danger))]">[URGENTE] Incidente sicurezza Piano 15</a>
                </td>
              </tr>
              <tr>
                <td>23/12/2001</td>
                <td><a href="#">Backup natalizio completato</a> <span className="text-[hsl(var(--status-corrupt))] text-[9px]">[CORROTTO]</span></td>
              </tr>
              <tr>
                <td>20/12/2001</td>
                <td><a href="#">Nuovo Data Center Tier IV operativo</a></td>
              </tr>
              <tr>
                <td>15/12/2001</td>
                <td><a href="#">Partnership con Cisco Systems</a></td>
              </tr>
              <tr>
                <td>10/12/2001</td>
                <td><a href="#">Certificazione ISO 27001 ottenuta</a></td>
              </tr>
            </tbody>
          </table>
          <div className="mt-2">
            <Link to="/news">
              <RetroButton size="sm">Tutte le news →</RetroButton>
            </Link>
          </div>
        </RetroPanel>

        <RetroPanel header="Chi Siamo">
          <div className="text-[11px] space-y-2">
            <p>
              Fondata nel 1998, CoolPlant Corporation è diventata rapidamente un punto di riferimento 
              nel panorama italiano della sicurezza informatica.
            </p>
            <p>
              La nostra sede nel grattacielo High-Tech di Brescia ospita un modernissimo 
              <strong> Security Operations Center</strong> operativo 24 ore su 24, con server farm 
              criptati e air-gapped per la massima protezione dei dati.
            </p>
            <div className="retro-panel-inset p-2 mt-2">
              <p className="text-[10px]">
                <strong>Dipendenti:</strong> 150+ | <strong>Clienti:</strong> 500+ | <strong>Uptime:</strong> <span className="line-through text-muted-foreground">99.99%</span> <span className="text-[hsl(var(--status-danger))]">N/D</span>
              </p>
            </div>
            <div className="retro-panel-inset p-2 bg-muted/50 text-[9px] text-muted-foreground">
              <p>⚠️ Nota: Alcuni servizi potrebbero essere temporaneamente non disponibili.</p>
              <p>Ultimo report disponibile: 23/12/2001</p>
            </div>
            <Link to="/servizi">
              <RetroButton size="sm" className="mt-2">Scopri di più →</RetroButton>
            </Link>
          </div>
        </RetroPanel>
      </div>

      {/* System Log Preview */}
      <RetroPanel header="📋 Log di Sistema [Ultimi Eventi]" className="mt-4">
        <div className="retro-panel-inset p-2 font-mono text-[9px] bg-foreground/5 max-h-32 overflow-y-auto">
          <p className="text-muted-foreground">[24/12/2001 07:45:23] <span className="text-[hsl(var(--status-danger))]">CRITICAL:</span> Accesso non autorizzato - Piano 15</p>
          <p className="text-muted-foreground">[24/12/2001 07:44:58] <span className="text-[hsl(var(--status-warning))]">WARNING:</span> Tentativo login fallito - user: admin</p>
          <p className="text-muted-foreground">[24/12/2001 07:30:12] <span className="text-[hsl(var(--status-corrupt))]">ERROR:</span> File EDEN_BACKUP.DAT - Checksum non valido</p>
          <p className="text-muted-foreground">[24/12/2001 07:15:00] <span className="text-[hsl(var(--status-online))]">INFO:</span> Scheduled task: Morning_Check eseguito</p>
          <p className="text-muted-foreground">[24/12/2001 03:22:41] <span className="text-[hsl(var(--status-danger))]">CRITICAL:</span> IDS Alert - Possibile intrusione rilevata</p>
          <p className="text-muted-foreground">[24/12/2001 02:00:00] <span className="text-[hsl(var(--status-corrupt))]">ERROR:</span> Backup notturno fallito - Settore disco corrotto</p>
          <p className="text-muted-foreground">[23/12/2001 23:59:59] <span className="text-[hsl(var(--status-online))]">INFO:</span> Ultimo backup valido completato</p>
          <p className="text-muted-foreground">[23/12/2001 18:30:00] <span className="text-[hsl(var(--status-online))]">INFO:</span> D.Bellapianta logged in - Piano 15</p>
        </div>
        <p className="text-[9px] text-muted-foreground mt-1 text-right">
          Log troncato - <a href="#" className="text-primary">Accedi per visualizzare log completo</a>
        </p>
      </RetroPanel>
    </RetroLayout>
  );
};

export default Index;
