import { Property } from '../types/Property';

export const properties: Property[] = [
  {
    id: '1',
    title: 'Executive Townhome in Mississauga',
    price: 1285000,
    priceType: 'sale',
    address: '2847 Lakeshore Road West',
    city: 'Mississauga',
    province: 'ON',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2150,
    propertyType: 'townhouse',
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Stunning executive townhome in desirable Lakeview neighbourhood. Features premium finishes, open-concept living, and walking distance to GO Transit and Lake Ontario.',
    amenities: ['Hardwood Throughout', 'Granite Countertops', 'Ensuite Laundry', 'Private Garage', 'Finished Basement', 'Close to GO Station'],
    listingDate: '2024-12-15',
    featured: true,
    coordinates: { lat: 43.5448, lng: -79.5656 }
  },
  {
    id: '2',
    title: 'King West Luxury Condo',
    price: 4200,
    priceType: 'lease',
    address: '318 King Street West',
    city: 'Toronto',
    province: 'ON',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1050,
    propertyType: 'condo',
    images: [
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Premium King West condo in the heart of Toronto\'s Entertainment District. Floor-to-ceiling windows with CN Tower views. Steps to TTC, restaurants, and nightlife.',
    amenities: ['CN Tower Views', 'Fitness Centre', '24hr Concierge', 'Rooftop Terrace', 'In-suite Laundry', 'TTC at Door'],
    listingDate: '2024-12-18',
    featured: true,
    coordinates: { lat: 43.6465, lng: -79.3871 }
  },
  {
    id: '3',
    title: 'Heritage Victorian in Cabbagetown',
    price: 1850000,
    priceType: 'sale',
    address: '142 Wellesley Street East',
    city: 'Toronto',
    province: 'ON',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2650,
    propertyType: 'house',
    images: [
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Meticulously restored heritage Victorian in historic Cabbagetown. Original character features blend seamlessly with modern updates. Walk to Riverdale Park and downtown core.',
    amenities: ['Original Crown Moulding', 'Working Fireplace', 'Chef\'s Kitchen', 'Private Garden', '10ft Ceilings', 'Heritage Designation'],
    listingDate: '2024-12-10',
    featured: false,
    coordinates: { lat: 43.6677, lng: -79.3676 }
  },
  {
    id: '4',
    title: 'Liberty Village Studio',
    price: 2650,
    priceType: 'lease',
    address: '75 East Liberty Street',
    city: 'Toronto',
    province: 'ON',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 550,
    propertyType: 'apartment',
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Bright studio in trendy Liberty Village. Modern finishes throughout with excellent building amenities. Walking distance to King Street West and Exhibition GO Station.',
    amenities: ['Quartz Counters', 'Fitness Centre', 'Concierge', 'Party Room', 'Bike Storage', 'GO Transit Nearby'],
    listingDate: '2024-12-20',
    featured: false,
    coordinates: { lat: 43.6393, lng: -79.4199 }
  },
  {
    id: '5',
    title: 'Detached Family Home in Brampton',
    price: 1150000,
    priceType: 'sale',
    address: '45 Countryside Drive',
    city: 'Brampton',
    province: 'ON',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2850,
    propertyType: 'house',
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Spacious detached home in family-friendly Brampton neighbourhood. Large lot with mature trees, updated kitchen, and close to top-rated schools and Bramalea GO Station.',
    amenities: ['Double Car Garage', 'Finished Basement', 'Eat-in Kitchen', 'Hardwood Main Floor', 'Fenced Yard', 'Near Schools & GO'],
    listingDate: '2024-12-12',
    featured: false,
    coordinates: { lat: 43.7315, lng: -79.7624 }
  },
  {
    id: '6',
    title: 'Yorkville Penthouse Suite',
    price: 12500,
    priceType: 'lease',
    address: '155 Yorkville Avenue',
    city: 'Toronto',
    province: 'ON',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2400,
    propertyType: 'condo',
    images: [
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Ultra-luxury penthouse in prestigious Yorkville. Panoramic city and lake views, private terrace, and world-class amenities. Steps to Bloor-Yonge subway and luxury shopping.',
    amenities: ['360° City Views', 'Private Terrace', 'Sub-Zero Appliances', 'Valet Parking', 'Wine Storage', 'Subway Access'],
    listingDate: '2024-12-08',
    featured: true,
    coordinates: { lat: 43.6708, lng: -79.3899 }
  },
  {
    id: '7',
    title: 'Oakville Executive Home',
    price: 2250000,
    priceType: 'sale',
    address: '1247 Lakeshore Road East',
    city: 'Oakville',
    province: 'ON',
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3200,
    propertyType: 'house',
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Stunning executive home in prestigious Oakville neighbourhood. Custom-built with premium finishes throughout. Walking distance to Lake Ontario and Oakville GO Station.',
    amenities: ['Custom Kitchen', 'Master Ensuite', 'Home Office', 'Triple Car Garage', 'Landscaped Grounds', 'Lake Access'],
    listingDate: '2024-12-05',
    featured: false,
    coordinates: { lat: 43.4675, lng: -79.6877 }
  },
  {
    id: '8',
    title: 'North York Condo Apartment',
    price: 2850,
    priceType: 'lease',
    address: '5793 Yonge Street',
    city: 'North York',
    province: 'ON',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 900,
    propertyType: 'condo',
    images: [
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Modern 2-bedroom condo in North York Centre. Excellent building amenities and direct subway access. Perfect for professionals commuting downtown.',
    amenities: ['Subway Connected', 'Indoor Pool', 'Fitness Centre', 'Guest Suite', 'Visitor Parking', 'Shopping Mall Access'],
    listingDate: '2024-12-22',
    featured: false,
    coordinates: { lat: 43.7615, lng: -79.4111 }
  }
];