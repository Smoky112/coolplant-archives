import { useState } from 'react';

interface ImageAnalyzerProps {
  onSuccess: () => void;
}

const IMAGES = [
  {
    id: 1,
    hiddenCode: '7',
    hint: 'Aumenta il contrasto per vedere il primo numero',
    baseFilter: 'brightness(0.3) contrast(0.5)',
  },
  {
    id: 2,
    hiddenCode: '3',
    hint: 'Riduci la luminosità e aumenta la saturazione',
    baseFilter: 'brightness(1.5) saturate(0.2)',
  },
  {
    id: 3,
    hiddenCode: '8',
    hint: 'Inverti i colori mentalmente - contrasto massimo',
    baseFilter: 'brightness(0.8) contrast(0.3) saturate(2)',
  },
  {
    id: 4,
    hiddenCode: '2',
    hint: 'Il numero è nascosto nel rumore - aumenta tutto',
    baseFilter: 'brightness(0.5) contrast(0.4)',
  },
  {
    id: 5,
    hiddenCode: 'SPETTROGRAMMA',
    hint: 'Scarica e analizza con un tool audio esterno...',
    baseFilter: 'brightness(1) contrast(1)',
    isDownloadable: true,
  },
];

export const ImageAnalyzer = ({ onSuccess }: ImageAnalyzerProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [foundCodes, setFoundCodes] = useState<string[]>([]);
  const [inputCode, setInputCode] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const currentImage = IMAGES[selectedImage];
  const filterStyle = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%)`;
  
  const FINAL_CODE = '7382';

  const handleCodeSubmit = () => {
    if (inputCode.toUpperCase() === FINAL_CODE) {
      setShowSuccess(true);
      setTimeout(() => onSuccess(), 2000);
    }
  };

  const handleFoundCode = (code: string) => {
    if (!foundCodes.includes(code)) {
      setFoundCodes([...foundCodes, code]);
    }
  };

  const generateNoisePattern = (id: number) => {
    const patterns: Record<number, JSX.Element> = {
      1: (
        <svg viewBox="0 0 200 150" className="w-full h-full">
          <rect width="200" height="150" fill="#111" />
          {[...Array(100)].map((_, i) => (
            <rect
              key={i}
              x={Math.random() * 200}
              y={Math.random() * 150}
              width={2 + Math.random() * 4}
              height={2 + Math.random() * 4}
              fill={`rgba(${Math.random() * 50}, ${Math.random() * 100}, ${Math.random() * 50}, ${Math.random()})`}
            />
          ))}
          <text x="100" y="80" textAnchor="middle" fill="#1a1a1a" fontSize="60" fontFamily="monospace">7</text>
        </svg>
      ),
      2: (
        <svg viewBox="0 0 200 150" className="w-full h-full">
          <rect width="200" height="150" fill="#fff" />
          {[...Array(80)].map((_, i) => (
            <line
              key={i}
              x1={Math.random() * 200}
              y1={Math.random() * 150}
              x2={Math.random() * 200}
              y2={Math.random() * 150}
              stroke={`rgba(200, 200, 200, ${Math.random()})`}
              strokeWidth={1}
            />
          ))}
          <text x="100" y="85" textAnchor="middle" fill="#fafafa" fontSize="55" fontFamily="monospace">3</text>
        </svg>
      ),
      3: (
        <svg viewBox="0 0 200 150" className="w-full h-full">
          <rect width="200" height="150" fill="#0a0a0a" />
          {[...Array(150)].map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * 200}
              cy={Math.random() * 150}
              r={1 + Math.random() * 3}
              fill={`hsl(${120 + Math.random() * 60}, 100%, ${20 + Math.random() * 30}%)`}
            />
          ))}
          <text x="100" y="85" textAnchor="middle" fill="#0f0f0f" fontSize="50" fontFamily="monospace">8</text>
        </svg>
      ),
      4: (
        <svg viewBox="0 0 200 150" className="w-full h-full">
          <rect width="200" height="150" fill="#1a1a1a" />
          {[...Array(200)].map((_, i) => (
            <rect
              key={i}
              x={Math.random() * 200}
              y={Math.random() * 150}
              width={1}
              height={1}
              fill={Math.random() > 0.5 ? '#222' : '#111'}
            />
          ))}
          <text x="100" y="85" textAnchor="middle" fill="#1f1f1f" fontSize="55" fontFamily="monospace">2</text>
        </svg>
      ),
      5: (
        <svg viewBox="0 0 200 150" className="w-full h-full">
          <rect width="200" height="150" fill="#000" />
          {[...Array(200)].map((_, i) => (
            <rect
              key={i}
              x={(i % 40) * 5}
              y={0}
              width={3}
              height={20 + Math.sin(i * 0.3) * 50 + Math.random() * 30}
              fill={`hsl(${280 + Math.random() * 40}, 70%, ${30 + Math.random() * 30}%)`}
            />
          ))}
          <text x="100" y="130" textAnchor="middle" fill="#333" fontSize="12" fontFamily="monospace">
            AUDIO_SPETTROGRAMMA.wav
          </text>
        </svg>
      ),
    };
    return patterns[id];
  };

  if (showSuccess) {
    return (
      <div className="font-mono text-center p-8">
        <div className="text-green-400 text-2xl animate-pulse mb-4">
          ✓ CODICE ACCETTATO
        </div>
        <div className="text-green-300">Sequenza decrittata: {FINAL_CODE}</div>
        <div className="text-xs text-green-600 mt-4">Accesso al livello successivo...</div>
      </div>
    );
  }

  return (
    <div className="font-mono">
      <div className="border-2 border-green-500/70 bg-black/95 p-4 text-green-400">
        {/* Header */}
        <div className="border-b border-green-500/50 pb-2 mb-4">
          <div className="text-center">╔══ IMAGE CODE ANALYZER v2.1 ══╗</div>
          <div className="text-center text-sm text-yellow-400 mt-1">
            Analizza le immagini per trovare i codici nascosti
          </div>
        </div>

        {/* Image tabs */}
        <div className="flex gap-2 mb-4">
          {IMAGES.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => {
                setSelectedImage(idx);
                setBrightness(100);
                setContrast(100);
                setSaturate(100);
              }}
              className={`
                px-3 py-1 border text-sm transition-all
                ${selectedImage === idx 
                  ? 'border-green-400 bg-green-500/20 text-green-300' 
                  : 'border-green-500/50 hover:border-green-400'}
                ${foundCodes.includes(img.hiddenCode) ? 'text-green-400' : ''}
              `}
            >
              IMG-{img.id} {foundCodes.includes(img.hiddenCode) && '✓'}
            </button>
          ))}
        </div>

        {/* Image display */}
        <div className="border border-green-500/50 bg-black p-2 mb-4">
          <div 
            className="w-full h-48 flex items-center justify-center overflow-hidden"
            style={{ filter: filterStyle }}
          >
            {generateNoisePattern(currentImage.id)}
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-xs text-green-600 block mb-1">BRIGHTNESS</label>
            <input
              type="range"
              min="0"
              max="300"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full accent-green-500"
            />
            <span className="text-xs">{brightness}%</span>
          </div>
          <div>
            <label className="text-xs text-green-600 block mb-1">CONTRAST</label>
            <input
              type="range"
              min="0"
              max="300"
              value={contrast}
              onChange={(e) => setContrast(Number(e.target.value))}
              className="w-full accent-green-500"
            />
            <span className="text-xs">{contrast}%</span>
          </div>
          <div>
            <label className="text-xs text-green-600 block mb-1">SATURATE</label>
            <input
              type="range"
              min="0"
              max="300"
              value={saturate}
              onChange={(e) => setSaturate(Number(e.target.value))}
              className="w-full accent-green-500"
            />
            <span className="text-xs">{saturate}%</span>
          </div>
        </div>

        {/* Hint */}
        <div className="text-xs text-yellow-600 mb-4 p-2 border border-yellow-500/30">
          💡 HINT: {currentImage.hint}
        </div>

        {/* Download button for image 5 */}
        {currentImage.isDownloadable && (
          <div className="mb-4">
            <a
              href="/src/components/File audio/img/Audio_Ufficio_sangue_spettrogramma.bmp.wav"
              download="EDEN_AUDIO_FRAGMENT.wav"
              className="retro-button inline-block text-sm"
            >
              📥 DOWNLOAD FILE AUDIO
            </a>
            <div className="text-xs text-red-400 mt-1">
              ⚠️ Richiede analisi esterna (spettrogramma audio)
            </div>
          </div>
        )}

        {/* Code marking */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Codice trovato..."
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            className="flex-1 bg-black border border-green-500/50 text-green-400 px-2 py-1 text-sm font-mono"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCodeSubmit();
            }}
          />
          <button
            onClick={() => {
              if (inputCode && !foundCodes.includes(inputCode)) {
                handleFoundCode(inputCode);
              }
            }}
            className="retro-button text-sm px-3"
          >
            MARK
          </button>
          <button
            onClick={handleCodeSubmit}
            className="retro-button text-sm px-3"
          >
            SUBMIT
          </button>
        </div>

        {/* Found codes */}
        <div className="border-t border-green-500/50 pt-2">
          <div className="text-xs text-green-600 mb-1">CODICI TROVATI:</div>
          <div className="flex gap-2 flex-wrap">
            {foundCodes.length === 0 ? (
              <span className="text-xs text-gray-500">Nessun codice registrato</span>
            ) : (
              foundCodes.map((code, idx) => (
                <span key={idx} className="px-2 py-1 bg-green-500/20 border border-green-500/50 text-xs">
                  {code}
                </span>
              ))
            )}
          </div>
          <div className="text-xs text-yellow-600 mt-2">
            Inserisci la sequenza completa dei 4 numeri per procedere
          </div>
        </div>
      </div>
    </div>
  );
};
