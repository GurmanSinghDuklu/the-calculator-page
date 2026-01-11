import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { NavigationMenu } from "@/components/NavigationMenu";
import { Logo } from "@/components/Logo";
import { Home, BookOpen, TrendingUp, Lightbulb, ArrowRight, Lock, MapPin, GraduationCap } from "lucide-react";

import heroImage from "@/assets/blog-savings-growth.jpg";
import journeyBudgetImg from "@/assets/journey-budget.jpg";
import journeyInvestImg from "@/assets/journey-invest.jpg";
import journeyThriveImg from "@/assets/journey-thrive.jpg";

const LearnHub = () => {
  const cheatCodes = [
    {
      title: "The Mortgage Cheat Code",
      description: "How weekly payments can save you years and thousands in interest on your mortgage.",
      path: "/blog/mortgage-cheat-code",
      readTime: "10 min",
      featured: true,
      hasPremium: false,
    },
    {
      title: "How to Turn £0 into £1,000,000",
      description: "The proven strategy using compound interest and DCA investing to build wealth from nothing.",
      path: "/blog/cheat-code-01",
      readTime: "12 min",
      featured: false,
      hasPremium: true,
    },
  ];

  const journeyStages = [
    {
      title: "Budget & Track",
      description: "Build control and visibility over your cashflow with practical budgeting strategies.",
      path: "/learn/financial-journey?stage=budget",
      image: journeyBudgetImg,
      color: "bg-rose-500",
      articles: 5,
    },
    {
      title: "Accumulate & Save",
      description: "Grow your cushion and start saving effectively with proven accumulation methods.",
      path: "/learn/financial-journey?stage=accumulate",
      image: journeyBudgetImg,
      color: "bg-sky-500",
      articles: 4,
    },
    {
      title: "Pay Off Debt",
      description: "Clear toxic debt and gain financial freedom using snowball and avalanche strategies.",
      path: "/learn/financial-journey?stage=payoff",
      image: journeyBudgetImg,
      color: "bg-amber-500",
      articles: 4,
    },
    {
      title: "Invest & Grow",
      description: "Make your money work with long-term investment strategies and portfolio building.",
      path: "/learn/financial-journey?stage=invest",
      image: journeyInvestImg,
      color: "bg-emerald-500",
      articles: 6,
    },
    {
      title: "Thrive & Protect",
      description: "Protect, give, and pass forward wealth through insurance, wills, and ethical investing.",
      path: "/learn/financial-journey?stage=thrive",
      image: journeyThriveImg,
      color: "bg-violet-500",
      articles: 4,
    },
  ];

  const blogArticles = [
    {
      title: "Where Your Money Really Goes",
      description: "Track spending for 30 days and discover your true spending patterns.",
      path: "/learn/where-money-goes",
      category: "Budgeting",
      readTime: "15 min",
    },
    {
      title: "50/30/20 Budget Made Personal",
      description: "Adapt the classic budgeting rule to your unique lifestyle and goals.",
      path: "/learn/50-30-20-budget",
      category: "Budgeting",
      readTime: "20 min",
    },
    {
      title: "Building an Emergency Fund That Works",
      description: "Target 3–6 months' expenses with a practical savings strategy.",
      path: "/learn/emergency-fund",
      category: "Saving",
      readTime: "30 min",
    },
    {
      title: "Automate Your Finances Like a Pro",
      description: "Standing orders, automations and friction reduction for effortless money management.",
      path: "/learn/automate-finances",
      category: "Automation",
      readTime: "20 min",
    },
  ];

  return (
    <>
      <SEO
        title="Learn & Insights - Financial Education Hub | Calculator Page"
        description="Master personal finance with our comprehensive guides, cheat codes, and educational content. From budgeting basics to wealth building strategies."
        keywords="financial education, money management, budgeting guide, investment strategies, wealth building, personal finance"
        canonicalUrl="https://thecalculatorpage.com/learn"
      />

      <div className="min-h-screen bg-background">
        {/* Navigation Header */}
        <header className="border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Logo size="md" linkTo="/home" />
            <div className="flex items-center gap-4">
              <Link to="/home">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <NavigationMenu />
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 md:py-28 px-6 border-b border-border">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-px bg-foreground/20" />
              <span className="text-[10px] tracking-[0.4em] text-muted-foreground uppercase font-light">
                Education Hub
              </span>
              <div className="w-12 h-px bg-foreground/20" />
            </div>
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-normal text-foreground tracking-tight mb-6">
              Learn & Insights
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Your complete financial education journey. From cheat codes that accelerate wealth building 
              to comprehensive guides that transform your relationship with money.
            </p>
          </div>
        </section>

        {/* The Cheat Code Section */}
        <section className="py-20 px-6 border-b border-border bg-muted/20">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center gap-4 mb-4">
              <Lightbulb className="h-6 w-6 text-foreground" />
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-foreground tracking-tight">
                The Cheat Code
              </h2>
            </div>
            <p className="text-muted-foreground mb-10 max-w-2xl">
              Discover the hidden strategies the wealthy use to build and preserve wealth. 
              No fluff, just actionable insights that can change your financial trajectory.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              {cheatCodes.map((article, index) => (
                <Link key={index} to={article.path} className="group">
                  <Card className="h-full overflow-hidden border border-border hover:border-foreground/20 transition-all duration-500 bg-card">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={heroImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                      {article.featured && (
                        <Badge className="absolute top-4 left-4 bg-foreground text-background border-0 text-[10px] tracking-widest uppercase">
                          Featured
                        </Badge>
                      )}
                      {article.hasPremium && (
                        <Badge variant="outline" className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm text-[10px] tracking-widest uppercase">
                          <Lock className="h-3 w-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                    </div>
                    <CardHeader className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                          The Cheat Code
                        </span>
                        <span className="text-xs text-muted-foreground">{article.readTime}</span>
                      </div>
                      <CardTitle className="font-serif text-xl font-normal group-hover:text-muted-foreground transition-colors leading-snug">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {article.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-end pt-2 border-t border-border">
                        <span className="text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link to="/blog">
                <Button variant="outline" className="border-border hover:bg-accent">
                  View All Cheat Codes →
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Financial Journey Section */}
        <section className="py-20 px-6 border-b border-border">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center gap-4 mb-4">
              <MapPin className="h-6 w-6 text-foreground" />
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-foreground tracking-tight">
                Financial Growth Journey
              </h2>
            </div>
            <p className="text-muted-foreground mb-10 max-w-2xl">
              Follow a structured path from beginner to confident investor. 
              Each stage builds on the last, creating a comprehensive financial education.
            </p>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {journeyStages.map((stage, index) => (
                <Link key={index} to={stage.path} className="group">
                  <Card className="h-full overflow-hidden border border-border hover:border-foreground/20 transition-all duration-500 bg-card">
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={stage.image}
                        alt={stage.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                      <div className={`absolute top-3 left-3 w-1 h-8 rounded ${stage.color}`} />
                    </div>
                    <CardHeader className="p-4 space-y-2">
                      <CardTitle className="font-serif text-base font-normal group-hover:text-muted-foreground transition-colors">
                        {stage.title}
                      </CardTitle>
                      <CardDescription className="text-xs leading-relaxed line-clamp-2">
                        {stage.description}
                      </CardDescription>
                      <div className="text-[10px] text-muted-foreground pt-1">
                        {stage.articles} articles
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link to="/learn/financial-journey">
                <Button variant="outline" className="border-border hover:bg-accent">
                  Start Your Journey →
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Educational Articles Section */}
        <section className="py-20 px-6 border-b border-border bg-muted/20">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center gap-4 mb-4">
              <GraduationCap className="h-6 w-6 text-foreground" />
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-foreground tracking-tight">
                Educational Articles
              </h2>
            </div>
            <p className="text-muted-foreground mb-10 max-w-2xl">
              Deep-dive guides on specific financial topics. 
              Each article is designed to give you practical knowledge you can apply immediately.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {blogArticles.map((article, index) => (
                <Link key={index} to={article.path} className="group">
                  <Card className="h-full border border-border hover:border-foreground/20 transition-all duration-300 bg-card">
                    <CardHeader className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-[10px] tracking-widest uppercase">
                          {article.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{article.readTime}</span>
                      </div>
                      <CardTitle className="font-serif text-lg font-normal group-hover:text-muted-foreground transition-colors leading-snug">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {article.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-end pt-2 border-t border-border">
                        <span className="text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link to="/learn/financial-journey">
                <Button variant="outline" className="border-border hover:bg-accent">
                  Browse All Articles →
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-background">
          <div className="container mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <Logo size="sm" linkTo="/home" />
              <p className="text-muted-foreground text-sm tracking-wide">
                © 2025 Calculator Page. All content is free to access.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LearnHub;
