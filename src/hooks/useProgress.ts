import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ProgressItem {
  id: string;
  item_type: 'article' | 'calculator';
  item_slug: string;
  completed: boolean;
  completed_at?: string;
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setProgress([]);
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', session.user.id);

      if (error) throw error;
      
      setProgress((data || []) as ProgressItem[]);
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markComplete = async (itemType: 'article' | 'calculator', itemSlug: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Sign in required",
          description: "Please sign in to track your progress",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: session.user.id,
          item_type: itemType,
          item_slug: itemSlug,
          completed: true,
          completed_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,item_type,item_slug'
        });

      if (error) throw error;

      await loadProgress();
      
      toast({
        title: "Progress saved!",
        description: `Marked ${itemType} as complete`,
      });
    } catch (error) {
      console.error('Error marking complete:', error);
      toast({
        title: "Error",
        description: "Failed to save progress",
        variant: "destructive"
      });
    }
  };

  const isComplete = (itemType: 'article' | 'calculator', itemSlug: string) => {
    return progress.some(
      p => p.item_type === itemType && p.item_slug === itemSlug && p.completed
    );
  };

  const getProgressStats = () => {
    const articles = progress.filter(p => p.item_type === 'article' && p.completed).length;
    const calculators = progress.filter(p => p.item_type === 'calculator' && p.completed).length;
    const total = progress.filter(p => p.completed).length;
    
    return { articles, calculators, total };
  };

  return {
    progress,
    isLoading,
    markComplete,
    isComplete,
    getProgressStats,
    refreshProgress: loadProgress
  };
}
