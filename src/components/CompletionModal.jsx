import React, { useState, useEffect } from 'react';
import { triggerConfetti } from '../utils/confetti.js';
import { soundManager } from '../utils/audio.js';

export default function CompletionModal({ story, onClose, onReadAgain, onNextStory }) {
  const [rating, setRating] = useState(5);
  const [hasRated, setHasRated] = useState(false);

  useEffect(() => {
    // Trigger confetti celebration
    setTimeout(() => {
      triggerConfetti('completion-confetti-canvas');
    }, 150);
  }, []);

  const handleRate = (star) => {
    soundManager.playSparkle();
    setRating(star);
    setHasRated(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      {/* Fullscreen Canvas for Confetti */}
      <canvas
        id="completion-confetti-canvas"
        className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      />

      <div className="relative z-20 max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl border-4 border-amber-200">
        
        {/* Celebration Mascot Badge */}
        <div className="relative inline-block">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-300 via-pink-300 to-purple-300 flex items-center justify-center text-5xl shadow-xl shadow-amber-500/20 animate-bounce">
            {story.mascot || '🏆'}
          </div>
          <span className="absolute -bottom-2 -right-2 text-2xl animate-spin" style={{ animationDuration: '6s' }}>
            ✨
          </span>
        </div>

        {/* Heading & Congratulations */}
        <div className="space-y-2">
          <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-black rounded-full uppercase tracking-widest">
            Story Completed!
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            Super Reader Trophy Unlocked!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            You completed all chapters of <strong className="text-slate-900">{story.title}</strong>!
          </p>
        </div>

        {/* Collectible Badge Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 border border-purple-200 text-left flex items-center gap-4">
          <div className="text-4xl">🎖️</div>
          <div>
            <div className="text-xs font-black text-purple-900 uppercase">New Badge Earned</div>
            <div className="text-sm font-extrabold text-slate-800">{story.categoryName} Master Explorer</div>
            <div className="text-[11px] text-slate-500 font-medium">Added to your reader profile!</div>
          </div>
        </div>

        {/* Star Rating Selector */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-500">
            {hasRated ? 'Thank you for your rating! ⭐' : 'How much did you love this story?'}
          </div>
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRate(star)}
                className={`text-3xl transition-transform hover:scale-125 active:scale-95 ${
                  star <= rating ? 'text-amber-400' : 'text-slate-200'
                }`}
                title={`Rate ${star} stars`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => { soundManager.playSparkle(); onNextStory(); }}
            className="w-full py-3.5 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-purple-500/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Read Another Story</span>
            <span>🚀</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { soundManager.playClick(); onReadAgain(); }}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-all"
            >
              🔄 Read Again
            </button>
            <button
              onClick={() => { soundManager.playClick(); onClose(); }}
              className="flex-1 py-3 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 font-bold text-xs rounded-2xl transition-all"
            >
              📚 Library
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
