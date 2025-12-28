import { motion } from 'framer-motion';

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'accent';
}

const StatCard = ({ value, label, icon, variant = 'default' }: StatCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-2xl text-center ${
        variant === 'accent'
          ? 'gradient-sunset text-primary-foreground'
          : 'bg-card shadow-card'
      }`}
    >
      {icon && <div className="flex justify-center mb-2">{icon}</div>}
      <p className={`text-2xl font-bold ${variant === 'default' ? 'text-foreground' : ''}`}>
        {value}
      </p>
      <p className={`text-xs mt-1 ${variant === 'default' ? 'text-muted-foreground' : 'opacity-80'}`}>
        {label}
      </p>
    </motion.div>
  );
};

export default StatCard;
