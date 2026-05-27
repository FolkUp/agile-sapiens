/**
 * AGILE SAPIENS — Reading Mode (AGIL-166 production-adopted)
 *
 * Production build for «Режим чтения» button.
 * Background: clean architecture (former reading-mode.js, 257 lines)
 * shipped 2026-05-15 had button-visibility issue not resolvable in same
 * session. Debug build with inline-style overrides + multi-strategy DOM
 * timing was adopted as production fix (commit 402bcde 2026-05-15).
 *
 * 2026-05-27 (AGIL-166 follow-up):
 *  - Debug build formally adopted as canonical reading-mode.js
 *  - 11 console.log/error calls stripped (developer-tool hygiene)
 *  - File renamed from reading-mode-simple.js to canonical reading-mode.js
 *  - Old 257-line clean build deleted (dead asset, never loaded since
 *    402bcde)
 *
 * Gaps vs original clean build, deferred to AGIL-166-v2 (CSS root-cause
 * investigation required first):
 *  - Escape-key shortcut to exit reading mode
 *  - Alt+R keyboard toggle
 *  - LocalStorage state persistence across pages
 *  - ARIA live-region announcements for screen readers
 *  - Focus save/restore on enter/exit
 * WCAG SC 2.1.1 satisfied via default <button> keyboard handling
 * (Tab to focus, Enter/Space to activate). axe-core audited PR #98.
 */

function createReadingModeButton() {
  // Remove any existing buttons first (idempotency)
  const existing = document.querySelector('.reading-mode-toggle');
  if (existing) {
    existing.remove();
  }

  const button = document.createElement('button');
  button.className = 'reading-mode-toggle';
  button.textContent = 'Режим чтения';
  button.setAttribute('aria-label', 'Переключить режим чтения');
  button.setAttribute('type', 'button');
  button.setAttribute('title', 'Активировать режим чтения');

  // Inline styles to ensure visibility (defeats any CSS specificity issue)
  button.style.cssText = `
    position: fixed !important;
    top: 20px !important;
    right: 20px !important;
    z-index: 9999 !important;
    background: var(--folkup-bordeaux) !important;
    color: var(--folkup-ivory) !important;
    border: none !important;
    padding: 10px 15px !important;
    border-radius: 5px !important;
    font-size: 14px !important;
    cursor: pointer !important;
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
  `;

  button.addEventListener('click', function() {
    document.body.classList.toggle('reading-mode');
    if (document.body.classList.contains('reading-mode')) {
      button.textContent = 'Выйти из режима';
    } else {
      button.textContent = 'Режим чтения';
    }
  });

  if (document.body) {
    document.body.appendChild(button);
  }
}

// Multiple timing strategies (covers DOMContentLoaded race + late-running theme JS)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createReadingModeButton);
} else {
  createReadingModeButton();
}

// Backup: re-check after 1s in case earlier creation got removed by theme JS
setTimeout(function() {
  if (!document.querySelector('.reading-mode-toggle')) {
    createReadingModeButton();
  }
}, 1000);