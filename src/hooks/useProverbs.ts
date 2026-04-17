import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

// On définit la structure d'un proverbe pour TypeScript
export interface Proverbe {
  id: number;
  text: string;
  origin: string;
  category: string;
  translation?: string;
  likes_count: number;
}

export function useProverbs() {
  const [proverbs, setProverbs] = useState<Proverbe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProverbs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('proverbs') // Assure-toi que le nom correspond à ta table Supabase
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      setProverbs(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProverbs();
  }, []);

  return { proverbs, loading, error, refresh: fetchProverbs };
}