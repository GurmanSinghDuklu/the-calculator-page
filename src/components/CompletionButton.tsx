import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Circle } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { analytics } from '@/lib/analytics';

interface CompletionButtonProps {
  itemType: 'article' | 'calculator';
  itemSlug: string;
  itemName: string;
}

export function CompletionButton({ itemType, itemSlug, itemName }: CompletionButtonProps) {
  const { isComplete, markComplete } = useProgress();
  const completed = isComplete(itemType, itemSlug);

  const handleClick = async () => {
    await markComplete(itemType, itemSlug);
    
    // Track completion in analytics
    if (itemType === 'article') {
      analytics.trackArticleComplete(itemSlug);
    } else {
      analytics.trackCalculator(itemName);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        onClick={handleClick}
        variant={completed ? "default" : "outline"}
        className={completed ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""}
      >
        {completed ? (
          <>
            <Check className="h-4 w-4 mr-2" />
            Completed
          </>
        ) : (
          <>
            <Circle className="h-4 w-4 mr-2" />
            Mark as Complete
          </>
        )}
      </Button>
    </motion.div>
  );
}
