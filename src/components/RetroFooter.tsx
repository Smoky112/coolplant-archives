import { Mail, Phone, MapPin, Globe } from "lucide-react";

const RetroFooter = () => {
  const currentYear = 2001; // Frozen in time

  return (
    <footer className="w-full mt-auto">
      {/* Main footer content */}
      <div className="retro-panel">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px]">
          {/* Company Info */}
          <div>
            <div className="retro-header mb-2">Informazioni Azienda</div>
            <div className="space-y-1 p-2">
              <p><strong>CoolPlant Corporation S.p.A.</strong></p>
              <p>P.IVA: IT03456789012</p>
              <p>REA: BS-123456</p>
              <p>Cap. Soc.: €5.000.000 i.v.</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="retro-header mb-2">Contatti</div>
            <div className="space-y-1 p-2">
              <p className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Via Torre Alta, 15 - 25121 Brescia (BS)
              </p>
              <p className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                +39 030 555 1234
              </p>
              <p className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                info@coolplant.it
              </p>
              <p className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                www.coolplant.it
              </p>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="retro-header mb-2">Certificazioni</div>
            <div className="space-y-1 p-2">
              <p>✓ ISO 27001:2000</p>
              <p>✓ BS 7799-2:2002</p>
              <p>✓ Microsoft Gold Partner</p>
              <p>✓ Cisco Security Partner</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="retro-statusbar flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span>© {currentYear} CoolPlant Corporation. Tutti i diritti riservati.</span>
          <span className="text-muted-foreground">|</span>
          <a href="#" className="hover:text-primary">Privacy Policy</a>
          <span className="text-muted-foreground">|</span>
          <a href="#" className="hover:text-primary">Termini di Servizio</a>
        </div>
        <div className="flex items-center gap-2">
          <span>Visitatori:</span>
          <span className="hit-counter">0024857</span>
          <span className="text-muted-foreground">|</span>
          <span>Ottimizzato per Internet Explorer 5.5+</span>
          <span className="text-muted-foreground">|</span>
          <span>800x600</span>
        </div>
      </div>
    </footer>
  );
};

export default RetroFooter;
