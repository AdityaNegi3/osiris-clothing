import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { CreditCard, Lock, User, X } from 'lucide-react';

type ShippingMethod = {
  id: string;
  label: string;
  estimatedDays?: number;
  cost: number;
};

type Props = {
  onClose: () => void;
  shippingMethod?: ShippingMethod;
  appliedCoupon?: string;
  discountAmount?: number;
};

const CheckoutForm: React.FC<Props> = ({ onClose, shippingMethod, appliedCoupon, discountAmount }) => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
  });

  // compute subtotal from cart context (live)
  const subtotal = getTotalPrice();
  const shippingCost = shippingMethod?.cost ?? 0;
  const discount = typeof discountAmount === 'number' ? discountAmount : 0;
  // displayed total (keeps in sync with cart page calculation)
  const totalAmount = Math.max(0, subtotal - discount + shippingCost);

  useEffect(() => {
    const orig = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = orig;
    };
  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load.');
      return;
    }

    // read freshest subtotal right before payment to avoid stale values
    const currentSubtotal = getTotalPrice();
    const currentShipping = shippingMethod?.cost ?? 0;
    const currentDiscount = typeof discountAmount === 'number' ? discountAmount : 0;
    const currentTotal = Math.max(0, currentSubtotal - currentDiscount + currentShipping);

    const options = {
      key: 'rzp_live_iZZc7jaS5vFcbq',
      amount: Math.round(currentTotal * 100),
      currency: 'INR',
      name: 'Osiris',
      description: 'Luxury Clothing Purchase',
      handler: async function () {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://formsubmit.co/osirisvip.life@gmail.com';

        const addField = (name: string, value: string) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = name;
          input.value = String(value ?? '');
          form.appendChild(input);
        };

        addField('Full Name', customerInfo.name);
        addField('Email', customerInfo.email);
        addField('Phone Number', customerInfo.phone);
        addField(
          'Address',
          `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state} - ${customerInfo.postalCode}`
        );
        addField('Subtotal', `₹${currentSubtotal}`);
        if (currentDiscount > 0) addField('Discount', `-₹${currentDiscount}`);
        addField('Shipping', `₹${currentShipping}`);
        addField('Total Amount', `₹${currentTotal}`);

        cartItems.forEach((item, index) => {
          addField(
            `Item ${index + 1}`,
            `${item.name} (Size: ${item.size ?? 'N/A'}, Qty: ${item.quantity}) - ₹${item.price * item.quantity}`
          );
        });

        if (appliedCoupon) addField('Applied Coupon', appliedCoupon);
        addField('_captcha', 'false');
        addField('_next', 'https://osirisclothing.site/thank-you');
        document.body.appendChild(form);
        form.submit();
        clearCart();
        onClose();
      },
      prefill: {
        name: customerInfo.name,
        email: customerInfo.email,
        contact: customerInfo.phone,
      },
      notes: {
        address: `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state} - ${customerInfo.postalCode}`,
      },
      theme: {
        color: '#EF4444',
      },
    } as any;

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await handleRazorpayPayment();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true" role="dialog" >
      {/* Dark blurred overlay — stronger so page doesn't show through */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      {/* Modal container */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-gray-800 z-10" style={{
        // nearly-opaque custom gradient so underlying page doesn't show through
        background: 'linear-gradient(180deg, rgba(12,3,3,0.95) 0%, rgba(40,6,6,0.95) 45%, rgba(0,0,0,0.96) 100%)',
      }} >
        {/* Sticky header — make it solid so it doesn't merge with page */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 px-6 py-5 bg-[#0b0505] border-b border-gray-800">
          <div>
            <h3 className="text-2xl font-bold text-white">Checkout</h3>
            <div className="flex items-center text-gray-300 text-sm mt-1">
              <Lock className="w-4 h-4 mr-2" /> Powered by Razorpay
            </div>
          </div>
          <button onClick={onClose} aria-label="Close checkout" className="p-2 rounded-md hover:bg-white/5 text-gray-300" >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-white font-semibold flex items-center">
                <User className="w-5 h-5 mr-2" /> Customer Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name *" required value={customerInfo.name} onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                <input type="email" placeholder="Email Address *" required value={customerInfo.email} onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500" />
              </div>
              <input type="tel" placeholder="Phone Number *" required value={customerInfo.phone} onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500" />
              <textarea placeholder="Complete Address *" rows={3} required value={customerInfo.address} onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="text" placeholder="City *" required value={customerInfo.city} onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                <input type="text" placeholder="State *" required value={customerInfo.state} onChange={(e) => setCustomerInfo({ ...customerInfo, state: e.target.value })} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                <input type="text" placeholder="PIN Code *" required value={customerInfo.postalCode} onChange={(e) => setCustomerInfo({ ...customerInfo, postalCode: e.target.value })} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500" />
              </div>
            </div>

            <div className="bg-[#040404] rounded-lg p-6 border border-gray-800">
              <h4 className="text-white font-semibold mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" /> Order Summary
              </h4>
              <div className="flex justify-between items-center text-white font-bold text-lg">
                <span>Total Amount</span>
                <span className="text-white">₹{totalAmount}</span>
              </div>
              {appliedCoupon && (
                <div className="mt-2 text-sm text-green-400">Coupon applied: {appliedCoupon} (−₹{discount})</div>
              )}
              <div className="mt-1 text-sm text-gray-400">Shipping: ₹{shippingCost === 0 ? 'Free' : shippingCost}</div>
            </div>

            <button type="submit" className="w-full py-4 px-6 rounded-lg font-semibold text-lg bg-white text-black hover:bg-gray-200 hover:transform hover:scale-105 transition-transform" >
              <Lock className="w-5 h-5 mr-2 inline" /> Pay ₹{totalAmount} Securely
            </button>

            <div className="text-center text-xs text-gray-400">Secure payment via Razorpay</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
