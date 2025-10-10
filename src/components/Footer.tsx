import React from "react";
import { Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-black via-black to-red-900 border-t border-white/10 py-12">
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
            <h4 className="text-white font-semibold mb-4">Help</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm"
                >
                  Shipping Policy
                </Link>
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
                href="mailto:team@osirisclothing.site"
                className="flex items-center text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm"
              >
                <Mail className="w-4 h-4 mr-2" />
                team@osirisclothing.site
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
