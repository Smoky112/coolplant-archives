import { Calendar, User, Tag, ExternalLink } from "lucide-react";
import RetroLayout from "@/layouts/RetroLayout";
import RetroPanel from "@/components/RetroPanel";
import RetroButton from "@/components/RetroButton";

const News = () => {
  const newsItems = [
    {
      id: 1,
      date: "20/12/2001",
      title: "Nuovo Data Center Tier IV operativo",
      author: "Ufficio Stampa",
      category: "Infrastruttura",
      content: "CoolPlant Corporation annuncia l'apertura ufficiale del nuovo Data Center Tier IV situato al piano interrato del grattacielo High-Tech di Brescia. La struttura, dotata di sistemi di raffreddamento ridondanti e alimentazione UPS garantita, offre la massima affidabilità per i dati dei nostri clienti.",
      highlight: true,
    },
    {
      id: 2,
      date: "15/12/2001",
      title: "Partnership strategica con Cisco Systems",
      author: "Marketing",
      category: "Partnership",
      content: "Siamo orgogliosi di annunciare la nuova partnership con Cisco Systems come Security Partner certificato. Questa collaborazione ci permetterà di offrire soluzioni firewall e IDS/IPS di ultima generazione ai nostri clienti enterprise.",
      highlight: false,
    },
    {
      id: 3,
      date: "10/12/2001",
      title: "Certificazione ISO 27001 conseguita",
      author: "Quality Assurance",
      category: "Certificazioni",
      content: "CoolPlant Corporation ha ottenuto la prestigiosa certificazione ISO 27001:2000 per il Sistema di Gestione della Sicurezza delle Informazioni. Un traguardo importante che conferma il nostro impegno nella protezione dei dati.",
      highlight: true,
    },
    {
      id: 4,
      date: "01/12/2001",
      title: "SOC Piano -1: operatività full 24/7",
      author: "IT Operations",
      category: "Servizi",
      content: "Il nostro Security Operations Center situato al piano -1 è ora pienamente operativo con copertura 24 ore su 24, 7 giorni su 7. Il team di analisti monitora costantemente le infrastrutture dei clienti per garantire la massima sicurezza.",
      highlight: false,
    },
    {
      id: 5,
      date: "20/11/2001",
      title: "Nuovo servizio di Threat Intelligence",
      author: "R&D",
      category: "Servizi",
      content: "Lanciamo il nuovo servizio di Threat Intelligence che utilizza algoritmi avanzati per l'analisi predittiva delle minacce informatiche. Il sistema elabora informazioni da molteplici fonti per identificare potenziali attacchi.",
      highlight: false,
    },
    {
      id: 6,
      date: "15/11/2001",
      title: "Aggiornamento piattaforma DLP",
      author: "Product Team",
      category: "Prodotti",
      content: "Rilasciata la versione 3.2 della nostra piattaforma DLP Enterprise con nuove funzionalità di content inspection e supporto per i formati Microsoft Office XP. Tutti i clienti riceveranno l'aggiornamento gratuito.",
      highlight: false,
    },
    {
      id: 7,
      date: "01/11/2001",
      title: "Seminario sulla sicurezza informatica",
      author: "Formazione",
      category: "Eventi",
      content: "Il 15 novembre si è tenuto presso la nostra sede il seminario 'La sicurezza informatica nell'era di Internet' con oltre 100 partecipanti tra IT manager e responsabili sicurezza delle principali aziende bresciane.",
      highlight: false,
    },
  ];

  const categories = ["Tutti", "Infrastruttura", "Partnership", "Certificazioni", "Servizi", "Prodotti", "Eventi"];

  return (
    <RetroLayout>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Main content */}
        <div className="md:col-span-3">
          <RetroPanel header="📰 News & Comunicati Stampa">
            <div className="space-y-4">
              {newsItems.map((news) => (
                <article
                  key={news.id}
                  className={`retro-panel ${news.highlight ? "border-primary" : ""}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {news.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {news.author}
                        </span>
                        <span className="flex items-center gap-1 bg-muted px-2 py-0.5">
                          <Tag className="w-3 h-3" />
                          {news.category}
                        </span>
                      </div>
                      <h2 className="font-bold text-[12px] text-primary mb-2">
                        {news.highlight && <span className="text-destructive blink">★ </span>}
                        {news.title}
                      </h2>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        {news.content}
                      </p>
                      <div className="mt-2">
                        <RetroButton size="sm">
                          Leggi tutto <ExternalLink className="w-3 h-3 inline ml-1" />
                        </RetroButton>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-1 mt-4">
              <RetroButton size="sm" disabled>« Prec</RetroButton>
              <RetroButton size="sm" className="bg-primary text-primary-foreground">1</RetroButton>
              <RetroButton size="sm">2</RetroButton>
              <RetroButton size="sm">3</RetroButton>
              <RetroButton size="sm">Succ »</RetroButton>
            </div>
          </RetroPanel>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <RetroPanel header="Categorie">
            <div className="space-y-1">
              {categories.map((cat) => (
                <a
                  key={cat}
                  href="#"
                  className="block text-[11px] p-1 hover:bg-muted no-underline text-foreground hover:text-primary"
                >
                  → {cat}
                </a>
              ))}
            </div>
          </RetroPanel>

          <RetroPanel header="Archivio">
            <div className="space-y-1 text-[11px]">
              <a href="#" className="block p-1 hover:bg-muted no-underline text-foreground hover:text-primary">
                → Dicembre 2001 (4)
              </a>
              <a href="#" className="block p-1 hover:bg-muted no-underline text-foreground hover:text-primary">
                → Novembre 2001 (3)
              </a>
              <a href="#" className="block p-1 hover:bg-muted no-underline text-foreground hover:text-primary">
                → Ottobre 2001 (5)
              </a>
              <a href="#" className="block p-1 hover:bg-muted no-underline text-foreground hover:text-primary">
                → Settembre 2001 (2)
              </a>
            </div>
          </RetroPanel>

          <RetroPanel header="Newsletter">
            <div className="text-[11px] space-y-2">
              <p>Iscriviti alla nostra newsletter per ricevere le ultime news sulla sicurezza.</p>
              <input
                type="email"
                placeholder="La tua email..."
                className="retro-input w-full"
              />
              <RetroButton size="sm" className="w-full">
                Iscriviti
              </RetroButton>
            </div>
          </RetroPanel>

          <RetroPanel header="Link Utili">
            <div className="space-y-1 text-[11px]">
              <a href="#" className="block p-1 hover:bg-muted">
                → CERT-IT
              </a>
              <a href="#" className="block p-1 hover:bg-muted">
                → Garante Privacy
              </a>
              <a href="#" className="block p-1 hover:bg-muted">
                → CLUSIT
              </a>
              <a href="#" className="block p-1 hover:bg-muted">
                → Microsoft Security
              </a>
            </div>
          </RetroPanel>
        </div>
      </div>
    </RetroLayout>
  );
};

export default News;
