import { Check, Circle } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { analytics } from "@/lib/analytics";

const ACCENT = "#34D399";

interface CompletionButtonProps {
  itemType: "article" | "calculator";
  itemSlug: string;
  itemName: string;
}

export function CompletionButton({ itemType, itemSlug, itemName }: CompletionButtonProps) {
  const { isComplete, markComplete } = useProgress();
  const completed = isComplete(itemType, itemSlug);

  const handleClick = async () => {
    await markComplete(itemType, itemSlug);
    if (itemType === "article") {
      analytics.trackArticleComplete(itemSlug);
    } else {
      analytics.trackCalculator(itemName);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="group inline-flex items-center gap-3 font-heading text-[10px] uppercase tracking-[0.18em] py-3 px-5 border transition-all"
      style={
        completed
          ? { color: ACCENT, borderColor: ACCENT, background: `${ACCENT}12` }
          : { color: "#ffffff", borderColor: "#ffffff", background: "#000000" }
      }
      onMouseEnter={e => {
        if (!completed) {
          e.currentTarget.style.background = "#ffffff";
          e.currentTarget.style.color = "#000000";
        }
      }}
      onMouseLeave={e => {
        if (!completed) {
          e.currentTarget.style.background = "#000000";
          e.currentTarget.style.color = "#ffffff";
        }
      }}
    >
      {completed ? (
        <>
          <Check className="h-3.5 w-3.5 shrink-0" style={{ color: ACCENT }} />
          Completed
        </>
      ) : (
        <>
          <Circle className="h-3.5 w-3.5 shrink-0" />
          Mark as Complete
        </>
      )}
    </button>
  );
}