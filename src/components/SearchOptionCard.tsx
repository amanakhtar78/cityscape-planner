import { motion } from 'framer-motion';
import { Compass, Package, Sparkles, ChevronRight } from 'lucide-react';

interface SearchOptionCardProps {
  type: 'seasonal' | 'package' | 'custom';
  onClick?: () => void;
}

const SearchOptionCard = ({ type, onClick }: SearchOptionCardProps) => {
  const config = {
    seasonal: {
      icon: Sparkles,
      title: 'Seasonal Favorites',
      description: 'Curated destinations perfect for this time of year',
      gradient: 'gradient-sunset',
    },
    package: {
      icon: Package,
      title: 'Get a Package',
      description: 'Pre-planned trips with everything included',
      gradient: 'gradient-ocean',
    },
    custom: {
      icon: Compass,
      title: 'Plan Myself',
      description: 'Create your own custom itinerary',
      gradient: 'gradient-forest',
    },
  };

  const { icon: Icon, title, description, gradient } = config[type];

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full p-5 rounded-2xl ${gradient} text-left group shadow-md`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-card/20 backdrop-blur-sm flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-primary-foreground">{title}</h3>
            <p className="text-sm text-primary-foreground/80 mt-0.5">{description}</p>
          </div>
        </div>
        <div className="h-8 w-8 rounded-full bg-card/20 flex items-center justify-center group-hover:bg-card/30 transition-colors">
          <ChevronRight className="h-5 w-5 text-primary-foreground" />
        </div>
      </div>
    </motion.button>
  );
};

export default SearchOptionCard;
