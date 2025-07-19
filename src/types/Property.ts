export interface Property {
  id: string;
  title: string;
  price: number;
  priceType: 'sale' | 'lease';
  address: string;
  city: string;
  province: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  propertyType: 'house' | 'condo' | 'apartment' | 'townhouse';
  images: string[];
  description: string;
  amenities: string[];
  listingDate: string;
  featured: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface SearchFilters {
  priceType: 'sale' | 'lease' | 'all';
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  location: string;
  sortBy: 'price' | 'date' | 'size';
  sortOrder: 'asc' | 'desc';
}