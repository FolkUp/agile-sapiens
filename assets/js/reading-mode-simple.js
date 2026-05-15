/**
 * Simple Reading Mode Implementation - Debug Version
 * Simplified for troubleshooting button visibility issues
 */

// Create button immediately when script loads
console.log('Reading mode script starting...');

// Simple button creation without DOM ready checks
function createReadingModeButton() {
  console.log('Creating reading mode button...');

  // Remove any existing buttons first
  const existing = document.querySelector('.reading-mode-toggle');
  if (existing) {
    existing.remove();
  }

  // Create button
  const button = document.createElement('button');
  button.className = 'reading-mode-toggle';
  button.textContent = 'Режим чтения';
  button.setAttribute('aria-label', 'Переключить режим чтения');
  button.setAttribute('type', 'button');
  button.setAttribute('title', 'Активировать режим чтения');

  // Add inline styles to ensure visibility
  button.style.cssText = `
    position: fixed !important;
    top: 20px !important;
    right: 20px !important;
    z-index: 9999 !important;
    background: #007bff !important;
    color: white !important;
    border: none !important;
    padding: 10px 15px !important;
    border-radius: 5px !important;
    font-size: 14px !important;
    cursor: pointer !important;
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
  `;

  // Add click handler
  button.addEventListener('click', function() {
    console.log('Reading mode button clicked!');
    document.body.classList.toggle('reading-mode');

    if (document.body.classList.contains('reading-mode')) {
      button.textContent = 'Выйти из режима';
    } else {
      button.textContent = 'Режим чтения';
    }
  });

  // Try multiple insertion strategies
  try {
    if (document.body) {
      document.body.appendChild(button);
      console.log('Button added to body successfully');
    } else {
      console.log('Document body not available');
    }
  } catch (error) {
    console.error('Error adding button:', error);
  }
}

// Try multiple timing strategies
if (document.readyState === 'loading') {
  console.log('Document still loading, waiting for DOMContentLoaded...');
  document.addEventListener('DOMContentLoaded', createReadingModeButton);
} else {
  console.log('Document already loaded, creating button immediately...');
  createReadingModeButton();
}

// Also try creating the button after a short delay as backup
setTimeout(function() {
  console.log('Timeout backup - checking if button exists...');
  if (!document.querySelector('.reading-mode-toggle')) {
    console.log('Button not found, creating via timeout...');
    createReadingModeButton();
  }
}, 1000);

// Export for debugging
window.createReadingModeButton = createReadingModeButton;

console.log('Reading mode script initialization complete');