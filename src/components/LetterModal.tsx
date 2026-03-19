import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink } from 'lucide-react';

interface LetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LetterModal: React.FC<LetterModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          
            <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="relative w-full max-w-md max-h-[90vh] bg-[#fffaf0] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-lg border-2 border-[#e3c4a8]/30 overflow-y-auto"
          >
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
            
            {/* Decorative Borders */}
            <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#e3c4a8]/20 pointer-events-none" />
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-slate-400 hover:text-primary transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative space-y-8 font-serif text-center">
              <div className="flex justify-center mb-2">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-4xl">🌸</span>
                </motion.div>
              </div>

              <h3 
                style={{ fontFamily: "'Caveat', cursive" }} 
                className="text-4xl text-[#795548] font-bold tracking-wide"
              >
                Dear Senior,
              </h3>
              
              <div 
                style={{ fontFamily: "'Caveat', cursive" }} 
                className="space-y-6 text-2xl leading-snug text-[#4e342e]"
              >
                <p>
                  Happy Birthday! You bring so much joy into the world. 
                  On your special day, I hope you find every reason to smile. 
                  You are truly special and deserve all the happiness.
                </p>
                <p className="pt-2 font-bold text-[#795548]">
                  Here’s a little something I made — your memories of my eyes…
                </p>
              </div>

              <div className="pt-8 flex justify-center">
                <a 
                  href="https://senior-arpona.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-sans text-base font-semibold shadow-xl shadow-primary/30 hover:bg-primary/90 hover:-translate-y-1 transition-all group"
                >
                  <span>View Memories</span>
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              <div className="pt-4 opacity-40">
                <span className="text-3xl">✨ 💖 ✨</span>
              </div>
            </div>

            {/* Decorative Corner */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
