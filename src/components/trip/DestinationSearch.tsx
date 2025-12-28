import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ArrowLeft } from 'lucide-react';
import { useTripPlanning } from '@/context/TripPlanningContext';
import { availableCities, delhiPackage } from '@/data/tripData';

interface DestinationSearchProps {
  onBack: () => void;
}

const DestinationSearch = ({ onBack }: DestinationSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<typeof availableCities[0] | null>(null);
  const { setCity, setCurrentPackage, goToStep } = useTripPlanning();

  const filteredCities = availableCities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCitySelect = (city: typeof availableCities[0]) => {
    setSelectedCity(city);
  };

  const handlePlanSelect = (planType: 'self' | 'package') => {
    if (selectedCity) {
      setCity(selectedCity.name, selectedCity.country);
      if (planType === 'package') {
        setCurrentPackage(delhiPackage); // For now, use Delhi package
      }
      goToStep('questions');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="h-10 w-10 rounded-full bg-card flex items-center justify-center shadow-card"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </motion.button>
        <h2 className="text-xl font-bold text-foreground">Search Destination</h2>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search cities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-14 pl-12 pr-4 rounded-2xl bg-muted border-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <AnimatePresence mode="wait">
        {!selectedCity ? (
          // City List
          <motion.div
            key="city-list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            {filteredCities.map((city, index) => (
              <motion.button
                key={city.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCitySelect(city)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-card shadow-card"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-foreground">{city.name}</p>
                  <p className="text-sm text-muted-foreground">{city.country}</p>
                </div>
                {city.packages.length > 0 && (
                  <span className="px-2 py-1 rounded-full bg-accent/10 text-xs font-medium text-accent">
                    Packages Available
                  </span>
                )}
              </motion.button>
            ))}

            {filteredCities.length === 0 && searchQuery && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No cities found for "{searchQuery}"</p>
              </div>
            )}
          </motion.div>
        ) : (
          // Plan Type Selection
          <motion.div
            key="plan-select"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="text-center py-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-medium text-primary">{selectedCity.name}, {selectedCity.country}</span>
              </div>
            </div>

            <p className="text-center text-muted-foreground">How would you like to plan?</p>

            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePlanSelect('self')}
                className="w-full p-5 rounded-2xl bg-card shadow-card border-2 border-transparent hover:border-primary/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                    <span className="text-2xl">✏️</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-foreground">Plan Yourself</p>
                    <p className="text-sm text-muted-foreground">Create a custom itinerary from scratch</p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePlanSelect('package')}
                className="w-full p-5 rounded-2xl bg-card shadow-card border-2 border-transparent hover:border-primary/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-2xl">📦</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-foreground">Take a Package</p>
                    <p className="text-sm text-muted-foreground">Choose from curated travel packages</p>
                  </div>
                </div>
              </motion.button>
            </div>

            <button
              onClick={() => setSelectedCity(null)}
              className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Choose different city
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DestinationSearch;