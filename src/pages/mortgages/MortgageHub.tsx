import { Logo } from "@/components/Logo";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { BackToTop } from "@/components/BackToTop";
import {
  ArrowUpRight, Home, Calculator, TrendingDown, Scale,
  BookOpen, GraduationCap, ChevronRight, ArrowRight,
  PoundSterling, BarChart3, Clock, Layers
} from "lucide-react";

const ACCENT = "#F97316";

const calculators = [
  {
    title: "Mortgage Calculator",
    description: "Calculate your exact monthly repayments. Supports multi-part mortgages, part-and-part, and Help to Buy structures.",
    icon: Home,
    path: "/finance/mortgage",
    badge: "Most Used",
  },
  {
    title: "What Salary Do I Need?",
    description: "Enter any property price and find out the exact salary required to secure a mortgage. Based on 4× and 4.5× income multiples.",
    icon: PoundSterling,
    path: "/mortgages/salary-for-mortgage",
    badge: "New",
  },
  {
    title: "Mortgage Overpayment",
    description: "See exactly how much interest you save and how many years come off your term by making regular or lump-sum overpayments.",
    icon: TrendingDown,
    path: "/finance/mortgage-overpayment",
    badge: "",
  },
  {
    title: "Stamp Duty Calculator",
    description: "Instant SDLT calculation for England & Northern Ireland. Covers first-time buyers, second homes, and 2026/27 thresholds.",
    icon: Calculator,
    path: "/finance/stamp-duty",
    badge: "Updated 2026",
  },
  {
    title: "Mortgage Cost Comparison",
    description: "Compare two mortgage deals side by side — fixed vs tracker, different lenders, or remortgage vs staying put.",
    icon: Scale,
    path: "/finance/mortgage-cost-comparison",
    badge: "",
  },
  {
    title: "Weekly Mortgage Calculator",
    description: "Calculate fortnightly and weekly payment schedules. See how bi-weekly payments can shave years off your mortgage.",
    icon: Clock,
    path: "/finance/weekly-mortgage",
    badge: "",
  },
  {
    title: "Future House Value",
    description: "Project what your property could be worth in 5, 10, or 25 years using historical UK house price growth rates.",
    icon: BarChart3,
    path: "/finance/future-house-value",
    badge: "",
  },
  {
    title: "Loan Calculator",
    description: "Calculate monthly repayments, total interest, and full amortisation schedule for any personal or secured loan.",
    icon: Layers,
    path: "/finance/loan",
    badge: "",
  },
];

const guides = [
  { title: "UK Mortgage on a Visa: Guide for New Residents", path: "/mortgages/mortgage-for-new-residents", tag: "New" },
  { title: "How Much Can I Borrow?", path: "/blog/how-much-can-i-borrow-mortgage-uk", tag: "Affordability" },
  { title: "First-Time Buyer Guide UK 2026", path: "/blog/first-time-buyer-uk-2025", tag: "Getting Started" },
  { title: "Fixed vs Tracker Mortgage", path: "/blog/fixed-vs-tracker-mortgage", tag: "Rate Types" },
  { title: "What Is LTV?", path: "/blog/what-is-ltv-mortgage", tag: "Fundamentals" },
  { title: "How to Pay Off Your Mortgage Early", path: "/blog/pay-off-mortgage-early", tag: "Strategy" },
  { title: "How Long to Pay Off a Mortgage?", path: "/blog/how-long-to-pay-off-mortgage", tag: "Planning" },
  { title: "Mortgage & Interest Rates Explained", path: "/blog/mortgage-interest-rates", tag: "Rates" },
  { title: "How Much Is Stamp Duty in 2026?", path: "/blog/how-much-is-stamp-duty-2025", tag: "Costs" },
  { title: "How to Save for a House Deposit", path: "/blog/how-to-save-for-a-house-deposit", tag: "Saving" },
  { title: "What Is a Good Salary for a Mortgage?", path: "/blog/what-is-a-good-salary-uk", tag: "Affordability" },
];

const stats = [
  { value: "£285,000", label: "Average UK House Price", source: "ONS Jan 2026" },
  { value: "4.5×", label: "Typical Income Multiple", source: "UK Finance 2026" },
  { value: "5.0%", label: "Avg 2-Year Fixed Rate", source: "Moneyfacts Jun 2026" },
  { value: "£53,000", label: "Avg First-Time Buyer Deposit", source: "UK Finance 2026" },
];

