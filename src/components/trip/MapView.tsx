import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Bike, Bus, Car, Train, GripVertical } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { PlaceDetail } from '@/data/tripData';
import PlaceDetailSheet from './PlaceDetailSheet';

interface MapViewProps {
  onBack: () => void;
}

const MapView = ({ onBack }: MapViewProps) => {
  const { cartItems } = useCart();
  const [selectedPlace, setSelectedPlace] = useState<PlaceDetail | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [orderedItems, setOrderedItems] = useState(cartItems);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Calculate total distance (mock calculation - in real app would use actual distances)
  const totalDistanceKm = orderedItems.length > 1 ? (orderedItems.length - 1) * 25 : 0;

  // Transportation costs
  const transportCosts = {
    bike: Math.round(totalDistanceKm * 5),
    bus: Math.round(totalDistanceKm * 3),
    car: Math.round(totalDistanceKm * 8),
    train: Math.round(totalDistanceKm * 2),
  };

  const handlePlaceClick = (place: PlaceDetail) => {
    setSelectedPlace(place);
    setSheetOpen(true);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newItems = [...orderedItems];
    const draggedItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);
    setOrderedItems(newItems);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
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
          <h2 className="text-xl font-bold text-foreground">Trip Map</h2>
          <p className="text-sm text-muted-foreground">{orderedItems.length} destinations</p>
        </div>
      </div>

      {/* Transportation Costs */}
      <div className="bg-card rounded-2xl p-4 shadow-card">
        <p className="text-sm text-muted-foreground mb-3">Estimated Transportation ({totalDistanceKm} km)</p>
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center p-2 rounded-xl bg-muted">
            <Bike className="h-5 w-5 mx-auto text-primary mb-1" />
            <p className="text-xs text-muted-foreground">Bike</p>
            <p className="text-sm font-semibold text-foreground">₹{transportCosts.bike}</p>
          </div>
          <div className="text-center p-2 rounded-xl bg-muted">
            <Bus className="h-5 w-5 mx-auto text-primary mb-1" />
            <p className="text-xs text-muted-foreground">Bus</p>
            <p className="text-sm font-semibold text-foreground">₹{transportCosts.bus}</p>
          </div>
          <div className="text-center p-2 rounded-xl bg-muted">
            <Car className="h-5 w-5 mx-auto text-primary mb-1" />
            <p className="text-xs text-muted-foreground">Car</p>
            <p className="text-sm font-semibold text-foreground">₹{transportCosts.car}</p>
          </div>
          <div className="text-center p-2 rounded-xl bg-muted">
            <Train className="h-5 w-5 mx-auto text-primary mb-1" />
            <p className="text-xs text-muted-foreground">Train</p>
            <p className="text-sm font-semibold text-foreground">₹{transportCosts.train}</p>
          </div>
        </div>
      </div>

      {/* Map Placeholder with Route */}
      <div className="relative bg-muted rounded-2xl h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Interactive Map</p>
            <p className="text-xs text-muted-foreground">(Requires Google Maps API)</p>
          </div>
        </div>
        
        {/* Route visualization markers */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between">
            {orderedItems.slice(0, 4).map((_, index) => (
              <div key={index} className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-primary" />
                {index < Math.min(orderedItems.length - 1, 3) && (
                  <div className="h-0.5 w-8 bg-primary/50" />
                )}
              </div>
            ))}
            {orderedItems.length > 4 && (
              <span className="text-xs text-muted-foreground">+{orderedItems.length - 4} more</span>
            )}
          </div>
        </div>
      </div>

      {/* Reorderable Destination List */}
      <div>
        <p className="text-sm text-muted-foreground mb-3">Drag to reorder your route</p>
        <div className="space-y-2">
          {orderedItems.map((place, index) => (
            <motion.div
              key={place.id}
              layout
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`bg-card rounded-xl shadow-card overflow-hidden cursor-move ${
                draggedIndex === index ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-center gap-3 p-3">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <button
                  onClick={() => handlePlaceClick(place)}
                  className="flex-1 flex items-center gap-3 text-left"
                >
                  <div className="h-12 w-12 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={place.thumbnail}
                      alt={place.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-foreground truncate">{place.name}</h3>
                    <p className="text-xs text-muted-foreground">{place.city}</p>
                  </div>
                </button>
                {index < orderedItems.length - 1 && (
                  <div className="text-xs text-muted-foreground">
                    ~25 km
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Save Trip Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg shadow-lg"
      >
        Save This Trip
      </motion.button>

      {/* Place Detail Sheet */}
      <PlaceDetailSheet
        place={selectedPlace}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </div>
  );
};

export default MapView;