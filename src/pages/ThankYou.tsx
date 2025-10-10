import React, { useState } from 'react';
import { CheckCircle, Copy, Instagram, Mail, Home } from 'lucide-react';
import { motion } from 'framer-motion';

type Props = {
  name?: string;
  orderId?: string;
  onContinue?: () => void;
};

const ThankYou: React.FC<Props> = ({
  name = 'Customer',
  orderId = '',
  onContinue,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!orderId) return;
    try {
      await navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // graceful degradation
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-red-800 text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full bg-gradient-to-b from-black/70 via-black/50 to-black/30 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-red-800/40">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease: 'circOut' }}
          className="flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ rotate: -10, scale: 0.6 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 12 }}
            className="rounded-full bg-red-800/40 p-5 mb-4"
            aria-hidden
          >
            <CheckCircle className="w-16 h-16 text-green-400" />
          </motion.div>

          <h1 className="text-2xl md:text-3xl font-extrabold mb-1">Thanks, {name}!</h1>
          <p className="text-sm text-gray-300 mb-4">Your payment was successful.</p>

          {orderId ? (
            <div className="font-mono text-sm bg-black/40 px-3 py-2 rounded mb-4 inline-flex items-center gap-3">
              <div className="text-xs text-gray-300">Order ID</div>
              <div>{orderId}</div>
              <button
                onClick={handleCopy}
                className="ml-2 text-xs px-2 py-1 rounded bg-red-800/40 hover:bg-red-700/60"
                aria-label="Copy order id"
              >
                <Copy className="w-4 h-4 inline-block mr-1" />
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          ) : null}

          <p className="text-sm text-gray-300 mb-6">
            Order details will be sent via WhatsApp and Email within <span className="font-semibold text-white">15–30 minutes</span>. If you don’t receive them, please reach out to us.
          </p>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <a
              href={`https://instagram.com/officialosirisclothing`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium bg-red-800/40 hover:bg-red-700/60"
            >
              <Instagram className="w-4 h-4" />
              @officialosirisclothing
            </a>

            <div className="inline-flex flex-col gap-2">
              <a
                href={`mailto:osirisvip.life@gmail.com`}
                className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium bg-red-800/40 hover:bg-red-700/60"
              >
                <Mail className="w-4 h-4" />
                osirisvip.life@gmail.com
              </a>

              <a
                href={`mailto:team@osirisclothing.site`}
                className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium bg-red-800/40 hover:bg-red-700/60"
              >
                <Mail className="w-4 h-4" />
                team@osirisclothing.site
              </a>
            </div>
          </div>

          {/* Centered Continue Shopping button — bold red appearance */}
          <div className="mt-4 w-full flex items-center justify-center">
            <button
              onClick={() => onContinue?.()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-500 font-semibold shadow-lg transform active:scale-95"
            >
              <Home className="w-5 h-5" />
              Continue Shopping
            </button>
          </div>

          <p className="mt-4 text-xs text-gray-400">Received a duplicate charge or have an issue? Reply on Instagram or email us — we'll sort it.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ThankYou;
