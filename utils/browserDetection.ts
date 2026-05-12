/**
 * Browser Detection Utilities
 * Extracts detailed information about the browser, OS, GPU, and device
 */

export interface BrowserInfo {
  browser: string;
  version: string;
  os: string;
  screenResolution: string;
  pixelRatio: string;
  colorDepth: string;
  timezone: string;
  language: string;
  cookiesEnabled: boolean;
  darkModeEnabled: boolean;
  doNotTrack: string | null;
  gpu: string;
  battery?: {
    percentage: number;
    charging: boolean;
  };
  storage?: {
    localStorage: string;
    sessionStorage: string;
  };
}

function parseUserAgent(ua: string) {
  let browser = 'Unknown';
  let version = 'Unknown';

  // Chrome
  if (ua.includes('Chrome') && !ua.includes('Chromium')) {
    browser = 'Chrome';
    version = ua.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
  }
  // Firefox
  else if (ua.includes('Firefox')) {
    browser = 'Firefox';
    version = ua.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
  }
  // Safari
  else if (ua.includes('Safari') && !ua.includes('Chrome')) {
    browser = 'Safari';
    version = ua.match(/Version\/(\d+)/)?.[1] || 'Unknown';
  }
  // Edge
  else if (ua.includes('Edg')) {
    browser = 'Edge';
    version = ua.match(/Edg\/(\d+)/)?.[1] || 'Unknown';
  }

  return { browser, version };
}

function getOS(ua: string) {
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac')) return 'macOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
  return 'Unknown';
}

function getScreenInfo() {
  const width = window.screen.width;
  const height = window.screen.height;
  const ratio = window.devicePixelRatio || 1;
  const colorDepth = window.screen.colorDepth || 'Unknown';

  return {
    resolution: `${width}×${height}`,
    ratio: `${ratio}x`,
    colorDepth: `${colorDepth}-bit`,
  };
}

function getDarkModeEnabled() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return true;
  }
  return false;
}

function getTimeZone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'Unknown';
  }
}

function getLanguage() {
  return navigator.language || navigator.languages?.[0] || 'Unknown';
}

function getCookiesEnabled() {
  try {
    const test = '__test__';
    document.cookie = test + '=1';
    const result = document.cookie.indexOf(test) > -1;
    document.cookie = test + '=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
    return result;
  } catch {
    return false;
  }
}

async function getBatteryInfo() {
  try {
    const battery = await (navigator as any).getBattery?.();
    if (battery) {
      return {
        percentage: Math.round(battery.level * 100),
        charging: battery.charging,
      };
    }
  } catch {
    // Battery API not available
  }
  return undefined;
}

function getStorageSize() {
  try {
    let localSize = 0;
    let sessionSize = 0;

    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        localSize += localStorage[key].length + key.length;
      }
    }

    for (let key in sessionStorage) {
      if (sessionStorage.hasOwnProperty(key)) {
        sessionSize += sessionStorage[key].length + key.length;
      }
    }

    return {
      localStorage: localSize > 0 ? `${(localSize / 1024).toFixed(2)} KB` : '0 KB',
      sessionStorage: sessionSize > 0 ? `${(sessionSize / 1024).toFixed(2)} KB` : '0 KB',
    };
  } catch {
    return {
      localStorage: 'Unknown',
      sessionStorage: 'Unknown',
    };
  }
}

function getDoNotTrack() {
  return navigator.doNotTrack || (window as any).doNotTrack || null;
}

async function getGPUInfo() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        return renderer || 'WebGL - Masked';
      }
    }
  } catch {
    // GPU detection failed
  }
  return 'Not detected';
}

export async function collectBrowserInfo(): Promise<BrowserInfo> {
  const ua = navigator.userAgent;
  const { browser, version } = parseUserAgent(ua);
  const os = getOS(ua);
  const { resolution, ratio, colorDepth } = getScreenInfo();
  const timezone = getTimeZone();
  const language = getLanguage();
  const cookiesEnabled = getCookiesEnabled();
  const darkModeEnabled = getDarkModeEnabled();
  const doNotTrack = getDoNotTrack();
  const battery = await getBatteryInfo();
  const storage = getStorageSize();
  const gpu = await getGPUInfo();

  return {
    browser,
    version,
    os,
    screenResolution: resolution,
    pixelRatio: ratio,
    colorDepth,
    timezone,
    language,
    cookiesEnabled,
    darkModeEnabled,
    doNotTrack,
    gpu,
    battery,
    storage,
  };
}
