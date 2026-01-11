import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Calculator, TrendingUp } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';

export function ProgressTracker() {
  const { getProgressStats, isLoading } = useProgress();
  
  if (isLoading) {
    return null;
  }

  const stats = getProgressStats();
  
  // Calculate progress percentages (assume 10 articles and 15 calculators as targets)
  const articleProgress = Math.min((stats.articles / 10) * 100, 100);
  const calculatorProgress = Math.min((stats.calculators / 15) * 100, 100);
  const overallProgress = Math.min((stats.total / 25) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      <Card className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border-emerald-200 dark:border-emerald-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-500 rounded-lg">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-medium text-emerald-900 dark:text-emerald-100">Articles Read</div>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.articles}</div>
          </div>
        </div>
        <Progress value={articleProgress} className="h-2" />
        <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">{Math.round(articleProgress)}% Complete</div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-500 rounded-lg">
            <Calculator className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-medium text-blue-900 dark:text-blue-100">Calculators Used</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.calculators}</div>
          </div>
        </div>
        <Progress value={calculatorProgress} className="h-2" />
        <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">{Math.round(calculatorProgress)}% Complete</div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950 dark:to-violet-900 border-violet-200 dark:border-violet-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-violet-500 rounded-lg">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-medium text-violet-900 dark:text-violet-100">Overall Progress</div>
            <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">{stats.total}</div>
          </div>
        </div>
        <Progress value={overallProgress} className="h-2" />
        <div className="text-xs text-violet-600 dark:text-violet-400 mt-1">{Math.round(overallProgress)}% Complete</div>
      </Card>
    </motion.div>
  );
}
