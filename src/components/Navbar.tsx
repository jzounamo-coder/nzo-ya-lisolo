import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Heart, 
  Map as MapIcon, BookOpen, 
  User, Sparkles,
  Baby, Search, LogOut, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onSInscrire?: () => void;
  onConnexion?: () => void;
  searchQuery: string;      
  onSearch: (value: string) => void; 
}

export default function Navbar({ onSInscrire, onConnexion, searchQuery, onSearch }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonction pour gérer la déconnexion proprement
  const handleLogout = async () => {
    try {
      await logout();
      setShowProfileMenu(false);
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Erreur déconnexion:", error);
    }
  };

  const navLinks = [
    { name: 'Explorer', icon: MapIcon, href: '#map' },
    { name: 'Thèmes', icon: BookOpen, href: '#themes' },
    { name: 'Enfants', icon: Baby, href: '#kids' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-4 border-b-3 border-brand-ink",
      isScrolled ? "bg-white shadow-md" : "bg-white"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer flex-shrink-0">
          <div className="w-10 h-10 bg-brand-clay border-2 border-brand-ink flex items-center justify-center text-white brutal-shadow transition-transform group-hover:rotate-12">
            <Sparkles size={24} />
          </div>
          <div className="hidden lg:block">
            <h1 className="font-serif font-black text-2xl leading-none text-brand-clay tracking-tight">Nzo ya Lisolo</h1>
            <p className="text-[10px] uppercase tracking-widest text-brand-ink font-bold opacity-70">Sagesses Africaines</p>
          </div>
        </div>

        {/* --- BARRE DE RECHERCHE CENTRALE --- */}
        <div className="flex-1 max-w-md relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-brand-clay transition-colors" size={18} />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Chercher une sagesse..."
            className="w-full bg-stone-100 border-2 border-brand-ink py-2.5 pl-12 pr-4 font-bold text-[11px] uppercase tracking-widest focus:bg-white focus:shadow-[4px_4px_0px_#1A1A1A] transition-all outline-none"
          />
        </div>

        {/* Desktop Nav - Liens */}
        <div className="hidden md:flex items-center gap-6 flex-shrink-0">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-[11px] font-black text-brand-ink uppercase tracking-wider hover:text-brand-clay transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Actions - LOGIN / PROFILE LOGIC */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {isAuthenticated ? (
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 bg-white border-2 border-brand-ink p-1 pr-3 shadow-[4px_4px_0px_#1A1A1A] hover:translate-y-[-2px] transition-all active:shadow-none active:translate-y-[2px]"
              >
                <img src={user?.avatar} alt="User" className="w-8 h-8 border-r-2 border-brand-ink mr-1" />
                <span className="text-[10px] font-black uppercase tracking-tighter">{user?.name}</span>
                <ChevronDown size={14} className={cn("transition-transform", showProfileMenu && "rotate-180")} />
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-48 bg-white border-3 border-brand-ink shadow-[8px_8px_0px_#1A1A1A] z-[100]"
                  >
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase hover:bg-stone-50 border-b border-brand-ink/10 transition-colors">
                      <User size={16} /> Mon Profil
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} /> Déconnexion
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button 
              onClick={onSInscrire}
              className="flex items-center gap-2 bg-brand-savannah text-brand-ink px-4 sm:px-6 py-2.5 border-2 border-brand-ink rounded-none font-black text-[11px] hover:translate-y-[-2px] hover:translate-x-[-2px] transition-all brutal-shadow active:shadow-none active:translate-y-[2px] active:translate-x-[2px]"
            >
              <User size={18} />
              <span className="hidden sm:inline uppercase">S'INSCRIRE</span>
            </button>
          )}
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-brand-earth"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t-2 border-brand-ink overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="flex items-center gap-4 text-lg font-black uppercase tracking-tighter text-brand-ink py-3 border-b border-stone-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <link.icon size={22} className="text-brand-clay" />
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                {isAuthenticated ? (
                  <button 
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 bg-red-50 text-red-500 py-4 border-2 border-red-500 font-bold uppercase tracking-widest"
                  >
                    <LogOut size={20} />
                    Déconnexion
                  </button>
                ) : (
                  <button 
                    onClick={() => { setIsMenuOpen(false); onSInscrire?.(); }}
                    className="flex items-center justify-center gap-2 bg-brand-savannah text-brand-ink py-4 border-2 border-brand-ink font-bold uppercase tracking-widest brutal-shadow"
                  >
                    <User size={20} />
                    S'inscrire
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}