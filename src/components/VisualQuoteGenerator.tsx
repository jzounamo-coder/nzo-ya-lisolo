/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Proverb } from '../types';
import { Download, Share2, Palette, Wand2, Quote, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { toPng } from 'html-to-image';
import { MOCK_PROVERBS } from '../constants'; // Vérifie bien que ce chemin est correct

const PATTERNS = [
  { name: 'Bogolan', class: 'bg-[#2D1B14] text-[#F5F5F0] p-12 border-[10px] border-[#3D2C2E]' },
  { name: 'Nuit à Kin', class: 'bg-[#0A1128] text-brand-savannah p-12 border-8 border-brand-clay shadow-inner' },
  { name: 'Terre Rouge', class: 'bg-brand-clay text-white p-12 border-4 border-brand-ink' },
  { name: 'Kente', class: 'bg-[#FF9F1C] text-white p-12 shadow-inner border-y-8 border-brand-ink' },
];

export default function VisualQuoteGenerator({ proverb: initialProverb }: { proverb: Proverb }) {
  const [activePattern, setActivePattern] = useState(0);
  // On utilise un State pour le proverbe afin de pouvoir le changer
  const [currentProverb, setCurrentProverb] = useState<Proverb>(initialProverb);
  const cardRef = useRef<HTMLDivElement>(null);

  // FONCTION POUR CHANGER DE PROVERBE
  const handleRandomize = () => {
    const randomIndex = Math.floor(Math.random() * MOCK_PROVERBS.length);
    setCurrentProverb(MOCK_PROVERBS[randomIndex]);
  };

  const handleDownload = async () => {
    if (cardRef.current === null) return;
    try {
      const dataUrl = await toPng(cardRef.current, { 
        cacheBust: true,
        backgroundColor: '#1A1A1A', 
        style: { transform: 'scale(1)' }
      });
      const link = document.createElement('a');
      link.download = `sagesse-${currentProverb.originCountryName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Erreur image:', err);
    }
  };

  const handleWhatsAppShare = () => {
    const message = `✨ *Sagesse d'Afrique* ✨\n\n"${currentProverb.text}"\n\n🌍 Origine : ${currentProverb.originCountryName}\n\nDécouvre plus sur Nzo ya Lisolo !`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 bg-white border-3 border-brand-ink p-8 lg:p-12 shadow-[12px_12px_0px_#1A1A1A] overflow-hidden">
      <div className="space-y-8">
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-clay border-2 border-brand-ink flex items-center justify-center text-white brutal-shadow">
                    <Wand2 size={24} />
                </div>
                <div>
                    <h3 className="text-2xl md:text-3xl font-serif font-black italic text-brand-earth tracking-tighter">Générateur</h3>
                </div>
            </div>

            {/* LE BOUTON MAGIQUE EST ICI */}
            <button 
              onClick={handleRandomize}
              className="flex items-center gap-2 bg-brand-savannah text-brand-ink px-4 py-2 border-2 border-brand-ink font-black uppercase text-[10px] tracking-widest hover:translate-y-[-2px] transition-all brutal-shadow active:translate-y-[2px]"
            >
              <RefreshCw size={16} />
              Changer de citation
            </button>
        </div>

        {/* L'image générée change maintenant dynamiquement */}
        <AnimatePresence mode="wait">
          <motion.div
            ref={cardRef}
            key={currentProverb.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "aspect-square border-3 border-brand-ink flex flex-col items-center justify-center text-center relative overflow-hidden shadow-[8px_8px_0px_#1A1A1A]",
              PATTERNS[activePattern].class
            )}
          >
            <Quote size={48} className="opacity-20 mb-8 text-white" />
            <h4 className="text-2xl md:text-3xl font-serif italic font-black leading-tight mb-6 px-8">
              {currentProverb.text}
            </h4>
            <div className="w-12 h-1 bg-current opacity-30 mb-6" />
            <p className="text-lg opacity-90 mb-8 px-10 font-medium italic">
              {currentProverb.translation}
            </p>
            <div className="flex items-center gap-3 pt-6 border-t border-white/20">
              <span className="text-xl">🌍</span>
              <span className="text-[10px] font-black uppercase tracking-widest opacity-70">
                Nzo ya Lisolo • {currentProverb.originCountryName}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col justify-center space-y-8">
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-ink flex items-center gap-2 border-b-2 border-brand-ink pb-2">
            <Palette size={14} /> Style de l'Affiche
          </p>
          <div className="grid grid-cols-2 gap-3">
            {PATTERNS.map((p, i) => (
              <button
                key={p.name}
                onClick={() => setActivePattern(i)}
                className={cn(
                  "p-4 border-2 transition-all text-left flex flex-col gap-2",
                  activePattern === i 
                    ? "border-brand-ink bg-white shadow-[4px_4px_0px_#1A1A1A] translate-y-[-1px]" 
                    : "border-stone-200 bg-stone-50 hover:border-brand-ink"
                )}
              >
                <div className={cn("w-full h-8 border border-brand-ink/20", p.class)} />
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-ink">{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <button 
            onClick={handleDownload}
            className="w-full bg-brand-savannah text-brand-ink border-3 border-brand-ink py-5 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-yellow-400 transition-all shadow-[4px_4px_0px_#1A1A1A]"
          >
            <Download size={20} /> Télécharger
          </button>
          <button 
            onClick={handleWhatsAppShare}
            className="w-full bg-white text-brand-ink border-3 border-brand-ink py-5 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-stone-50 transition-all shadow-[4px_4px_0px_#1A1A1A]"
          >
            <Share2 size={20} /> WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}