import React, { useState, useEffect } from 'react';
import { Property } from '../types/Property';
import { Heart, X } from 'lucide-react';
import PropertyCard from './PropertyCard';

interface SavedPropertiesProps {
  onPropertyClick: (property: Property) => void;
}

const SavedProperties: React.FC<SavedPropertiesProps> = ({ onPropertyClick }) => {
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load saved properties from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedProperties');
    if (saved) {
      setSavedProperties(JSON.parse(saved));
    }
  }, []);

  const removeSavedProperty = (propertyId: string) => {
    const updated = savedProperties.filter(p => p.id !== propertyId);
    setSavedProperties(updated);
    localStorage.setItem('savedProperties', JSON.stringify(updated));
  };

  const clearAllSaved = () => {
    setSavedProperties([]);
    localStorage.removeItem('savedProperties');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition-colors z-40"
      >
        <Heart className="h-6 w-6 fill-current" />
        {savedProperties.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-white text-red-500 text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {savedProperties.length}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-red-500 fill-current" />
              <h2 className="text-xl font-semibold text-gray-900">
                Saved Properties ({savedProperties.length})
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              {savedProperties.length > 0 && (
                <button
                  onClick={clearAllSaved}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {savedProperties.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No saved properties yet
                </h3>
                <p className="text-gray-600">
                  Start browsing and save properties you're interested in!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {savedProperties.map(property => (
                  <div key={property.id} className="relative">
                    <div className="transform scale-95">
                      <PropertyCard
                        property={property}
                        visible={true}
                        onClick={() => {
                          onPropertyClick(property);
                          setIsOpen(false);
                        }}
                      />
                    </div>
                    <button
                      onClick={() => removeSavedProperty(property.id)}
                      className="absolute top-2 right-2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                    >
                      <X className="h-4 w-4 text-gray-600 hover:text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedProperties;