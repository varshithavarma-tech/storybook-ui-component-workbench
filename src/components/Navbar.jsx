import React, { useState } from 'react';
import { soundManager } from '../utils/audio.js';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  onOpenBookmarks,
  bookmarksCount = 0,
  favoritesCount = 0,
  showOnlyFavorites,
  setShowOnlyFavorites,
  soundEnabled,
  setSoundEnabled,
  onHomeClick
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSoundToggle = () => {
    const nextState = soundManager.toggleSound();
    setSoundEnabled(nextState);
    if (nextState) soundManager.playSparkle();
  };

  const handleFavoriteFilter = () => {
    soundManager.playClick();
    setShowOnlyFavorites(!showOnlyFavorites);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-rose-100 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo with Animated Book Mascot */}
          <div 
            onClick={() => { soundManager.playClick(); onHomeClick(); }}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-400 via-purple-400 to-indigo-400 flex items-center justify-center text-2xl shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              📖
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  MagicStory
                </span>
                <span className="px-2 py-0.5 text-xs font-bold bg-amber-100 text-amber-700 rounded-full border border-amber-200">
                  Kids
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">Where young imaginations soar</p>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search stories, dragons, space, morals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-10 py-2.5 bg-slate-50 border-2 border-slate-200 focus:border-purple-400 rounded-full text-sm font-medium focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all placeholder:text-slate-400"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base">🔍</span>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs bg-slate-200 rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Favorites toggle filter */}
            <button
              onClick={handleFavoriteFilter}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-bold transition-all shadow-sm ${
                showOnlyFavorites
                  ? 'bg-rose-500 text-white ring-4 ring-rose-100 scale-105'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
              }`}
              title="Filter Favorite Stories"
            >
              <span>{showOnlyFavorites ? '❤️' : '🤍'}</span>
              <span className="hidden sm:inline">Favorites</span>
              {favoritesCount > 0 && (
                <span className={`px-1.5 py-0.2 text-xs rounded-full ${showOnlyFavorites ? 'bg-white text-rose-600' : 'bg-rose-200 text-rose-800'}`}>
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Bookmarks Modal Button */}
            <button
              onClick={() => { soundManager.playClick(); onOpenBookmarks(); }}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 rounded-full text-sm font-bold transition-all shadow-sm"
              title="Open My Bookmarks"
            >
              <span>🔖</span>
              <span className="hidden sm:inline">Bookmarks</span>
              {bookmarksCount > 0 && (
                <span className="px-1.5 py-0.2 text-xs rounded-full bg-amber-200 text-amber-900 font-bold">
                  {bookmarksCount}
                </span>
              )}
            </button>

            {/* Sound FX Toggle Button */}
            <button
              onClick={handleSoundToggle}
              className={`p-2.5 rounded-full transition-all text-base border ${
                soundEnabled 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' 
                  : 'bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200'
              }`}
              title={soundEnabled ? 'Sound Effects Enabled (Click to mute)' : 'Sound Effects Muted (Click to enable)'}
            >
              {soundEnabled ? '🔔' : '🔕'}
            </button>

            {/* Mobile search toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-600 text-lg"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile search drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 pt-1 border-t border-slate-100 animate-fadeIn">
            <div className="relative">
              <input
                type="text"
                placeholder="Search stories, dragons, space..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
