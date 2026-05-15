/**
 * AGILE SAPIENS — Reading Mode Implementation (AGIL-166)
 * Author: Enhanced Alice v2.0 L3 Frontend Team · 2026-05-15
 *
 * Functionality: Full-screen immersive reading mode
 * User request: "режим чтения" button for comfortable book navigation
 *
 * Features:
 *  - Toggle button with Russian text
 *  - Keyboard support (Escape key to exit)
 *  - Local storage for state persistence
 *  - Accessibility support
 *  - Mobile responsive
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    buttonTexts: {
      enter: 'Режим чтения',
      exit: 'Выйти из режима чтения'
    },
    localStorageKey: 'agile-sapiens-reading-mode',
    className: 'reading-mode'
  };

  // State management
  let isReadingMode = false;
  let toggleButton = null;

  /**
   * Initialize reading mode functionality
   */
  function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    createToggleButton();
    setupEventListeners();
    restoreState();
  }

  /**
   * Create the toggle button and add it to the page
   */
  function createToggleButton() {
    toggleButton = document.createElement('button');
    toggleButton.className = 'reading-mode-toggle';
    toggleButton.textContent = CONFIG.buttonTexts.enter;
    toggleButton.setAttribute('aria-label', 'Переключить режим чтения');
    toggleButton.setAttribute('type', 'button');
    toggleButton.setAttribute('title', 'Скрыть навигацию для комфортного чтения');

    document.body.appendChild(toggleButton);
  }

  /**
   * Setup event listeners
   */
  function setupEventListeners() {
    // Toggle button click
    toggleButton.addEventListener('click', toggleReadingMode);

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeydown);

    // Handle browser back/forward navigation
    window.addEventListener('popstate', restoreState);

    // Handle page visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }

  /**
   * Toggle reading mode on/off
   */
  function toggleReadingMode() {
    isReadingMode = !isReadingMode;
    updateReadingMode();
  }

  /**
   * Update the reading mode state
   */
  function updateReadingMode() {
    const body = document.body;

    if (isReadingMode) {
      body.classList.add(CONFIG.className);
      toggleButton.textContent = CONFIG.buttonTexts.exit;
      toggleButton.setAttribute('aria-label', 'Выйти из режима чтения');
      toggleButton.setAttribute('title', 'Показать навигацию');

      // Focus management - save current focus
      const activeElement = document.activeElement;
      if (activeElement && activeElement !== toggleButton) {
        sessionStorage.setItem('agile-sapiens-last-focus', activeElement.id || activeElement.tagName);
      }

    } else {
      body.classList.remove(CONFIG.className);
      toggleButton.textContent = CONFIG.buttonTexts.enter;
      toggleButton.setAttribute('aria-label', 'Переключить режим чтения');
      toggleButton.setAttribute('title', 'Скрыть навигацию для комфортного чтения');

      // Restore focus if possible
      restoreFocus();
    }

    // Save state to local storage
    saveState();

    // Announce to screen readers
    announceStateChange();

    // Scroll to top when entering reading mode
    if (isReadingMode) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /**
   * Handle keyboard shortcuts
   */
  function handleKeydown(event) {
    // Escape key exits reading mode
    if (event.key === 'Escape' && isReadingMode) {
      event.preventDefault();
      isReadingMode = false;
      updateReadingMode();
    }

    // Alt + R toggles reading mode
    if (event.altKey && event.key.toLowerCase() === 'r') {
      event.preventDefault();
      toggleReadingMode();
    }
  }

  /**
   * Handle page visibility changes
   */
  function handleVisibilityChange() {
    if (document.hidden) {
      saveState();
    }
  }

  /**
   * Save reading mode state to local storage
   */
  function saveState() {
    try {
      localStorage.setItem(CONFIG.localStorageKey, JSON.stringify({
        isReadingMode: isReadingMode,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.warn('Failed to save reading mode state:', error);
    }
  }

  /**
   * Restore reading mode state from local storage
   */
  function restoreState() {
    try {
      const saved = localStorage.getItem(CONFIG.localStorageKey);
      if (saved) {
        const state = JSON.parse(saved);

        // Don't restore state if it's older than 24 hours
        const isExpired = Date.now() - (state.timestamp || 0) > 24 * 60 * 60 * 1000;

        if (!isExpired && state.isReadingMode !== isReadingMode) {
          isReadingMode = state.isReadingMode;
          updateReadingMode();
        }
      }
    } catch (error) {
      console.warn('Failed to restore reading mode state:', error);
    }
  }

  /**
   * Restore focus to previously focused element
   */
  function restoreFocus() {
    try {
      const lastFocusId = sessionStorage.getItem('agile-sapiens-last-focus');
      if (lastFocusId) {
        const element = document.getElementById(lastFocusId) ||
                       document.querySelector(lastFocusId);
        if (element && element.focus) {
          element.focus();
        }
        sessionStorage.removeItem('agile-sapiens-last-focus');
      }
    } catch (error) {
      console.warn('Failed to restore focus:', error);
    }
  }

  /**
   * Announce state change to screen readers
   */
  function announceStateChange() {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.style.position = 'absolute';
    announcement.style.left = '-9999px';
    announcement.textContent = isReadingMode ?
      'Режим чтения включен. Нажмите Escape для выхода.' :
      'Режим чтения выключен.';

    document.body.appendChild(announcement);

    // Remove announcement after screen readers have processed it
    setTimeout(() => {
      if (announcement.parentNode) {
        announcement.parentNode.removeChild(announcement);
      }
    }, 1000);
  }

  /**
   * Cleanup function (for testing or page unload)
   */
  function cleanup() {
    if (toggleButton && toggleButton.parentNode) {
      toggleButton.parentNode.removeChild(toggleButton);
    }

    document.removeEventListener('keydown', handleKeydown);
    window.removeEventListener('popstate', restoreState);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  }

  // Initialize when script loads
  init();

  // Export for testing or debugging
  if (typeof window !== 'undefined') {
    window.AgileSapiensReadingMode = {
      toggle: toggleReadingMode,
      isActive: () => isReadingMode,
      cleanup: cleanup
    };
  }

})();