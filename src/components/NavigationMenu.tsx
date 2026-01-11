import { Menu, TrendingUp, DollarSign, PiggyBank, Percent, Calendar, Calculator, Ruler, Thermometer, Weight, GraduationCap, BookOpen, Home, Building2, Landmark, Key } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
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

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative border-border hover:bg-accent">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[90vw] sm:w-[80vw] max-w-6xl p-0 border-l border-border">
        <SheetHeader className="px-6 py-5 border-b border-border">
          <SheetTitle className="text-left font-serif text-xl font-normal tracking-tight">All Calculators</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="px-6 py-6 space-y-8">
            {/* Financial Education */}
            <div>
              <h3 className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-4 flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Financial Education
              </h3>
              <div className="space-y-2">
                {[
                  { to: "/learn", label: "Learn & Insights Hub", sub: "All educational content", icon: BookOpen },
                  { to: "/learn/financial-journey", label: "Financial Growth Journey", sub: "Step-by-step education", icon: GraduationCap },
                  { to: "/blog", label: "The Cheat Code Blog", sub: "Learn the secrets of finance", icon: BookOpen }
                ].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border hover:bg-accent transition-colors"
                  >
                    <item.icon className="h-5 w-5 text-foreground" />
                    <div>
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.sub}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Separator className="bg-border" />

            {/* Sections Mapping */}
            {[
              { label: "Home & Property", icon: Home, data: homeCalculators },
              { label: "Finance Calculators", icon: DollarSign, data: financeCalculators },
              { label: "Everyday Calculators", icon: Calculator, data: miscCalculators },
              { label: "Unit Converters", icon: Ruler, data: converters }
            ].map((section) => (
              <div key={section.label}>
                <h3 className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-4 flex items-center gap-2">
                  <section.icon className="h-4 w-4" />
                  {section.label}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {section.data.map((calc) => (
                    <Link
                      key={calc.title}
                      to={calc.path}
                      onClick={() => setOpen(false)}
                      className="flex flex-col items-center gap-2 px-3 py-4 rounded-lg border border-border bg-card hover:bg-accent transition-colors group"
                    >
                      <calc.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      <span className="text-xs text-center font-medium">{calc.title}</span>
                    </Link>
                  ))}
                </div>
                <Separator className="bg-border mt-8" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};