import { BlogLayout } from "@/components/BlogLayout";
import { SEO } from "@/components/SEO";

const faqs = [
  { question: "What is capital gains tax in the UK?", answer: "Capital Gains Tax (CGT) is a tax on the profit you make when you sell an asset that has increased in value. You pay CGT on the gain, not the full sale price. In 2025/26, basic-rate taxpayers pay 18% on residential property gains and 10% on other assets. Higher-rate taxpayers pay 24% on residential property and 20% on other assets. Everyone has an annual CGT exemption of £3,000." },
  { question: "What is the CGT annual exempt amount in 2025?", answer: "The CGT annual exempt amount (AEA) is £3,000 for individuals in 2025/26. This means you can make up to £3,000 of capital gains in a tax year without paying any CGT. This is significantly reduced from £12,300 in 2022/23, representing one of the largest CGT changes in recent years. Married couples and civil partners can each use their own exemption, giving a combined £6,000." },
  { question: "Do you pay CGT on shares?", answer: "Yes, if you sell shares outside an ISA or pension and make a gain exceeding your annual exempt amount (£3,000 in 2025/26). CGT on shares is 10% for basic-rate taxpayers and 20% for higher and additional-rate taxpayers. Shares held inside a Stocks and Shares ISA are completely exempt from CGT — this is one of the key reasons ISAs are so valuable for long-term investors." },
  { question: "Do you pay CGT on your main home?", answer: "Usually not. Your main home is typically exempt from CGT under Private Residence Relief (PRR), provided you've lived there for the entire period of ownership. PRR can be reduced if you let out part of the property, used it for business, or owned a garden larger than half a hectare. Second homes, buy-to-let properties, and holiday lets are subject to CGT at residential property rates." },
  { question: "When do you need to report and pay capital gains tax?", answer: "For UK residential property, you must report and pay CGT within 60 days of completion. For other assets, you report via Self Assessment — the deadline is 31 January following the end of the tax year in which the gain was made. Failing to report on time results in late filing penalties from HMRC." },
];

