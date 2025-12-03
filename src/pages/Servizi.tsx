import { Shield, Lock, Database, Server, Eye, FileCheck, Cpu, HardDrive, Network, AlertTriangle } from "lucide-react";
import RetroLayout from "@/layouts/RetroLayout";
import RetroPanel from "@/components/RetroPanel";
import RetroButton from "@/components/RetroButton";
import { Link } from "react-router-dom";

const Servizi = () => {
  const services = [
    {
      icon: Shield,
      title: "Data Loss Prevention (DLP)",
      description: "Sistema completo di prevenzione della perdita di dati sensibili. Monitoriamo endpoint, rete e storage per identificare e bloccare trasferimenti non autorizzati di informazioni confidenziali.",
      features: ["Monitoraggio endpoint", "Analisi traffico di rete", "Policy personalizzate", "Report dettagliati"],
    },
    {
      icon: Lock,
      title: "Compliance & Privacy",
      description: "Consulenza specializzata per la conformità alle normative sulla privacy e protezione dati. Supporto completo per l'adeguamento alla legislazione italiana ed europea.",
      features: ["Audit privacy", "Gap analysis", "Formazione personale", "DPO as a Service"],
    },
    {
      icon: Eye,
      title: "Security Operations Center (SOC)",
      description: "Centro operativo di sicurezza attivo 24/7/365. Team di analisti esperti monitorano costantemente le vostre infrastrutture per identificare e rispondere alle minacce in tempo reale.",
      features: ["Monitoraggio 24/7", "Incident Response", "Threat Intelligence", "SIEM Management"],
    },
    {
      icon: FileCheck,
      title: "Vulnerability Assessment",
      description: "Valutazione completa delle vulnerabilità della vostra infrastruttura IT. Penetration test e security audit per identificare punti deboli prima che vengano sfruttati.",
      features: ["Penetration Testing", "Code Review", "Network Scanning", "Report esecutivi"],
    },
    {
      icon: Database,
      title: "Backup & Disaster Recovery",
      description: "Soluzioni enterprise per backup sicuro e disaster recovery. Protezione dei dati critici con replica geografica e tempi di ripristino garantiti.",
      features: ["Backup criptato", "Replica off-site", "RTO/RPO garantiti", "Test periodici"],
    },
    {
      icon: Cpu,
      title: "Threat Detection AI",
      description: "Sistema avanzato di rilevamento minacce basato su algoritmi di intelligenza artificiale. Analisi comportamentale per identificare attacchi zero-day e APT.",
      features: ["Machine Learning", "Behavioral Analysis", "Zero-day detection", "Automated response"],
    },
  ];

  return (
    <RetroLayout>
      <RetroPanel header="I Nostri Servizi - Cosa Facciamo" className="mb-4">
        <div className="text-[11px] space-y-2 mb-4">
          <p>
            CoolPlant Corporation offre una gamma completa di servizi per la protezione dei dati 
            e la sicurezza informatica aziendale. Le nostre soluzioni sono progettate per aziende 
            di ogni dimensione, dalla PMI alla grande impresa.
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
                <p className="text-muted-foreground">{service.description}</p>
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

      {/* Pricing Table */}
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
            <tr>
              <td>DLP Enterprise</td>
              <td>Licenza annuale</td>
              <td>€ 15.000/anno</td>
              <td>Per 100 endpoint</td>
            </tr>
            <tr>
              <td>SOC Monitoring</td>
              <td>Servizio mensile</td>
              <td>€ 2.500/mese</td>
              <td>24/7 incluso</td>
            </tr>
            <tr>
              <td>Vulnerability Assessment</td>
              <td>Una tantum</td>
              <td>€ 8.000</td>
              <td>Include report</td>
            </tr>
            <tr>
              <td>Compliance Audit</td>
              <td>Una tantum</td>
              <td>€ 5.000</td>
              <td>Privacy + ISO</td>
            </tr>
            <tr>
              <td>Backup Managed</td>
              <td>Servizio mensile</td>
              <td>€ 500/mese</td>
              <td>100GB inclusi</td>
            </tr>
          </tbody>
        </table>
        <p className="text-[10px] text-muted-foreground mt-2">
          * Prezzi indicativi IVA esclusa. Contattaci per un preventivo personalizzato.
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
