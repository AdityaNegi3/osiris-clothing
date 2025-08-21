import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const limitedProducts = products.filter((p) => p.category === 'limited');
  const darkProducts = products.filter((p) => p.category === 'dark');
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden hero-background">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6 tracking-wider luxury-float">
            OSIRIS
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 font-light tracking-wide">
            Where Luxury Meets Legacy
          </p>
          <div className="h-px w-16 sm:w-24 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-md sm:max-w-2xl mx-auto leading-relaxed luxury-glow text-sm sm:text-base">
            Discover the epitome of luxury fashion. Each piece crafted with precision,
            designed for those who understand that true elegance is timeless.
          </p>
        </div>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-px h-10 sm:h-12 bg-gradient-to-b from-yellow-400 to-transparent"></div>
        </div>
      </section>

      {/* Chaos Edition */}
      <section
        id="f1-edition"
        className="py-16 sm:py-20 relative bg-black bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/file_0000000044c8622fb0caf79179595f70.png')" }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 tracking-wide">
              Chaos Edition
            </h2>
            <div className="h-px w-24 sm:w-32 bg-yellow-400 mx-auto mb-4 sm:mb-6"></div>
            <p className="text-gray-300 text-sm sm:text-lg max-w-md sm:max-w-2xl mx-auto">
              No rules. No repeats. Just pure chaos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {limitedProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-gray-900/50 rounded-lg overflow-hidden border border-white/10 hover:border-yellow-400/30 transition-all duration-500 hover:scale-105"
              >
                <div className="aspect-w-3 aspect-h-4 relative overflow-hidden">
                  <img
                    src={product.frontImage}
                    alt={product.name}
                    className="w-full h-60 sm:h-72 md:h-80 object-cover transition-opacity duration-700 group-hover:opacity-0"
                  />
                  <img
                    src={product.backImage}
                    alt={`${product.name} back`}
                    className="w-full h-60 sm:h-72 md:h-80 object-cover absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-white font-semibold text-md sm:text-lg mb-1 sm:mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-yellow-400 font-bold text-lg sm:text-xl">₹{product.price}</p>
                  <div className="flex items-center mt-2 sm:mt-4 text-gray-400 group-hover:text-white transition-colors duration-300">
                    <span className="text-sm">View Details</span>
                    <ArrowRight className="w-4 h-4 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Dark Edition */}
      <section
        id="dark-edition"
        className="py-16 sm:py-20 relative bg-cover bg-center"
        style={{ backgroundImage: "url('/dark-bg.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 tracking-wide">
              DARK EDITION
            </h2>
            <div className="h-px w-24 sm:w-32 bg-yellow-400 mx-auto mb-4 sm:mb-6"></div>
            <p className="text-gray-400 text-sm sm:text-lg max-w-md sm:max-w-2xl mx-auto">
              Embrace the shadows. Where mystery meets elegance in perfect harmony.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {darkProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-gray-900/50 rounded-lg overflow-hidden border border-white/10 hover:border-yellow-400/30 transition-all duration-500 hover:scale-105"
              >
                <div className="aspect-w-3 aspect-h-4 relative overflow-hidden">
                  <img
                    src={product.frontImage}
                    alt={product.name}
                    className="w-full h-60 sm:h-72 md:h-80 object-cover transition-opacity duration-700 group-hover:opacity-0"
                  />
                  <img
                    src={product.backImage}
                    alt={`${product.name} back`}
                    className="w-full h-60 sm:h-72 md:h-80 object-cover absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-white font-semibold text-md sm:text-lg mb-1 sm:mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-yellow-400 font-bold text-lg sm:text-xl">₹{product.price}</p>
                  <div className="flex items-center mt-2 sm:mt-4 text-gray-400 group-hover:text-white transition-colors duration-300">
                    <span className="text-sm">View Details</span>
                    <ArrowRight className="w-4 h-4 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Edition Modal Trigger */}
      <div className="text-center py-8 sm:py-10">
        <button
          onClick={() => setModalOpen(true)}
          className="text-white bg-yellow-500 hover:bg-yellow-600 px-5 sm:px-6 py-2 rounded-lg transition"
        >
          View Signature Edition
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
          <div className="bg-white text-black p-6 sm:p-8 rounded-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-black text-2xl sm:text-xl"
              onClick={() => setModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-3 sm:mb-4">Signature Edition</h2>
            <p className="text-gray-700 text-sm sm:text-base">
              The Signature Edition is coming soon. Stay tuned for the most exclusive drop of the year.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
