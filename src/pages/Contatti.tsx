import { Mail, Phone, MapPin, Printer, Clock, Building, Ticket } from "lucide-react";
import RetroLayout from "@/layouts/RetroLayout";
import RetroPanel from "@/components/RetroPanel";
import RetroButton from "@/components/RetroButton";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Contatti = () => {
  const [formData, setFormData] = useState({
    nome: "",
    azienda: "",
    email: "",
    telefono: "",
    oggetto: "",
    messaggio: "",
  });
  const [ticketCode, setTicketCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Messaggio inviato",
      description: "Grazie per averci contattato. Risponderemo entro 24 ore lavorative.",
    });
    setFormData({
      nome: "",
      azienda: "",
      email: "",
      telefono: "",
      oggetto: "",
      messaggio: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = ticketCode.trim().toUpperCase();
    
    // Validazione: T + 5 numeri
    if (!/^T\d{5}$/.test(code)) {
      toast({
        title: "Errore Ticket",
        description: "Formato ticket: T12345",
        variant: "destructive",
      });
      return;
    }

    // Sistema ticket (collegati alla storia del gioco)
    const ticketActions: { [key: string]: { title: string; desc: string; success?: boolean } } = {
      "T23120": {
        title: "Ticket T23120 - Backup System",
        desc: "Backup del 23/12/2001 completato con successo. Controlla /BACKUP/BACKUP_231201.DAT",
        success: true,
      },
      "T07452": {
        title: "Ticket T07452 - IDS Alert",
        desc: "Alert di sicurezza rilevato alle 07:45:23. Controlla /LOGS/ACCESSI.LOG per dettagli.",
        success: true,
      },
      "T60248": {
        title: "Ticket T60248 - Accesso Autorizzato",
        desc: "Codice di emergenza riconosciuto! Prova 'access_eden_241201' nel terminale.",
        success: true,
      },
      "T12345": {
        title: "Ticket T12345 - Supporto Generico",
        desc: "Ticket non trovato nel database. Contatta amministratore G.Rossi (interno 1234).",
      },
    };

    const action = ticketActions[code] || {
      title: "Ticket Non Trovato",
      desc: `Ticket ${code} non riconosciuto nel sistema legacy (24/12/2001).`,
    };

    toast({
      title: action.title,
      description: action.desc,
      variant: action.success ? "default" : "destructive",
    });

    // Easter Egg speciale per T60248
    if (code === "T60248") {
      setTimeout(() => {
        toast({
          title: "🎉 Accesso Speciale!",
          description: "Hai sbloccato l'accesso EDEN! Torna al terminale.",
        });
      }, 1500);
    }

    setTicketCode("");
  };

  return (
    <RetroLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Contact Form */}
        <div className="md:col-span-2">
          <RetroPanel header="✉️ Contattaci">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold mb-1">
                    Nome e Cognome *
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="retro-input w-full"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold mb-1">
                    Azienda
                  </label>
                  <input
                    type="text"
                    name="azienda"
                    value={formData.azienda}
                    onChange={handleChange}
                    className="retro-input w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="retro-input w-full"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold mb-1">
                    Telefono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="retro-input w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold mb-1">
                  Oggetto *
                </label>
                <select
                  name="oggetto"
                  value={formData.oggetto}
                  onChange={handleChange}
                  required
                  className="retro-input w-full"
                >
                  <option value="">-- Seleziona --</option>
                  <option value="info">Richiesta informazioni</option>
                  <option value="preventivo">Richiesta preventivo</option>
                  <option value="supporto">Supporto tecnico</option>
                  <option value="partnership">Proposta partnership</option>
                  <option value="altro">Altro</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold mb-1">
                  Messaggio *
                </label>
                <textarea
                  name="messaggio"
                  value={formData.messaggio}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="retro-input w-full resize-none"
                />
              </div>

              <div className="retro-panel-inset p-2 text-[10px]">
                <p>
                  * Campi obbligatori. I dati inseriti saranno trattati in conformità 
                  alla normativa sulla privacy (D.Lgs. 196/2003).
                </p>
              </div>

              <div className="flex gap-2">
                <RetroButton type="submit">Invia Messaggio</RetroButton>
                <RetroButton type="reset" variant="default">
                  Cancella
                </RetroButton>
              </div>
            </form>
          </RetroPanel>
        </div>

        {/* Contact Info Sidebar */}
        <div className="space-y-4">
          <RetroPanel header="📍 Dove Siamo">
            <div className="space-y-3 text-[11px]">
              <div className="flex items-start gap-2">
                <Building className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="font-bold">CoolPlant Corporation S.p.A.</p>
                  <p>Grattacielo High-Tech</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p>Via Torre Alta, 15</p>
                  <p>25121 Brescia (BS)</p>
                  <p>Italia</p>
                </div>
              </div>
            </div>
          </RetroPanel>

          <RetroPanel header="📞 Contatti Diretti">
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <div>
                  <p className="font-bold">Centralino</p>
                  <p>+39 030 555 1234</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <div>
                  <p className="font-bold">Assistenza Tecnica</p>
                  <p>+39 030 555 1235</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 text-primary" />
                <div>
                  <p className="font-bold">Fax</p>
                  <p>+39 030 555 1236</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <div>
                  <p className="font-bold">Email</p>
                  <p>info@coolplant.it</p>
                </div>
              </div>
            </div>
          </RetroPanel>

          <RetroPanel header="🕐 Orari">
            <div className="space-y-2 text-[11px]">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="font-bold">Uffici</p>
                  <p>Lun-Ven: 09:00 - 18:00</p>
                  <p>Sab-Dom: Chiuso</p>
                </div>
              </div>
              <hr className="border-border" />
              <div className="retro-panel-inset p-2">
                <p className="font-bold text-primary">SOC 24/7</p>
                <p className="text-[10px]">
                  Il Security Operations Center è operativo 24 ore su 24, 
                  365 giorni l'anno.
                </p>
              </div>
            </div>
          </RetroPanel>

          {/* NUOVA SEZIONE TICKET SYSTEM */}
          <RetroPanel header="🎫 Supporto Ticket">
            <form onSubmit={handleTicketSubmit} className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Ticket className="w-4 h-4 text-primary" />
                <label className="text-[11px] font-bold">Inserisci Ticket ID</label>
              </div>
              <div className="retro-panel-inset p-2">
                <div className="flex">
                  <span className="bg-muted px-2 py-1 text-[10px] font-mono border-r">T</span>
                  <input
                    type="text"
                    value={ticketCode}
                    onChange={(e) => setTicketCode(e.target.value.replace(/[^0-9]/g, ''))}
                    maxLength={5}
                    placeholder="12345"
                    className="retro-input flex-1 text-center font-mono uppercase"
                    style={{ letterSpacing: "0.1em" }}
                  />
                </div>
                <p className="text-[9px] text-muted-foreground mt-1 text-center">
                  Formato: T + 5 cifre (es. T23120)
                </p>
              </div>
              <RetroButton type="submit" size="sm" className="w-full">
                🔍 Verifica Ticket
              </RetroButton>
            </form>
            <div className="mt-3 p-2 bg-muted/50 rounded text-[10px]">
              <p className="font-bold mb-1">Tickets di Emergenza:</p>
              <p className="text-[9px]">T23120 - Backup • T07452 - Sicurezza • T60248 - EDEN</p>
            </div>
          </RetroPanel>

          <RetroPanel header="🗺️ Mappa">
            <div className="retro-panel-inset p-4 text-center">
              <p className="text-[10px] text-muted-foreground">
                [Mappa interattiva]
              </p>
              <p className="text-[10px] mt-2">
                Il grattacielo High-Tech è situato in 
                Piazza della Vittoria, facilmente 
                raggiungibile con mezzi pubblici.
              </p>
              <p className="text-[10px] mt-2 text-muted-foreground">
                Parcheggio sotterraneo disponibile
              </p>
            </div>
          </RetroPanel>
        </div>
      </div>
    </RetroLayout>
  );
};

export default Contatti;
