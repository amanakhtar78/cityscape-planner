import avatar1 from '@/assets/avatar-1.jpg';
import avatar2 from '@/assets/avatar-2.jpg';
import avatar3 from '@/assets/avatar-3.jpg';
import destBali from '@/assets/dest-bali.jpg';
import destTokyo from '@/assets/dest-tokyo.jpg';
import destSwiss from '@/assets/dest-swiss.jpg';
import destMaldives from '@/assets/dest-maldives.jpg';
import heroSantorini from '@/assets/hero-santorini.jpg';

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isCurrentlyTraveling: boolean;
  currentLocation?: string;
}

export interface TravelPost {
  id: string;
  user: User;
  location: string;
  country: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked: boolean;
}

export interface Story {
  id: string;
  user: User;
  location: string;
  hasUnseenStory: boolean;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  rating: number;
  category: string;
  price: string;
  duration: string;
}

export interface TravelStats {
  totalTrips: number;
  nationalTrips: number;
  internationalTrips: number;
  countriesVisited: number;
  placesExplored: number;
  explorationPercentage: number;
  regions: {
    name: string;
    percentage: number;
  }[];
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    username: 'sarahexplores',
    avatar: avatar1,
    isCurrentlyTraveling: true,
    currentLocation: 'Santorini',
  },
  {
    id: '2',
    name: 'Marco Rivera',
    username: 'marcotravel',
    avatar: avatar2,
    isCurrentlyTraveling: true,
    currentLocation: 'Bali',
  },
  {
    id: '3',
    name: 'Emma Watson',
    username: 'emmawanders',
    avatar: avatar3,
    isCurrentlyTraveling: false,
  },
];

export const mockStories: Story[] = [
  { id: '1', user: mockUsers[0], location: 'Santorini', hasUnseenStory: true },
  { id: '2', user: mockUsers[1], location: 'Bali', hasUnseenStory: true },
  { id: '3', user: mockUsers[2], location: 'Cambodia', hasUnseenStory: false },
];

export const mockPosts: TravelPost[] = [
  {
    id: '1',
    user: mockUsers[0],
    location: 'Santorini',
    country: 'Greece',
    image: heroSantorini,
    caption: 'Sunset views from Oia that left me speechless. The colors here are unreal! 🌅',
    likes: 1248,
    comments: 89,
    timestamp: '2h ago',
    isLiked: false,
  },
  {
    id: '2',
    user: mockUsers[1],
    location: 'Ubud Rice Terraces',
    country: 'Indonesia',
    image: destBali,
    caption: 'Morning mist rolling through the rice terraces. Bali never disappoints ✨',
    likes: 892,
    comments: 45,
    timestamp: '5h ago',
    isLiked: true,
  },
  {
    id: '3',
    user: mockUsers[2],
    location: 'Tokyo',
    country: 'Japan',
    image: destTokyo,
    caption: 'Cherry blossoms and neon lights. The perfect contrast of old meets new 🌸',
    likes: 2103,
    comments: 156,
    timestamp: '1d ago',
    isLiked: false,
  },
];

export const mockDestinations: Destination[] = [
  {
    id: '1',
    name: 'Bali',
    country: 'Indonesia',
    image: destBali,
    rating: 4.8,
    category: 'Tropical Paradise',
    price: '$1,200',
    duration: '7 days',
  },
  {
    id: '2',
    name: 'Tokyo',
    country: 'Japan',
    image: destTokyo,
    rating: 4.9,
    category: 'Urban Adventure',
    price: '$2,500',
    duration: '10 days',
  },
  {
    id: '3',
    name: 'Swiss Alps',
    country: 'Switzerland',
    image: destSwiss,
    rating: 4.9,
    category: 'Mountain Escape',
    price: '$3,200',
    duration: '5 days',
  },
  {
    id: '4',
    name: 'Maldives',
    country: 'Maldives',
    image: destMaldives,
    rating: 4.7,
    category: 'Beach Luxury',
    price: '$4,500',
    duration: '6 days',
  },
];

export const mockUserStats: TravelStats = {
  totalTrips: 12,
  nationalTrips: 8,
  internationalTrips: 4,
  countriesVisited: 7,
  placesExplored: 34,
  explorationPercentage: 42,
  regions: [
    { name: 'Asia', percentage: 65 },
    { name: 'Europe', percentage: 40 },
    { name: 'Americas', percentage: 25 },
    { name: 'Oceania', percentage: 15 },
  ],
};

export const currentUser: User = {
  id: 'current',
  name: 'Alex Thompson',
  username: 'alexplorer',
  avatar: avatar2,
  isCurrentlyTraveling: false,
};
