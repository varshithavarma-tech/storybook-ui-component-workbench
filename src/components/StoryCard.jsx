import React from 'react';
import { soundManager } from '../utils/audio.js';

export default function StoryCard({
  story,
  isFavorite,
  onToggleFavorite,
  onSelectStory,
  progress,
  hasBookmark,
  viewMode = 'grid'
}) {
  const handleCardClick = () => {
    soundManager.playClick();
    onSelectStory(story);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    soundManager.playSparkle();
    onToggleFavorite(story.id);
  };

  const percentRead = progress ? progress.percent : 0;

  if (viewMode === 'list') {
    return (
      <div
        onClick={handleCardClick}
        className="group bg-white rounded-3xl p-5 border-2 border-slate-100 hover:border-purple-300 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center gap-5 cursor-pointer relative overflow-hidden"
      >
        {/* Left: Mascot & Cover Box */}
        <div 
          className="w-full sm:w-44 h-36 rounded-2xl flex flex-col items-center justify-center relative p-3 text-center shrink-0 border border-black/5"
          style={{ backgroundColor: story.coverColor || '#f3e8ff' }}
        >
          <span className="text-4xl group-hover:scale-125 transition-transform duration-300">
            {story.mascot || '📖'}
          </span>
          <span className="text-xs font-black text-slate-700 mt-2 line-clamp-1">
            {story.categoryName}
          </span>
        </div>

        {/* Middle: Details */}
        <div className="flex-1 space-y-2 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-slate-100 text-slate-700">
              {story.categoryName}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100">
              👶 {story.ageRange}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100">
              ⏱️ {story.readingTime}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
              📄 {story.pages.length} Pages
            </span>
          </div>

          <h3 className="text-lg font-black text-slate-800 group-hover:text-purple-600 transition-colors">
            {story.title}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {story.synopsis}
          </p>

          {/* Reading progress bar if started */}
          {percentRead > 0 && (
            <div className="pt-1 max-w-xs">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1">
                <span>Reading Progress</span>
                <span className="text-purple-600">{percentRead}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full" 
                  style={{ width: `${percentRead}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleFavoriteClick}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg transition-transform active:scale-90 border ${
              isFavorite 
                ? 'bg-rose-50 text-rose-500 border-rose-200 shadow-sm' 
                : 'bg-slate-50 text-slate-300 border-slate-200 hover:text-rose-400'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); soundManager.playSparkle(); onSelectStory(story); }}
            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-2xl shadow-sm hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
          >
            Read Story ▶
          </button>
        </div>
      </div>
    );
  }

  // Grid Card View
  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-3xl p-5 border-2 border-slate-100 hover:border-purple-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden"
    >
      {/* Top Cover Banner */}
      <div 
        className="w-full aspect-[4/3] rounded-2xl flex flex-col items-center justify-center relative p-4 text-center border border-black/5 group-hover:scale-[1.02] transition-transform duration-300 overflow-hidden"
        style={{ backgroundColor: story.coverColor || '#f3e8ff' }}
      >
        {/* Subtle patterned circles */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/20 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/20 pointer-events-none" />

        {/* Badge tag */}
        {story.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-md text-slate-700 font-extrabold text-[10px] uppercase tracking-wider rounded-full shadow-xs border border-white">
            {story.badge}
          </span>
        )}

        {/* Favorite heart button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all active:scale-75 shadow-sm border ${
            isFavorite 
              ? 'bg-white text-rose-500 border-rose-200' 
              : 'bg-white/80 backdrop-blur-md text-slate-400 border-white hover:text-rose-500'
          }`}
          title={isFavorite ? 'Remove favorite' : 'Add to favorites'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>

        {/* Bookmark indicator tag */}
        {hasBookmark && (
          <span 
            className="absolute bottom-3 left-3 px-2 py-0.5 bg-amber-400 text-amber-950 font-black text-[10px] rounded-full shadow-xs flex items-center gap-1"
            title="You have a saved bookmark in this story"
          >
            🔖 Bookmarked
          </span>
        )}

        {/* Story Mascot Icon */}
        <span className="text-6xl group-hover:scale-125 transition-transform duration-300 drop-shadow-sm select-none">
          {story.mascot || '📖'}
        </span>

        {/* Category label */}
        <span className="text-xs font-black text-slate-700 mt-2 bg-white/60 px-3 py-0.5 rounded-full">
          {story.categoryName}
        </span>
      </div>

      {/* Card Body */}
      <div className="pt-4 space-y-2.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata chips */}
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 mb-1.5">
            <span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded-lg border border-purple-100">
              👶 {story.ageRange}
            </span>
            <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-lg border border-amber-100">
              ⏱️ {story.readingTime}
            </span>
            <span className="ml-auto text-amber-500 font-black flex items-center gap-0.5">
              ⭐ {story.stars}.0
            </span>
          </div>

          {/* Title */}
          <h3 className="font-extrabold text-slate-800 text-base leading-snug group-hover:text-purple-600 transition-colors line-clamp-1">
            {story.title}
          </h3>

          {/* Synopsis */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {story.synopsis}
          </p>
        </div>

        {/* Reading Progress Bar */}
        {percentRead > 0 && (
          <div className="pt-1">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1">
              <span>{percentRead === 100 ? 'Completed 🎉' : 'In Progress'}</span>
              <span className="text-purple-600 font-extrabold">{percentRead}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${percentRead === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-pink-500 to-purple-600'}`}
                style={{ width: `${percentRead}%` }}
              />
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-50">
          <span className="text-xs font-bold text-slate-400">
            {story.pages.length} Pages
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); soundManager.playSparkle(); onSelectStory(story); }}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-xs group-hover:scale-105 active:scale-95 transition-all flex items-center gap-1"
          >
            <span>Read</span>
            <span>➔</span>
          </button>
        </div>
      </div>
    </div>
  );
}
