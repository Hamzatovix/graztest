import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import useCartStore, { useTotalPrice } from '../store/cartStore';
import { toast } from 'sonner';
import { ShoppingCart } from 'lucide-react';
import ProductIcon from '../components/ProductIcon';

/**
 * CartPage component - Displays cart contents with item management and checkout
 * Features: Animated cart items, quantity controls, order summary
 */
const CartPage = () => {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const totalPrice = useTotalPrice();
  const clearCart = useCartStore((state) => state.clearCart);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      toast.warning('Товар удалён из корзины');
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Вы уверены, что хотите очистить корзину?')) {
      clearCart();
      toast.success('Корзина очищена');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.section
        className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="font-serif text-h2 lg:text-h1 font-bold mb-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ваша корзина покупок
          </motion.h1>
          <motion.p
            className="text-body lg:text-h5 text-gray-100/90 leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Просмотрите выбранные сыры перед оформлением заказа
          </motion.p>
        </div>
      </motion.section>

      {/* Cart Content */}
      <div className="container mx-auto px-4 py-12">
        {items.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
                <motion.div
                  className="flex justify-center mb-6"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ShoppingCart size={80} className="text-gray-400" />
                </motion.div>
            <h2 className="text-3xl font-bold text-gray-600 mb-4">
              Ваша корзина пуста
            </h2>
            <p className="text-xl text-gray-500 mb-8">
              Похоже, вы ещё не добавили вкусные сыры!
            </p>
                <Link to="/catalog">
                  <motion.button
                    className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 inline-flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ProductIcon icon="cheese" size={20} className="text-white" />
                    <span>Начать покупки</span>
                  </motion.button>
                </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Cart Header */}
                <div className="bg-amber-50 px-6 py-4 border-b border-amber-100">
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif text-h6 font-semibold text-amber-800">
                      Товары в корзине ({items.length})
                    </h2>
                    <motion.button
                      onClick={handleClearCart}
                      className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Очистить корзину
                    </motion.button>
                  </div>
                </div>

                {/* Cart Items List */}
                <div className="divide-y divide-gray-100">
                  <AnimatePresence>
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="p-6 flex items-center space-x-4"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50, scale: 0.8 }}
                        transition={{ delay: index * 0.1 }}
                        layout
                      >
                            {/* Product Icon */}
                            <motion.div
                              className="flex items-center justify-center flex-shrink-0"
                              whileHover={{ scale: 1.2, rotate: 5 }}
                              transition={{ type: 'spring', stiffness: 300 }}
                            >
                              <ProductIcon icon={item.icon || 'package'} size={48} />
                            </motion.div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif text-h6 font-semibold text-gray-800 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-small text-gray-600 mb-2 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-2">
                            <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs">
                              {item.type}
                            </span>
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                              {item.origin}
                            </span>
                          </div>
                          <p className="text-body font-semibold text-amber-600">
                            {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(item.price / 100)} за штуку
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <motion.button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full flex items-center justify-center transition-colors duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            −
                          </motion.button>
                          
                          <span className="w-12 text-center font-semibold text-lg">
                            {item.quantity}
                          </span>
                          
                          <motion.button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-10 h-10 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-full flex items-center justify-center transition-colors duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            +
                          </motion.button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-800">
                            {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format((item.price * item.quantity) / 100)}
                          </p>
                          <motion.button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium mt-2 transition-colors duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            Удалить
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                <h3 className="font-serif text-h6 font-bold text-gray-800 mb-6">
                  Сводка заказа
                </h3>

                {/* Order Details */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <ProductIcon icon={item.icon || 'package'} size={20} />
                            <div>
                              <p className="text-small font-medium text-gray-800">
                                {item.name}
                              </p>
                              <p className="text-caption text-gray-500">
                                Кол-во: {item.quantity}
                              </p>
                            </div>
                          </div>
                          <p className="font-semibold text-gray-800 text-small">
                            {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format((item.price * item.quantity) / 100)}
                          </p>
                        </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Подытог:</span>
                    <span>{new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(totalPrice / 100)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Доставка:</span>
                    <span className="text-green-600 font-semibold">БЕСПЛАТНО</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Налог:</span>
                    <span>{new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format((totalPrice * 0.08) / 100)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-800">
                      <span>Итого:</span>
                      <span className="text-amber-600">
                        {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format((totalPrice * 1.08) / 100)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 space-y-3">
                  <Link to="/checkout">
                        <motion.button
                          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ShoppingCart size={20} />
                          <span>Перейти к оформлению</span>
                        </motion.button>
                  </Link>

                  <Link to="/catalog">
                    <motion.button
                      className="w-full border-2 border-amber-600 text-amber-600 hover:bg-amber-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Продолжить покупки
                    </motion.button>
                  </Link>
                </div>

                {/* Removed bulky security badge for a cleaner layout */}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
