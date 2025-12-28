import { motion } from 'framer-motion';

interface ProgressBarProps {
  label: string;
  percentage: number;
  color?: 'primary' | 'accent' | 'success';
}

const ProgressBar = ({ label, percentage, color = 'primary' }: ProgressBarProps) => {
  const colorClasses = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    success: 'bg-success',
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm text-muted-foreground">{percentage}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className={`h-full rounded-full ${colorClasses[color]}`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
