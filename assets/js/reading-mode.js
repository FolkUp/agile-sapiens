/**
 * AGILE SAPIENS — Reading Mode (AGIL-166-v2: Firefox-style F9 + navbar integration)
 *
 * Behaviour matches Firefox Reader View parity where reasonable:
 *  - F9 toggles reading mode (Win/Linux/macOS standard)
 *  - Button lives in navbar alongside theme + language switchers
 *  - State persists across pages via LocalStorage (book UX win — Firefox itself is per-tab)
 *  - Esc exits reading mode (a11y deviation from Firefox — WAI-ARIA APG overlay pattern)
 *  - Screen-reader announcements via polite aria-live region (300ms throttled)
 *
 * Implementation notes:
 *  - Button injected via JS into `.hextra-nav-container nav` before `.folkup-theme-toggle`
 *    (project's custom theme-toggle override; see `layouts/_partials/theme-toggle.html`).
 *    A `.hextra-hamburger-menu` fallback handles unexpected navbar shapes.
 *  - WAI-ARIA APG "Button (toggle)" pattern: aria-pressed reflects state.
 *  - All DOM lookups via querySelector inside handlers (no stale closure on button ref).
 *  - setTimeout(1000) backup re-injects if theme JS has removed the button post-mount.
 *  - LocalStorage in try/catch for private/incognito browsers (some throw on access).
 *
 * Lineage:
 *  - v1 (PR #138 prod 2026-05-27): floating top-right button, inline-style overrides
 *    + multi-strategy DOM timing. WCAG SC 2.1.1 verified via axe-core 4.10 on 10 page
 *    types light/dark desktop/mobile (PR #98 Batch A, merged 2026-05-22).
 *  - v2 (this version, AGIL-166-v2): Firefox-style nav-integrated, F9 hotkey, persistence,
 *    ARIA live announcements. Floating-button approach retired.
 *
 * Known limitations (документировано):
 *  - F9 на macOS = mission control. macOS users will need menu click.
 *  - Multi-tab race: state не синхронизируется между tabs без storage event listener.
 *  - NVDA-RU announcement quality зависит от установленного русского TTS голоса.
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'agile-sapiens-reading-mode';
  var BODY_CLASS = 'reading-mode';
  var BUTTON_SELECTOR = '.hextra-reading-mode-toggle';
  var ANCHOR_SELECTOR = '.folkup-theme-toggle';
  var NAVBAR_SELECTOR = '.hextra-nav-container nav';
  var ANNOUNCER_ID = 'reading-mode-announcer';
  var TOGGLE_THROTTLE_MS = 300;

  var LABEL_ENTER = 'Чтение';
  var LABEL_EXIT = 'Выйти';
  var ARIA_ENTER = 'Режим чтения активирован';
  var ARIA_EXIT = 'Режим чтения отключён';
  var TITLE_ENTER = 'Активировать режим чтения (F9)';
  var TITLE_EXIT = 'Выйти из режима чтения (F9)';

  // Heroicons book-open (MIT) — matches Hextra icon library viewBox + stroke style.
  var ICON_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" ' +
    'stroke-width="2" stroke="currentColor" aria-hidden="true" focusable="false" ' +
    'height="24" width="24">' +
    '<path stroke-linecap="round" stroke-linejoin="round" ' +
    'd="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 ' +
    '5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 ' +
    '3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>' +
    '</svg>';

  var lastToggleAt = 0;

  /**
   * Read persisted reading-mode state. Defensive against private-mode LocalStorage throw.
   * @returns {boolean}
   */
  function readPersistedState() {
    try {
      return window.localStorage.getItem(STORAGE_KEY) === 'on';
    } catch (_) {
      return false;
    }
  }

  /**
   * Persist reading-mode state. Defensive against private-mode LocalStorage throw.
   * @param {boolean} on
   */
  function writePersistedState(on) {
    try {
      window.localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off');
    } catch (_) {
      /* swallow — non-persistent session is acceptable degradation */
    }
  }

  /**
   * Ensure a polite ARIA live region exists for screen-reader announcements.
   * @returns {HTMLElement}
   */
  function ensureAnnouncer() {
    var node = document.getElementById(ANNOUNCER_ID);
    if (node) return node;
    node = document.createElement('div');
    node.id = ANNOUNCER_ID;
    node.setAttribute('aria-live', 'polite');
    node.setAttribute('aria-atomic', 'true');
    node.setAttribute('role', 'status');
    // Visually hidden but available to screen readers (WCAG-safe clip pattern).
    node.style.cssText =
      'position:absolute;width:1px;height:1px;padding:0;margin:-1px;' +
      'overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
    document.body.appendChild(node);
    return node;
  }

  /**
   * Sync button visual + ARIA state to the current body class.
   */
  function syncButtonState() {
    var btn = document.querySelector(BUTTON_SELECTOR);
    if (!btn) return;
    var on = document.body.classList.contains(BODY_CLASS);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.setAttribute('title', on ? TITLE_EXIT : TITLE_ENTER);
    var labelNode = btn.querySelector('.hextra-reading-mode-toggle-label');
    if (labelNode) {
      labelNode.textContent = on ? LABEL_EXIT : LABEL_ENTER;
    }
  }

  /**
   * Toggle reading mode. Throttled to prevent ARIA announcement spam.
   */
  function toggleReadingMode() {
    var now = Date.now();
    if (now - lastToggleAt < TOGGLE_THROTTLE_MS) return;
    lastToggleAt = now;

    var enabling = !document.body.classList.contains(BODY_CLASS);
    document.body.classList.toggle(BODY_CLASS, enabling);
    writePersistedState(enabling);
    syncButtonState();
    ensureAnnouncer().textContent = enabling ? ARIA_ENTER : ARIA_EXIT;
  }

  /**
   * Create the reading-mode toggle button element. Styling matches theme controls.
   * @returns {HTMLButtonElement}
   */
  function buildButton() {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'hextra-reading-mode-toggle';
    btn.setAttribute('aria-label', 'Переключить режим чтения');
    btn.setAttribute('aria-pressed', 'false');
    btn.setAttribute('title', TITLE_ENTER);
    btn.innerHTML =
      ICON_SVG +
      '<span class="hextra-reading-mode-toggle-label">' + LABEL_ENTER + '</span>';
    btn.addEventListener('click', toggleReadingMode);
    return btn;
  }

  /**
   * Inject (or re-inject if missing) the button into the navbar before the theme toggle.
   * Idempotent — safe to call on multiple events / from the retry backup.
   */
  function injectButton() {
    if (document.querySelector(BUTTON_SELECTOR)) {
      syncButtonState();
      return;
    }
    var nav = document.querySelector(NAVBAR_SELECTOR);
    if (!nav) return;

    var btn = buildButton();
    var anchor = nav.querySelector(ANCHOR_SELECTOR);
    if (anchor && anchor.parentElement && anchor.parentElement.parentElement === nav) {
      nav.insertBefore(btn, anchor.parentElement);
    } else if (anchor) {
      nav.insertBefore(btn, anchor);
    } else {
      // Fallback: place before hamburger so mobile menu button stays at the end.
      var hamburger = nav.querySelector('.hextra-hamburger-menu');
      if (hamburger) {
        nav.insertBefore(btn, hamburger);
      } else {
        nav.appendChild(btn);
      }
    }
    syncButtonState();
  }

  /**
   * Determine whether a key event originated from a text-entry element. Used to
   * prevent Esc from exiting reading mode while a user is dismissing a search overlay.
   * @param {KeyboardEvent} e
   * @returns {boolean}
   */
  function isTextEntryTarget(e) {
    var t = e.target;
    if (!t || typeof t.closest !== 'function') return false;
    return !!t.closest('input, textarea, select, [contenteditable="true"], [contenteditable=""]');
  }

  /**
   * Global keydown handler — F9 toggles, Escape exits (when applicable).
   * @param {KeyboardEvent} e
   */
  function handleKeydown(e) {
    if (e.defaultPrevented) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    if (e.key === 'F9') {
      toggleReadingMode();
      e.preventDefault();
      return;
    }

    if (e.key === 'Escape' && document.body.classList.contains(BODY_CLASS)) {
      if (isTextEntryTarget(e)) return;
      toggleReadingMode();
      e.preventDefault();
    }
  }

  /**
   * Initialise: restore persisted state, inject button, attach global hotkeys.
   */
  function init() {
    if (readPersistedState()) {
      document.body.classList.add(BODY_CLASS);
    }
    injectButton();
    document.addEventListener('keydown', handleKeydown);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Backup: re-inject after 1s in case theme JS rebuilt the navbar after our first pass.
  setTimeout(injectButton, 1000);
})();
