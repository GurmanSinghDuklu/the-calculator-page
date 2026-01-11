import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { NavigationMenu } from "@/components/NavigationMenu";

import budgetImage from "@/assets/journey-budget.jpg";
import accumulateImage from "@/assets/journey-accumulate.jpg";
import payoffImage from "@/assets/journey-payoff.jpg";
import investImage from "@/assets/journey-invest.jpg";
import thriveImage from "@/assets/journey-thrive.jpg";

const STORAGE_KEY = "financialJourney.progress.v1";

const DEFAULT_DATA = [
  {
    id: "budget",
    title: "Budget",
    color: "bg-rose-500",
    description: "Build control and visibility over your cashflow",
    image: budgetImage,
    items: [
      { id: "where-money-goes", title: "Where Your Money Really Goes", desc: "Track spending for 30 days and categorize.", est: "15–30 min", path: "/learn/where-money-goes" },
      { id: "50-30-20", title: "50/30/20 Budget Made Personal", desc: "Adapt the classic rule to your life.", est: "20 min", path: "/learn/50-30-20-budget" },
      { id: "automate-finances", title: "Automate Your Finances Like a Pro", desc: "Standing orders, automations and friction reduction.", est: "20 min", path: "/learn/automate-finances" },
      { id: "budget-for-irregular", title: "Budgeting for Unexpected Costs", desc: "Plan for irregular and unexpected expenses.", est: "15 min", path: "/learn/budget-irregular-costs" },
      { id: "monthly-dashboard", title: "Your Monthly Financial Dashboard", desc: "Monthly KPI review and adjustments.", est: "20 min", path: "/learn/monthly-dashboard" }
    ]
  },
  {
    id: "accumulate",
    title: "Accumulate",
    color: "bg-sky-500",
    description: "Grow your cushion and start saving effectively",
    image: accumulateImage,
    items: [
      { id: "emergency-fund", title: "Building an Emergency Fund That Works", desc: "Target 3–6 months' expenses.", est: "30–60 min", path: "/learn/emergency-fund" },
      { id: "choose-savings", title: "How to Choose the Right Savings Account (UK)", desc: "ISA vs regular saving — where to park cash.", est: "20 min", path: "/learn/choose-savings-account" },
      { id: "inflation", title: "Inflation: The Silent Thief", desc: "Understand real returns and protecting buying power.", est: "15 min", path: "/learn/inflation-guide" },
      { id: "first-1000", title: "Your First £1,000: Turning Saving Into a Habit", desc: "Gamified habit-building approach.", est: "10–20 min", path: "/learn/first-1000" }
    ]
  },
  {
    id: "payoff",
    title: "Pay Off",
    color: "bg-amber-500",
    description: "Clear toxic debt and gain financial freedom",
    image: payoffImage,
    items: [
      { id: "debt-landscape", title: "Understanding Your Debt Landscape", desc: "List, categorise and prioritise debts.", est: "30 min", path: "/learn/debt-landscape" },
      { id: "snowball-avalanche", title: "Snowball vs Avalanche", desc: "Two payoff strategies with worked examples.", est: "20–40 min", path: "/learn/snowball-avalanche" },
      { id: "interest-visual", title: "How Interest Eats Your Wealth", desc: "Reverse compounding visual guide.", est: "15 min", path: "/learn/interest-impact" },
      { id: "credit-scores", title: "Credit Scores and Borrowing Wisely", desc: "Build or repair credit health.", est: "20 min", path: "/learn/credit-scores" }
    ]
  },
  {
    id: "invest",
    title: "Invest",
    color: "bg-emerald-500",
    description: "Make your money work with long-term strategies",
    image: investImage,
    items: [
      { id: "before-invest", title: "What to Do Before You Invest", desc: "Risk tolerance, goals and timelines checklist.", est: "20–30 min", path: "/learn/before-you-invest" },
      { id: "basics-investing", title: "Basics of Investing: Stocks, Bonds & ETFs", desc: "Core primer for new investors.", est: "30–45 min", path: "/learn/investing-basics" },
      { id: "build-portfolio", title: "How to Build a Balanced Portfolio", desc: "Sample portfolios by risk profile.", est: "30 min", path: "/learn/build-portfolio" },
      { id: "long-term-vs-trading", title: "Long-Term Investing vs Trading", desc: "Psychology and behaviour guidance.", est: "20 min", path: "/learn/investing-vs-trading" },
      { id: "tax-efficient", title: "Tax-Efficient Accounts (ISAs, SIPPs)", desc: "UK-specific tax wrappers explained.", est: "25 min", path: "/learn/tax-efficient-accounts" },
      { id: "rebalancing", title: "How to Rebalance and Review Your Portfolio", desc: "Discipline and management best practices.", est: "20 min", path: "/learn/portfolio-rebalancing" }
    ]
  },
  {
    id: "thrive",
    title: "Thrive",
    color: "bg-violet-500",
    description: "Protect, give and pass forward wealth",
    image: thriveImage,
    items: [
      { id: "define-freedom", title: "Financial Freedom: Defining Your End Goal", desc: "Personalised freedom vs FIRE models.", est: "30 min", path: "/learn/financial-freedom" },
      { id: "protect-wealth", title: "Protecting Your Wealth (Insurance & Wills)", desc: "Risk management and family protection.", est: "20–30 min", path: "/learn/protect-wealth" },
      { id: "ethical", title: "Giving Back and Ethical Investing", desc: "Purpose-driven wealth allocation.", est: "20 min", path: "/learn/ethical-investing" },
      { id: "teach-others", title: "How to Teach Money Skills to Others", desc: "Share and multiply your impact.", est: "15–25 min", path: "/learn/teach-money-skills" }
    ]
  }
];

