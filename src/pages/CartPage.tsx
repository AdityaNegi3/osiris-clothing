import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutForm from '../components/CheckoutForm';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

type ShippingOption = {
  id: 'free' | 'fast';
  label: string;
  days: number;
  cost: number;
};

const SHIPPING_OPTIONS: ShippingOption[] = [
  { id: 'free', label: 'Free Shipping', days: 6, cost: 0 },
  { id: 'fast', label: 'Fast Shipping', days: 3, cost: 100 },
];

const USED_COUPONS_STORAGE_KEY = 'osiris_used_coupons';
const VALID_COUPONS_STORAGE_KEY = 'osiris_valid_coupons';

// === INITIAL RANDOM COUPONS (seed) ===
const INITIAL_VALID_COUPONS = [
  "OSR-MUSLYYP6GB","OSR-LRVEWPV5DH","OSR-NQT166XD6D","OSR-VWJZH1TQ6W","OSR-VFCXPGJQ1Y",
  "OSR-QHEYABV4SQ","OSR-CCNYB6NJ67","OSR-DCAAAYJ1H6","OSR-1M2CP7VLET","OSR-9Z38DFQMK4",
  "OSR-5T6GZPRH2K","OSR-K2WPL9X7FH","OSR-RJ6SN4YB8D","OSR-HV7Q2GMB5S","OSR-YC3D8KJN2L",
  "OSR-FPXJ6B2Q9H","OSR-7GKW5MZQ3P","OSR-4RNT8VJY2S","OSR-QL8MB5H7PD","OSR-A2ZJ7KX9VH",
  "OSR-6SND9PRY4L","OSR-MK3V5T8Q9W","OSR-E9GR2H4Z7L","OSR-PV6C3X8J2K","OSR-X7H9L2Q6MB",
  "OSR-2YQ8JH5W4D","OSR-ZR6K1P3M8V","OSR-3GB7N5LQ2S","OSR-8C6J2MVW9P","OSR-T5KQ9RH3MB",
  "OSR-7YH4P2XG9L","OSR-J6V2R8NQ4M","OSR-9P3K7T2Z6L","OSR-4M8Q2H9JV5","OSR-N5G2Q6MK7L",
  "OSR-6QJ3P8R2VH","OSR-3V7K9L2PG5","OSR-B8Q2M6R7HK","OSR-2K9P6H4V3M","OSR-5J7Q2M8L9R",
  "OSR-6X2G9P3V7M","OSR-Q3M7K6V2LH","OSR-1P9J6K7R2V","OSR-8M2Q4H7K9P","OSR-R2K7M9V3QH",
  "OSR-4G9Q2M6P7K","OSR-Y6P3R8K2MQ","OSR-2M7Q9P6K3V","OSR-9K3M2V8P7Q","OSR-6H2Q7M9P3LK",
  "OSR-7Q3M2K9P6Q","OSR-3P7M2K9Q6V","OSR-1K9M3P7Q6V","OSR-2M3K7P9Q6V","OSR-8K2M7P3Q9V",
  "OSR-6M3P2K9Q7V","OSR-5K7M2Q3P9V","OSR-9Q2M7K3P6V","OSR-3M9P2K7Q6V","OSR-7K3M2P9Q6V",
  "OSR-4P2M7K3Q9V","OSR-6K3M7P9Q2V","OSR-2Q7M3K9P6V","OSR-5M2K7P3Q9V","OSR-8M3K2P9Q7V",
  "OSR-9P2M3K7Q6V","OSR-3Q7M9K2P6V","OSR-1M3K7P2Q9V","OSR-6P9M3K2Q7V","OSR-2K3M9P7Q6V",
  "OSR-4M7P3K2Q9V","OSR-7P2M9K3Q6V","OSR-9K7M2P3Q6V","OSR-3M2K9P7Q6V","OSR-5P3M7K2Q9V",
  "OSR-6M9P3K2Q7V","OSR-8K3M2P7Q9V","OSR-2P9M3K7Q6V","OSR-4K3M7P2Q9V","OSR-7M2P9K3Q6V",
  "OSR-3K9M2P7Q6V","OSR-1P3M7K9Q2V","OSR-6K2M9P3Q7V","OSR-5M3K7P2Q9V","OSR-9P7M2K3Q6V",
  "OSR-2M9K3P7Q6V","OSR-4P3M7K9Q2V","OSR-7K9M2P3Q6V","OSR-3M7K2P9Q6V","OSR-8P2M3K7Q9V",
  "OSR-6M3P9K2Q7V","OSR-2K7M3P9Q6V","OSR-5Q3M7K2P9V"
];

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedShippingId, setSelectedShippingId] = useState<ShippingOption['id']>('free');
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'error' | 'success' | 'info'; text: string } | null>(null);

  const [usedCoupons, setUsedCoupons] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(USED_COUPONS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(VALID_COUPONS_STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(VALID_COUPONS_STORAGE_KEY, JSON.stringify(INITIAL_VALID_COUPONS));
      }
    } catch (e) {
      console.warn('Could not seed coupons', e);
    }
  }, []);

  const getValidCoupons = (): string[] => {
    try {
      const raw = localStorage.getItem(VALID_COUPONS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : INITIAL_VALID_COUPONS;
    } catch {
      return INITIAL_VALID_COUPONS;
    }
  };

  const markCouponUsed = (code: string) => {
    const next = Array.from(new Set([...getUsedCouponsFromStorage(), code]));
    localStorage.setItem(USED_COUPONS_STORAGE_KEY, JSON.stringify(next));
    setUsedCoupons(next);
  };

  const unmarkCouponUsed = (code: string) => {
    const next = getUsedCouponsFromStorage().filter((c) => c !== code);
    localStorage.setItem(USED_COUPONS_STORAGE_KEY, JSON.stringify(next));
    setUsedCoupons(next);
  };

  const getUsedCouponsFromStorage = (): string[] => {
    try {
      const raw = localStorage.getItem(USED_COUPONS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setMessage({ type: 'error', text: 'Please enter a coupon code.' });
      return;
    }
    const validCoupons = getValidCoupons();
    if (!validCoupons.includes(code)) {
      setMessage({ type: 'error', text: 'Invalid coupon code.' });
      return;
    }
    if (getUsedCouponsFromStorage().includes(code)) {
      setMessage({ type: 'error', text: 'This coupon has already been used.' });
      return;
    }
    setAppliedCoupon(code);
    markCouponUsed(code);
    setMessage({ type: 'success', text: `Coupon applied — ${code} gives 10% off.` });
  };

  const removeAppliedCoupon = () => {
    if (!appliedCoupon) return;
    unmarkCouponUsed(appliedCoupon);
    setAppliedCoupon(null);
    setCouponInput('');
    setMessage({ type: 'info', text: 'Coupon removed.' });
  };

  const subtotal = getTotalPrice();
  const discount = appliedCoupon ? Math.round((subtotal * 10) / 100) : 0;
  const selectedShipping = SHIPPING_OPTIONS.find((s) => s.id === selectedShippingId) ?? SHIPPING_OPTIONS[0];
  const shippingCost = selectedShipping.cost;
  const totalWithShipping = subtotal - discount + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div
        className="pt-16 min-h-screen flex items-center justify-center"
        style={{
          background: 'linear-gradient(180deg, rgba(20,0,0,0.85) 0%, rgba(0,0,0,1) 60%)',
        }}
      >
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Your Cart is Empty</h2>
          <p className="text-gray-400 mb-8">Discover our luxury collections and add items to your cart.</p>
          <Link
            to="/"
            className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="pt-16 min-h-screen"
      style={{
        // a smooth red -> black diagonal fade. tweak the rgba stops if you want stronger red.
        background: 'linear-gradient(135deg, rgba(139,0,0,0.75) 0%, rgba(0,0,0,1) 60%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-gray-400 hover:text-red-400 transition-colors duration-300 flex items-center"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="bg-black/60 rounded-lg border border-white/10 p-6 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-6">
                  <img src={item.frontImage} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />

                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-1">{item.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">Size: {item.size}</p>
                    <p className="text-white font-bold">₹{item.price}</p>
                  </div>

                  {/* Quantity controls: vertical on small screens (minus above, plus below),
                      horizontal on sm+ screens */}
                  <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors duration-300"
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors duration-300"
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* <-- HIDDEN ON PHONE VIEW: trash button */}
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="hidden sm:inline-flex text-gray-400 hover:text-red-400 transition-colors duration-300 p-2"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-black/70 rounded-lg border border-white/10 p-6 h-fit backdrop-blur-sm">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              {/* Coupon input */}
              <div className="mt-2 mb-2">
                <label className="block text-sm text-gray-300 mb-2">Have a coupon?</label>
                <div className="flex space-x-2">
                  <input
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 bg-gray-900 text-white px-3 py-2 rounded-lg border border-white/10 focus:outline-none"
                  />
                  {!appliedCoupon ? (
                    <button onClick={applyCoupon} className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200">Apply</button>
                  ) : (
                    <button onClick={removeAppliedCoupon} className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200">Remove</button>
                  )}
                </div>
                {message && (
                  <div className={`mt-2 text-sm ${message.type === 'error' ? 'text-red-400' : message.type === 'success' ? 'text-green-400' : 'text-gray-300'}`}>
                    {message.text}
                  </div>
                )}
              </div>

              {/* Shipping selector */}
              <div className="mt-2 mb-2">
                <label className="block text-sm text-gray-300 mb-2">Choose shipping</label>
                <div className="space-y-2">
                  {SHIPPING_OPTIONS.map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors duration-200 ${selectedShippingId === opt.id ? 'border-white/30 bg-white/3' : 'border-white/10'}`}
                    >
                      <div className="flex items-start space-x-3">
                        <input type="radio" name="shipping" value={opt.id} checked={selectedShippingId === opt.id} onChange={() => setSelectedShippingId(opt.id)} className="mt-1 accent-red-600" />
                        <div>
                          <div className="text-white font-medium">{opt.label}</div>
                          <div className="text-gray-400 text-sm">Estimated {opt.days} days</div>
                        </div>
                      </div>
                      <div className="text-white font-semibold">₹{opt.cost}</div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : `₹${shippingCost}`}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Discount (10%)</span>
                  <span>- ₹{discount}</span>
                </div>
              )}

              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Total</span>
                  <span>₹{totalWithShipping}</span>
                </div>
              </div>
            </div>

            <button onClick={() => setShowCheckout(true)} className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 mb-4">Secure Checkout</button>

            <Link to="/" className="block text-center text-gray-400 hover:text-white transition-colors duration-300">Continue Shopping</Link>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.8), rgba(20,0,0,0.25))' }}>
          <div className="bg-black/90 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Checkout</h2>
              <button onClick={() => setShowCheckout(false)} className="text-gray-400 hover:text-white transition-colors duration-300 text-2xl">✕</button>
            </div>

            <CheckoutForm
              onClose={() => setShowCheckout(false)}
              shippingMethod={{
                id: selectedShipping.id,
                label: selectedShipping.label,
                estimatedDays: selectedShipping.days,
                cost: selectedShipping.cost,
              }}
              appliedCoupon={appliedCoupon ?? undefined}
              discountAmount={discount}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
