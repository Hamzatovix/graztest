import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

/**
 * CheckoutForm component - Form for entering order details during checkout
 * Features: Form validation, animated inputs, order summary
 */
const CheckoutForm = ({ cartItems, totalPrice, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    paymentMethod: 'creditCard',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load saved form data on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('graziella-checkout-form');
      if (raw) {
        const saved = JSON.parse(raw);
        setFormData((prev) => ({ ...prev, ...saved }));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Persist form data on change (throttled by React batching)
  useEffect(() => {
    try {
      localStorage.setItem('graziella-checkout-form', JSON.stringify(formData));
    } catch (e) {
      // ignore
    }
  }, [formData]);

  // Mask/format helpers
  const formatPhone = (value) => {
    // Keep digits only and format +7 (XXX) XXX-XX-XX
    const digits = value.replace(/\D/g, '');
    if (!digits) return '';
    let res = '+';
    if (digits[0] !== '7') {
      res += '7';
    } else {
      res += '7';
    }
    const d = digits.replace(/^7/, '');
    if (d.length > 0) res += ` (${d.slice(0,3)}`;
    if (d.length >= 3) res += ')';
    if (d.length > 3) res += ` ${d.slice(3,6)}`;
    if (d.length > 6) res += `-${d.slice(6,8)}`;
    if (d.length > 8) res += `-${d.slice(8,10)}`;
    return res;
  };

  const formatZip = (value) => value.replace(/\D/g, '').slice(0, 6);
  const formatCardNumber = (value) => value.replace(/\D/g, '').slice(0,16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (value) => {
    const v = value.replace(/\D/g, '').slice(0,4);
    if (v.length <= 2) return v;
    return v.slice(0,2) + '/' + v.slice(2);
  };
  const formatCVV = (value) => value.replace(/\D/g, '').slice(0,3);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let next = value;
    // Apply masks for specific fields
    if (name === 'phone') next = formatPhone(value);
    if (name === 'zipCode') next = formatZip(value);
    if (name === 'cardNumber') next = formatCardNumber(value);
    if (name === 'expiryDate') next = formatExpiry(value);
    if (name === 'cvv') next = formatCVV(value);

    setFormData(prev => ({ ...prev, [name]: next }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    // Trigger single-field validation on blur
    const newErrors = { ...errors };
    const value = (formData[name] || '').trim();
    const required = ['firstName','lastName','email','phone','address','city','zipCode','country'];
    if (required.includes(name) && !value) {
      const labels = { firstName:'Имя', lastName:'Фамилия', email:'Email', phone:'Телефон', address:'Адрес', city:'Город', zipCode:'Почтовый индекс', country:'Страна' };
      newErrors[name] = `${labels[name]} обязательно`;
    } else {
      delete newErrors[name];
    }
    if (name === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
      newErrors.email = 'Пожалуйста, введите корректный email адрес';
    }
    if (name === 'phone' && value && !/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value)) {
      newErrors.phone = 'Формат: +7 (XXX) XXX-XX-XX';
    }
    if (name === 'zipCode' && value && value.length < 6) {
      newErrors.zipCode = 'Индекс: 6 цифр';
    }
    if (formData.paymentMethod === 'creditCard') {
      if (name === 'cardNumber' && value && value.replace(/\s/g,'').length < 16) newErrors.cardNumber = 'Номер карты: 16 цифр';
      if (name === 'expiryDate' && value && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) newErrors.expiryDate = 'ММ/ГГ';
      if (name === 'cvv' && value && value.length < 3) newErrors.cvv = 'CVV: 3 цифры';
    }
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 
      'address', 'city', 'zipCode', 'country'
    ];

    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        const fieldLabels = {
          firstName: 'Имя',
          lastName: 'Фамилия',
          email: 'Email',
          phone: 'Телефон',
          address: 'Адрес',
          city: 'Город',
          zipCode: 'Почтовый индекс',
          country: 'Страна'
        };
        newErrors[field] = `${fieldLabels[field] || field} обязательно`;
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Пожалуйста, введите корректный email адрес';
    }

    // Phone validation
    if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Пожалуйста, введите корректный номер телефона';
    }

    // Payment method validation
    if (formData.paymentMethod === 'creditCard') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Номер карты обязателен';
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Дата истечения обязательна';
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV обязателен';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formSections = [
    {
      title: 'Личная информация',
      fields: [
        { name: 'firstName', label: 'Имя', type: 'text', required: true },
        { name: 'lastName', label: 'Фамилия', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'phone', label: 'Номер телефона', type: 'tel', required: true }
      ]
    },
    {
      title: 'Адрес доставки',
      fields: [
        { name: 'address', label: 'Адрес', type: 'text', required: true, fullWidth: true },
        { name: 'city', label: 'Город', type: 'text', required: true },
        { name: 'zipCode', label: 'Почтовый индекс', type: 'text', required: true },
        { name: 'country', label: 'Страна', type: 'text', required: true }
      ]
    },
    {
      title: 'Платёжная информация',
      fields: [
        { name: 'paymentMethod', label: 'Способ оплаты', type: 'select', required: true, 
          options: [
            { value: 'creditCard', label: 'Банковская карта' },
            { value: 'paypal', label: 'PayPal' },
            { value: 'bankTransfer', label: 'Банковский перевод' }
          ]
        }
      ]
    }
  ];

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-amber-50 rounded-lg p-6 sticky top-6">
            <h3 className="text-xl font-bold mb-4 text-amber-800">Сводка заказа</h3>
            
            <div className="space-y-3 mb-6">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-600">Кол-во: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-sm">
                    {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format((item.price * item.quantity) / 100)}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Итого:</span>
                <span className="text-amber-600">{new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(totalPrice / 100)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Checkout Form */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {formSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                className="bg-white rounded-lg shadow-md p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: sectionIndex * 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  {section.title}
                </h3>

                <div className={`grid gap-4 ${section.fields.some(f => f.fullWidth) ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                  {section.fields.map((field, fieldIndex) => (
                    <motion.div
                      key={field.name}
                      className={field.fullWidth ? 'col-span-full' : ''}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: fieldIndex * 0.05 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      
                      {field.type === 'select' ? (
                        <select
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                        >
                          <option value="">Выберите {field.label.toLowerCase()}</option>
                          {field.options.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                            errors[field.name] ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder={`Введите ${field.label.toLowerCase()}`}
                          inputMode={field.name === 'phone' || field.name === 'zipCode' || field.name === 'cardNumber' || field.name === 'cvv' ? 'numeric' : undefined}
                          autoComplete={field.name}
                        />
                      )}
                      
                      {errors[field.name] && (
                        <motion.p
                          className="text-red-500 text-xs mt-1"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {errors[field.name]}
                        </motion.p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Additional Notes */}
            <motion.div
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Дополнительные заметки (необязательно)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                placeholder="Любые специальные инструкции или заметки для вашего заказа..."
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span>Обработка заказа...</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={20} />
                  <span>Оформить заказ - {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(totalPrice / 100)}</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CheckoutForm;
