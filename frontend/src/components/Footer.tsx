import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-wood-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-serif mb-4">Royal Traders</h3>
            <p className="text-gray-300 mb-4">
              Crafting premium wooden products since 2005. Our commitment to quality and sustainability sets us apart.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-white">Shop</Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-white">Categories</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-medium mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white">FAQ</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-white">Shipping & Delivery</Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-white">Returns & Exchanges</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-wood-300 flex-shrink-0 mt-1" />
                <span className="text-gray-300">123 Woodland Drive, Timber City, TC 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-wood-300" />
                <span className="text-gray-300">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-wood-300" />
                <span className="text-gray-300">contact@royaltraders.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Royal Traders. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <span className="text-gray-400 text-sm">Payment Methods:</span>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Credit Card</span>
              <span className="text-gray-400 text-sm">•</span>
              <span className="text-gray-400 text-sm">PayPal</span>
              <span className="text-gray-400 text-sm">•</span>
              <span className="text-gray-400 text-sm">Bank Transfer</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
