import React, { useState, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';

// Components (не ленивые - всегда нужны)
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Accessibility from './components/Accessibility';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy-loaded Pages для оптимизации
const HomePage = lazy(() => import('./pages/HomePage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Loading компонент
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-cream)' }}>
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" 
           style={{ color: 'var(--color-primary)' }}
           role="status"
           aria-label="Загрузка">
        <span className="sr-only">Загрузка...</span>
      </div>
      <p className="mt-4 text-lg" style={{ color: 'var(--color-secondary)' }}>Загрузка...</p>
    </div>
  </div>
);

/**
 * App component - Main application container with routing and layout
 * Features: React Router setup, cart context, animated page transitions
 */
function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <div className="min-h-screen bg-background flex flex-col">
          {/* Accessibility Features */}
          <Accessibility />
          
          {/* Header */}
          <Header onCartClick={toggleCart} />
          
          {/* Main Content */}
          <main id="main-content" className="flex-1">
            <AnimatePresence mode="wait">
              <Suspense fallback={<PageLoader />}>
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/catalog" element={<CatalogPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </AnimatePresence>
          </main>

          {/* Footer */}
          <Footer />

          {/* Cart Sidebar */}
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

          {/* Sonner Toaster */}
          <Toaster position="top-right" richColors />
        </div>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
