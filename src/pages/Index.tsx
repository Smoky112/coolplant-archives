import { 
  Shield, 
  Lock, 
  Database, 
  Server, 
  Eye, 
  FileCheck, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  AlertOctagon 
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import RetroLayout from "@/layouts/RetroLayout";
import RetroPanel from "@/components/RetroPanel";
import RetroButton from "@/components/RetroButton";

const Index = () => {
  // --- STATO E GESTIONE POPUP INIZIALE ---
  const [showIntro, setShowIntro] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // All'avvio: controlla se l'intro è già stata vista in passato
  useEffect(() => {
    const seen = localStorage.getItem("coolplant_intro_seen");
    // Se è già stata vista (seen === "true"), nascondi subito il popup.
    // Per testare, puoi rimuovere questa condizione o pulire il localStorage.
    if (seen === "true") {
      setShowIntro(false); // Cambiato a true per testare ripetutamente
    }
  }, []);

  // Blocca lo scroll del body quando il popup è visibile
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup function per ripristinare lo scroll se il componente viene smontato
    return () => { document.body.style.overflow = "auto"; };
  }, [showIntro]);

  // Gestisce la chiusura con animazione
  const startInvestigation = () => {
    setIsFadingOut(true); // Avvia fade-out
    setTimeout(() => {
      setShowIntro(false); // Rimuove dal DOM dopo l'animazione
      localStorage.setItem("coolplant_intro_seen", "true");
      localStorage.setItem("glitchStated", "false");
    }, 700); // 700ms corrisponde alla classe duration-700
  };

  return (
    <RetroLayout>
      
      {/* --- POPUP "SYSTEM RECOVERY WIZARD" --- */}
      {showIntro && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-sans transition-opacity duration-700 ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-gray-600 border-b-gray-600 shadow-2xl max-w-lg w-full">
            
            {/* Header Finestra */}
            <div className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center font-bold text-sm bg-gradient-to-r from-[#000080] to-[#1084d0]">
              <span>SYSTEM_RECOVERY_WIZARD.EXE</span>
              <button onClick={startInvestigation} className="px-2 hover:bg-red-500 font-mono">X</button>
            </div>

            {/* Contenuto Finestra */}
            <div className="p-6 space-y-4 text-black text-sm">
              <div className="flex gap-4 items-start">
                <div className="text-4xl select-none">🕵️‍♂️</div>
                <div>
                  <h2 className="font-bold text-lg mb-2 font-serif">Sessione Forense #992-A</h2>
                  <p className="mb-4 leading-relaxed">
                    Benvenuti, Agenti. Avete recuperato l'accesso a un terminale della dismessa <strong>CoolPlant Corp</strong>.
                  </p>
                  <div className="mb-2 bg-yellow-100 p-2 border border-yellow-400 text-xs shadow-inner">
                    <strong>STATO CASO:</strong> Il CEO è stato assassinato. Tutti fanno errori, anche il colpevole. <strong>Cercateli.</strong>
                  </div>
                  <p>
                    La vostra missione è scoprire chi ha ucciso il CEO e cosa si cela dietro un'azienda apparentemente innocua.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-400 pt-4">
                <p className="font-bold text-[#800000] mb-2 text-xs uppercase">Protocollo Indagine:</p>
                <ul className="list-disc pl-5 space-y-1 text-xs font-mono bg-white/50 p-2 border border-gray-300 inset-shadow">
                  <li>Ogni file o testo nel sistema potrebbe essere un <strong>indizio vitale</strong>.</li>
                  <li>Incrociate date, nomi e codici: <strong>riflettete</strong> prima di agire.</li>
                  <li>Il sistema dispone di un protocollo di aiuto d'emergenza (se previsto).</li>
                </ul>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={startInvestigation}
                  className="border-2 border-t-white border-l-white border-r-gray-800 border-b-gray-800 px-6 py-2 active:border-t-gray-800 active:border-l-gray-800 active:bg-gray-200 bg-[#c0c0c0] font-bold text-xs hover:bg-gray-300 transition-colors shadow-sm"
                >
                  ACCETTA INCARICO &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- CONTENUTO PRINCIPALE (HERO) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        
        {/* Pannello di Benvenuto */}
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

              <div className="flex flex-wrap gap-2 mt-4">
                <Link to="/servizi">
                  <RetroButton>Scopri i Servizi →</RetroButton>
                </Link>
                <Link to="/contatti">
                  <RetroButton>Richiedi Info</RetroButton>
                </Link>
                <Link to="/terminal">
                  <RetroButton className="bg-[hsl(220,30%,15%)] text-[hsl(120,100%,65%)] border-[hsl(120,50%,30%)]">
                    💻 Accedi al Terminale
                  </RetroButton>
                </Link>
              </div>
            </div>
          </RetroPanel>
        </div>

        {/* Sidebar: Stato Sistemi + Alert */}
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
              
              {/* ALERT 1: INTRUSIONE (Narrativo) */}
              <div className="flex items-start gap-1 p-1 bg-destructive/10 border border-destructive/30">
                <AlertOctagon className="w-3 h-3 text-destructive mt-0.5 blink" />
                <div>
                  <p className="font-bold text-destructive">INTRUSIONE RILEVATA</p>
                  <p className="text-muted-foreground">Piano 15 - Ufficio CEO</p>
                </div>
              </div>

              {/* ALERT 2: VIRUS (Puzzle: Hover/Tooltip) */}
              <div
                className="flex items-start gap-1 p-1 bg-muted cursor-help transition-colors hover:bg-foreground/5"
                title="Target IP: 192.168.1.10 (SRV-MAIL), 192.168.1.55 (WS-GMAGRI), 192.168.1.2 (GATEWAY)"
              >
                <AlertTriangle className="w-3 h-3 text-[hsl(var(--status-warning))] mt-0.5" />
                <div>
                  <p className="font-bold">Virus: CODE RED II</p>
                  <p className="text-muted-foreground border-b border-dotted border-muted-foreground/50 inline-block">
                    3 sistemi infetti (Dettagli)
                  </p>
                </div>
              </div>

              {/* ALERT 3: FILE (Puzzle: HEX -> ASCII 'HELP') */}
              <div className="flex items-start gap-1 p-1 bg-muted">
                <XCircle className="w-3 h-3 text-[hsl(var(--status-corrupt))] mt-0.5" />
                <div>
                  <p className="font-bold">File ***.DAT</p>
                  <p className="text-muted-foreground text-[9px] font-mono select-all">
                    Err: <span className="text-[hsl(var(--status-danger))]">53415645204D45</span> [CORRUPT]
                  </p>
                </div>
              </div>

              <p className="text-center text-[hsl(var(--status-danger))] font-bold pt-1">
                Livello minaccia: <span className="blink">CRITICO</span>
              </p>
            </div>
          </RetroPanel>
        </div>
      </div>

      {/* --- SEZIONE SERVIZI --- */}
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

      {/* --- SEZIONI NEWS & CHI SIAMO --- */}
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

      {/* --- LOG DI SISTEMA (CON INDIZIO PRINCIPALE) --- */}
      <RetroPanel header="📋 Log di Sistema [Ultimi Eventi]" className="mt-4">
        <div className="retro-panel-inset p-2 font-mono text-[9px] bg-foreground/5 max-h-32 overflow-y-auto">
  {/* MOMENTI CRITICI DELL'OMICIDIO */}
  <p className="text-muted-foreground">[24/12/2001 07:47:15] <span className="text-[hsl(var(--status-danger))]">FATAL:</span> Corpo trovato - Piano 15 [D.Bellapianta]</p>
  <p className="text-muted-foreground">[24/12/2001 07:45:25] <span className="text-[hsl(var(--status-danger))]">CRITICAL:</span> CAM-15 OFFLINE - Piano 15</p>
  <p className="text-muted-foreground">[24/12/2001 07:45:25] <span className="text-[hsl(var(--status-danger))]">INFO:</span> Foto salvata con successo!</p>
  <p className="text-muted-foreground">[24/12/2001 07:45:23] <span className="text-[hsl(var(--status-danger))]">CRITICAL:</span> Accesso forzato - Piano 15 [DOOR BREACH]</p>
  
  {/* BRUTE FORCE SIMULTANEO */}
  <p className="text-muted-foreground">[24/12/2001 07:45:24] <span className="text-[hsl(var(--status-danger))]">CRITICAL:</span> IDS Alert - Brute force rilevato</p>
  <p className="text-muted-foreground">[24/12/2001 07:44:58] <span className="text-[hsl(var(--status-warning))]">WARNING:</span> Login fallito - admin [3 tentativi]</p>
  
  {/* CEO ULTIMI MOVIMENTI */}
  <p className="text-muted-foreground">[24/12/2001 07:30:45] <span className="text-[hsl(var(--status-corrupt))]">ERROR:</span> Stampa documento - Piano 15</p>
  <p className="text-muted-foreground">[24/12/2001 07:28:33] <span className="text-[hsl(var(--status-online))]">INFO:</span> D.Bellapianta accesso - Piano 15</p>
</div>

        <div className="flex justify-between items-center mt-1">
          {/* GUIDA PER IL GIOCATORE */}
          <p className="text-[9px] text-muted-foreground">
            Nota SOC: Per segnalazioni usare il Ref. Ticket nel form contatti.
          </p>
          <p className="text-[9px] text-muted-foreground text-right">
            Log troncato - <a href="#" className="text-primary">Accedi per visualizzare log completo</a>
          </p>
        </div>
      </RetroPanel>

    </RetroLayout>
  );
};

export default Index;
