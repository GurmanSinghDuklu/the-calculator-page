import { BlogLayout } from "@/components/BlogLayout";
import { SEO } from "@/components/SEO";

const faqs = [
  { question: "What is VAT?", answer: "VAT (Value Added Tax) is a consumption tax charged on most goods and services sold in the UK. Businesses registered for VAT add it to their prices, collect it on behalf of HMRC, and pay it over quarterly. The standard rate is 20%. Consumers ultimately bear the cost — businesses act as tax collectors. VAT is the UK's third largest source of tax revenue, raising around £170 billion per year." },
  { question: "What is the VAT threshold in 2025?", answer: "The VAT registration threshold is £90,000 in 2025/26. Businesses with taxable turnover above £90,000 in any 12-month rolling period must register for VAT within 30 days. Businesses below this threshold can register voluntarily, which allows them to reclaim VAT on purchases — beneficial if they have significant VAT-able costs or sell mainly to VAT-registered businesses." },
  { question: "What are the UK VAT rates?", answer: "The UK has three VAT rates: Standard rate (20%) — applies to most goods and services. Reduced rate (5%) — applies to domestic energy, children's car seats, sanitary products, and some renovation work. Zero rate (0%) — applies to most food, children's clothing, books, newspapers, and public transport. Some things are VAT exempt (not the same as zero-rated) — including insurance, finance, education, and healthcare. Exempt supplies cannot reclaim VAT on costs, whereas zero-rated businesses can." },
  { question: "How do you calculate VAT?", answer: "To add 20% VAT: multiply the price by 1.20. £500 + VAT = £500 × 1.20 = £600. To find the VAT amount only: multiply by 0.20. VAT on £500 = £500 × 0.20 = £100. To remove VAT from a VAT-inclusive price: divide by 1.20. £600 inc VAT: £600 ÷ 1.20 = £500 ex-VAT. The VAT element is £100. For 5% VAT: multiply by 1.05 to add, divide by 1.05 to remove." },
  { question: "What is the difference between zero-rated and VAT exempt?", answer: "Zero-rated goods have a VAT rate of 0% — businesses selling them can still reclaim VAT on their own purchases (inputs). VAT-exempt goods and services fall outside the VAT system entirely — businesses making only exempt supplies generally cannot register for VAT or reclaim input VAT. Examples: zero-rated = food, books. Exempt = insurance, financial services, education. Partially exempt businesses have complex rules for reclaiming input VAT proportionally." },
];

