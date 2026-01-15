import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator, Shield, FileText, Users } from "lucide-react";

export default function ProtectWealth() {
  return (
    <>
      <SEO
        title="Protecting Your Wealth: Insurance & Wills - UK Guide"
        description="Essential guide to protecting your wealth and family through insurance, wills, and estate planning. Learn what coverage you need and how to prepare for the unexpected."
        keywords="life insurance UK, income protection, will writing, estate planning, wealth protection, critical illness cover, family protection UK"
        canonicalUrl="/learn/protect-wealth"
      />
      
      <ArticleLayout
        title="Protecting Your Wealth (Insurance & Wills)"
        description="Risk management and family protection"
        readTime="20–30 min"
        category="Thrive"
        categoryColor="bg-violet-500/10 text-violet-700 dark:text-violet-300"
        nextArticle={{
          title: "Giving Back and Ethical Investing",
          path: "/learn/ethical-investing"
        }}
      >
        <h2>Why Protection Matters</h2>
        <p>
          Building wealth is only half the battle. Protecting it from unexpected events—illness, 
          death, accidents—ensures your hard work benefits you and your loved ones. This isn't 
          pessimistic; it's responsible.
        </p>

        <h2>Essential Insurance Types</h2>

        <h3>Life Insurance</h3>
        
        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <Shield className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">Who Needs Life Insurance?</h4>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ Anyone with dependents (children, non-working spouse)</li>
            <li>✓ Anyone with a mortgage or shared debt</li>
            <li>✓ Business owners with partners</li>
            <li>✗ Single people with no dependents (usually unnecessary)</li>
          </ul>
        </div>

        <h4>Types of Life Insurance</h4>
        <ul>
          <li>
            <strong>Term Life:</strong> Covers a fixed period (e.g., 25 years). Cheapest option. 
            Pays out only if you die during the term.
          </li>
          <li>
            <strong>Decreasing Term:</strong> Payout decreases over time. Matches a repayment 
            mortgage. Very affordable.
          </li>
          <li>
            <strong>Level Term:</strong> Fixed payout throughout the term. Good for family 
            protection.
          </li>
          <li>
            <strong>Whole of Life:</strong> Covers you until death, guaranteed payout. Much more 
            expensive, often unnecessary.
          </li>
        </ul>

        <h3>Income Protection</h3>
        <p>
          Often more valuable than life insurance. Pays a percentage of your salary if you 
          can't work due to illness or injury.
        </p>
        <ul>
          <li>Typically pays 50-70% of income</li>
          <li>Continues until you recover, retire, or die</li>
          <li>Choose a waiting period (4 weeks to 1 year)—longer = cheaper</li>
          <li>Check what sick pay your employer offers first</li>
        </ul>

        <h3>Critical Illness Cover</h3>
        <p>
          Pays a lump sum if diagnosed with a specified serious illness (cancer, heart attack, 
          stroke, etc.).
        </p>
        <ul>
          <li>One-time payout, not ongoing like income protection</li>
          <li>Can be added to life insurance or bought separately</li>
          <li>Check the policy's list of covered conditions carefully</li>
        </ul>

        <h2>How Much Cover Do You Need?</h2>
        
        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <h4 className="font-semibold mb-4">Life Insurance Calculation</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• <strong>Mortgage balance:</strong> Ensure your home is paid off</li>
            <li>• <strong>Annual expenses × 10:</strong> Cover family for ~10 years</li>
            <li>• <strong>Outstanding debts:</strong> Credit cards, loans</li>
            <li>• <strong>Funeral costs:</strong> ~£4,000-6,000</li>
            <li>• <strong>Children's education:</strong> If planning private/university</li>
          </ul>
          <p className="text-sm font-medium mt-4">
            Common range: 10-15× annual salary for main breadwinner
          </p>
        </div>

        <h2>Writing a Will</h2>
        
        <div className="not-prose bg-violet-500/10 border border-violet-500/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <FileText className="h-5 w-5 text-violet-600 mt-0.5" />
            <h4 className="font-semibold text-violet-700 dark:text-violet-300">Why Everyone Needs a Will</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Without a will, intestacy rules decide who gets your assets—often not what you'd 
            choose. A will lets you:
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Name who inherits what</li>
            <li>• Appoint guardians for children</li>
            <li>• Minimize inheritance tax</li>
            <li>• Appoint trusted executors</li>
            <li>• Leave gifts to charities</li>
          </ul>
        </div>

        <h3>How to Get a Will</h3>
        <ul>
          <li><strong>DIY will kits:</strong> £10-30. Fine for simple situations.</li>
          <li><strong>Online will services:</strong> £90-150. Guided process, legally valid.</li>
          <li><strong>Solicitor:</strong> £150-500+. Best for complex estates, blended families.</li>
          <li><strong>Will Aid (November):</strong> Free will from participating solicitors in 
          exchange for charity donation.</li>
        </ul>

        <h3>Key Will Decisions</h3>
        <ul>
          <li>Who inherits your estate (spouse, children, others)?</li>
          <li>Who looks after your children if you both die?</li>
          <li>Who are your executors (people who carry out your wishes)?</li>
          <li>Any specific gifts (jewelry, heirlooms, cash)?</li>
          <li>Charitable donations?</li>
        </ul>

        <h2>Powers of Attorney</h2>
        
        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <div className="flex items-start gap-3 mb-4">
            <Users className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">Lasting Powers of Attorney (LPA)</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            If you become mentally incapacitated (dementia, stroke, accident), who makes 
            decisions for you?
          </p>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">Property & Financial Affairs LPA</p>
              <p>Someone manages your money, pays bills, sells property if needed.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Health & Welfare LPA</p>
              <p>Someone makes medical and care decisions on your behalf.</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Without LPAs, your family may need costly court proceedings to manage your affairs.
          </p>
        </div>

        <h2>Estate Planning Basics</h2>

        <h3>Inheritance Tax (IHT)</h3>
        <p>
          Estates above £325,000 (nil rate band) face 40% tax. Key exemptions:
        </p>
        <ul>
          <li><strong>Spouse exemption:</strong> Transfers between spouses are tax-free</li>
          <li><strong>Residence nil rate band:</strong> Extra £175,000 if passing home to children</li>
          <li><strong>7-year rule:</strong> Gifts made 7+ years before death are exempt</li>
          <li><strong>Charity exemption:</strong> Leave 10%+ to charity, rate drops to 36%</li>
        </ul>

        <h3>Simple IHT Planning</h3>
        <ul>
          <li>Use your annual £3,000 gift exemption</li>
          <li>Make regular gifts from surplus income</li>
          <li>Consider passing on wealth earlier if comfortable</li>
          <li>Life insurance in trust doesn't count toward estate</li>
        </ul>

        <h2>Action Steps</h2>
        <ol>
          <li>Audit your current insurance (life, income protection, critical illness)</li>
          <li>Calculate how much life cover you need if you have dependents</li>
          <li>Get quotes from comparison sites or a broker</li>
          <li>Write a will if you don't have one</li>
          <li>Consider setting up Lasting Powers of Attorney</li>
          <li>Review beneficiaries on pensions and life insurance</li>
        </ol>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <p className="text-sm font-medium mb-2">💡 Pro Tip</p>
          <p className="text-sm text-muted-foreground">
            Put life insurance policies "in trust." This keeps the payout outside your estate 
            (no inheritance tax) and pays out faster (no need to wait for probate). It's usually 
            free and can be done when you buy the policy.
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
                Use our Mortgage Calculator to see your outstanding balance—a key input for 
                determining how much life insurance coverage you need.
              </p>
              <Link to="/finance/mortgage">
                <Button>Try Mortgage Calculator →</Button>
              </Link>
            </div>
          </div>
        </Card>
      </ArticleLayout>
    </>
  );
}