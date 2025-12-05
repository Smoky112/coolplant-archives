import {
  Shield,
  Lock,
  Database,
  Server,
  Eye,
  FileCheck,
  Cpu,
  HardDrive,
  Network,
  AlertTriangle,
} from "lucide-react";
import { useState, useEffect } from "react";
import RetroLayout from "@/layouts/RetroLayout";
import RetroPanel from "@/components/RetroPanel";
import RetroButton from "@/components/RetroButton";
import { Link } from "react-router-dom";

// Componente per testo che cambia all'hover (effetto creepy semplice)
const CreepyText = ({
  text,
  creepyText,
}: {
  text: string;
  creepyText: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={`transition-colors duration-75 cursor-help ${
        isHovered ? "text-red-600 font-bold tracking-widest" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? creepyText : text}
    </span>
  );
};

// Componente "GlitchTruth": Riempie l'intera pagina con "LA VERITÀ"
const GlitchTruth = ({ text }: { text: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [truthElements, setTruthElements] = useState<
    Array<{ id: number; x: number; y: number; rotation: number; size: number }>
  >([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered) {
      // Genera elementi random ogni 50ms, accelerando nel tempo
      let count = 0;
      interval = setInterval(() => {
        count++;
        const newElements = Array.from({ length: Math.min(5, count) }).map(
          (_, i) => ({
            id: Date.now() + i,
            x: Math.random() * 100, // % della larghezza schermo
            y: Math.random() * 100, // % dell'altezza schermo
            rotation: (Math.random() - 0.5) * 60,
            size: 0.8 + Math.random() * 1.5, // tra 0.8rem e 2.3rem
          })
        );

        setTruthElements((prev) => {
          const updated = [...prev, ...newElements];
          // Limita a max 200 elementi per non crashare il browser
          return updated.slice(-200);
        });
      }, 50);
    } else {
      setTruthElements([]);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered]);

  return (
    <>
      <span
        className={`relative inline-block cursor-crosshair transition-colors ${
          isHovered ? "text-red-600 font-black animate-pulse" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {text}
      </span>

      {/* Overlay fullscreen con le scritte */}
      {isHovered && (
        <div
          className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden"
          style={{ mixBlendMode: "multiply" }}
        >
          {truthElements.map((el) => (
            <div
              key={el.id}
              className="absolute font-mono font-black text-red-600 whitespace-nowrap select-none animate-pulse"
              style={{
                left: `${el.x}%`,
                top: `${el.y}%`,
                transform: `rotate(${el.rotation}deg)`,
                fontSize: `${el.size}rem`,
                opacity: 0.7,
                textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                animation: "glitch 0.3s infinite",
              }}
            >
              LA VERITÀ
            </div>
          ))}
        </div>
      )}

      {/* CSS per l'animazione glitch */}
      <style>{`
        @keyframes glitch {
          0% { transform: translate(0, 0) skew(0deg); }
          25% { transform: translate(-3px, 2px) skew(2deg); }
          50% { transform: translate(3px, -2px) skew(-2deg); }
          75% { transform: translate(-2px, -3px) skew(1deg); }
          100% { transform: translate(2px, 3px) skew(-1deg); }
        }
      `}</style>
    </>
  );
};

const Servizi = () => {
  // Dati aggiornati per la tabella PREZZI (Acrostico E-D-E-N)
  const pricingRows = [
    {
      name: "Enterprise DLP Suite",
      type: "Licenza annuale",
      price: "€ 15.000/anno",
      note: "Per 100 endpoint",
    },
    {
      name: "Database Recovery Plan",
      type: "Servizio mensile",
      price: "€ 2.500/mese",
      note: "24/7 incluso",
    },
    {
      name: "External Vulnerability Scan",
      type: "Una tantum",
      price: "€ 8.000",
      note: "Include report",
    },
    {
      name: "Network Intrusion Detection",
      type: "Servizio mensile",
      price: "€ 500/mese",
      note: "Monitoraggio attivo",
    },
  ];

  const services = [
    {
      icon: Shield,
      title: "Data Loss Prevention (DLP)",
      description: (
        <>
          Sistema completo di prevenzione della perdita di dati sensibili.
          Monitoriamo endpoint, rete e storage per identificare e{" "}
          <CreepyText text="bloccare" creepyText="NASCONDERE" /> trasferimenti
          non autorizzati di informazioni confidenziali.
        </>
      ),
      features: [
        "Monitoraggio endpoint",
        "Analisi traffico di rete",
        "Policy personalizzate",
        "Report dettagliati",
      ],
    },
    {
      icon: Lock,
      title: "Compliance & Privacy",
      description: (
        <>
          Consulenza specializzata per la conformità alle normative sulla
          privacy. Supporto completo per l'adeguamento alla legislazione,
          garantendo che nessuno possa{" "}
          <CreepyText text="accedere" creepyText="SCAPPARE" /> ai vostri
          segreti.
        </>
      ),
      features: [
        "Audit privacy",
        "Gap analysis",
        "Formazione personale",
        "DPO as a Service",
      ],
    },
    {
      icon: Eye,
      title: "Security Operations Center (SOC)",
      description: (
        <>
          Centro operativo di sicurezza attivo 24/7. I nostri analisti{" "}
          <CreepyText text="monitorano" creepyText="VI OSSERVANO" />{" "}
          costantemente le vostre infrastrutture per identificare ogni vostra
          mossa in tempo reale.
        </>
      ),
      features: [
        "Monitoraggio 24/7",
        "Incident Response",
        "Threat Intelligence",
        "SIEM Management",
      ],
    },
    {
      icon: FileCheck,
      title: "Vulnerability Assessment",
      description: (
        <>
          Valutazione completa delle vulnerabilità. Penetration test e security
          audit per identificare punti deboli prima che vengano{" "}
          <GlitchTruth text="sfruttati" />.
        </>
      ),
      features: [
        "Penetration Testing",
        "Code Review",
        "Network Scanning",
        "Report esecutivi",
      ],
    },
    {
      icon: Database,
      title: "Backup & Disaster Recovery",
      description:
        "Soluzioni enterprise per backup sicuro e disaster recovery. Protezione dei dati critici con replica geografica e tempi di ripristino garantiti.",
      features: [
        "Backup criptato",
        "Replica off-site",
        "RTO/RPO garantiti",
        "Test periodici",
      ],
    },
    {
      icon: Cpu,
      title: "Threat Detection AI",
      description: (
        <>
          Sistema avanzato di rilevamento minacce basato su algoritmi di
          intelligenza artificiale. Analisi comportamentale per identificare chi{" "}
          <CreepyText text="minaccia" creepyText="SA TROPPO" /> il sistema.
        </>
      ),
      features: [
        "Machine Learning",
        "Behavioral Analysis",
        "Zero-day detection",
        "Automated response",
      ],
    },
  ];

  // Funzione per gestire il click sulla riga "Network" (Ultimo indizio EDEN)
  const handleEdenClick = (rowName: string) => {
    if (rowName.startsWith("Network")) {
      alert(
        "ERRORE DI SISTEMA: Accesso negato al modulo ???.\n\nContattare l'amministrazione per ulteriori informazioni!"
      );
    }
  };

  return (
    <RetroLayout>
      <RetroPanel header="I Nostri Servizi - Cosa Facciamo" className="mb-4">
        <div className="text-[11px] space-y-2 mb-4">
          <p>
            CoolPlant Corporation offre una gamma completa di servizi per la
            protezione dei dati e la sicurezza informatica aziendale. Le nostre
            soluzioni sono progettate per aziende di ogni dimensione, dalla PMI
            alla grande impresa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, index) => (
            <div key={index} className="retro-panel">
              <div className="retro-header flex items-center gap-2 -m-2 mb-3">
                <service.icon className="w-4 h-4" />
                {service.title}
              </div>
              <div className="text-[11px] space-y-2">
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                <div className="retro-panel-inset p-2">
                  <p className="font-bold mb-1">Caratteristiche:</p>
                  <ul className="grid grid-cols-2 gap-1">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <span className="text-primary">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </RetroPanel>

      {/* Technology Stack */}
      <RetroPanel header="La Nostra Tecnologia" className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px]">
          <div className="retro-panel-inset p-3">
            <div className="flex items-center gap-2 mb-2">
              <Server className="w-5 h-5 text-primary" />
              <h3 className="font-bold">Server Farm</h3>
            </div>
            <ul className="space-y-1 text-[10px]">
              <li>• Windows 2000 Server Datacenter</li>
              <li>• SQL Server 2000 Enterprise</li>
              <li>• Exchange Server 2000</li>
              <li>• Cluster failover attivo</li>
            </ul>
          </div>
          <div className="retro-panel-inset p-3">
            <div className="flex items-center gap-2 mb-2">
              <Network className="w-5 h-5 text-primary" />
              <h3 className="font-bold">Infrastruttura Rete</h3>
            </div>
            <ul className="space-y-1 text-[10px]">
              <li>• Cisco PIX Firewall</li>
              <li>• IDS/IPS Cisco Secure</li>
              <li>• VPN IPSec site-to-site</li>
              <li>• Load balancing F5</li>
            </ul>
          </div>
          <div className="retro-panel-inset p-3">
            <div className="flex items-center gap-2 mb-2">
              <HardDrive className="w-5 h-5 text-primary" />
              <h3 className="font-bold">Storage & Backup</h3>
            </div>
            <ul className="space-y-1 text-[10px]">
              <li>• EMC Symmetrix</li>
              <li>• Tape library DAT/DLT</li>
              <li>• Air-gapped archives</li>
              <li>• Backup incrementale giornaliero</li>
            </ul>
          </div>
        </div>
      </RetroPanel>

      {/* Pricing Table - ACROSTICO EDEN */}
      <RetroPanel header="Listino Servizi" className="mb-4">
        <table className="retro-table w-full text-[11px]">
          <thead>
            <tr>
              <th>Servizio</th>
              <th>Tipo</th>
              <th>Prezzo</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {pricingRows.map((row, index) => (
              <tr
                key={index}
                onClick={() => handleEdenClick(row.name)}
                className="hover:bg-foreground/5 cursor-pointer transition-colors"
                title={
                  row.name.startsWith("Network") ? "Clicca per dettagli..." : ""
                }
              >
                <td className="font-mono">
                  <span className="font-black text-primary text-[12px] leading-none -mt-[1px]">
                    {row.name.charAt(0)}
                  </span>
                  {row.name.slice(1)}
                </td>

                <td>{row.type}</td>
                <td>{row.price}</td>
                <td>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-[10px] text-muted-foreground mt-2 flex justify-between">
          <span>* Prezzi indicativi IVA esclusa.</span>
          <span className="font-mono text-[9px] opacity-50">
            sys_ref: E.D.E.N_v1.0
          </span>
        </p>
      </RetroPanel>

      <div className="flex justify-center gap-4">
        <Link to="/contatti">
          <RetroButton size="lg">Richiedi Preventivo</RetroButton>
        </Link>
        <Link to="/login">
          <RetroButton size="lg">Area Clienti</RetroButton>
        </Link>
      </div>
    </RetroLayout>
  );
};

export default Servizi;
