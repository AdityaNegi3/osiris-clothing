import React, { useState, useCallback } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Check, Info } from 'lucide-react';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState('M');
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [currentView, setCurrentView] = useState<'front' | 'back'>('front');
  const [addedToCart, setAddedToCart] = useState(false);

  // Zoom
  const [isZoomed, setIsZoomed] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState('50% 50%');
  const ZOOM_SCALE = 2;

  const product = products.find((p) => p.id === id);
  if (!product) return <Navigate to="/" replace />;

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const mainImageSrc =
    currentView === 'front' ? product.frontImage : product.backImage;

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize);
    navigate('/cart');
  };

  const computeOrigin = useCallback(
    (clientX: number, clientY: number, el: HTMLImageElement | null) => {
      if (!el) return '50% 50%';
      const rect = el.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      return `${x}% ${y}%`;
    },
    []
  );

  const onImageClick: React.MouseEventHandler<HTMLImageElement> = (e) => {
    const origin = computeOrigin(e.clientX, e.clientY, e.currentTarget);
    setTransformOrigin(origin);
    setIsZoomed((z) => !z);
  };

  const onImageMove: React.MouseEventHandler<HTMLImageElement> = (e) => {
    if (!isZoomed) return;
    const origin = computeOrigin(e.clientX, e.clientY, e.currentTarget);
    setTransformOrigin(origin);
  };

  // Calculate discount %
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : null;

  // Shared font style (Oswald, same as HomePage)
  const sharedFont: React.CSSProperties = {
    fontFamily: "'Oswald', 'Helvetica', 'Arial', sans-serif",
    fontWeight: 400,
  };

  // Page background gradient style
  const pageBgStyle: React.CSSProperties = {
    backgroundImage:
      'radial-gradient(circle at 8% 20%, rgba(180,20,20,0.95) 0%, rgba(140,10,10,0.9) 12%, rgba(60,10,10,0.7) 30%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,1) 100%),' +
      'linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.25))',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    fontFamily: "'Oswald', 'Helvetica', 'Arial', sans-serif",
  };

  return (
    <div style={pageBgStyle} className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            <div className="relative aspect-w-3 aspect-h-4 bg-gray-900 rounded-lg overflow-hidden">
              <img
                src={mainImageSrc}
                alt={`${product.name} ${currentView} view`}
                className={`w-full h-96 lg:h-[600px] object-cover select-none transition-transform duration-200 ease-out will-change-transform ${
                  isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                style={{
                  transform: isZoomed ? `scale(${ZOOM_SCALE})` : 'scale(1)',
                  transformOrigin,
                }}
                onClick={onImageClick}
                onMouseMove={onImageMove}
                draggable={false}
              />
            </div>

            {/* View Toggle */}
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentView('front')}
                className={`flex-1 py-3 px-6 rounded-lg border transition-all duration-300 ${
                  currentView === 'front'
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-transparent text-white border-red-600/40 hover:border-red-600'
                }`}
                style={sharedFont}
              >
                Front View
              </button>
              <button
                onClick={() => setCurrentView('back')}
                className={`flex-1 py-3 px-6 rounded-lg border transition-all duration-300 ${
                  currentView === 'back'
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-transparent text-white border-red-600/40 hover:border-red-600'
                }`}
                style={sharedFont}
              >
                Back View
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <span
                className="inline-block px-3 py-1 text-xs text-white bg-red-600 rounded-full mb-4"
                style={{ ...sharedFont, fontWeight: 400 }}
              >
                {product.category.toUpperCase()} EDITION
              </span>
              <h1
                className="text-3xl lg:text-4xl text-white mb-4"
                style={sharedFont}
              >
                {product.name}
              </h1>
              <p
                className="text-gray-400 text-lg leading-relaxed mb-6"
                style={sharedFont}
              >
                {product.description}
              </p>

              {/* ✅ Only show main price + discount */}
              <div className="flex items-center space-x-3 mb-2">
                <span
                  className="text-3xl text-white"
                  style={sharedFont}
                >
                  Rs {product.price.toLocaleString('en-IN')}
                </span>
                {discount && (
                  <span
                    className="text-green-500 text-lg"
                    style={sharedFont}
                  >
                    {discount}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white" style={sharedFont}>
                  Size
                </h3>
                <button
                  onClick={() => setShowSizeChart(true)}
                  className="text-white hover:text-gray-300 transition-colors duration-300 flex items-center text-sm"
                  style={sharedFont}
                >
                  <Info className="w-4 h-4 mr-1" />
                  Size Guide
                </button>
              </div>

              {/* Black select with red border */}
              <div className="relative">
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full rounded-lg pl-4 pr-10 py-3 bg-[#070707] text-white border-2 border-red-600 text-base appearance-none focus:outline-none focus:ring-2 focus:ring-red-600"
                  style={sharedFont}
                >
                  {sizes.map((size) => (
                    <option
                      key={size}
                      value={size}
                      className="bg-[#070707] text-white"
                    >
                      {size}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-300">
                  ▼
                </div>
              </div>
            </div>

            {/* Add to Cart + Buy Now */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 px-8 rounded-lg text-lg transition-all duration-300 ${
                  addedToCart
                    ? 'bg-green-600 text-white'
                    : 'bg-red-600 text-white hover:bg-red-700'
                } flex items-center justify-center`}
                style={sharedFont}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Added!
                  </>
                ) : (
                  'Add to Cart'
                )}
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full py-4 px-8 rounded-lg text-lg transition-all duration-300 bg-transparent text-white border border-red-600 hover:bg-red-600 hover:text-white"
                style={sharedFont}
              >
                Buy Now
              </button>
            </div>

            {/* Product Features */}
            <div className="border-t border-white/10 pt-8">
              <h4 className="text-white mb-4" style={sharedFont}>
                Product Features
              </h4>
              <ul className="space-y-2 text-gray-400" style={sharedFont}>
                <li>• Premium cotton blend fabric</li>
                <li>• Luxury finishing and attention to detail</li>
                <li>• Comfortable fit for all-day wear</li>
                <li>• Exclusive design elements</li>
                <li>• Machine washable</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Size Chart Modal */}
      {showSizeChart && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg" style={sharedFont}>
                Size Chart
              </h3>
              <button
                onClick={() => setShowSizeChart(false)}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                ✕
              </button>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <img
                src="/size-chart.png"
                alt="Size Chart"
                className="max-w-full max-h-[80vh] object-contain mx-auto rounded"
              />
            </div>
            <p
              className="text-gray-400 text-sm mt-4 text-center"
              style={sharedFont}
            >
              Measurements are in inches. For best fit, refer to the size chart
              above.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
