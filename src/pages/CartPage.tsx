import React from 'react';
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

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  // selected shipping option id
  const [selectedShippingId, setSelectedShippingId] = useState<ShippingOption['id']>('free');

  const subtotal = getTotalPrice();
  const selectedShipping = SHIPPING_OPTIONS.find((s) => s.id === selectedShippingId) ?? SHIPPING_OPTIONS[0];
  const shippingCost = selectedShipping.cost;
  const totalWithShipping = subtotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="pt-16 min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Your Cart is Empty</h2>
          <p className="text-gray-400 mb-8">
            Discover our luxury collections and add items to your cart.
          </p>
          <Link
            to="/"
            className="inline-block bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-black">
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
                className="bg-black rounded-lg border border-white/10 p-6"
              >
                <div className="flex items-center space-x-6">
                  <img
                    src={item.frontImage}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-1">{item.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">Size: {item.size}</p>
                    <p className="text-white font-bold">₹{item.price}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity - 1)
                      }
                      className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700 transition-colors duration-300"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <span className="text-white font-semibold w-8 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity + 1)
                      }
                      className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700 transition-colors duration-300"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="text-gray-400 hover:text-red-400 transition-colors duration-300 p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-black rounded-lg border border-white/10 p-6 h-fit">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              {/* Shipping selector */}
              <div className="mt-2 mb-2">
                <label className="block text-sm text-gray-300 mb-2">Choose shipping</label>
                <div className="space-y-2">
                  {SHIPPING_OPTIONS.map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors duration-200 ${
                        selectedShippingId === opt.id ? 'border-white/30 bg-white/2' : 'border-white/10'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          name="shipping"
                          value={opt.id}
                          checked={selectedShippingId === opt.id}
                          onChange={() => setSelectedShippingId(opt.id)}
                          className="mt-1 accent-white"
                        />
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

              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Total</span>
                  <span>₹{totalWithShipping}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-white text-black py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300 mb-4"
            >
              Secure Checkout
            </button>

            <Link
              to="/"
              className="block text-center text-gray-400 hover:text-white transition-colors duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Checkout</h2>
              <button
                onClick={() => setShowCheckout(false)}
                className="text-gray-400 hover:text-white transition-colors duration-300 text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Pass shipping info to CheckoutForm so payment/confirmation can use it */}
            <CheckoutForm
              onClose={() => setShowCheckout(false)}
              shippingMethod={{
                id: selectedShipping.id,
                label: selectedShipping.label,
                estimatedDays: selectedShipping.days,
                cost: selectedShipping.cost,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
