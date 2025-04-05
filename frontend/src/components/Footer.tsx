import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-amber-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-serif mb-4 text-white font-bold">Royal Traders</h3>
            <p className="text-amber-100 mb-4">
              Crafting premium wooden products since 2005. Our commitment to quality and sustainability sets us apart.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-amber-200 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-amber-200 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-amber-200 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-white font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-amber-100 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="text-amber-100 hover:text-white transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/categories" className="text-amber-100 hover:text-white transition-colors">Categories</Link>
              </li>
              <li>
                <Link to="/about" className="text-amber-100 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-amber-100 hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-white font-bold">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-amber-100 hover:text-white transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-amber-100 hover:text-white transition-colors">Shipping & Delivery</Link>
              </li>
              <li>
                <Link to="/returns" className="text-amber-100 hover:text-white transition-colors">Returns & Exchanges</Link>
              </li>
              <li>
                <Link to="/terms" className="text-amber-100 hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-amber-100 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-white font-bold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-amber-300 flex-shrink-0 mt-1" />
                <span className="text-amber-100">123 Woodland Drive, Timber City, TC 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-amber-300" />
                <span className="text-amber-100">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-amber-300" />
                <span className="text-amber-100">contact@royaltraders.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-amber-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-amber-200 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Royal Traders. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-amber-200 text-sm">Payment Methods:</span>
              <div className="flex items-center space-x-2">
                <span className="text-amber-200 text-sm">Credit Card</span>
                <span className="text-amber-200 text-sm">•</span>
                <span className="text-amber-200 text-sm">PayPal</span>
                <span className="text-amber-200 text-sm">•</span>
                <span className="text-amber-200 text-sm">Bank Transfer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
