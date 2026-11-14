import React from 'react';
import { soundManager } from '../utils/audio.js';

export default function Footer({ onSelectCategory }) {
  return (
    <footer className="mt-16 bg-white border-t border-slate-200/80 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-400 to-purple-500 flex items-center justify-center text-xl shadow-xs">
                📖
              </div>
              <span className="font-black text-xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                MagicStorybook Kids
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-sm leading-relaxed">
              An interactive modern children’s storybook reading web application. Crafted with love, vibrant vector art, gentle voice narration, and uplifting educational themes.
            </p>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
              Categories
            </h4>
            <ul className="space-y-1.5 text-xs font-bold text-slate-500">
              <li>
                <button onClick={() => onSelectCategory('fantasy')} className="hover:text-purple-600 transition-colors">
                  🦄 Fantasy Stories
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('adventure')} className="hover:text-purple-600 transition-colors">
                  🗺️ Adventure Quests
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('moral')} className="hover:text-purple-600 transition-colors">
                  🦉 Moral Stories
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('fairytales')} className="hover:text-purple-600 transition-colors">
                  👑 Fairy Tales
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('educational')} className="hover:text-purple-600 transition-colors">
                  🚀 Educational & STEM
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('bedtime')} className="hover:text-purple-600 transition-colors">
                  🌙 Bedtime Stories
                </button>
              </li>
            </ul>
          </div>

          {/* Reading Tips */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
              Reading Tips
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500 font-medium">
              <li>✨ Read 15 minutes each evening before bed.</li>
              <li>🎙️ Follow along with Read-Aloud voice.</li>
              <li>💡 Discuss each chapter’s Little Wisdom.</li>
              <li>🔖 Save pages with the Bookmark feature.</li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            © 2026 MagicStorybook Clone. Built with React & Vite. All rights reserved.
          </div>
          <div className="flex items-center gap-4 font-bold text-slate-500">
            <span>🛡️ Safe for Kids</span>
            <span>🌈 Zero Ads</span>
            <span>⚡ Instant Web App</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
