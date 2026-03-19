import { TrendingUp, Search, Wallet, Home, ArrowRight, PiggyBank, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";
import { NavigationMenu } from "@/components/NavigationMenu";
import { Logo } from "@/components/Logo";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const popularCalculatorsAndConversions = [
    { title: "UK Salary Calculator", description: "Calculate take-home pay after tax and NI", icon: Wallet, path: "/finance/salary", badge: "New", color: "text-accent-blue", border: "hover:border-accent-blue", accent: "group-hover:bg-accent-blue/5" },
    { title: "Compound Interest", description: "See how your investments grow over time", icon: TrendingUp, path: "/finance/compound-interest", badge: "Trending", color: "text-accent-green", border: "hover:border-accent-green", accent: "group-hover:bg-accent-green/5" },
    { title: "Mortgage Payment Calculator", description: "Calculate monthly mortgage payments", icon: Home, path: "/finance/mortgage", badge: "Essential", color: "text-accent-yellow", border: "hover:border-accent-yellow", accent: "group-hover:bg-accent-yellow/5" },
    { title: "Retirement Calculator", description: "Plan your retirement income and pension", icon: PiggyBank, path: "/finance/retirement", badge: "Popular", color: "text-accent-red", border: "hover:border-accent-red", accent: "group-hover:bg-accent-red/5" }
  ];

  const homeCalculators = [
    { title: "Mortgage Calculator", path: "/finance/mortgage" },
    { title: "Weekly Mortgage", path: "/finance/weekly-mortgage" },
    { title: "Mortgage Overpayment", path: "/finance/mortgage-overpayment" },
    { title: "Stamp Duty Calculator", path: "/finance/stamp-duty" },
    { title: "Future House Value", path: "/finance/future-house-value" }
  ];

  const financeCalculators = [
    { title: "UK Salary Calculator", path: "/finance/salary" },
    { title: "Compound Interest", path: "/finance/compound-interest" },
    { title: "APY Calculator", path: "/finance/apy" },
    { title: "Budget Calculator", path: "/finance/budget" },
    { title: "Car Loan Calculator", path: "/finance/car-loan" },
    { title: "Loan Calculator", path: "/finance/loan" },
    { title: "Savings Calculator", path: "/finance/savings" },
    { title: "Simple Interest", path: "/finance/simple-interest" }
  ];

  const miscCalculators = [
    { title: "Percentage Calculator", path: "/misc/percentage" },
    { title: "Age Calculator", path: "/misc/age" },
    { title: "Discount Calculator", path: "/misc/discount" },
    { title: "Tip Calculator", path: "/misc/tip" }
  ];

  const allCalculators = [...financeCalculators, ...homeCalculators, ...miscCalculators];

  return (
    <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-accent-yellow selection:text-black">
      <SEO
        title="The Calculator Page - Free UK Financial Calculators"
        description="Free UK financial calculators for mortgages, compound interest, salary, retirement, and more. No signup required. Instant results."
        canonicalUrl="https://www.thecalculatorpage.com"
      />

      <header className="border-b border-dark-border bg-dark-bg/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo size="sm" linkTo="/" />
          <div className="flex items-center gap-8">
            <NavigationMenu />
            <a className="hidden md:flex font-heading text-sm font-bold uppercase tracking-widest color-cycle transition-colors" href="mailto:thecalculatorpage@gmail.com">
            <span>t</span><span>h</span><span>e</span><span>c</span><span>a</span><span>l</span><span>c</span><span>u</span><span>l</span><span>a</span><span>t</span><span>o</span><span>r</span><span>p</span><span>a</span><span>g</span><span>e</span><span>@</span><span>g</span><span>m</span><span>a</span><span>i</span><span>l</span><span>.</span><span>c</span><span>o</span><span>m</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero — compact, above-the-fold */}
      <section className="relative pt-14 pb-10 px-6 overflow-hidden border-b border-dark-border">
        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-blue/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

            {/* Left: Title block */}
            <div className="flex-1">
              <p className="text-white/40 text-xs font-sans uppercase tracking-[0.3em] mb-3">Calculator Page</p>
              <h1 className="font-display leading-[0.82] tracking-tighter select-none">
                <div className="flex gap-[0.3vw]">
                  {["C", "A", "L", "C", "U", "L", "A", "T", "O", "R"].map((letter, i) => (
                    <span key={i} className="hover:-translate-y-3 transition-transform duration-500 block text-accent-blue text-[9vw] md:text-[7vw] lg:text-[5.5vw]" style={{ transitionDelay: `${i * 40}ms` }}>
                      {letter}
                    </span>
                  ))}
                </div>
                <div className="text-outline hover:text-white transition-colors duration-500 cursor-default mt-1 text-[9vw] md:text-[7vw] lg:text-[5.5vw]">
                  PAGE
                </div>
              </h1>
              <p className="mt-4 font-heading text-sm text-gray-500 uppercase tracking-widest">& Unit Converters</p>
            </div>

            {/* Right: Search + stat pills */}
            <div className="flex-1 max-w-lg">
              <div className="relative group mb-5">
                <Input
                  type="text"
                  placeholder="WHAT ARE YOU LOOKING FOR?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-0 border-b-2 border-white/20 rounded-none py-6 text-white placeholder-gray-600 font-heading uppercase tracking-wider focus:ring-0 focus:border-accent-yellow transition-colors text-base text-center"
                />
                <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-accent-yellow transition-colors h-5 w-5" />

                {searchQuery && (
                  <div className="absolute w-full mt-2 bg-dark-card border border-dark-border rounded shadow-2xl z-50 text-left overflow-hidden">
                    {allCalculators
                      .filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
                      .slice(0, 6)
                      .map(calc => (
                        <Link
                          key={`search-${calc.title}`}
                          to={calc.path}
                          className="block p-4 hover:bg-white hover:text-black border-b border-dark-border last:border-0 font-heading uppercase tracking-tight transition-colors"
                          onClick={() => setSearchQuery("")}
                        >
                          {calc.title}
                        </Link>
                      ))}
                  </div>
                )}
              </div>

              {/* Quick stat pills */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[11px] font-heading uppercase tracking-widest text-white/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-green inline-block" />
                  70+ Free Calculators
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[11px] font-heading uppercase tracking-widest text-white/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-blue inline-block" />
                  No Signup Required
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[11px] font-heading uppercase tracking-widest text-white/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow inline-block" />
                  Instant Results
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Tools — immediately after hero, above the fold */}
      <section className="py-14 px-6 border-b border-dark-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-display text-3xl md:text-4xl uppercase text-white tracking-tight">
              Featured <span className="text-accent-green">Tools</span>
            </h2>
            <span className="text-xs font-heading uppercase tracking-widest text-white/30">Most Used</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularCalculatorsAndConversions.map((calc) => (
              <Link key={calc.title} to={calc.path} className={`group bg-dark-bg border border-dark-border ${calc.border} ${calc.accent} transition-all duration-300 relative p-6 flex flex-col`}>
                <div className="absolute top-0 right-0 p-3">
                  <Badge className="bg-white text-black text-[9px] font-bold uppercase rounded-none">{calc.badge}</Badge>
                </div>
                <div className={`mb-5 ${calc.color}`}>
                  <calc.icon className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="font-display text-2xl uppercase mb-2 text-white group-hover:translate-x-1 transition-transform leading-tight">{calc.title}</h3>
                <p className="text-xs text-gray-500 font-sans leading-relaxed border-t border-dashed border-gray-800 pt-3 mt-auto">
                  {calc.description}
                </p>
                <div className={`flex items-center gap-1 mt-3 text-xs font-heading uppercase tracking-widest ${calc.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Open <ChevronRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category Grid — with visible calculator lists */}
      <main className="max-w-7xl mx-auto px-6 py-14 w-full">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white tracking-tight">Browse <span className="text-outline">Categories</span></h2>
          <span className="text-xs font-heading uppercase tracking-widest text-white/30">All Calculators</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Property Section */}
          <div className="group border border-dark-border hover:border-accent-red/40 transition-colors duration-300 p-6">
            <Link to="/categories/property" className="block mb-5">
              <div className="flex justify-between items-center">
                <h2 className="font-display text-4xl text-white group-hover:text-accent-red transition-colors duration-300">Property</h2>
                <ArrowRight className="h-6 w-6 text-accent-red opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <div className="h-px bg-accent-red/20 mt-3 group-hover:bg-accent-red/60 transition-colors" />
            </Link>
            <ul className="space-y-1.5">
              {homeCalculators.map(calc => (
                <li key={calc.path}>
                  <Link to={calc.path} className="flex items-center justify-between py-2 px-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all rounded group/item">
                    <span className="font-heading uppercase tracking-wide text-xs">{calc.title}</span>
                    <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover/item:opacity-100 transition-opacity text-accent-red" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Finance Section */}
          <div className="group border border-dark-border hover:border-accent-blue/40 transition-colors duration-300 p-6">
            <Link to="/categories/finance" className="block mb-5">
              <div className="flex justify-between items-center">
                <h2 className="font-display text-4xl text-white group-hover:text-accent-blue transition-colors duration-300">Finance</h2>
                <ArrowRight className="h-6 w-6 text-accent-blue opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <div className="h-px bg-accent-blue/20 mt-3 group-hover:bg-accent-blue/60 transition-colors" />
            </Link>
            <ul className="space-y-1.5">
              {financeCalculators.slice(0, 6).map(calc => (
                <li key={calc.path}>
                  <Link to={calc.path} className="flex items-center justify-between py-2 px-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all rounded group/item">
                    <span className="font-heading uppercase tracking-wide text-xs">{calc.title}</span>
                    <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover/item:opacity-100 transition-opacity text-accent-blue" />
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/categories/finance" className="flex items-center gap-1 py-2 px-3 text-xs text-accent-blue/60 hover:text-accent-blue transition-colors font-heading uppercase tracking-widest">
                  View all <ChevronRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Everyday Section */}
          <div className="group border border-dark-border hover:border-accent-yellow/40 transition-colors duration-300 p-6">
            <Link to="/categories/everyday" className="block mb-5">
              <div className="flex justify-between items-center">
                <h2 className="font-display text-4xl text-white group-hover:text-accent-yellow transition-colors duration-300">Everyday</h2>
                <ArrowRight className="h-6 w-6 text-accent-yellow opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <div className="h-px bg-accent-yellow/20 mt-3 group-hover:bg-accent-yellow/60 transition-colors" />
            </Link>
            <ul className="space-y-1.5">
              {miscCalculators.map(calc => (
                <li key={calc.path}>
                  <Link to={calc.path} className="flex items-center justify-between py-2 px-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all rounded group/item">
                    <span className="font-heading uppercase tracking-wide text-xs">{calc.title}</span>
                    <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover/item:opacity-100 transition-opacity text-accent-yellow" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white pt-20 border-t border-dark-border mt-auto">
        <div className="max-w-7xl mx-auto px-6 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

            {/* Logo */}
            <div className="flex flex-col gap-1">
              <span className="font-display text-6xl tracking-tighter text-accent-blue">THE</span>
              <span className="font-display text-6xl tracking-tighter text-accent-green">CALC</span>
              <span className="font-display text-6xl tracking-tighter text-outline">PAGE</span>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-white text-lg uppercase tracking-widest">Categories</h3>
              <div className="space-y-3">
                <p className="text-xs font-heading uppercase tracking-widest text-white/30">Finance</p>
                <ul className="space-y-2">
                  <li><Link to="/finance/compound-interest" className="text-sm text-gray-400 hover:text-white transition-colors">Compound Interest</Link></li>
                  <li><Link to="/finance/mortgage" className="text-sm text-gray-400 hover:text-white transition-colors">Mortgage</Link></li>
                  <li><Link to="/finance/loan" className="text-sm text-gray-400 hover:text-white transition-colors">Loan</Link></li>
                  <li><Link to="/finance/salary" className="text-sm text-gray-400 hover:text-white transition-colors">Salary</Link></li>
                  <li><Link to="/finance/retirement" className="text-sm text-gray-400 hover:text-white transition-colors">Retirement</Link></li>
                </ul>
                <p className="text-xs font-heading uppercase tracking-widest text-white/30 pt-2">Everyday</p>
                <ul className="space-y-2">
                  <li><Link to="/misc/percentage-of" className="text-sm text-gray-400 hover:text-white transition-colors">Percentage Of</Link></li>
                  <li><Link to="/misc/percentage-change" className="text-sm text-gray-400 hover:text-white transition-colors">Percentage Change</Link></li>
                  <li><Link to="/misc/discount" className="text-sm text-gray-400 hover:text-white transition-colors">Discount</Link></li>
                  <li><Link to="/misc/age" className="text-sm text-gray-400 hover:text-white transition-colors">Age</Link></li>
                </ul>
              </div>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-white text-lg uppercase tracking-widest">Resources</h3>
              <div className="space-y-3">
                <p className="text-xs font-heading uppercase tracking-widest text-white/30">Learn Hub</p>
                <ul className="space-y-2">
                  <li><Link to="/learn" className="text-sm text-gray-400 hover:text-white transition-colors">All Articles</Link></li>
                  <li><Link to="/learn/financial-journey" className="text-sm text-gray-400 hover:text-white transition-colors">Financial Journey</Link></li>
                  <li><Link to="/learn/50-30-20-budget" className="text-sm text-gray-400 hover:text-white transition-colors">50/30/20 Budget</Link></li>
                  <li><Link to="/learn/emergency-fund" className="text-sm text-gray-400 hover:text-white transition-colors">Emergency Fund</Link></li>
                </ul>
                <p className="text-xs font-heading uppercase tracking-widest text-white/30 pt-2">Tools</p>
                <ul className="space-y-2">
                  <li><Link to="/formulas" className="text-sm text-gray-400 hover:text-white transition-colors">Formula Directory</Link></li>
                  <li><Link to="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                </ul>
              </div>
            </div>

            {/* Legal & Contact */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="font-heading font-semibold text-white text-lg uppercase tracking-widest">Legal & About</h3>
                <ul className="space-y-2">
                  <li><Link to="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                  <li><Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/cookies" className="text-sm text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
                  <li><Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Use</Link></li>
                  <li><Link to="/disclaimer" className="text-sm text-gray-400 hover:text-white transition-colors">Disclaimer</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-heading font-semibold text-white text-lg uppercase tracking-widest">Contact</h3>
                <a href="mailto:thecalculatorpage@gmail.com" className="text-sm text-gray-400 hover:text-white transition-colors block">
                  thecalculatorpage@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500 uppercase tracking-widest">© 2026 The Calculator Page.</p>
            <p className="text-[10px] text-gray-600 max-w-sm text-center md:text-right">*All calculations are for informational purposes only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