export default function WhatIsVAT() {
  return (
    <>
      <SEO
        title="What Is VAT? UK Rates, Threshold & How to Calculate It (2025)"
        description="VAT is 20% on most UK goods and services. The registration threshold is £90,000. Here's how it works, the three rates, and how to add or remove VAT from any price."
        keywords="what is vat, vat uk, vat rates uk 2025, vat threshold 2025, how to calculate vat, add vat, remove vat"
        canonicalUrl="https://www.thecalculatorapp.org/blog/what-is-vat-uk"
        faqSchema={faqs}
      />
      <BlogLayout
        title="What Is VAT in the UK?"
        subtitle="VAT is a 20% tax on most goods and services. Businesses collect it, consumers pay it. Here's how it works and how to calculate it."
        category="Tax"
        publishDate="April 2026"
        readTime="4 min"
        heroImage="/og-image.png"
        directAnswer="VAT (Value Added Tax) is charged at 20% on most UK goods and services, 5% on domestic energy and certain essentials, and 0% on food and children's clothing. Businesses with turnover above £90,000 must register and collect VAT on behalf of HMRC. To add 20% VAT: multiply by 1.20. To remove VAT from an inclusive price: divide by 1.20."
        hasPaidSection={false}
        relatedCalculators={[
          { label: "VAT Calculator", path: "/finance/vat-calculator" },
          { label: "UK Salary Calculator", path: "/finance/salary" },
          { label: "Percentage Calculator", path: "/misc/percentage" },
        ]}
        relatedArticles={[
          { title: "UK Tax Brackets 2025", description: "Income tax bands and what you pay at each level.", url: "/blog/uk-tax-brackets-2025" },
          { title: "How to Calculate a Percentage", description: "The formulas behind VAT and all other percentage calculations.", url: "/blog/how-to-calculate-percentage" },
        ]}
      >
        <p>VAT is one of those taxes that's invisible when things are working correctly — and a significant headache when they're not. Whether you're a consumer, a sole trader, or running a business, understanding how it works saves you money and avoids mistakes.</p>

        <h2>How VAT works</h2>

        <p>VAT is a <em>consumption tax</em> — it's ultimately paid by the end consumer, but collected at each stage of the supply chain by businesses registered for VAT.</p>

        <p>A manufacturer sells to a wholesaler for £100 + £20 VAT (£120). The manufacturer pays HMRC £20. The wholesaler sells to a retailer for £150 + £30 VAT (£180). The wholesaler reclaims the £20 it paid and passes £30 to HMRC. The retailer sells to a consumer for £200 + £40 VAT (£240). The retailer reclaims the £30 it paid and passes £40 to HMRC. The consumer pays £240 — £40 VAT in total.</p>

        <p>The mechanism ensures VAT is collected incrementally but the consumer bears the full cost.</p>

        <h2>The three UK VAT rates</h2>

        <p><strong>Standard rate: 20%</strong><br />
        Applies to most goods and services — clothing (adult), electronics, furniture, restaurant meals, professional services, new vehicles, most home improvements.</p>

        <p><strong>Reduced rate: 5%</strong><br />
        Applies to: domestic energy (gas and electricity), children's car seats, sanitary products, smoking cessation products, certain renovation and conversion work on residential properties.</p>

        <p><strong>Zero rate: 0%</strong><br />
        Applies to: most food (not hot takeaway or restaurant food), children's clothing and footwear, books and newspapers, prescription drugs, public transport, new residential buildings.</p>

        <p><strong>VAT exempt:</strong><br />
        Some goods and services fall outside VAT entirely: insurance, financial services (loans, mortgages), education, health services, postal services. Exempt is different from zero-rated — businesses making only exempt supplies can't reclaim VAT on their own costs.</p>

        <h2>How to calculate VAT</h2>

        <p><strong>Adding 20% VAT to a price:</strong></p>
        <ul>
          <li>Multiply by 1.20</li>
          <li>£350 ex-VAT → £350 × 1.20 = <strong>£420 inc-VAT</strong></li>
          <li>VAT element = £70</li>
        </ul>

        <p><strong>Removing VAT from a VAT-inclusive price:</strong></p>
        <ul>
          <li>Divide by 1.20</li>
          <li>£420 inc-VAT → £420 ÷ 1.20 = <strong>£350 ex-VAT</strong></li>
          <li>VAT element = £420 − £350 = £70</li>
        </ul>

        <p><strong>5% VAT:</strong> multiply by 1.05 to add, divide by 1.05 to remove.</p>

        <h2>The VAT registration threshold</h2>

        <p>In 2025/26, you must register for VAT if your taxable turnover exceeds <strong>£90,000</strong> in any rolling 12-month period. You must register within 30 days of exceeding the threshold and start charging VAT from the date you should have registered.</p>

        <p>You can also register <strong>voluntarily</strong> if below the threshold. This makes sense if:</p>
        <ul>
          <li>Your customers are mostly VAT-registered businesses (who can reclaim the VAT you charge)</li>
          <li>You have significant VAT-able purchases and want to reclaim input VAT</li>
          <li>You want to appear more established to business customers</li>
        </ul>

        <p>It doesn't make sense if your customers are mainly consumers — you'd simply be making your prices 20% higher relative to non-VAT-registered competitors.</p>

        <h2>VAT returns and payment</h2>

        <p>VAT-registered businesses submit VAT returns quarterly (or monthly/annually by arrangement). The return shows output VAT (collected from customers) minus input VAT (paid on purchases). If output exceeds input, you pay HMRC the difference. If input exceeds output (e.g. you made significant purchases), HMRC refunds the difference.</p>

        <p>Most businesses now file under Making Tax Digital (MTD) — meaning VAT records must be kept in compatible software and submitted digitally.</p>

        <p>Late payment incurs surcharges. Late filing also triggers penalties under the points-based system introduced in 2023.</p>

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
