import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import MapView from '../components/MapView';
import PropertyFilters from '../components/PropertyFilters';
import PropertyCard from '../components/PropertyCard';
import PropertyModal from '../components/PropertyModal';
import SavedProperties from '../components/SavedProperties';
import PropertyComparison from '../components/PropertyComparison';
import MortgageCalculator from '../components/MortgageCalculator';
import Footer from '../components/Footer';
import { properties } from '../data/properties';
import { usePropertyFilters } from '../hooks/usePropertyFilters';
import { useSavedProperties } from '../hooks/useSavedProperties';
import { Property } from '../types/Property';
import { useAuth } from '../contexts/authContext';


const Home = () => {
  // get login user in sessionStorage
  const { user } = useAuth();
  
  //fetch data from json-server users
  const [property,setProperties] = useState(properties);
  useEffect(()=>{
    //check fetch limit
    let limit;
    if(!user){
      limit = 10;
    }else{
      limit = 100;
    }
    //fetch
    fetch(`http://localhost:8000/properties/?_limit=${limit}`)
    .then(res =>{
      return res.json();
    })
    .then((data)=>{
      setProperties(data);
      console.log(`fetched ${limit} property data from server`);
      console.log(data);
    })
  },[user]);

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [hint,setHint] = useState(false);
  
  const {
    filters,
    filteredProperties,
    updateFilters,
    clearFilters,
  } = usePropertyFilters(property);

  const {
    savedProperties,
    isPropertySaved,
    toggleSavedProperty
  } = useSavedProperties();

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <Hero onFiltersChange={updateFilters} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PropertyFilters
          filters={filters}
          onFiltersChange={updateFilters}
          onClearFilters={clearFilters}
          resultsCount={filteredProperties.length}
        />

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'map' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Map View
            </button>
          </div>
        </div>

        {/* Map View */}
        {viewMode === 'map' && (
          <section className="mb-12">
            <MapView
              properties={filteredProperties}
              onPropertySelect={handlePropertyClick}
              selectedProperty={selectedProperty}
            />
          </section>
        )}

        {/* Featured Properties Section */}
        {viewMode === 'grid' && filteredProperties.some(p => p.featured) && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Top Ranking Properties🔥</h2>
              <div className="h-1 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full w-24"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties
                .filter(property => property.featured)
                .slice(0, 6)
                .map(property => (
                  <PropertyCard
                    key={property.id}
                    visible={true}
                    property={property}
                    onClick={() => handlePropertyClick(property)}
                  />
                ))}
            </div>
          </section>
        )}

        {/* All Properties */}
        {viewMode === 'grid' && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {filters.priceType === 'all' ? 'All Properties' : 
                 filters.priceType === 'sale' ? 'Properties for Sale' : 'Properties for Lease'}
              </h2>
              <span className="text-gray-600">
                {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
              </span>
            </div>

            {filteredProperties.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search criteria to find more properties.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            ) 
            :(
              user?(
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map(property => (
                  <PropertyCard
                    visible={true}
                    key={property.id}
                    property={property}
                    onClick={() => handlePropertyClick(property)}
                  />
                ))}
                </div>
              )
              :(//not logged in - only view 3 of the properties
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.slice(0,3).map(property => (
                  <PropertyCard
                    visible={false}
                    key={property.id}
                    property={property}
                    onClick={() => setHint(true)}
                  />
                ))}
                </div>
              )
            )}
            {/*login to view more hint*/}
            { !user && 
            <div className="text-center mt-8 mx-auto">
              <p className="text-gray-700 text-lg font-medium">
                🔒 Log in to view more properties and full details.
              </p>
              <button
                onClick={() => window.location.href = '/sign-in'}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Log In
              </button>
            </div>}
          </section>
        )}

        {/* If not signed in: pop up window leads to sign in */}
        {!user && hint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-3">Unlock Full Access</h2>
            <p className="text-gray-600 mb-5">
              Sign in to view all properties, see detailed listings, and access exclusive features.
            </p>
            <button
              onClick={() => window.location.href = '/sign-in'}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Sign In Now
            </button>
          </div>
        </div>
      )}

        {/* Mortgage Calculator */}
        { user && <section className="mt-16">
          <MortgageCalculator />
        </section>}

        {/* Call to Action */}
        <section className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Dream Home in the GTA?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Let our licensed RECO agents help you navigate the Greater Toronto Area market and find the perfect home that matches your needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium">
              Talk to a Realtor
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium">
              Get GTA Market Report
            </button>
          </div>
        </section>
      </main>

      <Footer />

      {/* Property Modal */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          isPropertySaved={isPropertySaved(selectedProperty.id)}
          onToggleSaved={() => toggleSavedProperty(selectedProperty)}
        />
      )}

      {/* Floating Components */}
      { user &&<SavedProperties onPropertyClick={handlePropertyClick} />}
      { user &&<PropertyComparison availableProperties={filteredProperties} /> }
    </div>
  )
}

export default Home