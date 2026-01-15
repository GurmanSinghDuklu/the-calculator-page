import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator, Leaf, Heart, Globe } from "lucide-react";

export default function EthicalInvesting() {
  return (
    <>
      <SEO
        title="Giving Back and Ethical Investing - Purpose-Driven Wealth"
        description="Explore ethical investing, ESG funds, and giving strategies. Learn how to align your investments with your values without sacrificing returns."
        keywords="ethical investing UK, ESG funds, sustainable investing, impact investing, socially responsible investing, charity giving, philanthropy"
        canonicalUrl="/learn/ethical-investing"
      />
      
      <ArticleLayout
        title="Giving Back and Ethical Investing"
        description="Purpose-driven wealth allocation"
        readTime="20 min"
        category="Thrive"
        categoryColor="bg-violet-500/10 text-violet-700 dark:text-violet-300"
        nextArticle={{
          title: "How to Teach Money Skills to Others",
          path: "/learn/teach-money-skills"
        }}
      >
        <h2>Wealth With Purpose</h2>
        <p>
          Building wealth isn't just about the numbers—it's about what that wealth enables. 
          Whether through ethical investing, charitable giving, or both, you can align your 
          financial life with your values.
        </p>

        <h2>Understanding Ethical Investing</h2>

        <h3>What Is ESG?</h3>
        
        <div className="not-prose bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <Leaf className="h-5 w-5 text-emerald-600 mt-0.5" />
            <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">Environmental, Social, Governance</h4>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">Environmental</p>
              <p>Climate impact, carbon emissions, renewable energy, waste management</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Social</p>
              <p>Labor practices, diversity, community impact, human rights</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Governance</p>
              <p>Executive pay, board diversity, corruption, shareholder rights</p>
            </div>
          </div>
        </div>

        <h3>Approaches to Ethical Investing</h3>
        <ul>
          <li>
            <strong>Negative screening:</strong> Exclude harmful industries (tobacco, weapons, 
            fossil fuels, gambling)
          </li>
          <li>
            <strong>Positive screening:</strong> Actively invest in beneficial companies 
            (renewable energy, healthcare, education)
          </li>
          <li>
            <strong>ESG integration:</strong> Consider ESG factors alongside financial factors 
            in all investment decisions
          </li>
          <li>
            <strong>Impact investing:</strong> Invest specifically to create measurable positive 
            impact (often private markets)
          </li>
        </ul>

        <h2>Do Ethical Investments Underperform?</h2>
        <p>
          The short answer: not necessarily. Research shows mixed results, but many ESG funds 
          have performed in line with or better than traditional funds.
        </p>
        
        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <h4 className="font-semibold mb-4">Key Considerations</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ ESG factors can indicate quality management and lower risks</li>
            <li>✓ Avoiding stranded assets (fossil fuel companies) may protect returns</li>
            <li>✓ Growing demand for ESG investments drives performance</li>
            <li>⚠ Fewer companies = less diversification</li>
            <li>⚠ ESG funds often have higher fees than broad index funds</li>
            <li>⚠ "Greenwashing" - not all ESG funds are equally ethical</li>
          </ul>
        </div>

        <h2>Ethical Investment Options in the UK</h2>

        <h3>ESG Index Funds & ETFs</h3>
        <ul>
          <li><strong>Vanguard ESG Global All Cap:</strong> Low-cost, broad ESG screening</li>
          <li><strong>iShares MSCI World ESG Screened:</strong> Global developed markets</li>
          <li><strong>Legal & General Future World ESG:</strong> Developed markets focus</li>
        </ul>

        <h3>Active ESG Funds</h3>
        <ul>
          <li><strong>Impax Environmental Markets:</strong> Environmental solutions focus</li>
          <li><strong>Liontrust Sustainable Future:</strong> Range of sustainability funds</li>
          <li><strong>Baillie Gifford Positive Change:</strong> Impact-focused growth</li>
        </ul>

        <h2>Charitable Giving Strategies</h2>

        <div className="not-prose bg-violet-500/10 border border-violet-500/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <Heart className="h-5 w-5 text-violet-600 mt-0.5" />
            <h4 className="font-semibold text-violet-700 dark:text-violet-300">Tax-Efficient Giving</h4>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">Gift Aid</p>
              <p>Charities claim 25% extra on your donation. £100 gift = £125 for charity.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Higher Rate Tax Relief</p>
              <p>Higher rate taxpayers can claim additional 20% back through tax return.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Payroll Giving</p>
              <p>Donate before tax. £100 from gross salary = only ~£60 cost to you.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Donating Shares</p>
              <p>No capital gains tax on shares donated to charity + income tax relief.</p>
            </div>
          </div>
        </div>

        <h3>How Much to Give?</h3>
        <p>
          There's no right answer, but common frameworks include:
        </p>
        <ul>
          <li><strong>1% for the Planet:</strong> 1% of income to environmental causes</li>
          <li><strong>Giving What We Can:</strong> 10% pledge for effective charities</li>
          <li><strong>Tithing:</strong> Traditional 10% of income</li>
          <li><strong>Percentage of wealth:</strong> Annual giving from investment returns</li>
        </ul>

        <h2>Effective Altruism</h2>
        
        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <div className="flex items-start gap-3 mb-4">
            <Globe className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">Maximizing Impact</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Effective altruism asks: "How can I do the most good with my resources?" 
            Key principles:
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Focus on evidence-based interventions</li>
            <li>• Prioritize neglected causes</li>
            <li>• Consider cost-effectiveness (lives saved per £)</li>
            <li>• Think globally (your pound goes further in developing countries)</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            Resources: GiveWell, Giving What We Can, 80,000 Hours
          </p>
        </div>

        <h2>Creating Your Giving Plan</h2>
        <ol>
          <li><strong>Identify your values:</strong> What causes matter most to you?</li>
          <li><strong>Set a giving budget:</strong> What percentage of income or wealth?</li>
          <li><strong>Research charities:</strong> Use evaluators like Charity Navigator, 
          GiveWell</li>
          <li><strong>Consider recurring gifts:</strong> Monthly donations are often more 
          valuable to charities</li>
          <li><strong>Track your giving:</strong> See your cumulative impact over time</li>
        </ol>

        <h2>Balancing Ethics and Returns</h2>
        <p>
          You don't have to sacrifice returns entirely for ethics:
        </p>
        <ul>
          <li>
            <strong>Core + Satellite:</strong> Most money in standard index funds, some in 
            higher-cost ESG or impact investments
          </li>
          <li>
            <strong>Low-cost ESG:</strong> Use ESG index funds to minimize fee drag
          </li>
          <li>
            <strong>Focus giving, not investing:</strong> Invest purely for returns, then 
            give a percentage to causes you care about
          </li>
        </ul>

        <h2>Action Steps</h2>
        <ol>
          <li>Review your current investments—do they align with your values?</li>
          <li>Research ESG fund options available in your ISA/pension</li>
          <li>Decide on a giving target (even 1% is meaningful)</li>
          <li>Set up regular donations to causes you care about</li>
          <li>Ensure you're claiming Gift Aid and tax relief</li>
        </ol>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <p className="text-sm font-medium mb-2">💡 Pro Tip</p>
          <p className="text-sm text-muted-foreground">
            Don't let perfect be the enemy of good. A simple ESG fund is better than analysis 
            paralysis. A regular £20/month donation beats a promised future windfall. Start 
            somewhere, refine later.
          </p>
        </div>

        <Card className="not-prose bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 p-6 my-8">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Put It Into Practice</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Use our Compound Interest Calculator to see how even a small percentage of your 
                investment returns could grow a charitable giving fund over time.
              </p>
              <Link to="/finance/compound-interest">
                <Button>Try Compound Interest Calculator →</Button>
              </Link>
            </div>
          </div>
        </Card>
      </ArticleLayout>
    </>
  );
}