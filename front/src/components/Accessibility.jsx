import React, { useEffect } from 'react';

/**
 * Accessibility component - Enhances accessibility features
 * Features: Skip links, focus management, keyboard navigation, screen reader support
 */
const Accessibility = () => {
  useEffect(() => {
    // Add skip link functionality
    const handleKeyDown = (e) => {
      if (e.key === 'Tab' && !e.shiftKey) {
        const skipLink = document.getElementById('skip-to-main');
        if (skipLink && document.activeElement === document.body) {
          skipLink.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Skip to main content link */}
      <a
        id="skip-to-main"
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-amber-600 text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-white"
        onFocus={(e) => e.target.classList.remove('sr-only')}
        onBlur={(e) => e.target.classList.add('sr-only')}
      >
        Перейти к основному содержимому
      </a>

      {/* Screen reader only content */}
      <div className="sr-only">
        <h1>Graziella - Артизанальные итальянские сыры</h1>
        <p>Интернет-магазин премиальных итальянских сыров с доставкой по всей России</p>
      </div>
    </>
  );
};

export default Accessibility;
