import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Printer, Trophy, CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { NavigationMenu } from "@/components/NavigationMenu";

import budgetImage     from "@/assets/journey-budget.jpg";
import accumulateImage from "@/assets/journey-accumulate.jpg";
import payoffImage     from "@/assets/journey-payoff.jpg";
import investImage     from "@/assets/journey-invest.jpg";
import thriveImage     from "@/assets/journey-thrive.jpg";

const STORAGE_KEY = "financialJourney.progress.v1";

const DEFAULT_DATA = [
  {
    id: "budget", title: "Budget", accent: "#F87171",
    description: "Build control and visibility over your cashflow",
    image: budgetImage,
    items: [
      { id: "where-money-goes",     title: "Where Your Money Really Goes",       desc: "Track spending for 30 days and categorize.",            est: "15–30 min", path: "/learn/where-money-goes" },
      { id: "50-30-20",             title: "50/30/20 Budget Made Personal",      desc: "Adapt the classic rule to your life.",                  est: "20 min",    path: "/learn/50-30-20-budget" },
      { id: "automate-finances",    title: "Automate Your Finances Like a Pro",  desc: "Standing orders, automations and friction reduction.",  est: "20 min",    path: "/learn/automate-finances" },
      { id: "budget-for-irregular", title: "Budgeting for Unexpected Costs",     desc: "Plan for irregular and unexpected expenses.",           est: "15 min",    path: "/learn/budget-irregular-costs" },
      { id: "monthly-dashboard",    title: "Your Monthly Financial Dashboard",   desc: "Monthly KPI review and adjustments.",                   est: "20 min",    path: "/learn/monthly-dashboard" },
    ],
  },
  {
    id: "accumulate", title: "Accumulate", accent: "#38BDF8",
    description: "Grow your cushion and start saving effectively",
    image: accumulateImage,
    items: [
      { id: "emergency-fund",  title: "Building an Emergency Fund That Works",       desc: "Target 3–6 months' expenses.",                        est: "30–60 min", path: "/learn/emergency-fund" },
      { id: "choose-savings",  title: "How to Choose the Right Savings Account (UK)", desc: "ISA vs regular saving — where to park cash.",        est: "20 min",    path: "/learn/choose-savings-account" },
      { id: "inflation",       title: "Inflation: The Silent Thief",                 desc: "Understand real returns and protecting buying power.", est: "15 min",    path: "/learn/inflation-guide" },
      { id: "first-1000",      title: "Your First £1,000",                           desc: "Gamified habit-building approach.",                    est: "10–20 min", path: "/learn/first-1000" },
    ],
  },
  {
    id: "payoff", title: "Pay Off", accent: "#FBBF24",
    description: "Clear toxic debt and gain financial freedom",
    image: payoffImage,
    items: [
      { id: "debt-landscape",     title: "Understanding Your Debt Landscape",  desc: "List, categorise and prioritise debts.",             est: "30 min",    path: "/learn/debt-landscape" },
      { id: "snowball-avalanche",  title: "Snowball vs Avalanche",             desc: "Two payoff strategies with worked examples.",         est: "20–40 min", path: "/learn/snowball-avalanche" },
      { id: "interest-visual",    title: "How Interest Eats Your Wealth",      desc: "Reverse compounding visual guide.",                   est: "15 min",    path: "/learn/interest-impact" },
      { id: "credit-scores",      title: "Credit Scores and Borrowing Wisely", desc: "Build or repair credit health.",                     est: "20 min",    path: "/learn/credit-scores" },
    ],
  },
  {
    id: "invest", title: "Invest", accent: "#34D399",
    description: "Make your money work with long-term strategies",
    image: investImage,
    items: [
      { id: "before-invest",        title: "What to Do Before You Invest",          desc: "Risk tolerance, goals and timelines checklist.",   est: "20–30 min", path: "/learn/before-you-invest" },
      { id: "basics-investing",     title: "Basics of Investing: Stocks, Bonds & ETFs", desc: "Core primer for new investors.",             est: "30–45 min", path: "/learn/investing-basics" },
      { id: "build-portfolio",      title: "How to Build a Balanced Portfolio",     desc: "Sample portfolios by risk profile.",               est: "30 min",    path: "/learn/build-portfolio" },
      { id: "long-term-vs-trading", title: "Long-Term Investing vs Trading",        desc: "Psychology and behaviour guidance.",               est: "20 min",    path: "/learn/investing-vs-trading" },
      { id: "tax-efficient",        title: "Tax-Efficient Accounts (ISAs, SIPPs)",  desc: "UK-specific tax wrappers explained.",              est: "25 min",    path: "/learn/tax-efficient-accounts" },
      { id: "rebalancing",          title: "How to Rebalance and Review",           desc: "Discipline and management best practices.",        est: "20 min",    path: "/learn/portfolio-rebalancing" },
    ],
  },
  {
    id: "thrive", title: "Thrive", accent: "#A78BFA",
    description: "Protect, give and pass forward wealth",
    image: thriveImage,
    items: [
      { id: "define-freedom", title: "Financial Freedom: Defining Your End Goal", desc: "Personalised freedom vs FIRE models.",            est: "30 min",    path: "/learn/financial-freedom" },
      { id: "protect-wealth", title: "Protecting Your Wealth",                    desc: "Risk management and family protection.",          est: "20–30 min", path: "/learn/protect-wealth" },
      { id: "ethical",        title: "Giving Back and Ethical Investing",         desc: "Purpose-driven wealth allocation.",                est: "20 min",    path: "/learn/ethical-investing" },
      { id: "teach-others",   title: "How to Teach Money Skills to Others",      desc: "Share and multiply your impact.",                  est: "15–25 min", path: "/learn/teach-money-skills" },
    ],
  },
];

