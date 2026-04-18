import { BlogLayout } from "@/components/BlogLayout";
import { SEO } from "@/components/SEO";

const faqs = [
  { question: "How much is stamp duty in the UK in 2025?", answer: "From 1 April 2025, stamp duty thresholds reverted to pre-2022 levels. Standard residential rates: 0% on the first £125,000, 2% on £125,001–£250,000, 5% on £250,001–£925,000, 10% on £925,001–£1.5m, 12% above £1.5m. First-time buyers pay 0% on the first £300,000 (down from £425,000 before April 2025) and 5% on the portion from £300,001–£500,000. Additional properties (buy-to-let, second homes) pay a 5% surcharge on top of standard rates." },
  { question: "Do first-time buyers pay stamp duty?", answer: "First-time buyers are exempt from stamp duty on the first £300,000 of a purchase (as of 1 April 2025, reduced from £425,000). On purchases from £300,001 to £500,000, first-time buyers pay 5% on the amount above £300,000. For properties above £500,000, first-time buyer relief does not apply and standard rates are used from £0. So a first-time buyer purchasing a £450,000 property pays: 0% on first £300,000 + 5% on remaining £150,000 = £7,500." },
  { question: "How is stamp duty calculated?", answer: "Stamp Duty Land Tax (SDLT) is calculated in bands — like income tax. You pay the rate on each portion of the price in that band, not the full purchase price at the top rate. For a £350,000 home (standard rates): 0% on first £125,000 = £0. 2% on next £125,000 (£125k–£250k) = £2,500. 5% on remaining £100,000 (£250k–£350k) = £5,000. Total SDLT = £7,500." },
  { question: "What is the stamp duty surcharge for second homes?", answer: "Buyers of additional residential properties (buy-to-let, second homes, holiday lets) pay a 5% surcharge on top of the standard residential rates at every band. This applies from the first pound of the purchase price. On a £300,000 buy-to-let property: standard SDLT = £5,000. Surcharge = 5% × £300,000 = £15,000. Total = £20,000. The surcharge was raised from 3% to 5% in October 2024." },
  { question: "When do you pay stamp duty?", answer: "Stamp Duty Land Tax must be paid within 14 days of completion. Your solicitor or conveyancer typically handles the return and payment on your behalf, funded from completion monies. Failure to pay on time results in HMRC penalties and interest. SDLT applies in England and Northern Ireland. Scotland uses Land and Buildings Transaction Tax (LBTT) and Wales uses Land Transaction Tax (LTT) — with different rates and bands." },
];

