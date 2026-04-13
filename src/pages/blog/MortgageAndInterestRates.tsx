import { BlogLayout } from "@/components/BlogLayout";
import { SEO } from "@/components/SEO";

const faqs = [
  { question: "What happens to my mortgage when interest rates rise?", answer: "It depends on your mortgage type. On a tracker or variable rate mortgage, your monthly payment rises immediately when the Bank of England base rate increases. On a fixed rate mortgage, your payments stay the same until your fixed term ends — then you remortgage at whatever rates are available at that point." },
  { question: "How much does a 1% rate rise add to monthly mortgage payments?", answer: "On a £200,000 mortgage over 25 years, a 1% rate increase adds roughly £100–£110 to your monthly payment. On a £350,000 mortgage, that's around £180–£190 per month. The exact figure depends on your outstanding balance and remaining term." },
  { question: "Should I fix my mortgage rate when rates are rising?", answer: "Fixing gives certainty — your payment won't change for the fixed term regardless of what rates do. But you pay for that certainty, and you could miss out if rates fall. Most people fix to protect their budget rather than to speculate on rate movements. If a rate rise would seriously strain your finances, fix." },
  { question: "What is the Bank of England base rate and how does it affect mortgages?", answer: "The Bank of England base rate is the interest rate at which the Bank lends to commercial banks. Lenders typically track this when setting variable and tracker mortgage rates. When the base rate rises, tracker mortgages rise by the same amount, and standard variable rates (SVR) usually follow, though not always immediately or by the full amount." },
  { question: "Can I remortgage to escape a rising rate?", answer: "If you're on a tracker or SVR, yes — you can remortgage to a fixed rate at any time (though check for early repayment charges). If you're mid-fix, you'll pay an early repayment charge to switch, which may or may not be worth it depending on how long you have left and how much rates have moved." },
];

export default function MortgageAndInterestRates() {
  return (
    <>
      <SEO
        title="What Happens to Your Mortgage When Interest Rates Rise?"
        description="Rising rates hit tracker and variable mortgages immediately. Fixed rates protect you — until the fix ends. Here's what rate rises actually mean for your monthly payment."
        keywords="mortgage interest rates rise, bank of england base rate mortgage, tracker mortgage rate rise, fixed vs variable mortgage rates, remortgage rising rates"
        canonicalUrl="https://www.thecalculatorapp.org/blog/mortgage-interest-rates"
        faqSchema={faqs}
      />
      <BlogLayout
        title="What Happens to Your Mortgage When Interest Rates Rise?"
        subtitle="Fixed, tracker, variable — each responds differently. Here's what you're actually exposed to."
        category="Mortgage"
        publishDate="April 2026"
        readTime="4 min"
        heroImage="/og-image.png"
        hasPaidSection={false}
        relatedArticles={[
          { title: "Mortgage Calculator", description: "Recalculate your monthly payments at any interest rate.", url: "/finance/mortgage" },
          { title: "Fixed vs Tracker Mortgage", description: "The full comparison of both mortgage types — with the numbers.", url: "/blog/fixed-vs-tracker-mortgage" },
          { title: "Mortgage Cost Comparison", description: "Compare the total cost of different mortgage deals side by side.", url: "/finance/mortgage-cost-comparison" },
        ]}
      >
        <p>When the Bank of England raises rates, millions of mortgage holders feel it — but not equally, and not all at once. Whether you're protected depends entirely on what type of mortgage you have.</p>

        <h2>Fixed rate mortgages — protected until the end</h2>

        <p>A fixed rate mortgage locks your interest rate for a set period — usually 2 or 5 years. During that time, rate rises don't touch you. Your payment stays exactly the same whatever the Bank of England does.</p>

        <p>The catch: when your fix ends, you remortgage at current rates. If rates have risen significantly during your fixed term, your new payment will be higher than your old one — sometimes substantially. Many homeowners who fixed at 1.5–2% in 2020–21 faced a painful jump when they came to remortgage in 2023–24.</p>

        <h2>Tracker mortgages — follow the base rate directly</h2>

        <p>A tracker mortgage is pegged to the Bank of England base rate plus a set margin. If the base rate rises 0.25%, your mortgage rate rises 0.25% — immediately, usually from the next monthly payment.</p>

        <p>On a £200,000 mortgage over 25 years, each 0.25% increase adds roughly <strong>£25–£28 per month</strong>. A 1% increase adds around <strong>£100–£110 per month</strong>. That doesn't sound catastrophic until you've had five increases in a year.</p>

        <h2>Standard variable rate — the most unpredictable</h2>

        <p>If you're on your lender's Standard Variable Rate (SVR) — what you drift to when a fixed or tracker deal ends — you're exposed to whatever rate your lender sets. SVRs typically track the base rate loosely but lenders can move them independently. SVRs are almost always higher than fix or tracker rates available to new customers. Being on SVR is rarely intentional — it's what happens when you don't remortgage.</p>

        <h2>The numbers: what a rate rise actually costs</h2>

        <p>Starting from a £250,000 mortgage over 25 years:</p>
        <ul>
          <li>At 3%: monthly payment <strong>£1,185</strong></li>
          <li>At 4%: monthly payment <strong>£1,319</strong> (+£134/month)</li>
          <li>At 5%: monthly payment <strong>£1,461</strong> (+£276/month vs 3%)</li>
          <li>At 6%: monthly payment <strong>£1,610</strong> (+£425/month vs 3%)</li>
        </ul>

        <p>Each percentage point increase costs roughly £130–£160 more per month on a £250,000 balance. On a £400,000 mortgage, that's £200–£250 per additional percent.</p>

        <h2>What to do when rates are rising</h2>

        <p>If you're on a tracker or SVR and rate rises are straining your budget, switching to a fix locks in certainty — even if the fixed rate is higher than your current tracker rate, the certainty has value. If you have more than 6 months left on a fix, check what early repayment charges apply before switching.</p>

        <p>If you're approaching the end of a fix, you can typically lock in a new fixed rate up to 6 months before your current deal ends — without paying an ERC. In a rising rate environment, doing this early makes sense.</p>

        <h2>Run your numbers</h2>

        <p>Use the mortgage calculator to see what your payment would be at different interest rates. Enter your current balance and remaining term, then try different rates to understand your real exposure before your next remortgage.</p>
      </BlogLayout>
    </>
  );
}
