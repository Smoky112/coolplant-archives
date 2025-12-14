import { useState } from 'react';

// IMPORTANTE: Assicurati che questi file esistano in queste posizioni o spostateli in public/
// Se usi Vite/CreateReactApp, le immagini in src devono essere importate.
// Se hai problemi di path, sposta i file in /public/img/ e usa stringhe semplici.
import sourceImage from '../File audio/img/Imagine_Uffico_sangue.jpeg'; 
import audioFile from '../File audio/img/Audio_Ufficio_sangue_spettrogramma.bmp.wav';

interface ImageAnalyzerProps {
  onSuccess: () => void;
}

export const ImageAnalyzer = ({ onSuccess }: ImageAnalyzerProps) => {
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturate: 100,
    invert: 0
  });
  
  const [inputCode, setInputCode] = useState('');
  const [showDownload, setShowDownload] = useState(false);

  // Logica "Sweet Spot": il codice si vede solo con questi parametri
  // Contrasto Alto (>150), Luminosità Bassa (<80), Inversione Alta (>80)
  const isRevealed = 
    filters.contrast > 150 && 
    filters.brightness < 80 &&
    filters.invert > 80;

  const handleSlider = (name: string, val: number) => {
    setFilters(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = () => {
    if (inputCode === '7382') {
      setShowDownload(true);
    }
  };

  if (showDownload) {
    return (
      <div className="retro-panel-inset p-8 flex flex-col items-center justify-center space-y-6 bg-black">
        <div className="text-green-500 text-lg font-mono animate-pulse">
          ✓ SEQUENZA DECIFRATA
        </div>
        <div className="text-xs text-gray-400 font-mono text-center max-w-sm">
          Il sistema ha isolato un artefatto audio nascosto nei metadata dell'immagine.
        </div>
        
        <div className="p-6 border border-green-800 bg-green-900/10 rounded flex flex-col items-center gap-4 w-full max-w-sm">
          <span className="text-4xl">🔊</span>
          <span className="font-mono text-xs text-green-300">Audio_Ufficio_sangue_spettrogramma.bmp.wav</span>
          
          <a 
            href={audioFile}
            download="EVIDENCE_AUDIO.wav"
            onClick={() => setTimeout(onSuccess, 3000)}
            className="retro-button w-full flex justify-center items-center gap-2 text-xs"
          >
            💾 ESTRAI FILE AUDIO
          </a>
        </div>
        <div className="text-[10px] text-red-400 font-mono mt-4">
          NOTA: Analizzare lo spettrogramma del file audio per procedere.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Viewer */}
        <div className="flex-1 relative border border-green-900 bg-black h-[300px] overflow-hidden group">
          {/* Immagine Base */}
          <img 
            src={sourceImage}
            alt="Evidence" 
            className="w-full h-full object-contain transition-all duration-200"
            style={{
              filter: `
                brightness(${filters.brightness}%) 
                contrast(${filters.contrast}%) 
                saturate(${filters.saturate}%)
                invert(${filters.invert}%)
              `
            }}
          />

          {/* Layer Codice Nascosto (Steganografia simulata) */}
          <div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-difference"
            style={{
              opacity: isRevealed ? 0.9 : 0,
              transition: 'opacity 0.3s ease'
            }}
          >
            <span className="text-6xl font-mono font-bold text-white tracking-[1rem] blur-[1px]">
              7382
            </span>
          </div>

          {/* Overlay Noise */}
          <div className="absolute inset-0 bg-repeat opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,...")' }}></div>
        </div>

        {/* Controls */}
        <div className="w-full md:w-48 space-y-4 bg-[#050505] p-4 border border-green-900/50">
          <h3 className="text-xs font-mono text-green-500 mb-2 border-b border-green-900 pb-1">FILTRI IMMAGINE</h3>
          
          {[
            { id: 'brightness', label: 'LUMINOSITÀ', max: 200 },
            { id: 'contrast', label: 'CONTRASTO', max: 200 },
            { id: 'saturate', label: 'SATURAZIONE', max: 200 },
            { id: 'invert', label: 'INVERSIONE', max: 100 },
          ].map(ctrl => (
            <div key={ctrl.id} className="space-y-1">
              <div className="flex justify-between text-[9px] font-mono text-gray-400">
                <span>{ctrl.label}</span>
                <span>{filters[ctrl.id as keyof typeof filters]}%</span>
              </div>
              <input 
                type="range" 
                min="0" max={ctrl.max} 
                value={filters[ctrl.id as keyof typeof filters]}
                onChange={(e) => handleSlider(ctrl.id, Number(e.target.value))}
                className="w-full h-1 bg-gray-800 rounded-none appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-green-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="flex items-end gap-2 border-t border-green-900/30 pt-4">
        <div className="flex-1">
          <label className="text-[10px] font-mono text-green-600 block mb-1">CODICE RILEVATO:</label>
          <input 
            type="text" 
            maxLength={4}
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="_ _ _ _"
            className="w-full bg-black border border-green-700 text-green-400 font-mono text-xl p-2 tracking-widest text-center focus:outline-none focus:border-green-400"
          />
        </div>
        <button 
          onClick={handleSubmit}
          className="retro-button h-[46px] px-6 text-xs"
        >
          DECODIFICA
        </button>
      </div>
      
      {isRevealed && (
        <div className="text-[10px] text-green-400 text-center animate-pulse font-mono">
          [!] LIVELLO STEGANOGRAFICO RILEVATO
        </div>
      )}
    </div>
  );
};