export default function FinancialJourney() {
  const [progressMap, setProgressMap] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Validate that parsed data is an object with boolean values
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          const validated: Record<string, boolean> = {};
          for (const [key, value] of Object.entries(parsed)) {
            if (typeof key === 'string' && typeof value === 'boolean') {
              validated[key] = value;
            }
          }
          setProgressMap(validated);
        } else {
          // Invalid data structure, reset
          console.warn("Invalid progress data structure, resetting");
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (e) {
      console.error("Unable to load progress from storage", e);
      // Clear corrupted data
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progressMap));
    } catch (e) {
      console.error("Unable to save progress", e);
    }
  }, [progressMap]);

  const isItemComplete = (itemId: string) => !!progressMap[itemId];

  const toggleItem = (itemId: string) => {
    setProgressMap((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const resetAll = () => {
    if (!confirm("Reset all progress? This action cannot be undone.")) return;
    setProgressMap({});
  };

  const getCategoryProgress = (category: typeof DEFAULT_DATA[0]) => {
    const total = category.items.length;
    const done = category.items.filter((it) => isItemComplete(it.id)).length;
    return { total, done, pct: Math.round((done / total) * 100) };
  };

  const getOverallProgress = () => {
    const allItems = DEFAULT_DATA.flatMap((c) => c.items);
    const total = allItems.length;
    const done = allItems.filter((it) => isItemComplete(it.id)).length;
    return { total, done, pct: Math.round((done / total) * 100) };
  };

  const isCategoryUnlocked = () => {
    return true; // All categories always unlocked
  };

  const overall = getOverallProgress();

  return (
    <>
      <SEO
        title="Financial Growth Journey - Free Personal Finance Education"
        description="Follow a structured path from budgeting basics to confident investing. Interactive financial education with progress tracking for UK beginners."
        keywords="financial education, personal finance guide, budgeting for beginners, investing basics, debt payoff strategies, UK financial planning"
        canonicalUrl="/learn/financial-journey"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Header */}
        <header className="border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link to="/home" className="flex items-center gap-3 group">
                <div className="flex flex-col">
                  <span className="font-serif text-xl md:text-2xl font-normal text-foreground tracking-tight leading-none">
                    Calculator
                  </span>
                  <span className="text-base md:text-lg tracking-[0.08em] text-foreground uppercase font-serif font-bold">
                    PAGE
                  </span>
                </div>
              </Link>
              <div className="flex items-center gap-4">
                <Link to="/home">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Back</span>
                  </Button>
                </Link>
                <NavigationMenu />
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <header className="flex flex-col md:flex-row items-start justify-between gap-4 mb-8">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-normal mb-3 tracking-tight">Financial Growth Journey</h1>
              <p className="text-muted-foreground max-w-2xl leading-relaxed">
                Follow the path from beginner to confident investor. Tick off each topic as you complete it.
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground mb-2">Overall progress</div>
              <div className="w-56 bg-secondary rounded-full h-3 overflow-hidden shadow-inner">
                <div 
                  className="h-3 rounded-full bg-gradient-to-r from-chart-2 to-chart-1 transition-all duration-500" 
                  style={{ width: `${overall.pct}%` }} 
                />
              </div>
              <div className="text-sm font-medium mt-2">
                {overall.done} / {overall.total} completed ({overall.pct}%)
              </div>
            </div>
          </header>

          <div className="flex flex-wrap gap-3 items-center mb-6">
            <Button onClick={() => window.print()} variant="outline" size="sm">
              Print Roadmap
            </Button>
            <Button onClick={resetAll} variant="outline" size="sm">
              Reset Progress
            </Button>
            <div className="ml-auto flex items-center gap-3">
              <label className="text-sm text-muted-foreground">Filter:</label>
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)} 
                className="text-sm border border-input bg-background rounded-md px-2 py-1"
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="todo">To do</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {DEFAULT_DATA.map((cat) => {
              const catProg = getCategoryProgress(cat);
              const unlocked = isCategoryUnlocked();

              const visibleItems = cat.items.filter((it) => {
                if (filter === "all") return true;
                if (filter === "completed") return isItemComplete(it.id);
                if (filter === "todo") return !isItemComplete(it.id);
                return true;
              });

              return (
                <div key={cat.id} className="bg-card rounded-lg shadow-lg border border-border overflow-hidden group hover:shadow-xl transition-all duration-300">
                  {/* Hero Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={cat.image} 
                      alt={`${cat.title} - Financial Journey`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                    <div className={`absolute top-3 left-3 w-1 h-12 rounded ${cat.color} shadow-lg`} />
                    <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2 text-right border border-border">
                      <div className="text-sm font-bold">{catProg.pct}%</div>
                      <div className="text-xs text-muted-foreground">{catProg.done}/{catProg.total}</div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5">
                    <div className="mb-4">
                      <h2 className="font-serif text-xl font-normal mb-1">{cat.title}</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">{cat.description}</p>
                    </div>

                    <div className="space-y-2">
                      {visibleItems.map((it) => (
                        <div key={it.id} className="flex items-start gap-3 p-2 rounded hover:bg-muted/50 transition-colors">
                          <input
                            type="checkbox"
                            checked={isItemComplete(it.id)}
                            onChange={() => toggleItem(it.id)}
                            className="mt-1 w-4 h-4 rounded accent-primary"
                            id={it.id}
                          />
                          <label htmlFor={it.id} className="flex-1 cursor-pointer">
                            <Link to={it.path} className="block hover:text-primary transition-colors">
                              <div className="text-sm font-medium">{it.title}</div>
                              <div className="text-xs text-muted-foreground">{it.desc}</div>
                              <div className="text-xs text-muted-foreground mt-1">⏱️ {it.est}</div>
                            </Link>
                          </label>
                        </div>
                      ))}

                      {visibleItems.length === 0 && (
                        <div className="p-2 text-xs text-muted-foreground">No items match this filter.</div>
                      )}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button
                          onClick={() => {
                            const newMap = { ...progressMap };
                            cat.items.forEach((it) => { newMap[it.id] = true; });
                            setProgressMap(newMap);
                          }}
                          variant="outline"
                          size="sm"
                        >
                          Complete All
                        </Button>
                        <Button
                          onClick={() => {
                            const newMap = { ...progressMap };
                            cat.items.forEach((it) => { delete newMap[it.id]; });
                            setProgressMap(newMap);
                          }}
                          variant="outline"
                          size="sm"
                        >
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <footer className="mt-8 p-6 rounded-lg bg-card border border-border">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex-1 text-sm font-medium">Badges earned:</div>
              <div className="flex flex-wrap items-center gap-2">
                {overall.pct >= 20 && <span className="px-3 py-1 rounded-full text-xs bg-rose-500/10 text-rose-700 dark:text-rose-300 font-medium">🎯 Budget Master</span>}
                {overall.pct >= 40 && <span className="px-3 py-1 rounded-full text-xs bg-sky-500/10 text-sky-700 dark:text-sky-300 font-medium">💰 Cushion Builder</span>}
                {overall.pct >= 70 && <span className="px-3 py-1 rounded-full text-xs bg-amber-500/10 text-amber-700 dark:text-amber-300 font-medium">⚔️ Debt Slayer</span>}
                {overall.pct === 100 && <span className="px-3 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-medium">🏆 Financial Pro</span>}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              💡 Tip: Use the Print Roadmap button to create a printable checklist you can tick on paper.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
