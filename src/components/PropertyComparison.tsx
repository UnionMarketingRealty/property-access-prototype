import React, { useState } from 'react';
import { Property } from '../types/Property';
import { Plus, X, Bed, Bath, Square, MapPin, DollarSign } from 'lucide-react';

interface PropertyComparisonProps {
  availableProperties: Property[];
}

const PropertyComparison: React.FC<PropertyComparisonProps> = ({ availableProperties }) => {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addProperty = (property: Property) => {
    if (selectedProperties.length < 3 && !selectedProperties.find(p => p.id === property.id)) {
      setSelectedProperties([...selectedProperties, property]);
    }
  };

  const removeProperty = (propertyId: string) => {
    setSelectedProperties(selectedProperties.filter(p => p.id !== propertyId));
  };

  const formatPrice = (price: number, type: 'sale' | 'lease') => {
    if (type === 'sale') {
      return `$${price.toLocaleString()} CAD`;
    }
    return `$${price.toLocaleString()} CAD/mo`;
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg hover:bg-green-700 transition-colors z-40 flex items-center space-x-2"
      >
        <Plus className="h-5 w-5" />
        <span>Compare Properties</span>
        {selectedProperties.length > 0 && (
          <span className="bg-white text-green-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {selectedProperties.length}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
      
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-xl max-h-[80vh] overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Compare Properties ({selectedProperties.length}/3)
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {selectedProperties.length === 0 ? (
              <div className="text-center py-12">
                <Plus className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No properties selected
                </h3>
                <p className="text-gray-600 mb-6">
                  Select up to 3 properties to compare side by side
                </p>
                
                {/* Property Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  {availableProperties.slice(0, 6).map(property => (
                    <button
                      key={property.id}
                      onClick={() => addProperty(property)}
                      className="text-left bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition-colors"
                    >
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h4 className="font-medium text-gray-900 mb-1 truncate">
                        {property.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {property.city}, ON
                      </p>
                      <p className="text-lg font-semibold text-blue-600">
                        {formatPrice(property.price, property.priceType)}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Add More Properties */}
                {selectedProperties.length < 3 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Add another property to compare:
                    </h4>
                    <div className="flex space-x-4 overflow-x-auto pb-2">
                      {availableProperties
                        .filter(p => !selectedProperties.find(sp => sp.id === p.id))
                        .slice(0, 5)
                        .map(property => (
                          <button
                            key={property.id}
                            onClick={() => addProperty(property)}
                            className="flex-shrink-0 bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-colors w-48"
                          >
                            <img
                              src={property.images[0]}
                              alt={property.title}
                              className="w-full h-24 object-cover rounded-lg mb-2"
                            />
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {property.title}
                            </p>
                            <p className="text-xs text-gray-600">{property.city}</p>
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                {/* Comparison Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <td className="p-4 font-medium text-gray-700 w-32">Property</td>
                        {selectedProperties.map(property => (
                          <td key={property.id} className="p-4 min-w-64">
                            <div className="relative">
                              <img
                                src={property.images[0]}
                                alt={property.title}
                                className="w-full h-32 object-cover rounded-lg mb-3"
                              />
                              <button
                                onClick={() => removeProperty(property.id)}
                                className="absolute top-2 right-2 bg-white/90 hover:bg-white p-1 rounded-full shadow-md transition-colors"
                              >
                                <X className="h-4 w-4 text-gray-600" />
                              </button>
                              <h4 className="font-medium text-gray-900 mb-1">
                                {property.title}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {property.city}, ON
                              </p>
                            </div>
                          </td>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="p-4 font-medium text-gray-700">Price</td>
                        {selectedProperties.map(property => (
                          <td key={property.id} className="p-4">
                            <span className="text-lg font-semibold text-blue-600">
                              {formatPrice(property.price, property.priceType)}
                            </span>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-4 font-medium text-gray-700">Bedrooms</td>
                        {selectedProperties.map(property => (
                          <td key={property.id} className="p-4">
                            <div className="flex items-center space-x-1">
                              <Bed className="h-4 w-4 text-gray-400" />
                              <span>{property.bedrooms}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-4 font-medium text-gray-700">Bathrooms</td>
                        {selectedProperties.map(property => (
                          <td key={property.id} className="p-4">
                            <div className="flex items-center space-x-1">
                              <Bath className="h-4 w-4 text-gray-400" />
                              <span>{property.bathrooms}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-4 font-medium text-gray-700">Square Feet</td>
                        {selectedProperties.map(property => (
                          <td key={property.id} className="p-4">
                            <div className="flex items-center space-x-1">
                              <Square className="h-4 w-4 text-gray-400" />
                              <span>{property.sqft.toLocaleString()}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-4 font-medium text-gray-700">Property Type</td>
                        {selectedProperties.map(property => (
                          <td key={property.id} className="p-4 capitalize">
                            {property.propertyType}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-4 font-medium text-gray-700">Price per sqft</td>
                        {selectedProperties.map(property => (
                          <td key={property.id} className="p-4">
                            ${Math.round(property.price / property.sqft).toLocaleString()} CAD
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyComparison;