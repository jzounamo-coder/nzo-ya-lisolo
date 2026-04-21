/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Proverb } from '../types';
import { Download, Share2, Palette, Wand2, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { toPng } from 'html-to-image';

const PATTERNS = [
  { name: 'Bogolan', class: 'bg-stone-900 text-white p-12 border-4 border-stone-800' },
  // Modification ici : Fond bleu profond au lieu de l'image de motif qui créait le bug blanc
  { name: 'Royal Blue', class: 'bg-brand-ink text-brand-savannah p-12 shadow-inner border-8 border-brand-clay' },
  { name: 'Earth', class: 'bg-[#3D2C2E] text-white p-12 font-serif' },
  // Modification ici : Texte en blanc pour une meilleure lisibilité sur le orange
  { name: 'Kente', class: 'bg-[#FF9F1C] text-white p-12 shadow-inner border-y-8 border-[#3D2C2E]' },
];

export default function VisualQuoteGenerator({ proverb }: { proverb: Proverb }) {
  const [activePattern, setActivePattern] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (cardRef.current === null) return;
    
    try {
      const dataUrl = await toPng(cardRef.current, { 
        cacheBust: true,
        backgroundColor: '#1A1A1A', // Force un fond pour éviter la transparence blanche
        style: {
          transform: 'scale(1)',
        }
      });
      const link = document.createElement('a');
      link.download = `sagesse-${proverb.originCountryName || 'afrique'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Erreur lors de la génération de l\'image:', err);
    }
  };

  const handleWhatsAppShare = () => {
    const message = `✨ *Sagesse d'Afrique* ✨\n\n"${proverb.text}"\n\n_Sens : ${proverb.translation}_\n\n🌍 Origine : ${proverb.originCountryName}\n\nDécouvre plus de sagesses sur Nzo ya Lisolo !`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 bg-white border-3 border-brand-ink p-8 lg:p-12 shadow-[12px_12px_0px_#1A1A1A] overflow-hidden">
      <div className="space-y-8">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-clay border-2 border-brand-ink flex items-center justify-center text-white brutal-shadow">
                <Wand2 size={24} />
            </div>
            <div>
                <h3 className="text-3xl font-serif font-black italic text-brand-earth tracking-tighter">Générateur de Citations</h3>
                <p className="text-brand-ink/70 text-[10px] font-black uppercase tracking-widest">Créez une image unique instantanément.</p>
            </div>
        </div>

        <motion.div
          ref={cardRef}
          key={activePattern}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "aspect-square border-3 border-brand-ink flex flex-col items-center justify-center text-center relative overflow-hidden shadow-[8px_8px_0px_#1A1A1A]",
            PATTERNS[activePattern].class
          )}
        >
          <Quote size={48} className="opacity-20 mb-8" />
          <h4 className="text-2xl md:text-4xl font-serif italic font-bold leading-tight mb-6 px-8">
            {proverb.text}
          </h4>
          <p className="text-lg opacity-80 mb-8 px-10 font-medium">
            {proverb.translation}
          </p>
          <div className="flex items-center gap-3 pt-6 border-t border-white/20">
            <span className="text-2xl">🌍</span>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Nzo ya Lisolo • {proverb.originCountryName}</span>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col justify-center space-y-8">
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-ink flex items-center gap-2 border-b-2 border-brand-ink pb-2">
            <Palette size={14} /> Choisir un Style
          </p>
          <div className="grid grid-cols-2 gap-3">
            {PATTERNS.map((p, i) => (
              <button
                key={p.name}
                onClick={() => setActivePattern(i)}
                className={cn(
                  "p-4 border-2 transition-all text-left flex flex-col gap-2",
                  activePattern === i 
                    ? "border-brand-ink bg-white shadow-[4px_4px_0px_#1A1A1A] translate-y-[-2px] translate-x-[-2px]" 
                    : "border-stone-200 bg-stone-50 hover:border-brand-ink"
                )}
              >
                <div className={cn("w-full h-8 border border-brand-ink", p.class)} />
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-ink">{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <button 
            onClick={handleDownload}
            className="w-full bg-brand-savannah text-brand-ink border-3 border-brand-ink py-5 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all shadow-[4px_4px_0px_#1A1A1A] active:shadow-none active:translate-y-[2px] active:translate-x-[2px]"
          >
            <Download size={20} />
            Télécharger l'image
          </button>
          
          <button 
            onClick={handleWhatsAppShare}
            className="w-full bg-brand-clay text-white border-3 border-brand-ink py-5 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all shadow-[4px_4px_0px_#1A1A1A] active:shadow-none active:translate-y-[2px] active:translate-x-[2px]"
          >
            <Share2 size={20} />
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}