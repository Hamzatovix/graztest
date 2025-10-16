import React from 'react';
import { motion } from 'framer-motion';

/**
 * AboutPage component - Information about the cheese dairy and company story
 * Features: Company history, timeline
 */
const AboutPage = () => {
  const timeline = [
    {
      year: '2014',
      title: 'Основание',
      description: 'Graziella начала свой путь в мире сыроварения, создавая первые артизанальные сыры по традиционным итальянским рецептам.'
    },
    {
      year: '2016',
      title: 'Первый магазин',
      description: 'Открыли наш первый розничный магазин, где местные жители смогли оценить качество наших сыров.'
    },
    {
      year: '2018',
      title: 'Расширение производства',
      description: 'Построили специализированное предприятие по производству сыра с современным оборудованием.'
    },
    {
      year: '2020',
      title: 'Интернет-магазин',
      description: 'Запустили онлайн-платформу, чтобы делиться нашими сырами с любителями сыра по всей России.'
    },
    {
      year: '2024',
      title: '10 лет качества',
      description: 'Отмечаем 10 лет успешной работы и продолжаем совершенствовать наши рецепты и технологии.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              className="text-center lg:text-left"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1
                className="text-5xl lg:text-6xl font-bold text-amber-800 mb-6"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Наша история
              </motion.h1>

              <motion.p
                className="text-xl text-gray-600 mb-8 leading-relaxed"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Уже 10 лет Graziella's Cheese создает исключительные артизанальные сыры 
                используя традиционные итальянские методы. То, что началось как страсть к качественному сыру, 
                выросло в любимый бренд, известный своим аутентичным вкусом и премиальным качеством.
              </motion.p>

              <motion.div
                className="flex items-center space-x-4 text-amber-600"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <span className="text-lg font-semibold">Качественные сыры с 2014 года</span>
              </motion.div>
            </motion.div>

            {/* Image/Visual */}
            <motion.div
              className="relative"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img
                src="/images/about_one.jpg"
                alt="История сыроварни Graziella"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-amber-800 mb-4">
              Наш путь
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              От скромного начала до международного признания - наша история страсти и преданности
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((event, index) => (
              <motion.div
                key={event.year}
                className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600">
                    {event.description}
                  </p>
                </div>
                
                <motion.div
                  className="bg-amber-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {event.year}
                </motion.div>
                
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;