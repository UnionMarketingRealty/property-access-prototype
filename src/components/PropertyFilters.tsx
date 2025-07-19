import React from 'react';
import { SearchFilters } from '../types/Property';
import { Filter, X } from 'lucide-react';

interface PropertyFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: Partial<SearchFilters>) => void;
  onClearFilters: () => void;
  resultsCount: number;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  resultsCount
}) => {
  const propertyTypes = ['house', 'condo', 'apartment', 'townhouse'];
  const sortOptions = [
    { value: 'price-asc', label: 'Price: Low to High', sortBy: 'price', sortOrder: 'asc' },
    { value: 'price-desc', label: 'Price: High to Low', sortBy: 'price', sortOrder: 'desc' },
    { value: 'date-desc', label: 'Newest First', sortBy: 'date', sortOrder: 'desc' },
    { value: 'size-desc', label: 'Largest First', sortBy: 'size', sortOrder: 'desc' },
  ];

  const handleSortChange = (value: string) => {
    const option = sortOptions.find(opt => opt.value === value);
    if (option) {
      onFiltersChange({
        sortBy: option.sortBy as 'price' | 'date' | 'size',
        sortOrder: option.sortOrder as 'asc' | 'desc'
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Filters ({resultsCount} properties found)
          </h3>
        </div>
        <button
          onClick={onClearFilters}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1"
        >
          <X className="h-4 w-4" />
          <span>Clear All</span>
        </button>
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Property Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Type
          </label>
          <select
            value={filters.propertyType}
            onChange={(e) => onFiltersChange({ propertyType: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            {propertyTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Bedrooms Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Bedrooms
          </label>
          <select
            value={filters.bedrooms}
            onChange={(e) => onFiltersChange({ bedrooms: parseInt(e.target.value) || 0 })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="0">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>

        {/* Bathrooms Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Bathrooms
          </label>
          <select
            value={filters.bathrooms}
            onChange={(e) => onFiltersChange({ bathrooms: parseInt(e.target.value) || 0 })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="0">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ''}
              onChange={(e) => onFiltersChange({ minPrice: parseInt(e.target.value) || 0 })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice === 999999999 ? '' : filters.maxPrice || ''}
              onChange={(e) => onFiltersChange({ maxPrice: parseInt(e.target.value) || 999999999 })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters */}
      <div className="mt-4 flex flex-wrap gap-2">
        {filters.priceType !== 'all' && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
            For {filters.priceType === 'sale' ? 'Sale' : 'Lease'}
            <button
              onClick={() => onFiltersChange({ priceType: 'all' })}
              className="ml-2 hover:text-blue-600"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        )}
        {filters.propertyType && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
            {filters.propertyType.charAt(0).toUpperCase() + filters.propertyType.slice(1)}
            <button
              onClick={() => onFiltersChange({ propertyType: '' })}
              className="ml-2 hover:text-blue-600"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        )}
        {filters.bedrooms > 0 && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
            {filters.bedrooms}+ Bedrooms
            <button
              onClick={() => onFiltersChange({ bedrooms: 0 })}
              className="ml-2 hover:text-blue-600"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default PropertyFilters;