export default function WhatIsCapitalGainsTax() {
  return (
    <>
      <SEO
        title="What Is Capital Gains Tax UK? Rates, Exemptions & How to Pay (2025)"
        description="CGT is 10–24% on profits from selling assets. Everyone gets a £3,000 annual exemption. Here's what triggers it, what's exempt, and how to reduce your bill."
        keywords="capital gains tax uk, what is capital gains tax, cgt rates 2025, capital gains tax on shares uk, capital gains tax property uk"
        canonicalUrl="https://www.thecalculatorapp.org/blog/what-is-capital-gains-tax-uk"
        faqSchema={faqs}
      />
      <BlogLayout
        title="What Is Capital Gains Tax in the UK?"
        subtitle="It's a tax on profits from selling assets — not the full sale price. Rates are 10–24% and everyone gets a £3,000 annual exemption."
        category="Tax"
        publishDate="April 2026"
        readTime="5 min"
        heroImage="/og-image.png"
        directAnswer="Capital Gains Tax (CGT) is charged on the profit when you sell an asset that has risen in value. In 2025/26, rates are 10% (basic rate) or 20% (higher rate) on most assets, and 18% or 24% on residential property. The annual CGT exemption is £3,000 — gains below this are tax-free. Your main home is typically exempt under Private Residence Relief."
        hasPaidSection={false}
        relatedCalculators={[
          { label: "Capital Gains Tax Calculator", path: "/finance/capital-gains-tax" },
          { label: "UK Salary Calculator", path: "/finance/salary" },
          { label: "ISA Calculator", path: "/finance/isa-calculator" },
        ]}
        relatedArticles={[
          { title: "UK Tax Brackets 2025", description: "Income tax bands and what you'll pay at each level.", url: "/blog/uk-tax-brackets-2025" },
          { title: "What Is an ISA?", description: "How to shelter your investments from CGT entirely.", url: "/blog/what-is-an-isa" },
          { title: "Stamp Duty in 2025", description: "Tax on buying property — the other property tax to know.", url: "/blog/stamp-duty-uk-2025" },
        ]}
      >
        <p>Capital Gains Tax trips up investors, landlords, and anyone who sells assets without planning ahead. The good news: with the right structure, a lot of it is legally avoidable.</p>

        <h2>What triggers capital gains tax?</h2>

        <p>CGT is triggered when you <em>dispose</em> of a chargeable asset at a profit. Disposal includes:</p>

        <ul>
          <li>Selling an asset</li>
          <li>Giving it away (gifting to someone other than a spouse)</li>
          <li>Receiving compensation or insurance payout for an asset</li>
          <li>Exchanging one asset for another</li>
        </ul>

        <p>Common chargeable assets include: shares (outside an ISA), second properties, buy-to-let property, business assets, and personal possessions worth over £6,000 (excluding your car).</p>

        <h2>CGT rates in 2025/26</h2>

        <p>Your CGT rate depends on your total taxable income plus the gain.</p>

        <p><strong>Residential property:</strong></p>
        <ul>
          <li>Basic-rate taxpayer: <strong>18%</strong></li>
          <li>Higher or additional-rate taxpayer: <strong>24%</strong></li>
        </ul>

        <p><strong>Other assets (shares, business assets, etc.):</strong></p>
        <ul>
          <li>Basic-rate taxpayer: <strong>10%</strong></li>
          <li>Higher or additional-rate taxpayer: <strong>20%</strong></li>
        </ul>

        <p>If a gain straddles the basic and higher-rate threshold, you pay two rates. For example: you earn £40,000 salary (£12,730 above the basic rate band) and make a £20,000 share gain. The first £12,270 of the gain falls in the basic rate band at 10%; the remaining £7,730 falls in the higher rate band at 20%.</p>

        <h2>The annual exempt amount</h2>

        <p>Every individual gets a <strong>£3,000 CGT annual exempt amount</strong> in 2025/26. Gains below this threshold are tax-free. It resets every April.</p>

        <p>Married couples and civil partners each have their own exemption. Transferring assets between spouses is CGT-free (the recipient takes on the original base cost). This allows couples to crystallise £6,000 of gains per year tax-free by each using their own allowance.</p>

        <h2>What's exempt from CGT?</h2>

        <ul>
          <li><strong>Your main home</strong> — covered by Private Residence Relief in most cases</li>
          <li><strong>Assets held in an ISA or pension</strong> — completely exempt</li>
          <li><strong>UK government gilts</strong></li>
          <li><strong>Cars</strong></li>
          <li><strong>Personal belongings worth £6,000 or less</strong></li>
          <li><strong>Assets transferred to a spouse or civil partner</strong></li>
          <li><strong>Lottery winnings and gambling wins</strong></li>
        </ul>

        <h2>How to legally reduce your CGT bill</h2>

        <p><strong>1. Use your ISA allowance.</strong> Gains inside a Stocks and Shares ISA are completely exempt from CGT. Move assets in over time using your £20,000 annual allowance. This is the single most powerful CGT reduction tool available to UK investors.</p>

        <p><strong>2. Bed and ISA.</strong> Sell shares outside an ISA (within your annual exempt amount), then immediately repurchase them inside an ISA. Future gains are then sheltered permanently.</p>

        <p><strong>3. Crystallise gains each tax year.</strong> Use your £3,000 annual exemption every year — it cannot be carried forward. If you have unrealised gains, consider selling enough to use the exemption and then repurchasing after 30 days (to avoid the bed and breakfast rules).</p>

        <p><strong>4. Offset losses.</strong> Capital losses can be offset against gains in the same tax year or carried forward indefinitely. Report losses to HMRC even if you don't owe any tax — they're valuable to carry forward.</p>

        <p><strong>5. Transfer assets to a lower-rate spouse.</strong> If your spouse is a basic-rate taxpayer and you are higher-rate, transferring assets before disposal means the gain is taxed at 10% rather than 20%.</p>

        <h2>When to report and pay</h2>

        <p>For <strong>UK residential property</strong> sold at a gain: you must report to HMRC and pay the tax within <strong>60 days of completion</strong> using the online CGT property account. This applies even if you file a Self Assessment return.</p>

        <p>For <strong>all other assets</strong>: report via Self Assessment. The deadline is <strong>31 January</strong> following the end of the tax year in which you made the gain. So a gain in the 2025/26 tax year must be reported by 31 January 2027.</p>

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
