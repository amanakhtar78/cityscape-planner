import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Send, Bookmark, MapPin } from 'lucide-react';
import { TravelPost } from '@/data/mockData';

interface TravelPostCardProps {
  post: TravelPost;
}

const TravelPostCard = ({ post }: TravelPostCardProps) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.likes);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-card rounded-2xl overflow-hidden shadow-card"
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <div className={post.user.isCurrentlyTraveling ? 'story-ring' : ''}>
          <div className="h-10 w-10 rounded-full bg-background p-0.5">
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm text-foreground">{post.user.name}</h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{post.location}, {post.country}</span>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">{post.timestamp}</span>
      </div>

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={post.image}
          alt={post.location}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
      </div>

      {/* Actions */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleLike}
              className="flex items-center gap-1.5"
            >
              <Heart
                className={`h-6 w-6 transition-colors ${
                  isLiked ? 'fill-danger text-danger' : 'text-foreground'
                }`}
              />
            </motion.button>
            <button className="flex items-center gap-1.5">
              <MessageCircle className="h-6 w-6 text-foreground" />
            </button>
            <button className="flex items-center gap-1.5">
              <Send className="h-5 w-5 text-foreground" />
            </button>
          </div>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setIsSaved(!isSaved)}
          >
            <Bookmark
              className={`h-6 w-6 transition-colors ${
                isSaved ? 'fill-accent text-accent' : 'text-foreground'
              }`}
            />
          </motion.button>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">
            {likes.toLocaleString()} likes
          </p>
          <p className="text-sm text-foreground">
            <span className="font-semibold">{post.user.username}</span>{' '}
            {post.caption}
          </p>
          <button className="text-xs text-muted-foreground">
            View all {post.comments} comments
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default TravelPostCard;
