import { AlertCircle } from "lucide-react";

interface FinancialDisclaimerProps {
  type?: "investment" | "loan" | "retirement" | "general";
  className?: string;
}

const disclaimers = {
  investment: {
    title: "Investment Disclaimer",
    items: [
      "Past performance does not indicate future returns",
      "Investment values can go down as well as up",
      "You may get back less than you originally invested",
      "This calculator provides estimates only and should not be considered financial advice",
      "Consult a qualified financial advisor before making investment decisions",
    ],
  },
  loan: {
    title: "Loan Calculator Disclaimer",
    items: [
      "Results are estimates based on the information you provide",
      "Actual loan terms may vary depending on your creditworthiness and lender",
      "Interest rates shown are for illustration purposes only",
      "Additional fees and charges may apply",
      "Always read the terms and conditions before committing to any loan",
    ],
  },
  retirement: {
    title: "Retirement Planning Disclaimer",
    items: [
      "This calculator provides estimates based on assumptions about growth rates and inflation",
      "Actual returns may differ significantly from projections",
      "Past performance is not a reliable indicator of future results",
      "Tax rules and state pension amounts may change over time",
      "Consider seeking professional financial advice for retirement planning",
      "Pension regulations vary by country — ensure you understand the rules applicable to you",
    ],
  },
  general: {
    title: "Financial Calculator Disclaimer",
    items: [
      "This calculator provides estimates for informational purposes only",
      "Results are based on the information you enter and may not reflect your actual circumstances",
      "This is not financial advice — consult a qualified professional for personalised guidance",
      "Rates, fees, and regulations may vary by location and change over time",
      "Always verify calculations and seek professional advice before making financial decisions",
    ],
  },
};

export function FinancialDisclaimer({ type = "general", className }: FinancialDisclaimerProps) {
  const { title, items } = disclaimers[type];

  return (
    <div className={`border-l-2 border-white/10 pl-5 py-1 ${className ?? ""}`}>
      <div className="flex items-center gap-2 mb-3">
        <AlertCircle className="h-3.5 w-3.5 shrink-0 text-white/20" />
        <p className="font-heading text-[9px] uppercase tracking-[0.25em] text-white/20">{title}</p>
      </div>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-xs text-zinc-700 font-sans">
            <span className="shrink-0 mt-px text-white/10">—</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}