import { useState } from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Home, TrendingUp, DollarSign, PiggyBank, Percent, Calendar,
  Ruler, Thermometer, Weight, GraduationCap, BookOpen, Building2,
  Landmark, Calculator, Heart, ArrowRight, X, ChevronDown
} from "lucide-react";

// ─── All calculator data ──────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: "property",
    label: "Property",
    color: "#F97316",
    colorClass: "text-orange-400",
    borderClass: "border-orange-400/30",
    bgClass: "bg-orange-400/5",
    icon: Home,
    groups: [
      {
        label: "Mortgage",
        items: [
          { title: "Mortgage Calculator", path: "/finance/mortgage", badge: "Popular" },
          { title: "Mortgage Overpayment", path: "/finance/mortgage-overpayment" },
          { title: "Weekly Mortgage", path: "/finance/weekly-mortgage" },
          { title: "Mortgage Comparison", path: "/finance/mortgage-cost-comparison" },
          { title: "Future House Value", path: "/finance/future-house-value" },
        ]
      },
      {
        label: "Tax & Fees",
        items: [
          { title: "Stamp Duty (SDLT)", path: "/finance/stamp-duty", badge: "UK" },
          { title: "Inheritance Tax", path: "/finance/inheritance-tax", badge: "UK" },
        ]
      }
    ]
  },
  {
    id: "finance-uk",
    label: "Finance — UK",
    color: "#3B82F6",
    colorClass: "text-blue-400",
    borderClass: "border-blue-400/30",
    bgClass: "bg-blue-400/5",
    icon: DollarSign,
    groups: [
      {
        label: "Salary & Tax",
        items: [
          { title: "Salary Calculator", path: "/finance/salary", badge: "Popular" },
          { title: "Budget Calculator", path: "/finance/budget" },
          { title: "VAT Calculator", path: "/finance/vat-calculator" },
          { title: "Capital Gains Tax", path: "/finance/capital-gains-tax" },
        ]
      },
      {
        label: "Savings & Investment",
        items: [
          { title: "Compound Interest", path: "/finance/compound-interest", badge: "Popular" },
          { title: "Savings Calculator", path: "/finance/savings" },
          { title: "ISA Calculator", path: "/finance/isa-calculator", badge: "UK" },
          { title: "APY Calculator", path: "/finance/apy" },
          { title: "Simple Interest", path: "/finance/simple-interest" },
          { title: "IRR Calculator", path: "/finance/irr" },
        ]
      },
      {
        label: "Savings Goals",
        items: [
          { title: "How Long to Save", path: "/finance/how-long-to-save" },
          { title: "How Much to Save", path: "/finance/how-much-to-save" },
          { title: "Retirement Calculator", path: "/finance/retirement" },
        ]
      },
      {
        label: "Loans & Debt",
        items: [
          { title: "Loan Calculator", path: "/finance/loan" },
          { title: "Car Loan Calculator", path: "/finance/car-loan" },
          { title: "Credit Card Payoff", path: "/finance/credit-card-payoff" },
          { title: "Multi-Card Payoff", path: "/finance/multi-card-payoff" },
          { title: "Cashback Calculator", path: "/finance/cashback" },
        ]
      }
    ]
  },
  {
    id: "finance-us",
    label: "Finance — US",
    color: "#8B5CF6",
    colorClass: "text-purple-400",
    borderClass: "border-purple-400/30",
    bgClass: "bg-purple-400/5",
    icon: TrendingUp,
    groups: [
      {
        label: "Tax & Salary",
        items: [
          { title: "US Salary Calculator", path: "/finance/us-salary-calculator", badge: "New" },
          { title: "US Sales Tax", path: "/finance/us-sales-tax-calculator", badge: "New" },
        ]
      },
      {
        label: "Retirement",
        items: [
          { title: "401(k) Calculator", path: "/finance/401k-calculator", badge: "New" },
          { title: "Retirement Calculator", path: "/finance/retirement" },
        ]
      }
    ]
  },
  {
    id: "everyday",
    label: "Everyday",
    color: "#22C55E",
    colorClass: "text-green-400",
    borderClass: "border-green-400/30",
    bgClass: "bg-green-400/5",
    icon: Calculator,
    groups: [
      {
        label: "Maths",
        items: [
          { title: "Percentage Calculator", path: "/misc/percentage", badge: "Popular" },
          { title: "Percentage Of", path: "/misc/percentage-of" },
          { title: "Percentage Change", path: "/misc/percentage-change" },
          { title: "Discount Calculator", path: "/misc/discount" },
          { title: "Tip Calculator", path: "/misc/tip" },
        ]
      },
      {
        label: "Health",
        items: [
          { title: "BMI Calculator", path: "/misc/bmi-calculator" },
          { title: "Calorie Calculator", path: "/misc/calorie-calculator" },
        ]
      },
      {
        label: "Date & Time",
        items: [
          { title: "Age Calculator", path: "/misc/age" },
          { title: "Days Between Dates", path: "/misc/days-between-dates" },
          { title: "Days From Today", path: "/misc/days-from-today" },
          { title: "Working Days", path: "/misc/working-days" },
          { title: "Hours Calculator", path: "/misc/hours-calculator" },
          { title: "Months Between Dates", path: "/misc/months-between-dates" },
        ]
      },
      {
        label: "Construction",
        items: [
          { title: "Square Footage", path: "/misc/square-footage" },
          { title: "Gravel Calculator", path: "/misc/gravel-calculator" },
          { title: "Mulch Calculator", path: "/misc/mulch-calculator" },
          { title: "Concrete Calculator", path: "/misc/concrete-calculator" },
          { title: "Cubic Yards", path: "/misc/cubic-yards" },
        ]
      }
    ]
  },
  {
    id: "converters",
    label: "Converters",
    color: "#FBBF24",
    colorClass: "text-yellow-400",
    borderClass: "border-yellow-400/30",
    bgClass: "bg-yellow-400/5",
    icon: Ruler,
    groups: [
      {
        label: "Length",
        items: [
          { title: "Cm to Inches", path: "/converters/cm-to-inches", badge: "Popular" },
          { title: "Inches to Cm", path: "/converters/inches-to-cm" },
          { title: "Km to Miles", path: "/converters/km-to-miles" },
          { title: "Metres to Feet", path: "/converters/metres-to-feet" },
          { title: "Length Converter", path: "/converters/length" },
        ]
      },
      {
        label: "Weight",
        items: [
          { title: "Kg to Lbs", path: "/converters/lbs-to-kg" },
          { title: "Lbs to Kg", path: "/converters/lbs-to-kg" },
          { title: "Stone to Kg", path: "/converters/stone-to-kg" },
          { title: "Ounces to Grams", path: "/converters/ounces-to-grams" },
          { title: "Weight Converter", path: "/converters/weight" },
        ]
      },
      {
        label: "Temperature",
        items: [
          { title: "Fahrenheit to Celsius", path: "/converters/fahrenheit-to-celsius" },
          { title: "Temperature Converter", path: "/converters/temperature" },
        ]
      },
      {
        label: "Cooking",
        items: [
          { title: "Cups to Grams", path: "/converters/cups-to-grams" },
          { title: "Grams to Tablespoons", path: "/converters/grams-to-tablespoons" },
          { title: "Teaspoons to Ml", path: "/converters/teaspoons-to-ml" },
          { title: "Ml to Oz", path: "/converters/ml-to-oz" },
          { title: "Gallons to Litres", path: "/converters/gallons-to-litres" },
        ]
      },
      {
        label: "All",
        items: [
          { title: "Universal Converter", path: "/converters/universal" },
        ]
      }
    ]
  }
];

