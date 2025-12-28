import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Trash2, Map } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { PlaceDetail } from '@/data/tripData';
import { useState } from 'react';
import PlaceDetailSheet from './PlaceDetailSheet';

interface CartViewProps {
  onBack: () => void;
  onOpenMap: () => void;
}

const CartView = ({ onBack, onOpenMap }: CartViewProps) => {
  const { cartItems, removeFromCart, totalEstimatedCost } = useCart();
  const [selectedPlace, setSelectedPlace] = useState<PlaceDetail | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handlePlaceClick = (place: PlaceDetail) => {
    setSelectedPlace(place);
    setSheetOpen(true);
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
        <div>
          <h2 className="text-xl font-bold text-foreground">Your Saved Places</h2>
          <p className="text-sm text-muted-foreground">{cartItems.length} places selected</p>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🗺️</div>
          <p className="text-muted-foreground mb-2">Your cart is empty</p>
          <p className="text-sm text-muted-foreground">Start adding places from the itinerary!</p>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-3">
            {cartItems.map((place, index) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-2xl shadow-card overflow-hidden"
              >
                <button
                  onClick={() => handlePlaceClick(place)}
                  className="w-full flex items-center gap-4 p-4 text-left"
                >
                  <div className="h-16 w-16 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={place.thumbnail}
                      alt={place.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary shrink-0" />
                      <h3 className="font-semibold text-foreground truncate">{place.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{place.city}</p>
                    <p className="text-sm font-medium text-primary mt-1">
                      Est. Cost: {place.estimatedCost === 0 ? 'Free' : `₹${place.estimatedCost.toLocaleString()}`}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromCart(place.id);
                    }}
                    className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0"
                  >
                    <Trash2 className="h-5 w-5 text-destructive" />
                  </motion.button>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Total Cost */}
          <div className="bg-card rounded-2xl p-5 shadow-card">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">Total Estimated Cost</span>
              <span className="text-2xl font-bold text-primary">
                ₹{totalEstimatedCost.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              *Excludes transportation, accommodation, and other expenses
            </p>
          </div>

          {/* Map Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenMap}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg flex items-center justify-center gap-2 shadow-lg"
          >
            <Map className="h-5 w-5" />
            View on Map
          </motion.button>
        </>
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

export default CartView;