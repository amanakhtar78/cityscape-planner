import { motion } from 'framer-motion';
import {
  Settings,
  MapPin,
  Globe,
  Flag,
  Camera,
  ChevronRight,
  Award,
  Edit3,
} from 'lucide-react';
import StatCard from '@/components/StatCard';
import ProgressBar from '@/components/ProgressBar';
import BottomNav from '@/components/BottomNav';
import { currentUser, mockUserStats, mockDestinations } from '@/data/mockData';

const ProfilePage = () => {
  const colors: ('primary' | 'accent' | 'success')[] = ['primary', 'accent', 'success', 'primary'];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="relative">
        {/* Cover */}
        <div className="h-32 gradient-sunset" />
        
        {/* Settings Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-4 right-4 h-10 w-10 rounded-full bg-card/30 backdrop-blur-sm flex items-center justify-center"
        >
          <Settings className="h-5 w-5 text-primary-foreground" />
        </motion.button>

        {/* Profile Info */}
        <div className="px-4 -mt-12 relative z-10">
          <div className="flex items-end gap-4">
            <div className="relative">
              <div className="h-24 w-24 rounded-2xl border-4 border-background overflow-hidden shadow-lg">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-primary flex items-center justify-center shadow-md"
              >
                <Edit3 className="h-4 w-4 text-primary-foreground" />
              </motion.button>
            </div>
            <div className="flex-1 pb-2">
              <h1 className="text-xl font-bold text-foreground">{currentUser.name}</h1>
              <p className="text-sm text-muted-foreground">@{currentUser.username}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 pt-6 space-y-6">
        {/* Stats Grid */}
        <section className="grid grid-cols-3 gap-3">
          <StatCard
            value={mockUserStats.totalTrips}
            label="Total Trips"
            variant="accent"
          />
          <StatCard
            value={mockUserStats.countriesVisited}
            label="Countries"
            icon={<Globe className="h-5 w-5 text-accent" />}
          />
          <StatCard
            value={mockUserStats.placesExplored}
            label="Places"
            icon={<MapPin className="h-5 w-5 text-primary" />}
          />
        </section>

        {/* Exploration Progress */}
        <section className="bg-card rounded-2xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Exploration Progress</h2>
            <div className="px-3 py-1 rounded-full bg-primary/10">
              <span className="text-sm font-bold text-primary">
                {mockUserStats.explorationPercentage}%
              </span>
            </div>
          </div>
          <div className="space-y-4">
            {mockUserStats.regions.map((region, index) => (
              <ProgressBar
                key={region.name}
                label={region.name}
                percentage={region.percentage}
                color={colors[index % colors.length]}
              />
            ))}
          </div>
        </section>

        {/* Trip Types */}
        <section className="flex gap-3">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex-1 p-4 rounded-2xl bg-card shadow-card"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Flag className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">
                  {mockUserStats.nationalTrips}
                </p>
                <p className="text-xs text-muted-foreground">National</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex-1 p-4 rounded-2xl bg-card shadow-card"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">
                  {mockUserStats.internationalTrips}
                </p>
                <p className="text-xs text-muted-foreground">International</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Travel Gallery */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-foreground">Travel Gallery</h2>
            </div>
            <button className="text-sm text-primary font-medium">See All</button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {mockDestinations.map((dest, index) => (
              <motion.div
                key={dest.id}
                whileHover={{ scale: 1.05 }}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-xs font-medium text-card truncate">{dest.name}</p>
                </div>
                {index === 0 && (
                  <div className="absolute top-2 right-2">
                    <Award className="h-4 w-4 text-primary fill-primary" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Menu Items */}
        <section className="space-y-2">
          {[
            { label: 'Saved Trips', icon: MapPin },
            { label: 'Travel Badges', icon: Award },
            { label: 'Settings', icon: Settings },
          ].map((item) => (
            <motion.button
              key={item.label}
              whileHover={{ x: 4 }}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-card shadow-card"
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium text-foreground">{item.label}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </motion.button>
          ))}
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default ProfilePage;
