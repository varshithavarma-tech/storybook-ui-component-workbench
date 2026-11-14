import React from 'react';
import { soundManager } from '../utils/audio.js';
import { removeBookmark } from '../utils/storage.js';

export default function BookmarksModal({
  isOpen,
  onClose,
  bookmarks,
  setBookmarks,
  onSelectBookmark
}) {
  if (!isOpen) return null;

  const handleDelete = (id, e) => {
    e.stopPropagation();
    soundManager.playClick();
    const updated = removeBookmark(id);
    setBookmarks(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl">
              🔖
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800">My Saved Bookmarks</h2>
              <p className="text-xs text-slate-500 font-medium">
                {bookmarks.length} {bookmarks.length === 1 ? 'place' : 'places'} saved to continue reading
              </p>
            </div>
          </div>
          <button
            onClick={() => { soundManager.playClick(); onClose(); }}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-sm font-black transition-all"
          >
            ✕
          </button>
        </div>

        {/* Bookmarks List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {bookmarks.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <span className="text-4xl">📖</span>
              <h4 className="font-extrabold text-slate-700">No bookmarks saved yet!</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                While reading any storybook, tap the 🔖 bookmark icon in the header to save your page anytime.
              </p>
            </div>
          ) : (
            bookmarks.map((bm) => (
              <div
                key={bm.id}
                onClick={() => { soundManager.playSparkle(); onSelectBookmark(bm); }}
                className="group p-4 rounded-2xl bg-slate-50 hover:bg-purple-50/60 border border-slate-200 hover:border-purple-300 transition-all cursor-pointer flex items-center justify-between gap-4"
              >
                <div className="space-y-1 text-left flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-amber-100 text-amber-800">
                      Page {bm.pageIndex + 1}
                    </span>
                    <span className="text-xs font-bold text-purple-600 truncate">
                      {bm.categoryName || 'Storybook'}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-800 text-sm group-hover:text-purple-700 transition-colors truncate">
                    {bm.storyTitle}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1 italic">
                    "{bm.snippet || bm.pageTitle}"
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => { soundManager.playSparkle(); onSelectBookmark(bm); }}
                    className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow-xs group-hover:scale-105 transition-all"
                  >
                    Resume ▶
                  </button>
                  <button
                    onClick={(e) => handleDelete(bm.id, e)}
                    className="p-2 text-slate-400 hover:text-rose-500 rounded-xl hover:bg-rose-50 transition-colors"
                    title="Delete bookmark"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Bookmarks saved in browser</span>
          <button
            onClick={() => { soundManager.playClick(); onClose(); }}
            className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
