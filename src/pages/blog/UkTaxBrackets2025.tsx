import { BlogLayout } from "@/components/BlogLayout";
import { SEO } from "@/components/SEO";

const faqs = [
  { question: "What are the UK income tax brackets for 2025/26?", answer: "For 2025/26: 0% on income up to £12,570 (personal allowance), 20% basic rate from £12,571 to £50,270, 40% higher rate from £50,271 to £125,140, 45% additional rate above £125,140. Scotland has different rates and bands." },
  { question: "What is the personal allowance for 2025/26?", answer: "The personal allowance is £12,570 for 2025/26 — unchanged from the previous year. It's the amount you can earn before paying any income tax. The allowance is reduced by £1 for every £2 you earn over £100,000 and disappears entirely at £125,140." },
  { question: "What is the difference between marginal and effective tax rate?", answer: "Your marginal rate is the rate on your last pound of income — 20%, 40%, or 45%. Your effective rate is your total tax as a percentage of your total income. Someone earning £60,000 pays 40% on income between £50,270 and £60,000, but their effective rate on the full £60,000 is much lower — around 22%." },
  { question: "Do I pay National Insurance on top of income tax?", answer: "Yes. National Insurance is separate from income tax. In 2025/26, employees pay 8% NI on earnings between £12,570 and £50,270, and 2% above £50,270. This significantly increases the total deduction from your gross salary." },
  { question: "What is the 60% tax trap?", answer: "When your income goes from £100,000 to £125,140, your personal allowance reduces by £1 for every £2 earned. This means you're effectively taxed at 60% on income in this range — 40% income tax plus losing 20p of allowance for every extra pound earned. Pension contributions can be used to reduce income below £100,000 and avoid this trap." },
];

export default function UkTaxBrackets2025() {
  return (
    <>
      <SEO
        title="UK Income Tax Brackets 2025/26 — Exactly How Much You Keep"
        description="The UK income tax bands haven't changed for 2025/26 but fiscal drag means more people are paying 40% tax. Here's exactly how the system works and what you actually take home."
        keywords="uk tax brackets 2025, income tax rates uk 2025, uk tax bands 2025/26, personal allowance 2025, how much tax do i pay uk"
        canonicalUrl="https://www.thecalculatorapp.org/blog/uk-tax-brackets-2025"
        faqSchema={faqs}
      />
      <BlogLayout
        title="UK Income Tax Brackets 2025/26 — Exactly How Much You Keep"
        subtitle="Frozen thresholds mean more people are paying higher rate tax. Here's how the bands work — and how to see your real take-home."
        category="Salary & Tax"
        publishDate="April 2026"
        readTime="4 min"
        heroImage="/og-image.png"
        directAnswer="The UK income tax bands for 2025/26 are: 0% on the first £12,570 (personal allowance), 20% from £12,571 to £50,270, 40% from £50,271 to £125,140, and 45% above £125,140. These thresholds have been frozen since 2021, meaning wage rises push more people into the 40% bracket each year — a process called fiscal drag."
        hasPaidSection={false}
        relatedCalculators={[
          { label: "UK Salary Calculator", path: "/finance/salary" },
          { label: "UK Tax Brackets 2025", path: "/blog/uk-tax-brackets-2025" },
          { label: "Budget Calculator", path: "/finance/budget" },
        ]}
        relatedArticles={[
          { title: "UK Salary Calculator", description: "Your exact take-home after income tax, NI, student loan and pension.", url: "/finance/salary" },
          { title: "What Is the Personal Allowance?", description: "The full explanation of who gets it, who loses it, and why.", url: "/blog/personal-allowance-uk" },
          { title: "National Insurance 2025 Explained", description: "The second deduction most people don't fully understand.", url: "/blog/national-insurance-2025" },
        ]}
      >
        <p>The UK tax bands haven't changed for 2025/26. What has changed is how many people fall into the higher rate bracket — because the thresholds have been frozen since 2021 while wages have risen. That's fiscal drag. And it's quietly moving hundreds of thousands of people into 40% tax.</p>

        <h2>The 2025/26 income tax bands</h2>

        <ul>
          <li><strong>£0 – £12,570</strong> — Personal allowance. No tax.</li>
          <li><strong>£12,571 – £50,270</strong> — Basic rate. 20%.</li>
          <li><strong>£50,271 – £125,140</strong> — Higher rate. 40%.</li>
          <li><strong>Above £125,140</strong> — Additional rate. 45%.</li>
        </ul>

        <p>These are the bands in England and Northern Ireland. Scotland has its own rates and bands, including a starter rate and intermediate rate that differ from the rest of the UK.</p>

        <h2>Marginal rate vs effective rate</h2>

        <p>This is where most people get confused. Your marginal rate is what you pay on your <em>last pound</em> of income. Your effective rate is your total tax as a percentage of your total income.</p>

        <p>Example: £60,000 salary. You pay:</p>
        <ul>
          <li>0% on the first £12,570 = £0</li>
          <li>20% on £12,571–£50,270 = £7,540</li>
          <li>40% on £50,271–£60,000 = £3,892</li>
          <li><strong>Total: £11,432</strong></li>
        </ul>

        <p>Your marginal rate is 40%. Your effective rate is £11,432 ÷ £60,000 = <strong>19%</strong>. Significantly lower. Understanding the difference stops people making bad decisions about pay rises and bonuses.</p>

        <h2>The £100,000 trap</h2>

        <p>At £100,000, your personal allowance starts reducing — £1 for every £2 earned above £100,000. By £125,140 it's gone entirely. In this range, your effective marginal rate is <strong>60%</strong>.</p>

        <p>That's not a mistake. Forty percent income tax, plus losing 20p of tax-free allowance on every extra pound. Many people in this bracket make pension contributions to bring their adjusted income below £100,000 — legally reducing their tax bill by thousands.</p>

        <h2>Remember: you also pay National Insurance</h2>

        <p>Income tax is not your only deduction. Employees also pay National Insurance — 8% on earnings between £12,570 and £50,270, and 2% above that. On a £50,000 salary, NI adds roughly £3,000 to your annual tax bill on top of income tax.</p>

        <p>Use the salary calculator to see your full take-home — income tax, NI, student loan, and pension all calculated together in one place.</p>
      </BlogLayout>
    </>
  );
}
