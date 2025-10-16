import React, { useState } from 'react';
import { ShoppingCart, Check, X, Sparkles } from 'lucide-react';
import useCartStore from '../store/cartStore';
import { toast } from 'sonner';
import ProductIcon from './ProductIcon';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { triggerLightHaptic } from '../lib/haptics';

/**
 * CheeseCard component - Individual cheese product card with sophisticated Italian-inspired animations
 * Features: Enhanced hover effects, add to cart functionality, smooth scale animations
 */
const CheeseCard = ({ cheese }) => {
  console.log('CheeseCard rendering:', cheese);
  
  const addItem = useCartStore((state) => state.addItem);
  const [justAdded, setJustAdded] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addItem(cheese);

    // Mobile-friendly toast position and style
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    // Professional e-commerce toast (card with thumbnail + CTAs)
    toast.custom((t) => (
      <div className="w-full max-w-[92vw] sm:max-w-sm bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="flex items-center p-3 sm:p-4 gap-3">
          <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
            <img src={cheese.image || '/images/cart_media/cheese_cad.jpg'} alt={cheese.name} className="h-full w-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{cheese.name}</p>
            <p className="text-xs text-gray-500 truncate">Добавлен в корзину · {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(cheese.price / 100)}</p>
          </div>
          <button
            className="p-2 text-gray-400 hover:text-gray-600"
            aria-label="Закрыть уведомление"
            onClick={() => toast.dismiss(t)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 p-3 pt-0 sm:px-4 sm:pb-4">
          <button
            className="text-center text-xs sm:text-sm font-medium bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg"
            onClick={() => { toast.dismiss(t); navigate('/cart'); }}
          >
            В корзину
          </button>
          <button
            className="text-center text-xs sm:text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 rounded-lg"
            onClick={() => { toast.dismiss(t); navigate('/checkout'); }}
          >
            Оформить
          </button>
        </div>
      </div>
    ), {
      duration: isMobile ? 2200 : 2600,
      position: 'bottom-center'
    });

    // Light haptic feedback on supported devices
    triggerLightHaptic();

    // Temporary visual confirmation on the button
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden h-full flex flex-col"
      role="article"
      aria-label={`Сыр ${cheese.name}`}
    >
      {/* Cheese Image */}
      <div className="relative h-32 sm:h-40 md:h-44 lg:h-48 overflow-hidden bg-gray-100">
        <img
          src={cheese.image || '/images/cart_media/cheese_cad.jpg'}
          alt={`${cheese.name} - ${cheese.description}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold bg-green-600">
          {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(cheese.price / 100)}
        </div>
      </div>

      {/* Body */}
      <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-1">
        <h3 className="font-serif text-h6 sm:text-h5 font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {cheese.name}
        </h3>
        <p className="text-body-sm sm:text-small mb-4 line-clamp-3 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {cheese.description}
        </p>

        <div className="mt-auto">
          <div className="relative">
            <button
              onClick={handleAddToCart}
              className={`${justAdded ? 'bg-emerald-600 hover:bg-emerald-700 ring-2 ring-emerald-300' : 'bg-green-600 hover:bg-green-700'} w-full font-semibold py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base text-white touch-manipulation`}
              aria-label={`Добавить ${cheese.name} в корзину`}
            >
              {justAdded ? (
                <Check className="h-4 w-4 flex-shrink-0" aria-hidden />
              ) : (
                <ShoppingCart className="h-4 w-4 flex-shrink-0" aria-hidden />
              )}
              <span className="hidden sm:inline truncate">{justAdded ? 'Добавлено' : 'Добавить в корзину'}</span>
              <span className="sm:hidden">{justAdded ? 'Добавлено' : 'Добавить'}</span>
            </button>
            {justAdded && (
              <div className="pointer-events-none absolute inset-0 -m-2">
                {[{x:'10%',y:'-20%'},{x:'85%',y:'-15%'},{x:'0%',y:'30%'},{x:'100%',y:'40%'}].map((p, i) => (
                  <motion.span
                    key={i}
                    className="absolute text-amber-500"
                    style={{ left: p.x, top: p.y }}
                    initial={{ opacity: 0, scale: 0.6, y: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [0.6, 1.1, 0.9], y: [-4, -10, -14] }}
                    transition={{ duration: 0.7, delay: i * 0.05, ease: 'easeOut' }}
                  >
                    <Sparkles className="h-4 w-4" />
                  </motion.span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheeseCard;
