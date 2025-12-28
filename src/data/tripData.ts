import destBali from '@/assets/dest-bali.jpg';
import destTokyo from '@/assets/dest-tokyo.jpg';
import destSwiss from '@/assets/dest-swiss.jpg';
import destMaldives from '@/assets/dest-maldives.jpg';

export interface PlaceDetail {
  id: string;
  name: string;
  city: string;
  country: string;
  thumbnail: string;
  description: string;
  recommendations: string[];
  avoidList: string[];
  costs: {
    minimumFood: number;
    restaurants: { name: string; dish: string; price: number }[];
    hotels: { name: string; pricePerNight: number; rating: number }[];
    activities: { name: string; price: number }[];
    dishes: { name: string; price: number }[];
  };
  location: {
    lat: number;
    lng: number;
  };
  estimatedCost: number;
}

export interface TripPackage {
  id: string;
  city: string;
  country: string;
  places: PlaceDetail[];
  totalDays: number;
  estimatedCost: number;
}

export interface TripProgress {
  id: string;
  city: string;
  country: string;
  countryCode: string;
  image: string;
  totalPlaces: number;
  visitedPlaces: number;
  explorationPercentage: number;
  verifiedPlaces: string[];
}

export interface CountryProgress {
  country: string;
  countryCode: string;
  explorationPercentage: number;
  trips: TripProgress[];
}

