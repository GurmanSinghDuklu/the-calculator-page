import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator, Shield, Banknote, Gift } from "lucide-react";

export default function TaxEfficientAccounts() {
  return (
    <>
      <SEO
        title="Tax-Efficient Accounts: ISAs, SIPPs & More - UK Guide"
        description="Comprehensive guide to UK tax wrappers including ISAs, SIPPs, and LISAs. Learn how to minimize tax on your investments and maximize your returns legally."
        keywords="ISA explained, SIPP pension, LISA UK, tax efficient investing, tax wrappers UK, Stocks and Shares ISA, pension tax relief"
        canonicalUrl="/learn/tax-efficient-accounts"
      />
      
      <ArticleLayout
        title="Tax-Efficient Accounts (ISAs, SIPPs)"
        description="UK-specific tax wrappers explained"
        readTime="25 min"
        category="Invest"
        categoryColor="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
        nextArticle={{
          title: "How to Rebalance and Review Your Portfolio",
          path: "/learn/portfolio-rebalancing"
        }}
      >
        <h2>Why Tax Efficiency Matters</h2>
        <p>
          Tax can take a significant chunk of your investment returns. The UK government offers 
          several "tax wrappers" that let you invest without paying tax on gains or income. 
          Using these properly can save you tens of thousands over your lifetime.
        </p>

        <h2>ISAs (Individual Savings Accounts)</h2>
        
        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <Shield className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">The ISA Advantage</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Everything inside an ISA grows completely tax-free. No capital gains tax, no dividend 
            tax, no income tax. Ever.
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Annual allowance: £20,000 per tax year</li>
            <li>• Use it or lose it—unused allowance doesn't roll over</li>
            <li>• Can withdraw anytime (except LISA before 60)</li>
            <li>• Multiple ISA types can be used in same year</li>
          </ul>
        </div>

        <h3>Types of ISAs</h3>

        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium">Cash ISA</p>
              <p className="text-muted-foreground">
                Tax-free interest on cash savings. Best for emergency funds or short-term goals 
                if you're near/over your Personal Savings Allowance.
              </p>
            </div>
            <div>
              <p className="font-medium">Stocks & Shares ISA</p>
              <p className="text-muted-foreground">
                Tax-free growth on investments. Best for long-term wealth building. Most valuable 
                for higher earners and larger portfolios.
              </p>
            </div>
            <div>
              <p className="font-medium">Lifetime ISA (LISA)</p>
              <p className="text-muted-foreground">
                25% government bonus on contributions (up to £1,000/year free money). For first 
                home purchase or retirement after 60. Penalties for early withdrawal.
              </p>
            </div>
            <div>
              <p className="font-medium">Innovative Finance ISA</p>
              <p className="text-muted-foreground">
                Tax-free interest on peer-to-peer lending. Higher risk, specialist product.
              </p>
            </div>
          </div>
        </div>

        <h2>Pensions (SIPPs)</h2>
        
        <div className="not-prose bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <Banknote className="h-5 w-5 text-emerald-600 mt-0.5" />
            <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">The Pension Advantage</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Pensions offer tax relief on the way in AND tax-free growth. They're the most 
            powerful tax wrapper available, but with restrictions on access.
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Tax relief at your marginal rate (20-45%)</li>
            <li>• £100 in costs you £80 (basic rate) or £60 (higher rate)</li>
            <li>• Tax-free growth inside the pension</li>
            <li>• 25% tax-free lump sum at retirement</li>
            <li>• Access from age 55 (rising to 57 in 2028)</li>
          </ul>
        </div>

        <h3>Workplace Pension vs SIPP</h3>

        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-background rounded-lg border border-border">
              <p className="font-medium mb-2">Workplace Pension</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Employer contributions (free money!)</li>
                <li>• Automatic tax relief</li>
                <li>• Limited investment choices</li>
                <li>• May have higher fees</li>
              </ul>
            </div>
            <div className="p-4 bg-background rounded-lg border border-border">
              <p className="font-medium mb-2">SIPP (Personal Pension)</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• You choose the provider</li>
                <li>• Full investment flexibility</li>
                <li>• Often lower fees</li>
                <li>• No employer match (unless paid in)</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Best strategy: Max out workplace pension employer match, then use SIPP for additional 
            contributions if you want better investment options.
          </p>
        </div>

        <h2>LISA: The Hybrid Option</h2>
        
        <div className="not-prose bg-violet-500/10 border border-violet-500/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <Gift className="h-5 w-5 text-violet-600 mt-0.5" />
            <h4 className="font-semibold text-violet-700 dark:text-violet-300">Lifetime ISA Details</h4>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">Who Can Open</p>
              <p>Ages 18-39 (can continue contributing until 50)</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Contribution Limit</p>
              <p>£4,000 per year (counts toward £20k ISA allowance)</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Government Bonus</p>
              <p>25% on contributions = up to £1,000 free per year</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Qualifying Purposes</p>
              <p>First home (up to £450k) or retirement (after 60)</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Early Withdrawal Penalty</p>
              <p>25% on total (you lose the bonus plus 6.25% of your money)</p>
            </div>
          </div>
        </div>

        <h2>Priority Order for Contributions</h2>
        <ol>
          <li>
            <strong>Workplace pension to full employer match</strong><br/>
            <span className="text-muted-foreground">Free money. Never leave employer matching on the table.</span>
          </li>
          <li>
            <strong>LISA if buying first home</strong><br/>
            <span className="text-muted-foreground">25% bonus is unbeatable for house deposit.</span>
          </li>
          <li>
            <strong>Stocks & Shares ISA</strong><br/>
            <span className="text-muted-foreground">Flexible, tax-free, no access restrictions.</span>
          </li>
          <li>
            <strong>Additional pension contributions</strong><br/>
            <span className="text-muted-foreground">Especially valuable for higher rate taxpayers.</span>
          </li>
          <li>
            <strong>General Investment Account</strong><br/>
            <span className="text-muted-foreground">Only after ISA allowance is used.</span>
          </li>
        </ol>

        <h2>Tax Relief for Higher Earners</h2>
        <p>
          If you're a higher (40%) or additional (45%) rate taxpayer, pension contributions are 
          incredibly powerful:
        </p>
        <ul>
          <li>£100 in pension costs you only £60 (40% tax relief)</li>
          <li>Salary sacrifice adds NI savings (~12% more)</li>
          <li>You can reclaim additional relief through tax return</li>
          <li>Consider whether to use ISA or pension based on future tax rates</li>
        </ul>

        <h2>Action Steps</h2>
        <ol>
          <li>Check if you're getting full employer pension match</li>
          <li>Open a Stocks & Shares ISA if you don't have one</li>
          <li>If under 40 and buying first home, consider a LISA</li>
          <li>Calculate how much of your £20k ISA allowance you're using</li>
          <li>For higher earners: Review if additional pension contributions make sense</li>
        </ol>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <p className="text-sm font-medium mb-2">💡 Pro Tip</p>
          <p className="text-sm text-muted-foreground">
            The tax year runs April to April. Don't leave ISA contributions to the last minute 
            in March—you'll miss out on months of growth. Set up regular monthly contributions 
            instead.
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
                Use our Retirement Calculator to see how different pension contribution levels 
                and tax relief rates affect your retirement fund.
              </p>
              <Link to="/finance/retirement">
                <Button>Try Retirement Calculator →</Button>
              </Link>
            </div>
          </div>
        </Card>
      </ArticleLayout>
    </>
  );
}