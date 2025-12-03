import { useState } from "react";
import { User, Mail, Phone, Briefcase, X, AlertTriangle } from "lucide-react";
import RetroLayout from "@/layouts/RetroLayout";
import RetroPanel from "@/components/RetroPanel";
import RetroButton from "@/components/RetroButton";

interface Employee {
  id: number;
  name: string;
  surname: string;
  role: string;
  department: string;
  floor: string;
  email: string;
  phone: string;
  image: string;
  description: string;
  status?: "active" | "unavailable" | "unknown";
  note?: string;
}

const Team = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const employees: Employee[] = [
    {
      id: 1,
      name: "Davide",
      surname: "Bellapianta",
      role: "CEO",
      department: "Direzione",
      floor: "Piano 15",
      email: "d.bellapianta@coolplant.it",
      phone: "Interno 1500",
      image: "/images/employees/bellapianta.jpg",
      description: "Fondatore e CEO di CoolPlant Corporation. Guida l'azienda dal 1998 con una visione orientata all'innovazione nella sicurezza dei dati.",
      status: "unknown",
      note: "Ultimo accesso: 24/12/2001 07:30 - STATO: NON RAGGIUNGIBILE",
    },
    {
      id: 2,
      name: "Marco",
      surname: "Trevisan",
      role: "CFO",
      department: "Finanza",
      floor: "Piano 14",
      email: "m.trevisan@coolplant.it",
      phone: "Interno 1400",
      image: "/images/employees/trevisan.jpg",
      description: "Responsabile finanziario con 15 anni di esperienza nel settore. Gestisce budget e investimenti strategici dell'azienda.",
      status: "unavailable",
    },
    {
      id: 3,
      name: "Alessandro",
      surname: "Negri",
      role: "CTO",
      department: "Tecnologia",
      floor: "Piano 13",
      email: "a.negri@coolplant.it",
      phone: "Interno 1300",
      image: "/images/employees/negri.jpg",
      description: "Dirige lo sviluppo tecnologico e l'architettura dei sistemi di sicurezza. Esperto in crittografia e DLP enterprise.",
      status: "active",
    },
    {
      id: 4,
      name: "Giuseppe",
      surname: "Rossi",
      role: "IT Manager",
      department: "IT Operations",
      floor: "Piano 13",
      email: "g.rossi@coolplant.it",
      phone: "Interno 1234",
      image: "/images/employees/rossi.jpg",
      description: "Gestisce l'infrastruttura IT aziendale e coordina il team di sistemisti. Responsabile dei backup e della manutenzione server.",
      status: "unavailable",
      note: "In ferie dal 24/12/2001",
    },
    {
      id: 5,
      name: "Stefania",
      surname: "Colombo",
      role: "COO",
      department: "Operations",
      floor: "Piano 12",
      email: "s.colombo@coolplant.it",
      phone: "Interno 1200",
      image: "/images/employees/colombo.jpg",
      description: "Supervisiona le operazioni quotidiane e coordina i team di lavoro. Garantisce l'efficienza dei processi aziendali.",
      status: "unavailable",
    },
    {
      id: 6,
      name: "Franco",
      surname: "Ferretti",
      role: "Security Manager",
      department: "SOC",
      floor: "Piano -1",
      email: "f.ferretti@coolplant.it",
      phone: "Interno 0100",
      image: "/images/employees/ferretti.jpg",
      description: "Capo del Security Operations Center. Coordina il team di 12 analisti nel monitoraggio H24 delle minacce informatiche.",
      status: "active",
      note: "In turno notturno - Ultimo report: 24/12/2001 07:48",
    },
    {
      id: 7,
      name: "Elena",
      surname: "Mancini",
      role: "Compliance Officer",
      department: "Legal & Compliance",
      floor: "Piano 11",
      email: "e.mancini@coolplant.it",
      phone: "Interno 1100",
      image: "/images/employees/mancini.jpg",
      description: "Responsabile della conformità normativa. Specializzata in privacy, GDPR e certificazioni ISO 27001.",
      status: "unavailable",
    },
    {
      id: 8,
      name: "Luca",
      surname: "Bianchi",
      role: "Senior Analyst",
      department: "SOC",
      floor: "Piano -1",
      email: "l.bianchi@coolplant.it",
      phone: "Interno 0101",
      image: "/images/employees/bianchi.jpg",
      description: "Analista senior del SOC con specializzazione in threat intelligence e incident response.",
      status: "active",
    },
  ];

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "active":
        return "text-[hsl(var(--status-online))]";
      case "unavailable":
        return "text-[hsl(var(--status-warning))]";
      case "unknown":
        return "text-[hsl(var(--status-danger))]";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case "active":
        return "● ATTIVO";
      case "unavailable":
        return "● NON DISPONIBILE";
      case "unknown":
        return "● SCONOSCIUTO";
      default:
        return "● N/D";
    }
  };

  return (
    <RetroLayout>
      <RetroPanel header="👥 Team CoolPlant Corporation" className="mb-4">
        <div className="text-[11px] space-y-2 mb-4">
          <p>
            Il nostro team di <strong>oltre 150 professionisti</strong> garantisce sicurezza e protezione 
            dei dati 24 ore su 24. Clicca su ogni dipendente per visualizzare la scheda completa.
          </p>
          <div className="retro-panel-inset p-2 text-[10px] text-muted-foreground">
            <p>⚠️ Nota: Alcuni profili potrebbero non essere aggiornati. Ultimo sync: 23/12/2001</p>
          </div>
        </div>

        {/* Employee Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {employees.map((employee) => (
            <div
              key={employee.id}
              onClick={() => setSelectedEmployee(employee)}
              className="retro-panel-inset p-3 cursor-pointer hover:bg-muted/50 transition-colors text-center"
            >
              {/* Avatar placeholder */}
              <div className="w-16 h-16 mx-auto mb-2 bg-muted border-2 border-border flex items-center justify-center">
                <User className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-bold text-[11px] text-primary truncate">
                {employee.name} {employee.surname}
              </h3>
              <p className="text-[10px] text-muted-foreground truncate">{employee.role}</p>
              <p className={`text-[9px] font-bold mt-1 ${getStatusColor(employee.status)}`}>
                {employee.status === "unknown" && <span className="blink">● </span>}
                {employee.status !== "unknown" && getStatusLabel(employee.status).charAt(0) + " "}
                {getStatusLabel(employee.status).substring(2)}
              </p>
            </div>
          ))}
        </div>
      </RetroPanel>

      {/* Employee Modal/Detail Panel */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="max-w-md w-full">
            <RetroPanel 
              header={`📋 Scheda Dipendente - ${selectedEmployee.surname.toUpperCase()}`}
            >
              <div className="relative">
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="absolute -top-1 -right-1 p-1 hover:bg-muted"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex gap-4">
                  {/* Avatar */}
                  <div className="w-20 h-24 bg-muted border-2 border-border flex items-center justify-center flex-shrink-0">
                    <User className="w-10 h-10 text-muted-foreground" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-[11px]">
                    <h2 className="font-bold text-primary text-[14px]">
                      {selectedEmployee.name} {selectedEmployee.surname}
                    </h2>
                    <p className="text-[12px] font-semibold">{selectedEmployee.role}</p>
                    <p className={`text-[10px] font-bold ${getStatusColor(selectedEmployee.status)}`}>
                      {selectedEmployee.status === "unknown" && <span className="blink">●</span>}
                      {selectedEmployee.status !== "unknown" && "●"} {getStatusLabel(selectedEmployee.status).substring(2)}
                    </p>
                  </div>
                </div>

                <hr className="border-border my-3" />

                <div className="space-y-2 text-[11px]">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3 h-3 text-muted-foreground" />
                    <span><strong>Dipartimento:</strong> {selectedEmployee.department}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3 text-muted-foreground" />
                    <span><strong>Ubicazione:</strong> {selectedEmployee.floor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3 text-muted-foreground" />
                    <span><strong>Email:</strong> {selectedEmployee.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-muted-foreground" />
                    <span><strong>Telefono:</strong> {selectedEmployee.phone}</span>
                  </div>
                </div>

                <div className="retro-panel-inset p-2 mt-3 text-[10px]">
                  <p>{selectedEmployee.description}</p>
                </div>

                {selectedEmployee.note && (
                  <div className="flex items-start gap-1 p-2 mt-2 bg-destructive/10 border border-destructive/30 text-[9px]">
                    <AlertTriangle className="w-3 h-3 text-[hsl(var(--status-warning))] mt-0.5" />
                    <span className="text-muted-foreground">{selectedEmployee.note}</span>
                  </div>
                )}

                <div className="flex gap-2 mt-3">
                  <RetroButton size="sm" onClick={() => setSelectedEmployee(null)}>
                    Chiudi
                  </RetroButton>
                  <RetroButton size="sm" disabled>
                    Invia Email
                  </RetroButton>
                </div>
              </div>
            </RetroPanel>
          </div>
        </div>
      )}

      {/* Stats Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RetroPanel header="📊 Statistiche Team">
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="retro-panel-inset p-2 text-center">
              <p className="text-[16px] font-bold text-primary">156</p>
              <p className="text-muted-foreground">Dipendenti Totali</p>
            </div>
            <div className="retro-panel-inset p-2 text-center">
              <p className="text-[16px] font-bold text-primary">12</p>
              <p className="text-muted-foreground">Analisti SOC</p>
            </div>
            <div className="retro-panel-inset p-2 text-center">
              <p className="text-[16px] font-bold text-[hsl(var(--status-online))]">23</p>
              <p className="text-muted-foreground">Attivi Ora</p>
            </div>
            <div className="retro-panel-inset p-2 text-center">
              <p className="text-[16px] font-bold text-[hsl(var(--status-warning))]">3</p>
              <p className="text-muted-foreground">Non Raggiungibili</p>
            </div>
          </div>
        </RetroPanel>

        <RetroPanel header="⚠️ Avviso HR">
          <div className="text-[10px] space-y-2">
            <p>
              A causa della chiusura natalizia, molti dipendenti risultano non disponibili.
            </p>
            <p className="text-[hsl(var(--status-danger))]">
              <span className="blink">●</span> Il CEO Davide Bellapianta risulta non raggiungibile dalle ore 07:45 del 24/12/2001.
            </p>
            <p className="text-muted-foreground text-[9px]">
              Per emergenze contattare il SOC: Interno 0101
            </p>
          </div>
        </RetroPanel>
      </div>
    </RetroLayout>
  );
};

export default Team;
