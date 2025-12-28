import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useTripPlanning } from '@/context/TripPlanningContext';
import { useCart } from '@/context/CartContext';
import { PlaceDetail, delhiPlaces } from '@/data/tripData';
import PlaceDetailSheet from './PlaceDetailSheet';

interface SnakeItineraryProps {
  onBack: () => void;
  onOpenCart: () => void;
}

const SnakeItinerary = ({ onBack, onOpenCart }: SnakeItineraryProps) => {
  const { selectedCity, days, skippedPlaces, skipPlace } = useTripPlanning();
  const { addToCart, isInCart, cartItems } = useCart();
  const [selectedPlace, setSelectedPlace] = useState<PlaceDetail | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Filter out skipped places
  const places = delhiPlaces.filter(place => !skippedPlaces.includes(place.id));

  const handleKeep = (place: PlaceDetail) => {
    addToCart(place);
  };

  const handleSkip = (placeId: string) => {
    skipPlace(placeId);
  };

  const handlePlaceClick = (place: PlaceDetail) => {
    setSelectedPlace(place);
    setSheetOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="h-10 w-10 rounded-full bg-card flex items-center justify-center shadow-card"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </motion.button>
          <div>
            <h2 className="text-xl font-bold text-foreground">{selectedCity} Itinerary</h2>
            <p className="text-sm text-muted-foreground">{days} days trip</p>
          </div>
        </div>

        {/* Cart Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenCart}
          className="relative h-12 w-12 rounded-full bg-primary flex items-center justify-center shadow-lg"
        >
          <ShoppingCart className="h-5 w-5 text-primary-foreground" />
          {cartItems.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-destructive text-destructive-foreground text-xs font-bold flex items-center justify-center"
            >
              {cartItems.length}
            </motion.span>
          )}
        </motion.button>
      </div>

      {/* Snake Path Itinerary */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary" />

        <div className="space-y-6">
          {places.map((place, index) => {
            const inCart = isInCart(place.id);
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Day Marker */}
                <div className="absolute left-4 top-4 z-10">
                  <div className="h-5 w-5 rounded-full bg-primary border-4 border-background shadow-md" />
                </div>

                {/* Card */}
                <div className="ml-12">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`bg-card rounded-2xl shadow-card overflow-hidden border-2 transition-colors ${
                      inCart ? 'border-success/50' : 'border-transparent'
                    }`}
                  >
                    {/* Image and Basic Info */}
                    <button
                      onClick={() => handlePlaceClick(place)}
                      className="w-full text-left"
                    >
                      <div className="relative h-32">
                        <img
                          src={place.thumbnail}
                          alt={place.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="font-bold text-card text-lg">{place.name}</h3>
                          <p className="text-sm text-card/80">{place.city}</p>
                        </div>
                        {inCart && (
                          <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-success text-success-foreground text-xs font-medium">
                            ✓ Added
                          </div>
                        )}
                      </div>
                    </button>

                    {/* Description */}
                    <div className="p-4">
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {place.description}
                      </p>

                      {/* Estimated Cost */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-muted-foreground">Est. Cost:</span>
                        <span className="font-semibold text-foreground">
                          {place.estimatedCost === 0 ? 'Free' : `₹${place.estimatedCost.toLocaleString()}`}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      {!inCart && (
                        <div className="flex gap-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSkip(place.id)}
                            className="flex-1 py-3 rounded-xl bg-destructive/10 text-destructive font-medium hover:bg-destructive/20 transition-colors"
                          >
                            Skip
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleKeep(place)}
                            className="flex-1 py-3 rounded-xl bg-success text-success-foreground font-medium hover:bg-success/90 transition-colors"
                          >
                            Keep
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {places.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">You've reviewed all places!</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenCart}
            className="mt-4 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium"
          >
            View Your Cart ({cartItems.length} places)
          </motion.button>
        </div>
      )}

      {/* Place Detail Sheet */}
      <PlaceDetailSheet
        place={selectedPlace}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </div>
  );
};

export default SnakeItinerary;