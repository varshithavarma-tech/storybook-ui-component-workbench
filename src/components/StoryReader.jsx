import React, { useState, useEffect, useRef } from 'react';
import InteractiveIllustration from './InteractiveIllustration.jsx';
import { soundManager } from '../utils/audio.js';
import { speechManager } from '../utils/speechSynthesis.js';
import { saveBookmark, updateReadingProgress, getBookmarks } from '../utils/storage.js';

export default function StoryReader({
  story,
  initialPage = 0,
  onClose,
  onFinishStory,
  bookmarks,
  setBookmarks,
  readingTheme = 'cream', // 'cream', 'sepia', 'night'
  setReadingTheme,
  fontSize = 'medium', // 'small', 'medium', 'large', 'xl'
  setFontSize,
  isFavorite,
  onToggleFavorite
}) {
  const [currentPageIndex, setCurrentPageIndex] = useState(initialPage);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('next');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSpeed, setSpeechSpeed] = useState(1.0);
  const [toastMessage, setToastMessage] = useState(null);

  const totalPages = story.pages.length;
  const currentPage = story.pages[currentPageIndex] || story.pages[0];

  // Subscribe to speech manager updates
  useEffect(() => {
    const unsubscribe = speechManager.subscribe((event) => {
      if (event === 'start' || event === 'resume') {
        setIsSpeaking(true);
      } else if (event === 'end' || event === 'stop' || event === 'pause') {
        setIsSpeaking(false);
      }
    });

    return () => {
      unsubscribe();
      speechManager.stop();
    };
  }, []);

  // Update progress on page change
  useEffect(() => {
    updateReadingProgress(story.id, currentPageIndex, totalPages, currentPageIndex === totalPages - 1);
  }, [story.id, currentPageIndex, totalPages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNextPage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevPage();
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPageIndex]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      soundManager.playPageFlip();
      speechManager.stop();
      setFlipDirection('next');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPageIndex(prev => prev + 1);
        setIsFlipping(false);
      }, 250);
    } else {
      // Last page reached
      soundManager.playCheer();
      speechManager.stop();
      onFinishStory(story);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      soundManager.playPageFlip();
      speechManager.stop();
      setFlipDirection('prev');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPageIndex(prev => prev - 1);
        setIsFlipping(false);
      }, 250);
    }
  };

  const handleJumpToPage = (index) => {
    if (index === currentPageIndex) return;
    soundManager.playPageFlip();
    speechManager.stop();
    setFlipDirection(index > currentPageIndex ? 'next' : 'prev');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPageIndex(index);
      setIsFlipping(false);
    }, 250);
  };

  const handleToggleNarration = () => {
    if (isSpeaking) {
      speechManager.stop();
      setIsSpeaking(false);
    } else {
      soundManager.playSparkle();
      speechManager.setRate(speechSpeed);
      // Read aloud the title and story text
      const fullNarration = `${currentPage.title}. ${currentPage.text}`;
      speechManager.speak(fullNarration);
      setIsSpeaking(true);
    }
  };

  const handleSpeedChange = (speed) => {
    setSpeechSpeed(speed);
    speechManager.setRate(speed);
    soundManager.playClick();
    if (isSpeaking) {
      const fullNarration = `${currentPage.title}. ${currentPage.text}`;
      speechManager.speak(fullNarration);
    }
  };

  const handleBookmarkCurrentPage = () => {
    soundManager.playBookmarkChime();
    const updated = saveBookmark({
      storyId: story.id,
      storyTitle: story.title,
      categoryName: story.categoryName,
      pageIndex: currentPageIndex,
      pageTitle: currentPage.title,
      snippet: currentPage.text.slice(0, 100) + '...'
    });
    setBookmarks(updated);
    showToast(`🔖 Page ${currentPageIndex + 1} bookmarked!`);
  };

  const isCurrentPageBookmarked = bookmarks.some(
    b => b.storyId === story.id && b.pageIndex === currentPageIndex
  );

  const handleClose = () => {
    speechManager.stop();
    soundManager.playClick();
    onClose();
  };

  // Theme styling rules
  const themeClasses = {
    cream: {
      bg: 'bg-[#faf8f5]',
      bookBg: 'bg-[#fffdfa]',
      textColor: 'text-slate-800',
      textMuted: 'text-slate-500',
      border: 'border-[#f0ece4]',
      headerBg: 'bg-white/80',
      lessonBg: 'bg-emerald-50 text-emerald-900 border-emerald-200'
    },
    sepia: {
      bg: 'bg-[#fbf2e9]',
      bookBg: 'bg-[#f5e6d3]',
      textColor: 'text-[#43302b]',
      textMuted: 'text-[#7d5c52]',
      border: 'border-[#ebd4bc]',
      headerBg: 'bg-[#f5e6d3]/90',
      lessonBg: 'bg-[#e8d5be] text-[#3e2723] border-[#d7bda0]'
    },
    night: {
      bg: 'bg-[#0b0f19]',
      bookBg: 'bg-[#111827]',
      textColor: 'text-slate-100',
      textMuted: 'text-slate-400',
      border: 'border-slate-800',
      headerBg: 'bg-slate-900/90',
      lessonBg: 'bg-slate-800/80 text-purple-200 border-slate-700'
    }
  }[readingTheme] || themeClasses.cream;

  // Font size classes
  const fontClasses = {
    small: 'text-sm sm:text-base leading-relaxed',
    medium: 'text-base sm:text-lg leading-relaxed',
    large: 'text-lg sm:text-xl leading-relaxed',
    xl: 'text-xl sm:text-2xl leading-loose font-medium'
  }[fontSize] || 'text-base sm:text-lg leading-relaxed';

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${themeClasses.bg} transition-colors duration-300 flex flex-col justify-between select-none`}>
      
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white font-extrabold text-sm px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Top Header Bar */}
      <header className={`sticky top-0 z-40 backdrop-blur-md ${themeClasses.headerBg} border-b ${themeClasses.border} px-4 py-3 shadow-xs`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Back / Close button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs sm:text-sm rounded-2xl transition-all flex items-center gap-2 shadow-xs"
            >
              <span>✕</span>
              <span className="hidden sm:inline">Close Book</span>
            </button>
            <div className="hidden md:block">
              <h2 className={`font-black text-sm sm:text-base ${themeClasses.textColor} truncate max-w-xs`}>
                {story.title}
              </h2>
              <p className={`text-xs ${themeClasses.textMuted}`}>
                {story.categoryName} • Page {currentPageIndex + 1} of {totalPages}
              </p>
            </div>
          </div>

          {/* Center: Reading Progress Indicator */}
          <div className="flex-1 max-w-xs hidden sm:block">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-1">
              <span>Progress</span>
              <span>{Math.round(((currentPageIndex + 1) / totalPages) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentPageIndex + 1) / totalPages) * 100}%` }}
              />
            </div>
          </div>

          {/* Right: Controls (Narration, Font Size, Theme, Bookmark) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Read Aloud Narration Toggle */}
            <button
              onClick={handleToggleNarration}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-black transition-all ${
                isSpeaking
                  ? 'bg-purple-600 text-white animate-pulse shadow-md ring-2 ring-purple-300'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
              }`}
              title={isSpeaking ? 'Stop voice narration' : 'Listen to story read aloud'}
            >
              <span className="text-base">{isSpeaking ? '🔊' : '🎙️'}</span>
              <span className="hidden sm:inline">{isSpeaking ? 'Reading...' : 'Read Aloud'}</span>
            </button>

            {/* Voice Speed Dropdown */}
            {isSpeaking && (
              <div className="flex items-center gap-1 bg-purple-100 px-2 py-1.5 rounded-xl text-xs font-bold text-purple-900">
                <button
                  onClick={() => handleSpeedChange(0.8)}
                  className={`px-1.5 py-0.5 rounded ${speechSpeed === 0.8 ? 'bg-purple-600 text-white' : ''}`}
                >
                  0.8x
                </button>
                <button
                  onClick={() => handleSpeedChange(1.0)}
                  className={`px-1.5 py-0.5 rounded ${speechSpeed === 1.0 ? 'bg-purple-600 text-white' : ''}`}
                >
                  1x
                </button>
                <button
                  onClick={() => handleSpeedChange(1.2)}
                  className={`px-1.5 py-0.5 rounded ${speechSpeed === 1.2 ? 'bg-purple-600 text-white' : ''}`}
                >
                  1.2x
                </button>
              </div>
            )}

            {/* Bookmark Current Page */}
            <button
              onClick={handleBookmarkCurrentPage}
              className={`p-2 rounded-2xl border transition-all text-sm ${
                isCurrentPageBookmarked
                  ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-sm'
                  : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
              }`}
              title={isCurrentPageBookmarked ? 'Bookmarked' : 'Bookmark this page'}
            >
              🔖
            </button>

            {/* Font Size Selector (A- / A+) */}
            <div className="flex items-center bg-slate-100 rounded-2xl p-1 border border-slate-200">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setFontSize(prev => prev === 'xl' ? 'large' : prev === 'large' ? 'medium' : 'small');
                }}
                className="px-2 py-1 text-xs font-extrabold text-slate-600 hover:text-slate-900"
                title="Decrease font size"
              >
                A-
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setFontSize(prev => prev === 'small' ? 'medium' : prev === 'medium' ? 'large' : 'xl');
                }}
                className="px-2 py-1 text-xs font-extrabold text-slate-600 hover:text-slate-900"
                title="Increase font size"
              >
                A+
              </button>
            </div>

            {/* Theme switcher (Day / Sepia / Night) */}
            <button
              onClick={() => {
                soundManager.playClick();
                setReadingTheme(prev => prev === 'cream' ? 'sepia' : prev === 'sepia' ? 'night' : 'cream');
              }}
              className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-sm"
              title="Change reading theme"
            >
              {readingTheme === 'cream' ? '☀️' : readingTheme === 'sepia' ? '📜' : '🌙'}
            </button>

          </div>

        </div>
      </header>

      {/* Main Interactive Book Canvas */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl w-full">
          
          {/* Realistic Dual-Page Book Spread Container */}
          <div 
            className={`relative rounded-3xl ${themeClasses.bookBg} border-2 ${themeClasses.border} shadow-2xl overflow-hidden transition-all duration-300 ${
              isFlipping ? 'scale-[0.98] opacity-80' : 'scale-100 opacity-100'
            }`}
            style={{ minHeight: '520px' }}
          >
            
            {/* Center Book Spine Divider on Desktop */}
            <div className="hidden lg:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/5 via-transparent to-black/5 pointer-events-none z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-2">
              
              {/* Left Page (Spread): Interactive Scene Illustration */}
              <div className="p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200/50">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-black text-xs uppercase tracking-wider">
                      Page {currentPageIndex + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      Tap scene to interact ✨
                    </span>
                  </div>

                  {/* High Quality Interactive Vector Scene */}
                  <InteractiveIllustration
                    scene={currentPage.svgScene}
                    prompt={currentPage.prompt}
                    interactiveTarget={currentPage.interactiveTarget}
                    storyColor={story.accentColor}
                  />
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-center text-xs text-slate-400 font-bold">
                  Storybook Experience • Double Page Spread
                </div>
              </div>

              {/* Right Page (Spread): Narrative Text & Takeaway Lesson */}
              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                
                <div className="space-y-4">
                  
                  {/* Chapter / Page Heading */}
                  <div className="space-y-1">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-purple-500">
                      Chapter {currentPageIndex + 1}
                    </span>
                    <h2 className={`text-2xl sm:text-3xl font-black ${themeClasses.textColor} tracking-tight`}>
                      {currentPage.title}
                    </h2>
                  </div>

                  {/* Story Text with selected font size */}
                  <p className={`${themeClasses.textColor} ${fontClasses} font-serif leading-relaxed select-text first-letter:text-4xl first-letter:font-black first-letter:float-left first-letter:mr-2 first-letter:text-purple-600`}>
                    {currentPage.text}
                  </p>

                  {/* Audio visualizer bar when speaking */}
                  {isSpeaking && (
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-2xl flex items-center gap-3 animate-fadeIn">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-4 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <span className="w-1.5 h-6 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <span className="w-1.5 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                        <span className="w-1.5 h-5 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                      <span className="text-xs font-black text-purple-800">
                        Speaking aloud... Sit back and listen!
                      </span>
                    </div>
                  )}

                  {/* Key Lesson / Moral Takeaway Box */}
                  {currentPage.lesson && (
                    <div className={`p-4 rounded-2xl border ${themeClasses.lessonBg} space-y-1 mt-4 shadow-xs`}>
                      <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wide">
                        <span>💡</span>
                        <span>Little Wisdom</span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold leading-snug">
                        {currentPage.lesson}
                      </p>
                    </div>
                  )}

                </div>

                {/* Page Navigation Controls at bottom of page */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                  
                  {/* Previous Page Button */}
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPageIndex === 0}
                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-extrabold text-sm transition-all ${
                      currentPageIndex === 0
                        ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 shadow-sm hover:scale-105 active:scale-95'
                    }`}
                  >
                    <span>◀</span>
                    <span>Previous</span>
                  </button>

                  {/* Middle: Page Counter Indicator */}
                  <span className={`text-xs font-black ${themeClasses.textMuted}`}>
                    {currentPageIndex + 1} / {totalPages}
                  </span>

                  {/* Next / Finish Button */}
                  <button
                    onClick={handleNextPage}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl font-extrabold text-sm text-white bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 shadow-lg shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>{currentPageIndex === totalPages - 1 ? 'Finish Story 🎉' : 'Next Page'}</span>
                    <span>▶</span>
                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* Quick Page Jumper Thumbnail Bar */}
          <div className="mt-6 flex items-center justify-center gap-2 overflow-x-auto py-2">
            {story.pages.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleJumpToPage(idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all ${
                  idx === currentPageIndex
                    ? 'bg-purple-600 text-white shadow-md scale-110'
                    : 'bg-white/80 hover:bg-white text-slate-600 border border-slate-200'
                }`}
              >
                <span>{idx + 1}</span>
                <span className="hidden md:inline truncate max-w-[80px]">{p.title}</span>
              </button>
            ))}
          </div>

        </div>
      </main>

      {/* Reader Footer Controls: Keyboard Shortcut hints */}
      <footer className="text-center py-2 text-[11px] text-slate-400 font-medium">
        Tip: You can use the <kbd className="px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded text-[10px] font-mono">◀ Left</kbd> and <kbd className="px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded text-[10px] font-mono">Right ▶</kbd> arrow keys to turn pages, or <kbd className="px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded text-[10px] font-mono">Esc</kbd> to exit.
      </footer>

    </div>
  );
}
