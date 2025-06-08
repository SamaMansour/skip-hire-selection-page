import { useState, useEffect } from 'react';
import { Skip } from '../types';

interface UseSkipsReturn {
  skips: Skip[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useSkips = (postcode: string = 'NR32', area: string = 'Lowestoft'): UseSkipsReturn => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSkips = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}&area=${area}`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch skips: ${response.status}`);
      }
      
      const data = await response.json();
      setSkips(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load skip data');
      console.error('Error fetching skips:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkips();
  }, [postcode, area]);

  return {
    skips,
    loading,
    error,
    refetch: fetchSkips
  };
};