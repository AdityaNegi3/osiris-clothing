import React from 'react';
import { Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">OSIRIS</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Luxury clothing redefined. Where elegance meets sophistication in every thread.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm">
                  Collections
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="/cart" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm">
                  Cart
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="space-y-3">
              <a
                href="https://instagram.com/officialosirisclothing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm"
              >
                <Instagram className="w-4 h-4 mr-2" />
                @officialosirisclothing
              </a>
              <a
                href="mailto:osirisvip.life@gmail.com"
                className="flex items-center text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm"
              >
                <Mail className="w-4 h-4 mr-2" />
                osirisvip.life@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8">
          <p className="text-gray-400 text-sm text-center">
            © 2025 Osiris. All rights reserved. Crafted with luxury in mind.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;