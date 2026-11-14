// Web Speech API wrapper for kids storybook read-aloud narration

class SpeechNarrationManager {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtterance = null;
    this.isPlaying = false;
    this.isPaused = false;
    this.rate = 0.95; // slightly slower for young readers
    this.pitch = 1.1; // friendly slightly warmer pitch
    this.voices = [];
    this.selectedVoice = null;
    this.listeners = new Set();

    if (this.synth) {
      this.loadVoices();
      if (typeof window !== 'undefined' && window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    // Prioritize friendly, natural English voices
    const preferredNames = ['Google US English', 'Samantha', 'Karen', 'Victoria', 'Zira', 'Natural', 'English'];
    for (const name of preferredNames) {
      const match = this.voices.find(v => v.lang.startsWith('en') && v.name.includes(name));
      if (match) {
        this.selectedVoice = match;
        break;
      }
    }
    if (!this.selectedVoice && this.voices.length > 0) {
      this.selectedVoice = this.voices.find(v => v.lang.startsWith('en')) || this.voices[0];
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(event, data) {
    this.listeners.forEach(fn => fn(event, data));
  }

  speak(text) {
    if (!this.synth) return;
    this.stop();

    if (!text || text.trim() === '') return;

    // Clean text of markdown or special characters
    const cleanText = text.replace(/[*_~`#]/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;

    utterance.onstart = () => {
      this.isPlaying = true;
      this.isPaused = false;
      this.notify('start');
    };

    utterance.onpause = () => {
      this.isPlaying = false;
      this.isPaused = true;
      this.notify('pause');
    };

    utterance.onresume = () => {
      this.isPlaying = true;
      this.isPaused = false;
      this.notify('resume');
    };

    utterance.onend = () => {
      this.isPlaying = false;
      this.isPaused = false;
      this.notify('end');
    };

    utterance.onerror = (err) => {
      this.isPlaying = false;
      this.isPaused = false;
      this.notify('error', err);
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  pause() {
    if (this.synth && this.isPlaying) {
      this.synth.pause();
      this.isPlaying = false;
      this.isPaused = true;
      this.notify('pause');
    }
  }

  resume() {
    if (this.synth && this.isPaused) {
      this.synth.resume();
      this.isPlaying = true;
      this.isPaused = false;
      this.notify('resume');
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isPlaying = false;
      this.isPaused = false;
      this.currentUtterance = null;
      this.notify('stop');
    }
  }

  setRate(rate) {
    this.rate = rate;
  }

  getRate() {
    return this.rate;
  }
}

export const speechManager = new SpeechNarrationManager();
