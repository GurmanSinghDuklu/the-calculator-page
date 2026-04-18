import { BlogLayout } from "@/components/BlogLayout";
import { SEO } from "@/components/SEO";

const faqs = [
  { question: "What is stamp duty in the UK?", answer: "Stamp Duty Land Tax (SDLT) is a tax paid when you buy a property in England or Northern Ireland above a certain threshold. Scotland has LBTT and Wales has LTT — similar taxes with different rates. The amount you pay depends on the purchase price, whether you're a first-time buyer, and whether you own other properties." },
  { question: "What are the stamp duty rates in 2025?", answer: "From April 2025, standard rates are: 0% up to £125,000, 2% from £125,001–£250,000, 5% from £250,001–£925,000, 10% from £925,001–£1.5m, 12% above £1.5m. First-time buyers pay 0% up to £300,000 and 5% from £300,001–£500,000 (no relief above £500,000)." },
  { question: "Do first-time buyers pay stamp duty?", answer: "First-time buyers get relief up to £300,000 (paying 0% on that portion) and 5% on the portion from £300,001 to £500,000. Properties above £500,000 get no first-time buyer relief. The threshold was reduced from £425,000 in April 2025." },
  { question: "Do I pay extra stamp duty on a second home?", answer: "Yes. Buying an additional residential property attracts a 3% surcharge on top of standard rates. This applies to buy-to-let properties, second homes, and holiday homes. If you're replacing your main residence, the surcharge usually doesn't apply." },
  { question: "When do I pay stamp duty?", answer: "Stamp duty is due within 14 days of completing your property purchase. Your solicitor or conveyancer typically handles the payment and filing on your behalf as part of the conveyancing process." },
];

export default function StampDuty2025() {
  return (
    <>
      <SEO
        title="Stamp Duty UK 2025 — What You Actually Pay and When"
        description="Stamp duty rates changed in April 2025. First-time buyer thresholds dropped. Here's exactly what you owe, how it's calculated, and what changed."
        keywords="stamp duty 2025, sdlt 2025, stamp duty rates uk, stamp duty first time buyer 2025, stamp duty calculator"
        canonicalUrl="https://www.thecalculatorapp.org/blog/stamp-duty-uk-2025"
        faqSchema={faqs}
      />
      <BlogLayout
        title="Stamp Duty UK 2025 — What You Actually Pay and When"
        subtitle="The thresholds changed in April 2025. If you're buying this year, you need the updated numbers."
        category="Mortgage"
        publishDate="April 2026"
        readTime="4 min"
        heroImage="/og-image.png"
        directAnswer="From April 2025, the standard stamp duty nil-rate threshold dropped back to £125,000. First-time buyers pay 0% up to £300,000, then 5% on the portion from £300,001 to £500,000, with no relief above £500,000. On a £350,000 first purchase the stamp duty bill is £2,500. A standard buyer pays £7,500 on the same property."
        hasPaidSection={false}
        relatedCalculators={[
          { label: "Stamp Duty Calculator", path: "/finance/stamp-duty" },
          { label: "Mortgage Calculator", path: "/finance/mortgage" },
          { label: "Future House Value", path: "/finance/future-house-value" },
        ]}
        relatedArticles={[
          { title: "Stamp Duty Calculator", description: "Get your exact SDLT bill for any property price in seconds.", url: "/finance/stamp-duty" },
          { title: "Mortgage Calculator", description: "Calculate your monthly repayments alongside your stamp duty cost.", url: "/finance/mortgage" },
          { title: "How Much Can I Borrow?", description: "Understand your full buying budget before you commit.", url: "/blog/how-much-can-i-borrow-mortgage-uk" },
        ]}
      >
        <p>Stamp duty is the tax nobody budgets for properly — until they're three weeks from completion and their solicitor sends them a figure they weren't expecting. Here's the full picture for 2025.</p>

        <h2>What changed in April 2025</h2>

        <p>The temporary stamp duty relief introduced in 2022 ended on 31 March 2025. Two things changed for buyers completing from April 2025:</p>

        <ul>
          <li>The standard nil-rate threshold dropped from £250,000 back to <strong>£125,000</strong></li>
          <li>The first-time buyer nil-rate threshold dropped from £425,000 to <strong>£300,000</strong></li>
        </ul>

        <p>That means buyers who completed just after the deadline paid significantly more than those who completed just before. Timing the market on stamp duty is rare — but it mattered in early 2025.</p>

        <h2>Current rates for standard buyers</h2>

        <ul>
          <li><strong>0%</strong> — up to £125,000</li>
          <li><strong>2%</strong> — £125,001 to £250,000</li>
          <li><strong>5%</strong> — £250,001 to £925,000</li>
          <li><strong>10%</strong> — £925,001 to £1.5m</li>
          <li><strong>12%</strong> — above £1.5m</li>
        </ul>

        <p>On a £300,000 purchase, that works out to: £0 on the first £125k + £2,500 on the next £125k + £2,500 on the final £50k = <strong>£5,000 total</strong>.</p>

        <h2>First-time buyers</h2>

        <p>First-time buyers pay <strong>0%</strong> up to £300,000 and <strong>5%</strong> on the portion from £300,001 to £500,000. Above £500,000, no first-time buyer relief applies — standard rates across the full purchase price.</p>

        <p>On a £400,000 first purchase: 0% on the first £300k + 5% on £100k = <strong>£5,000</strong>. A standard buyer pays <strong>£10,000</strong> on the same property. The relief is worth it.</p>

        <h2>Second homes and buy-to-let</h2>

        <p>An additional <strong>3% surcharge</strong> applies on top of standard rates for any additional residential property. On a £250,000 buy-to-let: standard SDLT of £2,500 + 3% surcharge of £7,500 = <strong>£10,000 total</strong>.</p>

        <p>The surcharge doesn't apply if you're selling your main home and buying a replacement within 3 years (you can claim a refund in some cases).</p>

        <h2>Get your exact figure</h2>

        <p>Use the stamp duty calculator to get the precise number for your purchase — including first-time buyer relief and second home surcharges. Know the total cost before you make an offer.</p>
      </BlogLayout>
    </>
  );
}
