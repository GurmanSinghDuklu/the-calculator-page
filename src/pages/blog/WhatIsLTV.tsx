import { BlogLayout } from "@/components/BlogLayout";
import { SEO } from "@/components/SEO";

const faqs = [
  { question: "What is LTV in a mortgage?", answer: "LTV stands for Loan to Value. It's the percentage of a property's value that you're borrowing. If you buy a £200,000 home with a £20,000 deposit, you're borrowing £180,000 — an LTV of 90%. The lower your LTV, the less risk the lender takes, and the better your interest rate." },
  { question: "What LTV do I need for the best mortgage rates?", answer: "Most lenders offer their best rates at 60% LTV or below. Rates improve noticeably at 90%, 85%, 80%, 75%, and 60% thresholds. Getting from 90% to 85% LTV — just a 5% extra deposit — can meaningfully reduce your rate." },
  { question: "How do I calculate my LTV?", answer: "LTV = (Loan Amount ÷ Property Value) × 100. Example: borrowing £160,000 on a £200,000 property = (160,000 ÷ 200,000) × 100 = 80% LTV." },
  { question: "Does LTV change over time?", answer: "Yes. As you repay your mortgage and as property values rise, your LTV falls. When you remortgage, your new LTV is based on the current property value — not what you paid. If your home has increased in value, you may qualify for a lower LTV band and a better rate." },
  { question: "What is a high LTV mortgage?", answer: "Anything above 90% LTV is considered high. Some lenders offer 95% LTV mortgages for first-time buyers, but rates are higher and the product choice is limited. A 5% deposit is the minimum for most lenders." },
];

export default function WhatIsLTV() {
  return (
    <>
      <SEO
        title="What Is LTV and Why Does It Change Your Interest Rate?"
        description="LTV — loan to value — is one of the most important numbers in your mortgage. Here's exactly how it's calculated, why it matters, and how to use it to get a better deal."
        keywords="what is ltv mortgage, loan to value mortgage, ltv ratio uk, how to calculate ltv, mortgage ltv bands"
        canonicalUrl="https://www.thecalculatorapp.org/blog/what-is-ltv-mortgage"
        faqSchema={faqs}
      />
      <BlogLayout
        title="What Is LTV and Why Does It Change Your Interest Rate?"
        subtitle="One ratio determines your rate, your options, and how much leverage you have with lenders."
        category="Mortgage"
        publishDate="April 2026"
        readTime="3 min"
        heroImage="/og-image.png"
        directAnswer="Loan-to-value (LTV) is your mortgage as a percentage of the property value. On a £250,000 property with a £25,000 deposit, your LTV is 90%. The lower your LTV, the better the mortgage rate you qualify for — lenders reserve their best deals for borrowers at 60% LTV or below. Every 5% improvement in LTV typically unlocks a meaningfully cheaper rate."
        hasPaidSection={false}
        relatedCalculators={[
          { label: "Mortgage Calculator", path: "/finance/mortgage" },
          { label: "Mortgage Overpayment", path: "/finance/mortgage-overpayment" },
          { label: "Stamp Duty Calculator", path: "/finance/stamp-duty" },
          { label: "Mortgage Comparison", path: "/finance/mortgage-cost-comparison" },
        ]}
        relatedArticles={[
          { title: "Mortgage Calculator", description: "Calculate repayments at any loan amount and rate.", url: "/finance/mortgage" },
          { title: "How Much Can I Borrow?", description: "Understand the full picture before you apply.", url: "/blog/how-much-can-i-borrow-mortgage-uk" },
          { title: "Future House Value Calculator", description: "Project how rising property values reduce your LTV over time.", url: "/finance/future-house-value" },
        ]}
      >
        <p>LTV is three letters that follow you through every stage of your mortgage journey. It determines which deals you can access, what rate you pay, and how much negotiating power you have when you remortgage.</p>

        <h2>The formula is simple</h2>

        <p><strong>LTV = (Loan Amount ÷ Property Value) × 100</strong></p>

        <p>Buy a £250,000 house with a £25,000 deposit — you're borrowing £225,000. That's 90% LTV. Save another £12,500 and get to 85% LTV. The rate difference between those two can be 0.3–0.5%.</p>

        <p>On a £225,000 mortgage over 25 years, 0.4% lower rate saves you roughly <strong>£12,000 in interest</strong>. That's real money from a slightly bigger deposit.</p>

        <h2>The LTV thresholds that matter</h2>

        <p>Lenders don't offer a different rate for every percentage point. They work in bands. Cross a threshold and you unlock better pricing:</p>

        <ul>
          <li><strong>95% LTV</strong> — minimum for most first-time buyers. Limited deals, highest rates.</li>
          <li><strong>90% LTV</strong> — more choice, meaningfully better rates.</li>
          <li><strong>85% LTV</strong> — another step down in rate.</li>
          <li><strong>80% LTV</strong> — solid mid-range pricing.</li>
          <li><strong>75% LTV</strong> — near the top tier of deals.</li>
          <li><strong>60% LTV</strong> — the best rates on the market. Almost no lender offers anything better below this.</li>
        </ul>

        <h2>Your LTV changes as you repay</h2>

        <p>Every mortgage payment reduces your balance. If your property value rises too, your LTV falls faster. When you remortgage, your new LTV is calculated on the <em>current</em> market value — not what you paid.</p>

        <p>Someone who bought at 90% LTV five years ago may now be sitting at 70% LTV thanks to repayments and house price growth. That's a significantly better rate bracket at remortgage time.</p>

        <h2>Check where you land</h2>

        <p>Before you apply for anything, know your LTV. Use the mortgage calculator to see how your rate and repayments shift at different LTV bands — then decide whether it's worth stretching your deposit to cross the next threshold.</p>
      </BlogLayout>
    </>
  );
}
