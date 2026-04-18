import { BlogLayout } from "@/components/BlogLayout";
import { SEO } from "@/components/SEO";

const faqs = [
  { question: "How much deposit do I need to buy a house in the UK?", answer: "The minimum deposit for a residential mortgage in the UK is typically 5% of the purchase price, though 10% unlocks significantly better rates and 20%+ gives you access to the best deals. On a £250,000 home: 5% = £12,500, 10% = £25,000, 20% = £50,000. First-time buyers can use the Lifetime ISA (LISA) — the government adds a 25% bonus on savings up to £4,000/year, worth up to £1,000/year free money toward your deposit." },
  { question: "How long does it take to save for a house deposit?", answer: "At the UK median salary of £37,000 (£2,450/month take-home), saving 20% of income (£490/month) into a 4.5% AER savings account, it takes approximately: 3 years to save a 5% deposit on a £200,000 home (£10,000). 5 years for a 10% deposit. 10 years for a 20% deposit. A Lifetime ISA accelerates this significantly — £333/month into a LISA = £4,000/year + £1,000 government bonus = £5,000/year toward a deposit." },
  { question: "What is a Lifetime ISA (LISA) and should I use one for a house?", answer: "A Lifetime ISA lets you save up to £4,000/year and the government adds a 25% bonus (up to £1,000/year). The total pot (your savings + bonus) can be used to buy your first home, provided the property costs £450,000 or less and you're a first-time buyer. You must have had the LISA open for at least 12 months before using it. The penalty for withdrawing for any other reason (other than age 60+ or terminal illness) is 25% — which effectively claws back the bonus and a small part of your own savings." },
  { question: "What is a Help to Buy ISA vs Lifetime ISA?", answer: "Help to Buy ISAs closed to new applicants in November 2019 and existing holders can claim the bonus until 2030. If you already have one, you can save up to £200/month with a 25% government bonus on the closing balance (max £3,000 bonus on £12,000 savings). You cannot open a new Help to Buy ISA. New first-time buyers should use a Lifetime ISA instead, which has a higher annual limit (£4,000 vs £2,400) and higher maximum bonus (£33,000 lifetime vs £3,000)." },
  { question: "Where should I keep my house deposit savings?", answer: "The best options in order of return: 1) Lifetime ISA (if first-time buyer) — 4.5%+ AER plus 25% government bonus makes this the best return available by far. 2) High-interest easy-access savings accounts — currently paying 4.5–5% AER. 3) Fixed-rate savings bonds — slightly higher rates (5–5.5%) but money is locked for 1–2 years. 4) Cash ISA — same rates as easy-access but tax-free (relevant if you'd otherwise breach the Personal Savings Allowance). Keep deposit savings in cash — don't invest in stocks as the timeline is too short and a market crash just before you buy is devastating." },
];

