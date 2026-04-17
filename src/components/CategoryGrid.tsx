import React from 'react';
import { cn } from '../lib/utils';
import { Users, Shield, Lightbulb, Heart, BadgeDollarSign, Scale } from 'lucide-react';

export default function CategoryGrid({ activeTheme, onThemeChange }: any) {
  const categories = [
    { id: 'Famille & Communauté', label: 'FAMILLE', icon: Users, color: 'bg-emerald-50' },
    { id: 'Courage & Persévérance', label: 'COURAGE', icon: Shield, color: 'bg-orange-5a0' },
    { id: 'Sagesse & Patience', label: 'SAGESSE', icon: Lightbulb, color: 'bg-amber-50' },
    { id: 'Amour & Relations', label: 'AMOUR', icon: Heart, color: 'bg-rose-50' },
    { id: 'Argent & Travail', label: 'TRAVAIL', icon: BadgeDollarSign, color: 'bg-green-50' },
    { id: 'Justice & Vérité', label: 'JUSTICE', icon: Scale, color: 'bg-stone-800' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onThemeChange(cat.id)} // Envoie l'ID exact à App.tsx
          className={cn(
            "p-6 border-2 border-brand-ink flex flex-col items-center gap-4 transition-all brutal-shadow",
            activeTheme === cat.id ? "bg-brand-clay text-white shadow-none translate-x-1 translate-y-1" : "bg-white hover:bg-stone-50"
          )}
        >
          <div className={cn("w-12 h-12 flex items-center justify-center border-2 border-brand-ink shadow-[4px_4px_0px_#1A1A1A]", cat.color)}>
            <cat.icon size={24} className={activeTheme === cat.id ? "text-brand-ink" : "text-brand-ink"} />
          </div>
          <span className="text-[10px] font-black uppercase text-center leading-tight">
            {cat.label}
          </span>
        </button>
      ))}
    </div>
  );
}