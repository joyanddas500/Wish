import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CakeProps {
  isBlown: boolean;
  isCut: boolean;
  onAction: () => void;
}

export const Cake: React.FC<CakeProps> = ({ isBlown, isCut, onAction }) => {
  return (
    <div className="relative flex flex-col items-center justify-center py-20 cursor-pointer group" onClick={onAction}>
      {/* Candle */}
      <AnimatePresence>
        {!isCut && (
          <motion.div 
            className="relative z-30"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: 20 }}
            animate={isBlown ? { y: 5 } : {}}
          >
            <div className="w-4 h-12 bg-yellow-400 rounded-t-md relative mx-auto">
              {!isBlown && (
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [-2, 2, -2],
                    y: [0, -2, 0]
                  }}
                  transition={{ 
                    duration: 0.2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 w-5 h-8 bg-orange-500 rounded-full blur-[1px] shadow-[0_0_15px_rgba(255,165,0,0.8)]"
                  style={{
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'
                  }}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cake Layers */}
      <div className="relative mt-[-4px]">
        {/* Icing */}
        <motion.div 
          animate={isCut ? { x: -10, rotate: -2 } : {}}
          className="w-48 h-10 bg-white rounded-t-2xl relative z-20 shadow-sm"
        />
        
        {/* Main Layer */}
        <motion.div 
          animate={isCut ? { x: -10, rotate: -2 } : {}}
          className="w-48 h-24 bg-[#ffb7c5] rounded-b-xl relative z-10 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-4 bg-white/30" />
          <div className="absolute bottom-4 left-0 w-full h-2 bg-white/20" />
          
          {/* Cut Line */}
          {isBlown && !isCut && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-0 left-1/2 w-0.5 h-full bg-white/50 border-l border-dashed border-white/80"
            />
          )}
          
          {/* Slice Visual */}
          {isCut && (
            <div className="absolute top-0 right-0 w-1/2 h-full bg-pink-300/50" />
          )}
        </motion.div>

        {/* Second Slice (Separated) */}
        {isCut && (
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 20, rotate: 5 }}
            className="absolute top-0 left-24 w-24 h-34 z-10"
          >
             <div className="w-24 h-10 bg-white rounded-tr-2xl shadow-sm" />
             <div className="w-24 h-24 bg-[#ffb7c5] rounded-br-xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-4 bg-white/30" />
             </div>
          </motion.div>
        )}

        {/* Plate */}
        <div className="w-64 h-3 bg-slate-200 rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2" />
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-12 text-slate-400 text-sm font-medium italic"
      >
        {!isBlown ? "Tap to blow the candle" : !isCut ? "Now tap to cut the cake!" : "Delicious! ✨"}
      </motion.p>
    </div>
  );
};
