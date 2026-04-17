import React, { createContext, useContext, useState, useEffect } from 'react';

// Définition de ce qu'est un utilisateur
interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Au chargement, on regarde si l'utilisateur était déjà connecté (dans le localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('nzo_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string) => {
    // On simule une création de profil à partir de l'email
    const nameFromEmail = email.split('@')[0];
    const newUser = { 
      name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1), 
      email, 
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${nameFromEmail}` 
    };
    setUser(newUser);
    localStorage.setItem('nzo_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nzo_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

// Le "Hook" pour utiliser l'auth partout facilement
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth doit être utilisé dans un AuthProvider");
  return context;
};