type Filter = "all" | "completed" | "todo";

export default function FinancialJourney() {
  const [progressMap, setProgressMap] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          const validated: Record<string, boolean> = {};
          for (const [k, v] of Object.entries(parsed))
            if (typeof k === "string" && typeof v === "boolean") validated[k] = v;
          setProgressMap(validated);
        } else { localStorage.removeItem(STORAGE_KEY); }
      }
    } catch { localStorage.removeItem(STORAGE_KEY); }
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progressMap)); } catch {}
  }, [progressMap]);

  const isComplete  = (id: string) => !!progressMap[id];
  const toggle      = (id: string) => setProgressMap(p => ({ ...p, [id]: !p[id] }));
  const resetAll    = () => { if (!confirm("Reset all progress? This cannot be undone.")) return; setProgressMap({}); };

  const catProgress = (cat: typeof DEFAULT_DATA[0]) => {
    const done = cat.items.filter(it => isComplete(it.id)).length;
    return { done, total: cat.items.length, pct: Math.round((done / cat.items.length) * 100) };
  };

  const allItems   = DEFAULT_DATA.flatMap(c => c.items);
  const overall    = { done: allItems.filter(it => isComplete(it.id)).length, total: allItems.length };
  const overallPct = Math.round((overall.done / overall.total) * 100);

  const BADGES = [
    { threshold: 20,  label: "🎯 Budget Master",   color: "#F87171" },
    { threshold: 40,  label: "💰 Cushion Builder",  color: "#38BDF8" },
    { threshold: 70,  label: "⚔️ Debt Slayer",     color: "#FBBF24" },
    { threshold: 100, label: "🏆 Financial Pro",    color: "#34D399" },
  ];

  return (
    <>
      <SEO
        title="Financial Growth Journey - Free Personal Finance Education"
        description="Follow a structured path from budgeting basics to confident investing. Interactive financial education with progress tracking for UK beginners."
        keywords="financial education, personal finance guide, budgeting for beginners, investing basics, debt payoff strategies, UK financial planning"
        canonicalUrl="/learn/financial-journey"
      />

      <div className="min-h-screen bg-black text-white font-sans">

        {/* ── Sticky header ── */}
        <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/8">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Logo linkTo="/" size="sm" />
            <div className="flex items-center gap-4">
              <Link to="/"
                className="flex items-center gap-2 text-white/25 hover:text-white transition-colors font-heading text-[10px] uppercase tracking-widest">
                <ArrowLeft className="h-4 w-4" /> Back
              </Link>
              <NavigationMenu />
            </div>
          </div>
        </header>

        {/* ── Hero ── */}
        <div className="max-w-7xl mx-auto px-6 pt-14 pb-10 relative">
          <div className="absolute w-[700px] h-[400px] rounded-full blur-[180px] opacity-[0.04] pointer-events-none -z-10"
            style={{ background: "linear-gradient(135deg,#3B82F6,#a78bfa)", top: 0, left: 0 }} />

          <h1 className="font-display leading-[0.85] tracking-tighter select-none">
            <span className="block text-[10vw] md:text-[82px]" style={{
              background: "linear-gradient(135deg, #3B82F6 0%, #a78bfa 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>FINANCIAL</span>
            <span className="block text-[10vw] md:text-[82px]" style={{
              background: "linear-gradient(135deg, #3B82F6 0%, #a78bfa 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>JOURNEY</span>
            <span className="block text-[5vw] md:text-[42px] mt-1"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.12)", color: "transparent" }}>
              GROWTH ROADMAP
            </span>
          </h1>

          <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-lg border-l-2 border-blue-500/25 pl-5">
              <p className="text-zinc-300 text-base leading-relaxed font-sans font-light">
                Follow the path from beginner to confident investor. Tick off each topic as you complete it — your progress is saved automatically.
              </p>
            </div>

            {/* Overall progress — editorial box, no rounding */}
            <div className="border border-white/8 bg-white/[0.02] p-5 min-w-[220px]">
              <p className="text-[9px] font-heading uppercase tracking-[0.25em] text-white/45 mb-4">Overall Progress</p>
              <div className="flex items-end gap-3 mb-4">
                <p className="font-display text-5xl text-white leading-none">
                  {overallPct}<span className="text-2xl text-white/40">%</span>
                </p>
                <p className="text-zinc-400 text-xs font-sans mb-1">{overall.done} / {overall.total} done</p>
              </div>
              <div className="h-px bg-white/5 overflow-hidden">
                <div className="h-px transition-all duration-700"
                  style={{ width: `${overallPct}%`, background: "linear-gradient(90deg, #3B82F6, #a78bfa)" }} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Controls bar ── */}
        <div className="max-w-7xl mx-auto px-6 mb-8 flex flex-wrap items-center gap-3">
          {(["all", "completed", "todo"] as Filter[]).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-4 py-2 font-heading text-[10px] uppercase tracking-widest transition-all border"
              style={{
                borderColor: filter === f ? "#3B82F6" : "rgba(255,255,255,0.08)",
                background:  filter === f ? "#3B82F610" : "transparent",
                color:       filter === f ? "#3B82F6"   : "rgba(255,255,255,0.25)",
              }}>
              {f === "all" ? "All" : f === "completed" ? "Completed" : "To Do"}
            </button>
          ))}

          <div className="ml-auto flex gap-2">
            <button onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 border border-white/8 font-heading text-[10px] uppercase tracking-widest text-white/50 hover:text-white hover:border-white/30 transition-all">
              <Printer className="h-3 w-3" /> Print
            </button>
            <button onClick={resetAll}
              className="flex items-center gap-2 px-4 py-2 border border-white/8 font-heading text-[10px] uppercase tracking-widest text-white/50 hover:text-white hover:border-white/30 transition-all">
              <RotateCcw className="h-3 w-3" /> Reset
            </button>
          </div>
        </div>

        {/* ── Category cards — flush grid, no rounding ── */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/6 border border-white/6">
            {DEFAULT_DATA.map(cat => {
              const prog = catProgress(cat);
              const visibleItems = cat.items.filter(it => {
                if (filter === "completed") return isComplete(it.id);
                if (filter === "todo")      return !isComplete(it.id);
                return true;
              });

              return (
                <div key={cat.id} className="bg-black flex flex-col group hover:bg-white/[0.01] transition-colors">

                  {/* Hero image */}
                  <div className="relative h-40 overflow-hidden">
                    <img src={cat.image} alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-50 grayscale-[20%]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    <div className="absolute bottom-4 left-5">
                      <p className="font-display text-3xl text-white tracking-wide">{cat.title}</p>
                      <p className="text-[11px] text-white/60 font-sans mt-0.5">{cat.description}</p>
                    </div>

                    {/* Progress badge */}
                    <div className="absolute top-3 right-3 bg-black/80 border border-white/8 px-3 py-1.5 text-right">
                      <p className="font-display text-xl leading-none" style={{ color: cat.accent }}>{prog.pct}%</p>
                      <p className="text-[9px] text-white/45 font-heading uppercase tracking-widest">{prog.done}/{prog.total}</p>
                    </div>

                    {/* Accent bar */}
                    <div className="absolute top-0 left-0 w-1 h-full" style={{ background: cat.accent }} />
                  </div>

                  {/* Progress bar — razor thin */}
                  <div className="px-5 pt-4">
                    <div className="h-px bg-white/5">
                      <div className="h-px transition-all duration-700" style={{ width: `${prog.pct}%`, background: cat.accent }} />
                    </div>
                  </div>

                  {/* Items */}
                  <div className="p-5 space-y-0 divide-y divide-white/[0.04] flex-1">
                    {visibleItems.map(it => (
                      <div key={it.id} className="flex items-start gap-3 py-3 hover:bg-white/[0.03] transition-colors px-1">
                        <button onClick={() => toggle(it.id)} className="mt-0.5 shrink-0">
                          {isComplete(it.id)
                            ? <CheckCircle2 className="h-4 w-4" style={{ color: cat.accent }} />
                            : <div className="h-4 w-4 border border-white/15" />}
                        </button>
                        <div className="flex-1 min-w-0">
                          <Link to={it.path} onClick={e => e.stopPropagation()}>
                            <p className={`text-xs font-heading uppercase tracking-wider transition-colors leading-tight ${isComplete(it.id) ? "line-through text-white/25" : "text-white/80 hover:text-white"}`}>
                              {it.title}
                            </p>
                          </Link>
                          <p className="text-[10px] text-zinc-400 font-sans mt-0.5 leading-snug">{it.desc}</p>
                          <p className="text-[9px] font-heading uppercase tracking-widest mt-1" style={{ color: `${cat.accent}CC` }}>⏱ {it.est}</p>
                        </div>
                      </div>
                    ))}

                    {visibleItems.length === 0 && (
                      <p className="text-[10px] text-white/40 font-sans py-3">No items match this filter.</p>
                    )}
                  </div>

                  {/* Quick actions */}
                  <div className="px-5 pb-5 flex gap-2 pt-3 border-t border-white/5">
                    <button
                      onClick={() => { const m = { ...progressMap }; cat.items.forEach(it => { m[it.id] = true; }); setProgressMap(m); }}
                      className="px-3 py-1.5 border border-white/8 font-heading text-[9px] uppercase tracking-widest text-white/45 hover:text-white hover:border-white/30 transition-all">
                      Complete All
                    </button>
                    <button
                      onClick={() => { const m = { ...progressMap }; cat.items.forEach(it => { delete m[it.id]; }); setProgressMap(m); }}
                      className="px-3 py-1.5 border border-white/8 font-heading text-[9px] uppercase tracking-widest text-white/45 hover:text-white hover:border-white/30 transition-all">
                      Reset
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Badges footer — flush editorial box ── */}
          <div className="border-x border-b border-white/6 bg-white/[0.01] px-6 py-6">
            <div className="flex items-center gap-3 mb-5">
              <Trophy className="h-4 w-4 text-white/40" />
              <p className="text-[9px] font-heading uppercase tracking-[0.25em] text-white/50">Badges Earned</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {BADGES.map(({ threshold, label, color }) => {
                const earned = overallPct >= threshold;
                return (
                  <div key={label}
                    className="px-4 py-2 border font-heading text-[10px] uppercase tracking-widest transition-all"
                    style={{
                      borderColor: earned ? `${color}50` : "rgba(255,255,255,0.06)",
                      background:  earned ? `${color}10` : "transparent",
                      color:       earned ? color         : "rgba(255,255,255,0.12)",
                    }}>
                    {label}
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-zinc-400 font-sans">
              Use the Print button to create a printable checklist you can tick on paper.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-black border-t border-white/8 py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Logo size="sm" />
            <p className="text-[10px] text-zinc-400 font-heading uppercase tracking-widest">© 2026 The Calculator App.</p>
          </div>
        </footer>
      </div>
    </>
  );
}