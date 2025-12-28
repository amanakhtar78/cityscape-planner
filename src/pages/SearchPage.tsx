import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, MapPin, TrendingUp, ShoppingCart } from 'lucide-react';
import SearchOptionCard from '@/components/SearchOptionCard';
import DestinationCard from '@/components/DestinationCard';
import BottomNav from '@/components/BottomNav';
import DestinationSearch from '@/components/trip/DestinationSearch';
import PlanningQuestions from '@/components/trip/PlanningQuestions';
import SnakeItinerary from '@/components/trip/SnakeItinerary';
import CartView from '@/components/trip/CartView';
import MapView from '@/components/trip/MapView';
import { mockDestinations } from '@/data/mockData';
import { useTripPlanning } from '@/context/TripPlanningContext';
import { useCart } from '@/context/CartContext';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDestinationSearch, setShowDestinationSearch] = useState(false);
  const { step, goToStep, setPlanType, resetPlanning } = useTripPlanning();
  const { cartItems } = useCart();

  const trendingSearches = ['Bali', 'Santorini', 'Tokyo', 'Maldives', 'Swiss Alps'];

  const handleCardClick = (type: 'seasonal' | 'package' | 'custom') => {
    setPlanType(type);
    setShowDestinationSearch(true);
  };

  const handleBackToSearch = () => {
    setShowDestinationSearch(false);
    resetPlanning();
  };

  // Render based on current step
  if (showDestinationSearch && step === 'search') {
    return (
      <div className="min-h-screen bg-background pb-24">
        <main className="px-4 pt-6">
          <DestinationSearch onBack={handleBackToSearch} />
        </main>
        <BottomNav />
      </div>
    );
  }

  if (step === 'questions') {
    return (
      <div className="min-h-screen bg-background pb-24">
        <main className="px-4 pt-6">
          <PlanningQuestions onBack={() => goToStep('search')} />
        </main>
        <BottomNav />
      </div>
    );
  }

  if (step === 'itinerary') {
    return (
      <div className="min-h-screen bg-background pb-24">
        <main className="px-4 pt-6">
          <SnakeItinerary 
            onBack={() => goToStep('questions')} 
            onOpenCart={() => goToStep('cart')}
          />
        </main>
        <BottomNav />
      </div>
    );
  }

  if (step === 'cart') {
    return (
      <div className="min-h-screen bg-background pb-24">
        <main className="px-4 pt-6">
          <CartView 
            onBack={() => goToStep('itinerary')} 
            onOpenMap={() => goToStep('map')}
          />
        </main>
        <BottomNav />
      </div>
    );
  }

  if (step === 'map') {
    return (
      <div className="min-h-screen bg-background pb-24">
        <main className="px-4 pt-6">
          <MapView onBack={() => goToStep('cart')} />
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-foreground">Discover</h1>
          {cartItems.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => goToStep('cart')}
              className="relative h-10 w-10 rounded-full bg-primary flex items-center justify-center"
            >
              <ShoppingCart className="h-5 w-5 text-primary-foreground" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs font-bold flex items-center justify-center">
                {cartItems.length}
              </span>
            </motion.button>
          )}
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Where do you want to go?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 pl-12 pr-4 rounded-2xl bg-muted border-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Trending Searches */}
        <div className="flex gap-2 mt-4 overflow-x-auto hide-scrollbar -mx-4 px-4">
          {trendingSearches.map((search) => (
            <motion.button
              key={search}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchQuery(search)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-card border border-border whitespace-nowrap"
            >
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
              <span className="text-sm text-foreground">{search}</span>
            </motion.button>
          ))}
        </div>
      </header>

      <main className="px-4 space-y-8">
        {/* Search Options */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Start Planning</h2>
          <div className="space-y-3">
            <div onClick={() => handleCardClick('seasonal')}>
              <SearchOptionCard type="seasonal" />
            </div>
            <div onClick={() => handleCardClick('package')}>
              <SearchOptionCard type="package" />
            </div>
            <div onClick={() => handleCardClick('custom')}>
              <SearchOptionCard type="custom" />
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Popular Destinations</h2>
            <button className="text-sm text-primary font-medium">See All</button>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-2">
            {mockDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </section>

        {/* Nearby */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Near You</h2>
            </div>
          </div>
          <div className="space-y-3">
            {mockDestinations.slice(0, 2).map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                variant="horizontal"
              />
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default SearchPage;