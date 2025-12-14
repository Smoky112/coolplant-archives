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
  status?: "active" | "unavailable" | "unknown" | "???";
  note?: string;
}

const Team = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const employees: Employee[] = [
    {
      id: 1,
      name: "Davide",
      surname: "Bellapianta",
      role: "CEO e Fondatore",
      department: "Direzione",
      floor: "Piano 15",
      email: "d.bellapianta@coolplant.it",
      phone: "Interno 1500",
      image: "/images/employees/bellapianta.jpg",
      description: "Fondatore e CEO di CoolPlant Corporation. Guida l'azienda dal 1998 con una visione orientata all'innovazione nella sicurezza dei dati. Unico con accesso completo al Progetto EDEN.",
      status: "unknown",
      note: "Ultimo accesso: 24/12/2001 07:30 - STATO: NON RAGGIUNGIBILE",
    },
    {
      id: 2,
      name: "Lorenzo",
      surname: "Tagliaferri",
      role: "CTO",
      department: "Direzione Tecnica",
      floor: "Piano 14",
      email: "l.tagliaferri@coolplant.it",
      phone: "Interno 1401",
      image: "/images/employees/tagliaferri.jpg",
      description: "Responsabile di tutte le infrastrutture tecniche. Supervisiona il SOC e le server farm. Personalità riservata, possiede le chiavi fisiche del Data Center al Piano -1.",
      status: "active",
      note: "Attualmente connesso al sistema di emergenza.",
    },
    {
      id: 3,
      name: "Daniela",
      surname: "Candio",
      role: "CFO",
      department: "Amministrazione",
      floor: "Piano 14",
      email: "d.candio@coolplant.it",
      phone: "Interno 1402",
      image: "/images/employees/candio.jpg",
      description: "Gestisce budget e contratti commerciali. Ha scoperto recenti irregolarità nei conti aziendali. Una delle poche persone con accesso ai report finanziari riservati.",
      status: "unavailable",
    },
    {
      id: 4,
      name: "Nazary",
      surname: "Ciola",
      role: "Responsabile SOC",
      department: "Security Operations",
      floor: "Piano -1",
      email: "n.ciola@coolplant.it",
      phone: "Interno 0100",
      image: "/images/employees/ciola.jpg",
      description: "Capo del team di monitoraggio 24/7. Gestisce gli alert di sicurezza, le intrusioni e ha accesso diretto ai log di sistema.",
      status: "active",
      note: "In turno per gestione emergenza server.",
    },
    {
      id: 5,
      name: "Francesco",
      surname: "Griotti",
      role: "Sistemista Senior",
      department: "IT Operations",
      floor: "Piano 13",
      email: "f.griotti@coolplant.it",
      phone: "Interno 1301",
      image: "/images/employees/griotti.jpg",
      description: "Esperto Windows 2000 Server e SQL. Gestisce l'infrastruttura Exchange e i backup su nastri DAT. Ultimo backup verificato: 23/12/2001.",
      status: "unavailable",
      note: "Possibili competenze di hacking interno.",
    },
    {
      id: 6,
      name: "Aurora",
      surname: "Nicolini",
      role: "Network Admin",
      department: "IT Operations",
      floor: "Piano 13",
      email: "a.nicolini@coolplant.it",
      phone: "Interno 1302",
      image: "/images/employees/nicolini.jpg",
      description: "Responsabile firewall, router Cisco e connettività VPN. Molto vicina alla direzione, monitora tutti gli accessi remoti.",
      status: "unavailable",
    },
    {
      id: 7,
      name: "Giulia",
      surname: "Magri",
      role: "Assistente CEO",
      department: "Direzione",
      floor: "Piano 15",
      email: "g.magri@coolplant.it",
      phone: "Interno 1501",
      image: "/images/employees/magri.jpg",
      description: "Segretaria di fiducia di Bellapianta. Gestisce l'agenda e possiede le chiavi dell'ufficio al Piano 15. Ultima persona ad aver visto il CEO vivo.",
      status: "???",
      note: "Sospetti di relazione personale con la direzione.",
    },
    {
      id: 8,
      name: "Filippo",
      surname: "Zimolo",
      role: "HR & Security",
      department: "Risorse Umane",
      floor: "Piano 12",
      email: "f.zimolo@coolplant.it",
      phone: "Interno 1201",
      image: "/images/employees/zimolo.jpg",
      description: "Gestisce badge di accesso, telecamere e controllo dipendenti. Ha accesso ai log degli ingressi e ai file personali di tutto lo staff.",
      status: "unavailable",
    },
    {
      id: 9,
      name: "Charlotte",
      surname: "Dicks",
      role: "PR & Communication",
      department: "Marketing",
      floor: "Piano 11",
      email: "c.dicks@coolplant.it",
      phone: "Interno 1105",
      image: "/images/employees/dicks.jpg",
      description: "Gestisce la comunicazione esterna e il sito web. Ha ricevuto ordini recenti di censurare notizie riguardanti il progetto EDEN.",
      status: "unavailable",
    },
    {
      id: 10,
      name: "Mirko",
      surname: "Alessandrini",
      role: "Consulente Esterno",
      department: "R&D EDEN",
      floor: "Variabile",
      email: "m.alessandrini@unibs.it",
      phone: "Esterno",
      image: "/images/employees/alessandrini.jpg",
      description: "Docente universitario e analista dati. Collabora part-time sul Progetto EDEN. Esperto in investigazioni digitali.",
      status: "active",
      note: "Accesso remoto rilevato.",
    },
    {
      id: 11,
      name: "Francesca",
      surname: "Moretti",
      role: "Data Analyst Jr",
      department: "R&D EDEN",
      floor: "Piano 10",
      email: "f.moretti@coolplant.it",
      phone: "Interno 1002",
      image: "/images/employees/moretti.jpg",
      description: "Stagista nel progetto EDEN. Analizza dataset sotto supervisione. Ha accesso parziale ad alcuni dati sensibili.",
      status: "unavailable",
    }
  ];

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "active":
        return "text-[hsl(var(--status-online))]";
      case "unavailable":
        return "text-[hsl(var(--status-warning))]";
      case "unknown":
        return "text-[hsl(var(--status-danger))]";
      case "???":
        return "text-[hsl(var(--status-corrupt))] animate-pulse [text-shadow:1px_0_#ff0000,-1px_0_#00ffff] blur-[0.3px]";
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
      case "???":
        return "● ???";
      default:
        return "● N/D";
    }
  };

  // Statistiche calcolate sui nuovi dati
  const totalEmployees = 156; // Fisso come da lore
  const activeCount = employees.filter(e => e.status === 'active').length + 3; // +3 turno notte generico
  const unavailableCount = employees.filter(e => e.status === 'unavailable').length;

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
              <p className="text-[16px] font-bold text-primary">{totalEmployees}</p>
              <p className="text-muted-foreground">Dipendenti Totali</p>
            </div>
            <div className="retro-panel-inset p-2 text-center">
              <p className="text-[16px] font-bold text-primary">12</p>
              <p className="text-muted-foreground">Analisti SOC</p>
            </div>
            <div className="retro-panel-inset p-2 text-center">
              <p className="text-[16px] font-bold text-[hsl(var(--status-online))]">{activeCount}</p>
              <p className="text-muted-foreground">Attivi Ora</p>
            </div>
            <div className="retro-panel-inset p-2 text-center">
              <p className="text-[16px] font-bold text-[hsl(var(--status-warning))]">{unavailableCount}</p>
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
              Per emergenze contattare il SOC: Interno 0100
            </p>
          </div>
        </RetroPanel>
      </div>
    </RetroLayout>
  );
};

export default Team;
