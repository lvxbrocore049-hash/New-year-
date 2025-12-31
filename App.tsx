
import React, { useState, useEffect } from 'react';
import Fireworks from './components/Fireworks';
import { audio } from './audioService';

const App: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(true);
  const [isCelebrationActive, setIsCelebrationActive] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audio.setMute(newMuted);
    audio.playUI();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setName(inputValue.trim());
      setShowModal(false);
      // Initialize audio on first user interaction
      audio.playUI();
      // Small delay for transition effect
      setTimeout(() => setIsCelebrationActive(true), 100);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Background Fireworks (Only visible after name entry) */}
      {isCelebrationActive && <Fireworks />}

      {/* Mute Toggle */}
      {isCelebrationActive && (
        <button
          onClick={toggleMute}
          className="fixed top-6 right-6 z-[60] p-3 rounded-full border border-purple-500/30 bg-black/40 backdrop-blur-md hover:bg-purple-500/20 transition-all group"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>
      )}

      {/* Entry Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-500">
          <div className="w-full max-w-md bg-zinc-900/90 neon-border p-8 rounded-2xl text-center space-y-6 animate-in fade-in zoom-in duration-500">
            <h2 className="font-neon text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Welcome to 2026
            </h2>
            <p className="text-zinc-400 text-sm">Please enter your name to join the celebration</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                autoFocus
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Your Name"
                className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-all text-center text-lg font-medium"
                maxLength={20}
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 text-white font-neon font-bold py-3 rounded-xl shadow-lg transform active:scale-95 transition-all"
              >
                ENTER CELEBRATION
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Greeting Content */}
      {isCelebrationActive && (
        <div className="relative z-10 text-center space-y-4 px-4 select-none">
          <div className="space-y-2 animate-in slide-in-from-bottom duration-1000 fill-mode-forwards">
            <h1 className="font-neon text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-widest neon-glow-purple">
              HAPPY NEW YEAR
            </h1>
            <div className="relative py-2">
              <span className="font-neon text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-400 via-purple-500 to-purple-700 drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                2026
              </span>
            </div>
          </div>
          
          <div className="pt-4 animate-in fade-in slide-in-from-bottom duration-1000 delay-500 fill-mode-forwards">
            <p className="text-xl md:text-3xl font-neon text-blue-400 font-medium tracking-wide uppercase neon-glow-blue">
              {name}
            </p>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[120%] h-[120%] opacity-20 bg-[radial-gradient(circle,rgba(168,85,247,0.3)_0%,rgba(5,5,5,0)_70%)] blur-3xl pointer-events-none"></div>
        </div>
      )}

      {/* Footer Info */}
      {isCelebrationActive && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-zinc-500 text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity cursor-default">
          Interactive Experience &bull; Neon Audio &bull; 2026
        </div>
      )}
    </div>
  );
};

export default App;
