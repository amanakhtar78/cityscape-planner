import { motion } from 'framer-motion';
import { MapPin, Star, Check, X, Utensils, Hotel, Activity, UtensilsCrossed } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { PlaceDetail } from '@/data/tripData';
import { useCart } from '@/context/CartContext';

interface PlaceDetailSheetProps {
  place: PlaceDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PlaceDetailSheet = ({ place, open, onOpenChange }: PlaceDetailSheetProps) => {
  const { addToCart, isInCart } = useCart();

  if (!place) return null;

  const inCart = isInCart(place.id);

  const handleKeep = () => {
    addToCart(place);
    onOpenChange(false);
  };

  const handleSkip = () => {
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <div className="overflow-y-auto pb-24">
          {/* Header Image */}
          <div className="relative h-48">
            <img
              src={place.thumbnail}
              alt={place.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>

          <div className="px-4 -mt-8 relative z-10">
            <DrawerHeader className="px-0">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" />
                <div>
                  <DrawerTitle className="text-2xl font-bold text-foreground text-left">
                    {place.name}
                  </DrawerTitle>
                  <p className="text-sm text-muted-foreground">{place.city}, {place.country}</p>
                </div>
              </div>
            </DrawerHeader>

            <div className="space-y-6 pb-4">
              {/* Description */}
              <p className="text-foreground leading-relaxed">{place.description}</p>

              {/* Recommendations */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Check className="h-5 w-5 text-success" />
                  What People Recommend
                </h3>
                <ul className="space-y-2">
                  {place.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-success mt-0.5">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Avoid List */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <X className="h-5 w-5 text-destructive" />
                  What to Avoid
                </h3>
                <ul className="space-y-2">
                  {place.avoidList.map((avoid, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-destructive mt-0.5">•</span>
                      {avoid}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Costs Breakdown */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-lg">💰 Costs Breakdown</h3>

                {/* Minimum Food Cost */}
                <div className="bg-accent/10 rounded-xl p-4">
                  <p className="text-sm font-medium text-accent">BARE MINIMUM FOOD COST</p>
                  <p className="text-2xl font-bold text-foreground">₹{place.costs.minimumFood}/day</p>
                </div>

                {/* Restaurants */}
                <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <Utensils className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold text-foreground">Best Restaurants</h4>
                  </div>
                  <div className="space-y-2">
                    {place.costs.restaurants.map((restaurant, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-foreground">{restaurant.name}</p>
                          <p className="text-xs text-muted-foreground">{restaurant.dish}</p>
                        </div>
                        <span className="text-sm font-semibold text-primary">₹{restaurant.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hotels */}
                <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <Hotel className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold text-foreground">Best Hotels Nearby</h4>
                  </div>
                  <div className="space-y-2">
                    {place.costs.hotels.map((hotel, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-foreground">{hotel.name}</p>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: hotel.rating }).map((_, i) => (
                              <Star key={i} className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-primary">₹{hotel.pricePerNight.toLocaleString()}/night</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activities */}
                <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold text-foreground">Best Activities</h4>
                  </div>
                  <div className="space-y-2">
                    {place.costs.activities.map((activity, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <p className="text-sm font-medium text-foreground">{activity.name}</p>
                        <span className="text-sm font-semibold text-primary">
                          {activity.price === 0 ? 'Free' : `₹${activity.price}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Must Try Dishes */}
                <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <UtensilsCrossed className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold text-foreground">Must-Try Dishes</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {place.costs.dishes.map((dish, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 rounded-full bg-primary/10 text-sm"
                      >
                        <span className="text-foreground">{dish.name}</span>
                        <span className="text-primary font-medium ml-1">₹{dish.price}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Action Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
          {inCart ? (
            <div className="w-full py-3 rounded-xl bg-success/10 text-success font-medium text-center">
              ✓ Already in your cart
            </div>
          ) : (
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSkip}
                className="flex-1 py-3 rounded-xl bg-destructive text-destructive-foreground font-medium"
              >
                Skip
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleKeep}
                className="flex-1 py-3 rounded-xl bg-success text-success-foreground font-medium"
              >
                Keep
              </motion.button>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PlaceDetailSheet;