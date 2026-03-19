import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Lock, Sparkles } from 'lucide-react';

interface LoginOverlayProps {
  onLogin: () => void;
}

export const LoginOverlay: React.FC<LoginOverlayProps> = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId === 'senior' && password === '3143') {
      onLogin();
    } else {
      setError('Oops! Wrong key, Senior! 🤭');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      <motion.div
        animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
        className="glass p-8 rounded-[2rem] w-full max-w-sm text-center space-y-6 relative"
      >
        <div className="flex justify-center relative">
          <motion.div 
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="w-32 h-32 rounded-full border-4 border-primary/20 p-1 bg-white shadow-xl overflow-hidden">
              <img 
                src="/senior1.png" 
                alt="Senior" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-md"
            >
              <Sparkles className="w-5 h-5 text-primary" />
            </motion.div>
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-2 -left-2 bg-white rounded-full p-2 shadow-md"
            >
              <Heart className="w-5 h-5 text-primary fill-current" />
            </motion.div>
          </motion.div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-serif text-primary">Welcome, Senior! 🌸</h2>
          <p className="text-sm text-slate-500 italic">Enter your secret key to unlock the magic...</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Apni nickname?"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-6 py-3 rounded-full border-2 border-slate-100 focus:border-primary outline-none transition-all text-center"
          />
          <input
            type="password"
            placeholder="Password Den🥺"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-6 py-3 rounded-full border-2 border-slate-100 focus:border-primary outline-none transition-all text-center"
          />
          
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-xs font-medium"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-primary text-white rounded-full font-medium shadow-lg shadow-primary/30 hover:bg-primary/90 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Open My Heart</span>
            <Heart className="w-4 h-4 group-hover:fill-current transition-all" />
          </button>
        </form>

        <div className="pt-4 flex justify-center gap-2 text-primary/40">
          <Sparkles className="w-4 h-4" />
          <Sparkles className="w-4 h-4" />
          <Sparkles className="w-4 h-4" />
        </div>
      </motion.div>
    </motion.div>
  );
};
