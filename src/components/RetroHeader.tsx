import { Link, useLocation } from "react-router-dom";
import { Shield, Lock, Database, Server } from "lucide-react";

const RetroHeader = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/servizi", label: "Cosa Facciamo" },
    { path: "/news", label: "News" },
    { path: "/contatti", label: "Contattaci" },
    { path: "/login", label: "Area Riservata" },
  ];

  return (
    <header className="w-full">
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
      <div className="retro-marquee overflow-hidden">
        <div className="animate-marquee whitespace-nowrap inline-block">
          ★ NUOVA CERTIFICAZIONE ISO 27001 CONSEGUITA ★ APERTURA NUOVO DATA CENTER TIER IV ★ 
          PARTNERSHIP CON LEADING SECURITY VENDORS ★ SOC OPERATIVO 24/7/365 ★ 
          COMPLIANCE GDPR/NIS2 GARANTITA ★ THREAT DETECTION AI-POWERED ★
        </div>
      </div>
    </header>
  );
};

export default RetroHeader;
