import React, { useState } from 'react';
import { Property } from '../types/Property';
import { X, Bed, Bath, Square, MapPin, Heart, Share2, Calendar, ChevronLeft, ChevronRight, Phone, Mail } from 'lucide-react';

interface PropertyModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
  isPropertySaved: boolean;
  onToggleSaved: () => void;
}

const PropertyModal: React.FC<PropertyModalProps> = ({ 
  property, 
  isOpen, 
  onClose, 
  isPropertySaved, 
  onToggleSaved 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen) return null;

  const formatPrice = (price: number, type: 'sale' | 'lease') => {
    if (type === 'sale') {
      return `$${price.toLocaleString()} CAD`;
    }
    return `$${price.toLocaleString()} CAD/mo`;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{property.title}</h2>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={onToggleSaved}
                  className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Heart className={`h-5 w-5 ${isPropertySaved ? 'fill-current text-red-500' : ''}`} />
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
            {/* Image Gallery */}
            <div className="relative h-96">
              <img
                src={property.images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  
                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {property.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                  property.priceType === 'sale' ? 'bg-green-600' : 'bg-blue-600'
                }`}>
                  {property.priceType === 'sale' ? 'For Sale' : 'For Rent'}
                </span>
                {property.featured && (
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                )}
              </div>
            </div>

            {/* Property Details */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  {/* Price and Basic Info */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-3xl font-bold text-gray-900">
                        {formatPrice(property.price, property.priceType)}
                      </h3>
                      <span className="text-lg text-gray-600 capitalize bg-gray-100 px-3 py-1 rounded-lg">
                        {property.propertyType}
                      </span>
                    </div>

                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{property.address}, {property.city}, {property.province}</span>
                    </div>

                    <div className="flex items-center space-x-6 text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Bed className="h-5 w-5" />
                        <span>{property.bedrooms} Bedrooms</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Bath className="h-5 w-5" />
                        <span>{property.bathrooms} Bathrooms</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Square className="h-5 w-5" />
                        <span>{property.sqft.toLocaleString()} sqft</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Description</h4>
                    <p className="text-gray-600 leading-relaxed">{property.description}</p>
                  </div>

                  {/* Amenities */}
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Amenities</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {property.amenities.map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 text-gray-600"
                        >
                          <div className="w-2 h-2 bg-blue-600 rounded-full" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Listing Info */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Listed {new Date(property.listingDate).toLocaleDateString('en-CA')}</span>
                    </div>
                  </div>
                </div>

                {/* Sidebar - Contact Form */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 rounded-xl p-6 sticky top-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Request More Information
                    </h4>
                    
                    <form className="space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder="Email Address"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <textarea
                          rows={4}
                          placeholder="I'm interested in this property. Please contact me with more details."
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Contact Agent
                      </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex items-center space-x-4">
                        <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>Call</span>
                        </button>
                        <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>Email</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;