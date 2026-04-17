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
import { supabase } from './lib/supabase'; // Import corrigé selon ton arborescence
import { Sparkles, Plus, Languages, Baby, Heart, X, Quote, Music2, Instagram, Twitter, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

export default function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('Afrique');
  const [activeTab, setActiveTab] = useState<'all' | 'kids' | 'quiz'>('all');
  const [selectedTheme, setSelectedTheme] = useState<any>(null);
  const [randomProverb, setRandomProverb] = useState<any>(null);
  
  const [proverbs, setProverbs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false); 
  const audioRef = useRef<HTMLAudioElement>(null);
  const [displayLimit, setDisplayLimit] = useState(9);
  const [activeFooterModal, setActiveFooterModal] = useState<string | null>(null);

  useEffect(() => {
    const fetchProverbs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('proverbs')
        .select('*');

      if (error) {
        console.error("Erreur Supabase:", error.message);
      } else if (data) {
        setProverbs(data);
      }
      setLoading(false);
    };

    fetchProverbs();
  }, []);

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
    confidentialité: { title: "Politique de Confidentialité", body: "Chez Nzo ya Lisolo, nous respectons votre vie privée." },
    conditions: { title: "Conditions d'Utilisation", body: "Le contenu est destiné à la préservation du patrimoine." },
    propos: { title: "À propos", body: "Nzo ya Lisolo est une bibliothèque numérique interactive." },
    contributeurs: { title: "Contributeurs", body: "Ce projet vit grâce aux passionnés." },
    ressources: { title: "Ressources", body: "Nous mettons à disposition des lexiques linguistiques." }
  };

  // LOGIQUE DE FILTRAGE : Correction des espaces et majuscules pour les pays
  const filteredProverbs = useMemo(() => {
    let result = activeTab === 'kids' 
      ? proverbs.filter(p => p.isKidFriendly)
      : proverbs;

    if (selectedTheme) {
      result = result.filter(p => p.category === selectedTheme || p.themeId === selectedTheme);
    }

    if (selectedCountry !== 'Afrique') {
      result = result.filter(p => 
        (p.origin || "").trim().toLowerCase() === selectedCountry.toLowerCase()
      );
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.text?.toLowerCase().includes(q) || 
        p.translation?.toLowerCase().includes(q) ||
        p.origin?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeTab, selectedTheme, searchQuery, selectedCountry, proverbs]);

  // FOCUS PAYS : Correction pour trouver les proverbes malgré les espaces/majuscules
  const countryFocusProverb = useMemo(() => {
    if (selectedCountry === 'Afrique') return null;
    return proverbs.find(p => 
      (p.origin || "").trim().toLowerCase() === selectedCountry.toLowerCase()
    );
  }, [selectedCountry, proverbs]);

  const visibleProverbs = useMemo(() => {
    return filteredProverbs.slice(0, displayLimit);
  }, [filteredProverbs, displayLimit]);

  const handleRandom = () => {
    if (proverbs.length > 0) {
      const random = proverbs[Math.floor(Math.random() * proverbs.length)];
      setRandomProverb(random);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden font-sans text-brand-earth relative">
      <div 
        className="fixed inset-0 z-[-1] bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.45)), url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1974')` }}
      />

      <Navbar 
        onSInscrire={() => triggerLogin("Rejoins la communauté !")} 
        onConnexion={() => triggerLogin("Ravi de te revoir !")}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />
      
      <main>
        <Hero 
          onRandom={handleRandom}
          onContribute={() => triggerLogin("Partage ta sagesse !")}
          onGenerate={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
          onSelectTheme={(t) => {
            setSelectedTheme(t === selectedTheme ? null : t);
            setDisplayLimit(9);
          }}
          selectedTheme={selectedTheme}
        />

        <section id="themes" className="max-w-7xl mx-auto px-4 py-16 bg-white/10 backdrop-blur-[1px] my-8 rounded-3xl">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-4xl font-serif font-black italic tracking-tighter text-brand-ink">
              {selectedTheme ? `Thème : ${selectedTheme}` : "Sagesses par Thèmes"}
            </h2>
            <div className="w-24 h-[3px] bg-brand-clay mx-auto" />
            {(selectedTheme || searchQuery || selectedCountry !== 'Afrique') && (
              <button 
                onClick={() => {
                  setSelectedTheme(null);
                  setSearchQuery('');
                  setSelectedCountry('Afrique');
                  setDisplayLimit(9);
                }}
                className="text-[10px] font-black uppercase text-brand-clay mt-4 hover:underline"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
          <CategoryGrid activeTheme={selectedTheme} onThemeChange={(t: any) => {
            setSelectedTheme(t);
            setDisplayLimit(9);
          }} />
        </section>

        <section className="py-12 bg-white/30 backdrop-blur-sm border-y border-white/20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 px-4">
              <div className="space-y-2">
                <h2 className="text-4xl font-serif font-black italic text-brand-ink">
                  Perles de Sagesse {selectedCountry !== 'Afrique' && `(${selectedCountry})`}
                </h2>
                <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-stone-600">
                  <button onClick={() => { setActiveTab('all'); setDisplayLimit(9); }} className={activeTab === 'all' ? 'text-brand-clay border-b-2 border-brand-clay pb-1' : ''}>
                    Tout ({filteredProverbs.length})
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => triggerLogin("Connecte-toi !")} className="px-6 py-3 bg-white border-2 border-brand-ink text-brand-ink font-black text-[10px] uppercase tracking-widest hover:bg-stone-100 flex items-center gap-2 brutal-shadow">
                  <Heart size={18} /> Favoris
                </button>
                <button onClick={handleRandom} className="px-6 py-3 bg-brand-ink text-white border-2 border-brand-ink font-black text-[10px] uppercase tracking-widest hover:translate-y-[-2px] flex items-center gap-2 brutal-shadow-clay shadow-brand-clay">
                  <Sparkles size={18} className="text-brand-savannah" /> Aléatoire
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {loading ? (
                <div className="text-center py-20 font-black uppercase text-brand-clay">Chargement...</div>
              ) : visibleProverbs.length > 0 ? (
                <motion.div key={`${activeTab}-${selectedTheme}-${displayLimit}-${searchQuery}-${selectedCountry}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {visibleProverbs.map((p: any) => (
                    <ProverbCard key={p.id} proverb={p} onLike={() => triggerLogin("Liker !")} />
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-20 bg-white/60 border-4 border-dashed border-white rounded-3xl">
                  <p className="text-xl font-serif italic text-brand-ink/60 mb-4">Aucune sagesse trouvée...</p>
                  <button onClick={() => {setSearchQuery(''); setSelectedCountry('Afrique');}} className="text-xs font-black uppercase text-brand-clay underline">Effacer</button>
                </div>
              )}
            </AnimatePresence>

            {!loading && displayLimit < filteredProverbs.length && (
              <div className="mt-16 text-center">
                <button onClick={() => setDisplayLimit(filteredProverbs.length)} className="inline-flex items-center gap-3 px-12 py-5 bg-white border-3 border-brand-ink text-brand-ink font-black uppercase tracking-[0.2em] text-xs hover:bg-brand-savannah transition-all brutal-shadow">
                  Découvrir toute la bibliothèque <ChevronRight />
                </button>
              </div>
            )}
          </div>
        </section>

        <section id="map" className="max-w-7xl mx-auto px-4 py-16 pb-0">
          <div className="grid lg:grid-cols-[1fr_0.4fr] gap-8">
            {/* CORRECTION : On enlève le setDisplayLimit qui causait le saut de page */}
            <AfricaMap onSelectCountry={(country) => setSelectedCountry(country)} />
            
            <div className="space-y-6 flex flex-col justify-center">
              <div className="p-10 bg-white/90 border-3 border-brand-ink shadow-[8px_8px_0px_#1A1A1A] backdrop-blur-sm min-h-[300px] flex flex-col justify-center">
                <div className="w-12 h-12 bg-brand-savannah border-2 border-brand-ink text-brand-ink flex items-center justify-center mb-4">
                  <Languages size={24} />
                </div>
                <h3 className="text-xl font-serif font-black italic mb-2">Focus sur: {selectedCountry}</h3>
                <AnimatePresence mode="wait">
                  {selectedCountry === 'Afrique' ? (
                    <motion.p key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-brand-ink/70 text-[11px] font-bold uppercase tracking-widest">
                      Explorez le continent en cliquant sur un pays.
                    </motion.p>
                  ) : countryFocusProverb ? (
                    <motion.div key={countryFocusProverb.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                      <p className="text-2xl font-serif font-black italic text-brand-ink leading-tight">"{countryFocusProverb.text}"</p>
                      <div className="pt-4 border-t border-brand-ink/10">
                        <p className="text-[10px] font-black uppercase text-brand-clay">Traduction & Sens :</p>
                        <p className="text-sm font-medium italic text-brand-ink/70">{countryFocusProverb.translation}</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.p key="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-stone-400 text-[10px] font-bold uppercase italic">
                      Aucun proverbe pour ce pays. Soyez le premier !
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div onClick={() => triggerLogin("Connecte-toi !")} className="p-10 bg-brand-ink text-white border-3 border-brand-ink flex flex-col items-center text-center cursor-pointer hover:bg-stone-800 transition-all shadow-[8px_8px_0px_#B2513B]">
                  <Plus size={40} className="mb-4 text-brand-savannah" />
                  <h4 className="text-xs font-black uppercase tracking-widest">Ajouter une Sagesse</h4>
              </div>
            </div>
          </div>
        </section>

        <section id="generator" className="max-w-7xl mx-auto px-4 py-16">
          <VisualQuoteGenerator proverb={filteredProverbs[0] || proverbs[0]} />
        </section>

        <section id="kids" className="bg-brand-earth text-white py-16">
           <div className="max-w-7xl mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-16 items-center mb-12">
                <div className="space-y-8">
                  <div className="w-16 h-16 bg-brand-savannah text-brand-ink rounded-2xl flex items-center justify-center"><Baby size={40} /></div>
                  <h2 className="text-5xl font-serif font-black italic">Le Coin des Petits Sages</h2>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => setActiveTab('quiz')} className={cn("px-8 py-4 border-2 font-black text-xs uppercase tracking-widest", activeTab === 'quiz' ? "bg-brand-savannah text-brand-ink border-brand-ink" : "border-white/20")}>Défis de Sagesse</button>
                    <button onClick={() => setActiveTab('kids')} className={cn("px-8 py-4 border-2 font-black text-xs uppercase tracking-widest", activeTab === 'kids' ? "bg-brand-savannah text-brand-ink border-brand-ink" : "border-white/20")}>Proverbes Enfantins</button>
                  </div>
                </div>
                <img src="https://i.pinimg.com/736x/48/ad/f8/48adf8ea2dc9efc846060f4ead9ee8e8.jpg" alt="Kids" className="rounded-[3rem] w-full object-cover shadow-2xl" />
              </div>
              <AnimatePresence mode="wait">
                {activeTab === 'quiz' ? (
                  <motion.div key="kids-quiz" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-2 text-brand-ink"><Quiz /></motion.div>
                ) : activeTab === 'kids' ? (
                  <motion.div key="kids-proverbs" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-3 gap-8">
                    {proverbs.filter(p => p.isKidFriendly).slice(0, 3).map((p: any) => (
                      <div key={p.id} className="bg-white text-brand-ink p-8 border-3 border-brand-ink shadow-[8px_8px_0px_#E2A745]">
                        <Quote className="text-brand-savannah mb-4" size={32} fill="currentColor" />
                        <h4 className="text-xl font-serif font-black italic mb-4 leading-tight">"{p.text}"</h4>
                        <p className="text-xs font-bold text-stone-500 uppercase">Moralité : {p.translation}</p>
                      </div>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
           </div>
        </section>
      </main>

      <footer className="bg-white/80 backdrop-blur-md py-16 px-4 border-t border-stone-100 mt-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-center md:text-left">
          <div className="col-span-2 space-y-6">
            <h2 className="font-display font-bold text-2xl text-brand-ink">Nzo ya Lisolo</h2>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"><Music2 size={18} /></a>
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"><Instagram size={18} /></a>
            </div>
          </div>
          <div>
            <h4 className="font-black uppercase text-[10px] tracking-widest mb-6 text-stone-400">Le Village</h4>
            <ul className="space-y-4 text-sm text-stone-600 font-medium">
              <li className="cursor-pointer" onClick={() => setActiveFooterModal('propos')}>À propos</li>
              <li className="cursor-pointer" onClick={() => setActiveFooterModal('contributeurs')}>Contributeurs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase text-[10px] tracking-widest mb-6 text-stone-400">Légal</h4>
            <ul className="space-y-4 text-sm text-stone-600 font-medium">
              <li className="cursor-pointer" onClick={() => setActiveFooterModal('confidentialité')}>Confidentialité</li>
            </ul>
          </div>
        </div>
      </footer>

      <audio ref={audioRef} src={musicFile} loop />
      <button onClick={toggleMusic} className={cn("fixed bottom-8 left-8 z-[200] w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-2xl border-2", isPlaying ? "bg-brand-savannah border-brand-ink text-brand-ink animate-pulse" : "bg-white border-stone-200 text-stone-400")}>
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={15} />}
      </button>

      <AnimatePresence>
        {randomProverb && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setRandomProverb(null)} className="absolute inset-0 bg-brand-ink/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative w-full max-w-2xl bg-white border-4 border-brand-ink p-8 shadow-[16px_16px_0px_#E2A745]">
              <button onClick={() => setRandomProverb(null)} className="absolute top-4 right-4"><X size={32} /></button>
              <h3 className="text-3xl md:text-5xl font-serif font-black italic text-brand-ink leading-tight">"{randomProverb.text}"</h3>
              <p className="mt-4 text-brand-ink/70 font-medium italic">{randomProverb.translation}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} message={loginMessage} />
    </div>
  );
}