import { BlogLayout } from "@/components/BlogLayout";
import { SEO } from "@/components/SEO";

const faqs = [
  { question: "What is an ISA and how does it work?", answer: "An ISA (Individual Savings Account) is a UK tax wrapper that shelters savings or investments from income tax and capital gains tax. In 2025/26, you can deposit up to £20,000 per year across all ISA types. Any interest, dividends, or investment gains made inside an ISA are completely tax-free — now and in the future, even when you withdraw." },
  { question: "What are the different types of ISA?", answer: "The main ISA types are: Cash ISA (tax-free savings account, currently paying 4–5% AER), Stocks and Shares ISA (invest in funds, shares, bonds tax-free), Lifetime ISA or LISA (save for a first home or retirement, government adds 25% bonus up to £1,000/year), and Innovative Finance ISA (peer-to-peer lending, higher risk). The annual allowance of £20,000 can be split across types in any combination." },
  { question: "Should I use a Cash ISA or Stocks and Shares ISA?", answer: "Cash ISA is best for money you might need within 1–5 years — it's safe, accessible, and earns tax-free interest. A Stocks and Shares ISA is better for money you can leave invested for 5+ years, as historically equities outperform cash significantly over longer periods. Many people use both — cash ISA for emergency fund or short-term goals, stocks ISA for long-term wealth building." },
  { question: "What is the ISA allowance for 2025/26?", answer: "The ISA allowance for 2025/26 is £20,000 per person per tax year. This allowance resets on 6 April each year and cannot be carried forward — any unused allowance from the previous year is lost. A married couple can shelter up to £40,000 per year across their combined ISAs." },
  { question: "Is it worth having an ISA if I'm a basic rate taxpayer?", answer: "Yes — even for basic rate taxpayers. The Personal Savings Allowance lets basic rate taxpayers earn £1,000 in savings interest tax-free, so for many savers with modest balances, a Cash ISA offers the same effective outcome as a non-ISA account. However, a Stocks and Shares ISA provides a permanent shelter for investment gains and dividends with no annual limit on gains, making it valuable at any income level." },
];

export default function WhatIsAnISA() {
  return (
    <>
      <SEO
        title="What Is an ISA? Types, Allowances and Which One to Use in 2025"
        description="An ISA shelters up to £20,000 per year from tax — forever. Here's how Cash ISAs, Stocks & Shares ISAs, and Lifetime ISAs work, and which is right for you."
        keywords="what is an isa uk, isa allowance 2025, cash isa vs stocks and shares isa, lifetime isa, isa explained uk"
        canonicalUrl="https://www.thecalculatorapp.org/blog/what-is-an-isa"
        faqSchema={faqs}
      />
      <BlogLayout
        title="What Is an ISA? Types, Allowances and Which One to Use"
        subtitle="£20,000 per year, completely sheltered from tax — forever. Here's exactly how ISAs work and which type fits your goals."
        category="Savings"
        publishDate="April 2026"
        readTime="4 min"
        heroImage="/og-image.png"
        directAnswer="An ISA (Individual Savings Account) is a UK tax wrapper that protects savings and investments from income tax and capital gains tax. You can deposit up to £20,000 per year across all ISA types. Any interest, dividends, or investment growth inside an ISA is completely tax-free — both now and when you withdraw. The allowance resets every 6 April and unused allowance cannot be carried forward."
        hasPaidSection={false}
        relatedArticles={[
          { title: "ISA Calculator", description: "See how your ISA balance grows with regular contributions.", url: "/finance/isa-calculator" },
          { title: "Savings Calculator", description: "Compare ISA and non-ISA savings growth side by side.", url: "/finance/savings" },
          { title: "How Much Should I Save Per Month?", description: "The framework for splitting your savings across different goals.", url: "/blog/how-much-should-i-save-per-month" },
        ]}
      >
        <p>The ISA is one of the most straightforward and powerful savings tools available in the UK. The concept is simple: money inside an ISA grows tax-free, and withdrawals are tax-free. HMRC cannot touch it, regardless of how much it grows.</p>

        <h2>The four main ISA types</h2>

        <p><strong>Cash ISA</strong> — a savings account that pays interest free of income tax. Best for money you may need access to within 1–5 years. Currently paying 4–5% AER with the best easy-access deals. Safe and simple.</p>

        <p><strong>Stocks and Shares ISA</strong> — an investment account that shelters dividends and capital gains from tax. Best for money you can leave for 5+ years. Historically equities return 7–10% annually over long periods, significantly outperforming cash.</p>

        <p><strong>Lifetime ISA (LISA)</strong> — saves for a first home or retirement. You deposit up to £4,000/year and the government adds a <strong>25% bonus</strong> (up to £1,000/year free). Must be used to buy a first home worth under £450,000, or held until age 60. Must open before age 40.</p>

        <p><strong>Innovative Finance ISA</strong> — wraps peer-to-peer lending in a tax-free account. Higher potential returns but significantly higher risk. Not suitable for most savers.</p>

        <h2>The £20,000 allowance — use it or lose it</h2>

        <p>Every adult in the UK gets a £20,000 ISA allowance each tax year (6 April to 5 April). You can split it across types in any combination — for example, £10,000 into a Cash ISA and £10,000 into a Stocks and Shares ISA. The allowance resets annually. <strong>Unused allowance cannot be carried forward</strong> — if you don't use this year's allowance by 5 April, it's gone.</p>

        <p>A couple can together shelter up to £40,000 per year. Over 20 years at modest investment returns, this compounds into genuinely significant tax-free wealth.</p>

        <h2>Cash ISA vs Stocks and Shares ISA — the decision</h2>

        <p>The decision comes down to time horizon:</p>
        <ul>
          <li><strong>Need the money within 3 years?</strong> Cash ISA. Market investments can fall significantly over short periods.</li>
          <li><strong>Leaving it for 5+ years?</strong> Stocks and Shares ISA. Over long periods, diversified equities have consistently outperformed cash by 4–6% per year.</li>
          <li><strong>Saving for a first home?</strong> Lifetime ISA for the 25% bonus, but only if the property will be under £450,000.</li>
        </ul>

        <p>The most powerful approach is to use both: a Cash ISA for your emergency fund and near-term goals, a Stocks and Shares ISA for long-term wealth, and a LISA if you're a first-time buyer under 40.</p>

        <h2>Is a Cash ISA worth it if I don't pay tax on savings?</h2>

        <p>Basic rate taxpayers get a Personal Savings Allowance of £1,000 per year in interest before tax applies. At 5% AER you'd need £20,000 in savings before the allowance runs out — so for many people, a Cash ISA and a regular savings account produce the same outcome.</p>

        <p>But the ISA advantage compounds over time. As your balance grows, interest eventually exceeds the allowance. And unlike the non-ISA account, the ISA protects you permanently — including from future changes to the Personal Savings Allowance.</p>

        <p>Use the ISA calculator to model your balance with regular monthly contributions and see exactly how tax-free compounding builds over 5, 10, and 20 years.</p>
      </BlogLayout>
    </>
  );
}
