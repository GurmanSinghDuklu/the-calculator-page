import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  results: { label: string; value: string }[];
  accentColor?: string;
}

/**
 * Copies formatted results to clipboard.
 * Place directly below any results section.
 */
export function CopyButton({ results, accentColor = "#3B82F6" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = results
      .map(r => `${r.label}: ${r.value}`)
      .join("\n");

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 mt-3 font-heading text-[10px] uppercase tracking-widest transition-all duration-200 px-3 py-2 rounded border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06]"
      style={{ color: copied ? accentColor : "rgba(255,255,255,0.3)" }}
      title="Copy results to clipboard"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3" />
          Copied
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" />
          Copy Results
        </>
      )}
    </button>
  );
}
