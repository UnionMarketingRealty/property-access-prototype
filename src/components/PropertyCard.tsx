import React from 'react';
import { Bed, Bath, Square, MapPin, Heart, Camera } from 'lucide-react';
import { Property } from '../types/Property';
import { useSavedProperties } from '../hooks/useSavedProperties';

interface PropertyCardProps {
  visible:boolean;
  property: Property;
  onClick: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ visible,property, onClick }) => {
  const { isPropertySaved, toggleSavedProperty } = useSavedProperties();

  const formatPrice = (price: number, type: 'sale' | 'lease') => {
    if (type === 'sale') {
      return `$${price.toLocaleString()} CAD`;
    }
    return `$${price.toLocaleString()} CAD/mo`;
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSavedProperty(property);
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500
            ${visible ? '' : 'blur'}`}
        />
        
        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
            property.priceType === 'sale' ? 'bg-green-600' : 'bg-blue-600'
          }`}>
            {property.priceType === 'sale' ? 'For Sale' : 'For Rent'}
          </span>
        </div>

        {/* Featured Badge */}
        {property.featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          </div>
        )}

        {/* Image Count */}
        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center space-x-1">
          <Camera className="h-3 w-3" />
          <span>{property.images.length}</span>
        </div>

        {/* Favorite Button */}
        <button 
          onClick={handleSaveClick}
          className="absolute bottom-4 left-4 bg-white/90 hover:bg-white p-2 rounded-full transition-colors group/heart"
        >
          <Heart className={`h-4 w-4 transition-colors ${
            isPropertySaved(property.id) 
              ? 'text-red-500 fill-current' 
              : 'text-gray-600 group-hover/heart:text-red-500'
          }`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-2xl font-bold text-gray-900">
            {formatPrice(property.price, property.priceType)}
          </h3>
          <span className="text-sm text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded">
            {property.propertyType}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {property.title}
        </h4>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.city}, ON</span>
        </div>

        {/* Property Details */}
        <div className="flex items-center justify-between text-gray-600 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Bed className="h-4 w-4" />
              <span className="text-sm">{property.bedrooms}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bath className="h-4 w-4" />
              <span className="text-sm">{property.bathrooms}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Square className="h-4 w-4" />
              <span className="text-sm">{property.sqft.toLocaleString()} sqft</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {property.description}
        </p>

        {/* Amenities Preview */}
        <div className="flex flex-wrap gap-1 mb-4">
          {property.amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-md"
            >
              {amenity}
            </span>
          ))}
          {property.amenities.length > 3 && (
            <span className="text-xs text-gray-500 px-2 py-1">
              +{property.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            Listed {new Date(property.listingDate).toLocaleDateString()}
          </span>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;