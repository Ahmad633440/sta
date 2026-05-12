/**
 * IP and Location Detection
 * Fetches geolocation data based on IP address
 */

export interface LocationData {
  ip: string;
  isp: string;
  country: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
  localTime: string;
}

export async function fetchLocationData(): Promise<LocationData | null> {
  try {
    const response = await fetch('https://ipapi.co/json/', {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) throw new Error('Failed to fetch location data');

    const data = await response.json();

    return {
      ip: data.ip || 'Unknown',
      isp: data.org || 'Unknown ISP',
      country: data.country_name || 'Unknown',
      region: data.region || 'Unknown',
      city: data.city || 'Unknown',
      latitude: data.latitude || 0,
      longitude: data.longitude || 0,
      timezone: data.timezone || 'Unknown',
      localTime: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
    };
  } catch (error) {
    console.error('Error fetching location data:', error);
    return null;
  }
}

export function maskIP(ip: string): string {
  const parts = ip.split('.');
  if (parts.length === 4) {
    return `${parts[0]}.${parts[1]}.xxx.xxx`;
  }
  return ip;
}
