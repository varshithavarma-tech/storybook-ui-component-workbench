// LocalStorage helper for Storybook favorites, bookmarks, and preferences

const FAVORITES_KEY = 'storybook_favorites_v1';
const BOOKMARKS_KEY = 'storybook_bookmarks_v1';
const PROGRESS_KEY = 'storybook_progress_v1';
const SETTINGS_KEY = 'storybook_settings_v1';

export const getFavorites = () => {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : ['story-1', 'story-3']; // Default favorites for a welcoming feel
  } catch (e) {
    return ['story-1', 'story-3'];
  }
};

export const toggleFavorite = (storyId) => {
  try {
    const favs = getFavorites();
    const index = favs.indexOf(storyId);
    let updated;
    if (index > -1) {
      updated = favs.filter(id => id !== storyId);
    } else {
      updated = [...favs, storyId];
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
};

export const isFavorite = (storyId) => {
  const favs = getFavorites();
  return favs.includes(storyId);
};

export const getBookmarks = () => {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const saveBookmark = (bookmark) => {
  try {
    const bookmarks = getBookmarks();
    // Check if bookmark for this story and page already exists
    const existingIndex = bookmarks.findIndex(
      b => b.storyId === bookmark.storyId && b.pageIndex === bookmark.pageIndex
    );
    let updated;
    if (existingIndex > -1) {
      updated = [...bookmarks];
      updated[existingIndex] = { ...bookmark, updatedAt: new Date().toISOString() };
    } else {
      updated = [{ ...bookmark, id: 'bm_' + Date.now(), createdAt: new Date().toISOString() }, ...bookmarks];
    }
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
};

export const removeBookmark = (bookmarkId) => {
  try {
    const bookmarks = getBookmarks();
    const updated = bookmarks.filter(b => b.id !== bookmarkId);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
};

export const getReadingProgress = () => {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
};

export const updateReadingProgress = (storyId, pageIndex, totalPages, isCompleted = false) => {
  try {
    const progress = getReadingProgress();
    const percent = Math.min(100, Math.round(((pageIndex + 1) / totalPages) * 100));
    progress[storyId] = {
      pageIndex,
      totalPages,
      percent,
      completed: isCompleted || percent === 100,
      lastRead: new Date().toISOString()
    };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    return progress;
  } catch (e) {
    return {};
  }
};

export const getSettings = () => {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? JSON.parse(raw) : {
      theme: 'pastel', // 'pastel', 'sepia', 'night'
      fontSize: 'medium', // 'small', 'medium', 'large', 'xl'
      soundEnabled: true,
      voiceSpeed: 1.0,
      fontFamily: 'quicksand' // 'quicksand', 'dyslexic', 'serif'
    };
  } catch (e) {
    return {
      theme: 'pastel',
      fontSize: 'medium',
      soundEnabled: true,
      voiceSpeed: 1.0,
      fontFamily: 'quicksand'
    };
  }
};

export const saveSettings = (newSettings) => {
  try {
    const current = getSettings();
    const updated = { ...current, ...newSettings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return newSettings;
  }
};
