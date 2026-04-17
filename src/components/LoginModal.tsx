import React, { useState, useEffect } from 'react';
import { LogIn, X, Info, Mail, Lock, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export default function LoginModal({ isOpen, onClose, message }: LoginModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Nettoyer les erreurs quand on change de mode (Login <-> SignUp)
  useEffect(() => {
    setErrorMsg(null);
  }, [isSignUp]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      if (isSignUp) {
        // Logique de Création de compte
        const { data, error } = await supabase.auth.signUp({ 
          email, 
          password,
        });
        
        if (error) throw error;

        // Si la confirmation par email est activée, l'utilisateur n'est pas encore sessionné
        if (data.user && data.session === null) {
          alert("Compte créé ! Vérifie tes e-mails pour confirmer ton inscription avant de te connecter.");
          setIsSignUp(false); // Basculer sur connexion
          setLoading(false);
          return; // On ne ferme pas la modal pour qu'il puisse se connecter après
        }
      } else {
        // Logique de Connexion
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      
      // Si tout est OK, on ferme
      onClose();
    } catch (err: any) {
      // Traduction simple des erreurs courantes de Supabase
      const message = err.message === "Invalid login credentials" 
        ? "Email ou mot de passe incorrect" 
        : err.message;
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-ink/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white border-4 border-brand-ink p-8 shadow-[16px_16px_0px_#1A1A1A] overflow-hidden"
          >
            <button 
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-brand-ink border-2 border-brand-ink hover:bg-stone-100 transition-all active:scale-95"
            >
              <X size={20} />
            </button>

            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-brand-savannah border-3 border-brand-ink flex items-center justify-center text-brand-ink mx-auto shadow-[6px_6px_0px_#1A1A1A]">
                {isSignUp ? <UserPlus size={32} /> : <LogIn size={32} />}
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-serif font-black italic text-brand-clay tracking-tighter">
                  {isSignUp ? "Créer un profil" : "Rejoins le village"}
                </h3>
                <p className="text-brand-ink/70 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                  {message || "Partage tes sagesses avec la communauté."}
                </p>
              </div>

              {errorMsg && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-red-50 border-2 border-red-500 p-3 text-red-500 text-[10px] font-bold uppercase"
                >
                  {errorMsg}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink/40" size={18} />
                  <input 
                    type="email"
                    placeholder="TON EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-stone-100 border-3 border-brand-ink py-4 pl-12 pr-4 font-black text-[11px] uppercase tracking-widest focus:bg-white focus:shadow-[4px_4px_0px_#1A1A1A] transition-all outline-none"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink/40" size={18} />
                  <input 
                    type="password"
                    placeholder="TON MOT DE PASSE"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-stone-100 border-3 border-brand-ink py-4 pl-12 pr-4 font-black text-[11px] uppercase tracking-widest focus:bg-white focus:shadow-[4px_4px_0px_#1A1A1A] transition-all outline-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-clay text-white py-4 font-black text-xs uppercase tracking-[0.2em] border-3 border-brand-ink shadow-[6px_6px_0px_#1A1A1A] hover:translate-y-[-2px] hover:translate-x-[-2px] active:shadow-none active:translate-y-[2px] active:translate-x-[2px] transition-all disabled:opacity-50"
                >
                  {loading ? "Chargement..." : isSignUp ? "S'inscrire" : "Se Connecter"}
                </button>
              </form>

              <button 
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[10px] font-black uppercase tracking-widest text-brand-ink/60 hover:text-brand-clay transition-colors"
              >
                {isSignUp ? "Déjà un compte ? Se connecter" : "Pas de compte ? Créer un profil"}
              </button>

              <div className="flex items-start gap-3 text-left bg-[#FDFCF2] p-4 border-2 border-brand-ink">
                <Info size={18} className="text-brand-clay shrink-0" />
                <p className="text-[9px] text-brand-ink/70 leading-tight font-bold uppercase tracking-wider">
                  Tes données sont sécurisées par Supabase. <br/> Vote, Favoris et Contributions inclus.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}