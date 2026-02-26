import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export type Currency = "USD" | "GBP" | "EUR" | "INR" | "JPY" | "CNY" | "HKD";

interface CurrencySelectorProps {
  value: Currency;
  onChange: (value: Currency) => void;
  id?: string;
}

export const currencies: Record<Currency, { symbol: string; name: string }> = {
  USD: { symbol: "$",   name: "US Dollar" },
  GBP: { symbol: "£",   name: "UK Pound" },
  EUR: { symbol: "€",   name: "Euro" },
  INR: { symbol: "₹",   name: "Indian Rupee" },
  JPY: { symbol: "¥",   name: "Japanese Yen" },
  CNY: { symbol: "¥",   name: "Chinese Renminbi" },
  HKD: { symbol: "HK$", name: "Hong Kong Dollar" },
};

export const CurrencySelector = ({ value, onChange, id = "currency" }: CurrencySelectorProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const { symbol, name } = currencies[value];

  return (
    <div className="space-y-1.5 relative" ref={ref}>
      <label htmlFor={id} className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40">
        Currency
      </label>

      {/* Trigger */}
      <button
        id={id}
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/20 transition-all text-left"
      >
        <span className="font-mono text-sm text-zinc-300">
          <span className="text-white/50 mr-2">{symbol}</span>{name}
        </span>
        <ChevronDown
          className="h-3.5 w-3.5 shrink-0 text-white/20 transition-transform duration-150"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 w-full border border-white/10 bg-black shadow-xl">
          {Object.entries(currencies).map(([code, { symbol: s, name: n }]) => {
            const active = code === value;
            return (
              <button
                key={code}
                type="button"
                onClick={() => { onChange(code as Currency); setOpen(false); }}
                className="w-full flex items-center gap-4 px-4 py-3 text-left hover:bg-white/[0.04] transition-colors border-b border-white/5 last:border-0"
                style={active ? { background: "rgba(255,255,255,0.04)" } : {}}
              >
                <span className="font-mono text-xs text-white/30 w-6 shrink-0">{s}</span>
                <span className="font-heading text-[10px] uppercase tracking-widest text-white/55">{code}</span>
                <span className="text-zinc-600 text-xs font-sans ml-auto">{n}</span>
                {active && <span className="w-1 h-1 rounded-full bg-white/30 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};