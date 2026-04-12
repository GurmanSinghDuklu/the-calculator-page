import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Lock, ArrowRight } from "lucide-react";
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
    {
      title: "You're Losing $147,000 by Investing Monthly Instead of Weekly",
      description: "Same investment. Same market. One small change in frequency can cost you $147,000 over 30 years. Here's the math — and how to fix it.",
      path: "/blog/weekly-vs-monthly-investing",
      category: "The Cheat Code",
      readTime: "5 min",
      publishDate: "April 2026",
      image: heroImage,
      featured: false,
      hasPremium: false,
    },
  ];

  return (
    <>
      <SEO
        title="The Cheat Code - Financial Blog | Calculator App"
        description="Learn the secrets of finance and money to get ahead. Expert insights on wealth building, investing strategies, and financial independence."
        keywords="financial blog, wealth building, investment strategies, money management, financial education"
        canonicalUrl="https://www.thecalculatorpage.com/blog"
      />

      <div className="min-h-screen bg-black text-white">
        <Navbar />

        {/* Hero Section */}
        <section className="py-20 md:py-28 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-px bg-white/20" />
              <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase font-heading">
                Financial Insights
              </span>
              <div className="w-12 h-px bg-white/20" />
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-normal text-white tracking-tight mb-6">
              The Cheat Code
            </h1>

            <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Learn the strategies the wealthy use to build and preserve wealth.
              No fluff, just actionable insights.
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            {articles.map((article, index) => (
              <Link key={index} to={article.path} className="group">
                <div className="h-full overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 bg-white/[0.015]">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    {article.featured && (
                      <Badge className="absolute top-4 left-4 bg-white text-black border-0 text-[10px] tracking-widest uppercase font-heading">
                        Featured
                      </Badge>
                    )}
                    {article.hasPremium && (
                      <Badge variant="outline" className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-[10px] tracking-widest uppercase font-heading text-white border-white/20">
                        <Lock className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase font-heading">
                        {article.category}
                      </span>
                      <span className="text-xs text-white/40 font-heading">{article.readTime}</span>
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-normal group-hover:text-white/70 transition-colors leading-snug text-white mb-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {article.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-white/8">
                      <span className="text-xs text-white/25 font-heading">{article.publishDate}</span>
                      <span className="text-xs font-heading text-white flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Coming Soon */}
          <div className="mt-16 text-center">
            <div className="max-w-xl mx-auto border border-dashed border-white/10 bg-white/[0.015] p-6">
              <h3 className="font-display text-xl font-normal text-white mb-2">More Articles Coming Soon</h3>
              <p className="text-sm text-zinc-400">
                We're working on more in-depth guides covering advanced investing strategies,
                tax optimization, and building passive income streams.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogIndex;
