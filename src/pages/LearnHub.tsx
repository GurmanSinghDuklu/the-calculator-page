import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { NavigationMenu } from "@/components/NavigationMenu";
import { Home, Lightbulb, MapPin, GraduationCap, ArrowRight, Lock } from "lucide-react";

import heroImage        from "@/assets/blog-savings-growth.jpg";
import journeyBudgetImg from "@/assets/journey-budget.jpg";
import journeyInvestImg from "@/assets/journey-invest.jpg";
import journeyThriveImg from "@/assets/journey-thrive.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────
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
  { title: "Budget & Track",      description: "Build control and visibility over your cashflow.",                      path: "/learn/financial-journey?stage=budget",     image: journeyBudgetImg, accent: "#F87171", articles: 5 },
  { title: "Accumulate & Save",   description: "Grow your cushion and start saving effectively.",                      path: "/learn/financial-journey?stage=accumulate",  image: journeyBudgetImg, accent: "#38BDF8", articles: 4 },
  { title: "Pay Off Debt",        description: "Clear toxic debt using snowball and avalanche strategies.",            path: "/learn/financial-journey?stage=payoff",     image: journeyBudgetImg, accent: "#FBBF24", articles: 4 },
  { title: "Invest & Grow",       description: "Make your money work with long-term investment strategies.",          path: "/learn/financial-journey?stage=invest",     image: journeyInvestImg, accent: "#34D399", articles: 6 },
  { title: "Thrive & Protect",    description: "Protect, give, and pass forward wealth through ethical planning.",    path: "/learn/financial-journey?stage=thrive",     image: journeyThriveImg, accent: "#A78BFA", articles: 4 },
];

const blogArticles = [
  { title: "Where Your Money Really Goes",          description: "Track spending for 30 days and discover your true spending patterns.",                      path: "/learn/where-money-goes",      category: "Budgeting",  readTime: "15 min" },
  { title: "50/30/20 Budget Made Personal",         description: "Adapt the classic budgeting rule to your unique lifestyle and goals.",                      path: "/learn/50-30-20-budget",       category: "Budgeting",  readTime: "20 min" },
  { title: "Building an Emergency Fund That Works", description: "Target 3–6 months' expenses with a practical savings strategy.",                           path: "/learn/emergency-fund",        category: "Saving",     readTime: "30 min" },
  { title: "Automate Your Finances Like a Pro",     description: "Standing orders, automations and friction reduction for effortless money management.",      path: "/learn/automate-finances",     category: "Automation", readTime: "20 min" },
];

// ─── Category accent colours for article badges ───────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  Budgeting:  "#3B82F6",
  Saving:     "#22C55E",
  Automation: "#F97316",
};

