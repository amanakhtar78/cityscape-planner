import { motion } from 'framer-motion';
import { Home, Search, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: Search, path: '/search', label: 'Search' },
    { icon: User, path: '/profile', label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <div className="mx-auto max-w-md">
        <div className="glass-strong rounded-2xl px-6 py-3 shadow-lg">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <motion.button
                  key={item.path}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigate(item.path)}
                  className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-xl bg-primary/10"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <Icon className={`h-6 w-6 relative z-10 ${isActive ? 'stroke-[2.5]' : ''}`} />
                  <span className="text-[10px] font-medium relative z-10">{item.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
