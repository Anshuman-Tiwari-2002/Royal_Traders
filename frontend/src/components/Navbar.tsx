import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  Heart, 
  User as UserIcon,
  LogIn,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-serif text-wood-600">Royal Traders</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/shop" className="text-gray-700 hover:text-wood-600">Shop</Link>
            <Link to="/categories" className="text-gray-700 hover:text-wood-600">Categories</Link>
            <Link to="/about" className="text-gray-700 hover:text-wood-600">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-wood-600">Contact</Link>
          </nav>

          {/* Search, Cart, and User */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:block">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-wood-600" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-wood-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <UserIcon className="h-6 w-6 text-gray-700" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/account">Account Overview</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/orders">Orders</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/wishlist">Wishlist</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link to="/login">
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <LogIn className="h-6 w-6 text-gray-700" />
                    </Button>
                  </Link>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 hover:text-wood-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/shop" 
                className="text-gray-700 hover:text-wood-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/categories" 
                className="text-gray-700 hover:text-wood-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-wood-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-wood-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/account" 
                    className="text-gray-700 hover:text-wood-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  <Link 
                    to="/orders" 
                    className="text-gray-700 hover:text-wood-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  <Link 
                    to="/wishlist" 
                    className="text-gray-700 hover:text-wood-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Wishlist
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left text-red-600 hover:text-red-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-wood-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