const BADGE_STYLES: Record<string, string> = {
  Popular: "bg-white/10 text-white/60",
  New: "bg-green-400/20 text-green-400",
  UK: "bg-blue-400/15 text-blue-400",
  US: "bg-purple-400/15 text-purple-400",
};

// ─── Component ────────────────────────────────────────────────────────────────

export const NavigationMenu = () => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("property");

  const current = SECTIONS.find(s => s.id === activeSection) || SECTIONS[0];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Open navigation menu"
          className="flex items-center gap-3 group"
        >
          <span className="hidden sm:inline font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 group-hover:text-white transition-colors">
            All Tools
          </span>
          <div className="w-9 h-9 border border-white/15 flex flex-col items-center justify-center gap-[5px] group-hover:border-white/40 transition-all">
            <span className="block w-4 h-px bg-white/70 group-hover:bg-white transition-colors" />
            <span className="block w-4 h-px bg-white/70 group-hover:bg-white transition-colors" />
            <span className="block w-2.5 h-px bg-white/40 group-hover:bg-white/70 transition-colors" />
          </div>
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-screen sm:w-[92vw] max-w-5xl p-0 border-l border-white/8 bg-[#0E0D0D] flex flex-col"
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8 shrink-0">
          <div>
            <p className="font-heading text-[9px] uppercase tracking-[0.35em] text-white/30 mb-1">The Calculator App</p>
            <h2 className="font-display text-3xl uppercase text-white tracking-tight leading-none">All Calculators</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* ── Body: sidebar + content ── */}
        <div className="flex flex-1 overflow-hidden">

          {/* Left sidebar — category tabs */}
          <div className="w-[140px] sm:w-[160px] shrink-0 border-r border-white/8 flex flex-col py-3 gap-0.5 overflow-y-auto">
            {SECTIONS.map(section => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-all group ${
                    isActive
                      ? "bg-white/[0.06] border-r-2"
                      : "hover:bg-white/[0.03] border-r-2 border-transparent"
                  }`}
                  style={isActive ? { borderRightColor: section.color } : {}}
                >
                  <Icon
                    className="h-3.5 w-3.5 shrink-0 transition-colors"
                    style={{ color: isActive ? section.color : "rgba(255,255,255,0.3)" }}
                  />
                  <span
                    className="font-heading text-[9px] uppercase tracking-[0.15em] transition-colors leading-tight"
                    style={{ color: isActive ? "white" : "rgba(255,255,255,0.35)" }}
                  >
                    {section.label}
                  </span>
                </button>
              );
            })}

            {/* Divider */}
            <div className="mx-4 my-2 h-px bg-white/8" />

            {/* Learn & Blog */}
            {[
              { label: "Learn", path: "/learn", icon: GraduationCap },
              { label: "Blog", path: "/blog", icon: BookOpen },
            ].map(item => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-white/[0.03] border-r-2 border-transparent transition-all group"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-white/25 group-hover:text-white/60 transition-colors" />
                  <span className="font-heading text-[9px] uppercase tracking-[0.15em] text-white/30 group-hover:text-white/70 transition-colors">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Right content — calculator groups */}
          <ScrollArea className="flex-1">
            <div className="p-6">

              {/* Section header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-px h-8" style={{ backgroundColor: current.color }} />
                <div>
                  <p className="font-heading text-[9px] uppercase tracking-[0.3em] text-white/30">Category</p>
                  <h3 className="font-display text-2xl uppercase text-white leading-none tracking-tight">{current.label}</h3>
                </div>
              </div>

              {/* Groups grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {current.groups.map(group => (
                  <div key={group.label}>
                    <p
                      className="font-heading text-[8px] uppercase tracking-[0.3em] mb-3 pb-2 border-b"
                      style={{ color: current.color, borderColor: `${current.color}25` }}
                    >
                      {group.label}
                    </p>
                    <div className="space-y-0.5">
                      {group.items.map(item => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-between px-3 py-2.5 hover:bg-white/[0.04] group transition-all rounded-sm"
                        >
                          <span className="text-xs text-white/50 group-hover:text-white transition-colors font-sans">
                            {item.title}
                          </span>
                          <div className="flex items-center gap-2">
                            {item.badge && (
                              <span className={`text-[8px] font-heading uppercase tracking-wider px-1.5 py-0.5 rounded-sm ${BADGE_STYLES[item.badge] || ""}`}>
                                {item.badge}
                              </span>
                            )}
                            <ArrowRight className="h-2.5 w-2.5 text-white/0 group-hover:text-white/40 transition-all -translate-x-1 group-hover:translate-x-0" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Count */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <p className="text-[9px] font-heading uppercase tracking-[0.25em] text-white/20">
                  {current.groups.reduce((acc, g) => acc + g.items.length, 0)} calculators in this category
                </p>
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="text-[9px] font-heading uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  View all <ArrowRight className="h-2.5 w-2.5" />
                </Link>
              </div>

            </div>
          </ScrollArea>
        </div>

        {/* ── Footer ── */}
        <div className="shrink-0 border-t border-white/8 px-6 py-4 flex items-center justify-between bg-black/40">
          <p className="text-[9px] font-heading uppercase tracking-[0.25em] text-white/20">130+ free calculators</p>
          <div className="flex items-center gap-4">
            {[
              { label: "About", path: "/about" },
              { label: "Privacy", path: "/privacy" },
            ].map(l => (
              <Link
                key={l.path}
                to={l.path}
                onClick={() => setOpen(false)}
                className="text-[9px] font-heading uppercase tracking-[0.2em] text-white/20 hover:text-white/50 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

      </SheetContent>
    </Sheet>
  );
};