// Delhi trip places
export const delhiPlaces: PlaceDetail[] = [
  {
    id: 'taj_mahal',
    name: 'Taj Mahal',
    city: 'Agra',
    country: 'India',
    thumbnail: destBali,
    description: 'One of the Seven Wonders of the World, the Taj Mahal is a stunning white marble mausoleum built by Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal.',
    recommendations: [
      'Visit during sunrise for the best photos and fewer crowds',
      'Hire a local guide for historical insights',
      'Visit the nearby Agra Fort for a complete experience',
    ],
    avoidList: [
      'Avoid visiting on Fridays as it\'s closed for prayers',
      'Don\'t buy overpriced souvenirs at the entrance',
    ],
    costs: {
      minimumFood: 500,
      restaurants: [
        { name: 'Peshawri', dish: 'Dal Bukhara', price: 800 },
        { name: 'Oberoi Amarvilas', dish: 'Biryani', price: 1200 },
        { name: 'Joney\'s Place', dish: 'Thali', price: 300 },
      ],
      hotels: [
        { name: 'The Oberoi Amarvilas', pricePerNight: 25000, rating: 5 },
        { name: 'ITC Mughal', pricePerNight: 12000, rating: 5 },
        { name: 'Hotel Atulyaa Taj', pricePerNight: 3500, rating: 4 },
      ],
      activities: [
        { name: 'Sunrise Tour', price: 500 },
        { name: 'Photography Session', price: 1500 },
        { name: 'Boat Ride on Yamuna', price: 300 },
      ],
      dishes: [
        { name: 'Petha (Sweet)', price: 100 },
        { name: 'Bedai & Jalebi', price: 80 },
        { name: 'Mughlai Paratha', price: 150 },
      ],
    },
    location: { lat: 27.1751, lng: 78.0421 },
    estimatedCost: 2500,
  },
  {
    id: 'red_fort',
    name: 'Red Fort',
    city: 'Delhi',
    country: 'India',
    thumbnail: destTokyo,
    description: 'A UNESCO World Heritage Site, the Red Fort is a historic fortification that served as the main residence of the Mughal Emperors for nearly 200 years.',
    recommendations: [
      'Attend the Sound and Light show in evenings',
      'Explore the museum inside for Mughal artifacts',
      'Best visited early morning to avoid heat',
    ],
    avoidList: [
      'Avoid Mondays as it\'s closed',
      'Skip the expensive guides at the gate',
    ],
    costs: {
      minimumFood: 400,
      restaurants: [
        { name: 'Karim\'s', dish: 'Mutton Korma', price: 450 },
        { name: 'Al Jawahar', dish: 'Seekh Kebab', price: 350 },
        { name: 'Paranthewali Gali', dish: 'Paranthas', price: 150 },
      ],
      hotels: [
        { name: 'The Leela Palace', pricePerNight: 18000, rating: 5 },
        { name: 'Haveli Dharampura', pricePerNight: 8000, rating: 4 },
        { name: 'Bloomrooms', pricePerNight: 2500, rating: 3 },
      ],
      activities: [
        { name: 'Sound & Light Show', price: 80 },
        { name: 'Museum Entry', price: 35 },
        { name: 'Guided Tour', price: 500 },
      ],
      dishes: [
        { name: 'Butter Chicken', price: 350 },
        { name: 'Chole Bhature', price: 120 },
        { name: 'Jalebi', price: 50 },
      ],
    },
    location: { lat: 28.6562, lng: 77.2410 },
    estimatedCost: 800,
  },
  {
    id: 'india_gate',
    name: 'India Gate',
    city: 'Delhi',
    country: 'India',
    thumbnail: destSwiss,
    description: 'A war memorial dedicated to soldiers of the British Indian Army who died in World War I. The iconic 42-meter high arch is illuminated at night.',
    recommendations: [
      'Visit in the evening for beautiful lighting',
      'Enjoy ice cream from nearby vendors',
      'Perfect for evening walks and picnics',
    ],
    avoidList: [
      'Avoid peak summer afternoons',
      'Don\'t carry too many valuables',
    ],
    costs: {
      minimumFood: 200,
      restaurants: [
        { name: 'India Gate Dhaba', dish: 'Kulfi', price: 50 },
        { name: 'Andhra Bhawan', dish: 'Thali', price: 300 },
        { name: 'Khan Chacha', dish: 'Rolls', price: 180 },
      ],
      hotels: [
        { name: 'The Imperial', pricePerNight: 22000, rating: 5 },
        { name: 'The Claridges', pricePerNight: 12000, rating: 5 },
        { name: 'Hotel Palace Heights', pricePerNight: 4500, rating: 4 },
      ],
      activities: [
        { name: 'Boat Riding', price: 100 },
        { name: 'Horse Riding', price: 200 },
        { name: 'Evening Walk', price: 0 },
      ],
      dishes: [
        { name: 'Golgappa', price: 40 },
        { name: 'Bhel Puri', price: 50 },
        { name: 'Ice Cream', price: 60 },
      ],
    },
    location: { lat: 28.6129, lng: 77.2295 },
    estimatedCost: 0,
  },
  {
    id: 'qutub_minar',
    name: 'Qutub Minar',
    city: 'Delhi',
    country: 'India',
    thumbnail: destMaldives,
    description: 'A UNESCO World Heritage Site, Qutub Minar is a 73-meter tall minaret built in 1193 and is the tallest brick minaret in the world.',
    recommendations: [
      'Explore the entire Qutub Complex',
      'Don\'t miss the Iron Pillar',
      'Great for architecture photography',
    ],
    avoidList: [
      'Avoid climbing inside (not allowed anymore)',
      'Skip weekends if possible due to crowds',
    ],
    costs: {
      minimumFood: 300,
      restaurants: [
        { name: 'Olive Bar & Kitchen', dish: 'Mediterranean', price: 1500 },
        { name: 'Qutub Shikara', dish: 'North Indian', price: 800 },
        { name: 'Local Dhabas', dish: 'Thali', price: 200 },
      ],
      hotels: [
        { name: 'The Lodhi', pricePerNight: 20000, rating: 5 },
        { name: 'The Manor', pricePerNight: 10000, rating: 4 },
        { name: 'FabHotel', pricePerNight: 2000, rating: 3 },
      ],
      activities: [
        { name: 'Archaeological Walk', price: 500 },
        { name: 'Photography Tour', price: 800 },
        { name: 'Heritage Walk', price: 600 },
      ],
      dishes: [
        { name: 'Biryani', price: 250 },
        { name: 'Kebabs', price: 300 },
        { name: 'Lassi', price: 60 },
      ],
    },
    location: { lat: 28.5245, lng: 77.1855 },
    estimatedCost: 600,
  },
  {
    id: 'lotus_temple',
    name: 'Lotus Temple',
    city: 'Delhi',
    country: 'India',
    thumbnail: destBali,
    description: 'A Bahá\'í House of Worship notable for its flowerlike shape, it has won numerous architectural awards and attracts millions of visitors each year.',
    recommendations: [
      'Visit during sunset for the best experience',
      'Observe the silence and peace inside',
      'Beautiful gardens surrounding the temple',
    ],
    avoidList: [
      'Closed on Mondays',
      'No photography inside the temple',
    ],
    costs: {
      minimumFood: 250,
      restaurants: [
        { name: 'Sagar Ratna', dish: 'Dosa', price: 200 },
        { name: 'Haldiram\'s', dish: 'Snacks', price: 300 },
        { name: 'Bikanervala', dish: 'Sweets', price: 250 },
      ],
      hotels: [
        { name: 'Eros Hotel', pricePerNight: 8000, rating: 4 },
        { name: 'The Suryaa', pricePerNight: 6000, rating: 4 },
        { name: 'OYO Townhouse', pricePerNight: 1500, rating: 3 },
      ],
      activities: [
        { name: 'Meditation Session', price: 0 },
        { name: 'Garden Walk', price: 0 },
        { name: 'Photography Outside', price: 0 },
      ],
      dishes: [
        { name: 'Samosa', price: 30 },
        { name: 'Chai', price: 20 },
        { name: 'Chaat', price: 80 },
      ],
    },
    location: { lat: 28.5535, lng: 77.2588 },
    estimatedCost: 0,
  },
  {
    id: 'humayuns_tomb',
    name: 'Humayun\'s Tomb',
    city: 'Delhi',
    country: 'India',
    thumbnail: destTokyo,
    description: 'The tomb of Mughal Emperor Humayun, this UNESCO World Heritage Site is an architectural precursor to the Taj Mahal with beautiful Persian gardens.',
    recommendations: [
      'Hire a guide for detailed history',
      'Explore all the smaller tombs in the complex',
      'Beautiful at golden hour',
    ],
    avoidList: [
      'Avoid the harsh afternoon sun',
      'Don\'t rush through - it\'s a large complex',
    ],
    costs: {
      minimumFood: 350,
      restaurants: [
        { name: 'Khan Market', dish: 'Various', price: 600 },
        { name: 'Lodi Garden Restaurant', dish: 'Continental', price: 1000 },
        { name: 'Nizamuddin Dargah area', dish: 'Mughlai', price: 200 },
      ],
      hotels: [
        { name: 'The Oberoi', pricePerNight: 22000, rating: 5 },
        { name: 'Vivanta by Taj', pricePerNight: 10000, rating: 5 },
        { name: 'Zostel', pricePerNight: 800, rating: 3 },
      ],
      activities: [
        { name: 'Heritage Walk', price: 600 },
        { name: 'Nizamuddin Dargah Visit', price: 0 },
        { name: 'Sufi Night', price: 500 },
      ],
      dishes: [
        { name: 'Nihari', price: 200 },
        { name: 'Haleem', price: 180 },
        { name: 'Sheermal', price: 50 },
      ],
    },
    location: { lat: 28.5933, lng: 77.2507 },
    estimatedCost: 700,
  },
];

