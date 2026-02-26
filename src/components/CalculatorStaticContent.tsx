import { useState } from "react";
import { HelpCircle, BookOpen, Calculator, CheckCircle, ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface HowToStep {
  step: number;
  title: string;
  description: string;
}

interface CalculatorStaticContentProps {
  whatIs: {
    title: string;
    description: string;
  };
  howItWorks: {
    title: string;
    description: string;
    steps?: HowToStep[];
  };
  formula?: {
    title: string;
    formula: string;
    explanation: string;
  };
  faqs: FAQ[];
  tips?: string[];
}

export const CalculatorStaticContent = ({
  whatIs,
  howItWorks,
  formula,
  faqs,
  tips,
}: CalculatorStaticContentProps) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="mt-16 space-y-px border-t border-white/8 pt-16">

      {/* ── What Is ── */}
      <section className="border border-white/8 bg-white/[0.015] px-6 py-6 mb-px">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/6">
          <BookOpen className="h-4 w-4 shrink-0 text-white/25" />
          <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40">{whatIs.title}</p>
        </div>
        <p className="text-zinc-500 text-sm leading-relaxed font-sans">{whatIs.description}</p>
      </section>

      {/* ── How It Works ── */}
      <section className="border border-white/8 bg-white/[0.015] px-6 py-6 mb-px">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/6">
          <Calculator className="h-4 w-4 shrink-0 text-white/25" />
          <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40">{howItWorks.title}</p>
        </div>
        <p className="text-zinc-500 text-sm leading-relaxed font-sans mb-5">{howItWorks.description}</p>
        {howItWorks.steps && (
          <div className="divide-y divide-white/6">
            {howItWorks.steps.map((step) => (
              <div key={step.step} className="flex items-start gap-5 py-3.5">
                <span className="font-display text-3xl leading-none shrink-0 tabular-nums text-white/10">
                  {String(step.step).padStart(2, "0")}
                </span>
                <div className="pt-0.5">
                  <p className="font-heading text-[10px] uppercase tracking-widest text-white/50 mb-0.5">{step.title}</p>
                  <p className="text-zinc-500 text-sm font-sans">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Formula ── */}
      {formula && (
        <section className="border border-white/8 bg-white/[0.015] px-6 py-6 mb-px">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/6">
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40">{formula.title}</p>
          </div>
          <div className="border-l-2 border-white/15 bg-white/[0.02] px-5 py-4 mb-5 font-mono text-sm text-zinc-400">
            {formula.formula}
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed font-sans">{formula.explanation}</p>
        </section>
      )}

      {/* ── Tips ── */}
      {tips && tips.length > 0 && (
        <section className="border border-white/8 bg-white/[0.015] px-6 py-6 mb-px">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/6">
            <CheckCircle className="h-4 w-4 shrink-0 text-white/25" />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40">Tips &amp; Best Practices</p>
          </div>
          <ul className="divide-y divide-white/5">
            {tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 py-3">
                <span className="text-white/20 text-xs font-heading shrink-0 mt-px">→</span>
                <p className="text-zinc-500 text-sm font-sans">{tip}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── FAQ ── */}
      <section className="border border-white/8 bg-white/[0.015] px-6 py-6">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/6">
          <HelpCircle className="h-4 w-4 shrink-0 text-white/25" />
          <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40">Frequently Asked Questions</p>
        </div>
        <div className="divide-y divide-white/6">
          {faqs.map((faq, i) => (
            <div key={i} className="py-1">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-4 text-left group"
              >
                <p className="font-heading text-[10px] uppercase tracking-widest text-white/55 group-hover:text-white/80 transition-colors">
                  {faq.question}
                </p>
                <ChevronDown
                  className="h-3.5 w-3.5 shrink-0 text-white/20 transition-transform duration-200"
                  style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>
              {openFaq === i && (
                <p className="text-zinc-500 text-sm font-sans leading-relaxed pb-4">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};