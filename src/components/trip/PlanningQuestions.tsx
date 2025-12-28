import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, User, Heart, Minus, Plus } from 'lucide-react';
import { useTripPlanning } from '@/context/TripPlanningContext';

interface PlanningQuestionsProps {
  onBack: () => void;
}

const PlanningQuestions = ({ onBack }: PlanningQuestionsProps) => {
  const { selectedCity, selectedCountry, days, setDays, travelWith, setTravelWith, goToStep } = useTripPlanning();
  const [localDays, setLocalDays] = useState(days);

  const travelOptions = [
    { id: 'family', label: 'Family', icon: Heart, emoji: '👨‍👩‍👧‍👦' },
    { id: 'friends', label: 'Friends', icon: Users, emoji: '👥' },
    { id: 'solo', label: 'Solo', icon: User, emoji: '🎒' },
  ] as const;

  const handleContinue = () => {
    setDays(localDays);
    goToStep('itinerary');
  };

  const isValid = localDays > 0 && travelWith;

  return (
    <div className="space-y-8">
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
          <h2 className="text-xl font-bold text-foreground">Plan Your Trip</h2>
          <p className="text-sm text-muted-foreground">{selectedCity}, {selectedCountry}</p>
        </div>
      </div>

      {/* Days Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl p-6 shadow-card space-y-4"
      >
        <label className="text-lg font-semibold text-foreground">
          How many days?
        </label>
        <div className="flex items-center justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setLocalDays(prev => Math.max(1, prev - 1))}
            className="h-12 w-12 rounded-full bg-muted flex items-center justify-center"
          >
            <Minus className="h-5 w-5 text-foreground" />
          </motion.button>
          
          <div className="w-24 text-center">
            <span className="text-4xl font-bold text-primary">{localDays}</span>
            <p className="text-sm text-muted-foreground">days</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setLocalDays(prev => Math.min(30, prev + 1))}
            className="h-12 w-12 rounded-full bg-muted flex items-center justify-center"
          >
            <Plus className="h-5 w-5 text-foreground" />
          </motion.button>
        </div>
      </motion.div>

      {/* Travel With Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl p-6 shadow-card space-y-4"
      >
        <label className="text-lg font-semibold text-foreground">
          Traveling with?
        </label>
        <div className="grid grid-cols-3 gap-3">
          {travelOptions.map((option) => (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTravelWith(option.id)}
              className={`p-4 rounded-2xl border-2 transition-all ${
                travelWith === option.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-background hover:border-primary/30'
              }`}
            >
              <div className="text-3xl mb-2">{option.emoji}</div>
              <p className={`text-sm font-medium ${
                travelWith === option.id ? 'text-primary' : 'text-foreground'
              }`}>
                {option.label}
              </p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Continue Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: isValid ? 1.02 : 1 }}
        whileTap={{ scale: isValid ? 0.98 : 1 }}
        onClick={handleContinue}
        disabled={!isValid}
        className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all ${
          isValid
            ? 'bg-primary text-primary-foreground shadow-lg'
            : 'bg-muted text-muted-foreground cursor-not-allowed'
        }`}
      >
        Generate Itinerary
      </motion.button>
    </div>
  );
};

export default PlanningQuestions;