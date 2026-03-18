import React from 'react';
import { motion } from 'motion/react';

interface CharacterProps {
  type: 'bubu' | 'dudu';
  action: 'idle' | 'dancing' | 'eating' | 'cheering' | 'walking';
  message?: string;
  className?: string;
  flip?: boolean;
}

export const Character: React.FC<CharacterProps> = ({ type, action, message, className, flip }) => {
  return null;
  const isBubu = type === 'bubu';
  
  // Colors based on the provided image
  const bodyColor = isBubu ? '#FFFFFF' : '#C49A6C'; // White for Bubu, Brown for Dudu
  const earColor = isBubu ? '#333333' : '#8B5E3C'; // Black for Bubu, Dark Brown for Dudu
  const blushColor = isBubu ? '#FFB7C5' : '#FFD700'; // Pink for Bubu, Yellow for Dudu

  const variants = {
    idle: {
      y: [0, -4, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    },
    dancing: {
      y: [0, -20, 0],
      rotate: [-8, 8, -8],
      transition: { duration: 0.4, repeat: Infinity, ease: "easeInOut" }
    },
    eating: {
      scale: [1, 1.05, 1],
      y: [0, -3, 0],
      transition: { duration: 0.2, repeat: Infinity }
    },
    cheering: {
      scale: [1, 1.15, 1],
      y: [0, -10, 0],
      transition: { duration: 0.3, repeat: Infinity }
    },
    walking: {
      y: [0, -8, 0],
      rotate: [-3, 3, -3],
      transition: { duration: 0.3, repeat: Infinity, ease: "linear" }
    }
  };

  return (
    <motion.div 
      variants={variants}
      animate={action}
      className={`relative flex flex-col items-center select-none ${className}`}
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
    >
      {/* Birthday Cap */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
        <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[28px] border-b-primary relative">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-yellow-300 rounded-full shadow-sm" />
          {/* Polka dots on cap */}
          <div className="absolute top-4 left-[-4px] w-1.5 h-1.5 bg-white/40 rounded-full" />
          <div className="absolute top-6 right-[-2px] w-1 h-1 bg-white/40 rounded-full" />
        </div>
      </div>

      {/* Speech Bubble */}
      {message && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute -top-20 bg-white px-4 py-2 rounded-2xl shadow-lg text-[11px] font-bold text-primary whitespace-nowrap border-2 border-primary/5 z-30"
          style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
        >
          {message}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r-2 border-b-2 border-primary/5" />
        </motion.div>
      )}

      {/* Character Body */}
      <div className="relative w-14 h-12 rounded-[2rem] shadow-md border-2 border-black/5" style={{ backgroundColor: bodyColor }}>
        {/* Ears */}
        <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full" style={{ backgroundColor: earColor }}>
           <div className="absolute inset-1 rounded-full opacity-30 bg-black/10" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full" style={{ backgroundColor: earColor }}>
           <div className="absolute inset-1 rounded-full opacity-30 bg-black/10" />
        </div>

        {/* Eyes */}
        <div className="absolute top-5 left-3.5 w-1.5 h-1.5 bg-slate-900 rounded-full" />
        <div className="absolute top-5 right-3.5 w-1.5 h-1.5 bg-slate-900 rounded-full" />
        
        {/* Blush */}
        <div className="absolute top-7 left-1.5 w-3.5 h-2 rounded-full blur-[1px]" style={{ backgroundColor: blushColor, opacity: 0.7 }} />
        <div className="absolute top-7 right-1.5 w-3.5 h-2 rounded-full blur-[1px]" style={{ backgroundColor: blushColor, opacity: 0.7 }} />

        {/* Mouth (The cute 'w' shape) */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-4 h-3 flex flex-col items-center">
            <div className="flex gap-[-1px]">
                <div className="w-2 h-1.5 border-b-2 border-slate-900 rounded-full" />
                <div className="w-2 h-1.5 border-b-2 border-slate-900 rounded-full" />
            </div>
            {/* Tongue out like in the image */}
            <motion.div 
              animate={{ scaleY: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-1.5 h-2 bg-red-400 rounded-b-full border-x border-b border-slate-900 -mt-0.5" 
            />
        </div>

        {/* Arms */}
        <motion.div 
          animate={action === 'cheering' ? { rotate: [0, -60, 0], y: [0, -3, 0] } : action === 'walking' ? { x: [0, -2, 0] } : {}}
          className="absolute top-7 -left-1.5 w-4 h-4 rounded-full border border-black/5" 
          style={{ backgroundColor: bodyColor }} 
        />
        <motion.div 
          animate={action === 'cheering' ? { rotate: [0, 60, 0], y: [0, -3, 0] } : action === 'walking' ? { x: [0, 2, 0] } : {}}
          className="absolute top-7 -right-1.5 w-4 h-4 rounded-full border border-black/5" 
          style={{ backgroundColor: bodyColor }} 
        />

        {/* Legs (Visible when walking/dancing) */}
        <div className="absolute -bottom-1 left-3 w-4 h-3 rounded-full border border-black/5" style={{ backgroundColor: bodyColor }} />
        <div className="absolute -bottom-1 right-3 w-4 h-3 rounded-full border border-black/5" style={{ backgroundColor: bodyColor }} />
      </div>
    </motion.div>
  );
};
