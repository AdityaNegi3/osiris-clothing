// src/pages/HomePage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

type Product = any;

const productNameStyle: React.CSSProperties = {
  fontFamily: "'Oswald', 'Helvetica', 'Arial', sans-serif",
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  fontWeight: 500,
};

const productPriceStyle: React.CSSProperties = {
  fontFamily: "'Oswald', 'Helvetica', 'Arial', sans-serif",
  color: 'rgba(255,255,255,0.95)',
  fontWeight: 400,
};

const productOriginalPriceStyle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.72)', // softer gray for readability
  fontFamily: "'Oswald', 'Helvetica', 'Arial', sans-serif",
  fontWeight: 300,
  fontSize: '0.85rem',
  textDecoration: 'line-through',
};

const productCardInnerClasses =
  'p-1 sm:p-4 w-full flex flex-col flex-1 justify-between items-center text-center';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: (fromX: number) => ({ opacity: 0, x: fromX }),
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const ProductCard: React.FC<{ product: Product; index: number }> = ({ product, index }) => {
  const col = index % 3;
  const fromX = col === 0 ? -100 : col === 2 ? 100 : 0;

  return (
    <motion.div custom={fromX} variants={itemVariants} className="flex">
      <Link
        to={`/product/${product.id}`}
        className="group bg-transparent rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col w-full"
        aria-label={`View ${product.name} details`}
      >
        <div className="relative w-full h-56 sm:h-80 md:h-80 lg:h-96 flex items-center justify-center bg-transparent sm:bg-black overflow-hidden">
          {/* Back image (default) */}
          <img
            src={product.backImage}
            alt={`${product.name} - back view`}
            className="w-full h-full object-contain transition-opacity duration-300 opacity-100 sm:opacity-100 sm:group-hover:opacity-0"
            loading="lazy"
          />

          {/* Front image on hover */}
          <img
            src={product.frontImage}
            alt={`${product.name} - front view`}
            className="w-full h-full object-contain absolute inset-0 transition-opacity duration-300 opacity-0 sm:opacity-0 sm:group-hover:opacity-100"
            loading="lazy"
          />
        </div>

        <div
          className={productCardInnerClasses}
          style={{ boxShadow: '0 6px 18px rgba(220,38,38,0.06)' }}
        >
          <div className="w-full">
            <h3 style={productNameStyle} className="text-white text-xs sm:text-sm mb-0.5 leading-tight">
              {product.name}
            </h3>

            <div className="flex items-center justify-center space-x-2">
              {product.originalPrice && (
                <span style={productOriginalPriceStyle} className="text-xs sm:text-sm">
                  ₹{product.originalPrice}
                </span>
              )}
              <span style={productPriceStyle} className="text-sm sm:text-lg">
                ₹{product.price}
              </span>
            </div>
          </div>

          <div className="mt-1 w-full">
            <div className="flex items-center justify-center text-gray-400 group-hover:text-white transition-colors duration-300">
              <span className="text-xs sm:text-sm">View Details</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Modal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-black text-white p-8 rounded-lg max-w-md w-full relative border border-red-500/40"
        style={{ boxShadow: '0 10px 40px rgba(220,38,38,0.12)' }}
      >
        <button
          className="absolute top-2 right-2 text-red-500 text-xl hover:text-red-600"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </motion.div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const limitedProducts = products.filter((p) => p.category === 'limited');
  const darkProducts = products.filter((p) => p.category === 'dark');
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="pt-16 overflow-x-hidden bg-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden hero-background">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-wider luxury-float">OSIRIS</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light tracking-wide">Where Luxury Meets Legacy</p>
          <div className="h-px w-24 bg-red-500 mx-auto mb-8"></div>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed luxury-glow">
            Discover the epitome of luxury fashion. Each piece crafted with precision, designed for those who understand that true elegance is timeless.
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-red-600 to-red-500"></div>
        </div>
      </section>

      {/* Chaos (Limited) Edition */}
      <section
        id="f1-edition"
        className="py-6 sm:py-20 relative bg-black bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/file_0000000044c8622fb0caf79179595f70.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-red-950 backdrop-blur-sm"></div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-6 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tracking-wide">The Ascendants Edition</h2>
            <p className="text-gray-300 text-sm sm:text-lg max-w-2xl mx-auto">Born in myth, raised in fire, worn by those who dare to ascend.</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 gap-2 sm:gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
          >
            {limitedProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Dark Edition */}
      <section
        id="dark-edition"
        className="py-6 sm:py-20 relative bg-black bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/file_0000000044c8622fb0caf79179595f70.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-red-950 backdrop-blur-sm"></div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-6 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tracking-wide">DARK EDITION</h2>
            <p className="text-gray-400 text-sm sm:text-lg max-w-2xl mx-auto">Embrace the shadows. Where mystery meets elegance in perfect harmony.</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 gap-2 sm:gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
          >
            {darkProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Signature Edition Modal Trigger */}
      <div className="text-center py-5">
        <button
          onClick={() => setModalOpen(true)}
          className="px-6 py-3 rounded-lg font-semibold text-black bg-gradient-to-b from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 transition shadow-md"
        >
          View Signature Edition
        </button>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4 text-red-500">Signature Edition</h2>
        <p className="text-gray-300">The Signature Edition is coming soon. Stay tuned for the most exclusive drop of the year.</p>
      </Modal>
    </div>
  );
};

export default HomePage;
