import { TrendingUp, Search, Wallet, Home, ArrowRight, PiggyBank, ChevronRight, BookOpen, FileText, RefreshCw, Repeat, Building2 } from "lucide-react";
import { BackToTop } from "@/components/BackToTop";
import { Link } from "react-router-dom";
import { getByMarket } from "@/data/most-searched";
import { MostSearchedCard } from "@/components/most-searched/MostSearchedCard";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";
import { NavigationMenu } from "@/components/NavigationMenu";
import { Logo } from "@/components/Logo";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [msMarket, setMsMarket] = useState<"uk" | "us">("uk");
  const featured = getByMarket(msMarket).slice(0, 6);

  const popularCalculatorsAndConversions = [
    { title: "UK Salary Calculator", description: "Calculate take-home pay after tax and NI", icon: Wallet, path: "/finance/salary", badge: "", color: "text-accent-blue", border: "hover:border-accent-blue", accent: "group-hover:bg-accent-blue/10" },
    { title: "Compound Interest", description: "See how your investments grow over time", icon: TrendingUp, path: "/finance/compound-interest", badge: "", color: "text-accent-green", border: "hover:border-accent-green", accent: "group-hover:bg-accent-green/10" },
    { title: "Mortgage Payment Calculator", description: "Calculate monthly mortgage payments", icon: Home, path: "/finance/mortgage", badge: "", color: "text-accent-yellow", border: "hover:border-accent-yellow", accent: "group-hover:bg-accent-yellow/10" },
    { title: "Retirement Calculator", description: "Plan your retirement income and pension", icon: PiggyBank, path: "/finance/retirement", badge: "Popular", color: "text-accent-red", border: "hover:border-accent-red", accent: "group-hover:bg-accent-red/10" }
  ];

  const mortgageCalculators = [
    { title: "Mortgage Calculator", path: "/finance/mortgage" },
    { title: "What Salary Do I Need?", path: "/mortgages/salary-for-mortgage" },
    { title: "Mortgage Overpayment", path: "/finance/mortgage-overpayment" },
    { title: "Stamp Duty Calculator", path: "/finance/stamp-duty" },
    { title: "Mortgage Comparison", path: "/finance/mortgage-cost-comparison" },
    { title: "Weekly Mortgage", path: "/finance/weekly-mortgage" },
    { title: "Future House Value", path: "/finance/future-house-value" },
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
    { title: "Simple Interest", path: "/finance/simple-interest" },
    { title: "VAT Calculator", path: "/finance/vat-calculator" },
    { title: "ISA Calculator", path: "/finance/isa-calculator" },
    { title: "Capital Gains Tax", path: "/finance/capital-gains-tax" },
    { title: "Inheritance Tax", path: "/finance/inheritance-tax" },
  ];

  const miscCalculators = [
    { title: "Percentage Calculator", path: "/misc/percentage" },
    { title: "Age Calculator", path: "/misc/age" },
    { title: "Discount Calculator", path: "/misc/discount" },
    { title: "Tip Calculator", path: "/misc/tip" },
    { title: "BMI Calculator", path: "/misc/bmi-calculator" },
    { title: "Calorie Calculator", path: "/misc/calorie-calculator" },
    { title: "Days From Today", path: "/misc/days-from-today" },
    { title: "Days Between Dates", path: "/misc/days-between-dates" },
    { title: "Months Between Dates", path: "/misc/months-between-dates" },
    { title: "Hours Calculator", path: "/misc/hours-calculator" },
    { title: "Working Days Calculator", path: "/misc/working-days" },
    { title: "Square Footage Calculator", path: "/misc/square-footage" },
    { title: "Cubic Yards Calculator", path: "/misc/cubic-yards" },
    { title: "Gravel Calculator", path: "/misc/gravel-calculator" },
    { title: "Mulch Calculator", path: "/misc/mulch-calculator" },
    { title: "Concrete Calculator", path: "/misc/concrete-calculator" },
  ];

  const converterCalculators = [
    { title: "KM to Miles", path: "/converters/km-to-miles" },
    { title: "Gallons to Litres", path: "/converters/gallons-to-litres" },
    { title: "ML to Oz", path: "/converters/ml-to-oz" },
    { title: "CM to Inches", path: "/converters/cm-to-inches" },
    { title: "Inches to CM", path: "/converters/inches-to-cm" },
    { title: "Metres to Feet", path: "/converters/metres-to-feet" },
    { title: "LBS to KG", path: "/converters/lbs-to-kg" },
    { title: "Stone to KG", path: "/converters/stone-to-kg" },
    { title: "Fahrenheit to Celsius", path: "/converters/fahrenheit-to-celsius" },
    { title: "Cups to Grams", path: "/converters/cups-to-grams" },
    { title: "Grams to Tablespoons", path: "/converters/grams-to-tablespoons" },
    { title: "Ounces to Grams", path: "/converters/ounces-to-grams" },
    { title: "Teaspoons to ML", path: "/converters/teaspoons-to-ml" },
  ];

  const allFinanceCalcs = [
    { title: "UK Salary Calculator", path: "/finance/salary", desc: "Take-home pay after tax and NI" },
    { title: "Compound Interest", path: "/finance/compound-interest", desc: "How your money grows over time" },
    { title: "Mortgage Calculator", path: "/finance/mortgage", desc: "Monthly mortgage repayments" },
    { title: "Mortgage Overpayment", path: "/finance/mortgage-overpayment", desc: "Save interest by overpaying" },
    { title: "Mortgage Cost Comparison", path: "/finance/mortgage-cost-comparison", desc: "Compare mortgage deals side by side" },
    { title: "Weekly Mortgage", path: "/finance/weekly-mortgage", desc: "Weekly equivalent of your mortgage" },
    { title: "Stamp Duty Calculator", path: "/finance/stamp-duty", desc: "SDLT on UK property purchases" },
    { title: "Future House Value", path: "/finance/future-house-value", desc: "Project your property's future value" },
    { title: "Loan Calculator", path: "/finance/loan", desc: "Monthly repayments on personal loans" },
    { title: "Car Loan Calculator", path: "/finance/car-loan", desc: "Finance costs on a vehicle" },
    { title: "Savings Calculator", path: "/finance/savings", desc: "Watch your savings pot grow" },
    { title: "ISA Calculator", path: "/finance/isa-calculator", desc: "Cash ISA, Stocks & Shares and LISA" },
    { title: "APY Calculator", path: "/finance/apy", desc: "Convert APR to AER and compare rates" },
    { title: "Simple Interest", path: "/finance/simple-interest", desc: "Basic interest without compounding" },
    { title: "Budget Calculator", path: "/finance/budget", desc: "Track income vs spending by category" },
    { title: "VAT Calculator", path: "/finance/vat-calculator", desc: "Add or remove UK VAT instantly" },
    { title: "Capital Gains Tax", path: "/finance/capital-gains-tax", desc: "CGT on UK assets and investments" },
    { title: "Inheritance Tax", path: "/finance/inheritance-tax", desc: "IHT thresholds and liability" },
    { title: "Retirement Calculator", path: "/finance/retirement", desc: "Plan pension and retirement income" },
    { title: "US Salary Calculator", path: "/finance/us-salary", desc: "Federal tax, FICA and state tax" },
    { title: "Credit Card Payoff", path: "/finance/credit-card-payoff", desc: "Time and cost to clear card debt" },
    { title: "IRR Calculator", path: "/finance/irr", desc: "Internal rate of return on projects" },
  ];

  const allMiscCalcs = [
    { title: "Percentage Calculator", path: "/misc/percentage", desc: "Percentage of, change, and difference" },
    { title: "Age Calculator", path: "/misc/age", desc: "Exact age in years, months and days" },
    { title: "Discount Calculator", path: "/misc/discount", desc: "Final price after any % discount" },
    { title: "Tip Calculator", path: "/misc/tip", desc: "Split bills and calculate tips" },
    { title: "BMI Calculator", path: "/misc/bmi-calculator", desc: "Body Mass Index and healthy range" },
    { title: "Calorie Calculator", path: "/misc/calorie-calculator", desc: "Daily calorie needs by activity" },
    { title: "Days From Today", path: "/misc/days-from-today", desc: "What date is N days from now?" },
    { title: "Days Between Dates", path: "/misc/days-between-dates", desc: "Exact days between two dates" },
    { title: "Months Between Dates", path: "/misc/months-between-dates", desc: "Months and days between dates" },
    { title: "Hours Calculator", path: "/misc/hours-calculator", desc: "Add or subtract hours and minutes" },
    { title: "Working Days Calculator", path: "/misc/working-days", desc: "Business days excluding weekends" },
    { title: "Square Footage Calculator", path: "/misc/square-footage", desc: "Area in sq ft for any room or space" },
    { title: "Cubic Yards Calculator", path: "/misc/cubic-yards", desc: "Volume for landscaping projects" },
    { title: "Gravel Calculator", path: "/misc/gravel-calculator", desc: "Tonnes of gravel for a given area" },
    { title: "Mulch Calculator", path: "/misc/mulch-calculator", desc: "Bags of mulch needed for garden beds" },
    { title: "Concrete Calculator", path: "/misc/concrete-calculator", desc: "Cubic metres of concrete needed" },
  ];

  const allConverters = [
    { title: "KM to Miles", path: "/converters/km-to-miles", desc: "Kilometres to miles conversion" },
    { title: "Gallons to Litres", path: "/converters/gallons-to-litres", desc: "US and UK gallons to litres" },
    { title: "ML to Oz", path: "/converters/ml-to-oz", desc: "Millilitres to fluid ounces" },
    { title: "CM to Inches", path: "/converters/cm-to-inches", desc: "Centimetres to inches" },
    { title: "Inches to CM", path: "/converters/inches-to-cm", desc: "Inches to centimetres" },
    { title: "Metres to Feet", path: "/converters/metres-to-feet", desc: "Metres to feet and inches" },
    { title: "LBS to KG", path: "/converters/lbs-to-kg", desc: "Pounds to kilograms" },
    { title: "Stone to KG", path: "/converters/stone-to-kg", desc: "Stone and pounds to kilograms" },
    { title: "Fahrenheit to Celsius", path: "/converters/fahrenheit-to-celsius", desc: "Temperature conversion" },
    { title: "Cups to Grams", path: "/converters/cups-to-grams", desc: "Baking measurement conversion" },
    { title: "Grams to Tablespoons", path: "/converters/grams-to-tablespoons", desc: "Cooking weight to volume" },
    { title: "Ounces to Grams", path: "/converters/ounces-to-grams", desc: "Imperial to metric weight" },
    { title: "Teaspoons to ML", path: "/converters/teaspoons-to-ml", desc: "Volume for recipes and medicine" },
  ];

  const blogPosts = [
    { title: "The Mortgage Cheat Code", path: "/blog/mortgage-cheat-code", category: "Property" },
    { title: "Weekly vs Monthly Investing — The $147k Difference", path: "/blog/weekly-vs-monthly-investing", category: "Investing" },
    { title: "How Much Can I Borrow for a Mortgage?", path: "/blog/how-much-can-i-borrow-mortgage-uk", category: "Property" },
    { title: "Fixed vs Tracker Mortgage", path: "/blog/fixed-vs-tracker-mortgage", category: "Property" },
    { title: "What Is LTV on a Mortgage?", path: "/blog/what-is-ltv-mortgage", category: "Property" },
    { title: "Pay Off Your Mortgage Early", path: "/blog/pay-off-mortgage-early", category: "Property" },
    { title: "Stamp Duty UK 2026", path: "/blog/stamp-duty-uk-2025", category: "Property" },
    { title: "First Time Buyer Guide UK 2026", path: "/blog/first-time-buyer-uk-2025", category: "Property" },
    { title: "UK Tax Brackets 2025", path: "/blog/uk-tax-brackets-2025", category: "Tax" },
    { title: "Personal Allowance UK", path: "/blog/personal-allowance-uk", category: "Tax" },
    { title: "National Insurance 2026/27", path: "/blog/national-insurance-2025", category: "Tax" },
    { title: "Mortgage & Interest Rates Explained", path: "/blog/mortgage-interest-rates", category: "Property" },
    { title: "How Long to Pay Off a Mortgage?", path: "/blog/how-long-to-pay-off-mortgage", category: "Property" },
    { title: "What Is a Good Salary UK?", path: "/blog/what-is-a-good-salary-uk", category: "Salary" },
    { title: "How Much Should I Save Per Month?", path: "/blog/how-much-should-i-save-per-month", category: "Savings" },
    { title: "What Is an ISA?", path: "/blog/what-is-an-isa", category: "Savings" },
    { title: "How Much Do I Need to Retire?", path: "/blog/how-much-do-i-need-to-retire", category: "Retirement" },
    { title: "What Is Compound Interest?", path: "/blog/what-is-compound-interest", category: "Investing" },
    { title: "What Is Capital Gains Tax UK?", path: "/blog/what-is-capital-gains-tax-uk", category: "Tax" },
    { title: "What Is Inheritance Tax UK?", path: "/blog/what-is-inheritance-tax-uk", category: "Tax" },
    { title: "How to Calculate Percentage", path: "/blog/how-to-calculate-percentage", category: "Maths" },
    { title: "What Is BMI?", path: "/blog/what-is-bmi", category: "Health" },
    { title: "How to Save for a House Deposit", path: "/blog/how-to-save-for-a-house-deposit", category: "Property" },
    { title: "What Is VAT UK?", path: "/blog/what-is-vat-uk", category: "Tax" },
    { title: "How Much Is Stamp Duty 2025?", path: "/blog/how-much-is-stamp-duty-2025", category: "Property" },
    { title: "What Is a Stocks & Shares ISA?", path: "/blog/what-is-a-stocks-and-shares-isa", category: "Investing" },
  ];

  const learnGuides = [
    { title: "Compound Interest Formula: The Complete Guide", path: "/learn/compound-interest-formula", category: "Investing" },
    { title: "Your Financial Journey", path: "/learn/financial-journey", category: "Foundation" },
    { title: "Where Does Your Money Go?", path: "/learn/where-money-goes", category: "Budgeting" },
    { title: "The 50/30/20 Budget Rule", path: "/learn/50-30-20-budget", category: "Budgeting" },
    { title: "Automate Your Finances", path: "/learn/automate-finances", category: "Budgeting" },
    { title: "Build an Emergency Fund", path: "/learn/emergency-fund", category: "Savings" },
    { title: "Calculator Formulas Guide", path: "/learn/calculator-formulas-guide", category: "Reference" },
    { title: "Before You Invest", path: "/learn/before-you-invest", category: "Investing" },
    { title: "Budgeting for Irregular Costs", path: "/learn/budget-irregular-costs", category: "Budgeting" },
    { title: "Build Your Portfolio", path: "/learn/build-portfolio", category: "Investing" },
    { title: "Choose a Savings Account", path: "/learn/choose-savings-account", category: "Savings" },
    { title: "Understanding Credit Scores", path: "/learn/credit-scores", category: "Credit" },
    { title: "The UK Debt Landscape", path: "/learn/debt-landscape", category: "Debt" },
    { title: "Ethical Investing", path: "/learn/ethical-investing", category: "Investing" },
    { title: "Financial Freedom", path: "/learn/financial-freedom", category: "Foundation" },
    { title: "Your First £1,000", path: "/learn/first-1000", category: "Savings" },
    { title: "The Inflation Guide", path: "/learn/inflation-guide", category: "Economics" },
    { title: "The Interest Rate Impact", path: "/learn/interest-impact", category: "Economics" },
    { title: "Investing Basics", path: "/learn/investing-basics", category: "Investing" },
    { title: "Investing vs Trading", path: "/learn/investing-vs-trading", category: "Investing" },
    { title: "Monthly Financial Dashboard", path: "/learn/monthly-dashboard", category: "Budgeting" },
    { title: "Portfolio Rebalancing", path: "/learn/portfolio-rebalancing", category: "Investing" },
    { title: "Protect Your Wealth", path: "/learn/protect-wealth", category: "Advanced" },
    { title: "Snowball vs Avalanche Method", path: "/learn/snowball-avalanche", category: "Debt" },
    { title: "Tax-Efficient Accounts", path: "/learn/tax-efficient-accounts", category: "Tax" },
    { title: "Teach Kids About Money", path: "/learn/teach-money-skills", category: "Foundation" },
    { title: "UK Finance Statistics", path: "/learn/uk-finance-statistics", category: "Reference" },
  ];

  const allCalculators = [...mortgageCalculators, ...financeCalculators, ...homeCalculators, ...miscCalculators, ...converterCalculators];

  return (
    <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-accent-yellow selection:text-black">
      <SEO
        title="The Calculator App — 130+ Free UK Calculators Online"
        description="The Calculator App. Free online calculators for finance, mortgage, salary, compound interest, savings, percentage, BMI and more. No download. Works on iPhone and Android."
        keywords="the calculator app, free calculator app, online calculator app, uk calculators, mortgage calculator, compound interest calculator, salary calculator"
        canonicalUrl="https://www.thecalculatorapp.org"
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
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-blue/12 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

            {/* Left: Title block */}
            <div className="flex-1">
              <p className="text-white/40 text-xs font-sans uppercase tracking-[0.3em] mb-3">Calculator App</p>
              <h1 className="sr-only">The Calculator App — 130+ Free UK & US Calculators</h1>
              <div aria-hidden="true" className="font-display leading-[0.82] tracking-tighter select-none">
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
              </div>
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
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[11px] font-heading uppercase tracking-widest text-white/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-green inline-block" />
                  130+ Free Calculators
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
                {calc.badge && (
                  <div className="absolute top-0 right-0 p-3">
                    <Badge className="bg-white text-black text-[9px] font-bold uppercase rounded-none">{calc.badge}</Badge>
                  </div>
                )}
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

      {/* The Internet's Most Searched — Financial Edition */}
      <section className="py-14 px-6 border-b border-dark-border bg-gradient-to-b from-accent-blue/[0.04] to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent-blue mb-2">The Internet's Most Searched</p>
              <h2 className="font-display text-4xl md:text-5xl text-white tracking-tight uppercase">Financial Edition</h2>
              <p className="text-white/55 mt-2 max-w-xl text-sm">The money questions everyone Googles — answered with the actual numbers.</p>
            </div>
            <div className="inline-flex rounded-lg border border-dark-border overflow-hidden self-start">
              {(["uk", "us"] as const).map((m) => (
                <button key={m} onClick={() => setMsMarket(m)}
                  className={`px-5 py-2 font-heading text-xs uppercase tracking-widest transition-colors ${msMarket === m ? "bg-accent-blue text-white" : "text-white/50 hover:text-white"}`}>
                  {m === "uk" ? "🇬🇧 UK" : "🇺🇸 US"}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((p) => <MostSearchedCard key={`${p.market}-${p.slug}`} page={p} />)}
          </div>
          <div className="mt-8 text-center">
            <Link to="/most-searched" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-blue text-white font-heading uppercase tracking-widest text-sm hover:-translate-y-0.5 transition-transform">
              See all most searched <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Category Grid — with visible calculator lists */}
      <main className="max-w-7xl mx-auto px-6 py-14 w-full">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white tracking-tight">Browse <span className="text-outline">Categories</span></h2>
          <span className="text-xs font-heading uppercase tracking-widest text-white/30">All Calculators</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Mortgages Section — new hub */}
          <div className="group border border-dark-border hover:border-orange-500/60 transition-colors duration-300 p-6 relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <span className="text-[8px] font-heading uppercase tracking-widest px-2 py-0.5 rounded-sm bg-orange-500/10 text-orange-400">Hub</span>
            </div>
            <Link to="/mortgages" className="block mb-5">
              <div className="flex justify-between items-center">
                <h2 className="font-display text-4xl text-white group-hover:text-orange-400 transition-colors duration-300">Mortgages</h2>
                <ArrowRight className="h-6 w-6 text-orange-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <div className="h-px bg-orange-500/40 mt-3 group-hover:bg-orange-500/80 transition-colors" />
            </Link>
            <ul className="space-y-1.5">
              {mortgageCalculators.slice(0, 6).map(calc => (
                <li key={calc.path}>
                  <Link to={calc.path} className="flex items-center justify-between py-2 px-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all rounded group/item">
                    <span className="font-heading uppercase tracking-wide text-xs">{calc.title}</span>
                    <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover/item:opacity-100 transition-opacity text-orange-400" />
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/mortgages" className="flex items-center gap-1 py-2 px-3 text-xs text-orange-400/60 hover:text-orange-400 transition-colors font-heading uppercase tracking-widest">
                  Mortgage hub <ChevronRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Section */}
          <div className="group border border-dark-border hover:border-accent-red/60 transition-colors duration-300 p-6">
            <Link to="/categories/property" className="block mb-5">
              <div className="flex justify-between items-center">
                <h2 className="font-display text-4xl text-white group-hover:text-accent-red transition-colors duration-300">Property</h2>
                <ArrowRight className="h-6 w-6 text-accent-red opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <div className="h-px bg-accent-red/40 mt-3 group-hover:bg-accent-red/80 transition-colors" />
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
          <div className="group border border-dark-border hover:border-accent-blue/60 transition-colors duration-300 p-6">
            <Link to="/categories/finance" className="block mb-5">
              <div className="flex justify-between items-center">
                <h2 className="font-display text-4xl text-white group-hover:text-accent-blue transition-colors duration-300">Finance</h2>
                <ArrowRight className="h-6 w-6 text-accent-blue opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <div className="h-px bg-accent-blue/40 mt-3 group-hover:bg-accent-blue/80 transition-colors" />
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
          <div className="group border border-dark-border hover:border-accent-yellow/60 transition-colors duration-300 p-6">
            <Link to="/categories/everyday" className="block mb-5">
              <div className="flex justify-between items-center">
                <h2 className="font-display text-4xl text-white group-hover:text-accent-yellow transition-colors duration-300">Everyday</h2>
                <ArrowRight className="h-6 w-6 text-accent-yellow opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <div className="h-px bg-accent-yellow/40 mt-3 group-hover:bg-accent-yellow/80 transition-colors" />
            </Link>
            <ul className="space-y-1.5">
              {miscCalculators.slice(0, 8).map(calc => (
                <li key={calc.path}>
                  <Link to={calc.path} className="flex items-center justify-between py-2 px-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all rounded group/item">
                    <span className="font-heading uppercase tracking-wide text-xs">{calc.title}</span>
                    <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover/item:opacity-100 transition-opacity text-accent-yellow" />
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/categories/everyday" className="flex items-center gap-1 py-2 px-3 text-xs text-accent-yellow/60 hover:text-accent-yellow transition-colors font-heading uppercase tracking-widest">
                  View all <ChevronRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Converters Section */}
          <div className="group border border-dark-border hover:border-accent-green/60 transition-colors duration-300 p-6">
            <Link to="/categories/everyday" className="block mb-5">
              <div className="flex justify-between items-center">
                <h2 className="font-display text-4xl text-white group-hover:text-accent-green transition-colors duration-300">Converters</h2>
                <ArrowRight className="h-6 w-6 text-accent-green opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <div className="h-px bg-accent-green/40 mt-3 group-hover:bg-accent-green/80 transition-colors" />
            </Link>
            <ul className="space-y-1.5">
              {converterCalculators.slice(0, 8).map(calc => (
                <li key={calc.path}>
                  <Link to={calc.path} className="flex items-center justify-between py-2 px-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all rounded group/item">
                    <span className="font-heading uppercase tracking-wide text-xs">{calc.title}</span>
                    <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover/item:opacity-100 transition-opacity text-accent-green" />
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/categories/everyday" className="flex items-center gap-1 py-2 px-3 text-xs text-accent-green/60 hover:text-accent-green transition-colors font-heading uppercase tracking-widest">
                  View all <ChevronRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </main>

      {/* ── FULL CALCULATOR DIRECTORY ── */}

      {/* Finance & Property */}
      <section className="border-t border-dark-border py-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-accent-blue/5 rounded-full blur-3xl pointer-events-none -translate-x-1/4 -translate-y-1/4" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <h2 className="font-display text-4xl md:text-5xl uppercase text-white tracking-tight">
                Finance <span className="text-accent-blue">&</span> Property
              </h2>
              <p className="text-white/50 text-sm font-sans mt-2">Mortgages, tax, savings, loans and salary calculators</p>
            </div>
            <Link to="/categories/finance" className="hidden md:flex items-center gap-1 text-xs font-heading uppercase tracking-widest text-accent-blue hover:text-white transition-colors">
              View Category <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-dark-border">
            {allFinanceCalcs.map(calc => (
              <Link key={calc.path} to={calc.path}
                className="group bg-dark-bg hover:bg-dark-card p-5 transition-all duration-200 flex flex-col gap-1.5">
                <span className="font-heading text-sm uppercase tracking-wide text-white group-hover:text-accent-blue transition-colors">{calc.title}</span>
                <span className="text-xs text-white/40 font-sans leading-relaxed group-hover:text-white/60 transition-colors">{calc.desc}</span>
                <ChevronRight className="h-3 w-3 text-accent-blue opacity-0 group-hover:opacity-100 transition-opacity mt-auto" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Everyday & Misc */}
      <section className="border-t border-dark-border py-16 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-accent-yellow/4 rounded-full blur-3xl pointer-events-none translate-x-1/3" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <h2 className="font-display text-4xl md:text-5xl uppercase text-white tracking-tight">
                Everyday <span className="text-accent-yellow">Calculators</span>
              </h2>
              <p className="text-white/50 text-sm font-sans mt-2">Percentages, dates, health, construction and more</p>
            </div>
            <Link to="/categories/everyday" className="hidden md:flex items-center gap-1 text-xs font-heading uppercase tracking-widest text-accent-yellow hover:text-white transition-colors">
              View Category <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-dark-border">
            {allMiscCalcs.map(calc => (
              <Link key={calc.path} to={calc.path}
                className="group bg-dark-bg hover:bg-dark-card p-5 transition-all duration-200 flex flex-col gap-1.5">
                <span className="font-heading text-sm uppercase tracking-wide text-white group-hover:text-accent-yellow transition-colors">{calc.title}</span>
                <span className="text-xs text-white/40 font-sans leading-relaxed group-hover:text-white/60 transition-colors">{calc.desc}</span>
                <ChevronRight className="h-3 w-3 text-accent-yellow opacity-0 group-hover:opacity-100 transition-opacity mt-auto" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Unit Converters */}
      <section className="border-t border-dark-border py-16 px-6 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-accent-green/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <h2 className="font-display text-4xl md:text-5xl uppercase text-white tracking-tight">
                Unit <span className="text-accent-green">Converters</span>
              </h2>
              <p className="text-white/50 text-sm font-sans mt-2">Length, weight, volume, temperature and cooking measurements</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-dark-border">
            {allConverters.map(calc => (
              <Link key={calc.path} to={calc.path}
                className="group bg-dark-bg hover:bg-dark-card p-5 transition-all duration-200 flex flex-col gap-1.5">
                <span className="font-heading text-sm uppercase tracking-wide text-white group-hover:text-accent-green transition-colors">{calc.title}</span>
                <span className="text-xs text-white/40 font-sans leading-relaxed group-hover:text-white/60 transition-colors">{calc.desc}</span>
                <ChevronRight className="h-3 w-3 text-accent-green opacity-0 group-hover:opacity-100 transition-opacity mt-auto" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section className="border-t border-dark-border py-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[250px] bg-accent-red/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <h2 className="font-display text-4xl md:text-5xl uppercase text-white tracking-tight">
                From The <span className="text-accent-red">Blog</span>
              </h2>
              <p className="text-white/50 text-sm font-sans mt-2">Guides, explainers and analysis on UK finance</p>
            </div>
            <Link to="/blog" className="hidden md:flex items-center gap-1 text-xs font-heading uppercase tracking-widest text-accent-red hover:text-white transition-colors">
              All Articles <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-dark-border">
            {blogPosts.map(post => (
              <Link key={post.path} to={post.path}
                className="group bg-dark-bg hover:bg-dark-card p-5 transition-all duration-200 flex items-start gap-4">
                <FileText className="h-4 w-4 text-accent-red/60 group-hover:text-accent-red transition-colors mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-[9px] font-heading uppercase tracking-widest text-white/30 group-hover:text-accent-red/80 transition-colors">{post.category}</span>
                  <span className="font-heading text-sm uppercase tracking-wide text-white group-hover:text-accent-red transition-colors leading-tight">{post.title}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex justify-center md:justify-start">
            <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-white/40 hover:text-white border border-white/10 hover:border-white/30 px-5 py-3 transition-all">
              View All Blog Articles <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── LEARN GUIDES ── */}
      <section className="border-t border-dark-border py-16 px-6 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-accent-cyan/5 rounded-full blur-3xl pointer-events-none -translate-x-1/4" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <h2 className="font-display text-4xl md:text-5xl uppercase text-white tracking-tight">
                Learn <span className="text-accent-cyan">Guides</span>
              </h2>
              <p className="text-white/50 text-sm font-sans mt-2">Step-by-step financial education from basics to advanced</p>
            </div>
            <Link to="/learn" className="hidden md:flex items-center gap-1 text-xs font-heading uppercase tracking-widest text-accent-cyan hover:text-white transition-colors">
              All Guides <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-dark-border">
            {learnGuides.map(guide => (
              <Link key={guide.path} to={guide.path}
                className="group bg-dark-bg hover:bg-dark-card p-5 transition-all duration-200 flex items-start gap-4">
                <BookOpen className="h-4 w-4 text-accent-cyan/60 group-hover:text-accent-cyan transition-colors mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-[9px] font-heading uppercase tracking-widest text-white/30 group-hover:text-accent-cyan/80 transition-colors">{guide.category}</span>
                  <span className="font-heading text-sm uppercase tracking-wide text-white group-hover:text-accent-cyan transition-colors leading-tight">{guide.title}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex justify-center md:justify-start">
            <Link to="/learn" className="inline-flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-white/40 hover:text-white border border-white/10 hover:border-white/30 px-5 py-3 transition-all">
              View All Guides <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED FROM THE GUIDES ── */}
      <section className="border-t border-dark-border py-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-orange-500/4 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">

          {/* Section header */}
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <h2 className="font-display text-4xl md:text-5xl uppercase text-white tracking-tight">
                Featured <span style={{ color: "#F97316" }}>Reading</span>
              </h2>
              <p className="text-white/50 text-sm font-sans mt-2">Guides and articles worth your time — no fluff</p>
            </div>
            <Link to="/blog" className="hidden md:flex items-center gap-1 text-xs font-heading uppercase tracking-widest text-white/30 hover:text-white transition-colors">
              All Articles <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Hero feature + side stack */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-dark-border mb-px">

            {/* Hero card — spans 2 cols */}
            <Link
              to="/mortgages/mortgage-for-new-residents"
              className="group lg:col-span-2 bg-dark-bg hover:bg-dark-card transition-all duration-200 p-8 flex flex-col justify-between min-h-[260px] relative overflow-hidden"
            >
              <div className="absolute top-5 right-5">
                <span className="text-[8px] font-heading uppercase tracking-widest px-2 py-1 rounded-sm bg-orange-500/10 text-orange-400 border border-orange-500/20">New Guide</span>
              </div>
              <div>
                <span className="text-[9px] font-heading uppercase tracking-widest text-orange-400/70 mb-3 block">Mortgages · Visa &amp; Immigration</span>
                <h3 className="font-display text-3xl md:text-4xl text-white group-hover:text-orange-400 transition-colors duration-300 leading-tight uppercase tracking-wide mb-4">
                  Nobody Tells You This About Getting a UK Mortgage on a Visa
                </h3>
                <p className="font-sans text-sm text-white/50 leading-relaxed max-w-lg">
                  Deposit requirements by visa type, which lenders say yes, the SDLT non-resident surcharge, and the joint application strategy that changes everything.
                </p>
              </div>
              <div className="flex items-center gap-2 mt-6">
                <span className="font-heading text-xs text-orange-400 uppercase tracking-widest group-hover:gap-3 transition-all">Read the guide</span>
                <ArrowRight className="h-3 w-3 text-orange-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Side stack */}
            <div className="flex flex-col">
              <Link
                to="/blog/mortgage-cheat-code"
                className="group bg-dark-bg hover:bg-dark-card transition-all duration-200 p-6 flex flex-col justify-between flex-1 border-b border-dark-border"
              >
                <div>
                  <span className="text-[9px] font-heading uppercase tracking-widest text-accent-blue/70 mb-2 block">Property · Strategy</span>
                  <h3 className="font-heading text-sm uppercase tracking-wide text-white group-hover:text-accent-blue transition-colors leading-tight">The Mortgage Cheat Code</h3>
                </div>
                <ArrowRight className="h-3 w-3 text-accent-blue opacity-0 group-hover:opacity-100 transition-opacity mt-3" />
              </Link>
              <Link
                to="/blog/first-time-buyer-uk-2025"
                className="group bg-dark-bg hover:bg-dark-card transition-all duration-200 p-6 flex flex-col justify-between flex-1 border-b border-dark-border"
              >
                <div>
                  <span className="text-[9px] font-heading uppercase tracking-widest text-accent-green/70 mb-2 block">Property · First-Time Buyer</span>
                  <h3 className="font-heading text-sm uppercase tracking-wide text-white group-hover:text-accent-green transition-colors leading-tight">First-Time Buyer Guide UK 2026</h3>
                </div>
                <ArrowRight className="h-3 w-3 text-accent-green opacity-0 group-hover:opacity-100 transition-opacity mt-3" />
              </Link>
              <Link
                to="/blog/what-is-a-good-salary-uk"
                className="group bg-dark-bg hover:bg-dark-card transition-all duration-200 p-6 flex flex-col justify-between flex-1"
              >
                <div>
                  <span className="text-[9px] font-heading uppercase tracking-widest text-accent-yellow/70 mb-2 block">Salary · UK Finance</span>
                  <h3 className="font-heading text-sm uppercase tracking-wide text-white group-hover:text-accent-yellow transition-colors leading-tight">What Is a Good Salary in the UK?</h3>
                </div>
                <ArrowRight className="h-3 w-3 text-accent-yellow opacity-0 group-hover:opacity-100 transition-opacity mt-3" />
              </Link>
            </div>
          </div>

          {/* Bottom row — 4 compact cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-dark-border">
            {[
              { title: "What Is Compound Interest?", path: "/blog/what-is-compound-interest", cat: "Investing", color: "text-accent-cyan" },
              { title: "How Much Do I Need to Retire?", path: "/blog/how-much-do-i-need-to-retire", cat: "Retirement", color: "text-accent-blue" },
              { title: "UK Tax Brackets 2026", path: "/blog/uk-tax-brackets-2025", cat: "Tax", color: "text-accent-red" },
              { title: "How to Save for a House Deposit", path: "/blog/how-to-save-for-a-house-deposit", cat: "Savings", color: "text-accent-green" },
            ].map(card => (
              <Link
                key={card.path}
                to={card.path}
                className="group bg-dark-bg hover:bg-dark-card transition-all duration-200 p-5 flex flex-col gap-2"
              >
                <span className={`text-[9px] font-heading uppercase tracking-widest ${card.color} opacity-60 group-hover:opacity-100 transition-opacity`}>{card.cat}</span>
                <span className="font-heading text-xs uppercase tracking-wide text-white group-hover:text-white leading-tight">{card.title}</span>
                <ArrowRight className={`h-3 w-3 ${card.color} opacity-0 group-hover:opacity-100 transition-opacity mt-auto`} />
              </Link>
            ))}
          </div>

          {/* CTA row */}
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-white/40 hover:text-white border border-white/10 hover:border-white/30 px-5 py-3 transition-all">
              All Blog Articles <ArrowRight className="h-3 w-3" />
            </Link>
            <Link to="/learn" className="inline-flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-white/40 hover:text-white border border-white/10 hover:border-white/30 px-5 py-3 transition-all">
              All Learn Guides <ArrowRight className="h-3 w-3" />
            </Link>
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
              <span className="font-display text-6xl tracking-tighter text-outline">APP</span>
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
            <p className="text-xs text-gray-500 uppercase tracking-widest">© 2026 The Calculator App.</p>
            <p className="text-[10px] text-gray-600 max-w-sm text-center md:text-right">*All calculations are for informational purposes only.</p>
          </div>
        </div>
      </footer>
      <BackToTop />
    </div>
  );
};

export default Index;
