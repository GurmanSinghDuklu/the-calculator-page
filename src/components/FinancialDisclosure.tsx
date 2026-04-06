import { AuthorByline } from "@/components/AuthorByline";

interface FinancialDisclosureProps {
  variant: "investment" | "mortgage" | "general";
}

const disclosures: Record<FinancialDisclosureProps["variant"], { lines: string[] }> = {
  investment: {
    lines: [
      "This calculator is for informational purposes only and does not constitute financial advice, a personal recommendation, or an offer to buy or sell any investment or asset class.",
      "Projected figures are illustrative estimates based solely on the inputs you provide. Returns are not guaranteed and actual outcomes will differ.",
      "Past performance is not a guide to future performance, nor a reliable indicator of future results.",
      "If you are unsure about the suitability of any investment or savings strategy for your circumstances, you should seek independent advice from a qualified financial adviser.",
    ],
  },
  mortgage: {
    lines: [
      "This calculator is for illustrative purposes only and does not constitute mortgage advice, a personal recommendation, or a mortgage offer.",
      "Results are based on the figures you enter and assume a standard capital repayment structure. Actual rates, fees, terms, and eligibility will vary by lender and individual circumstances.",
      "You should seek independent advice from a qualified mortgage adviser or broker before making any financial commitment.",
    ],
  },
  general: {
    lines: [
      "This calculator is for informational purposes only and does not constitute financial advice or a personal recommendation.",
      "Results are estimates based on the information you provide and may not reflect your actual financial position.",
      "You should consider seeking independent professional advice tailored to your specific circumstances before making any financial decision.",
    ],
  },
};

export function FinancialDisclosure({ variant }: FinancialDisclosureProps) {
  const { lines } = disclosures[variant];

  return (
    <div className="max-w-7xl mx-auto px-6 pb-10">
      <AuthorByline />
      <div className="border border-white/[0.06] rounded-xl px-6 py-5 bg-white/[0.015]">
        <p className="text-[9px] font-heading uppercase tracking-[0.2em] text-white/40 mb-3">
          Important Information
        </p>
        <div className="space-y-2">
          {lines.map((line, i) => (
            <p key={i} className="text-[11px] text-white/45 font-sans leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
