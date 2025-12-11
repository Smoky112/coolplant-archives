import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import RetroLayout from "@/layouts/RetroLayout";
import RetroPanel from "@/components/RetroPanel";
import RetroButton from "@/components/RetroButton";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Camera, DoorClosed, DoorOpen, Zap, AlertTriangle, Monitor, Volume2, VolumeX } from "lucide-react";

type CameraView = "CAM-A" | "CAM-B" | "CAM-C" | "CAM-D" | "SERVER";
type EntityLocation = "CAM-A" | "CAM-B" | "CAM-C" | "CAM-D" | "LEFT_DOOR" | "RIGHT_DOOR" | "OFFICE";

interface Entity {
  id: string;
  name: string;
  location: EntityLocation;
  aggression: number;
  moveChance: number;
}

const DataCenter = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [hour, setHour] = useState(0); // 0 = 12AM, 1 = 1AM, etc.
  const [power, setPower] = useState(100);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [currentCamera, setCurrentCamera] = useState<CameraView>("CAM-A");
  const [leftDoorClosed, setLeftDoorClosed] = useState(false);
  const [rightDoorClosed, setRightDoorClosed] = useState(false);
  const [leftLight, setLeftLight] = useState(false);
  const [rightLight, setRightLight] = useState(false);
  const [staticEffect, setStaticEffect] = useState(false);
  const [jumpScare, setJumpScare] = useState<string | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  
  // Entities (corrupted server processes)
  const [entities, setEntities] = useState<Entity[]>([
    { id: "CORRUPTED_01", name: "ERR0R.EXE", location: "CAM-A", aggression: 15, moveChance: 0.3 },
    { id: "CORRUPTED_02", name: "MALWARE.SYS", location: "CAM-C", aggression: 12, moveChance: 0.25 },
    { id: "CORRUPTED_03", name: "VIRUS.DAT", location: "CAM-B", aggression: 10, moveChance: 0.2 },
  ]);

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const hourRef = useRef(hour);
  const powerRef = useRef(power);

  // Update refs
  useEffect(() => {
    hourRef.current = hour;
    powerRef.current = power;
  }, [hour, power]);

  // Check if user is authorized
  useEffect(() => {
    if (!user || user.username !== "l.tagliaferri") {
      toast({
        title: "Accesso Negato",
        description: "Solo il CTO può accedere al Data Center.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [user, navigate]);

  // Power drain
  useEffect(() => {
    if (!gameStarted || gameOver || victory) return;
    
    const powerDrain = setInterval(() => {
      let drain = 0.15; // Base drain
      if (cameraOpen) drain += 0.1;
      if (leftDoorClosed) drain += 0.15;
      if (rightDoorClosed) drain += 0.15;
      if (leftLight) drain += 0.08;
      if (rightLight) drain += 0.08;
      
      setPower(prev => {
        const newPower = Math.max(0, prev - drain);
        if (newPower <= 0) {
          triggerGameOver("POWER_OUT");
        }
        return newPower;
      });
    }, 100);

    return () => clearInterval(powerDrain);
  }, [gameStarted, gameOver, victory, cameraOpen, leftDoorClosed, rightDoorClosed, leftLight, rightLight]);

  // Hour progression
  useEffect(() => {
    if (!gameStarted || gameOver || victory) return;
    
    const hourInterval = setInterval(() => {
      setHour(prev => {
        if (prev >= 5) {
          triggerVictory();
          return prev;
        }
        return prev + 1;
      });
    }, 60000); // 1 minute per hour (total 6 minutes for the night)

    return () => clearInterval(hourInterval);
  }, [gameStarted, gameOver, victory]);

  // Entity movement
  useEffect(() => {
    if (!gameStarted || gameOver || victory) return;

    const moveEntities = setInterval(() => {
      setEntities(prev => prev.map(entity => {
        const shouldMove = Math.random() < (entity.moveChance + (hourRef.current * 0.05));
        if (!shouldMove) return entity;

        const movementPath: Record<EntityLocation, EntityLocation[]> = {
          "CAM-A": ["CAM-B", "CAM-D"],
          "CAM-B": ["CAM-C", "LEFT_DOOR"],
          "CAM-C": ["CAM-D", "RIGHT_DOOR"],
          "CAM-D": ["CAM-A", "CAM-B", "CAM-C"],
          "LEFT_DOOR": ["OFFICE"],
          "RIGHT_DOOR": ["OFFICE"],
          "OFFICE": ["OFFICE"],
        };

        const possibleMoves = movementPath[entity.location];
        let newLocation = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

        // Block if door is closed
        if (newLocation === "OFFICE") {
          if (entity.location === "LEFT_DOOR" && leftDoorClosed) {
            newLocation = "CAM-B"; // Go back
          } else if (entity.location === "RIGHT_DOOR" && rightDoorClosed) {
            newLocation = "CAM-C"; // Go back
          } else {
            // Attack!
            triggerGameOver(entity.name);
            return entity;
          }
        }

        return { ...entity, location: newLocation };
      }));
    }, 4000);

    return () => clearInterval(moveEntities);
  }, [gameStarted, gameOver, victory, leftDoorClosed, rightDoorClosed]);

  const triggerGameOver = useCallback((reason: string) => {
    setGameOver(true);
    setJumpScare(reason);
    setTimeout(() => setJumpScare(null), 2000);
  }, []);

  const triggerVictory = useCallback(() => {
    setVictory(true);
    localStorage.setItem("coolplant_server_farm_restored", "true");
    toast({
      title: "🎉 Server Farm Ripristinato!",
      description: "Hai sopravvissuto alla notte e riavviato i sistemi!",
    });
  }, []);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setVictory(false);
    setHour(0);
    setPower(100);
    setCameraOpen(false);
    setLeftDoorClosed(false);
    setRightDoorClosed(false);
    setEntities([
      { id: "CORRUPTED_01", name: "ERR0R.EXE", location: "CAM-A", aggression: 15, moveChance: 0.35 },
      { id: "CORRUPTED_02", name: "MALWARE.SYS", location: "CAM-C", aggression: 12, moveChance: 0.3 },
      { id: "CORRUPTED_03", name: "VIRUS.DAT", location: "CAM-B", aggression: 10, moveChance: 0.25 },
    ]);
  };

  const getHourDisplay = () => {
    if (hour === 0) return "12 AM";
    return `${hour} AM`;
  };

  const getCameraContent = () => {
    const entitiesInCamera = entities.filter(e => e.location === currentCamera);
    
    return (
      <div className="relative h-48 bg-[hsl(220,30%,5%)] border-2 border-[hsl(120,50%,30%)] overflow-hidden">
        {/* Static effect */}
        {staticEffect && (
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMyIvPjwvc3ZnPg==')] opacity-50 animate-pulse" />
        )}
        
        {/* Camera header */}
        <div className="absolute top-2 left-2 text-[hsl(120,100%,50%)] text-[10px] font-mono">
          {currentCamera} | {new Date().toLocaleTimeString()}
        </div>
        <div className="absolute top-2 right-2 text-[hsl(0,100%,50%)] text-[10px] font-mono animate-pulse">
          ● REC
        </div>

        {/* Camera view content */}
        <div className="flex items-center justify-center h-full">
          {currentCamera === "SERVER" ? (
            <div className="text-center">
              <div className="text-[hsl(120,100%,50%)] text-[10px] font-mono mb-2">
                === SERVER FARM STATUS ===
              </div>
              <div className="grid grid-cols-3 gap-1">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className={`w-8 h-6 border ${Math.random() > 0.5 ? 'border-[hsl(0,100%,50%)] bg-[hsl(0,100%,20%)]' : 'border-[hsl(120,100%,50%)] bg-[hsl(120,100%,10%)]'}`}>
                    <div className="text-[6px] text-center">SRV{i}</div>
                  </div>
                ))}
              </div>
              <div className="text-[hsl(var(--status-warning))] text-[8px] mt-2 animate-pulse">
                RIAVVIO RICHIESTO - SOPRAVVIVI FINO ALLE 6 AM
              </div>
            </div>
          ) : (
            <div className="text-center">
              {entitiesInCamera.length > 0 ? (
                <div className="space-y-2">
                  {entitiesInCamera.map(entity => (
                    <div key={entity.id} className="text-[hsl(0,100%,50%)] animate-pulse">
                      <div className="text-2xl glitch-text">👁️</div>
                      <div className="text-[10px] font-mono">{entity.name}</div>
                      <div className="text-[8px]">DETECTED</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-[hsl(120,100%,30%)] text-[10px] font-mono">
                  [ AREA CLEAR ]
                </div>
              )}
            </div>
          )}
        </div>

        {/* Scan lines effect */}
        <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,0,0.03)_2px,rgba(0,255,0,0.03)_4px)]" />
      </div>
    );
  };

  const checkDoor = (side: "left" | "right") => {
    const doorLocation = side === "left" ? "LEFT_DOOR" : "RIGHT_DOOR";
    const entityAtDoor = entities.find(e => e.location === doorLocation);
    return entityAtDoor;
  };

  // Jumpscare overlay
  if (jumpScare) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="text-8xl mb-4 animate-bounce">💀</div>
          <div className="text-[hsl(0,100%,50%)] text-4xl font-mono glitch-text">
            {jumpScare === "POWER_OUT" ? "POWER FAILURE" : jumpScare}
          </div>
          <div className="text-[hsl(0,100%,50%)] text-xl mt-4">
            IT'S ME.
          </div>
        </div>
      </div>
    );
  }

  // Victory screen
  if (victory) {
    return (
      <RetroLayout>
        <div className="max-w-2xl mx-auto text-center">
          <RetroPanel header="🎉 NOTTE SUPERATA - 6:00 AM">
            <div className="py-8">
              <div className="text-6xl mb-4">🌅</div>
              <h2 className="text-xl font-bold mb-4 text-[hsl(120,100%,50%)]">
                HAI SOPRAVVISSUTO!
              </h2>
              <p className="text-[11px] mb-4">
                I sistemi corrotti sono stati contenuti durante la notte.<br/>
                Il Server Farm è stato riavviato con successo.
              </p>
              <div className="retro-panel-inset p-4 mb-4">
                <p className="text-[10px] font-mono text-[hsl(120,100%,50%)]">
                  SERVER_FARM_STATUS: ONLINE<br/>
                  CORRUPTED_PROCESSES: TERMINATED<br/>
                  SYSTEM_INTEGRITY: RESTORED
                </p>
              </div>
              <p className="text-[9px] italic text-muted-foreground mb-4">
                "You survived. But they'll be back..."
              </p>
              <RetroButton onClick={() => navigate("/")}>
                Torna alla Home
              </RetroButton>
            </div>
          </RetroPanel>
        </div>
      </RetroLayout>
    );
  }

  // Game over screen
  if (gameOver) {
    return (
      <RetroLayout>
        <div className="max-w-2xl mx-auto text-center">
          <RetroPanel header="💀 GAME OVER">
            <div className="py-8">
              <div className="text-6xl mb-4 animate-pulse">☠️</div>
              <h2 className="text-xl font-bold mb-4 text-destructive">
                SEI STATO CATTURATO
              </h2>
              <p className="text-[11px] mb-4 text-muted-foreground">
                I processi corrotti hanno preso il controllo.<br/>
                Il Server Farm rimane offline.
              </p>
              <p className="text-[10px] italic mb-4">
                "I always come back..." - ERR0R.EXE
              </p>
              <div className="flex gap-2 justify-center">
                <RetroButton onClick={startGame}>
                  Riprova
                </RetroButton>
                <RetroButton onClick={() => navigate("/")}>
                  Esci
                </RetroButton>
              </div>
            </div>
          </RetroPanel>
        </div>
      </RetroLayout>
    );
  }

  // Start screen
  if (!gameStarted) {
    return (
      <RetroLayout>
        <div className="max-w-2xl mx-auto">
          <RetroPanel header="🔒 DATA CENTER - Piano -1">
            <div className="text-center py-6">
              <div className="text-4xl mb-4">🖥️</div>
              <h2 className="text-lg font-bold mb-4">NOTTE FINALE</h2>
              
              <div className="retro-panel-inset p-4 mb-4 text-left">
                <p className="text-[11px] font-bold mb-2 text-primary">BRIEFING:</p>
                <p className="text-[10px] mb-3">
                  I server sono stati infettati da processi corrotti che si muovono nel Data Center.
                  Devi sopravvivere fino alle 6:00 AM per completare il riavvio dei sistemi.
                </p>
                
                <p className="text-[10px] font-bold mb-1 text-[hsl(var(--status-warning))]">ISTRUZIONI:</p>
                <ul className="text-[9px] space-y-1 text-muted-foreground">
                  <li>• <strong>TELECAMERE:</strong> Monitora i movimenti dei processi corrotti</li>
                  <li>• <strong>PORTE:</strong> Chiudi le porte per bloccare le minacce</li>
                  <li>• <strong>LUCI:</strong> Illumina i corridoi per vedere chi c'è</li>
                  <li>• <strong>ENERGIA:</strong> Tutto consuma energia. Se finisce, sei vulnerabile.</li>
                </ul>
                
                <p className="text-[9px] mt-3 text-destructive italic">
                  ⚠️ DIFFICOLTÀ: ESTREMA - Notte 5/5
                </p>
              </div>

              <div className="text-[9px] text-muted-foreground/60 mb-4 italic">
                "They're always watching. Always waiting."
              </div>

              <RetroButton onClick={startGame} className="px-8">
                INIZIA TURNO NOTTURNO
              </RetroButton>
            </div>
          </RetroPanel>
        </div>
      </RetroLayout>
    );
  }

  // Main game screen
  return (
    <RetroLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header with time and power */}
        <div className="flex justify-between items-center mb-2 px-2">
          <div className="text-[11px] font-mono">
            <span className="text-muted-foreground">NOTTE 5 |</span>{" "}
            <span className="text-xl font-bold">{getHourDisplay()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className={`w-4 h-4 ${power < 20 ? 'text-destructive animate-pulse' : 'text-[hsl(var(--status-warning))]'}`} />
            <div className="w-24 h-3 bg-muted border border-border">
              <div 
                className={`h-full transition-all ${power < 20 ? 'bg-destructive' : power < 50 ? 'bg-[hsl(var(--status-warning))]' : 'bg-[hsl(120,100%,40%)]'}`}
                style={{ width: `${power}%` }}
              />
            </div>
            <span className="text-[10px] font-mono w-8">{Math.floor(power)}%</span>
          </div>
          <button 
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="p-1 hover:bg-muted rounded"
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

        <div className="grid grid-cols-12 gap-2">
          {/* Left door controls */}
          <div className="col-span-2">
            <RetroPanel header="◄ PORTA SX" className="h-full">
              <div className="space-y-2">
                <RetroButton 
                  size="sm" 
                  className="w-full text-[9px]"
                  onClick={() => setLeftDoorClosed(!leftDoorClosed)}
                >
                  {leftDoorClosed ? <DoorClosed className="w-4 h-4" /> : <DoorOpen className="w-4 h-4" />}
                </RetroButton>
                <RetroButton 
                  size="sm" 
                  className="w-full text-[9px]"
                  onMouseDown={() => setLeftLight(true)}
                  onMouseUp={() => setLeftLight(false)}
                  onMouseLeave={() => setLeftLight(false)}
                >
                  💡 LUCE
                </RetroButton>
                {leftLight && (
                  <div className="text-[9px] text-center animate-pulse">
                    {checkDoor("left") ? (
                      <span className="text-destructive font-bold">⚠️ {checkDoor("left")?.name}</span>
                    ) : (
                      <span className="text-[hsl(120,100%,50%)]">CLEAR</span>
                    )}
                  </div>
                )}
                <div className={`text-[8px] text-center ${leftDoorClosed ? 'text-[hsl(120,100%,50%)]' : 'text-muted-foreground'}`}>
                  {leftDoorClosed ? "CHIUSA" : "APERTA"}
                </div>
              </div>
            </RetroPanel>
          </div>

          {/* Main view / Camera */}
          <div className="col-span-8">
            {cameraOpen ? (
              <RetroPanel header={`📹 SISTEMA TELECAMERE - ${currentCamera}`}>
                {getCameraContent()}
                
                {/* Camera buttons */}
                <div className="grid grid-cols-5 gap-1 mt-2">
                  {(["CAM-A", "CAM-B", "CAM-C", "CAM-D", "SERVER"] as CameraView[]).map(cam => (
                    <RetroButton
                      key={cam}
                      size="sm"
                      className={`text-[8px] ${currentCamera === cam ? 'bg-primary text-primary-foreground' : ''}`}
                      onClick={() => {
                        setStaticEffect(true);
                        setTimeout(() => setStaticEffect(false), 200);
                        setCurrentCamera(cam);
                      }}
                    >
                      {cam}
                    </RetroButton>
                  ))}
                </div>
                
                <RetroButton 
                  className="w-full mt-2" 
                  size="sm"
                  onClick={() => setCameraOpen(false)}
                >
                  CHIUDI TELECAMERE
                </RetroButton>
              </RetroPanel>
            ) : (
              <RetroPanel header="🖥️ UFFICIO DATA CENTER">
                <div className="h-48 bg-[hsl(220,20%,8%)] border-2 border-border flex items-center justify-center relative overflow-hidden">
                  {/* Office view */}
                  <div className="text-center">
                    <div className="text-4xl mb-2">🖥️</div>
                    <p className="text-[10px] text-muted-foreground">
                      Stai monitorando il riavvio dei server...
                    </p>
                    <p className="text-[9px] text-primary font-mono mt-2">
                      REBOOT PROGRESS: {Math.min(99, Math.floor((hour / 5) * 100))}%
                    </p>
                  </div>
                  
                  {/* Ambient warning */}
                  {entities.some(e => e.location === "LEFT_DOOR" || e.location === "RIGHT_DOOR") && (
                    <div className="absolute bottom-2 left-0 right-0 text-center">
                      <span className="text-[9px] text-destructive animate-pulse font-bold">
                        ⚠️ MOVIMENTO RILEVATO NELLE VICINANZE
                      </span>
                    </div>
                  )}
                </div>
                
                <RetroButton 
                  className="w-full mt-2" 
                  onClick={() => setCameraOpen(true)}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  APRI TELECAMERE
                </RetroButton>
              </RetroPanel>
            )}
          </div>

          {/* Right door controls */}
          <div className="col-span-2">
            <RetroPanel header="PORTA DX ►" className="h-full">
              <div className="space-y-2">
                <RetroButton 
                  size="sm" 
                  className="w-full text-[9px]"
                  onClick={() => setRightDoorClosed(!rightDoorClosed)}
                >
                  {rightDoorClosed ? <DoorClosed className="w-4 h-4" /> : <DoorOpen className="w-4 h-4" />}
                </RetroButton>
                <RetroButton 
                  size="sm" 
                  className="w-full text-[9px]"
                  onMouseDown={() => setRightLight(true)}
                  onMouseUp={() => setRightLight(false)}
                  onMouseLeave={() => setRightLight(false)}
                >
                  💡 LUCE
                </RetroButton>
                {rightLight && (
                  <div className="text-[9px] text-center animate-pulse">
                    {checkDoor("right") ? (
                      <span className="text-destructive font-bold">⚠️ {checkDoor("right")?.name}</span>
                    ) : (
                      <span className="text-[hsl(120,100%,50%)]">CLEAR</span>
                    )}
                  </div>
                )}
                <div className={`text-[8px] text-center ${rightDoorClosed ? 'text-[hsl(120,100%,50%)]' : 'text-muted-foreground'}`}>
                  {rightDoorClosed ? "CHIUSA" : "APERTA"}
                </div>
              </div>
            </RetroPanel>
          </div>
        </div>

        {/* Entity tracker (debug/hint) */}
        <div className="mt-2">
          <RetroPanel header="📊 THREAT DETECTION SYSTEM" variant="inset">
            <div className="flex justify-around text-[9px]">
              {entities.map(entity => (
                <div key={entity.id} className="text-center">
                  <div className={`font-mono ${
                    entity.location === "LEFT_DOOR" || entity.location === "RIGHT_DOOR" 
                      ? "text-destructive animate-pulse font-bold" 
                      : entity.location === "OFFICE" 
                        ? "text-destructive" 
                        : "text-[hsl(var(--status-warning))]"
                  }`}>
                    {entity.name}
                  </div>
                  <div className="text-muted-foreground">
                    {entity.location.replace("_", " ")}
                  </div>
                </div>
              ))}
            </div>
          </RetroPanel>
        </div>

        {/* Tips */}
        <div className="mt-2 text-center text-[8px] text-muted-foreground/50">
          "They're not gone. They're just... waiting." | Tieni premuto LUCE per vedere | Chiudi le porte per bloccare
        </div>
      </div>
    </RetroLayout>
  );
};

export default DataCenter;