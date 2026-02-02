import { TrendingUp, Percent, Calendar, DollarSign, PiggyBank, Ruler, Weight, Thermometer, Star, Calculator, Search, BookOpen, Wallet, Home, ArrowLeft, Building2, Landmark, Key } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO"; 
import { NavigationMenu } from "@/components/NavigationMenu";
import { Logo } from "@/components/Logo";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const popularCalculatorsAndConversions = [
    { title: "UK Salary Calculator", description: "Calculate take-home pay after tax and NI", icon: Wallet, path: "/finance/salary", badge: "New" },
    { title: "Compound Interest", description: "See how your investments grow over time", icon: TrendingUp, path: "/finance/compound-interest", badge: "Trending" },
    { title: "Mortgage Payment Calculator", description: "Calculate monthly mortgage payments", icon: Home, path: "/finance/mortgage", badge: "Essential" },
    { title: "Retirement Calculator", description: "Plan your retirement income and pension", icon: PiggyBank, path: "/finance/retirement", badge: "Popular" }
  ];

  const homeCalculators = [
    { title: "Mortgage Calculator", path: "/finance/mortgage", icon: Home },
    { title: "Weekly Mortgage", path: "/finance/weekly-mortgage", icon: Home },
    { title: "Mortgage Overpayment", path: "/finance/mortgage-overpayment", icon: Home },
    { title: "Stamp Duty Calculator", path: "/finance/stamp-duty", icon: Landmark },
    { title: "Future House Value", path: "/finance/future-house-value", icon: Building2 }
  ];

  const financeCalculators = [
    { title: "UK Salary Calculator", path: "/finance/salary", icon: Wallet },
    { title: "Compound Interest", path: "/finance/compound-interest", icon: TrendingUp },
    { title: "APY Calculator", path: "/finance/apy", icon: TrendingUp },
    { title: "Budget Calculator", path: "/finance/budget", icon: DollarSign },
    { title: "Car Loan Calculator", path: "/finance/car-loan", icon: DollarSign },
    { title: "Loan Calculator", path: "/finance/loan", icon: DollarSign },
    { title: "Savings Calculator", path: "/finance/savings", icon: PiggyBank },
    { title: "Simple Interest", path: "/finance/simple-interest", icon: TrendingUp }
  ];

  const miscCalculators = [
    { title: "Percentage Calculator", path: "/misc/percentage", icon: Percent },
    { title: "Age Calculator", path: "/misc/age", icon: Calendar },
    { title: "Discount Calculator", path: "/misc/discount", icon: Percent },
    { title: "Tip Calculator", path: "/misc/tip", icon: DollarSign }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="The Calculator Page - Professional Financial Tools"
        description="50+ free calculators: compound interest, mortgage, retirement, and unit converters."
      />
      
      <header className="border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo size="sm" linkTo="/home" />
            <NavigationMenu />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-foreground">
            Financial Calculators
            <span className="block text-2xl sm:text-4xl text-muted-foreground mt-3 font-sans font-light">
              & Unit Converters
            </span>
          </h1>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for calculators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-11 rounded-lg"
            />
            {searchQuery && (
              <div className="absolute w-full mt-2 bg-card border rounded-lg shadow-lg z-50 text-left overflow-hidden">
                {[...financeCalculators, ...homeCalculators, ...miscCalculators]
                  .filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
                  .slice(0, 6)
                  .map(calc => (
                    <Link
                      key={`search-${calc.title}`}
                      to={calc.path}
                      className="block p-3 hover:bg-accent border-b last:border-0"
                      onClick={() => setSearchQuery("")}
                    >
                      <div className="text-sm font-medium">{calc.title}</div>
                    </Link>
                  ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section id="featured" className="py-16 px-6 bg-accent/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl mb-10 text-center text-foreground">Featured Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCalculatorsAndConversions.map((calc) => (
              <Link key={`popular-${calc.title}`} to={calc.path}>
                <Card className="h-full hover:border-brand-gold/50 transition-all cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <calc.icon className="h-6 w-6 text-brand-gold" />
                      <Badge variant="outline" className="text-[10px]">{calc.badge}</Badge>
                    </div>
                    <CardTitle className="text-lg">{calc.title}</CardTitle>
                    <CardDescription>{calc.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Sections */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-3 gap-12 text-foreground">
          {/* Property Column */}
          <div>
            <h3 className="font-serif text-xl mb-6 flex items-center gap-2">
              <Home className="h-5 w-5 text-brand-gold" /> Property
            </h3>
            <div className="space-y-2">
              {homeCalculators.map(calc => (
                <Link 
                  key={`home-${calc.title}`} 
                  to={calc.path} 
                  className="block p-2 hover:bg-accent rounded text-sm transition-colors"
                >
                  {calc.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Finance Column */}
          <div>
            <h3 className="font-serif text-xl mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-brand-gold" /> Finance
            </h3>
            <div className="space-y-2">
              {financeCalculators.map(calc => (
                <Link 
                  key={`fin-${calc.title}`} 
                  to={calc.path} 
                  className="block p-2 hover:bg-accent rounded text-sm transition-colors"
                >
                  {calc.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Everyday Column */}
          <div>
            <h3 className="font-serif text-xl mb-6 flex items-center gap-2">
              <Star className="h-5 w-5 text-brand-gold" /> Everyday
            </h3>
            <div className="space-y-2">
              {miscCalculators.map(calc => (
                <Link 
                  key={`misc-${calc.title}`} 
                  to={calc.path} 
                  className="block p-2 hover:bg-accent rounded text-sm transition-colors"
                >
                  {calc.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;