export default function HowMuchIsStampDuty() {
  return (
    <>
      <SEO
        title="How Much Is Stamp Duty in 2025? Rates, Thresholds & Calculator"
        description="Stamp duty thresholds changed on 1 April 2025. First-time buyer relief now applies to the first £300,000. Here's exactly what you'll pay on any purchase price."
        keywords="how much is stamp duty, stamp duty 2025, stamp duty calculator, stamp duty first time buyer, sdlt rates 2025"
        canonicalUrl="https://www.thecalculatorapp.org/blog/how-much-is-stamp-duty-2025"
        faqSchema={faqs}
      />
      <BlogLayout
        title="How Much Is Stamp Duty in 2025?"
        subtitle="The thresholds changed on 1 April 2025. First-time buyer relief dropped from £425,000 to £300,000. Here's what you'll actually pay."
        category="Property"
        publishDate="April 2026"
        readTime="4 min"
        heroImage="/og-image.png"
        directAnswer="From 1 April 2025, standard stamp duty rates are: 0% up to £125,000, 2% on £125k–£250k, 5% on £250k–£925k. First-time buyers pay 0% on the first £300,000 and 5% on £300k–£500k. Additional properties pay a 5% surcharge on top of standard rates. On a £350,000 purchase with standard rates, stamp duty = £7,500. First-time buyers on the same property pay £2,500."
        hasPaidSection={false}
        relatedCalculators={[
          { label: "Stamp Duty Calculator", path: "/finance/stamp-duty" },
          { label: "Mortgage Calculator", path: "/finance/mortgage" },
          { label: "Future House Value", path: "/finance/future-house-value" },
        ]}
        relatedArticles={[
          { title: "First-Time Buyer Guide 2025", description: "Everything you need to know about buying your first home.", url: "/blog/first-time-buyer-uk-2025" },
          { title: "How Much Can I Borrow for a Mortgage?", description: "Work out your borrowing limit before you start searching.", url: "/blog/how-much-can-i-borrow-mortgage-uk" },
          { title: "How to Save for a House Deposit", description: "The LISA strategy that gives you £1,000 free per year.", url: "/blog/how-to-save-for-a-house-deposit" },
        ]}
      >
        <p>Stamp Duty Land Tax (SDLT) is one of the largest costs in a property purchase — and one of the least understood. Many buyers discover the bill at the point of completing a purchase. Here's exactly what you'll pay.</p>

        <h2>The rates from 1 April 2025</h2>

        <p>The temporary stamp duty holiday thresholds introduced in 2022 ended on 31 March 2025. From 1 April 2025, the standard rates are:</p>

        <ul>
          <li>Up to £125,000: <strong>0%</strong></li>
          <li>£125,001 to £250,000: <strong>2%</strong></li>
          <li>£250,001 to £925,000: <strong>5%</strong></li>
          <li>£925,001 to £1,500,000: <strong>10%</strong></li>
          <li>Above £1,500,000: <strong>12%</strong></li>
        </ul>

        <p>These are <strong>marginal rates</strong> — like income tax, you pay each rate only on the portion of the price in that band.</p>

        <h2>Worked examples (standard rates)</h2>

        <p><strong>£250,000 home:</strong></p>
        <ul>
          <li>0% on first £125,000 = £0</li>
          <li>2% on next £125,000 = £2,500</li>
          <li><strong>Total: £2,500</strong></li>
        </ul>

        <p><strong>£350,000 home:</strong></p>
        <ul>
          <li>0% on first £125,000 = £0</li>
          <li>2% on next £125,000 = £2,500</li>
          <li>5% on remaining £100,000 = £5,000</li>
          <li><strong>Total: £7,500</strong></li>
        </ul>

        <p><strong>£600,000 home:</strong></p>
        <ul>
          <li>0% on first £125,000 = £0</li>
          <li>2% on next £125,000 = £2,500</li>
          <li>5% on remaining £350,000 = £17,500</li>
          <li><strong>Total: £20,000</strong></li>
        </ul>

        <h2>First-time buyer relief</h2>

        <p>First-time buyers benefit from a reduced threshold — but it got tighter from April 2025:</p>

        <ul>
          <li>0% on the first <strong>£300,000</strong> (was £425,000 before April 2025)</li>
          <li>5% on the portion from £300,001 to £500,000</li>
          <li>No relief on properties above £500,000 (standard rates apply from £0)</li>
        </ul>

        <p><strong>First-time buyer on a £350,000 home:</strong></p>
        <ul>
          <li>0% on first £300,000 = £0</li>
          <li>5% on remaining £50,000 = £2,500</li>
          <li><strong>Total: £2,500</strong> (vs £7,500 at standard rates — saving £5,000)</li>
        </ul>

        <p><strong>First-time buyer on a £480,000 home:</strong></p>
        <ul>
          <li>0% on first £300,000 = £0</li>
          <li>5% on remaining £180,000 = £9,000</li>
          <li><strong>Total: £9,000</strong></li>
        </ul>

        <h2>Additional property surcharge</h2>

        <p>If you're buying a second home, buy-to-let property, or holiday let, you pay a <strong>5% surcharge</strong> on top of the standard rates at every band. This was increased from 3% to 5% in October 2024.</p>

        <p><strong>Buy-to-let at £250,000:</strong></p>
        <ul>
          <li>Standard SDLT: £2,500</li>
          <li>5% surcharge on full £250,000: £12,500</li>
          <li><strong>Total: £15,000</strong></li>
        </ul>

        <p>The surcharge applies from the first pound — so even cheap properties incur a significant charge. Investors need to factor this into their return calculations.</p>

        <h2>Scotland and Wales: different rules</h2>

        <p>SDLT only applies in <strong>England and Northern Ireland</strong>.</p>

        <ul>
          <li><strong>Scotland:</strong> Land and Buildings Transaction Tax (LBTT) — rates and bands differ significantly</li>
          <li><strong>Wales:</strong> Land Transaction Tax (LTT) — also has different rates</li>
        </ul>

        <p>If you're buying in Scotland or Wales, use the relevant national calculator.</p>

        <h2>When you pay and who handles it</h2>

        <p>SDLT must be paid within <strong>14 days of completion</strong>. In practice, your solicitor or conveyancer submits the return and pays the tax on your behalf from completion funds. You'll need to budget for it upfront — it doesn't get added to the mortgage.</p>

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
