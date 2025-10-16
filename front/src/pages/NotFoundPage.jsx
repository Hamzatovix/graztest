import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        className="text-center max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-7xl mb-4">😕</div>
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-secondary)' }}>
          Страница не найдена
        </h1>
        <p className="text-gray-600 mb-6">
          Похоже, вы перешли по неверной ссылке или страница была перемещена.
        </p>
        <Link to="/">
          <button className="btn-primary">Вернуться на главную</button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;



