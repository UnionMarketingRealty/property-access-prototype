import React, { useState } from 'react';
import { Search, Menu, X, Home} from 'lucide-react';
import { useAuth } from '../contexts/authContext';

const Header: React.FC= () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { user,logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 hover:cursor-pointer"
              onClick={()=>window.location.href='/'}>
            <Home className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Union Homes</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#buy" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Buy
            </a>
            <a href="#rent" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Rent
            </a>
            <a href="#sell" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Sell
            </a>
            <a href="#agents" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Agent
            </a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Toronto, Mississauga, Brampton..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Sign In Button */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
                <button 
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  onClick={logout}
                >Log Out</button>
              ) : (
                <button 
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  onClick={() => window.location.href = '/sign-in'}>
                  Sign In
                </button>
              )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search properties..."
                    className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </form>
              <a href="#buy" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                Buy
              </a>
              <a href="#rent" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                Rent
              </a>
              <a href="#sell" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                Sell
              </a>
              <a href="#agents" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                Agents
              </a>
              <a href="/contact" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                Contact Us
              </a>
              {user ? (
                <button 
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  onClick={logout}
                >Sign Out</button>
              ) : (
                <button 
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  onClick={() => window.location.href = './sign-in'}
                >Sign In</button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;