import { BlogLayout } from "@/components/BlogLayout";
import { SEO } from "@/components/SEO";

const faqs = [
  { question: "What is compound interest?", answer: "Compound interest is interest calculated on both your original deposit (the principal) and all previously earned interest. Unlike simple interest — which only calculates on the principal — compound interest grows exponentially over time. Albert Einstein reportedly called it the eighth wonder of the world. The formula is A = P(1 + r/n)^(nt), where P is principal, r is annual rate, n is compounding frequency, and t is years." },
  { question: "How much does compound interest actually make?", answer: "The difference is dramatic over long periods. £10,000 invested at 7% for 30 years: with simple interest earns £21,000 in interest (total £31,000). With compound interest it grows to £76,123 — over £45,000 more. This is why starting early matters far more than the amount you start with." },
  { question: "What is the Rule of 72?", answer: "The Rule of 72 is a quick mental shortcut: divide 72 by your annual interest rate to find how many years it takes to double your money. At 6% annual return: 72 ÷ 6 = 12 years to double. At 9%: 72 ÷ 9 = 8 years. At 4%: 72 ÷ 4 = 18 years. It's a rough estimate but accurate enough for planning purposes." },
  { question: "How often does compound interest compound?", answer: "Compounding frequency significantly affects returns. Daily compounding slightly outperforms monthly, which outperforms annual. A £10,000 deposit at 5% for 10 years: annual compounding → £16,289. Monthly compounding → £16,470. Daily compounding → £16,487. For most savings accounts in the UK, AER (Annual Equivalent Rate) already accounts for compounding frequency, so you can compare accounts fairly using AER." },
  { question: "What is the difference between APR and AER?", answer: "APR (Annual Percentage Rate) is typically used for borrowing — it shows the yearly cost of a loan. AER (Annual Equivalent Rate) is used for savings — it shows the effective annual return accounting for compounding. When comparing savings accounts, always compare AER. When comparing loans or mortgages, compare APR or APRC (Annual Percentage Rate of Charge, which includes fees)." },
];

