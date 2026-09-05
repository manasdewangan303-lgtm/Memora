/**
 * MEMORA - Voice Assistant & Hover-to-Speak Accessibility Service
 * Features:
 * 1. Multilingual Text-to-Speech (TTS) automatically matching selected language (EN, HI, AS).
 * 2. Intelligent voice detection with graceful language fallbacks.
 * 3. Hover-to-Speak / Pointer-to-Speak for elderly accessibility (debounced, non-repeating, mouse-only).
 * 4. Resilient touch / mobile separation and visual focus indicators.
 */

const VoiceService = {
  isSpeaking: false,
  isListening: false,
  recognition: null,
  currentLang: 'en',
  availableVoices: [],
  selectedVoice: null,

  init() {
    this.currentLang = (typeof currentLang !== 'undefined') ? currentLang : 'en';
    this.loadVoices();

    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        this.loadVoices();
      };
    }

    this.initSpeechRecognition();
    AccessibilitySpeaker.init();
  },

  loadVoices() {
    if (!('speechSynthesis' in window)) return;
    this.availableVoices = window.speechSynthesis.getVoices();
    this.updateVoiceForLanguage(this.currentLang);
  },

  setLanguage(lang) {
    this.currentLang = lang;
    this.updateVoiceForLanguage(lang);
    if (this.recognition) {
      this.recognition.lang = lang === 'hi' ? 'hi-IN' : (lang === 'as' ? 'bn-IN' : 'en-IN');
    }
  },

  updateVoiceForLanguage(lang) {
    if (!this.availableVoices || this.availableVoices.length === 0) return;

    let targetVoice = null;

    if (lang === 'hi') {
      // Find Hindi voice
      targetVoice = this.availableVoices.find(v => 
        v.lang === 'hi-IN' || v.lang.startsWith('hi') || v.name.toLowerCase().includes('hindi') || v.name.includes('हिन्दी')
      );
      // Fallback: any Indian regional voice
      if (!targetVoice) {
        targetVoice = this.availableVoices.find(v => v.lang.includes('IN'));
      }
    } else if (lang === 'as') {
      // Assamese / Bengali phonetic engine fallback
      targetVoice = this.availableVoices.find(v => 
        v.lang === 'as-IN' || v.lang.startsWith('as') || v.lang === 'bn-IN' || v.lang.startsWith('bn')
      );
      if (!targetVoice) {
        targetVoice = this.availableVoices.find(v => v.lang.includes('IN'));
      }
    } else {
      // English: Prefer Indian English, then British/US
      targetVoice = this.availableVoices.find(v => v.lang === 'en-IN') ||
                    this.availableVoices.find(v => v.lang.startsWith('en'));
    }

    // Default fallback
    if (!targetVoice && this.availableVoices.length > 0) {
      targetVoice = this.availableVoices[0];
    }

    this.selectedVoice = targetVoice;
    console.log(`[VoiceService] Voice for '${lang}':`, this.selectedVoice ? `${this.selectedVoice.name} (${this.selectedVoice.lang})` : 'Default');
  },

  speak(textOrKey, onComplete, langOverride) {
    if (!('speechSynthesis' in window)) {
      if (onComplete) onComplete();
      return;
    }

    const lang = langOverride || this.currentLang;
    let spokenText = textOrKey;

    // Check if a translation key was passed
    if (typeof I18N_DATA !== 'undefined' && I18N_DATA[lang] && I18N_DATA[lang][textOrKey]) {
      spokenText = I18N_DATA[lang][textOrKey];
    } else if (typeof t === 'function' && t(textOrKey) !== textOrKey) {
      spokenText = t(textOrKey);
    }

    if (!spokenText || typeof spokenText !== 'string') return;

    // Cancel running speech to avoid overlapping
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(spokenText);

    // Language code mapping
    const langCode = lang === 'hi' ? 'hi-IN' : (lang === 'as' ? 'bn-IN' : 'en-IN');
    utterance.lang = langCode;

    // Apply specific voice if matching
    if (!this.selectedVoice || !this.selectedVoice.lang.startsWith(langCode.substring(0, 2))) {
      this.updateVoiceForLanguage(lang);
    }
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    // Calm, soothing elderly rate (0.85)
    utterance.rate = 0.85;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onComplete) onComplete();
    };

    utterance.onerror = (e) => {
      this.isSpeaking = false;
      if (onComplete) onComplete();
    };

    this.isSpeaking = true;
    window.speechSynthesis.speak(utterance);
  },

  speakKey(key, onComplete) {
    this.speak(key, onComplete);
  },

  cancel() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
    }
  },

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 3;

      this.recognition.onstart = () => {
        this.isListening = true;
        this.updateStatus(t('voice_listening') || "Listening... Please speak now");
        document.querySelectorAll('.voice-mic-btn').forEach(b => b.classList.add('listening'));
      };

      this.recognition.onend = () => {
        this.isListening = false;
        document.querySelectorAll('.voice-mic-btn').forEach(b => b.classList.remove('listening'));
      };

      this.recognition.onerror = () => {
        this.isListening = false;
        document.querySelectorAll('.voice-mic-btn').forEach(b => b.classList.remove('listening'));
        this.updateStatus("Voice recognition paused. You can use the large buttons!");
      };
    }
  },

  listen(onResultCallback) {
    if (!this.recognition) {
      this.updateStatus("Microphone not available in this browser. Please tap the options!");
      return;
    }

    this.recognition.lang = this.currentLang === 'hi' ? 'hi-IN' : (this.currentLang === 'as' ? 'bn-IN' : 'en-IN');

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      this.updateStatus(`Heard: "${transcript}"`);
      if (onResultCallback) {
        onResultCallback(transcript);
      }
    };

    try {
      this.recognition.start();
    } catch (e) {
      console.warn("Speech recognition already active:", e);
    }
  },

  stopListening() {
    if (this.recognition && this.isListening) {
      try { this.recognition.stop(); } catch(e) {}
    }
  },

  updateStatus(msg) {
    const statusEl = document.getElementById('voice-status-display');
    if (statusEl) {
      statusEl.textContent = msg;
    }
  }
};

