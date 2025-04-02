
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  Heart, 
  User as UserIcon,
  LogIn
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
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-serif font-semibold text-wood-800">Royal Traders</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-wood-600 font-medium">Home</Link>
            <Link to="/shop" className="text-gray-700 hover:text-wood-600 font-medium">Shop</Link>
            <Link to="/categories" className="text-gray-700 hover:text-wood-600 font-medium">Categories</Link>
            <Link to="/about" className="text-gray-700 hover:text-wood-600 font-medium">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-wood-600 font-medium">Contact</Link>
          </div>

          {/* Search, Cart, User */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block relative">
              <Input 
                type="text" 
                placeholder="Search products..." 
                className="pl-10 pr-4 py-2 w-60 border rounded-lg focus:outline-none focus:ring-2 focus:ring-wood-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            
            {/* Wishlist */}
            <Link to="/wishlist" className="text-gray-700 hover:text-wood-600">
              <Heart size={20} />
            </Link>
            
            {/* Cart */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="text-gray-700 hover:text-wood-600 relative">
                  <ShoppingCart size={20} />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-wood-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Shopping Cart</SheetTitle>
                  <SheetDescription>
                    {totalItems === 0 ? 'Your cart is empty' : `${totalItems} items in your cart`}
                  </SheetDescription>
                </SheetHeader>
                {/* Cart items will be rendered here by the CartSheet component */}
                <div className="mt-8">
                  <Link to="/cart">
                    <Button className="w-full bg-wood-600 hover:bg-wood-700">
                      View Cart & Checkout
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-1">
                    <UserIcon size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
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
                  <DropdownMenuItem onClick={logout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="ghost" className="p-1">
                  <LogIn size={20} />
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            <div className="relative mb-4">
              <Input 
                type="text" 
                placeholder="Search products..." 
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-wood-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <Link to="/" className="block py-2 text-gray-700 hover:text-wood-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/shop" className="block py-2 text-gray-700 hover:text-wood-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
            <Link to="/categories" className="block py-2 text-gray-700 hover:text-wood-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Categories</Link>
            <Link to="/about" className="block py-2 text-gray-700 hover:text-wood-600 font-medium" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link to="/contact" className="block py-2 text-gray-700 hover:text-wood-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
