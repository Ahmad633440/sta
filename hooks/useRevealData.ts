import { useState, useEffect } from 'react';
import { collectBrowserInfo, type BrowserInfo } from '@/utils/browserDetection';
import { fetchLocationData, type LocationData } from '@/utils/ipLocation';

export interface RevealData {
  browser: BrowserInfo | null;
  location: LocationData | null;
  loading: boolean;
  error: string | null;
}

const INITIAL_STATE: RevealData = {
  browser: null,
  location: null,
  loading: true,
  error: null,
};

export function useRevealData() {
  const [data, setData] = useState<RevealData>(INITIAL_STATE);

  useEffect(() => {
    async function loadData() {
      try {
        const [browserData, locationData] = await Promise.all([
          collectBrowserInfo(),
          fetchLocationData(),
        ]);

        setData({
          browser: browserData,
          location: locationData,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error loading reveal data:', error);
        setData((prev) => ({
          ...prev,
          loading: false,
          error: 'Failed to load data',
        }));
      }
    }

    loadData();
  }, []);

  return data;
}