export default function HowDoISaveForAHouse() {
  return (
    <>
      <SEO
        title="How to Save for a House Deposit UK: LISA, Timelines & Strategy (2025)"
        description="The minimum deposit is 5% but 10% unlocks better rates. With a Lifetime ISA you get £1,000 free per year from the government. Here's the fastest realistic path."
        keywords="how to save for a house deposit uk, lifetime isa house deposit, first time buyer savings uk, house deposit savings 2025, how long to save house deposit"
        canonicalUrl="https://www.thecalculatorapp.org/blog/how-to-save-for-a-house-deposit"
        faqSchema={faqs}
      />
      <BlogLayout
        title="How to Save for a House Deposit in the UK"
        subtitle="The government will give you up to £1,000 a year for free toward your deposit. Most first-time buyers don't use it correctly."
        category="Property"
        publishDate="April 2026"
        readTime="5 min"
        heroImage="/og-image.png"
        directAnswer="To save for a house deposit in the UK, open a Lifetime ISA if you're a first-time buyer — save up to £4,000/year and the government adds 25% (up to £1,000/year free). The minimum deposit is 5% of the purchase price but aim for 10% for better mortgage rates. On a £250,000 home at £500/month savings including the LISA bonus, you can reach a 10% deposit in roughly 4 years."
        hasPaidSection={false}
        relatedCalculators={[
          { label: "Savings Calculator", path: "/finance/savings" },
          { label: "Mortgage Calculator", path: "/finance/mortgage" },
          { label: "Stamp Duty Calculator", path: "/finance/stamp-duty" },
          { label: "How Long to Save", path: "/finance/how-long-to-save" },
        ]}
        relatedArticles={[
          { title: "How Much Can I Borrow for a Mortgage?", description: "Work out your borrowing limit before you start saving.", url: "/blog/how-much-can-i-borrow-mortgage-uk" },
          { title: "Stamp Duty in 2025", description: "Budget for the tax you'll owe on top of the purchase price.", url: "/blog/stamp-duty-uk-2025" },
          { title: "First-Time Buyer Guide 2025", description: "The full end-to-end guide for first-time buyers.", url: "/blog/first-time-buyer-uk-2025" },
        ]}
      >
        <p>Saving for a house deposit in the UK is a long game. But there's a government scheme that adds 25% to your savings every year — and most first-time buyers either don't know about it or aren't using it optimally.</p>

        <h2>How much deposit do you actually need?</h2>

        <p>The minimum for most lenders is <strong>5%</strong> of the purchase price. But 5% comes with significant disadvantages:</p>

        <ul>
          <li>Higher-risk mortgage products with higher rates</li>
          <li>Higher monthly repayments</li>
          <li>Less equity buffer if prices fall</li>
          <li>Mortgage insurance (some lenders require it at high LTVs)</li>
        </ul>

        <p>The sweet spots are <strong>10%</strong> (materially better rates) and <strong>20%</strong> (access to the best deals on the market). For most first-time buyers, 10% is the realistic target.</p>

        <p>Required deposits on common property values:</p>
        <ul>
          <li>£200,000 home: 5% = £10,000 | 10% = £20,000 | 20% = £40,000</li>
          <li>£300,000 home: 5% = £15,000 | 10% = £30,000 | 20% = £60,000</li>
          <li>£450,000 home: 5% = £22,500 | 10% = £45,000 | 20% = £90,000</li>
        </ul>

        <p>Don't forget to budget for additional costs: stamp duty (if applicable — first-time buyers are exempt on homes up to £425,000 until March 2025, then £300,000), solicitor fees (£1,500–£3,000), survey (£400–£1,500), and mortgage arrangement fees (£0–£2,000).</p>

        <h2>The Lifetime ISA: the most underused first-time buyer tool</h2>

        <p>The <strong>Lifetime ISA (LISA)</strong> pays a <strong>25% government bonus</strong> on everything you save, up to £4,000/year. That's up to £1,000 of free money every tax year.</p>

        <p>Key rules:</p>
        <ul>
          <li>Must be between 18–39 years old to open</li>
          <li>Can save up to £4,000/year (£333/month)</li>
          <li>25% bonus paid monthly by HMRC</li>
          <li>Must have had it open for <strong>12 months</strong> before using for a property purchase</li>
          <li>Property must cost <strong>£450,000 or less</strong></li>
          <li>Must be a first-time buyer</li>
          <li>Withdrawing for any other reason (before age 60) incurs a 25% penalty on the whole pot</li>
        </ul>

        <p><strong>Example of the LISA in action:</strong> You save £333/month (£4,000/year). The government adds £1,000. After 4 years: you've contributed £16,000, received £4,000 in bonuses, plus interest on the full pot. On a 4.5% AER LISA, the total after 4 years is approximately <strong>£22,500</strong> — vs £18,000 without the LISA bonus.</p>

        <h2>Best accounts for deposit savings</h2>

        <p><strong>1. Lifetime ISA</strong> — best by far for eligible first-time buyers. The 25% bonus effectively gives you a guaranteed 25% return on top of whatever interest rate the account pays. Skipton and Moneybox offer LISA products.</p>

        <p><strong>2. High-interest easy-access savings accounts</strong> — currently paying 4.5–5% AER (April 2026). Good for the portion of savings above the £4,000 LISA limit, or if you're not LISA-eligible. Chase, Chip, and Marcus consistently offer competitive rates.</p>

        <p><strong>3. Fixed-rate bonds</strong> — 1–2 year fixes currently offer 5–5.5% AER. Suitable if you're confident you won't need the money for the fixed period. Don't lock away emergency funds.</p>

        <p><strong>Do not invest your deposit in stocks.</strong> If you need the money in under 5 years, stock market volatility can destroy your deposit in a downturn. Cash savings only.</p>

        <h2>How to build your savings plan</h2>

        <p>A realistic framework for a 10% deposit on a £280,000 property (£28,000 target):</p>

        <ul>
          <li>Max out LISA: £333/month → £4,000/year savings + £1,000 bonus = £5,000/year toward deposit</li>
          <li>Additional easy-access savings: £400/month → £4,800/year</li>
          <li>Total annual saving: £9,800</li>
          <li>Time to reach £28,000 (with 4.5% AER): approximately <strong>2.7 years</strong></li>
        </ul>

        <p>The LISA bonus shaves 6–12 months off most deposit timelines. Open one as early as possible — the 12-month lock-in clock starts the day you open the account, not when you start depositing seriously.</p>

        <h2>One thing most people get wrong</h2>

        <p>People wait until they have a large lump sum before opening a LISA. The 12-month rule means the clock starts on opening day. Open the LISA now with £1. Put it somewhere you won't touch it. The 12 months start running immediately.</p>

        <h2>Frequently asked questions</h2>
        {faqs.map((faq, i) => (
          <div key={i}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </BlogLayout>
    </>
  );
}
