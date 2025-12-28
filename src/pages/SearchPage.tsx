import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, MapPin, TrendingUp } from 'lucide-react';
import SearchOptionCard from '@/components/SearchOptionCard';
import DestinationCard from '@/components/DestinationCard';
import BottomNav from '@/components/BottomNav';
import { mockDestinations } from '@/data/mockData';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const trendingSearches = ['Bali', 'Santorini', 'Tokyo', 'Maldives', 'Swiss Alps'];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="px-4 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-foreground mb-4">Discover</h1>
        
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
            <SearchOptionCard type="seasonal" />
            <SearchOptionCard type="package" />
            <SearchOptionCard type="custom" />
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
