import React from 'react';
import { LogIn, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext'; // Import du hook

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export default function LoginModal({ isOpen, onClose, message }: LoginModalProps) {
  const { login } = useAuth(); // Récupération de la fonction login

  const handleGoogleLogin = () => {
    // On simule une connexion avec un email fictif pour le test
    login("voyageur@nzoyalisolo.com");
    onClose(); // On ferme la modale après la connexion
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Overlay avec flou */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-ink/60 backdrop-blur-sm"
          />

          {/* Contenu de la Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white border-4 border-brand-ink p-10 shadow-[16px_16px_0px_#1A1A1A] overflow-hidden"
          >
            {/* Bouton Fermer */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-brand-ink border-2 border-brand-ink hover:bg-stone-100 transition-all active:scale-95"
            >
              <X size={20} />
            </button>

            <div className="text-center space-y-8">
              {/* Icône Centrale */}
              <div className="w-20 h-20 bg-brand-savannah border-3 border-brand-ink flex items-center justify-center text-brand-ink mx-auto shadow-[6px_6px_0px_#1A1A1A]">
                <LogIn size={40} />
              </div>

              {/* Titre et Message */}
              <div className="space-y-4">
                <h3 className="text-4xl font-serif font-black italic text-brand-clay tracking-tighter">
                  Rejoins le village
                </h3>
                <p className="text-brand-ink/70 text-[11px] font-black uppercase tracking-widest leading-relaxed px-4">
                  {message || "Rejoins la communauté pour partager tes propres sagesses !"}
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-4">
                {/* Bouton Google avec appel à la fonction login */}
                <button 
                  onClick={handleGoogleLogin}
                  className="w-full bg-white border-3 border-brand-ink text-brand-ink py-4 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all shadow-[6px_6px_0px_#1A1A1A] active:shadow-none active:translate-y-[2px] active:translate-x-[2px]"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continuer avec Google
                </button>

                {/* Encadré Info / Avantages */}
                <div className="flex items-start gap-4 text-left bg-[#FDFCF2] p-6 border-2 border-brand-ink shadow-[4px_4px_0px_rgba(178,81,59,0.3)]">
                  <div className="w-10 h-10 bg-[#B2513B] border-2 border-brand-ink flex items-center justify-center text-white shrink-0 mt-0.5">
                    <Info size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-brand-ink leading-tight font-black uppercase tracking-widest">
                      Voter, Favoris, <br/>Contributions.
                    </p>
                    <p className="text-[8px] text-brand-ink/50 uppercase font-bold mt-1">
                      Accède à toutes les fonctionnalités.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}