export const delhiPackage: TripPackage = {
  id: 'delhi_package_1',
  city: 'Delhi',
  country: 'India',
  places: delhiPlaces,
  totalDays: 5,
  estimatedCost: 15000,
};

// Mock trip progress data
export const mockTripProgress: TripProgress[] = [
  {
    id: 'trip_delhi',
    city: 'Delhi',
    country: 'India',
    countryCode: '🇮🇳',
    image: destBali,
    totalPlaces: 12,
    visitedPlaces: 8,
    explorationPercentage: 65,
    verifiedPlaces: ['taj_mahal', 'red_fort', 'india_gate', 'lotus_temple'],
  },
  {
    id: 'trip_mumbai',
    city: 'Mumbai',
    country: 'India',
    countryCode: '🇮🇳',
    image: destTokyo,
    totalPlaces: 10,
    visitedPlaces: 9,
    explorationPercentage: 90,
    verifiedPlaces: ['gateway', 'marine_drive', 'elephanta'],
  },
  {
    id: 'trip_colombo',
    city: 'Colombo',
    country: 'Sri Lanka',
    countryCode: '🇱🇰',
    image: destSwiss,
    totalPlaces: 8,
    visitedPlaces: 3,
    explorationPercentage: 38,
    verifiedPlaces: ['temple', 'beach'],
  },
  {
    id: 'trip_bangkok',
    city: 'Bangkok',
    country: 'Thailand',
    countryCode: '🇹🇭',
    image: destMaldives,
    totalPlaces: 15,
    visitedPlaces: 2,
    explorationPercentage: 13,
    verifiedPlaces: ['grand_palace'],
  },
];

export const mockCountryProgress: CountryProgress[] = [
  {
    country: 'India',
    countryCode: '🇮🇳',
    explorationPercentage: 45,
    trips: mockTripProgress.filter(t => t.country === 'India'),
  },
  {
    country: 'Sri Lanka',
    countryCode: '🇱🇰',
    explorationPercentage: 12,
    trips: mockTripProgress.filter(t => t.country === 'Sri Lanka'),
  },
  {
    country: 'Thailand',
    countryCode: '🇹🇭',
    explorationPercentage: 8,
    trips: mockTripProgress.filter(t => t.country === 'Thailand'),
  },
];

// Available cities for search
export const availableCities = [
  { id: 'delhi', name: 'Delhi', country: 'India', packages: [delhiPackage] },
  { id: 'mumbai', name: 'Mumbai', country: 'India', packages: [] },
  { id: 'jaipur', name: 'Jaipur', country: 'India', packages: [] },
  { id: 'goa', name: 'Goa', country: 'India', packages: [] },
  { id: 'bangalore', name: 'Bangalore', country: 'India', packages: [] },
];