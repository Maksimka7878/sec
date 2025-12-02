import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Brain, Activity, Play, RefreshCw, AlertTriangle, Trophy, Fingerprint, Skull } from 'lucide-react';

// --- Types ---
type NodeState = 'IDLE' | 'ACTIVE' | 'DANGER' | 'GOLDEN';
type GamePhase = 'IDLE' | 'PLAYING' | 'GAMEOVER' | 'VICTORY';

interface GridNode {
  id: number;
  state: NodeState;
}

export const MuscleSimulator: React.FC = () => {
  // --- Configuration ---
  const GRID_SIZE = 9; // 3x3 Grid
  const GAME_DURATION = 30; // Seconds
  const WIN_SCORE = 2500;

  // --- State ---
  const [phase, setPhase] = useState<GamePhase>('IDLE');
  const [nodes, setNodes] = useState<GridNode[]>(Array.from({ length: GRID_SIZE }, (_, i) => ({ id: i, state: 'IDLE' })));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [combo, setCombo] = useState(0);
  const [shake, setShake] = useState(false);
  const [glitch, setGlitch] = useState(false);

  // --- Refs ---
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const spawnerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const difficultyRef = useRef(1000); // Spawn rate in ms

  // --- Game Logic ---

  const startGame = () => {
    setPhase('PLAYING');
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setCombo(0);
    setNodes(Array.from({ length: GRID_SIZE }, (_, i) => ({ id: i, state: 'IDLE' })));
    difficultyRef.current = 1000;
    
    // Start Timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Start Spawner
    spawnLoop();
  };

  const spawnLoop = () => {
    if (phase === 'GAMEOVER' || phase === 'VICTORY') return;

    spawnNode();
    
    // Increase speed based on score
    const speed = Math.max(400, 1000 - (score / 5));
    
    spawnerRef.current = setTimeout(spawnLoop, speed);
  };

  const spawnNode = () => {
    setNodes(prev => {
      // Find idle nodes
      const idleIndices = prev.map((n, i) => n.state === 'IDLE' ? i : -1).filter(i => i !== -1);
      
      if (idleIndices.length === 0) return prev;

      const randomIndex = idleIndices[Math.floor(Math.random() * idleIndices.length)];
      const isDanger = Math.random() > 0.8; // 20% chance of danger
      const isGolden = !isDanger && Math.random() > 0.9; // 10% chance of golden

      const newNodes = [...prev];
      newNodes[randomIndex].state = isDanger ? 'DANGER' : isGolden ? 'GOLDEN' : 'ACTIVE';
      
      // Auto-clear node after time if not clicked
      setTimeout(() => {
        setNodes(current => {
           const target = current[randomIndex];
           if (target.state !== 'IDLE') {
             // Missed an active node? Break combo
             if (target.state === 'ACTIVE' || target.state === 'GOLDEN') {
                 setCombo(0);
             }
             const updated = [...current];
             updated[randomIndex].state = 'IDLE';
             return updated;
           }
           return current;
        });
      }, 1500); // Node lifetime

      return newNodes;
    });
  };

  const handleNodeClick = (index: number) => {
    if (phase !== 'PLAYING') return;

    const node = nodes[index];

    if (node.state === 'ACTIVE') {
      // Good Hit
      const points = 100 + (combo * 10);
      setScore(prev => prev + points);
      setCombo(prev => prev + 1);
      triggerNodeEffect(index, 'IDLE');
      checkWinCondition(score + points);

    } else if (node.state === 'GOLDEN') {
      // Super Hit
      const points = 300 + (combo * 20);
      setScore(prev => prev + points);
      setCombo(prev => prev + 1);
      setTimeLeft(prev => Math.min(prev + 2, GAME_DURATION)); // Bonus Time
      triggerNodeEffect(index, 'IDLE');
      checkWinCondition(score + points);

    } else if (node.state === 'DANGER') {
      // Bad Hit
      triggerDamage();
      triggerNodeEffect(index, 'IDLE');
    
    } else {
      // Miss (Clicked Empty)
      setCombo(0);
    }
  };

  const triggerNodeEffect = (index: number, newState: NodeState) => {
    setNodes(prev => {
      const copy = [...prev];
      copy[index].state = newState;
      return copy;
    });
  };

  const triggerDamage = () => {
    setScore(prev => Math.max(0, prev - 200));
    setCombo(0);
    setShake(true);
    setGlitch(true);
    setTimeout(() => { setShake(false); setGlitch(false); }, 300);
  };

  const checkWinCondition = (currentScore: number) => {
    if (currentScore >= WIN_SCORE) {
      endGame(true);
    }
  };

  const endGame = (win: boolean) => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (spawnerRef.current) clearTimeout(spawnerRef.current);
    setPhase(win ? 'VICTORY' : 'GAMEOVER');
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (spawnerRef.current) clearTimeout(spawnerRef.current);
    };
  }, []);

  return (
    <section id="game" className={`py-24 bg-black relative overflow-hidden select-none transition-all duration-100 ${glitch ? 'invert filter contrast-150' : ''}`}>
        
        {/* Background FX */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,51,0.02)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,255,255,0.03),rgba(255,0,51,0.02),rgba(0,0,0,0.06))] bg-[length:100%_4px,6px_100%] pointer-events-none z-10" />
        <div className={`absolute inset-0 bg-red-900/20 mix-blend-overlay transition-opacity duration-100 ${shake ? 'opacity-100' : 'opacity-0'}`} />

        <div className={`container mx-auto px-6 relative z-20 ${shake ? 'translate-x-1 translate-y-1' : ''}`}>
            
            {/* Header / HUD */}
            <div className="flex justify-between items-center mb-12 border-b-2 border-white/10 pb-4">
                <div>
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase flex items-center gap-4">
                        <Brain className="text-white" size={48} />
                        NEURO<span className="text-neon-green">//LINK</span>
                    </h2>
                    <p className="text-gray-400 font-mono text-sm tracking-widest mt-2">ТЕСТ РЕАКЦИИ // V.10.0</p>
                </div>
                
                <div className="flex gap-8 font-mono">
                    <div className="text-right">
                        <span className="text-xs text-gray-500 block mb-1">СЧЕТ</span>
                        <span className="text-4xl text-neon-green font-bold drop-shadow-[0_0_10px_rgba(255,0,51,0.5)]">{score.toString().padStart(5, '0')}</span>
                    </div>
                    <div className="text-right">
                        <span className="text-xs text-gray-500 block mb-1">ВРЕМЯ</span>
                        <span className={`text-4xl font-bold ${timeLeft < 10 ? 'text-neon-green animate-pulse' : 'text-white'}`}>
                           00:{timeLeft.toString().padStart(2, '0')}
                        </span>
                    </div>
                </div>
            </div>

            {/* Game Container */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 h-[600px] items-center">
                
                {/* Left: Info Panel */}
                <div className="hidden md:flex flex-col h-full justify-between py-8">
                     <div className="space-y-6">
                        <div className="bg-neon-grey/50 p-6 border-l-4 border-neon-green backdrop-blur-sm">
                            <h3 className="text-white font-bold uppercase mb-2 flex items-center gap-2"><Activity size={18} /> ПРОТОКОЛ</h3>
                            <p className="text-sm text-gray-400">Активируй узлы для синхронизации.</p>
                            <ul className="mt-4 space-y-2 text-xs font-mono">
                                <li className="flex items-center gap-2"><span className="w-3 h-3 bg-neon-green rounded-sm shadow-[0_0_10px_#ff0033]"></span> CRIMSON УЗЕЛ: +100 ОЧКОВ</li>
                                <li className="flex items-center gap-2"><span className="w-3 h-3 bg-white rounded-sm shadow-[0_0_10px_#ffffff]"></span> WHITE УЗЕЛ: +300 + ВРЕМЯ</li>
                                <li className="flex items-center gap-2"><span className="w-3 h-3 bg-zinc-700 rounded-sm"></span> DARK УЗЕЛ: -УРОН</li>
                            </ul>
                        </div>

                        <div className="bg-black/50 border border-white/10 p-6 flex flex-col items-center justify-center">
                             <span className="text-xs text-gray-500 uppercase tracking-widest mb-2">Множитель Комбо</span>
                             <div className="text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-t from-white to-neon-green drop-shadow-[0_0_10px_rgba(255,0,51,0.5)]">
                                 x{combo}
                             </div>
                             <div className="w-full bg-zinc-900 h-1 mt-4">
                                 <motion.div 
                                    className="h-full bg-white box-shadow-[0_0_10px_#ffffff]" 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(100, combo * 10)}%` }}
                                 />
                             </div>
                        </div>
                     </div>

                     <div className="text-xs text-zinc-600 font-mono text-center">
                        НЕЙРОИНТЕРФЕЙС ПОДКЛЮЧЕН<br/>
                        ID: OPERATIVE-7734
                     </div>
                </div>

                {/* Right: The Grid (The Game) */}
                <div className="relative aspect-square md:aspect-auto md:h-full bg-black/80 border-2 border-white/10 p-4 md:p-8 flex items-center justify-center shadow-[0_0_50px_rgba(255,0,51,0.1)]">
                    
                    {/* Screens */}
                    <AnimatePresence>
                        {phase === 'IDLE' && (
                             <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="absolute inset-0 z-30 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center text-center"
                             >
                                 <Fingerprint size={64} className="text-neon-green mb-6 animate-pulse" />
                                 <h3 className="text-3xl font-bold text-white uppercase tracking-widest mb-8">СИСТЕМА ГОТОВА</h3>
                                 <button onClick={startGame} className="px-10 py-4 bg-neon-green text-black font-bold text-xl uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_#ff0033]">
                                     ИНИЦИАЛИЗАЦИЯ
                                 </button>
                             </motion.div>
                        )}

                        {phase === 'GAMEOVER' && (
                             <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="absolute inset-0 z-30 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center text-center border-2 border-neon-green"
                             >
                                 <AlertTriangle size={64} className="text-neon-green mb-6 animate-pulse" />
                                 <h3 className="text-4xl font-bold text-white uppercase tracking-widest mb-2">СБОЙ СВЯЗИ</h3>
                                 <p className="text-white/70 font-mono mb-8">Счет: {score}</p>
                                 <button onClick={startGame} className="px-8 py-3 border-2 border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center gap-2">
                                     <RefreshCw size={18} /> ПОВТОРИТЬ
                                 </button>
                             </motion.div>
                        )}

                        {phase === 'VICTORY' && (
                             <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="absolute inset-0 z-30 bg-neon-green/90 backdrop-blur-sm flex flex-col items-center justify-center text-center"
                             >
                                 <Trophy size={64} className="text-black mb-6 animate-bounce" />
                                 <h3 className="text-4xl font-bold text-black uppercase tracking-widest mb-2">ДОСТУП РАЗРЕШЕН</h3>
                                 <p className="text-black/70 font-bold font-mono mb-6">СИНХРОНИЗАЦИЯ: 100%</p>
                                 <div className="bg-black p-4 mb-8 transform -skew-x-12 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                                     <p className="text-neon-green font-mono text-xs mb-1">ПРОМО КОД:</p>
                                     <span className="text-2xl text-white font-bold tracking-[0.2em] select-all">VECTOR-2024</span>
                                 </div>
                                 <button onClick={startGame} className="text-black font-bold uppercase text-sm hover:underline">
                                     ОТКАЛИБРОВАТЬ СИСТЕМУ
                                 </button>
                             </motion.div>
                        )}
                    </AnimatePresence>

                    {/* The Hex Grid */}
                    <div className="grid grid-cols-3 gap-3 md:gap-4 w-full max-w-sm relative z-10">
                        {nodes.map((node) => (
                            <motion.button
                                key={node.id}
                                onMouseDown={() => handleNodeClick(node.id)}
                                onTouchStart={(e) => { e.preventDefault(); handleNodeClick(node.id); }} // Prevent scroll on mobile tap
                                layout
                                className={`aspect-square relative flex items-center justify-center clip-path-hex transition-all duration-100 ${
                                    node.state === 'IDLE' ? 'bg-zinc-900 border border-zinc-800 hover:border-zinc-600' :
                                    node.state === 'ACTIVE' ? 'bg-neon-green shadow-[0_0_20px_#ff0033] z-20 scale-105' :
                                    node.state === 'GOLDEN' ? 'bg-white shadow-[0_0_25px_#ffffff] animate-pulse z-20 scale-110' :
                                    'bg-zinc-700 shadow-[0_0_25px_#000000] opacity-50'
                                }`}
                                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                            >
                                <AnimatePresence>
                                    {node.state === 'ACTIVE' && (
                                        <motion.div initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}>
                                            <Zap className="text-black" size={32} />
                                        </motion.div>
                                    )}
                                    {node.state === 'GOLDEN' && (
                                        <motion.div initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}>
                                            <Trophy className="text-black" size={32} />
                                        </motion.div>
                                    )}
                                    {node.state === 'DANGER' && (
                                        <motion.div initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}>
                                            <Skull className="text-white" size={32} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Inner Hex Border for IDLE */}
                                {node.state === 'IDLE' && (
                                    <div className="absolute inset-2 border border-zinc-800 opacity-50" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
                                )}
                            </motion.button>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    </section>
  );
};