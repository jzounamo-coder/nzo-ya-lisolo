export interface Proverb {
  id: string;
  text: string;
  translation: string;
  explanation: string;
  countryId: string;
  language: string;
  themeId: string;
  audioUrl?: string;
  likesCount: number;
  isKidFriendly: boolean;
  authorId?: string;
  createdAt: string;
  originCountryName?: string;
}

export interface Country {
  id: string;
  name: string;
  flag: string;
  proverbCount: number;
}

export interface Theme {
  id: string;
  name: string;
  iconName: string;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  photoURL: string;
  bio?: string;
  role: 'user' | 'admin';
}

export type CategoryTheme = 
  | 'Famille & Communauté'
  | 'Courage & Persévérance'
  | 'Sagesse & Patience'
  | 'Amour & Relations'
  | 'Argent & Travail'
  | 'Justice & Vérité';

export interface QuizQuestion {
  id: string;
  proverbId: string;
  options: string[];
  correctAnswerIndex: number;
}
