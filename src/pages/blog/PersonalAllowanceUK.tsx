import { BlogLayout } from "@/components/BlogLayout";
import { SEO } from "@/components/SEO";

const faqs = [
  { question: "What is the personal allowance for 2025/26?", answer: "The personal allowance is £12,570 for 2025/26. This is the amount you can earn before paying any income tax. It has been frozen at this level since 2021 and is set to remain frozen until at least 2028." },
  { question: "Who loses their personal allowance?", answer: "Your personal allowance reduces by £1 for every £2 you earn over £100,000. It disappears completely at £125,140. So someone earning £110,000 has a personal allowance of £7,570 — not the full £12,570." },
  { question: "Does the personal allowance apply to all types of income?", answer: "Yes — the personal allowance applies to all taxable income including employment income, self-employment profits, rental income, and savings interest. However, different rules apply to savings interest (Personal Savings Allowance) and dividends (Dividend Allowance), which are separate allowances." },
  { question: "Can I transfer my personal allowance to my spouse?", answer: "The Marriage Allowance lets a lower-earning spouse transfer £1,260 of their personal allowance to their partner, saving up to £252 per year in tax. Both partners must be basic rate taxpayers. The transfer can be backdated up to 4 years." },
  { question: "What is the blind person's allowance?", answer: "People registered as blind or severely sight impaired can claim an additional tax-free allowance of £3,070 in 2025/26, on top of the standard personal allowance." },
];

export default function PersonalAllowanceUK() {
  return (
    <>
      <SEO
        title="What Is the Personal Allowance and Who Loses It?"
        description="The UK personal allowance is £12,570 in 2025/26. But earn over £100,000 and it starts disappearing — creating an effective 60% tax rate. Here's how it works."
        keywords="personal allowance uk 2025, personal allowance £12570, who loses personal allowance, personal allowance over 100k, marriage allowance uk"
        canonicalUrl="https://www.thecalculatorapp.org/blog/personal-allowance-uk"
        faqSchema={faqs}
      />
      <BlogLayout
        title="What Is the Personal Allowance and Who Loses It?"
        subtitle="£12,570 tax-free — unless you earn over £100,000. Then it gets complicated fast."
        category="Salary & Tax"
        publishDate="April 2026"
        readTime="3 min"
        heroImage="/og-image.png"
        hasPaidSection={false}
        relatedArticles={[
          { title: "UK Salary Calculator", description: "See exactly how the personal allowance affects your take-home pay.", url: "/finance/salary" },
          { title: "UK Tax Brackets 2025/26", description: "The full breakdown of every income tax band.", url: "/blog/uk-tax-brackets-2025" },
          { title: "National Insurance 2025", description: "The other deduction that comes straight out of your salary.", url: "/blog/national-insurance-2025" },
        ]}
      >
        <p>The personal allowance is the portion of your income you don't pay tax on. In 2025/26 it's <strong>£12,570</strong>. Earn less than that and you owe no income tax at all. Earn more and you pay tax only on the excess.</p>

        <p>Simple enough. Until you earn over £100,000.</p>

        <h2>How the allowance reduces at higher incomes</h2>

        <p>For every £2 you earn above £100,000, you lose £1 of personal allowance. By £125,140 the allowance is completely gone.</p>

        <p>That taper creates an effective marginal tax rate of <strong>60%</strong> on income between £100,000 and £125,140 — 40% income tax, plus losing 20p of tax-free allowance per pound earned.</p>

        <p>Here's how it looks:</p>
        <ul>
          <li>Income £100,000: full personal allowance of £12,570</li>
          <li>Income £110,000: allowance reduced to £7,570</li>
          <li>Income £120,000: allowance reduced to £2,570</li>
          <li>Income £125,140+: no personal allowance</li>
        </ul>

        <h2>The pension solution</h2>

        <p>Pension contributions reduce your adjusted net income — the figure used to calculate allowance tapering. Many higher earners make additional pension contributions specifically to bring their income below £100,000 and restore their full personal allowance.</p>

        <p>Someone earning £110,000 who contributes £10,000 to a pension brings their adjusted income to £100,000, restoring their full £12,570 allowance and saving roughly <strong>£5,000 in tax</strong>. The pension contribution effectively costs them £5,000 because of the tax saving — a £10,000 contribution at a total cost of £5,000.</p>

        <h2>Marriage allowance</h2>

        <p>If one partner earns below the personal allowance threshold and the other pays basic rate tax, the lower earner can transfer £1,260 of their allowance to their partner — saving up to <strong>£252 per year</strong>. It can be backdated four years, potentially worth over £1,000 for couples who haven't claimed it.</p>

        <h2>Check your take-home</h2>

        <p>The salary calculator automatically applies the correct personal allowance based on your income — including the taper reduction above £100,000. Enter your salary to see your exact tax-free amount and take-home figure.</p>
      </BlogLayout>
    </>
  );
}
