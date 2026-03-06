import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { NavigationMenu } from "@/components/NavigationMenu";
import { Home, Lock, ArrowRight } from "lucide-react";
import heroImage from "@/assets/blog-savings-growth.jpg";

const BlogIndex = () => {
  const articles = [
    {
      title: "The Mortgage Cheat Code: How Weekly Payments Can Save You Years",
      description: "Discover how switching to weekly mortgage payments can shave years off your mortgage and save thousands in interest.",
      path: "/blog/mortgage-cheat-code",
      category: "The Cheat Code",
      readTime: "10 min",
      publishDate: "December 2024",
      image: heroImage,
      featured: true,
      hasPremium: false,
    },
    {
      title: "The Cheat Code #1: How to Turn £0 into £1,000,000",
      description: "Discover the proven strategy to build wealth from nothing. Learn how compound interest, DCA investing, and time can turn £0 into £1 million.",
      path: "/blog/cheat-code-01",
      category: "The Cheat Code",
      readTime: "12 min",
      publishDate: "November 2024",
      image: heroImage,
      featured: false,
      hasPremium: true,
    },
  ];

  return (
    <>
      <SEO
        title="The Cheat Code - Financial Blog | Calculator Page"
        description="Learn the secrets of finance and money to get ahead. Expert insights on wealth building, investing strategies, and financial independence."
        keywords="financial blog, wealth building, investment strategies, money management, financial education"
        canonicalUrl="https://www.thecalculatorpage.com/blog"
      />

      <div className="min-h-screen bg-background">
        {/* Navigation Header */}
        <header className="border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
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
              <Link to="/">
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
        <section className="py-20 md:py-28 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-px bg-foreground/20" />
              <span className="text-[10px] tracking-[0.4em] text-muted-foreground uppercase font-light">
                Financial Insights
              </span>
              <div className="w-12 h-px bg-foreground/20" />
            </div>
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-normal text-foreground tracking-tight mb-6">
              The Cheat Code
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Learn the strategies the wealthy use to build and preserve wealth. 
              No fluff, just actionable insights.
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="container mx-auto px-6 pb-20">
          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            {articles.map((article, index) => (
              <Link key={index} to={article.path} className="group">
                <Card className="h-full overflow-hidden border border-border hover:border-foreground/20 transition-all duration-500 bg-card">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
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
                        {article.category}
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
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-xs text-muted-foreground">{article.publishDate}</span>
                      <span className="text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Coming Soon */}
          <div className="mt-16 text-center">
            <Card className="max-w-xl mx-auto border border-dashed border-border bg-transparent">
              <CardHeader className="space-y-2">
                <CardTitle className="font-serif text-xl font-normal">More Articles Coming Soon</CardTitle>
                <CardDescription className="text-sm">
                  We're working on more in-depth guides covering advanced investing strategies,
                  tax optimization, and building passive income streams.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogIndex;
