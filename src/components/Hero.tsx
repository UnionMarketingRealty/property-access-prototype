import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Bed, Bath } from 'lucide-react';
import { SearchFilters } from '../types/Property';
import {useAuth} from '../contexts/authContext';

interface HeroProps {
  onFiltersChange: (filters: Partial<SearchFilters>) => void;
  scrollTo: ()=>void;
}

const Hero: React.FC<HeroProps> = ({ onFiltersChange, scrollTo }) => {
  const [activeTab, setActiveTab] = useState<'sale' | 'lease'>('sale');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const {user} = useAuth();

  const handleSearch = () => {
    const filters: Partial<SearchFilters> = {
      priceType: activeTab,
      location: location,
      bedrooms: bedrooms ? parseInt(bedrooms) : 0,
    };

    if (priceRange) {
      const [min, max] = priceRange.split('-').map(p => parseInt(p.replace(/[^0-9]/g, '')));
      filters.minPrice = min || 0;
      filters.maxPrice = max || 999999999;
    }

    onFiltersChange(filters);
    scrollTo();
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 min-h-[500px] flex items-center">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-black/40"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1600)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          {user?
          <h1 className="mt-3 text-4xl md:text-6xl font-bold text-white mb-6">
            Welcome {user.name}!
          </h1>
          :<h1></h1>}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Find Your Dream Home in the GTA
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Discover the perfect property for sale or lease across Toronto, Mississauga, Brampton, and surrounding areas
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-4xl mx-auto mb-8">
          {/* Buy/Rent Tabs */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setActiveTab('sale')}
              className={`flex-1 py-3 px-6 rounded-md font-medium transition-all ${
                activeTab === 'sale'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setActiveTab('lease')}
              className={`flex-1 py-3 px-6 rounded-md font-medium transition-all ${
                activeTab === 'lease'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Rent
            </button>
          </div>

          {/* Search Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Location */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Toronto, Mississauga, Brampton..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Price Range */}
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="">Price Range</option>
                {activeTab === 'sale' ? (
                  <>
                    <option value="0-800000">Under $800K CAD</option>
                    <option value="800000-1200000">$800K - $1.2M CAD</option>
                    <option value="1200000-1600000">$1.2M - $1.6M CAD</option>
                    <option value="1600000-2500000">$1.6M - $2.5M CAD</option>
                    <option value="2500000-999999999">Over $2.5M CAD</option>
                  </>
                ) : (
                  <>
                    <option value="0-2500">Under $2,500 CAD</option>
                    <option value="2500-3500">$2,500 - $3,500 CAD</option>
                    <option value="3500-5000">$3,500 - $5,000 CAD</option>
                    <option value="5000-8000">$5,000 - $8,000 CAD</option>
                    <option value="8000-999999999">Over $8,000 CAD</option>
                  </>
                )}
              </select>
            </div>

            {/* Bedrooms */}
            <div className="relative">
              <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="">Bedrooms</option>
                <option value="1">1+ Bedroom</option>
                <option value="2">2+ Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
              </select>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Search className="h-5 w-5" />
              <span>Search</span>
            </button>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span>2,500+ GTA Properties</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span>MLS® Verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
              <span>RECO Licensed Agents</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;