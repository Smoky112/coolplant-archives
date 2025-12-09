import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { 
  Calendar, 
  User, 
  Tag, 
  ExternalLink, 
  X, 
  Mail, 
  Check, 
  AlertTriangle 
} from "lucide-react";
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

// Import dati centralizzati
import { 
  baseNewsItems, 
  secretNews, 
  type NewsItem 
} from "@/lib/newsData";

  const CATEGORIES = [
  "Tutti", 
  "Infrastruttura", 
  "Partnership", 
  "Certificazioni", 
  "Servizi", 
  "Prodotti", 
  "Eventi"
];

const USEFUL_LINKS = [
  { name: "CERT-IT", url: "https://www.cert.it" },
  { name: "Garante Privacy", url: "https://www.garanteprivacy.it" },
  { name: "CLUSIT", url: "https://www.clusit.it" },
  { name: "Microsoft Security", url: "https://www.microsoft.com/security" },
];

const News = () => {
  // Hook per leggere i parametri URL
  const [searchParams] = useSearchParams();
  
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Tutti");
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const itemsPerPage = 3;

  // Fusione condizionale degli array: se edenTried è true, aggiungi la news segreta
  const allNewsItems = useMemo(() => {
    return edenTried ? [secretNews, ...baseNewsItems] : baseNewsItems;
  }, [edenTried]);

  // Calcolo dinamico dell'archivio (conta le occorrenze dei mesi)
  const archives = useMemo(() => {
    const counts = new Map<string, number>();
    allNewsItems.forEach((item) => {
      counts.set(item.month, (counts.get(item.month) || 0) + 1);
    });
    // Converti mappa in array di oggetti
    return Array.from(counts.entries()).map(([month, count]) => ({
      month,
      count
    }));
  }, [allNewsItems]);

  // Effetto per aprire automaticamente una news dall'URL (es. ?article=999)
  useEffect(() => {
    const articleParam = searchParams.get("article");
    if (articleParam) {
      const newsId = parseInt(articleParam);
      const newsToOpen = allNewsItems.find((n) => n.id === newsId);
      if (newsToOpen) {
        setSelectedNews(newsToOpen);
      }
    }
  }, [searchParams, allNewsItems]);

  // Filtro
  const filteredNews = useMemo(() => {
    return allNewsItems.filter((news) => {
      // La news segreta appare sempre se category è "Tutti" o se matcha la sua categoria
      const categoryMatch = selectedCategory === "Tutti" || news.category === selectedCategory;
      const monthMatch = !selectedMonth || news.month === selectedMonth;
      return categoryMatch && monthMatch;
    });
  }, [allNewsItems, selectedCategory, selectedMonth]);

  // Paginazione
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  // Gestori Eventi
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

  const handleLinkClick = (_url: string, name: string) => {
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
        {/* Main content: News Feed */}
        <div className="md:col-span-3">
          <RetroPanel header="📰 News & Comunicati Stampa">
            {/* Active filters bar */}
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
                    className={`retro-panel ${
                      news.isSecret 
                        ? "border-destructive/70 bg-destructive/5" // Stile speciale news segreta
                        : news.highlight ? "border-primary" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {/* Meta tags */}
                        <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {news.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {news.author}
                          </span>
                          <span className={`flex items-center gap-1 px-2 py-0.5 ${news.isSecret ? "bg-destructive text-destructive-foreground" : "bg-muted"}`}>
                            <Tag className="w-3 h-3" />
                            {news.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className={`font-bold text-[12px] mb-2 ${news.isSecret ? "text-destructive" : "text-primary"}`}>
                          {news.highlight && (
                            <span className={`${news.isSecret ? "" : "text-destructive"} blink mr-1`}>
                               {news.isSecret ? <AlertTriangle className="w-3 h-3 inline" /> : "★"}
                            </span>
                          )}
                          {news.title}
                        </h2>

                        {/* Abstract */}
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                          {news.content}
                        </p>

                        <div className="mt-2">
                          <RetroButton 
                            size="sm" 
                            onClick={() => setSelectedNews(news)}
                            className={news.isSecret ? "border-destructive text-destructive hover:bg-destructive hover:text-white" : ""}
                          >
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
              Pagina {currentPage} di {totalPages} • {filteredNews.length} articoli totali
            </div>
          </RetroPanel>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <RetroPanel header="Categorie">
            <div className="space-y-1">
              {CATEGORIES.map((cat) => (
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
              {USEFUL_LINKS.map((link) => (
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

      {/* News Detail Dialog (Modal) */}
      <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
        <DialogContent className={`max-w-2xl bg-card border-2 shadow-[4px_4px_0_0_hsl(var(--border))] p-0 font-mono ${selectedNews?.isSecret ? "border-destructive" : "border-border"}`}>
          <div className={`${selectedNews?.isSecret ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"} px-3 py-1 flex items-center justify-between`}>
            <DialogTitle className="text-[12px] font-bold flex items-center gap-2">
              📄 {selectedNews?.title}
            </DialogTitle>
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
                <span className={`flex items-center gap-1 px-2 py-0.5 ${selectedNews.isSecret ? "bg-destructive/10 text-destructive font-bold" : "bg-muted"}`}>
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
