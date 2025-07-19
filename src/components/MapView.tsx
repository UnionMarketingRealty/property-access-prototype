import React, { useState } from 'react';
import { Property } from '../types/Property';
import { MapPin, X, Maximize2 } from 'lucide-react';

interface MapViewProps {
  properties: Property[];
  onPropertySelect: (property: Property) => void;
  selectedProperty?: Property | null;
}

const MapView: React.FC<MapViewProps> = ({ properties, onPropertySelect, selectedProperty }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Mock map implementation - in production, you'd use Google Maps or Mapbox
  const formatPrice = (price: number, type: 'sale' | 'lease') => {
    if (type === 'sale') {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className={`relative bg-gray-100 rounded-lg overflow-hidden ${
      isFullscreen ? 'fixed inset-4 z-50' : 'h-96'
    }`}>
      {/* Map Header */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
        <div className="bg-white rounded-lg px-3 py-2 shadow-md">
          <span className="text-sm font-medium text-gray-700">
            {properties.length} properties in GTA
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
          >
            {isFullscreen ? <X className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mock Map Background */}
      <div 
        className="w-full h-full bg-cover bg-center relative"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=1200)',
          filter: 'sepia(20%) saturate(80%)'
        }}
      >
        {/* Property Markers */}
        {properties.map((property, index) => (
          <button
            key={property.id}
            onClick={() => onPropertySelect(property)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
              selectedProperty?.id === property.id 
                ? 'scale-110 z-20' 
                : 'hover:scale-105 z-10'
            }`}
            style={{
              left: `${20 + (index % 8) * 10}%`,
              top: `${30 + Math.floor(index / 8) * 15}%`
            }}
          >
            <div className={`bg-white rounded-lg px-3 py-2 shadow-lg border-2 ${
              selectedProperty?.id === property.id 
                ? 'border-blue-500' 
                : 'border-white hover:border-blue-300'
            }`}>
              <div className="text-xs font-semibold text-gray-900">
                {formatPrice(property.price, property.priceType)}
              </div>
              <div className="text-xs text-gray-600">
                {property.bedrooms}bd • {property.bathrooms}ba
              </div>
            </div>
            <div className={`w-3 h-3 mx-auto mt-1 transform rotate-45 ${
              selectedProperty?.id === property.id ? 'bg-blue-500' : 'bg-white'
            } border border-gray-300`} />
          </button>
        ))}

        {/* Selected Property Popup */}
        {selectedProperty && (
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-xl p-4 z-30">
            <div className="flex items-start space-x-4">
              <img
                src={selectedProperty.images[0]}
                alt={selectedProperty.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 truncate">
                  {selectedProperty.title}
                </h4>
                <p className="text-sm text-gray-600 mb-1">
                  {selectedProperty.address}, {selectedProperty.city}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{selectedProperty.bedrooms} bed</span>
                  <span>{selectedProperty.bathrooms} bath</span>
                  <span>{selectedProperty.sqft.toLocaleString()} sqft</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">
                  {formatPrice(selectedProperty.price, selectedProperty.priceType)} CAD
                  {selectedProperty.priceType === 'lease' && '/mo'}
                </div>
                <button
                  onClick={() => onPropertySelect(selectedProperty)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;