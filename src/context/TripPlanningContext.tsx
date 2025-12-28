import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TripPackage, PlaceDetail } from '@/data/tripData';

type PlanType = 'seasonal' | 'package' | 'custom' | null;
type TravelWith = 'family' | 'friends' | 'solo' | null;

interface TripPlanningState {
  step: 'search' | 'questions' | 'itinerary' | 'cart' | 'map';
  planType: PlanType;
  selectedCity: string | null;
  selectedCountry: string | null;
  days: number;
  travelWith: TravelWith;
  currentPackage: TripPackage | null;
  skippedPlaces: string[];
}

interface TripPlanningContextType extends TripPlanningState {
  setPlanType: (type: PlanType) => void;
  setCity: (city: string, country: string) => void;
  setDays: (days: number) => void;
  setTravelWith: (type: TravelWith) => void;
  setCurrentPackage: (pkg: TripPackage) => void;
  skipPlace: (placeId: string) => void;
  goToStep: (step: TripPlanningState['step']) => void;
  resetPlanning: () => void;
}

const initialState: TripPlanningState = {
  step: 'search',
  planType: null,
  selectedCity: null,
  selectedCountry: null,
  days: 3,
  travelWith: null,
  currentPackage: null,
  skippedPlaces: [],
};

const TripPlanningContext = createContext<TripPlanningContextType | undefined>(undefined);

export const TripPlanningProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<TripPlanningState>(initialState);

  const setPlanType = (planType: PlanType) => {
    setState(prev => ({ ...prev, planType }));
  };

  const setCity = (city: string, country: string) => {
    setState(prev => ({ ...prev, selectedCity: city, selectedCountry: country }));
  };

  const setDays = (days: number) => {
    setState(prev => ({ ...prev, days }));
  };

  const setTravelWith = (travelWith: TravelWith) => {
    setState(prev => ({ ...prev, travelWith }));
  };

  const setCurrentPackage = (currentPackage: TripPackage) => {
    setState(prev => ({ ...prev, currentPackage }));
  };

  const skipPlace = (placeId: string) => {
    setState(prev => ({
      ...prev,
      skippedPlaces: [...prev.skippedPlaces, placeId],
    }));
  };

  const goToStep = (step: TripPlanningState['step']) => {
    setState(prev => ({ ...prev, step }));
  };

  const resetPlanning = () => {
    setState(initialState);
  };

  return (
    <TripPlanningContext.Provider value={{
      ...state,
      setPlanType,
      setCity,
      setDays,
      setTravelWith,
      setCurrentPackage,
      skipPlace,
      goToStep,
      resetPlanning,
    }}>
      {children}
    </TripPlanningContext.Provider>
  );
};

export const useTripPlanning = () => {
  const context = useContext(TripPlanningContext);
  if (!context) {
    throw new Error('useTripPlanning must be used within a TripPlanningProvider');
  }
  return context;
};