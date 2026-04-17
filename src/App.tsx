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
import { useProverbs } from './hooks/useProverbs'; // --- AJOUT DU HOOK ---
import { Sparkles, Plus, Languages, Baby, Heart, X, Quote, Music2, Instagram, Twitter, ChevronRight, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

export default function App() {
  // --- RÉCUPÉRATION DES DONNÉES SUPABASE ---
  const { proverbs, loading: isLoadingProverbs } = useProverbs();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('Afrique');
  const [activeTab, setActiveTab] = useState<'all' | 'kids' | 'quiz'>('all');
  const [selectedTheme, setSelectedTheme] = useState<any>(null);
  const [randomProverb, setRandomProverb] = useState<any>(null);
  
  // --- ÉTAT DE RECHERCHE ---
  const [searchQuery, setSearchQuery] = useState('');

  // --- ÉTAT AUDIO ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false); 
  const audioRef = useRef<HTMLAudioElement>(null);

  // --- ÉTAT POUR LA LIMITE D'AFFICHAGE ---
  const [displayLimit, setDisplayLimit] = useState(9);

  // --- ÉTAT POUR LES MODALES DU FOOTER ---
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
          .catch(() => console.log("Lecture bloquée par le navigateur"));
        
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

  // --- LOGIQUE DE FILTRAGE MISE À JOUR POUR SUPABASE ---
  const filteredProverbs = useMemo(() => {
    // On utilise les proverbes de Supabase s'ils sont chargés, sinon le Mock par sécurité
    const dataSource = proverbs.length > 0 ? proverbs : (MOCK_PROVERBS as any[]);
    
    let result = activeTab === 'kids' 
      ? dataSource.filter(p => p.isKidFriendly || p.category === 'Enfants')
      : dataSource;

    if (selectedTheme) {
      result = result.filter(p => (p.themeId === selectedTheme || p.category === selectedTheme));
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
  }, [proverbs, activeTab, selectedTheme, searchQuery]);

  const visibleProverbs = useMemo(() => {
    return filteredProverbs.slice(0, displayLimit);
  }, [filteredProverbs, displayLimit]);

  const handleRandom = () => {
    const dataSource = proverbs.length > 0 ? proverbs : MOCK_PROVERBS;
    const random = dataSource[Math.floor(Math.random() * dataSource.length)];
    setRandomProverb(random);
  };

  return (
    <div className="min-h-screen overflow-x-hidden font-sans text-brand-earth relative">
      
      {/* BACKGROUND AFRICAIN - HAUTE VISIBILITÉ */}
      <div 
        className="fixed inset-0 z-[-1] bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.45)), url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1974')` 
        }}
      />

    <Navbar 
        onSInscrire={() => triggerLogin("Rejoins la communauté pour partager tes propres sagesses !")} 
        onConnexion={() => triggerLogin("Ravi de te revoir ! Connecte-toi pour accéder à ton espace.")}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />
      
      <main>
        <Hero 
          onRandom={handleRandom}
          onContribute={() => triggerLogin("Partage ta sagesse avec le village !")}
          onGenerate={() => {
            const genSection = document.getElementById('generator');
            genSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          onSelectTheme={(t) => {
            setSelectedTheme(t === selectedTheme ? null : t);
            setDisplayLimit(9);
          }}
          selectedTheme={selectedTheme}
        />

        {/* SECTION 1 : THÈMES */}
        <section id="themes" className="max-w-7xl mx-auto px-4 py-16 bg-white/10 backdrop-blur-[1px] my-8 rounded-3xl">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-4xl font-serif font-black italic tracking-tighter text-brand-ink">
              {selectedTheme ? `Thème : ${selectedTheme}` : "Sagesses par Thèmes"}
            </h2>
            <div className="w-24 h-[3px] bg-brand-clay mx-auto" />
            {(selectedTheme || searchQuery) && (
              <button 
                onClick={() => {
                  setSelectedTheme(null);
                  setSearchQuery('');
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

        {/* SECTION 2 : PERLES DE SAGESSE */}
        <section className="py-12 bg-white/30 backdrop-blur-sm border-y border-white/20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 px-4">
              <div className="space-y-2">
                <h2 className="text-4xl font-serif font-black italic text-brand-ink">
                  Perles de Sagesse
                </h2>
                <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-stone-600">
                  <button 
                    onClick={() => { setActiveTab('all'); setDisplayLimit(9); }} 
                    className={activeTab === 'all' ? 'text-brand-clay border-b-2 border-brand-clay pb-1' : 'hover:text-brand-ink'}
                  >
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
              {isLoadingProverbs ? (
                <div className="flex flex-col items-center py-20 gap-4">
                   <Loader2 className="animate-spin text-brand-clay" size={40} />
                   <p className="text-[10px] font-black uppercase tracking-widest">Récupération des sagesses...</p>
                </div>
              ) : visibleProverbs.length > 0 ? (
                <motion.div 
                  key={`${activeTab}-${selectedTheme}-${displayLimit}-${searchQuery}`} 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }} 
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {visibleProverbs.map((p: any) => (
                    <ProverbCard 
                      key={p.id} 
                      proverb={{
                        ...p,
                        originCountryName: p.origin || p.originCountryName,
                        themeId: p.category || p.themeId
                      }} 
                      onLike={() => triggerLogin("Liker !")} 
                    />
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-20 bg-white/60 border-4 border-dashed border-white rounded-3xl backdrop-blur-md">
                  <p className="text-xl font-serif italic text-brand-ink/60 mb-4">Aucune sagesse ne correspond à votre recherche...</p>
                  <button onClick={() => setSearchQuery('')} className="text-xs font-black uppercase text-brand-clay underline">Effacer la recherche</button>
                </div>
              )}
            </AnimatePresence>

            {displayLimit < filteredProverbs.length && (
              <div className="mt-16 text-center">
                <button 
                  onClick={() => setDisplayLimit(prev => prev + 9)}
                  className="group relative inline-flex items-center gap-3 px-12 py-5 bg-white border-3 border-brand-ink text-brand-ink font-black uppercase tracking-[0.2em] text-xs hover:bg-brand-savannah transition-all brutal-shadow"
                >
                  Découvrir plus de sagesses
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3 : CARTE D'AFRIQUE */}
        <section id="map" className="max-w-7xl mx-auto px-4 py-16 pb-0">
          <div className="grid lg:grid-cols-[1fr_0.4fr] gap-8">
            <AfricaMap onSelectCountry={setSelectedCountry} />
            <div className="space-y-6 flex flex-col justify-center">
              <div className="p-10 bg-white/90 border-3 border-brand-ink shadow-[8px_8px_0px_#1A1A1A] backdrop-blur-sm">
                <div className="w-12 h-12 bg-brand-savannah border-2 border-brand-ink text-brand-ink flex items-center justify-center mb-4">
                  <Languages size={24} />
                </div>
                <h3 className="text-xl font-serif font-black italic mb-2">Focus sur: {selectedCountry}</h3>
                <p className="text-brand-ink/70 text-[11px] font-bold uppercase tracking-widest leading-relaxed mb-6">
                  {selectedCountry === 'Afrique' 
                    ? "Explorez le continent en cliquant sur un pays pour découvrir ses perles de sagesse locales."
                    : `Découvrez la richesse linguistique et culturelle du ${selectedCountry} à travers ses proverbes ancestraux.`}
                </p>
              </div>
              <div onClick={() => triggerLogin("Connecte-toi pour voter pour des proverbes !")} className="p-10 bg-brand-ink text-white border-3 border-brand-ink flex flex-col items-center text-center cursor-pointer hover:bg-stone-800 transition-all shadow-[8px_8px_0px_#B2513B]">
                  <Plus size={40} className="mb-4 text-brand-savannah" />
                  <h4 className="text-xs font-black uppercase tracking-widest leading-none">Ajouter une Sagesse</h4>
                  <p className="text-stone-400 text-[10px] font-bold mt-2 tracking-widest">PARTAGE TON VILLAGE</p>
              </div>
            </div>
          </div>
        </section>

        {/* GENERATEUR */}
        <section id="generator" className="max-w-7xl mx-auto px-4 py-16">
          <VisualQuoteGenerator proverb={filteredProverbs[0] || MOCK_PROVERBS[0]} />
        </section>

        {/* SECTION 4 : LE COIN DES ENFANTS */}
        <section id="kids" className="bg-brand-earth text-white py-16 overflow-hidden">
           <div className="max-w-7xl mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-16 items-center mb-12">
                <div className="space-y-8">
                  <div className="w-16 h-16 bg-brand-savannah text-brand-ink rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_#B2513B]">
                    <Baby size={40} />
                  </div>
                  <h2 className="text-5xl font-serif font-black italic tracking-tighter">Le Coin des Petits Sages</h2>
                  <p className="text-stone-300 text-lg leading-relaxed">Apprendre la vie en s'amusant. Relève les défis du village ou découvre des paroles douces pour bien grandir.</p>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => setActiveTab('quiz')} className={cn("px-8 py-4 border-2 font-black text-xs uppercase tracking-widest transition-all brutal-shadow", activeTab === 'quiz' ? "bg-brand-savannah text-brand-ink border-brand-ink" : "bg-transparent border-white/20 hover:border-white")}>Défis de Sagesse</button>
                    <button onClick={() => setActiveTab('kids')} className={cn("px-8 py-4 border-2 font-black text-xs uppercase tracking-widest transition-all brutal-shadow", activeTab === 'kids' ? "bg-brand-savannah text-brand-ink border-brand-ink" : "bg-transparent border-white/20 hover:border-white")}>Proverbes Enfantins</button>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-4 bg-brand-savannah/20 rounded-[3rem] blur-2xl group-hover:bg-brand-savannah/30 transition-all" />
                  <img src="https://i.pinimg.com/736x/48/ad/f8/48adf8ea2dc9efc846060f4ead9ee8e8.jpg" alt="Kids" className="relative rounded-[3rem] w-full aspect-video object-cover shadow-2xl border-4 border-white/10" />
                </div>
              </div>
              <AnimatePresence mode="wait">
                {activeTab === 'quiz' ? (
                  <motion.div key="kids-quiz" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="bg-white rounded-3xl p-2 shadow-[20px_20px_0px_#E2A745] text-brand-ink"><Quiz /></motion.div>
                ) : activeTab === 'kids' ? (
                  <motion.div key="kids-proverbs" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="grid md:grid-cols-3 gap-8">
                    {filteredProverbs.filter(p => p.isKidFriendly || p.category === 'Enfants').slice(0, 3).map((p: any) => (
                      <div key={p.id} className="bg-white text-brand-ink p-8 border-3 border-brand-ink shadow-[8px_8px_0px_#E2A745] flex flex-col justify-center min-h-[250px]">
                        <Quote className="text-brand-savannah mb-4" size={32} fill="currentColor" />
                        <h4 className="text-xl font-serif font-black italic mb-4 leading-tight">"{p.text}"</h4>
                        <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Moralité : {p.translation}</p>
                      </div>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
           </div>
        </section>
      </main>

      <footer className="bg-white/80 backdrop-blur-md py-16 px-4 border-t border-stone-100 mt-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-6">
            <h2 className="font-display font-bold text-2xl text-brand-ink">Nzo ya Lisolo</h2>
            <p className="text-stone-500 max-w-sm">La plus grande bibliothèque numérique dédiée à la préservation et au partage des sagesses africaines.</p>
            <div className="flex gap-4">
              <a href="https://www.tiktok.com/@toncompte" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-stone-600 hover:bg-black hover:text-white transition-all shadow-sm"><Music2 size={18} /></a>
              <a href="https://www.instagram.com/toncompte" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-stone-600 hover:bg-[#E1306C] hover:text-white transition-all shadow-sm"><Instagram size={18} /></a>
              <a href="https://twitter.com/toncompte" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-stone-600 hover:bg-[#1DA1F2] hover:text-white transition-all shadow-sm"><Twitter size={18} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-black uppercase text-[10px] tracking-widest mb-6 text-stone-400">Le Village</h4>
            <ul className="space-y-4 text-sm text-stone-600 font-medium">
              <li className="hover:text-brand-clay cursor-pointer" onClick={() => setActiveFooterModal('propos')}>À propos</li>
              <li className="hover:text-brand-clay cursor-pointer" onClick={() => setActiveFooterModal('contributeurs')}>Contributeurs</li>
              <li className="hover:text-brand-clay cursor-pointer" onClick={() => setActiveFooterModal('ressources')}>Ressources</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase text-[10px] tracking-widest mb-6 text-stone-400">Légal</h4>
            <ul className="space-y-4 text-sm text-stone-600 font-medium">
              <li className="hover:text-brand-clay cursor-pointer" onClick={() => setActiveFooterModal('confidentialité')}>Confidentialité</li>
              <li className="hover:text-brand-clay cursor-pointer" onClick={() => setActiveFooterModal('conditions')}>Conditions</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-stone-50 text-center text-stone-400 text-xs">© 2026 Nzo ya Lisolo. Tous droits réservés.</div>
      </footer>

      <audio ref={audioRef} src={musicFile} loop />
      <button 
        onClick={toggleMusic}
        className={cn(
          "fixed bottom-8 left-8 z-[200] w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl border-2",
          isPlaying 
            ? "bg-brand-savannah border-brand-ink text-brand-ink animate-pulse" 
            : "bg-white border-stone-200 text-stone-400 hover:text-brand-ink"
        )}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={15} />}
      </button>

      <AnimatePresence>
        {randomProverb && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setRandomProverb(null)} className="absolute inset-0 bg-brand-ink/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-2xl bg-white border-4 border-brand-ink p-8 md:p-12 shadow-[16px_16px_0px_#E2A745]">
              <button onClick={() => setRandomProverb(null)} className="absolute top-4 right-4 text-brand-ink hover:rotate-90 transition-transform"><X size={32} /></button>
              <div className="text-brand-savannah mb-6"><Quote size={48} fill="currentColor" /></div>
              <div className="space-y-6">
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-brand-ink text-white text-[10px] font-black uppercase tracking-widest">{randomProverb.themeId || randomProverb.category}</span>
                  <span className="px-3 py-1 border-2 border-brand-ink text-brand-ink text-[10px] font-black uppercase tracking-widest">{randomProverb.originCountryName || randomProverb.origin}</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-serif font-black italic text-brand-ink leading-tight">"{randomProverb.text}"</h3>
                <div className="pt-6 border-t-2 border-brand-ink/10">
                  <p className="text-brand-clay font-bold text-lg mb-2">Traduction & Sens :</p>
                  <p className="text-brand-ink/70 font-medium italic">{randomProverb.translation}</p>
                </div>
                <button onClick={() => setRandomProverb(null)} className="w-full mt-8 py-4 bg-brand-ink text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-brand-clay transition-colors">Fermer la sagesse</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeFooterModal && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveFooterModal(null)} className="absolute inset-0 bg-brand-ink/60 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-lg bg-white rounded-[2rem] p-10 shadow-2xl border-2 border-stone-100">
              <button onClick={() => setActiveFooterModal(null)} className="absolute top-6 right-6 text-stone-400 hover:text-brand-ink transition-colors"><X size={24} /></button>
              <h3 className="text-3xl font-serif font-black italic text-brand-ink mb-6">{footerModalContent[activeFooterModal].title}</h3>
              <p className="text-stone-600 leading-relaxed text-lg mb-8">{footerModalContent[activeFooterModal].body}</p>
              <button onClick={() => setActiveFooterModal(null)} className="w-full py-4 bg-brand-ink text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-clay transition-all active:scale-95">J'ai compris</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} message={loginMessage} />
    </div>
  );
}