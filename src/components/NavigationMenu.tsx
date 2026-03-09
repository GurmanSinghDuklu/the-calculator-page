import { TrendingUp, DollarSign, PiggyBank, Percent, Calendar, Calculator, Ruler, Thermometer, Weight, GraduationCap, BookOpen, Home, Building2, Landmark } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useState } from "react";

export const NavigationMenu = () => {
  const [open, setOpen] = useState(false);

  const homeCalculators = [
    { title: "Mortgage Calculator", path: "/finance/mortgage", icon: Home },
    { title: "Weekly Mortgage", path: "/finance/weekly-mortgage", icon: Home },
    { title: "Mortgage Overpayment", path: "/finance/mortgage-overpayment", icon: Home },
    { title: "Stamp Duty Calculator", path: "/finance/stamp-duty", icon: Landmark },
    { title: "Future House Value", path: "/finance/future-house-value", icon: Building2 },
  ];

  const financeCalculators = [
    { title: "APY Calculator", path: "/finance/apy", icon: TrendingUp },
    { title: "Car Loan Calculator", path: "/finance/car-loan", icon: DollarSign },
    { title: "Cash Back Calculator", path: "/finance/cashback", icon: DollarSign },
    { title: "Compound Interest", path: "/finance/compound-interest", icon: TrendingUp },
    { title: "Credit Card Payoff", path: "/finance/credit-card-payoff", icon: DollarSign },
    { title: "Multi-Card Payoff", path: "/finance/multi-card-payoff", icon: DollarSign },
    { title: "How Long to Save", path: "/finance/how-long-to-save", icon: PiggyBank },
    { title: "How Much to Save", path: "/finance/how-much-to-save", icon: PiggyBank },
    { title: "IRR Calculator", path: "/finance/irr", icon: TrendingUp },
    { title: "Loan Calculator", path: "/finance/loan", icon: DollarSign },
    { title: "Retirement Calculator", path: "/finance/retirement", icon: PiggyBank },
    { title: "Savings Calculator", path: "/finance/savings", icon: PiggyBank },
    { title: "Simple Interest", path: "/finance/simple-interest", icon: TrendingUp },
  ];

  const miscCalculators = [
    { title: "Age Calculator", path: "/misc/age", icon: Calendar },
    { title: "Date Calculator", path: "/misc/date", icon: Calendar },
    { title: "Discount Calculator", path: "/misc/discount", icon: Percent },
    { title: "Percentage Calculator", path: "/misc/percentage", icon: Percent },
    { title: "Tip Calculator", path: "/misc/tip", icon: DollarSign },
  ];

  const converters = [
    { title: "Length Converter", path: "/converters/length", icon: Ruler },
    { title: "Temperature Converter", path: "/converters/temperature", icon: Thermometer },
    { title: "Universal Converter", path: "/converters/universal", icon: Calculator },
    { title: "Weight Converter", path: "/converters/weight", icon: Weight },
  ];

  const sections = [
    { label: "Home & Property", icon: Home, data: homeCalculators, accent: "group-hover:text-accent-orange" },
    { label: "Finance Calculators", icon: DollarSign, data: financeCalculators, accent: "group-hover:text-accent-blue" },
    { label: "Everyday Calculators", icon: Calculator, data: miscCalculators, accent: "group-hover:text-accent-green" },
    { label: "Unit Converters", icon: Ruler, data: converters, accent: "group-hover:text-accent-yellow" },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="flex items-center gap-3 group">
          <span className="hidden sm:inline font-heading text-sm font-bold uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">
            Menu
          </span>
          <div className="w-10 h-10 bg-black border border-white/20 flex flex-col items-center justify-center gap-[5px] group-hover:border-white transition-colors">
            <span className="block w-5 h-[1.5px] bg-white" />
            <span className="block w-5 h-[1.5px] bg-white" />
            <span className="block w-3 h-[1.5px] bg-white" />
          </div>
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[90vw] sm:w-[80vw] max-w-6xl p-0 border-l border-white/10 bg-black">
        <SheetHeader className="px-6 py-5 border-b border-white/10">
          <SheetTitle className="text-left font-display text-4xl tracking-widest text-white uppercase">
            All Calculators
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="px-6 py-6 space-y-8">

            {/* Financial Education */}
            <div>
              <h3 className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-4 flex items-center gap-2 font-heading">
                <GraduationCap className="h-4 w-4" />
                Financial Education
              </h3>
              <div className="space-y-2">
                {[
                  { to: "/learn", label: "Learn & Insights Hub", sub: "All educational content", icon: BookOpen },
                  { to: "/learn/financial-journey", label: "Financial Growth Journey", sub: "Step-by-step education", icon: GraduationCap },
                  { to: "/blog", label: "The Cheat Code Blog", sub: "Learn the secrets of finance", icon: BookOpen },
                ].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-colors group"
                  >
                    <item.icon className="h-5 w-5 text-white/40 group-hover:text-white transition-colors" />
                    <div>
                      <div className="font-heading text-sm uppercase tracking-wide text-white">{item.label}</div>
                      <div className="text-xs text-white/40 font-sans">{item.sub}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Separator className="bg-white/10" />

            {/* Calculator Sections */}
            {sections.map((section) => (
              <div key={section.label}>
                <h3 className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-4 flex items-center gap-2 font-heading">
                  <section.icon className="h-4 w-4" />
                  {section.label}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {section.data.map((calc) => (
                    <Link
                      key={calc.title}
                      to={calc.path}
                      onClick={() => setOpen(false)}
                      className="flex flex-col items-center gap-2 px-3 py-4 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-colors group"
                    >
                      <calc.icon className={`h-5 w-5 text-white/30 transition-colors ${section.accent}`} />
                      <span className="text-xs text-center font-heading uppercase tracking-wide text-gray-400 group-hover:text-white transition-colors">
                        {calc.title}
                      </span>
                    </Link>
                  ))}
                </div>
                <Separator className="bg-white/10 mt-8" />
              </div>
            ))}

          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};