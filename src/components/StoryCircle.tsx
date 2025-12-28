import { motion } from 'framer-motion';
import { Story } from '@/data/mockData';

interface StoryCircleProps {
  story: Story;
  isOwn?: boolean;
}

const StoryCircle = ({ story, isOwn = false }: StoryCircleProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center gap-1.5 min-w-[72px]"
    >
      <div className={story.hasUnseenStory ? 'story-ring' : 'story-ring-inactive'}>
        <div className="relative h-16 w-16 rounded-full bg-background p-0.5">
          <img
            src={story.user.avatar}
            alt={story.user.name}
            className="h-full w-full rounded-full object-cover"
          />
          {story.user.isCurrentlyTraveling && (
            <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full bg-success text-success-foreground text-[9px] font-semibold whitespace-nowrap shadow-sm">
              Traveling
            </div>
          )}
        </div>
      </div>
      <span className="text-xs font-medium text-foreground/80 truncate max-w-[68px]">
        {isOwn ? 'Your Story' : story.user.name.split(' ')[0]}
      </span>
    </motion.button>
  );
};

export default StoryCircle;