const faqSchema = [
  { question: "How much can I borrow for a mortgage in the UK?", answer: "Most UK lenders will lend between 4× and 4.5× your annual income. Some specialist lenders offer up to 5× or 5.5× income, particularly for high earners or professionals. Affordability assessments also consider your outgoings, credit commitments, and the stress-tested rate." },
  { question: "What salary do I need for a £300,000 mortgage?", answer: "At 4× income, you would need a salary of £75,000. At 4.5× income you would need £66,667. If two people are buying, their combined income is used. Use our Salary for Mortgage calculator to see exact figures for any property price." },
  { question: "How is a mortgage monthly payment calculated?", answer: "Monthly mortgage payments use the amortisation formula: M = P × [r(1+r)^n] / [(1+r)^n - 1], where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of monthly payments. Our mortgage calculator handles this automatically." },
  { question: "What is the current average mortgage rate in the UK?", answer: "As of June 2026, the average 2-year fixed rate is around 4.75-5.25% and the average 5-year fixed rate is 4.25-4.75%. Tracker rates are typically linked to the Bank of England base rate (currently 4.5%) plus a margin of 0.5-1.0%." },
  { question: "Should I fix my mortgage rate or go on a tracker?", answer: "Fixed rates give certainty — your payment won't change if the Bank of England raises rates. Tracker mortgages can be cheaper initially but carry rate-rise risk. If rates are expected to fall (as many forecast for 2026-2027), a short-term tracker or 2-year fix may save money. If you want stability, a 5-year fix is the most popular choice." },
  { question: "Is it worth overpaying my mortgage?", answer: "Yes, in most cases. If your mortgage rate is higher than your savings rate after tax, overpaying gives a better risk-free return. Even £100-200 per month extra can save tens of thousands in interest and take years off your term. Most lenders allow 10% overpayment per year without early repayment charges — check your deal first." },
  { question: "What is stamp duty (SDLT) in 2026?", answer: "For residential property in England, stamp duty is 0% up to £250,000, 5% from £250,001-£925,000, 10% from £925,001-£1.5M, and 12% above £1.5M. First-time buyers pay 0% up to £425,000. Second home buyers pay an additional 3% surcharge on the full price. Use our Stamp Duty Calculator for an exact figure." },
];

