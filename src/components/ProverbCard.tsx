import React, { useState } from 'react';
import { Play, Volume2, Heart, Share2, Quote, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react'; // Assure-toi d'importer AnimatePresence
import { cn } from '../lib/utils';
import { Proverb } from '../types';

interface ProverbCardProps {
  proverb: Proverb;
  onLike?: () => void;
  onShare?: () => void;
}

export default function ProverbCard({ proverb, onLike, onShare }: ProverbCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // --- LOGIQUE DE LECTURE VOCALE ---
  const handleListen = () => {
    if (!('speechSynthesis' in window)) {
      alert("La lecture vocale n'est pas supportée par votre navigateur.");
      return;
    }

    // Annuler toute lecture en cours
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(proverb.text);
    
    // Configuration de la voix
    utterance.lang = 'fr-FR'; 
    utterance.rate = 0.85; // Un peu plus lent pour le côté solennel
    utterance.pitch = 0.9; // Un ton légèrement plus grave

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const countryCode = (proverb as any).countryId || (proverb as any).countryCode || 'un';

  return (
    <motion.div 
      id={`proverb-${proverb.id}`}
      whileHover={{ y: -4, x: -4 }}
      className="bg-white brutal-border p-8 brutal-shadow-lg hover:brutal-shadow-savannah-lg flex flex-col h-full relative group transition-all duration-200"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-7 border-2 border-brand-ink overflow-hidden bg-stone-100 shadow-[2px_2px_0px_#1A1A1A]">
            <img 
              src={`https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`}
              alt={`Drapeau de ${proverb.originCountryName}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://flagcdn.com/w80/un.png";
              }}
            />
          </div>
          
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-clay leading-none mb-1">
              {proverb.language}
            </p>
            <p className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">
              {proverb.originCountryName || 'Pays Afrique'}
            </p>
          </div>
        </div>
        
        <button 
          onClick={onLike}
          className="w-10 h-10 border-2 border-brand-ink flex items-center justify-center bg-white text-brand-ink hover:bg-red-50 hover:text-red-500 transition-all shadow-[4px_4px_0px_#1A1A1A] active:shadow-none active:translate-y-[4px] active:translate-x-[4px]"
        >
          <Heart size={20} fill={proverb.likesCount > 100 ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex-1 space-y-4">
        <h4 className="text-2xl font-serif font-bold text-brand-earth leading-snug italic">
          "{proverb.text}"
        </h4>
        <div className="py-4 border-y-2 border-brand-ink/10">
          <p className="text-brand-ink font-medium leading-relaxed border-l-4 border-brand-savannah pl-4">
            {proverb.translation}
          </p>
        </div>
        <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed font-medium">
          {proverb.explanation}
        </p>
      </div>

      <div className="mt-8 flex items-center justify-between pt-6 border-t border-brand-ink/5">
        <div className="flex items-center gap-3">
          <button 
            onClick={handleListen}
            className={cn(
              "w-12 h-12 border-2 border-brand-ink flex items-center justify-center transition-all shadow-[4px_4px_0px_#1A1A1A] active:shadow-none active:translate-y-[4px] active:translate-x-[4px]",
              isPlaying ? "bg-brand-clay text-white" : "bg-brand-ink text-white hover:bg-brand-clay"
            )}
          >
            {isPlaying ? <Volume2 size={24} className="animate-pulse" /> : <Play size={24} className="ml-1" />}
          </button>
          
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-brand-ink uppercase tracking-widest">
              {isPlaying ? "Écoute en cours" : "Écouter"}
            </span>
            
            {/* --- PETIT EFFET VISUEL D'ONDE SONORE --- */}
            <AnimatePresence>
              {isPlaying && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="flex gap-0.5 h-2 items-end mt-1"
                >
                  {[0.4, 0.7, 0.3, 0.9, 0.5].map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: ["20%", "100%", "20%"] }}
                      transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                      className="w-1 bg-brand-clay"
                      style={{ height: `${h * 100}%` }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <button 
          onClick={onShare}
          className="flex items-center gap-2 text-brand-ink hover:text-brand-clay transition-colors text-[10px] font-black uppercase tracking-widest"
        >
          <Share2 size={18} />
          <span>Image</span>
        </button>
      </div>
    </motion.div>
  );
}