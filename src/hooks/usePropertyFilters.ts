import { useState, useMemo } from 'react';
import { Property, SearchFilters } from '../types/Property';

const defaultFilters: SearchFilters = {
  priceType: 'all',
  minPrice: 0,
  maxPrice: 999999999,
  bedrooms: 0,
  bathrooms: 0,
  propertyType: '',
  location: '',
  sortBy: 'date',
  sortOrder: 'desc'
};

export const usePropertyFilters = (properties: Property[]) => {
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);

  const filteredProperties = useMemo(() => {
    let filtered = properties.filter(property => {
      // Filter by price type
      if (filters.priceType !== 'all' && property.priceType !== filters.priceType) {
        return false;
      }

      // Filter by price range
      if (property.price < filters.minPrice || property.price > filters.maxPrice) {
        return false;
      }

      // Filter by bedrooms
      if (filters.bedrooms > 0 && property.bedrooms < filters.bedrooms) {
        return false;
      }

      // Filter by bathrooms
      if (filters.bathrooms > 0 && property.bathrooms < filters.bathrooms) {
        return false;
      }

      // Filter by property type
      if (filters.propertyType && property.propertyType !== filters.propertyType) {
        return false;
      }

      // Filter by location
      if (filters.location) {
        const locationLower = filters.location.toLowerCase();
        const matchesAddress = property.address.toLowerCase().includes(locationLower);
        const matchesCity = property.city.toLowerCase().includes(locationLower);
        const matchesTitle = property.title.toLowerCase().includes(locationLower);
        
        if (!matchesAddress && !matchesCity && !matchesTitle) {
          return false;
        }
      }

      return true;
    });

    // Sort properties
    filtered.sort((a, b) => {
      let aValue: number;
      let bValue: number;

      switch (filters.sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'date':
          aValue = new Date(a.listingDate).getTime();
          bValue = new Date(b.listingDate).getTime();
          break;
        case 'size':
          aValue = a.sqft;
          bValue = b.sqft;
          break;
        default:
          return 0;
      }

      if (filters.sortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    return filtered;
  }, [properties, filters]);

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  const handleSearch = (query: string) => {
    updateFilters({ location: query });
  };

  return {
    filters,
    filteredProperties,
    updateFilters,
    clearFilters,
    handleSearch
  };
};