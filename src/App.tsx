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
    confidentialité: {
      title: "Politique de Confidentialité",
      body: "Chez Nzo ya Lisolo, nous respectons votre vie privée. Aucune donnée personnelle n'est collectée sans votre consentement explicite. Vos favoris sont enregistrés localement pour votre confort."
    },
    conditions: {
      title: "Conditions d'Utilisation",
      body: "Le contenu partagé sur cette plateforme est destiné à la préservation et à la célébration du patrimoine culturel africain. L'usage commercial des textes sans autorisation est interdit."
    },
    propos: {
      title: "À propos de Nzo ya Lisolo",
      body: "Nzo ya Lisolo (La Maison du Dialogue) est une bibliothèque numérique interactive conçue pour transmettre la richesse des proverbes africains aux nouvelles générations."
    },
    contributeurs: {
      title: "Le Cercle des Contributeurs",
      body: "Ce projet vit grâce aux passionnés, linguistes et sages du village global qui partagent leurs connaissances pour enrichir notre base de données commune."
    },
    ressources: {
      title: "Ressources & Archives",
      body: "Nous mettons à disposition des lexiques linguistiques et des guides pédagogiques pour ceux qui souhaitent approfondir l'étude des sagesses ancestrales."
    }
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
      result = result.filter(p => 
        p.text.toLowerCase().includes(q) || 
        (p.translation && p.translation.toLowerCase().includes(q)) ||
        (p.origin && p.origin.toLowerCase().includes(q))
      );
    }
    return result;
  }, [proverbs, activeTab, selectedTheme, selectedCountry, searchQuery]);

  const visibleProverbs = useMemo(() => filteredProverbs.slice(0, displayLimit), [filteredProverbs, displayLimit]);

  const handleRandom = () => {
    const dataSource = proverbs.length > 0 ? proverbs : MOCK_PROVERBS;
    const random = dataSource[Math.floor(Math.random() * dataSource.length)];
    setRandomProverb(random);
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
              </div>
            </div>

            <AnimatePresence mode="wait">
              {isLoadingProverbs ? (
                <div className="flex flex-col items-center py-20 gap-4">
                   <Loader2 className="animate-spin text-brand-clay" size={40} />
                </div>
              ) : (
                <motion.div 
                  key={`${activeTab}-${selectedTheme}-${displayLimit}-${searchQuery}-${selectedCountry}`} 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {visibleProverbs.map((p: any) => (
                    <ProverbCard 
                      key={p.id} 
                      proverb={{...p, originCountryName: p.origin || p.originCountryName, themeId: p.category || p.themeId}} 
                      onLike={() => triggerLogin("Liker !")} 
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* SECTION 3 : CARTE D'AFRIQUE (CORRIGÉE SANS SCROLL) */}
        <section id="map" className="max-w-7xl mx-auto px-4 py-16 pb-0">
          <div className="grid lg:grid-cols-[1fr_0.4fr] gap-8">
            <AfricaMap onSelectCountry={(country) => {
              setSelectedCountry(country);
              setDisplayLimit(9);
              // LA LIGNE DE SCROLL A ÉTÉ DÉFINITIVEMENT SUPPRIMÉE ICI
            }} />
            <div className="space-y-6 flex flex-col justify-center">
              <div className="p-10 bg-white/90 border-3 border-brand-ink shadow-[8px_8px_0px_#1A1A1A] backdrop-blur-sm">
                <div className="w-12 h-12 bg-brand-savannah border-2 border-brand-ink text-brand-ink flex items-center justify-center mb-4">
                  <Languages size={24} />
                </div>
                <h3 className="text-xl font-serif font-black italic mb-2">Focus sur: {selectedCountry}</h3>
                <p className="text-brand-ink/70 text-[11px] font-bold uppercase tracking-widest leading-relaxed mb-6">
                  {selectedCountry === 'Afrique' 
                    ? "Explorez le continent en cliquant sur un pays."
                    : `Découvrez la richesse du ${selectedCountry}.`}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="generator" className="max-w-7xl mx-auto px-4 py-16">
          <VisualQuoteGenerator proverb={filteredProverbs[0] || MOCK_PROVERBS[0]} />
        </section>
      </main>

      <footer className="bg-white/80 backdrop-blur-md py-16 px-4 border-t border-stone-100 mt-12">
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-stone-50 text-center text-stone-400 text-xs">© 2026 Nzo ya Lisolo.</div>
      </footer>

      <audio ref={audioRef} src={musicFile} loop />
      <button 
        onClick={toggleMusic}
        className={cn("fixed bottom-8 left-8 z-[200] w-12 h-12 rounded-full flex items-center justify-center border-2", isPlaying ? "bg-brand-savannah border-brand-ink" : "bg-white border-stone-200")}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={15} />}
      </button>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} message={loginMessage} />
    </div>
  );
}