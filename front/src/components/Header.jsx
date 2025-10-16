import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Menu } from 'lucide-react';
import { useTotalItems } from '../store/cartStore';

/**
 * Header component - Navigation bar with elegant Italian-inspired design
 * Features: Active link highlighting, smooth animations, responsive design, cart integration, mobile hamburger menu
 */
const Header = ({ onCartClick }) => {
  const location = useLocation();
  const totalItems = useTotalItems();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Главная' },
    { path: '/catalog', label: 'Каталог' },
    { path: '/about', label: 'О нас' }
  ];

  return (
    <motion.header 
      className="sticky top-0 z-50"
      style={{ 
        background: 'linear-gradient(135deg, var(--color-cream) 0%, #FFF8E1 100%)',
        boxShadow: '0 6px 24px rgba(0, 0, 0, 0.06)'
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      role="banner"
    >
      <nav className="container mx-auto px-6 py-6" role="navigation" aria-label="Основная навигация">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2 sm:space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link 
              to="/" 
              className="flex items-center space-x-2 sm:space-x-3 focus:outline-none" 
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                // Если уже на главной странице, обновляем страницу
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.location.reload();
                }
                // Прокручиваем к началу страницы
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              aria-label="Graziella - Главная страница"
            >
              {/* Italian Flag Logo */}
              <div className="flex items-center space-x-1">
                <div className="w-6 h-4 sm:w-8 sm:h-5 rounded-sm overflow-hidden flex">
                  <div className="w-1/3 bg-green-600"></div>
                  <div className="w-1/3 bg-white"></div>
                  <div className="w-1/3 bg-red-600"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-h5 sm:text-h4 font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Graziella
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <motion.div key={item.path} whileHover={{ scale: 1.05 }}>
                <Link
                  to={item.path}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 font-medium text-body ${
                    location.pathname === item.path
                      ? 'text-white'
                      : 'text-gray-600 hover:text-red-600'
                  }`}
                  style={{
                    backgroundColor: location.pathname === item.path ? 'var(--color-primary)' : 'transparent'
                  }}
                  onClick={() => {
                    // Прокручиваем к началу страницы при переходе
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.div
                      className="absolute inset-0 rounded-lg -z-10"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            
            {/* Cart Button */}
            <motion.button
              onClick={onCartClick}
              className="relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 text-body"
              style={{ 
                backgroundColor: 'var(--color-primary)',
                color: 'white'
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'var(--color-secondary)'
              }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Корзина покупок. Товаров в корзине: ${totalItems}`}
            >
              <ShoppingCart className="h-5 w-5" aria-hidden />
              <span className="font-medium">Корзина</span>
              {totalItems > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Cart Button for Mobile - Compact */}
            <motion.button
              onClick={onCartClick}
              className="relative p-2 rounded-lg transition-all duration-300 flex items-center justify-center"
              style={{ 
                backgroundColor: 'var(--color-primary)',
                color: 'white'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Корзина (${totalItems})`}
            >
              <ShoppingCart className="h-5 w-5" aria-hidden />
              {totalItems > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium min-w-[18px] h-[18px] flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>
            
            {/* Hamburger Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg transition-colors duration-200"
              style={{ color: 'var(--color-secondary)' }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle mobile menu"
            >
              <motion.span 
                className="text-3xl"
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <X aria-hidden /> : <Menu aria-hidden />}
              </motion.span>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      // Прокручиваем к началу страницы при переходе
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`block px-4 py-3 rounded-lg transition-all duration-200 font-medium text-lg ${
                      location.pathname === item.path
                        ? 'text-white'
                        : 'text-gray-600 hover:text-red-600'
                    }`}
                    style={{
                      backgroundColor: location.pathname === item.path ? 'var(--color-primary)' : 'transparent'
                    }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;