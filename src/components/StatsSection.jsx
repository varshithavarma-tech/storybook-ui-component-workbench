import React from 'react';

export default function StatsSection({ totalStories = 8, completedCount = 0 }) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-purple-50/50 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-8 border-2 border-slate-100 shadow-sm">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <h3 className="text-2xl font-black text-slate-800">
              Made for Young Dreamers & Future Storytellers 🌟
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Every storybook is designed with soothing pastel palettes, high-contrast readable text, 
              interactive illustrations, and uplifting moral values.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-100 space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-pink-600">{totalStories}</div>
              <div className="text-xs font-bold text-slate-700">Digital Storybooks</div>
              <div className="text-[11px] text-slate-500">Across 6 genres</div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-purple-600">100%</div>
              <div className="text-xs font-bold text-slate-700">Kid-Safe & Private</div>
              <div className="text-[11px] text-slate-500">No ads, no tracking</div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-emerald-600">🎙️ Dual</div>
              <div className="text-xs font-bold text-slate-700">Voice Narration</div>
              <div className="text-[11px] text-slate-500">Read or Listen</div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-amber-600">{completedCount}</div>
              <div className="text-xs font-bold text-slate-700">Stories Finished</div>
              <div className="text-[11px] text-slate-500">Keep up the streak!</div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
