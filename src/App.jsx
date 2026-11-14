import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar.jsx';
import HeroBanner from './components/HeroBanner.jsx';
import CategoryFilters from './components/CategoryFilters.jsx';
import StoryGrid from './components/StoryGrid.jsx';
import StoryReader from './components/StoryReader.jsx';
import BookmarksModal from './components/BookmarksModal.jsx';
import CompletionModal from './components/CompletionModal.jsx';
import StatsSection from './components/StatsSection.jsx';
import Footer from './components/Footer.jsx';
import { STORIES } from './data/stories.js';
import {
  getFavorites,
  toggleFavorite,
  getBookmarks,
  getReadingProgress,
  getSettings,
  saveSettings
} from './utils/storage.js';
import { soundManager } from './utils/audio.js';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  
  // Persistent Storage State
  const [favorites, setFavorites] = useState(getFavorites());
  const [bookmarks, setBookmarks] = useState(getBookmarks());
  const [readingProgress, setReadingProgress] = useState(getReadingProgress());
  const [settings, setSettingsState] = useState(getSettings());
  const [soundEnabled, setSoundEnabled] = useState(soundManager.isSoundEnabled());

  // Active Story & Modal States
  const [activeStory, setActiveStory] = useState(null);
  const [activeInitialPage, setActiveInitialPage] = useState(0);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [completedStory, setCompletedStory] = useState(null);

  // Sync settings helper
  const handleUpdateSetting = (key, value) => {
    const updated = saveSettings({ [key]: value });
    setSettingsState(updated);
  };

  // Toggle Favorite
  const handleToggleFavorite = (storyId) => {
    const updated = toggleFavorite(storyId);
    setFavorites(updated);
  };

  // Featured Story (Barnaby the Strawberry Dragon)
  const featuredStory = STORIES[0];

  // Most recent bookmark if available
  const recentBookmark = bookmarks.length > 0 ? bookmarks[0] : null;

  // Filtered and Sorted Stories
  const filteredStories = useMemo(() => {
    return STORIES.filter((story) => {
      // Category filter
      if (activeCategory !== 'all' && story.category !== activeCategory) {
        return false;
      }
      // Favorites filter
      if (showOnlyFavorites && !favorites.includes(story.id)) {
        return false;
      }
      // Search term filter
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesTitle = story.title.toLowerCase().includes(query);
        const matchesSynopsis = story.synopsis.toLowerCase().includes(query);
        const matchesCategory = story.categoryName.toLowerCase().includes(query);
        const matchesTagline = (story.tagline || '').toLowerCase().includes(query);
        const matchesPageContent = story.pages.some(p => 
          p.title.toLowerCase().includes(query) || p.text.toLowerCase().includes(query)
        );
        return matchesTitle || matchesSynopsis || matchesCategory || matchesTagline || matchesPageContent;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'readingTime') {
        return parseInt(a.readingTime) - parseInt(b.readingTime);
      }
      if (sortBy === 'stars') {
        return b.stars - a.stars;
      }
      if (sortBy === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      return 0; // featured default order
    });
  }, [activeCategory, showOnlyFavorites, favorites, searchTerm, sortBy]);

  // Open story handler
  const handleOpenStory = (story, startPage = 0) => {
    soundManager.playPageFlip();
    setActiveStory(story);
    setActiveInitialPage(startPage);
  };

  // Resume from bookmark
  const handleResumeBookmark = (bookmark) => {
    const targetStory = STORIES.find(s => s.id === bookmark.storyId);
    if (targetStory) {
      setIsBookmarksOpen(false);
      handleOpenStory(targetStory, bookmark.pageIndex);
    }
  };

  // Story completed handler
  const handleFinishStory = (story) => {
    setActiveStory(null);
    setCompletedStory(story);
    setReadingProgress(getReadingProgress());
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setActiveCategory('all');
    setShowOnlyFavorites(false);
  };

  // Count completed stories
  const completedCount = useMemo(() => {
    return Object.values(readingProgress).filter(p => p.completed).length;
  }, [readingProgress]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/40 via-purple-50/30 to-sky-50/40 text-slate-800 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        bookmarksCount={bookmarks.length}
        favoritesCount={favorites.length}
        showOnlyFavorites={showOnlyFavorites}
        setShowOnlyFavorites={setShowOnlyFavorites}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onHomeClick={() => {
          handleResetFilters();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <HeroBanner
          featuredStory={featuredStory}
          onSelectStory={(s) => handleOpenStory(s, 0)}
          recentBookmark={recentBookmark}
          onResumeBookmark={handleResumeBookmark}
        />

        {/* Stories Catalog Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {/* Category Filter Pills & Controls */}
          <CategoryFilters
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
            totalResults={filteredStories.length}
          />

          {/* Stories Grid */}
          <StoryGrid
            stories={filteredStories}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectStory={(s) => handleOpenStory(s, 0)}
            readingProgress={readingProgress}
            bookmarks={bookmarks}
            viewMode={viewMode}
            onResetFilters={handleResetFilters}
          />

        </section>

        {/* Statistics & Badges Section */}
        <StatsSection
          totalStories={STORIES.length}
          completedCount={completedCount}
        />

      </main>

      {/* Footer */}
      <Footer onSelectCategory={(cat) => {
        setActiveCategory(cat);
        const el = document.getElementById('stories-grid');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* Story Reader Fullscreen View */}
      {activeStory && (
        <StoryReader
          story={activeStory}
          initialPage={activeInitialPage}
          onClose={() => setActiveStory(null)}
          onFinishStory={handleFinishStory}
          bookmarks={bookmarks}
          setBookmarks={setBookmarks}
          readingTheme={settings.theme}
          setReadingTheme={(t) => handleUpdateSetting('theme', t)}
          fontSize={settings.fontSize}
          setFontSize={(f) => handleUpdateSetting('fontSize', f)}
          isFavorite={favorites.includes(activeStory.id)}
          onToggleFavorite={() => handleToggleFavorite(activeStory.id)}
        />
      )}

      {/* Bookmarks Modal Drawer */}
      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarks={bookmarks}
        setBookmarks={setBookmarks}
        onSelectBookmark={handleResumeBookmark}
      />

      {/* Story Completion Celebration Modal */}
      {completedStory && (
        <CompletionModal
          story={completedStory}
          onClose={() => setCompletedStory(null)}
          onReadAgain={() => {
            const storyToRead = completedStory;
            setCompletedStory(null);
            handleOpenStory(storyToRead, 0);
          }}
          onNextStory={() => {
            // Pick next story in list
            const currentIdx = STORIES.findIndex(s => s.id === completedStory.id);
            const nextIdx = (currentIdx + 1) % STORIES.length;
            const nextStory = STORIES[nextIdx];
            setCompletedStory(null);
            handleOpenStory(nextStory, 0);
          }}
        />
      )}

    </div>
  );
}
