import React from 'react';
import { CATEGORIES } from '../data/stories.js';
import { soundManager } from '../utils/audio.js';

export default function CategoryFilters({
  activeCategory,
  onSelectCategory,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  totalResults
}) {
  const handleCategoryClick = (catId) => {
    soundManager.playClick();
    onSelectCategory(catId);
  };

  return (
    <div className="space-y-4 pt-4 pb-6">
      
      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none select-none">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-extrabold text-sm whitespace-nowrap transition-all duration-200 border-2 shadow-xs ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              <span>{cat.name}</span>
              <span
                className={`ml-1 px-2 py-0.5 rounded-full text-xs font-black ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Secondary Bar: Count + Sorting + View Mode */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
        
        {/* Results counter */}
        <div className="text-xs sm:text-sm font-bold text-slate-500">
          Showing <span className="text-slate-900 font-extrabold">{totalResults}</span> storybooks
        </div>

        {/* Controls: Sorting and Grid/List view */}
        <div className="flex items-center gap-3">
          
          {/* Sort dropdown */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-xs">
            <span className="text-xs text-slate-400 font-bold">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => { soundManager.playClick(); setSortBy(e.target.value); }}
              className="text-xs font-bold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="featured">✨ Featured</option>
              <option value="readingTime">⏱️ Reading Time</option>
              <option value="stars">⭐ Highest Rated</option>
              <option value="alphabetical">🔤 Title (A-Z)</option>
            </select>
          </div>

          {/* Grid / List view toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => { soundManager.playClick(); setViewMode('grid'); }}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'grid' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-700'
              }`}
              title="Grid View"
            >
              ⊞ Grid
            </button>
            <button
              onClick={() => { soundManager.playClick(); setViewMode('list'); }}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'list' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-700'
              }`}
              title="List View"
            >
              ☰ List
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
