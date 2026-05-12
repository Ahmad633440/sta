
export const playLowFreqSound = () => {
  if (typeof  window === "undefined") return;  
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;

    const ctx = new AudioContext();    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain()
    
    osc.type = 'sine'; 
   osc.frequency.setValueAtTime(65, ctx.currentTime); // Low freq (65Hz) 
    osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.8);
    
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.8);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination)
 
    osc.start();
    osc.stop(ctx.currentTime + 0.8);
 
  } catch (e) {
    console.log("Sound Error", e);
  }
}