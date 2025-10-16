import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, RotateCcw, ChevronsDown, AlertCircle, Package } from 'lucide-react';
import CheeseCard from '../components/CheeseCard';
import KitCard from '../components/KitCard';
import SEO from '../components/SEO';
import cheesesData from '../data/cheeses.json';
import kitsData from '../data/kits.json';

/**
 * CatalogPage component - Displays cheese catalog with filtering and search
 * Features: Search functionality, category filters, animated grid layout
 */
const CatalogPage = () => {
  const [cheeses, setCheeses] = useState([]);
  const [filteredCheeses, setFilteredCheeses] = useState([]);
  const [kits, setKits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedKitId, setExpandedKitId] = useState(null);

  useEffect(() => {
    // Load cheeses data with error handling
    try {
      console.log('Loading cheeses:', cheesesData.length);
      console.log('First cheese:', cheesesData[0]);
      console.log('Loading kits:', kitsData.length);
      setCheeses(cheesesData);
      setFilteredCheeses(cheesesData);
      setKits(kitsData);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load cheeses data:', err);
      setError('Не удалось загрузить каталог сыров. Пожалуйста, попробуйте позже.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log('Filtering cheeses:', {
      totalCheeses: cheeses.length,
      searchTerm,
      selectedCategory,
      sortBy
    });
    
    let filtered = [...cheeses];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(cheese =>
        cheese.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cheese.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cheese.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log('After search filter:', filtered.length);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(cheese => cheese.type === selectedCategory);
      console.log('After category filter:', filtered.length);
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    // Deduplicate by id to prevent accidental repeats
    const unique = Array.from(new Map(filtered.map(item => [item.id, item])).values());
    console.log('Final filtered cheeses:', unique.length);
    setFilteredCheeses(unique);
  }, [cheeses, searchTerm, selectedCategory, sortBy]);

  const categories = ['all', ...new Set(cheeses.map(cheese => cheese.type)), 'Наборы'];
  console.log('Categories:', categories);
  console.log('Kits available:', kits.length);

  const filteredKits = kits.filter((kit) => {
    if (selectedCategory !== 'Наборы') return false;
    if (!searchTerm) return true;
    const haystack = `${kit.name} ${kit.description} ${kit.tag}`.toLowerCase();
    return haystack.includes(searchTerm.toLowerCase());
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-4">
            <AlertCircle size={64} className="text-red-500" />
          </div>
          <p className="text-xl text-gray-600">{error}</p>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
            <motion.div
              className="flex justify-center mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Package size={64} className="text-gray-400" />
            </motion.div>
          <p className="text-xl text-gray-600">Загружаем наши вкусные сыры...</p>
        </motion.div>
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Каталог итальянских сыров",
    "description": "Познакомьтесь с нашей изысканной коллекцией свежих и традиционных сыров Италии",
    "url": "https://graziella-cheese.com/catalog",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": filteredCheeses.map((cheese, index) => ({
        "@type": "Product",
        "position": index + 1,
        "name": cheese.name,
        "description": cheese.description,
        "image": `https://graziella-cheese.com${cheese.image}`,
        "offers": {
          "@type": "Offer",
          "price": cheese.price,
          "priceCurrency": "RUB",
          "availability": cheese.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
        }
      }))
    }
  };

  return (
    <>
      <SEO 
        title="Каталог итальянских сыров | Graziella - Артизанальные сыры"
        description="Познакомьтесь с нашей изысканной коллекцией свежих и традиционных сыров Италии. Моцарелла, буррата, страчителла и другие аутентичные итальянские сыры."
        keywords="каталог сыров, итальянские сыры, моцарелла, буррата, страчителла, свежие сыры, купить сыр онлайн"
        image="/images/PSX_one.png"
        url="/catalog"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Mobile-friendly */}
      <motion.section
        className="py-6 sm:py-12 lg:py-16 bg-amber-50/60"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <motion.h1
            className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-gray-900"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Каталог итальянских сыров
          </motion.h1>
          <motion.p
            className="text-sm sm:text-lg lg:text-xl font-sans max-w-prose mx-auto leading-relaxed px-1 sm:px-2 text-gray-600"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Познакомьтесь с нашей изысканной коллекцией свежих и традиционных сыров Италии
          </motion.p>
        </div>
      </motion.section>

      {/* Filters and Search - Redesigned */}
      <motion.section
        className="py-6 bg-white shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container mx-auto px-3 sm:px-4 space-y-3">
          {/* Compact Search + Sort Row */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {/* Search Bar - Compact */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Поиск сыров..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-sm sm:text-base"
              />
              <span className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
              </span>
            </div>

            {/* Sort + Reset - Compact */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2 sm:px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-xs sm:text-sm min-w-0 flex-shrink-0"
                disabled={selectedCategory === 'Наборы'}
              >
                <option value="name">Название</option>
                <option value="price-low">Цена ↑</option>
                <option value="price-high">Цена ↓</option>
                <option value="rating">Рейтинг</option>
              </select>
              
              {(searchTerm || selectedCategory !== 'all' || sortBy !== 'name') && (
                <button
                  className="flex items-center justify-center px-2 sm:px-3 py-2 sm:py-2.5 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSortBy('name');
                  }}
                  aria-label="Сбросить фильтры"
                >
                  <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                </button>
              )}
            </div>
          </div>

          {/* Category Filters - Responsive Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-2 rounded-lg transition-colors duration-200 text-xs sm:text-sm text-center ${
                  selectedCategory === category
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-amber-100'
                }`}
              >
                {category === 'all' ? 'Все' : category}
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Results Info - Compact */}
      <motion.div
        className="container mx-auto px-3 sm:px-4 py-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <p className="text-gray-600 text-xs sm:text-sm">
          {selectedCategory === 'Наборы'
            ? `Найдено наборов: ${filteredKits.length} / ${kits.length}`
            : `Найдено сыров: ${filteredCheeses.length} / ${cheeses.length}`}
          {selectedCategory !== 'all' && ` · ${selectedCategory}`}
          {searchTerm && ` · "${searchTerm}"`}
        </p>
      </motion.div>

      {/* Conditional Grid: Kits or Cheeses */}
      {selectedCategory === 'Наборы' ? (
        <motion.section
          className="container mx-auto px-4 pb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {filteredKits.length === 0 ? (
            <div className="text-center py-16">
              <div className="flex justify-center mb-4">
                <Package size={64} className="text-gray-400" />
              </div>
              <p className="text-gray-600">Наборы не найдены. Измените запрос.</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-x-4">
              {filteredKits.map((kit) => (
                <div key={kit.id} className="mb-4 break-inside-avoid">
                  <KitCard
                    kit={kit}
                    isExpanded={expandedKitId === kit.id}
                    onToggle={() => setExpandedKitId(expandedKitId === kit.id ? null : kit.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </motion.section>
      ) : (
        <motion.section
          className="container mx-auto px-4 pb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredCheeses.length === 0 ? (
            <motion.div
              className="text-center py-20 px-4"
              variants={itemVariants}
            >
              <div className="flex justify-center mb-4">
                <Search size={64} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                Сыры не найдены
              </h3>
              <p className="text-gray-500 mb-2">
                Попробуйте изменить поисковые запросы или фильтры
              </p>
              <p className="text-sm text-gray-400 mb-6">
                Отладка: filteredCheeses.length = {filteredCheeses.length}, 
                selectedCategory = "{selectedCategory}", 
                searchTerm = "{searchTerm}"
              </p>
              <motion.button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSortBy('name');
                }}
                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Очистить фильтры
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 items-start">
              {console.log('Rendering cheeses:', filteredCheeses.length)}
              {filteredCheeses.map((cheese, index) => (
                <div key={cheese.id}>
                  <CheeseCard cheese={cheese} />
                </div>
              ))}
            </div>
          )}
        </motion.section>
      )}

      {/* In "Все типы" also show kits below cheeses */}
      {selectedCategory === 'all' && (
        <motion.section
          className="container mx-auto px-4 pb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h2 className="font-elegant text-xl sm:text-2xl font-semibold text-gray-900">
                Наборы для приготовления пасты
              </h2>
              <span className="ml-3 inline-flex items-center rounded-full bg-amber-100 text-amber-800 text-xs sm:text-sm font-medium px-2.5 py-1">
                {kits.length}
              </span>
            </div>
            <div className="mt-2 h-px bg-gradient-to-r from-amber-200 via-gray-200 to-transparent" />
          </div>
          {kits.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-x-4">
              {kits
                .filter((kit) => {
                  if (!searchTerm) return true;
                  const hay = `${kit.name} ${kit.description} ${kit.tag}`.toLowerCase();
                  return hay.includes(searchTerm.toLowerCase());
                })
                .map((kit) => (
                  <div key={kit.id} className="mb-4 break-inside-avoid">
                    <KitCard
                      kit={kit}
                      isExpanded={expandedKitId === kit.id}
                      onToggle={() => setExpandedKitId(expandedKitId === kit.id ? null : kit.id)}
                    />
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <Package size={48} className="text-gray-400" />
              </div>
              <p className="text-gray-600">Наборы временно недоступны</p>
            </div>
          )}
        </motion.section>
      )}
      </div>
    </>
  );
};

export default CatalogPage;