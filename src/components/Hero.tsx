import React from 'react';
import { Calendar, Quote, ChevronRight, Globe, Users } from 'lucide-react';
import { motion } from 'motion/react';

// On définit ce que le Hero a besoin de recevoir pour fonctionner
interface HeroProps {
  onRandom: () => void;      // Pour le bouton Aléatoire
  onContribute: () => void;  // Pour le bouton Contribuer
  onGenerate: () => void;    // Pour le générateur (scroll ou ouvrir l'outil)
  onSelectTheme: (theme: string) => void; // Pour les thématiques à droite
  selectedTheme?: string | null;
}

export default function Hero({ onRandom, onContribute, onGenerate, onSelectTheme, selectedTheme }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
        {/* Left Side: Today's Proverb & Hero Text */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white border-3 border-brand-ink p-12 relative shadow-[12px_12px_0px_#2D5A27]"
          >
            <span className="absolute -top-4 left-8 bg-brand-clay text-white px-4 py-1.5 text-xs font-black uppercase tracking-widest border-2 border-brand-ink">
              Proverbe du Jour
            </span>
            
            <div className="flex items-center gap-4 mb-6 pt-4">
              <div className="w-12 h-12 bg-brand-ink text-white rounded-full flex items-center justify-center text-xl cursor-pointer hover:scale-110 transition-transform">
                ▶
              </div>
              <div className="flex gap-2">
                <span className="bg-brand-ivory border border-brand-ink px-3 py-1 text-[10px] font-bold uppercase tracking-wider">Lingala</span>
                <span className="bg-brand-ivory border border-brand-ink px-3 py-1 text-[10px] font-bold uppercase tracking-wider">🇨🇬 Congo</span>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif italic font-bold text-brand-earth leading-tight mb-4">
              "Mwana ya nkoko te kozanga nzela."
            </h2>
            
            <p className="text-xl md:text-2xl font-sans font-medium text-brand-ink/80 border-l-4 border-brand-savannah pl-6 mb-6">
              L'enfant du vautour ne manque jamais de chemin.
            </p>
            
            <p className="text-sm text-stone-500 font-medium">
              <span className="font-bold text-brand-ink uppercase text-[10px] tracking-widest">Explication :</span> La sagesse et les compétences sont transmises naturellement par l'héritage et l'observation.
            </p>
          </motion.div>

          {/* Action Buttons Rendu Opérationnels */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button 
              onClick={onGenerate}
              className="bg-brand-jungle text-white p-6 border-3 border-brand-ink shadow-[4px_4px_0px_#1A1A1A] flex flex-col items-center justify-center gap-3 hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              <span className="text-3xl">✨</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-center leading-tight">Générateur de Citations</span>
            </button>
            <button 
              onClick={onRandom}
              className="bg-brand-clay text-white p-6 border-3 border-brand-ink shadow-[4px_4px_0px_#1A1A1A] flex flex-col items-center justify-center gap-3 hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              <span className="text-3xl">🎲</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-center leading-tight">Aléatoire</span>
            </button>
            <button 
              onClick={onContribute}
              className="bg-brand-savannah text-brand-ink p-6 border-3 border-brand-ink shadow-[4px_4px_0px_#1A1A1A] flex flex-col items-center justify-center gap-3 hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              <span className="text-3xl">✍️</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-center leading-tight">Contribuer</span>
            </button>
          </div>
        </div>

        {/* Sidebar Right Section */}
        <div className="sidebar flex flex-col gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-ink leading-none">Statistiques Vivantes</p>
                <div className="h-[2px] bg-brand-ink flex-1" />
            </div>
            <div className="bg-brand-ink text-white p-6 border-3 border-brand-ink flex justify-between items-center shadow-[4px_4px_0px_#1A1A1A]">
               <div className="text-center">
                  <span className="block text-2xl font-black text-brand-savannah leading-none">12.5k</span>
                  <span className="text-[9px] uppercase font-bold tracking-widest opacity-60">Proverbes</span>
               </div>
               <div className="w-[1px] h-8 bg-white/20" />
               <div className="text-center">
                  <span className="block text-2xl font-black text-brand-savannah leading-none">54</span>
                  <span className="text-[9px] uppercase font-bold tracking-widest opacity-60">Pays</span>
               </div>
               <div className="w-[1px] h-8 bg-white/20" />
               <div className="text-center">
                  <span className="block text-2xl font-black text-brand-savannah leading-none">300+</span>
                  <span className="text-[9px] uppercase font-bold tracking-widest opacity-60">Langues</span>
               </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-ink leading-none">Thématiques Populaires</p>
                <div className="h-[2px] bg-brand-ink flex-1" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['Famille', 'Courage', 'Justice', 'Amour', 'Travail', 'Patience'].map(cat => (
                <div 
                  key={cat} 
                  onClick={() => onSelectTheme(cat)}
                  className={`border-2 border-brand-ink p-3 text-[11px] font-black uppercase tracking-widest text-center transition-colors cursor-pointer shadow-[2px_2px_0px_#1A1A1A] active:shadow-none active:translate-y-[1px] ${
                    selectedTheme === cat ? 'bg-brand-savannah text-brand-ink' : 'bg-white hover:bg-stone-50'
                  }`}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-ink text-white p-6 border-3 border-brand-ink shadow-[4px_4px_0px_#1A1A1A]">
             <p className="text-xs font-bold leading-relaxed">
               <span className="text-brand-savannah uppercase font-black tracking-widest block mb-1">Sagesse Flash :</span>
               "Le feu qui brûle la case n'épargne pas le toit." <span className="text-stone-400 italic font-medium">(Wolof)</span>
             </p>
          </div>
        </div>
      </div>
    </section>
  );
}