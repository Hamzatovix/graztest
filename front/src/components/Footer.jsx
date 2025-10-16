import React from 'react';
import { motion } from 'framer-motion';

/**
 * Footer component - Ultra-minimalist Italian-inspired footer with essential info
 * Features: Centered logo, contact, social links, copyright, Russian content
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Facebook', abbr: 'FB', url: '#' },
    { name: 'Instagram', abbr: 'IG', url: '#' },
    { name: 'VKontakte', abbr: 'VK', url: '#' },
    { name: 'YouTube', abbr: 'YT', url: '#' }
  ];

  return (
    <motion.footer
      className="py-8"
      style={{
        backgroundColor: 'var(--color-cream)',
        color: 'var(--color-secondary)',
        borderTop: '2px solid var(--color-primary)'
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6 max-w-2xl text-center">
        {/* Logo */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="font-elegant text-3xl font-bold mb-4">Graziella</h3>
          <p className="text-sm font-sans opacity-80 mb-4">
            Артизанальные сыры с 2014 года
          </p>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-sans mb-4">
            ул. Молочная, 123, Сырная долина, Италия | +39 (555) 123-SYROV | info@graziella-cheese.ru
          </p>
        </motion.div>

        {/* Social Media */}
        <motion.div
          className="flex justify-center space-x-6 mb-4"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              className="text-sm font-sans hover:text-[var(--color-primary)] transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              aria-label={`Перейти на ${social.name}`}
            >
              {social.abbr}
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="text-sm font-sans opacity-80"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>&copy; {currentYear} Graziella. Все права защищены.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;