// ─── Reusable section header ──────────────────────────────────────────────────
function SectionHeader({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle: string }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-3">
        <Icon className="h-5 w-5 text-white/30" />
        <p className="font-display text-3xl md:text-4xl text-white tracking-wide uppercase">{title}</p>
      </div>
      <p className="text-white/60 text-sm font-sans leading-relaxed max-w-xl pl-8">{subtitle}</p>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
const LearnHub = () => {
  return (
    <>
      <SEO
        title="Learn - Financial Education Hub"
        description="Master personal finance with our comprehensive guides, cheat codes, and educational content. From budgeting basics to wealth building strategies."
        keywords="financial education, money management, budgeting guide, investment strategies, wealth building, personal finance"
        canonicalUrl="https://www.thecalculatorapp.org/learn"
      />

      <div className="min-h-screen bg-dark-bg text-dark-text font-sans">

        {/* ── Sticky header ── */}
        <header className="sticky top-0 z-50 bg-[#1C1A1A]/90 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Logo linkTo="/" size="sm" />
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors font-heading text-[10px] uppercase tracking-widest">
                <Home className="h-4 w-4" /> Home
              </Link>
              <NavigationMenu />
            </div>
          </div>
        </header>

        {/* ── Hero ── */}
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-16 select-none">
          <div className="absolute w-[700px] h-[500px] rounded-full blur-[160px] opacity-[0.06] pointer-events-none -z-10"
            style={{ background: "linear-gradient(135deg, #3B82F6, #a78bfa)", top: 0, left: 0 }} />

          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-white/20" />
            <p className="text-[9px] font-heading uppercase tracking-[0.4em] text-white/25">Education Hub</p>
            <div className="w-8 h-px bg-white/20" />
          </div>

          <h1 className="font-display leading-[0.85] tracking-tighter">
            <span className="block text-[11vw] md:text-[92px]" style={{
              background: "linear-gradient(135deg, #3B82F6 0%, #a78bfa 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              filter: "drop-shadow(0 0 40px #3B82F640)",
            }}>LEARN &amp;</span>
            <span className="block text-[11vw] md:text-[92px]" style={{
              background: "linear-gradient(135deg, #3B82F6 0%, #a78bfa 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>INSIGHTS</span>
          </h1>

          <div className="mt-8 max-w-lg pl-4 border-l-2 border-blue-500/40">
            <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
              Your complete financial education journey. From cheat codes that accelerate wealth building to comprehensive guides that transform your relationship with money.
            </p>
          </div>
        </div>

        {/* ── The Cheat Code ── */}
        <div className="bg-[#252323]/40 border-t border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <SectionHeader
              icon={Lightbulb}
              title="The Cheat Code"
              subtitle="Discover the hidden strategies the wealthy use to build and preserve wealth. No fluff, just actionable insights."
            />

            <div className="grid md:grid-cols-2 gap-6">
              {cheatCodes.map(article => (
                <Link key={article.path} to={article.path}
                  className="group bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img src={heroImage} alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#252323] via-[#252323]/50 to-transparent" />
                    {article.featured && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white text-black font-heading text-[9px] uppercase tracking-widest rounded-full">
                        Featured
                      </div>
                    )}
                    {article.hasPremium && (
                      <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-black/60 backdrop-blur-sm border border-white/20 font-heading text-[9px] uppercase tracking-widest rounded-full text-white/50">
                        <Lock className="h-3 w-3" /> Premium
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/50">The Cheat Code</p>
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/50">{article.readTime}</p>
                    </div>
                    <p className="font-display text-xl text-white mb-2 leading-tight group-hover:text-white/70 transition-colors">
                      {article.title}
                    </p>
                    <p className="text-white/65 text-sm font-sans leading-relaxed">{article.description}</p>
                    <div className="flex justify-end mt-4 pt-4 border-t border-white/10">
                      <span className="flex items-center gap-1 text-white/55 font-heading text-[10px] uppercase tracking-widest group-hover:text-white group-hover:gap-2 transition-all">
                        Read <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link to="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 rounded-xl font-heading text-[10px] uppercase tracking-widest text-white/40 hover:text-white hover:border-white/30 transition-all">
                View All Cheat Codes <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Financial Journey ── */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <SectionHeader
            icon={MapPin}
            title="Financial Growth Journey"
            subtitle="Follow a structured path from beginner to confident investor. Each stage builds on the last."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {journeyStages.map(stage => (
              <Link key={stage.path} to={stage.path}
                className="group bg-[#252323]/80 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300">
                {/* Image */}
                <div className="relative h-32 overflow-hidden">
                  <img src={stage.image} alt={stage.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#252323] to-transparent" />
                  <div className="absolute top-0 left-0 w-1 h-full" style={{ background: stage.accent }} />
                </div>
                {/* Content */}
                <div className="p-4">
                  <p className="font-display text-base text-white mb-1 group-hover:text-white/70 transition-colors">{stage.title}</p>
                  <p className="text-[10px] text-white/60 font-sans leading-relaxed line-clamp-2">{stage.description}</p>
                  <p className="text-[9px] font-heading uppercase tracking-widest mt-2" style={{ color: `${stage.accent}CC` }}>
                    {stage.articles} articles
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/learn/financial-journey"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 rounded-xl font-heading text-[10px] uppercase tracking-widest text-white/40 hover:text-white hover:border-white/30 transition-all">
              Start Your Journey <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* ── Educational Articles ── */}
        <div className="bg-[#252323]/40 border-t border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <SectionHeader
              icon={GraduationCap}
              title="Educational Articles"
              subtitle="Deep-dive guides on specific financial topics. Practical knowledge you can apply immediately."
            />

            <div className="grid md:grid-cols-2 gap-4">
              {blogArticles.map(article => {
                const color = CATEGORY_COLORS[article.category] || "#3B82F6";
                return (
                  <Link key={article.path} to={article.path}
                    className="group bg-[#252323]/80 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full font-heading text-[9px] uppercase tracking-widest border"
                        style={{ borderColor: `${color}50`, background: `${color}15`, color }}>
                        {article.category}
                      </span>
                      <span className="text-[9px] font-heading uppercase tracking-widest text-white/50">{article.readTime}</span>
                    </div>
                    <p className="font-display text-lg text-white mb-2 group-hover:text-white/70 transition-colors leading-tight">
                      {article.title}
                    </p>
                    <p className="text-white/65 text-sm font-sans leading-relaxed">{article.description}</p>
                    <div className="flex justify-end mt-4 pt-4 border-t border-white/10">
                      <span className="flex items-center gap-1 text-white/55 font-heading text-[10px] uppercase tracking-widest group-hover:text-white group-hover:gap-2 transition-all">
                        Read <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <Link to="/learn/financial-journey"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 rounded-xl font-heading text-[10px] uppercase tracking-widest text-white/40 hover:text-white hover:border-white/30 transition-all">
                Browse All Articles <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <Logo size="sm" />
            <p className="text-xs text-gray-500 uppercase tracking-widest">© 2026 The Calculator App. All content is free to access.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LearnHub;