export default function MortgageHub() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCalcs = calculators.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-orange-500/20 selection:text-white">
      <SEO
        title="UK Mortgage Calculators & Guides 2026 — Rates, Affordability & Payments"
        description="The complete UK mortgage hub. Calculate monthly payments, stamp duty, overpayments and affordability. Expert guides on rates, LTV, and buying your first home. Free, no sign-up."
        keywords="mortgage calculator UK, mortgage affordability calculator, stamp duty calculator 2026, mortgage overpayment calculator, salary for mortgage UK, UK mortgage rates 2026, first time buyer calculator UK, how much can I borrow mortgage"
        canonicalUrl="/mortgages"
        faqSchema={faqSchema}
        articleSchema={{
          headline: "UK Mortgage Calculators & Guides 2026",
          author: "The Calculator App Editorial Team",
          datePublished: "2026-06-02",
          dateModified: "2026-06-02",
        }}
        speakableSelectors={["h1", ".mortgage-hub-intro", ".stats-grid"]}
      />

      {/* Hero */}
      <section className="relative pt-16 pb-20 px-6 overflow-hidden border-b border-white/8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[120px] opacity-8 pointer-events-none" style={{ background: ACCENT }} />
        <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
            <p className="text-white/50 text-xs font-heading uppercase tracking-[0.3em]">Mortgage Hub</p>
          </div>

          <h1 className="font-display leading-[0.82] tracking-tighter select-none mb-6">
            <div className="flex flex-wrap gap-[0.3vw]">
              {["M","O","R","T","G","A","G","E","S"].map((letter, i) => (
                <span
                  key={i}
                  className="hover:-translate-y-4 transition-transform duration-500 block text-[14vw] sm:text-[11vw] lg:text-[8vw]"
                  style={{ color: ACCENT, transitionDelay: `${i * 50}ms` }}
                >
                  {letter}
                </span>
              ))}
            </div>
            <div
              className="text-[8vw] sm:text-[6vw] lg:text-[4.5vw] mt-2"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}
            >
              CALCULATORS & GUIDES
            </div>
          </h1>

          <p className="mortgage-hub-intro max-w-2xl text-lg text-white/60 font-sans leading-relaxed mb-10">
            Everything you need to navigate the UK mortgage market in one place. Calculate payments, check affordability, compare deals, and understand every stage of buying — from deposit to completion. Written by a CeMAP-qualified mortgage adviser with 25+ years in UK financial services.
          </p>

          {/* Search */}
          <div className="max-w-lg relative group">
            <input
              type="text"
              placeholder="SEARCH MORTGAGE TOOLS..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 border-b-2 border-white/20 py-4 px-2 text-white placeholder-white/30 font-heading uppercase tracking-wider focus:outline-none focus:border-orange-500 transition-colors text-base"
            />
            <svg className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30 group-focus-within:text-orange-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="stats-grid border-b border-white/8">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/8">
          {stats.map(s => (
            <div key={s.label} className="px-6 py-5 first:pl-0">
              <p className="font-display text-3xl text-white mb-1">{s.value}</p>
              <p className="text-[10px] font-heading uppercase tracking-widest text-white/40 mb-1">{s.label}</p>
              <p className="text-[10px] text-white/20 font-sans">{s.source}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-16 px-6 border-b border-white/8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <p className="text-[9px] font-heading uppercase tracking-[0.3em] mb-2" style={{ color: ACCENT }}>Tools</p>
              <h2 className="font-display text-4xl md:text-5xl uppercase text-white tracking-tight">
                Mortgage <span className="text-outline">Calculators</span>
              </h2>
            </div>
            <span className="text-xs font-heading uppercase tracking-widest text-white/30 hidden sm:inline">{calculators.length} tools</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/8">
            {filteredCalcs.map(tool => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="group bg-dark-bg p-7 hover:bg-white/[0.02] transition-all duration-300 relative flex flex-col"
                >
                  {tool.badge && (
                    <span
                      className="absolute top-4 right-4 px-2 py-0.5 text-[8px] font-heading uppercase tracking-widest rounded-sm"
                      style={{ background: `${ACCENT}20`, color: ACCENT }}
                    >
                      {tool.badge}
                    </span>
                  )}
                  <div className="mb-5 flex items-start justify-between">
                    <Icon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" style={{ color: ACCENT }} />
                    <ArrowUpRight className="h-4 w-4 text-white/15 group-hover:text-white/50 transition-colors" />
                  </div>
                  <h3 className="font-display text-2xl uppercase text-white mb-2 leading-tight group-hover:translate-x-0.5 transition-transform">{tool.title}</h3>
                  <p className="text-xs text-white/40 font-sans leading-relaxed border-t border-dashed border-white/10 pt-4 mt-auto group-hover:text-white/60 transition-colors">
                    {tool.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-[9px] font-heading uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: ACCENT }}>
                    Open Tool <ChevronRight className="h-3 w-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Guides & Articles */}
      <section className="py-16 px-6 border-b border-white/8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <p className="text-[9px] font-heading uppercase tracking-[0.3em] mb-2" style={{ color: ACCENT }}>Knowledge Base</p>
              <h2 className="font-display text-4xl md:text-5xl uppercase text-white tracking-tight">
                Mortgage <span className="text-outline">Guides</span>
              </h2>
            </div>
            <Link to="/blog" className="flex items-center gap-1.5 text-[10px] font-heading uppercase tracking-widest text-white/30 hover:text-white transition-colors">
              All Articles <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px bg-white/8">
            {guides.map(guide => (
              <Link
                key={guide.path}
                to={guide.path}
                className="group bg-dark-bg p-6 hover:bg-white/[0.02] transition-colors flex flex-col gap-3"
              >
                <span
                  className="text-[8px] font-heading uppercase tracking-[0.2em] px-2 py-0.5 rounded-sm self-start"
                  style={{ background: `${ACCENT}15`, color: ACCENT }}
                >
                  {guide.tag}
                </span>
                <h3 className="font-display text-lg uppercase text-white leading-tight group-hover:translate-x-0.5 transition-transform">{guide.title}</h3>
                <div className="mt-auto flex items-center gap-1 text-[9px] font-heading uppercase tracking-widest text-white/20 group-hover:text-white/50 transition-colors">
                  Read <ArrowRight className="h-2.5 w-2.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 border-b border-white/8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-[9px] font-heading uppercase tracking-[0.3em] mb-2" style={{ color: ACCENT }}>Common Questions</p>
            <h2 className="font-display text-4xl uppercase text-white tracking-tight">
              Mortgage <span className="text-outline">FAQs</span>
            </h2>
          </div>
          <div className="space-y-0 divide-y divide-white/8">
            {faqSchema.map((faq, i) => (
              <details key={i} className="group py-5">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <h3 className="font-heading text-sm uppercase tracking-wide text-white/80 group-open:text-white transition-colors">{faq.question}</h3>
                  <ChevronRight className="h-4 w-4 shrink-0 text-white/30 mt-0.5 group-open:rotate-90 transition-transform" style={{ color: ACCENT }} />
                </summary>
                <p className="mt-4 text-sm text-white/50 font-sans leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Expert note */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto border border-white/8 bg-white/[0.015] rounded-lg p-8">
          <div className="flex items-start gap-4">
            <div className="w-1 self-stretch rounded-full" style={{ background: ACCENT }} />
            <div>
              <p className="text-[9px] font-heading uppercase tracking-[0.25em] text-white/35 mb-2">About This Hub</p>
              <p className="text-sm text-white/55 font-sans leading-relaxed">
                All calculators and content on this page are written and maintained by The Calculator App Editorial Team, drawing on 25+ years of combined UK financial services experience. Calculations are based on standard UK mortgage formulae and current regulatory frameworks. This is not financial advice — always speak with an FCA-regulated adviser before making mortgage decisions.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <Link to="/about" className="text-[9px] font-heading uppercase tracking-widest text-white/30 hover:text-white transition-colors flex items-center gap-1">
                  About us <ArrowRight className="h-2.5 w-2.5" />
                </Link>
                <Link to="/disclaimer" className="text-[9px] font-heading uppercase tracking-widest text-white/30 hover:text-white transition-colors flex items-center gap-1">
                  Disclaimer <ArrowRight className="h-2.5 w-2.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-8 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo size="sm" />
          <p className="text-xs text-gray-500 uppercase tracking-widest">© 2026 The Calculator App.</p>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
}
