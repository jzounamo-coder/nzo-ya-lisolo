import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; // Import de ton client supabase
import { User as SupabaseUser } from '@supabase/supabase-js';

// Définition de ce qu'est un utilisateur pour ton interface
interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => Promise<void>; // Devient asynchrone
  logout: () => Promise<void>; // Devient asynchrone
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fonction pour transformer un utilisateur Supabase en ton format User
  const formatUser = (supabaseUser: SupabaseUser | null): User | null => {
    if (!supabaseUser) return null;
    const nameFromEmail = supabaseUser.email?.split('@')[0] || 'Voyageur';
    return {
      name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
      email: supabaseUser.email || '',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${nameFromEmail}`
    };
  };

  useEffect(() => {
    // 1. Vérifier la session actuelle au démarrage
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(formatUser(session?.user ?? null));
      setLoading(false);
    });

    // 2. Écouter les changements de connexion (Login/Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(formatUser(session?.user ?? null));
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Connexion via Magic Link (plus simple sans mot de passe)
  const login = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    
    if (error) throw error;
    alert("Lien magique envoyé ! Vérifie tes e-mails.");
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Erreur déconnexion:", error.message);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      loading 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth doit être utilisé dans un AuthProvider");
  return context;
};