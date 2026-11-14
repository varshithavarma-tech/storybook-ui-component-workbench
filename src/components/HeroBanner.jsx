import React from 'react';
import { soundManager } from '../utils/audio.js';

export default function HeroBanner({ featuredStory, onSelectStory, recentBookmark, onResumeBookmark }) {
  const handleStartReading = () => {
    soundManager.playSparkle();
    if (featuredStory) {
      onSelectStory(featuredStory);
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Background Whimsical Pastel Clouds & Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-12 right-1/4 w-80 h-80 bg-pink-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-amber-100/50 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Welcoming Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Kid friendly badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 border border-purple-200 text-purple-900 text-xs sm:text-sm font-bold shadow-sm">
              <span className="text-base">✨</span>
              <span>Interactive Digital Storybooks for Curious Minds</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-800 tracking-tight leading-[1.15]">
              Where Stories <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 bg-clip-text text-transparent">Come Alive</span> With Every Turn!
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Explore magical fairy tales, thrilling adventures, moral lessons, and fascinating science mysteries. 
              Listen with gentle voice narration, flip realistic 3D pages, and tap interactive illustrations!
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={handleStartReading}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-extrabold text-base rounded-3xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
              >
                <span>🚀</span>
                <span>Start Reading Now</span>
              </button>

              <a
                href="#stories-grid"
                onClick={() => soundManager.playClick()}
                className="px-6 py-4 bg-white hover:bg-slate-50 text-slate-700 font-bold text-base rounded-3xl border-2 border-slate-200 hover:border-purple-300 shadow-sm transition-all flex items-center gap-2"
              >
                <span>📚</span>
                <span>Browse All Books</span>
              </a>
            </div>

            {/* Feature Highlights Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-xl mx-auto lg:mx-0">
              <div className="bg-white/70 backdrop-blur-sm p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-2.5">
                <span className="text-2xl">🎙️</span>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-800">Read Aloud</div>
                  <div className="text-[11px] text-slate-500">Voice Narration</div>
                </div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-2.5">
                <span className="text-2xl">📖</span>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-800">Page by Page</div>
                  <div className="text-[11px] text-slate-500">3D Book Flip</div>
                </div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-2.5">
                <span className="text-2xl">🔖</span>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-800">Bookmarks</div>
                  <div className="text-[11px] text-slate-500">Save Progress</div>
                </div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-2.5">
                <span className="text-2xl">🎨</span>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-800">Pastel Art</div>
                  <div className="text-[11px] text-slate-500">Child Friendly</div>
                </div>
              </div>
            </div>

            {/* Resume Bookmark notification card if exists */}
            {recentBookmark && (
              <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 flex items-center justify-between gap-4 max-w-xl mx-auto lg:mx-0 shadow-sm animate-fadeIn">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🔖</span>
                  <div className="text-left">
                    <div className="text-xs font-bold text-amber-900 uppercase tracking-wide">Continue Reading</div>
                    <div className="text-sm font-extrabold text-slate-800 truncate max-w-xs">{recentBookmark.storyTitle}</div>
                    <div className="text-xs text-amber-700">Page {recentBookmark.pageIndex + 1} • {recentBookmark.pageTitle}</div>
                  </div>
                </div>
                <button
                  onClick={() => onResumeBookmark(recentBookmark)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs rounded-xl shadow-sm hover:scale-105 transition-all whitespace-nowrap"
                >
                  Resume ▶
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Featured Story of the Day Spotlight Card */}
          {featuredStory && (
            <div className="lg:col-span-5">
              <div className="relative group">
                {/* Glow border */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 rounded-3xl blur-md opacity-60 group-hover:opacity-100 transition duration-500" />
                
                <div className="relative bg-white rounded-3xl p-6 shadow-xl border border-white/80 space-y-4">
                  {/* Card Header Tag */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-pink-100 text-pink-700 font-extrabold text-xs rounded-full uppercase tracking-wider flex items-center gap-1">
                      <span>👑</span> Story of the Day
                    </span>
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                      <span>⭐</span> {featuredStory.stars}.0 Rating
                    </span>
                  </div>

                  {/* Artwork Preview Cover */}
                  <div className="w-full aspect-[16/10] rounded-2xl bg-gradient-to-tr from-emerald-100 via-teal-100 to-sky-100 flex flex-col items-center justify-center p-6 text-center border border-emerald-200/60 shadow-inner group-hover:scale-[1.02] transition-transform duration-300">
                    <span className="text-6xl animate-bounce" style={{ animationDuration: '2.5s' }}>
                      {featuredStory.mascot || '🐉'}
                    </span>
                    <h3 className="text-xl font-black text-slate-800 mt-2">
                      {featuredStory.title}
                    </h3>
                    <p className="text-xs text-emerald-800 font-bold mt-1">
                      {featuredStory.categoryName} • {featuredStory.ageRange} • {featuredStory.readingTime}
                    </p>
                  </div>

                  {/* Synopsis */}
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {featuredStory.synopsis}
                  </p>

                  {/* Bottom details & action */}
                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-lg border border-purple-100">
                        {featuredStory.pages.length} Interactive Pages
                      </span>
                    </div>

                    <button
                      onClick={() => { soundManager.playSparkle(); onSelectStory(featuredStory); }}
                      className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <span>Read Story</span>
                      <span>➔</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
