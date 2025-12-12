import { useState, useEffect } from 'react';

interface CrosswordPuzzleProps {
  onSuccess: () => void;
}

interface ClueData {
  number: number;
  direction: 'across' | 'down';
  clue: string;
  answer: string;
  row: number;
  col: number;
}

const CLUES: ClueData[] = [
  // Across
  { number: 1, direction: 'across', clue: "Il boss finale di Elden Ring, dio del caos", answer: "RADAGON", row: 0, col: 0 },
  { number: 3, direction: 'across', clue: "L'animatronic principale di FNAF 1 (cognome)", answer: "FAZBEAR", row: 2, col: 1 },
  { number: 5, direction: 'across', clue: "Il luogo maledetto dove combatti Malenia", answer: "HALIGTREE", row: 4, col: 0 },
  { number: 7, direction: 'across', clue: "Purple ___ - l'assassino di FNAF", answer: "GUY", row: 6, col: 3 },
  { number: 9, direction: 'across', clue: "La spada leggendaria della Rot Goddess", answer: "MIQUELLAS", row: 8, col: 0 },
  
  // Down
  { number: 2, direction: 'down', clue: "Il primo figlio di Marika a cadere", answer: "GODWYN", row: 0, col: 3 },
  { number: 4, direction: 'down', clue: "___ Trap - la trappola mortale di Afton", answer: "SPRING", row: 1, col: 6 },
  { number: 6, direction: 'down', clue: "Il signore dei giganti di fuoco", answer: "FIRE", row: 3, col: 1 },
  { number: 8, direction: 'down', clue: "La guardia notturna sacrificata (FNAF 3)", answer: "FAZBEAR", row: 5, col: 4 },
];

const GRID_SIZE = 10;
const FINAL_PASSWORD = "TARNISHED";

export const CrosswordPuzzle = ({ onSuccess }: CrosswordPuzzleProps) => {
  const [grid, setGrid] = useState<string[][]>(() => 
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''))
  );
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Create grid layout
  const gridLayout = Array(GRID_SIZE).fill(null).map(() => 
    Array(GRID_SIZE).fill({ isActive: false, number: null })
  );

  // Mark active cells
  CLUES.forEach(clue => {
    for (let i = 0; i < clue.answer.length; i++) {
      const row = clue.direction === 'down' ? clue.row + i : clue.row;
      const col = clue.direction === 'across' ? clue.col + i : clue.col;
      if (row < GRID_SIZE && col < GRID_SIZE) {
        gridLayout[row][col] = { 
          isActive: true, 
          number: i === 0 ? clue.number : gridLayout[row][col].number,
          correctLetter: clue.answer[i]
        };
      }
    }
  });

  const handleCellChange = (row: number, col: number, value: string) => {
    const newGrid = [...grid];
    newGrid[row][col] = value.toUpperCase().slice(0, 1);
    setGrid(newGrid);
  };

  // Check completion
  useEffect(() => {
    let allCorrect = true;
    CLUES.forEach(clue => {
      for (let i = 0; i < clue.answer.length; i++) {
        const row = clue.direction === 'down' ? clue.row + i : clue.row;
        const col = clue.direction === 'across' ? clue.col + i : clue.col;
        if (row < GRID_SIZE && col < GRID_SIZE) {
          if (grid[row][col] !== clue.answer[i]) {
            allCorrect = false;
          }
        }
      }
    });
    
    if (allCorrect && grid.some(row => row.some(cell => cell !== ''))) {
      setIsComplete(true);
      setShowPassword(true);
    }
  }, [grid]);

  const handlePasswordReveal = () => {
    setTimeout(() => onSuccess(), 2000);
  };

  useEffect(() => {
    if (showPassword) {
      handlePasswordReveal();
    }
  }, [showPassword]);

  return (
    <div className="font-mono">
      <div className="border-2 border-green-500/70 bg-black/95 p-4 text-green-400">
        {/* Header */}
        <div className="border-b border-green-500/50 pb-2 mb-4">
          <div className="text-center">╔══ CROSSWORD DECODER v3.0 ══╗</div>
          <div className="text-center text-sm text-yellow-400 mt-1">
            Risolvi il cruciverba per ottenere la password finale
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Grid */}
          <div className="flex-shrink-0">
            <div 
              className="grid gap-0.5 bg-green-900/30 p-1"
              style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
            >
              {gridLayout.map((row, rowIdx) =>
                row.map((cell, colIdx) => (
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    className={`
                      w-7 h-7 relative
                      ${cell.isActive 
                        ? 'bg-black border border-green-500/50' 
                        : 'bg-green-900/50'}
                      ${selectedCell?.row === rowIdx && selectedCell?.col === colIdx 
                        ? 'ring-2 ring-green-400' 
                        : ''}
                    `}
                    onClick={() => cell.isActive && setSelectedCell({row: rowIdx, col: colIdx})}
                  >
                    {cell.number && (
                      <span className="absolute top-0 left-0.5 text-[8px] text-green-600">
                        {cell.number}
                      </span>
                    )}
                    {cell.isActive && (
                      <input
                        type="text"
                        maxLength={1}
                        value={grid[rowIdx][colIdx]}
                        onChange={(e) => handleCellChange(rowIdx, colIdx, e.target.value)}
                        className={`
                          w-full h-full bg-transparent text-center text-sm font-bold uppercase
                          focus:outline-none
                          ${grid[rowIdx][colIdx] === (cell as any).correctLetter 
                            ? 'text-green-400' 
                            : 'text-green-300'}
                        `}
                      />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Clues */}
          <div className="flex-1 text-sm">
            <div className="mb-4">
              <div className="text-green-300 font-bold mb-2 border-b border-green-500/30 pb-1">
                ORIZZONTALI (ACROSS)
              </div>
              {CLUES.filter(c => c.direction === 'across').map(clue => (
                <div key={`a-${clue.number}`} className="mb-1 text-xs">
                  <span className="text-yellow-400">{clue.number}.</span> {clue.clue}
                </div>
              ))}
            </div>
            
            <div>
              <div className="text-green-300 font-bold mb-2 border-b border-green-500/30 pb-1">
                VERTICALI (DOWN)
              </div>
              {CLUES.filter(c => c.direction === 'down').map(clue => (
                <div key={`d-${clue.number}`} className="mb-1 text-xs">
                  <span className="text-yellow-400">{clue.number}.</span> {clue.clue}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Password reveal */}
        {showPassword && (
          <div className="mt-6 text-center border-t border-green-500/50 pt-4">
            <div className="text-green-400 text-xl animate-pulse mb-2">
              ✓ CRUCIVERBA COMPLETATO
            </div>
            <div className="text-yellow-400 text-lg">
              PASSWORD FINALE: <span className="text-green-300 font-bold glitch-text">{FINAL_PASSWORD}</span>
            </div>
            <div className="text-xs text-green-600 mt-2">
              Server EDEN in fase di ripristino...
            </div>
          </div>
        )}

        {/* Hint */}
        {!showPassword && (
          <div className="mt-4 text-xs text-green-600 text-center border-t border-green-500/50 pt-2">
            💡 Tutti i riferimenti sono collegati a Elden Ring e Five Nights at Freddy's
          </div>
        )}
      </div>
    </div>
  );
};
