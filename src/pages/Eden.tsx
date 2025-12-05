import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Eden = () => {
  const navigate = useNavigate();
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [randomGlitch, setRandomGlitch] = useState(false);

  useEffect(() => {
    // Initial boot sequence
    const timer = setTimeout(() => setShowContent(true), 2000);
    
    // Random glitch effects
    const glitchInterval = setInterval(() => {
      setRandomGlitch(true);
      setGlitchIntensity(Math.random());
      setTimeout(() => setRandomGlitch(false), 150 + Math.random() * 200);
    }, 3000 + Math.random() * 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(glitchInterval);
    };
  }, []);

  const glitchText = (text: string, corruption: number = 0.3) => {
    const glitchChars = "█▓▒░╔╗╚╝║═¥Ø∆ΩΣ";
    return text.split("").map((char, i) => {
      if (Math.random() < corruption) {
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }
      return char;
    }).join("");
  };

  const events = [
    { date: "15/03/1999", text: "Primo contatto - Soggetto A███████", level: "INFO", corrupted: false },
    { date: "22/07/1999", text: "Acquisiz█one documenti M██ano", level: "WARN", corrupted: true },
    { date: "03/11/1999", text: "Operazione ███████ - COMPLETATA", level: "DANGER", corrupted: true },
    { date: "18/02/2000", text: "Inciden██ Laboratorio - 3 vittime", level: "CRITICAL", corrupted: true },
    { date: "09/06/2000", text: "File OMEGA trasferito a ███", level: "WARN", corrupted: false },
    { date: "24/09/2000", text: "███████████████████████", level: "REDACTED", corrupted: true },
    { date: "12/12/2000", text: "Soggetto B - Eliminato", level: "CRITICAL", corrupted: false },
    { date: "30/04/2001", text: "Piano 15 - Anomalia rilevata", level: "WARN", corrupted: true },
    { date: "15/08/2001", text: "M███CIO - Corruzione dati totale", level: "CRITICAL", corrupted: true },
    { date: "20/12/2001", text: "Protocollo EDEN attivato", level: "DANGER", corrupted: false },
    { date: "24/12/2001", text: "█░▒▓ ERROR ▓▒░█", level: "FATAL", corrupted: true },
  ];

  const statistics = [
    { label: "File Classificati", value: "1.247", trend: -23 },
    { label: "Soggetti Monitorati", value: "89", trend: -100 },
    { label: "Operazioni Attive", value: "0", trend: -15 },
    { label: "Integrità Sistema", value: "12%", trend: -88 },
  ];

  const fragments = [
    "...i documenti dimostrano un coinvolgimento diretto di...",
    "...la riunione del 15 novembre ha confermato che...",
    "...non possiamo permettere che queste informazioni...",
    "...il soggetto è stato avvisato ma continua a...",
    "...ELIMINARE TUTTE LE PROVE PRIMA DEL...",
    "...la famiglia non deve mai sapere che...",
    "...i fondi sono stati trasferiti su conti...",
    "...Bellapianta sa troppo, bisogna agire...",
  ];

  return (
    <div 
      className="min-h-screen bg-[hsl(220,30%,4%)] text-[hsl(0,0%,70%)] overflow-hidden relative"
      style={{
        filter: randomGlitch ? `hue-rotate(${glitchIntensity * 180}deg) saturate(${2 - glitchIntensity})` : "none",
      }}
    >
      {/* Scanlines overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
        }}
      />

      {/* Random glitch blocks */}
      {randomGlitch && (
        <>
          <div 
            className="fixed bg-[hsl(0,100%,50%)] opacity-30 z-40"
            style={{
              top: `${Math.random() * 100}%`,
              left: 0,
              right: 0,
              height: `${5 + Math.random() * 20}px`,
              transform: `translateX(${(Math.random() - 0.5) * 20}px)`,
            }}
          />
          <div 
            className="fixed bg-[hsl(180,100%,50%)] opacity-20 z-40"
            style={{
              top: `${Math.random() * 100}%`,
              left: 0,
              right: 0,
              height: `${3 + Math.random() * 10}px`,
              transform: `translateX(${(Math.random() - 0.5) * 30}px)`,
            }}
          />
        </>
      )}

      {/* Chromatic aberration effect on glitch */}
      <div 
        className="fixed inset-0 pointer-events-none z-30 mix-blend-screen"
        style={{
          opacity: randomGlitch ? 0.5 : 0,
          background: "linear-gradient(90deg, rgba(255,0,0,0.1) 0%, transparent 50%, rgba(0,255,255,0.1) 100%)",
        }}
      />

      {/* Boot sequence */}
      {!showContent && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black">
          <div className="text-center font-mono">
            <p className="text-[hsl(0,100%,40%)] text-xs animate-pulse">
              ACCESSO NON AUTORIZZATO RILEVATO
            </p>
            <p className="text-[hsl(0,0%,50%)] text-[10px] mt-2">
              Caricamento dati classificati...
            </p>
            <div className="mt-4 w-48 h-1 bg-[hsl(220,30%,15%)] mx-auto">
              <div className="h-full bg-[hsl(0,100%,30%)] animate-pulse" style={{ width: "60%" }} />
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      {showContent && (
        <div className="p-4 md:p-8 max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <header className="mb-8 border-b border-[hsl(0,50%,25%)] pb-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 
                  className="text-2xl font-mono text-[hsl(0,70%,45%)] tracking-wider"
                  style={{ textShadow: randomGlitch ? "3px 0 hsl(180,100%,50%), -3px 0 hsl(0,100%,50%)" : "0 0 10px hsl(0,100%,30%)" }}
                >
                  {randomGlitch ? glitchText("PROGETTO EDEN") : "PROGETTO EDEN"}
                </h1>
                <p className="text-[10px] text-[hsl(0,0%,40%)] mt-1">
                  CLASSIFICAZIONE: ██████ | ACCESSO: LIVELLO 5+ | STATO: {randomGlitch ? "ERR0R" : "COMPROMESSO"}
                </p>
              </div>
              <button 
                onClick={() => navigate("/terminal")}
                className="text-[10px] px-3 py-1 border border-[hsl(0,50%,30%)] text-[hsl(0,50%,50%)] hover:bg-[hsl(0,50%,20%)] transition-colors font-mono"
              >
                [ESC] DISCONNETTI
              </button>
            </div>
          </header>

          {/* Alert Banner */}
          <div 
            className="mb-6 p-3 border border-[hsl(0,70%,30%)] bg-[hsl(0,70%,10%)]"
            style={{ animation: "pulse 2s infinite" }}
          >
            <p className="text-[hsl(0,70%,50%)] text-xs font-mono text-center">
              ⚠ ATTENZIONE: SISTEMA COMPROMESSO - INTEGRITÀ DATI NON GARANTITA ⚠
            </p>
          </div>

          {/* Statistics Grid - Negative values */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statistics.map((stat, i) => (
              <div 
                key={i}
                className="p-4 border border-[hsl(220,20%,15%)] bg-[hsl(220,30%,6%)]"
                style={{
                  transform: randomGlitch && Math.random() > 0.5 ? `translateX(${(Math.random() - 0.5) * 10}px)` : "none",
                }}
              >
                <p className="text-[10px] text-[hsl(0,0%,40%)] uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-xl font-mono text-[hsl(0,0%,60%)] mt-1">
                  {randomGlitch && Math.random() > 0.7 ? glitchText(stat.value, 0.5) : stat.value}
                </p>
                <p className="text-[10px] text-[hsl(0,70%,45%)] mt-1">
                  ▼ {stat.trend}%
                </p>
              </div>
            ))}
          </div>

          {/* Two column layout */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Events Timeline */}
            <div className="border border-[hsl(220,20%,15%)] bg-[hsl(220,30%,5%)] p-4">
              <h2 className="text-sm font-mono text-[hsl(0,50%,50%)] mb-4 border-b border-[hsl(220,20%,15%)] pb-2">
                ▌ CRONOLOGIA EVENTI
              </h2>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {events.map((event, i) => (
                  <div 
                    key={i}
                    className="flex items-start gap-3 p-2 border-l-2 text-[11px] font-mono"
                    style={{
                      borderColor: event.level === "FATAL" ? "hsl(0,100%,50%)" :
                                   event.level === "CRITICAL" ? "hsl(0,70%,45%)" :
                                   event.level === "DANGER" ? "hsl(30,70%,45%)" :
                                   event.level === "REDACTED" ? "hsl(270,50%,30%)" :
                                   "hsl(220,20%,30%)",
                      opacity: randomGlitch && Math.random() > 0.6 ? 0.3 : 1,
                      transform: randomGlitch && Math.random() > 0.8 ? `translateX(${Math.random() * 20}px)` : "none",
                    }}
                  >
                    <span className="text-[hsl(0,0%,35%)] whitespace-nowrap">{event.date}</span>
                    <span className={event.corrupted ? "text-[hsl(0,0%,50%)]" : "text-[hsl(0,0%,65%)]"}>
                      {randomGlitch && event.corrupted ? glitchText(event.text, 0.4) : event.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fragmented Data */}
            <div className="border border-[hsl(220,20%,15%)] bg-[hsl(220,30%,5%)] p-4">
              <h2 className="text-sm font-mono text-[hsl(0,50%,50%)] mb-4 border-b border-[hsl(220,20%,15%)] pb-2">
                ▌ FRAMMENTI RECUPERATI
              </h2>
              <div className="space-y-3">
                {fragments.map((fragment, i) => (
                  <div 
                    key={i}
                    className="p-2 bg-[hsl(220,30%,8%)] border-l border-[hsl(0,50%,25%)] text-[10px] font-mono"
                    style={{
                      opacity: 0.5 + Math.random() * 0.5,
                      filter: randomGlitch && Math.random() > 0.5 ? "blur(2px)" : "none",
                    }}
                  >
                    <span className="text-[hsl(0,0%,45%)]">
                      {randomGlitch && Math.random() > 0.6 ? glitchText(fragment, 0.3) : fragment}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Horror/Creepy section */}
          <div className="mt-8 border border-[hsl(0,70%,20%)] bg-[hsl(0,50%,5%)] p-4">
            <h2 className="text-sm font-mono text-[hsl(0,70%,50%)] mb-4">
              ▌ ████ INCIDENTI NON DOCUMENTATI ████
            </h2>
            <div className="grid md:grid-cols-3 gap-4 text-[10px] font-mono">
              <div className="p-3 bg-[hsl(0,50%,8%)] border border-[hsl(0,50%,15%)]">
                <p className="text-[hsl(0,70%,45%)]">PIANO -1 [SOC]</p>
                <p className="text-[hsl(0,0%,40%)] mt-2">
                  {randomGlitch ? glitchText("Rumori registrati alle 03:00", 0.2) : "Rumori registrati alle 03:00"}
                </p>
                <p className="text-[hsl(0,0%,30%)] mt-1">Nessun operatore presente</p>
                <p className="text-[hsl(0,0%,30%)]">Audio: [CORROTTO]</p>
              </div>
              <div className="p-3 bg-[hsl(0,50%,8%)] border border-[hsl(0,50%,15%)]">
                <p className="text-[hsl(0,70%,45%)]">PIANO 15 [CEO]</p>
                <p className="text-[hsl(0,0%,40%)] mt-2">
                  Ultima registrazione: 07:45:23
                </p>
                <p className="text-[hsl(0,0%,30%)] mt-1">Contenuto: ████████</p>
                <p className="text-[hsl(0,0%,30%)]">Stato: SIGILLATO</p>
              </div>
              <div className="p-3 bg-[hsl(0,50%,8%)] border border-[hsl(0,50%,15%)]">
                <p className="text-[hsl(0,70%,45%)]">ARCHIVIO [PIANO -2]</p>
                <p className="text-[hsl(0,0%,40%)] mt-2">
                  {randomGlitch ? glitchText("3 corpi non identificati", 0.15) : "3 corpi non identificati"}
                </p>
                <p className="text-[hsl(0,0%,30%)] mt-1">Data: ██/██/2000</p>
                <p className="text-[hsl(0,0%,30%)]">Rapporto: ELIMINATO</p>
              </div>
            </div>
          </div>

          {/* Corrupted image/graph placeholder */}
          <div className="mt-8 border border-[hsl(220,20%,15%)] bg-[hsl(220,30%,5%)] p-4">
            <h2 className="text-sm font-mono text-[hsl(0,50%,50%)] mb-4">
              ▌ GRAFICO ATTIVITÀ - [INVERTITO]
            </h2>
            <div 
              className="h-32 relative overflow-hidden"
              style={{ filter: "invert(1) hue-rotate(180deg)" }}
            >
              <div className="absolute inset-0 flex items-end justify-around px-4">
                {[65, 78, 45, 89, 34, 92, 56, 23, 67, 45, 78, 12].map((h, i) => (
                  <div 
                    key={i}
                    className="w-4 bg-[hsl(0,70%,40%)]"
                    style={{ 
                      height: `${h}%`,
                      opacity: randomGlitch && Math.random() > 0.5 ? 0.3 : 0.8,
                      transform: randomGlitch ? `scaleY(${0.5 + Math.random()})` : "none",
                    }}
                  />
                ))}
              </div>
              {/* Glitch overlay on graph */}
              {randomGlitch && (
                <div className="absolute inset-0 bg-[hsl(0,100%,50%)] opacity-20" />
              )}
            </div>
            <div className="flex justify-between text-[9px] text-[hsl(0,0%,35%)] mt-2 font-mono">
              <span>GEN</span><span>FEB</span><span>MAR</span><span>APR</span>
              <span>MAG</span><span>GIU</span><span>LUG</span><span>AGO</span>
              <span>SET</span><span>OTT</span><span>NOV</span><span>DIC</span>
            </div>
          </div>

          {/* Final message */}
          <div className="mt-8 text-center p-6 border border-[hsl(0,70%,20%)] bg-[hsl(0,50%,4%)]">
            <p 
              className="text-[hsl(0,70%,40%)] text-xs font-mono"
              style={{ 
                textShadow: randomGlitch ? "2px 0 hsl(180,100%,50%), -2px 0 hsl(0,100%,50%)" : "none",
                animation: "pulse 3s infinite",
              }}
            >
              {randomGlitch 
                ? glitchText("LA VERITÀ È SEPOLTA CON LUI", 0.2)
                : "LA VERITÀ È SEPOLTA CON LUI"
              }
            </p>
            <p className="text-[9px] text-[hsl(0,0%,30%)] mt-2 font-mono">
              24/12/2001 - FINE TRASMISSIONE
            </p>
          </div>

          {/* Footer warning */}
          <footer className="mt-8 text-center text-[9px] text-[hsl(0,0%,25%)] font-mono">
            <p>ACCESSO REGISTRATO | IP: 192.168.███.███ | TRACCIAMENTO ATTIVO</p>
            <p className="mt-1">Tutti i dati sono soggetti a monitoraggio</p>
          </footer>
        </div>
      )}

      {/* CSS for animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default Eden;
