/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import musicFile from './assets/audio/smile.mp3'; 
import React, { useState, useMemo, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AfricaMap from './components/AfricaMap';
import CategoryGrid from './components/CategoryGrid';
import ProverbCard from './components/ProverbCard';
import VisualQuoteGenerator from './components/VisualQuoteGenerator';
import LoginModal from './components/LoginModal';
import Quiz from './components/Quiz';
import { MOCK_PROVERBS } from './constants';
import { useProverbs } from './hooks/useProverbs'; 
import { Sparkles, Plus, Languages, Baby, Heart, X, Quote, Music2, Instagram, Twitter, ChevronRight, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

export default function App() {
  const { proverbs, loading: isLoadingProverbs } = useProverbs();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('Afrique');
  const [activeTab, setActiveTab] = useState<'all' | 'kids' | 'quiz'>('all');
  const [selectedTheme, setSelectedTheme] = useState<any>(null);
  const [randomProverb, setRandomProverb] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false); 
  const audioRef = useRef<HTMLAudioElement>(null);
  const [displayLimit, setDisplayLimit] = useState(9);
  const [activeFooterModal, setActiveFooterModal] = useState<string | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
    }
    const handleFirstClick = () => {
      if (audioRef.current && !hasInteracted) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true); 
          })
          .catch(() => console.log("Lecture bloquée"));
        window.removeEventListener('click', handleFirstClick);
      }
    };
    if (!hasInteracted) {
      window.addEventListener('click', handleFirstClick);
    }
    return () => window.removeEventListener('click', handleFirstClick);
  }, [hasInteracted]); 

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        setHasInteracted(true); 
      }
      setIsPlaying(!isPlaying);
    }
  };

  const triggerLogin = (message: string) => {
    setLoginMessage(message);
    setIsLoginModalOpen(true);
  };

  const footerModalContent: Record<string, { title: string, body: string }> = {
    confidentialité: { title: "Politique de Confidentialité", body: "..." },
    conditions: { title: "Conditions d'Utilisation", body: "..." },
    propos: { title: "À propos", body: "..." },
    contributeurs: { title: "Contributeurs", body: "..." },
    ressources: { title: "Ressources", body: "..." }
  };

  const filteredProverbs = useMemo(() => {
    const dataSource = proverbs.length > 0 ? proverbs : (MOCK_PROVERBS as any[]);
    let result = dataSource;
    if (activeTab === 'kids') result = result.filter(p => p.isKidFriendly || p.category === 'Enfants');
    if (selectedTheme) result = result.filter(p => (p.themeId === selectedTheme || p.category === selectedTheme));
    if (selectedCountry && selectedCountry !== 'Afrique') {
      result = result.filter(p => {
        const countrySource = p.origin || p.originCountryName || "";
        return countrySource.toLowerCase() === selectedCountry.toLowerCase();
      });
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.text.toLowerCase().includes(q));
    }
    return result;
  }, [proverbs, activeTab, selectedTheme, selectedCountry, searchQuery]);

  const visibleProverbs = useMemo(() => filteredProverbs.slice(0, displayLimit), [filteredProverbs, displayLimit]);

  const handleRandom = () => {
    const dataSource = proverbs.length > 0 ? proverbs : MOCK_PROVERBS;
    setRandomProverb(dataSource[Math.floor(Math.random() * dataSource.length)]);
  };

  return (
    <div className="min-h-screen overflow-x-hidden font-sans text-brand-earth relative">
      <div className="fixed inset-0 z-[-1] bg-cover bg-center bg-fixed" style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.45)), url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1974')` }} />

      <Navbar onSInscrire={() => triggerLogin("...")} onConnexion={() => triggerLogin("...")} searchQuery={searchQuery} onSearch={setSearchQuery} />
      
      <main>
        <Hero onRandom={handleRandom} onContribute={() => triggerLogin("...")} onGenerate={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })} onSelectTheme={(t) => { setSelectedTheme(t === selectedTheme ? null : t); setDisplayLimit(9); }} selectedTheme={selectedTheme} />

        <section id="themes" className="max-w-7xl mx-auto px-4 py-16 bg-white/10 backdrop-blur-[1px] my-8 rounded-3xl">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-4xl font-serif font-black italic tracking-tighter text-brand-ink">{selectedTheme ? `Thème : ${selectedTheme}` : "Sagesses par Thèmes"}</h2>
            {(selectedTheme || searchQuery || selectedCountry !== 'Afrique') && (
              <button onClick={() => { setSelectedTheme(null); setSearchQuery(''); setSelectedCountry('Afrique'); setDisplayLimit(9); }} className="text-[10px] font-black uppercase text-brand-clay mt-4 hover:underline">Réinitialiser les filtres</button>
            )}
          </div>
          <CategoryGrid activeTheme={selectedTheme} onThemeChange={(t: any) => { setSelectedTheme(t); setDisplayLimit(9); }} />
        </section>

        <section className="py-12 bg-white/30 backdrop-blur-sm border-y border-white/20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 px-4">
              <h2 className="text-4xl font-serif font-black italic text-brand-ink">Perles de Sagesse {selectedCountry !== 'Afrique' && `(${selectedCountry})`}</h2>
              <div className="flex items-center gap-4">
                <button onClick={() => triggerLogin("...")} className="px-6 py-3 bg-white border-2 border-brand-ink brutal-shadow"><Heart size={18} /> Favoris</button>
                <button onClick={handleRandom} className="px-6 py-3 bg-brand-ink text-white border-2 border-brand-ink brutal-shadow-clay shadow-brand-clay"><Sparkles size={18} className="text-brand-savannah" /> Aléatoire</button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {isLoadingProverbs ? (
                <div className="flex flex-col items-center py-20 gap-4"><Loader2 className="animate-spin text-brand-clay" size={40} /></div>
              ) : (
                <motion.div key={`${activeTab}-${selectedTheme}-${displayLimit}-${searchQuery}-${selectedCountry}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {visibleProverbs.map((p: any) => (
                    <ProverbCard key={p.id} proverb={{ ...p, originCountryName: p.origin || p.originCountryName, themeId: p.category || p.themeId }} onLike={() => triggerLogin("...")} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {displayLimit < filteredProverbs.length && (
              <div className="mt-16 text-center">
                <button onClick={() => setDisplayLimit(prev => prev + 9)} className="inline-flex items-center gap-3 px-12 py-5 bg-white border-3 border-brand-ink text-brand-ink font-black uppercase tracking-[0.2em] text-xs brutal-shadow">Découvrir plus de sagesses <ChevronRight /></button>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3 : CARTE D'AFRIQUE (CORRIGÉE) */}
        <section id="map" className="max-w-7xl mx-auto px-4 py-16 pb-0">
          <div className="grid lg:grid-cols-[1fr_0.4fr] gap-8">
            <AfricaMap onSelectCountry={(country) => {
              setSelectedCountry(country);
              setDisplayLimit(9);
              // LA LIGNE SCROLLINTOVIEW A ÉTÉ SUPPRIMÉE ICI
            }} />
            <div className="space-y-6 flex flex-col justify-center">
              <div className="p-10 bg-white/90 border-3 border-brand-ink shadow-[8px_8px_0px_#1A1A1A] backdrop-blur-sm">
                <div className="w-12 h-12 bg-brand-savannah border-2 border-brand-ink text-brand-ink flex items-center justify-center mb-4"><Languages size={24} /></div>
                <h3 className="text-xl font-serif font-black italic mb-2">Focus sur: {selectedCountry}</h3>
                <p className="text-brand-ink/70 text-[11px] font-bold uppercase tracking-widest leading-relaxed mb-6">
                  {selectedCountry === 'Afrique' ? "Explorez le continent en cliquant sur un pays." : `Découvrez la richesse du ${selectedCountry}.`}
                </p>
              </div>
              <div onClick={() => triggerLogin("...")} className="p-10 bg-brand-ink text-white border-3 border-brand-ink flex flex-col items-center text-center cursor-pointer shadow-[8px_8px_0px_#B2513B]">
                  <Plus size={40} className="mb-4 text-brand-savannah" />
                  <h4 className="text-xs font-black uppercase tracking-widest">Ajouter une Sagesse</h4>
              </div>
            </div>
          </div>
        </section>

        <section id="generator" className="max-w-7xl mx-auto px-4 py-16">
          <VisualQuoteGenerator proverb={filteredProverbs[0] || MOCK_PROVERBS[0]} />
        </section>

        <section id="kids" className="bg-brand-earth text-white py-16 overflow-hidden">
           <div className="max-w-7xl mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-16 items-center mb-12">
                <div className="space-y-8">
                  <div className="w-16 h-16 bg-brand-savannah text-brand-ink rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_#B2513B]"><Baby size={40} /></div>
                  <h2 className="text-5xl font-serif font-black italic tracking-tighter">Le Coin des Petits Sages</h2>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => setActiveTab('quiz')} className={cn("px-8 py-4 border-2 font-black text-xs uppercase tracking-widest transition-all brutal-shadow", activeTab === 'quiz' ? "bg-brand-savannah text-brand-ink border-brand-ink" : "bg-transparent border-white/20 hover:border-white")}>Défis de Sagesse</button>
                    <button onClick={() => setActiveTab('kids')} className={cn("px-8 py-4 border-2 font-black text-xs uppercase tracking-widest transition-all brutal-shadow", activeTab === 'kids' ? "bg-brand-savannah text-brand-ink border-brand-ink" : "bg-transparent border-white/20 hover:border-white")}>Proverbes Enfantins</button>
                  </div>
                </div>
              </div>
              <AnimatePresence mode="wait">
                {activeTab === 'quiz' ? <motion.div key="kids-quiz" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-2 shadow-[20px_20px_0px_#E2A745] text-brand-ink"><Quiz /></motion.div> : null}
              </AnimatePresence>
           </div>
        </section>
      </main>

      <footer className="bg-white/80 backdrop-blur-md py-16 px-4 border-t border-stone-100 mt-12">
        <div className="max-w-7xl mx-auto mt-12 pt-8 text-center text-stone-400 text-xs">© 2026 Nzo ya Lisolo. Tous droits réservés.</div>
      </footer>

      <audio ref={audioRef} src={musicFile} loop />
      <button onClick={toggleMusic} className={cn("fixed bottom-8 left-8 z-[200] w-12 h-12 rounded-full flex items-center justify-center border-2", isPlaying ? "bg-brand-savannah border-brand-ink text-brand-ink animate-pulse" : "bg-white border-stone-200 text-stone-400")}>
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={15} />}
      </button>

      <AnimatePresence>
        {randomProverb && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setRandomProverb(null)} className="absolute inset-0 bg-brand-ink/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative w-full max-w-2xl bg-white border-4 border-brand-ink p-8 shadow-[16px_16px_0px_#E2A745]">
              <h3 className="text-3xl font-serif font-black italic text-brand-ink leading-tight">"{randomProverb.text}"</h3>
              <button onClick={() => setRandomProverb(null)} className="w-full mt-8 py-4 bg-brand-ink text-white font-black uppercase text-xs">Fermer</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} message={loginMessage} />
    </div>
  );
}