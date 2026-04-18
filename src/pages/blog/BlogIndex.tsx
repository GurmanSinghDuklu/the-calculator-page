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
    {
      title: "How Much Can I Borrow? UK Mortgage Affordability Explained",
      description: "Lenders use income multiples, stress tests, and affordability checks. Here's exactly how they calculate your maximum mortgage — and how to improve it.",
      path: "/blog/how-much-can-i-borrow-mortgage-uk",
      category: "Mortgage",
      readTime: "4 min",
      publishDate: "April 2026",
      image: heroImage,
      featured: false,
      hasPremium: false,
    },
    {
      title: "Fixed vs Tracker Mortgage — Which Is Right for You?",
      description: "Fixed gives certainty. Tracker gives flexibility. The right choice depends on your situation, your risk tolerance, and what rates are doing.",
      path: "/blog/fixed-vs-tracker-mortgage",
      category: "Mortgage",
      readTime: "4 min",
      publishDate: "April 2026",
      image: heroImage,
      featured: false,
      hasPremium: false,
    },
    {
      title: "What Is LTV and Why Does It Determine Your Mortgage Rate?",
      description: "Loan-to-value ratio is the single most important number in your mortgage application. Here's what it is, how it's calculated, and how to improve it.",
      path: "/blog/what-is-ltv-mortgage",
      category: "Mortgage",
      readTime: "3 min",
      publishDate: "April 2026",
      image: heroImage,
      featured: false,
      hasPremium: false,
    },
    {
      title: "How to Pay Off Your Mortgage Early — The Numbers That Actually Work",
      description: "You don't need to overpay by thousands to cut years off your mortgage. Small, consistent overpayments compound dramatically.",
      path: "/blog/pay-off-mortgage-early",
      category: "Mortgage",
      readTime: "4 min",
      publishDate: "April 2026",
      image: heroImage,
      featured: false,
      hasPremium: false,
    },
    {
      title: "Stamp Duty UK 2025 — What You Actually Pay and When",
      description: "Stamp duty rates changed in April 2025. First-time buyer thresholds dropped. Here's exactly what you owe, how it's calculated, and what changed.",
      path: "/blog/stamp-duty-uk-2025",
      category: "Mortgage",
      readTime: "4 min",
      publishDate: "April 2026",
      image: heroImage,
      featured: false,
      hasPremium: false,
    },
    {
      title: "First-Time Buyer UK 2025 — The Numbers You Need Before You Apply",
      description: "Deposit, affordability, stamp duty relief, LISAs, schemes. Everything a first-time buyer needs to know in 2025 — with the actual numbers.",
      path: "/blog/first-time-buyer-uk-2025",
      category: "Mortgage",
      readTime: "5 min",
      publishDate: "April 2026",
      image: heroImage,
      featured: false,
      hasPremium: false,
    },
    {
      title: "What Happens to Your Mortgage When Interest Rates Rise?",
      description: "Rising rates hit tracker and variable mortgages immediately. Fixed rates protect you — until the fix ends. Here's what rate rises mean for your payment.",
      path: "/blog/mortgage-interest-rates",
      category: "Mortgage",
      readTime: "4 min",
      publishDate: "April 2026",
      image: heroImage,
      featured: false,
      hasPremium: false,
    },
    {
      title: "UK Income Tax Brackets 2025/26 — Exactly How Much You Keep",
      description: "Frozen thresholds mean more people are paying 40% tax. Here's how the bands work — and how to see your real take-home.",
      path: "/blog/uk-tax-brackets-2025",
      category: "Salary & Tax",
      readTime: "4 min",
      publishDate: "April 2026",
      image: heroImage,
      featured: false,
      hasPremium: false,
    },
    {
      title: "What Is the Personal Allowance and Who Loses It?",
      description: "The UK personal allowance is £12,570 in 2025/26. But earn over £100,000 and it starts disappearing — creating an effective 60% tax rate.",
      path: "/blog/personal-allowance-uk",
      category: "Salary & Tax",
      readTime: "3 min",
      publishDate: "April 2026",
      image: heroImage,
      featured: false,
      hasPremium: false,
    },
    {
      title: "National Insurance 2025/26 — Rates, Thresholds and What You Actually Pay",
      description: "NI rates for 2025/26: 8% up to £50,270, 2% above. Here's how NI is calculated, what it means for your take-home, and what it pays for.",
      path: "/blog/national-insurance-2025",
      category: "Salary & Tax",
      readTime: "4 min",
      publishDate: "April 2026",
      image: heroImage,
      featured: false,
      hasPremium: false,
    },
    {
      title: "How Long Does It Take to Pay Off a Mortgage?",
      description: "The standard UK mortgage term is 25 years. Overpaying £200/month cuts 5 years and saves £26,000. Here's the full breakdown.",
      path: "/blog/how-long-to-pay-off-mortgage",
      category: "Mortgage",
      readTime: "4 min",
      publishDate: "April 2026",
      image: heroImage,
      featured: false,
      hasPremium: false,
    },
    {
      title: "What Is a Good Salary in the UK in 2025?",
      description: "The UK median salary is £37,000. Above £50,270 you're in the top 25% of earners. Here's what different salaries actually give you after tax.",
      path: "/blog/what-is-a-good-salary-uk",
      category: "Salary & Tax",
      readTime: "4 min",
      publishDate: "April 2026",
      image: heroImage,
      featured: false,
      hasPremium: false,
    },
    {
      title: "How Much Should I Save Each Month in the UK?",
      description: "The benchmark is 20% of take-home pay. Here's the priority order, the numbers for UK salaries, and why starting now beats starting bigger later.",
      path: "/blog/how-much-should-i-save-per-month",
      category: "Savings",
      readTime: "4 min",
      publishDate: "April 2026",
      image: heroImage,
      featured: false,
      hasPremium: false,
    },
    {
      title: "What Is an ISA? Types, Allowances and Which One to Use",
      description: "£20,000 per year sheltered from tax — forever. Cash ISA, Stocks & Shares ISA, Lifetime ISA explained with exactly which is right for your goal.",
      path: "/blog/what-is-an-isa",
      category: "Savings",
      readTime: "4 min",
      publishDate: "April 2026",
      image: heroImage,
      featured: false,
      hasPremium: false,
    },
    {
      title: "How Much Do I Need to Retire in the UK?",
      description: "A moderate retirement costs £31,300/year. With the State Pension offset, you need around £495,000. Here's how to calculate your exact target.",
      path: "/blog/how-much-do-i-need-to-retire",
      category: "Savings",
      readTime: "5 min",
      publishDate: "April 2026",
      image: heroImage,
      featured: false,
      hasPremium: false,
    },
    {
      title: "What Is Compound Interest?",
      description: "It earns interest on interest. At 7% annual return, £10,000 grows to £76,123 over 30 years. Here's the formula, the Rule of 72, and how to use it.",
      path: "/blog/what-is-compound-interest",
      category: "Finance",
      readTime: "4 min",
      publishDate: "April 2026",
      image: heroImage,
      featured: false,
      hasPremium: false,
    },
    {
      title: "What Is Capital Gains Tax in the UK?",
      description: "CGT is 10–24% on profits from selling assets. Everyone gets a £3,000 annual exemption. Here's what triggers it, what's exempt, and how to reduce your bill.",
      path: "/blog/what-is-capital-gains-tax-uk",
      category: "Tax",
      readTime: "5 min",
      publishDate: "April 2026",
      image: heroImage,
      featured: false,
      hasPremium: false,
    },
    {
      title: "What Is Inheritance Tax in the UK?",
      description: "IHT is 40% on estates above £325,000 — but couples can pass up to £1,000,000 tax-free. Here's how the thresholds work and the 7-year rule explained.",
      path: "/blog/what-is-inheritance-tax-uk",
      category: "Tax",
      readTime: "5 min",
      publishDate: "April 2026",
      image: heroImage,
      featured: false,
      hasPremium: false,
    },
    {
      title: "How to Calculate a Percentage",
      description: "Five types of percentage calculation — percentage of a number, percentage change, reverse percentage, and VAT — with formulas and worked examples.",
      path: "/blog/how-to-calculate-percentage",
      category: "Everyday Maths",
      readTime: "4 min",
      publishDate: "April 2026",
      image: heroImage,
      featured: false,
      hasPremium: false,
    },
    {
      title: "What Is BMI?",
      description: "BMI = weight (kg) ÷ height (m)². Healthy is 18.5–24.9. Here's the formula, the WHO categories, and why BMI has real limitations.",
      path: "/blog/what-is-bmi",
      category: "Health",
      readTime: "4 min",
      publishDate: "April 2026",
      image: heroImage,
      featured: false,
      hasPremium: false,
    },
    {
      title: "How to Save for a House Deposit in the UK",
      description: "The government adds 25% to LISA savings — up to £1,000 free per year. Here's the fastest realistic path to a first-time buyer deposit.",
      path: "/blog/how-to-save-for-a-house-deposit",
      category: "Property",
      readTime: "5 min",
      publishDate: "April 2026",
      image: heroImage,
      featured: false,
      hasPremium: false,
    },
    {
      title: "What Is VAT in the UK?",
      description: "VAT is 20% on most goods and services. The registration threshold is £90,000. Here's how to add and remove VAT, and what the three rates cover.",
      path: "/blog/what-is-vat-uk",
      category: "Tax",
      readTime: "4 min",
      publishDate: "April 2026",
      image: heroImage,
      featured: false,
      hasPremium: false,
    },
    {
      title: "How Much Is Stamp Duty in 2025?",
      description: "Thresholds changed on 1 April 2025. First-time buyer relief dropped to £300,000. Here's exactly what you'll pay on any purchase price.",
      path: "/blog/how-much-is-stamp-duty-2025",
      category: "Property",
      readTime: "4 min",
      publishDate: "April 2026",
      image: heroImage,
      featured: false,
      hasPremium: false,
    },
    {
      title: "What Is a Stocks and Shares ISA?",
      description: "Zero capital gains tax. Zero dividend tax. £20,000/year allowance. Here's how a Stocks and Shares ISA works and what to invest in.",
      path: "/blog/what-is-a-stocks-and-shares-isa",
      category: "Investing",
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
        canonicalUrl="https://www.thecalculatorapp.org/blog"
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

        </section>
      </div>
    </>
  );
};

export default BlogIndex;
