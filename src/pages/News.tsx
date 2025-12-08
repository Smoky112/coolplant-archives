import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Calendar, User, Tag, ExternalLink, X, Mail, Check } from "lucide-react";
import RetroLayout from "@/layouts/RetroLayout";
import RetroPanel from "@/components/RetroPanel";
import RetroButton from "@/components/RetroButton";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { edenTried } from "@/lib/terminalState";
import { baseNewsItems, incidentNews, backupNews, NewsItem } from "@/lib/newsData";

// News segreta Eden (appare solo dopo tentativo accesso)
const extraEdenNews: NewsItem = {
  id: 999,
  date: "24/12/2001",
  month: "Dicembre 2001",
  title: "⚠️ ALERT: Violazione di sicurezza",
  author: "SYSTEM",
  category: "URGENTE",
  content: "Rilevato tentativo di intrusione non autorizzato nei server EDEN. Protocollo di sicurezza attivato.",
  fullContent: `⚠️ ALERT DI SICUREZZA - LIVELLO CRITICO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Data: 24/12/2001
Ora: 07:45:00
Sorgente: Terminale Amministratore

È stato rilevato un tentativo di accesso forzato all'archivio protetto EDEN.

Dettagli incidente:
- Tentativo di bypass autenticazione
- Codice errore: ERR_ACCESS_DENIED_L5
- IP Tracciato: INTERNO

[NOTA AUTOMATICA]: I log suggeriscono che l'utente stia cercando informazioni sul "Progetto EDEN".
Si consiglia di verificare i file corrotti nella directory /BACKUP.

STATO SISTEMA: COMPROMESSO`,
  highlight: true,
};

