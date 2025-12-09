import { Mail, Phone, MapPin, Printer, Clock, Building } from "lucide-react";
import RetroLayout from "@/layouts/RetroLayout";
import RetroPanel from "@/components/RetroPanel";
import RetroButton from "@/components/RetroButton";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';
import { env } from "process";

const SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID || "";
const PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY || "";

// Mappa degli oggetti ai Template ID di EmailJS
// Crea 4 template diversi su EmailJS se vuoi messaggi diversi, 
// oppure usa lo stesso ID se il template è generico.
const TEMPLATE_IDS = {
  info: "template_general_info",       // Template per Info generiche
  preventivo: "template_quote_request", // Template per Preventivi
  supporto: "template_tech_support",    // Template per Supporto
  partnership: "template_partnership",  // Template per Partnership
  altro: "template_h0glqft"        // Fallback
};

const Contatti = () => {
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    azienda: "",
    email: "",
    telefono: "",
    oggetto: "", // Valori: 'info', 'preventivo', 'supporto', 'partnership', 'altro'
    messaggio: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // 1. Seleziona il Template ID corretto in base all'oggetto
    // @ts-ignore (ignora errore ts sulle chiavi dinamiche per semplicità)
    const selectedTemplateId = TEMPLATE_IDS[formData.oggetto] || TEMPLATE_IDS.altro;

    // Genera dati "finti" per la scena
    const ticketCode = "TKT-" + Math.floor(Math.random() * 10000);
    const currentTime = new Date().toLocaleString('it-IT');

     const templateParams = {
      from_name: formData.nome,
      from_email: formData.email,
      company: formData.azienda || "N/A",
      phone: formData.telefono || "N/A",
      subject_type: formData.oggetto.toUpperCase(),
      message: formData.messaggio,
      
      access_code: ticketCode,
      time: currentTime,
      
      is_urgent: formData.oggetto === 'supporto' ? 'YES' : 'NO'
    };

    // 3. Invia Email
    emailjs.send(SERVICE_ID, selectedTemplateId, templateParams, PUBLIC_KEY)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        
        toast({
          title: "Messaggio inviato con successo!",
          description: `Grazie ${formData.nome}, abbiamo ricevuto la tua richiesta di ${formData.oggetto}.`,
          variant: "default", // O "success" se hai configurato un tema custom
        });

        // Reset Form
        setFormData({
          nome: "",
          azienda: "",
          email: "",
          telefono: "",
          oggetto: "",
          messaggio: "",
        });
      })
      .catch((err) => {
        console.error('FAILED...', err);
        
        toast({
          title: "Errore di trasmissione",
          description: "Impossibile inviare il messaggio. Controlla la connessione o riprova più tardi.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsSending(false);
      });
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
                    disabled={isSending}
                    className="retro-input w-full disabled:opacity-50"
                    placeholder="Mario Rossi"
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
                    disabled={isSending}
                    className="retro-input w-full disabled:opacity-50"
                    placeholder="CoolPlant Corp"
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
                    disabled={isSending}
                    className="retro-input w-full disabled:opacity-50"
                    placeholder="mario@esempio.it"
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
                    disabled={isSending}
                    className="retro-input w-full disabled:opacity-50"
                    placeholder="+39 ..."
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
                  disabled={isSending}
                  className="retro-input w-full disabled:opacity-50"
                >
                  <option value="">-- Seleziona motivo --</option>
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
                  disabled={isSending}
                  rows={6}
                  className="retro-input w-full resize-none disabled:opacity-50"
                  placeholder="Scrivi qui il tuo messaggio..."
                />
              </div>

              <div className="retro-panel-inset p-2 text-[10px]">
                <p>
                  * Campi obbligatori. I dati inseriti saranno trattati in conformità 
                  alla normativa sulla privacy (D.Lgs. 196/2003).
                </p>
              </div>

              <div className="flex gap-2">
                <RetroButton type="submit" disabled={isSending}>
                  {isSending ? "Trasmissione in corso..." : "Invia Messaggio"}
                </RetroButton>
                <RetroButton 
                  type="button" 
                  onClick={() => setFormData({ nome: "", azienda: "", email: "", telefono: "", oggetto: "", messaggio: "" })}
                  disabled={isSending}
                >
                  Cancella
                </RetroButton>
              </div>
            </form>
          </RetroPanel>
        </div>

        {/* Contact Info Sidebar (Invariata) */}
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
