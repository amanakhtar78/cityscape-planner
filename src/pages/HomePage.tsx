import { motion } from 'framer-motion';
import { Bell, Plus, Compass } from 'lucide-react';
import StoryCircle from '@/components/StoryCircle';
import TravelPostCard from '@/components/TravelPostCard';
import BottomNav from '@/components/BottomNav';
import { mockStories, mockPosts, currentUser } from '@/data/mockData';

const HomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Compass className="h-7 w-7 text-primary" />
            <h1 className="text-xl font-bold text-gradient-sunset">Wanderly</h1>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative h-10 w-10 rounded-full bg-muted flex items-center justify-center"
            >
              <Bell className="h-5 w-5 text-foreground" />
              <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-danger border-2 border-background" />
            </motion.button>
          </div>
        </div>
      </header>

      <main className="px-4">
        {/* Stories */}
        <section className="py-4">
          <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4">
            {/* Add Story Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-1.5 min-w-[72px]"
            >
              <div className="relative h-16 w-16 rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center bg-primary/5">
                <Plus className="h-6 w-6 text-primary" />
                <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2">
                  <img
                    src={currentUser.avatar}
                    alt="Your avatar"
                    className="h-5 w-5 rounded-full border-2 border-background object-cover"
                  />
                </div>
              </div>
              <span className="text-xs font-medium text-foreground/80">Add Story</span>
            </motion.button>

            {/* Stories */}
            {mockStories.map((story) => (
              <StoryCircle key={story.id} story={story} />
            ))}
          </div>
        </section>

        {/* Currently Traveling Banner */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="gradient-ocean rounded-2xl p-4 text-primary-foreground">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Friends Currently Traveling</p>
                <p className="text-lg font-bold mt-0.5">2 friends are exploring</p>
              </div>
              <div className="flex -space-x-3">
                {mockStories
                  .filter((s) => s.user.isCurrentlyTraveling)
                  .map((story) => (
                    <img
                      key={story.id}
                      src={story.user.avatar}
                      alt={story.user.name}
                      className="h-10 w-10 rounded-full border-2 border-accent object-cover"
                    />
                  ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Posts */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {mockPosts.map((post) => (
            <TravelPostCard key={post.id} post={post} />
          ))}
        </motion.section>
      </main>

      <BottomNav />
    </div>
  );
};

export default HomePage;
