import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useCartStore, { useTotalPrice } from '../store/cartStore';
import { X, Trash2, Minus, Plus, ShoppingCart } from 'lucide-react';
import ProductIcon from './ProductIcon';

/**
 * Cart component - Displays cart contents with item management
 * Features: Animated cart items, quantity controls, remove functionality
 */
const Cart = ({ isOpen, onClose }) => {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const totalPrice = useTotalPrice();
  const navigate = useNavigate();

  // Calculated totals to match CartPage
  const taxRate = 0.08;
  const subtotal = totalPrice; // in cents
  const taxAmount = Math.round(subtotal * taxRate);
  const totalWithTax = subtotal + taxAmount;

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-[1px] z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Cart Panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col rounded-l-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            {/* Cart Header */}
            <motion.div
              className="text-white p-6 flex items-center justify-between"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)'
              }}
            >
              <h2 id="cart-title" className="text-h5 font-serif font-semibold flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5" aria-hidden />
                <span>Корзина покупок</span>
              </h2>
              <motion.button
                onClick={onClose}
                className="text-white hover:text-amber-200 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-5 w-5" aria-hidden />
              </motion.button>
            </motion.div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Live region for screen readers */}
              <div className="sr-only" aria-live="polite" aria-atomic="true">
                Товаров в корзине: {items.length}
              </div>
              {items.length === 0 ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex justify-center mb-4">
                    <ShoppingCart size={64} className="text-gray-400" />
                  </div>
                   <h3 className="text-h6 font-serif text-gray-600 mb-2">
                    Ваша корзина пуста
                  </h3>
                   <p className="text-small text-gray-500 leading-relaxed">
                    Добавьте вкусные сыры, чтобы начать!
                  </p>
                  <div className="mt-6">
                    <motion.button
                      onClick={() => {
                        onClose?.();
                        navigate('/catalog');
                      }}
                      className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Перейти в каталог
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="bg-white border border-gray-100 rounded-xl p-4 flex items-center space-x-4 shadow-sm"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50, scale: 0.8 }}
                        transition={{ delay: index * 0.1 }}
                        layout
                      >
                            {/* Product Icon */}
                            <motion.div
                              className="flex items-center justify-center flex-shrink-0"
                              whileHover={{ scale: 1.2, rotate: 5 }}
                              transition={{ type: 'spring', stiffness: 300 }}
                            >
                              <ProductIcon icon={item.icon || 'package'} size={40} />
                            </motion.div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-h6 font-semibold text-gray-800 truncate">
                            {item.name}
                          </h4>
                          <p className="text-small text-gray-600 leading-relaxed">
                            {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(item.price / 100)} за штуку
                          </p>
                          <p className="text-small text-amber-600 font-medium">
                            Итого: {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format((item.price * item.quantity) / 100)}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <motion.button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-9 h-9 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors touch-manipulation"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Уменьшить количество"
                          >
                            <Minus className="h-4 w-4" aria-hidden />
                          </motion.button>
                          <span className="w-8 text-center font-semibold text-sm sm:text-base">
                            {item.quantity}
                          </span>
                          <motion.button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-9 h-9 bg-amber-600 text-white rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors touch-manipulation"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Увеличить количество"
                          >
                            <Plus className="h-4 w-4" aria-hidden />
                          </motion.button>
                        </div>

                        {/* Remove Button */}
                        <motion.button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors p-2"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                        >
                          <Trash2 className="h-4 w-4" aria-hidden />
                        </motion.button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {items.length > 0 && (
              <motion.div
                className="border-t p-6 bg-gray-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="mb-5">
                  <div className="divide-y divide-gray-200 rounded-lg overflow-hidden border border-gray-100 bg-white">
                    <div className="flex justify-between items-center px-4 py-2 text-small text-gray-700">
                      <span>Подытог</span>
                      <span className="tabular-nums">
                        {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(subtotal / 100)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-2 text-small text-gray-700">
                      <span>Доставка</span>
                      <span className="text-green-600 font-semibold">БЕСПЛАТНО</span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-2 text-small text-gray-700">
                      <span>Налог</span>
                      <span className="tabular-nums">
                        {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(taxAmount / 100)}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-3 px-1">
                    <span className="text-gray-800 font-serif font-bold">Итого</span>
                    <span className="text-amber-600 text-h6 font-serif font-bold tabular-nums">
                      {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(totalWithTax / 100)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <motion.button
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onClose?.();
                      navigate('/checkout');
                    }}
                  >
                    Перейти к оформлению
                  </motion.button>
                  <motion.button
                    className="w-full border-2 border-amber-600 text-amber-600 hover:bg-amber-50 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onClose?.();
                      navigate('/cart');
                    }}
                  >
                    Перейти в корзину
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
