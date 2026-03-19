import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Music, Music2, Loader2 } from 'lucide-react';
import { LoginOverlay } from './components/LoginOverlay';
import { Cake } from './components/Cake';
import { LetterModal } from './components/LetterModal';
import { Character } from './components/Character';
import { GiftBox } from './components/GiftBox';

interface CharacterPos {
  id: string;
  type: 'bubu' | 'dudu';
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  flip: boolean;
  isWalking: boolean;
  isDancing: boolean;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBlown, setIsBlown] = useState(false);
  const [isCut, setIsCut] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playerRef = useRef<any>(null);

  // Character states for wandering
  const [chars, setChars] = useState<CharacterPos[]>([
    { id: '1', type: 'bubu', x: 20, y: 40, targetX: 20, targetY: 40, flip: false, isWalking: false, isDancing: false },
    { id: '2', type: 'dudu', x: 30, y: 60, targetX: 30, targetY: 60, flip: true, isWalking: false, isDancing: false },
    { id: '3', type: 'bubu', x: 70, y: 30, targetX: 70, targetY: 30, flip: false, isWalking: false, isDancing: false },
    { id: '4', type: 'dudu', x: 80, y: 70, targetX: 80, targetY: 70, flip: true, isWalking: false, isDancing: false },
  ]);

  // Wandering logic
  useEffect(() => {
    if (!isLoggedIn || showGift) return;

    const interval = setInterval(() => {
      setChars(prev => prev.map(char => {
        // If candle is blown, 20% chance to start/stop dancing if idle
        if (isBlown && !char.isWalking && Math.random() < 0.05) {
          return { ...char, isDancing: !char.isDancing };
        }

        // 30% chance to start walking to a new spot if idle
        if (!char.isWalking && Math.random() < 0.3) {
          const newTargetX = Math.max(10, Math.min(90, char.x + (Math.random() * 40 - 20)));
          const newTargetY = Math.max(10, Math.min(60, char.y + (Math.random() * 30 - 15)));
          return {
            ...char,
            targetX: newTargetX,
            targetY: newTargetY,
            isWalking: true,
            isDancing: false,
            flip: newTargetX < char.x
          };
        }
        
        // If walking, move towards target
        if (char.isWalking) {
          const dx = char.targetX - char.x;
          const dy = char.targetY - char.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 1) {
            return { ...char, x: char.targetX, y: char.targetY, isWalking: false };
          }
          
          const speed = 0.5;
          return {
            ...char,
            x: char.x + (dx / dist) * speed,
            y: char.y + (dy / dist) * speed
          };
        }
        
        return char;
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [isLoggedIn, showGift, isBlown]);

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
    window.onYouTubeIframeAPIReady = () => setIsPlayerReady(true);
  }, []);

  const createPlayer = () => {
    if (window.YT && window.YT.Player && !playerRef.current) {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '0', width: '0', videoId: 'I3OJUwILelU',
        playerVars: { 
          autoplay: 1, 
          loop: 1, 
          playlist: 'I3OJUwILelU', 
          origin: window.location.origin,
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          start: 0
        },
        events: {
          onReady: (event: any) => { 
            event.target.setVolume(50);
            event.target.playVideo(); 
            setIsMusicPlaying(true); 
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo();
            }
            setIsMusicPlaying(event.data === window.YT.PlayerState.PLAYING);
          }
        },
      });
    } else if (playerRef.current) {
      playerRef.current.playVideo();
      setIsMusicPlaying(true);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    if (isPlayerReady) createPlayer();
    else {
      const checkApi = setInterval(() => {
        if (window.YT && window.YT.Player) { createPlayer(); clearInterval(checkApi); }
      }, 100);
      setTimeout(() => clearInterval(checkApi), 5000);
    }
    triggerConfetti(true);
  };

  const triggerConfetti = (isInitial = false) => {
    if (isInitial) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        confetti({ particleCount: 50, origin: { x: Math.random() * 0.2 + 0.1, y: Math.random() - 0.2 } });
        confetti({ particleCount: 50, origin: { x: Math.random() * 0.2 + 0.7, y: Math.random() - 0.2 } });
      }, 250);
    } else {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#ff85a1', '#fce4ec', '#ffffff'] });
    }
  };

  const playSFX = (url: string) => {
    const audio = new Audio(url);
    audio.volume = 0.6;
    audio.play().catch(e => console.log("Audio play blocked:", e));
  };

  const handleCakeAction = () => {
    if (!isBlown) {
      setIsBlown(true);
      triggerConfetti();
      playSFX('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'); // Whoosh/Blow
    } else if (!isCut) {
      setIsCut(true);
      triggerConfetti();
      playSFX('https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3'); // Sparkle/Magic
      setTimeout(() => {
        setShowGift(true);
        playSFX('https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3'); // Pop/Surprise
        // Auto-scroll to gift
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 2000);
    }
  };

  const handleOpenGift = () => {
    setIsLetterOpen(true);
    playSFX('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'); // Ta-da/Success
  };

  const toggleMusic = () => {
    if (playerRef.current) {
      if (playerRef.current.getPlayerState() === 1) { playerRef.current.pauseVideo(); setIsMusicPlaying(false); }
      else { playerRef.current.playVideo(); setIsMusicPlaying(true); }
    } else createPlayer();
  };

  const getCharacterAction = (char: CharacterPos) => {
    if (showGift) return 'cheering';
    if (isCut) return 'eating';
    if (char.isDancing) return 'dancing';
    if (char.isWalking) return 'walking';
    return 'idle';
  };

  const getCharacterMessage = (type: 'bubu' | 'dudu') => {
    if (showGift) return type === 'bubu' ? "Open it Senior!" : "Surprise for you!";
    if (isCut) return "Yummy cake!";
    if (isBlown) return "Yay! Happy Bday!";
    return type === 'bubu' ? "Welcome Senior!" : "Congrats Arpona!";
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 relative bg-secondary">
      <AnimatePresence>
        {!isLoggedIn && <LoginOverlay onLogin={handleLogin} />}
      </AnimatePresence>

      <div className="fixed -top-[1000px] left-0 opacity-0 pointer-events-none">
        <div id="youtube-player" />
      </div>

      {isLoggedIn && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-6xl min-h-screen text-center flex flex-col items-center py-12 relative z-10"
        >
          {/* Header */}
          <motion.div className="mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif text-primary drop-shadow-sm"
            >
              Happy Birthday, Senior🌸
            </motion.h1>
          </motion.div>

          {/* Wandering Characters Area */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {chars.map(char => (
              <motion.div
                key={char.id}
                className="absolute"
                animate={{ 
                  left: `${char.x}%`, 
                  top: `${char.y}%`,
                }}
                transition={{ 
                  duration: 0.5,
                  ease: "linear"
                }}
              >
                <Character 
                  type={char.type} 
                  action={getCharacterAction(char)} 
                  message={getCharacterMessage(char.type)}
                  flip={char.flip}
                />
              </motion.div>
            ))}
          </div>

          {/* Main Interaction Area */}
          <div className="relative z-20 flex flex-col items-center gap-16 pb-32">
            <Cake isBlown={isBlown} isCut={isCut} onAction={handleCakeAction} />
            
            <AnimatePresence>
              {showGift && (
                <motion.div 
                  key="gift" 
                  initial={{ opacity: 0, scale: 0.5, y: 50 }} 
                  animate={{ opacity: 1, scale: 1, y: 0 }} 
                  className="flex flex-col items-center gap-8"
                >
                   {/* Scroll Indicator */}
                   {!isLetterOpen && (
                     <motion.div 
                       animate={{ y: [0, 10, 0] }}
                       transition={{ duration: 1.5, repeat: Infinity }}
                       className="text-primary/60 flex flex-col items-center gap-1"
                     >
                       <span className="text-xs font-bold uppercase tracking-widest">Scroll Down</span>
                       <div className="w-0.5 h-8 bg-primary/20 rounded-full relative overflow-hidden">
                         <motion.div 
                           animate={{ top: ['-100%', '100%'] }}
                           transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                           className="absolute left-0 w-full h-1/2 bg-primary"
                         />
                       </div>
                     </motion.div>
                   )}

                   <motion.div 
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.5 }}
                     className="flex items-center gap-12 mt-8"
                   >
                      <Character type="bubu" action="cheering" message="Open it!" />
                      <GiftBox onOpen={handleOpenGift} />
                      <Character type="dudu" action="cheering" message="For you!" />
                   </motion.div>
                   <motion.p 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 1 }}
                     className="text-primary font-serif text-3xl italic"
                   >
                     Senior, I Have a gift just for you!
                   </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Music Toggle */}
          <div className="fixed bottom-8 right-8 flex flex-col items-end gap-2 z-50">
            <AnimatePresence>
              {!isMusicPlaying && isLoggedIn && (
                <motion.span initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="text-xs font-medium text-primary/60 bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">
                  {!isPlayerReady ? "Loading music..." : "Music paused"}
                </motion.span>
              )}
            </AnimatePresence>
            <button onClick={toggleMusic} className="p-4 glass rounded-full text-primary hover:scale-110 active:scale-95 transition-all shadow-lg">
              {!isPlayerReady ? <Loader2 className="w-6 h-6 animate-spin" /> : isMusicPlaying ? <Music className="w-6 h-6" /> : <Music2 className="w-6 h-6 opacity-50" />}
            </button>
          </div>
        </motion.div>
      )}

      <LetterModal isOpen={isLetterOpen} onClose={() => setIsLetterOpen(false)} />

      {/* Background Decorations */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}

declare global {
  interface Window { YT: any; onYouTubeIframeAPIReady: () => void; }
}