/**
 * ============================================================================
 * ACCESSIBILITY SPEAKER: HOVER-TO-SPEAK / POINTER-TO-SPEAK ENGINE
 * Automatically speaks interactive option descriptions when pointer hovers.
 * Features:
 * - 350ms debounce prevents chaotic streams
 * - Executes once per element entry (does not repeat while moving inside)
 * - Cancel and replace when moving to another element
 * - Mouse / Pointer only (touch interaction is cleanly ignored to protect mobile)
 * - Visual accessible focus outline
 * ============================================================================
 */
const AccessibilitySpeaker = {
  enabled: true,
  hoverTimer: null,
  currentElement: null,
  debounceMs: 350,

  init() {
    // Event delegation on document for robust dynamic element support
    document.addEventListener('pointerover', (e) => this.handlePointerOver(e));
    document.addEventListener('pointerout', (e) => this.handlePointerOut(e));
    document.addEventListener('click', (e) => this.handleClick(e));
  },

  toggle() {
    this.enabled = !this.enabled;
    const btn = document.getElementById('voice-guide-toggle-btn');
    if (btn) {
      if (this.enabled) {
        btn.classList.add('active');
        btn.innerHTML = '<span>🔊</span> Voice Guide: ON';
        VoiceService.speakKey('voice_guide_on');
      } else {
        btn.classList.remove('active');
        btn.innerHTML = '<span>🔇</span> Voice Guide: OFF';
        VoiceService.cancel();
        VoiceService.speakKey('voice_guide_off');
      }
    }
  },

  handlePointerOver(e) {
    if (!this.enabled) return;

    // Ignore touchscreen touches so mobile tapping/scrolling works without unwanted hover speech
    if (e.pointerType === 'touch') return;

    // Find the closest meaningful speakable interactive container
    const target = e.target.closest(`
      [data-speak],
      [data-speak-key],
      [data-speak-text],
      .elderly-btn,
      .object-card,
      .status-mini-card,
      .role-tab-btn,
      .back-btn,
      .network-toggle-btn,
      .voice-mic-btn,
      .reminder-check-btn,
      .sih-nav-btn
    `);

    if (!target) return;

    // If pointer is moving inside the same element, do NOT repeat speech
    if (target === this.currentElement) return;

    // Pointer entered a new interactive element
    this.currentElement = target;
    clearTimeout(this.hoverTimer);

    // Debounce to prevent rapid, chaotic audio when pointer glances over multiple items
    this.hoverTimer = setTimeout(() => {
      this.speakElement(target);
    }, this.debounceMs);
  },

  handlePointerOut(e) {
    // If leaving the current element to outside
    if (this.currentElement && (!e.relatedTarget || !this.currentElement.contains(e.relatedTarget))) {
      clearTimeout(this.hoverTimer);
      this.currentElement.classList.remove('hover-speaking');
      this.currentElement = null;
    }
  },

  handleClick(e) {
    // When user clicks an element, clear hover timer so it doesn't speak old hover text
    clearTimeout(this.hoverTimer);
    if (this.currentElement) {
      this.currentElement.classList.remove('hover-speaking');
      this.currentElement = null;
    }
  },

  speakElement(el) {
    if (!el || !document.body.contains(el)) return;

    const textToSpeak = this.extractElementSpeechText(el);
    if (!textToSpeak) return;

    // Highlight element visually with accessible focus outline
    document.querySelectorAll('.hover-speaking').forEach(item => item.classList.remove('hover-speaking'));
    el.classList.add('hover-speaking');

    // Cancel previous speech and speak the new element description in selected language
    VoiceService.cancel();
    VoiceService.speak(textToSpeak, () => {
      el.classList.remove('hover-speaking');
    });
  },

  extractElementSpeechText(el) {
    // 1. Explicit translation key
    if (el.dataset.speakKey) {
      return t(el.dataset.speakKey);
    }

    // 2. Explicit direct text or data-speak
    if (el.dataset.speak) {
      return el.dataset.speak;
    }
    if (el.dataset.speakText) {
      return el.dataset.speakText;
    }

    // 3. Elderly Button: speak title and subtext
    if (el.classList.contains('elderly-btn')) {
      const titleEl = el.querySelector('.btn-title');
      const subEl = el.querySelector('.btn-subtext');
      const title = titleEl ? titleEl.innerText.trim() : '';
      const sub = subEl ? subEl.innerText.trim() : '';
      if (title && sub) return `${title}. ${sub}`;
      if (title) return title;
    }

    // 4. Object Card in cognitive games
    if (el.classList.contains('object-card')) {
      const labelEl = el.querySelector('.object-label');
      if (labelEl) return labelEl.innerText.trim();
    }

    // 5. Status Mini Card on Patient Home
    if (el.classList.contains('status-mini-card')) {
      const titleEl = el.querySelector('.status-title');
      const valEl = el.querySelector('.status-value');
      const title = titleEl ? titleEl.innerText.trim() : '';
      const val = valEl ? valEl.innerText.trim() : '';
      if (title && val) return `${title}: ${val}`;
    }

    // 6. Reminder Check Button
    if (el.classList.contains('reminder-check-btn')) {
      const parent = el.closest('.patient-reminder-item');
      if (parent) {
        return `${parent.innerText.trim()}`;
      }
      return el.innerText.trim();
    }

    // 7. General readable text
    if (el.getAttribute('title')) {
      return el.getAttribute('title');
    }

    if (el.getAttribute('aria-label')) {
      return el.getAttribute('aria-label');
    }

    const cleanText = el.innerText ? el.innerText.replace(/[\r\n]+/g, ' ').trim() : '';
    if (cleanText && cleanText.length < 100) {
      return cleanText;
    }

    return null;
  }
};

// Initialize services on window load
window.addEventListener('DOMContentLoaded', () => {
  VoiceService.init();
});
