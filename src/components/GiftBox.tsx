import React from 'react';
import { motion } from 'motion/react';
import { Gift } from 'lucide-react';

interface GiftBoxProps {
  onOpen: () => void;
  className?: string;
}

export const GiftBox: React.FC<GiftBoxProps> = ({ onOpen, className }) => {
  return (
    <motion.div
      initial={{ scale: 0, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onOpen}
      className={`cursor-pointer flex flex-col items-center gap-2 ${className}`}
    >
      <div className="relative">
        <motion.div
          animate={{ 
            rotate: [-2, 2, -2],
            y: [0, -5, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-24 h-24 bg-primary rounded-xl shadow-xl flex items-center justify-center relative overflow-hidden"
        >
          {/* Ribbon Vertical */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 bg-white/30" />
          {/* Ribbon Horizontal */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-4 bg-white/30" />
          
          <Gift className="w-12 h-12 text-white relative z-10" />
        </motion.div>
        
        {/* Bow */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-1">
          <div className="w-6 h-6 border-4 border-white/40 rounded-full rotate-45" />
          <div className="w-6 h-6 border-4 border-white/40 rounded-full -rotate-45" />
        </div>
      </div>
      
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-primary font-bold text-sm"
      >
        Click to open! 🎁
      </motion.p>
    </motion.div>
  );
};
