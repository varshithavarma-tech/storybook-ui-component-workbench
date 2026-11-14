import React from 'react';
import StoryCard from './StoryCard.jsx';
import { soundManager } from '../utils/audio.js';

export default function StoryGrid({
  stories,
  favorites,
  onToggleFavorite,
  onSelectStory,
  readingProgress,
  bookmarks,
  viewMode = 'grid',
  onResetFilters
}) {
  if (stories.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <div className="w-24 h-24 mx-auto rounded-full bg-purple-50 flex items-center justify-center text-5xl animate-bounce">
          🔍
        </div>
        <h3 className="text-2xl font-black text-slate-800">No Stories Found</h3>
        <p className="text-sm text-slate-500 font-medium">
          We couldn't find any storybooks matching your search or filters. Try searching for "dragon", "space", or choose another category!
        </p>
        <button
          onClick={() => { soundManager.playClick(); onResetFilters(); }}
          className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm rounded-2xl shadow-sm hover:scale-105 transition-all"
        >
          Reset All Filters ✨
        </button>
      </div>
    );
  }

  return (
    <div
      id="stories-grid"
      className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'flex flex-col gap-4'
      }
    >
      {stories.map((story) => {
        const isFav = favorites.includes(story.id);
        const progress = readingProgress[story.id];
        const hasBookmark = bookmarks.some((b) => b.storyId === story.id);

        return (
          <StoryCard
            key={story.id}
            story={story}
            isFavorite={isFav}
            onToggleFavorite={onToggleFavorite}
            onSelectStory={onSelectStory}
            progress={progress}
            hasBookmark={hasBookmark}
            viewMode={viewMode}
          />
        );
      })}
    </div>
  );
}
