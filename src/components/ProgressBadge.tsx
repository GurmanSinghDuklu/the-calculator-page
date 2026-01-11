import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Zap, Target, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressBadgeProps {
  level: number;
  totalCompleted: number;
  className?: string;
}

const getBadgeInfo = (totalCompleted: number) => {
  if (totalCompleted >= 20) {
    return {
      icon: Trophy,
      label: 'Financial Expert',
      level: 5,
      color: 'bg-gradient-to-r from-yellow-400 to-amber-500'
    };
  } else if (totalCompleted >= 15) {
    return {
      icon: Award,
      label: 'Master Planner',
      level: 4,
      color: 'bg-gradient-to-r from-purple-400 to-pink-500'
    };
  } else if (totalCompleted >= 10) {
    return {
      icon: Target,
      label: 'Goal Achiever',
      level: 3,
      color: 'bg-gradient-to-r from-blue-400 to-cyan-500'
    };
  } else if (totalCompleted >= 5) {
    return {
      icon: Zap,
      label: 'Quick Learner',
      level: 2,
      color: 'bg-gradient-to-r from-green-400 to-emerald-500'
    };
  } else {
    return {
      icon: Star,
      label: 'Getting Started',
      level: 1,
      color: 'bg-gradient-to-r from-gray-400 to-slate-500'
    };
  }
};

export function ProgressBadge({ totalCompleted, className }: ProgressBadgeProps) {
  const badgeInfo = getBadgeInfo(totalCompleted);
  const Icon = badgeInfo.icon;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={cn("inline-block", className)}
    >
      <Badge 
        className={cn(
          "px-3 py-1 text-white font-semibold shadow-lg",
          badgeInfo.color
        )}
      >
        <Icon className="h-4 w-4 mr-1" />
        {badgeInfo.label}
      </Badge>
    </motion.div>
  );
}
