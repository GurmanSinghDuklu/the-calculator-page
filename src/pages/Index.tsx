import { TrendingUp, Percent, Calendar, DollarSign, PiggyBank, Star, Search, Wallet, Home, ArrowLeft, Building2, Landmark } from "lucide-react";
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
    { title: "UK Salary Calculator", description: "Calculate take-home pay after tax and NI", icon: Wallet, path: "/finance/salary", badge: "New", color: "text-accent-blue", border: "hover:border-accent-blue" },
    { title: "Compound Interest", description: "See how your investments grow over time", icon: TrendingUp, path: "/finance/compound-interest", badge: "Trending", color: "text-accent-green", border: "hover:border-accent-green" },
    { title: "Mortgage Payment Calculator", description: "Calculate monthly mortgage payments", icon: Home, path: "/finance/mortgage", badge: "Essential", color: "text-accent-yellow", border: "hover:border-accent-yellow" },
    { title: "Retirement Calculator", description: "Plan your retirement income and pension", icon: PiggyBank, path: "/finance/retirement", badge: "Popular", color: "text-accent-red", border: "hover:border-accent-red" }
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

      {/* Typography Hero */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <p className="text-white/60 text-sm font-sans uppercase tracking-[0.2em] mb-4">Calculator Page</p>
          <h1 className="font-display text-[15vw] leading-[0.8] tracking-tighter select-none">
            <div className="flex justify-center gap-[0.5vw]">
              {["C", "A", "L", "C", "U", "L", "A", "T", "O", "R"].map((letter, i) => (
                <span key={i} className="hover:-translate-y-4 transition-transform duration-500 block text-accent-blue" style={{ transitionDelay: `${i * 50}ms` }}>
                  {letter}
                </span>
              ))}
            </div>
            <div className="text-outline hover:text-white transition-colors duration-500 cursor-default mt-2">
              PAGE
            </div>
          </h1>
          <p className="mt-8 font-heading text-xl text-gray-400 uppercase tracking-widest">& Unit Converters</p>

          {/* Search */}
          <div className="max-w-xl mx-auto mt-16 relative group">
            <Input
              type="text"
              placeholder="WHAT ARE YOU LOOKING FOR?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 border-b-2 border-white/20 rounded-none py-8 text-white placeholder-gray-600 font-heading uppercase tracking-wider focus:ring-0 focus:border-accent-yellow transition-colors text-xl text-center"
            />
            <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-accent-yellow transition-colors h-6 w-6" />

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
        </div>
      </section>

      {/* Category Grid */}
      <main className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Property Section */}
          <Link to="/categories/property" className="group block">
            <div className="border-b border-white/10 pb-6 mb-8 flex justify-between items-end">
              <h2 className="font-display text-5xl text-white">Property</h2>
              <ArrowLeft className="h-10 w-10 text-accent-red group-hover:rotate-[135deg] transition-transform duration-500" />
            </div>
          </Link>

          {/* Finance Section */}
          <Link to="/categories/finance" className="group block">
            <div className="border-b border-white/10 pb-6 mb-8 flex justify-between items-end">
              <h2 className="font-display text-5xl text-white">Finance</h2>
              <ArrowLeft className="h-10 w-10 text-accent-blue group-hover:rotate-[135deg] transition-transform duration-500" />
            </div>
          </Link>

          {/* Everyday Section */}
          <Link to="/categories/everyday" className="group block">
            <div className="border-b border-white/10 pb-6 mb-8 flex justify-between items-end">
              <h2 className="font-display text-5xl text-white">Everyday</h2>
              <ArrowLeft className="h-10 w-10 text-accent-yellow group-hover:rotate-[135deg] transition-transform duration-500" />
            </div>
          </Link>

        </div>
      </main>

      {/* Featured Section */}
      <section className="py-32 border-t border-dark-border bg-dark-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-[8vw] md:text-[6rem] leading-[0.8] text-outline text-outline-hover transition-all duration-700 cursor-default uppercase mb-20">
            Featured <br /><span className="text-white hover:text-accent-cyan transition-colors">Tools</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularCalculatorsAndConversions.map((calc) => (
              <Link key={calc.title} to={calc.path} className={`group bg-dark-bg border border-dark-border p-8 ${calc.border} transition-colors duration-300 relative`}>
                <div className="absolute top-0 right-0 p-4">
                  <Badge className="bg-white text-black text-[10px] font-bold uppercase rounded-none">{calc.badge}</Badge>
                </div>
                <div className={`mb-8 ${calc.color}`}>
                  <calc.icon className="h-10 w-10 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="font-display text-3xl uppercase mb-3 text-white group-hover:translate-x-1 transition-transform">{calc.title}</h3>
                <p className="text-sm text-gray-400 font-sans leading-relaxed border-t border-dashed border-gray-700 pt-4 mt-4">
                  {calc.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

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