export default function WhatIsCompoundInterest() {
  return (
    <>
      <SEO
        title="What Is Compound Interest? How It Works + Real Examples (2025)"
        description="Compound interest earns interest on interest — and over 30 years it turns £10,000 into £76,000. Here's how it works, the Rule of 72, and how to use it."
        keywords="what is compound interest, compound interest explained, compound interest formula, rule of 72, compound interest calculator uk"
        canonicalUrl="https://www.thecalculatorapp.org/blog/what-is-compound-interest"
        faqSchema={faqs}
      />
      <BlogLayout
        title="What Is Compound Interest?"
        subtitle="It earns interest on interest. Over 30 years, that turns £10,000 into £76,000. Here's exactly how it works."
        category="Finance"
        publishDate="April 2026"
        readTime="4 min"
        heroImage="/og-image.png"
        directAnswer="Compound interest is interest calculated on both your original deposit and all previously accumulated interest. At 7% annual return, £10,000 grows to £76,123 over 30 years through compounding — versus £31,000 with simple interest. The formula is A = P(1 + r/n)^(nt). The longer you leave money invested, the more dramatic the effect."
        hasPaidSection={false}
        relatedCalculators={[
          { label: "Compound Interest Calculator", path: "/finance/compound-interest" },
          { label: "Savings Calculator", path: "/finance/savings" },
          { label: "ISA Calculator", path: "/finance/isa-calculator" },
          { label: "Retirement Calculator", path: "/finance/retirement" },
        ]}
        relatedArticles={[
          { title: "What Is an ISA?", description: "The UK's best tax-free wrapper for compound growth.", url: "/blog/what-is-an-isa" },
          { title: "How Much Should I Save Per Month?", description: "Work out your monthly savings target.", url: "/blog/how-much-should-i-save-per-month" },
          { title: "How Much Do I Need to Retire?", description: "Use compound growth to build your retirement pot.", url: "/blog/how-much-do-i-need-to-retire" },
        ]}
      >
        <p>Most people understand interest. You deposit £1,000, earn 5%, collect £50. That's simple interest. Compound interest is different — and the difference, given time, is enormous.</p>

        <h2>Simple vs compound: the actual numbers</h2>

        <p>Say you invest £10,000 at 7% annual return for 30 years.</p>

        <ul>
          <li><strong>Simple interest:</strong> £10,000 × 7% × 30 years = £21,000 interest. Total: £31,000.</li>
          <li><strong>Compound interest:</strong> £10,000 × (1.07)^30 = £76,123. Total: £76,123.</li>
        </ul>

        <p>That extra £45,000 came from nothing except time. No additional deposits. No higher risk. Just interest earning interest, year after year.</p>

        <h2>The formula (and what it means)</h2>

        <p>The compound interest formula is:</p>

        <p><strong>A = P(1 + r/n)^(nt)</strong></p>

        <ul>
          <li><strong>A</strong> = final amount</li>
          <li><strong>P</strong> = principal (starting amount)</li>
          <li><strong>r</strong> = annual interest rate (as a decimal — 5% = 0.05)</li>
          <li><strong>n</strong> = number of times interest compounds per year</li>
          <li><strong>t</strong> = number of years</li>
        </ul>

        <p>For a savings account paying 4.5% AER compounded monthly with a £5,000 deposit over 5 years: A = 5000 × (1 + 0.045/12)^(12×5) = <strong>£6,252</strong>.</p>

        <h2>The Rule of 72</h2>

        <p>The fastest mental shortcut in personal finance. Divide 72 by your annual return to find out how many years it takes to double your money.</p>

        <ul>
          <li>4% return → doubles every <strong>18 years</strong></li>
          <li>6% return → doubles every <strong>12 years</strong></li>
          <li>8% return → doubles every <strong>9 years</strong></li>
          <li>10% return → doubles every <strong>7.2 years</strong></li>
        </ul>

        <p>The FTSE All-World index has returned approximately 7–8% annually over the last 30 years. At 7%, your money doubles roughly every 10 years. Start at 25 with £10,000 and by 65 it's doubled four times: £160,000. Without adding a single penny.</p>

        <h2>Why compounding frequency matters (but not as much as you'd think)</h2>

        <p>Interest can compound annually, quarterly, monthly, or daily. More frequent compounding means slightly more growth. £10,000 at 5% for 10 years:</p>

        <ul>
          <li>Annual: £16,289</li>
          <li>Monthly: £16,470</li>
          <li>Daily: £16,487</li>
        </ul>

        <p>The difference between monthly and daily is just £17. What matters far more is the <em>rate</em> and the <em>time</em>. Don't chase daily compounding — chase a better rate or start earlier.</p>

        <h2>AER vs APR — which to compare</h2>

        <p>UK savings accounts quote <strong>AER (Annual Equivalent Rate)</strong> — this already factors in compounding frequency, so you can compare accounts fairly on AER alone. A 4.5% AER account compounds to more than a 4.5% non-compounded rate.</p>

        <p><strong>APR</strong> is for borrowing. Compare savings accounts by AER. Compare loans and mortgages by APR or APRC.</p>

        <h2>How to use compound interest in practice</h2>

        <p>Three actions that make a real difference:</p>

        <p><strong>1. Start earlier, not bigger.</strong> £200/month from age 25 at 7% = £525,000 by 65. Starting at 35 with the same monthly amount = £243,000. The extra decade is worth more than doubling the contributions.</p>

        <p><strong>2. Use tax-free wrappers.</strong> Inside a Stocks and Shares ISA, compound growth is entirely free of income tax and capital gains tax. That means your 7% return stays 7% — a higher-rate taxpayer investing outside an ISA keeps significantly less.</p>

        <p><strong>3. Never interrupt it.</strong> Withdrawing early, pausing investments during market dips, or switching accounts constantly all interrupt the compounding sequence. The best compound interest story is a boring one — money left alone for decades.</p>

        <h2>The compound interest trap: debt</h2>

        <p>Compound interest works against you just as powerfully when it comes to debt. A credit card at 29.9% APR on a £3,000 balance, making minimum payments only, takes approximately <strong>27 years</strong> to clear and costs over £7,000 in interest. The same mathematics that builds wealth destroys it when the rate works against you.</p>

        <p>Pay off high-interest debt first. Then let compound interest work in your favour.</p>

        {/* FAQ Schema rendered below */}
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
