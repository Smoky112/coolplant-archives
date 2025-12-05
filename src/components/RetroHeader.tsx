import { Link, useLocation } from "react-router-dom";
import { Shield, Lock, Database, Server } from "lucide-react";
import { useState, useEffect } from "react";

const RetroHeader = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/servizi", label: "Cosa Facciamo" },
    { path: "/news", label: "News" },
    { path: "/terminal", label: "Terminal" },
    { path: "/contatti", label: "Contattaci" },
    { path: "/dipendenti", label: "Dipendenti" },
    { path: "/login", label: "Area Riservata" },
  ];

  // Testo normale aziendale
  const normalText = "★ NUOVA CERTIFICAZIONE ISO 27001 CONSEGUITA ★ APERTURA NUOVO DATA CENTER TIER IV ★ PARTNERSHIP CON LEADING SECURITY VENDORS ★ SOC OPERATIVO 24/7/365 ★ COMPLIANCE GDPR/NIS2 GARANTITA ★ THREAT DETECTION AI-POWERED ★";
  
  // Frasi creepy che possono apparire
  const creepyPhrases = [
    "⚠️ LA REALTÀ SALIRÀ A GALLA ⚠️ CHI HA UCCISO IL CEO? ⚠️ ANDATEVENE ⚠️",
    "👁️ VI STIAMO OSSERVANDO 👁️ NESSUN DATO È AL SICURO 👁️ EDEN NON DIMENTICA 👁️",
    "☠️ ERRORE CRITICO DI SISTEMA ☠️ MEMORIA CORROTTA ☠️ SIETE IN PERICOLO? ☠️",
    "🩸 IL SANGUE MACCHIA I SERVER 🩸 LA VERITÀ È NEL CODICE 🩸 NON FIDARTI DI NESSUNO 🩸"
  ];

  const [marqueeText, setMarqueeText] = useState(normalText);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    // Controlla ogni 4 secondi se far partire un glitch
    const interval = setInterval(() => {


    const isGameActive = localStorage.getItem("glitchStated") === "true";

      // Se il gioco NON è attivo, non fare nulla
      if (!isGameActive) return;  

      // 20% di probabilità di glitch, ma solo se non sta già glitchando
      if (!isGlitching && Math.random() < 0.1) {
        triggerGlitch();
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [isGlitching]);

  const triggerGlitch = () => {
    setIsGlitching(true);
    
    // Sceglie una frase creepy a caso
    const randomPhrase = creepyPhrases[Math.floor(Math.random() * creepyPhrases.length)];
    setMarqueeText(randomPhrase);

    // Torna normale dopo 1 secondi
    setTimeout(() => {
      setMarqueeText(normalText);
      setIsGlitching(false);
    }, 1000);
  };

  return (
    <header className="w-full z-20">
      {/* Top gradient bar with company name */}
      <div className="retro-header flex items-center justify-between py-2 px-4">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6" />
          <div>
            <h1 className="text-lg font-bold tracking-wide">CoolPlant Corporation</h1>
            <p className="text-[10px] opacity-80">Data Protection & Security Solutions</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <div className="flex items-center gap-1">
            <Lock className="w-3 h-3" />
            <span>128-bit SSL</span>
          </div>
          <div className="flex items-center gap-1">
            <Database className="w-3 h-3" />
            <span>ISO 27001</span>
          </div>
          <div className="flex items-center gap-1">
            <Server className="w-3 h-3" />
            <span>SOC 24/7</span>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="retro-nav flex items-center px-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`retro-nav-item ${
              location.pathname === item.path
                ? "bg-primary text-primary-foreground"
                : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
        <div className="ml-auto text-[10px] text-muted-foreground px-4">
          Brescia, Italia | Tel: +39 030 555 1234
        </div>
      </nav>

      {/* Marquee news ticker */}
      <div className={`retro-marquee overflow-hidden transition-colors duration-200 ${isGlitching ? 'bg-red-900 text-white font-bold' : ''}`}>
        <div className="animate-marquee whitespace-nowrap inline-block">
          {marqueeText}
        </div>
      </div>
    </header>
  );
};

export default RetroHeader;
