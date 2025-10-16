import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import productionPhotos from '../data/production.json';

/**
 * HomePage component - Landing page with Italian aesthetic and Russian content
 * Features: Hero section, stats, features, production process, team photo album
 */
const HomePage = () => {
  const stats = [
    { number: '10+', label: 'Лет опыта' },
    { number: '7+', label: 'Сортов сыра' },
    { number: '5К+', label: 'Довольных клиентов' },
    { number: '8+', label: 'Полученных наград' }
  ];

  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false); // State for production photos

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const photosToShow = showAllPhotos ? productionPhotos : productionPhotos.slice(0, 4);

  const showPrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + productionPhotos.length) % productionPhotos.length : null));
  };
  const showNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % productionPhotos.length : null));
  };

  const teamMembers = [
    {
      name: 'Мария Росси',
      role: 'Мастер-сыродел',
      image: '/images/about_one.jpg',
      bio: 'Мария привносит в наши сыры 20 лет опыта и страсть к итальянским традициям.'
    },
    {
      name: 'Алексей Иванов',
      role: 'Шеф-повар и консультант',
      image: '/images/production/IMG_7035.JPG',
      bio: 'Алексей создаёт рецепты, вдохновлённые итальянской кухней.'
    },
    {
      name: 'Екатерина Соколова',
      role: 'Менеджер по качеству',
      image: '/images/production/IMG_6905.JPG',
      bio: 'Екатерина гарантирует, что каждый сыр соответствует нашим стандартам.'
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Graziella",
    "description": "Артизанальные итальянские сыры высшего качества",
    "url": "https://graziella-cheese.com",
    "logo": "https://graziella-cheese.com/images/PSX_one.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+7-XXX-XXX-XXXX",
      "contactType": "customer service"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "RU"
    },
    "sameAs": [
      "https://instagram.com/graziella_cheese",
      "https://facebook.com/graziella.cheese"
    ]
  };

  return (
    <>
      <SEO 
        title="Graziella - Артизанальные итальянские сыры | Добро пожаловать в мир итальянских сыров"
        description="Откройте для себя изысканную коллекцию артизанальных сыров, созданных с любовью и традициями. От нежной моцареллы до роскошной бурраты — мы приносим вам подлинные вкусы Италии."
        keywords="итальянские сыры, моцарелла, буррата, страчителла, артизанальные сыры, свежие сыры, доставка сыров, итальянская кухня"
        image="/images/PSX_one.png"
        url="/"
        structuredData={structuredData}
      />
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-cream)' }}>
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, var(--color-parchment) 0%, var(--color-cream) 100%)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <motion.div
              className="text-center lg:text-left"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="mb-4 sm:mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium"
                      style={{ 
                        backgroundColor: 'var(--color-primary)', 
                        color: 'white' 
                      }}>
                  🇮🇹 Аутентичные итальянские сыры
                </span>
              </motion.div>
              <motion.h1
                className="font-serif text-h3 sm:text-h2 md:text-h1 lg:text-h1 xl:text-h1 font-bold mb-4 sm:mb-6 leading-tight"
                style={{ color: 'var(--text-primary)' }}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Добро пожаловать в{' '}
                <span style={{ color: 'var(--color-primary)' }}>мир</span>
                <br />
                <span className="font-serif text-h5 sm:text-h4 md:text-h3 lg:text-h2 xl:text-h2">итальянских сыров</span>
              </motion.h1>
              <motion.p
                className="text-body sm:text-body lg:text-h5 leading-relaxed mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto lg:mx-0"
                style={{ color: 'var(--text-muted)' }}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Откройте для себя изысканную коллекцию артизанальных сыров, созданных с любовью и традициями. 
                От нежной моцареллы до роскошной бурраты — мы приносим вам подлинные вкусы Италии.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link to="/catalog">
                  <motion.button
                    className="btn-primary flex items-center space-x-2 sm:space-x-3 py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg font-medium w-full sm:w-auto justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                  
                    <span>Перейти в каталог</span>
                  </motion.button>
                </Link>
                <Link to="/about">
                  <motion.button
                    className="btn-secondary flex items-center space-x-2 sm:space-x-3 py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg font-medium w-full sm:w-auto justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
          
                    <span>Наша история</span>
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
            <div className="mt-8 lg:mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Left: main large image */}
                <motion.div
                  className="relative w-full h-72 sm:h-96 lg:h-[516px] xl:h-[516px] rounded-2xl sm:rounded-3xl overflow-hidden"
                  style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}
                  whileHover={{ scale: 1.02, boxShadow: '0 16px 40px rgba(0,0,0,0.16)' }}
                  transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                >
                  <img 
                    src="/images/PSX_one.png" 
                    alt="Итальянские сыры — главное изображение" 
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300" 
                    loading="eager"
                    fetchPriority="high"
                  />
                </motion.div>

                {/* Right: responsive image group — mobile: two columns, desktop: two rows */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-1 lg:grid-rows-2">
                  <motion.div
                    className="relative w-full h-40 sm:h-48 md:h-56 lg:h-[232px] xl:h-[232px] rounded-2xl sm:rounded-3xl overflow-hidden"
                    style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}
                    whileHover={{ scale: 1.02, boxShadow: '0 16px 40px rgba(0,0,0,0.16)' }}
                    transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                  >
                    <img 
                      src="/images/PSX_two.png" 
                      alt="Итальянские сыры — изображение 2" 
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300" 
                      loading="eager"
                    />
                  </motion.div>
                  <motion.div
                    className="relative w-full h-40 sm:h-48 md:h-56 lg:h-[232px] xl:h-[232px] rounded-2xl sm:rounded-3xl overflow-hidden"
                    style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}
                    whileHover={{ scale: 1.02, boxShadow: '0 16px 40px rgba(0,0,0,0.16)' }}
                    transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                  >
                    <img 
                      src="/images/PSX_three.png" 
                      alt="Итальянские сыры — изображение 3" 
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300" 
                      loading="eager"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="py-12 sm:py-16 lg:py-20"
        style={{ backgroundColor: 'var(--color-parchment)' }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="font-elegant text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3"
                  style={{ color: 'var(--color-primary)' }}
                  whileInView={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.div>
                <p className="font-medium text-sm sm:text-base" style={{ color: 'var(--color-secondary)' }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Production Process Section */}
      <motion.section
        className="py-16 sm:py-20 lg:py-24"
        style={{ backgroundColor: '#F5F5DC' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-elegant text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
                style={{ color: '#3F4B26' }}>
              Наше производство
            </h2>
            <p className="text-lg sm:text-xl font-sans max-w-3xl mx-auto leading-relaxed px-2"
               style={{ color: '#4B4B4B' }}>
              Погрузитесь в процесс создания наших сыров, где традиции встречаются с мастерством
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {photosToShow.map((image, index) => (
              <motion.button
                key={image.src}
                type="button"
                className="relative rounded-2xl overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.01 }}
                onClick={() => openLightbox(productionPhotos.indexOf(image))}
                style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
                aria-label={`Открыть фото: ${image.alt}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-40 sm:h-48 lg:h-56 object-cover object-center"
                  style={{ backgroundColor: '#E8E8D0' }}
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/45 text-white p-3">
                  <p className="text-xs sm:text-sm font-sans line-clamp-2">{image.caption}</p>
                </div>
              </motion.button>
            ))}
          </div>

          {!showAllPhotos && productionPhotos.length > 4 && (
            <div className="text-center mt-8 sm:mt-12">
              <motion.button
                onClick={() => setShowAllPhotos(true)}
                className="btn-secondary py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Смотреть дальше
              </motion.button>
            </div>
          )}

          {/* Lightbox */}
          {lightboxIndex !== null && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <motion.div
                className="relative max-w-5xl w-full"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={productionPhotos[lightboxIndex].src}
                  alt={productionPhotos[lightboxIndex].alt}
                  className="w-full max-h-[80vh] object-contain rounded-2xl"
                />
                <div className="mt-3 text-center text-white">
                  <div className="font-outfit text-sm opacity-90">
                    {productionPhotos[lightboxIndex].caption}
                  </div>
                </div>
                {/* Controls */}
                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
                  <button
                    type="button"
                    className="p-2 rounded-full bg-white/80 hover:bg-white text-[var(--color-secondary)]"
                    onClick={showPrev}
                    aria-label="Предыдущее фото"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded-full bg-white/80 hover:bg-white text-[var(--color-secondary)]"
                    onClick={showNext}
                    aria-label="Следующее фото"
                  >
                    ›
                  </button>
                </div>
                <button
                  type="button"
                  className="absolute top-2 right-2 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-[var(--color-secondary)]"
                  onClick={closeLightbox}
                  aria-label="Закрыть"
                >
                  Закрыть
                </button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Team Section (Photo Album) */}
      <motion.section
        className="py-16 sm:py-20 lg:py-24"
        style={{ backgroundColor: 'var(--color-cream)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-elegant text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
                style={{ color: 'var(--color-secondary)' }}>
              Наша команда
            </h2>
            <p className="text-lg sm:text-xl font-sans max-w-3xl mx-auto leading-relaxed px-2"
               style={{ color: '#6B7280' }}>
              Познакомьтесь с людьми, которые с любовью создают ваши любимые сыры
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-lg mx-auto mb-3 sm:mb-6 object-cover shadow-lg"
                  style={{ backgroundColor: '#E8E8D0' }}
                  loading="lazy"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
                <h3 className="font-elegant text-base sm:text-2xl font-semibold mb-1 sm:mb-2"
                    style={{ color: 'var(--color-secondary)' }}>
                  {member.name}
                </h3>
                <p className="text-xs sm:text-base font-medium text-gray-600 mb-1 sm:mb-2">
                  {member.role}
                </p>
                <p className="text-xs sm:text-base font-sans leading-relaxed"
                   style={{ color: '#6B7280' }}>
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      </div>
    </>
  );
};

export default HomePage;