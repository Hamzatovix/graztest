import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useCartStore, { useTotalPrice } from '../store/cartStore';
import CheckoutForm from '../components/CheckoutForm';
import { CheckCircle, ShoppingCart } from 'lucide-react';

/**
 * CheckoutPage component - Complete checkout process with order form
 * Features: Form validation, order confirmation, cart integration
 */
const CheckoutPage = () => {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const totalPrice = useTotalPrice();
  const clearCart = useCartStore((state) => state.clearCart);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Redirect if cart is empty
  if (items.length === 0 && !orderComplete) {
    navigate('/cart');
    return null;
  }

  const handleOrderSubmit = async (formData) => {
    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate order number
      const newOrderNumber = `GRZ-${Date.now().toString().slice(-6)}`;
      setOrderNumber(newOrderNumber);
      
      // Clear cart and show success
      clearCart();
      setOrderComplete(true);
      
    } catch (error) {
      console.error('Order submission error:', error);
      alert('Произошла ошибка при обработке заказа. Пожалуйста, попробуйте снова.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackToShopping = () => {
    navigate('/catalog');
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <motion.div
          className="max-w-2xl mx-auto text-center p-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          {/* Success Animation */}
              <motion.div
                className="mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.2,
                  type: 'spring',
                  stiffness: 200
                }}
              >
                <div className="flex justify-center mb-4">
                  <CheckCircle size={80} className="text-green-500" />
                </div>
                <motion.div
                  className="flex justify-center mb-4"
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
                  <ShoppingCart size={64} className="text-amber-600" />
                </motion.div>
              </motion.div>

          {/* Success Message */}
          <motion.h1
            className="text-4xl font-bold text-amber-800 mb-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Заказ подтверждён!
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Спасибо за ваш заказ! Ваши вкусные сыры готовятся с заботой.
          </motion.p>

          {/* Order Details */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Детали заказа
            </h3>
            <div className="space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">Номер заказа:</span>
                <span className="font-semibold text-amber-600">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Дата заказа:</span>
                <span className="font-semibold">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ожидаемая доставка:</span>
                <span className="font-semibold">
                  {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            className="bg-amber-50 rounded-xl p-6 mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <h4 className="font-semibold text-amber-800 mb-3">Что дальше?</h4>
            <div className="text-left space-y-2 text-sm text-gray-600">
              <p>📧 Вы получите подтверждение по email в ближайшее время</p>
              <p>🚚 Мы отправим информацию об отслеживании, как только ваш заказ будет отправлен</p>
              <p>📞 Наша команда свяжется с вами, если нам понадобится дополнительная информация</p>
              <p>⭐ Мы будем рады услышать о вашем опыте после получения заказа!</p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
                <motion.button
                  onClick={handleBackToShopping}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingCart size={20} />
                  <span>Продолжить покупки</span>
                </motion.button>

            <motion.button
              onClick={() => navigate('/')}
              className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50 font-semibold py-4 px-8 rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Вернуться на главную
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Compact Header */}
      <motion.section
        className="bg-white text-gray-900 py-8 border-b"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-2xl lg:text-3xl font-bold mb-2"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Оформление заказа
          </motion.h1>
          <motion.p
            className="text-base text-gray-600"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Заполните данные для доставки и контактную информацию
          </motion.p>
        </div>
      </motion.section>

      {/* Checkout Form */}
      <motion.div
        className="py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <CheckoutForm
          cartItems={items}
          totalPrice={totalPrice}
          onSubmit={handleOrderSubmit}
        />
      </motion.div>

      {/* Security Information */}
      <motion.section
        className="bg-white py-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Безопасная оплата
              </h3>
              <p className="text-gray-600">
                Ваша платёжная информация зашифрована и защищена
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Быстрая доставка
              </h3>
              <p className="text-gray-600">
                Бесплатная доставка при заказе свыше ₽5000, доставляем свежими
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">💯</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Гарантия удовлетворения
              </h3>
              <p className="text-gray-600">
                100% гарантия удовлетворения или возврат денег
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default CheckoutPage;