const News = () => {
  const [searchParams] = useSearchParams();
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Tutti");
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const itemsPerPage = 3;

  // Costruisci la lista completa delle news
  const allNewsItems: NewsItem[] = [
    incidentNews,
    backupNews,
    ...(edenTried ? [extraEdenNews] : []),
    ...baseNewsItems,
  ];

  // Apri automaticamente una news se c'è il parametro ?article=ID
  useEffect(() => {
    const articleId = searchParams.get("article");
    if (articleId) {
      const newsToOpen = allNewsItems.find(n => n.id === parseInt(articleId));
      if (newsToOpen) {
        setSelectedNews(newsToOpen);
      }
    }
  }, [searchParams]);

  // Usa allNewsItems per il filtraggio
  const newsItems = allNewsItems;

  const categories = ["Tutti", "Infrastruttura", "Partnership", "Certificazioni", "Servizi", "Prodotti", "Eventi"];
  
  const archives = [
    { month: "Dicembre 2001", count: 4 },
    { month: "Novembre 2001", count: 3 },
    { month: "Ottobre 2001", count: 3 },
    { month: "Settembre 2001", count: 2 },
  ];

  const usefulLinks = [
    { name: "CERT-IT", url: "https://www.cert.it" },
    { name: "Garante Privacy", url: "https://www.garanteprivacy.it" },
    { name: "CLUSIT", url: "https://www.clusit.it" },
    { name: "Microsoft Security", url: "https://www.microsoft.com/security" },
  ];

  // Filter news
  const filteredNews = newsItems.filter((news) => {
    // Se è la news segreta, la mostriamo sempre se siamo in "Tutti" o se la categoria matcha (anche se "URGENTE" non è nella lista standard, in "Tutti" appare)
    const categoryMatch = selectedCategory === "Tutti" || news.category === selectedCategory;
    const monthMatch = !selectedMonth || news.month === selectedMonth;
    return categoryMatch && monthMatch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedMonth(null);
    setCurrentPage(1);
  };

  const handleArchiveClick = (month: string) => {
    setSelectedMonth(month === selectedMonth ? null : month);
    setSelectedCategory("Tutti");
    setCurrentPage(1);
  };

  const handleNewsletterSubmit = () => {
    if (!email || !email.includes("@")) {
      toast.error("Inserisci un indirizzo email valido");
      return;
    }
    toast.success("Iscrizione completata!", {
      description: `Email ${email} registrata con successo.`,
    });
    setEmail("");
  };

  const handleLinkClick = (url: string, name: string) => {
    toast.info(`Collegamento a ${name}`, {
      description: "[ERRORE 404: Server non raggiungibile - 24/12/2001]",
    });
  };

  const resetFilters = () => {
    setSelectedCategory("Tutti");
    setSelectedMonth(null);
    setCurrentPage(1);
  };

  return (
    <RetroLayout>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Main content */}
        <div className="md:col-span-3">
          <RetroPanel header="📰 News & Comunicati Stampa">
            {/* Active filters */}
            {(selectedCategory !== "Tutti" || selectedMonth) && (
              <div className="mb-3 p-2 bg-muted border border-border text-[10px]">
                <span className="text-muted-foreground">Filtri attivi: </span>
                {selectedCategory !== "Tutti" && (
                  <span className="bg-primary text-primary-foreground px-2 py-0.5 mr-2">
                    {selectedCategory}
                  </span>
                )}
                {selectedMonth && (
                  <span className="bg-primary text-primary-foreground px-2 py-0.5 mr-2">
                    {selectedMonth}
                  </span>
                )}
                <button 
                  onClick={resetFilters}
                  className="text-primary hover:underline ml-2"
                >
                  [Rimuovi filtri]
                </button>
              </div>
            )}

            <div className="space-y-4">
              {paginatedNews.length > 0 ? (
                paginatedNews.map((news) => (
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
                          <RetroButton size="sm" onClick={() => setSelectedNews(news)}>
                            Leggi tutto <ExternalLink className="w-3 h-3 inline ml-1" />
                          </RetroButton>
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground text-[11px]">
                  Nessuna news trovata per i filtri selezionati.
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-1 mt-4">
                <RetroButton 
                  size="sm" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                >
                  « Prec
                </RetroButton>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <RetroButton
                    key={page}
                    size="sm"
                    className={currentPage === page ? "bg-primary text-primary-foreground" : ""}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </RetroButton>
                ))}
                <RetroButton 
                  size="sm" 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                >
                  Succ »
                </RetroButton>
              </div>
            )}

            <div className="text-[9px] text-muted-foreground text-center mt-2">
              Pagina {currentPage} di {totalPages || 1} • {filteredNews.length} articoli totali
            </div>
          </RetroPanel>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <RetroPanel header="Categorie">
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`block w-full text-left text-[11px] p-1 hover:bg-muted no-underline transition-colors ${
                    selectedCategory === cat 
                      ? "bg-primary text-primary-foreground" 
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  → {cat}
                </button>
              ))}
            </div>
          </RetroPanel>

          <RetroPanel header="Archivio">
            <div className="space-y-1 text-[11px]">
              {archives.map((archive) => (
                <button
                  key={archive.month}
                  onClick={() => handleArchiveClick(archive.month)}
                  className={`block w-full text-left p-1 hover:bg-muted no-underline transition-colors ${
                    selectedMonth === archive.month 
                      ? "bg-primary text-primary-foreground" 
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  → {archive.month} ({archive.count})
                </button>
              ))}
            </div>
          </RetroPanel>

          <RetroPanel header="Newsletter">
            <div className="text-[11px] space-y-2">
              <p>Iscriviti alla nostra newsletter per ricevere le ultime news sulla sicurezza.</p>
              <div className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="La tua email..."
                  className="retro-input w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleNewsletterSubmit()}
                />
              </div>
              <RetroButton size="sm" className="w-full" onClick={handleNewsletterSubmit}>
                <Check className="w-3 h-3 mr-1" /> Iscriviti
              </RetroButton>
              <p className="text-[9px] text-muted-foreground">
                [SERVIZIO SOSPESO DAL 24/12/2001]
              </p>
            </div>
          </RetroPanel>

          <RetroPanel header="Link Utili">
            <div className="space-y-1 text-[11px]">
              {usefulLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.url, link.name)}
                  className="block w-full text-left p-1 hover:bg-muted text-foreground hover:text-primary transition-colors"
                >
                  → {link.name}
                </button>
              ))}
            </div>
          </RetroPanel>
        </div>
      </div>

      {/* News Detail Dialog */}
      <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
        <DialogContent className="max-w-2xl bg-card border-2 border-border shadow-[4px_4px_0_0_hsl(var(--border))] p-0 font-mono">
          <div className="bg-primary text-primary-foreground px-3 py-1 flex items-center justify-between">
            <DialogTitle className="text-[12px] font-bold flex items-center gap-2">
              📄 {selectedNews?.title}
            </DialogTitle>
            <button 
              onClick={() => setSelectedNews(null)}
              className="hover:bg-primary-foreground/20 p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {selectedNews && (
            <div className="p-4">
              <div className="flex items-center gap-4 text-[10px] text-muted-foreground mb-3 pb-2 border-b border-border">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {selectedNews.date}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {selectedNews.author}
                </span>
                <span className="flex items-center gap-1 bg-muted px-2 py-0.5">
                  <Tag className="w-3 h-3" />
                  {selectedNews.category}
                </span>
              </div>
              
              <div className="text-[11px] text-foreground leading-relaxed whitespace-pre-line max-h-[60vh] overflow-y-auto">
                {selectedNews.fullContent}
              </div>
              
              <div className="mt-4 pt-3 border-t border-border flex justify-between items-center">
                <span className="text-[9px] text-muted-foreground">
                  © 2001 CoolPlant Corporation - Tutti i diritti riservati
                </span>
                <RetroButton size="sm" onClick={() => setSelectedNews(null)}>
                  Chiudi [X]
                </RetroButton>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </RetroLayout>
  );
};

export default News;
