import { motion } from 'framer-motion';
import { Star, Clock, ArrowRight } from 'lucide-react';
import { Destination } from '@/data/mockData';

interface DestinationCardProps {
  destination: Destination;
  variant?: 'horizontal' | 'vertical';
}

const DestinationCard = ({ destination, variant = 'vertical' }: DestinationCardProps) => {
  if (variant === 'horizontal') {
    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="flex gap-4 p-3 rounded-2xl bg-card shadow-card cursor-pointer group"
      >
        <div className="relative h-24 w-24 rounded-xl overflow-hidden flex-shrink-0">
          <img
            src={destination.image}
            alt={destination.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <h3 className="font-semibold text-foreground">{destination.name}</h3>
            <p className="text-sm text-muted-foreground">{destination.country}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              <span className="text-xs font-medium text-foreground">{destination.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span className="text-xs">{destination.duration}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
            <ArrowRight className="h-4 w-4 text-primary group-hover:text-primary-foreground transition-colors" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="relative rounded-2xl overflow-hidden shadow-card cursor-pointer group min-w-[200px]"
    >
      <div className="aspect-[3/4] relative">
        <img
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
        
        {/* Badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-card/90 backdrop-blur-sm">
          <span className="text-xs font-medium text-foreground">{destination.category}</span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-card">
          <h3 className="font-bold text-lg">{destination.name}</h3>
          <p className="text-sm opacity-80">{destination.country}</p>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium">{destination.rating}</span>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-70">from</p>
              <p className="font-bold">{destination.price}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;
