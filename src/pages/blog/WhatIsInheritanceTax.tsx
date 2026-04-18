import { BlogLayout } from "@/components/BlogLayout";
import { SEO } from "@/components/SEO";

const faqs = [
  { question: "What is inheritance tax in the UK?", answer: "Inheritance Tax (IHT) is a 40% tax on the estate (money, property, and possessions) of someone who has died, charged on the amount above their threshold. The standard nil-rate band is £325,000 — meaning the first £325,000 of an estate is tax-free. Married couples and civil partners can combine thresholds, giving a potential £650,000 tax-free allowance." },
  { question: "What is the residence nil-rate band?", answer: "The Residence Nil-Rate Band (RNRB) is an additional £175,000 threshold that applies when you leave your main home to direct descendants (children, grandchildren). Combined with the standard nil-rate band, individuals can pass up to £500,000 tax-free, and couples up to £1,000,000 — provided the estate doesn't exceed £2,000,000 (above which the RNRB tapers away by £1 for every £2 over the threshold)." },
  { question: "What is exempt from inheritance tax?", answer: "Exempt from IHT: transfers to a spouse or civil partner (no limit), gifts to charities, gifts to political parties, assets passed to a disabled person, business property qualifying for Business Relief, and agricultural property qualifying for Agricultural Relief. Additionally, the first £3,000 of gifts per year (annual exemption), small gifts of up to £250 per person, and wedding gifts within limits are exempt." },
  { question: "How does the 7-year rule work for inheritance tax?", answer: "Gifts made more than 7 years before death are completely exempt from IHT (provided the giver derives no benefit from the gift — known as a Potentially Exempt Transfer or PET). Gifts made within 7 years before death are tapered: 0–3 years: 40% IHT; 3–4 years: 32%; 4–5 years: 24%; 5–6 years: 16%; 6–7 years: 8%; 7+ years: 0%. This means early gifting is one of the most effective IHT planning strategies." },
  { question: "When does inheritance tax have to be paid?", answer: "IHT must be paid within 6 months of the end of the month in which the person died. After 6 months, HMRC charges interest. In practice, many estates cannot sell property within 6 months, so HMRC allows IHT on property to be paid in annual instalments over 10 years — though interest accrues on the outstanding amount." },
];

export default function WhatIsInheritanceTax() {
  return (
    <>
      <SEO
        title="What Is Inheritance Tax UK? Thresholds, Rules & How to Reduce It (2025)"
        description="IHT is 40% on estates above £325,000 — but couples can pass up to £1,000,000 tax-free. Here's how the thresholds work and the legal ways to reduce your bill."
        keywords="what is inheritance tax uk, inheritance tax threshold 2025, iht nil rate band, inheritance tax 7 year rule, how to avoid inheritance tax uk"
        canonicalUrl="https://www.thecalculatorapp.org/blog/what-is-inheritance-tax-uk"
        faqSchema={faqs}
      />
      <BlogLayout
        title="What Is Inheritance Tax in the UK?"
        subtitle="It's 40% on estates above £325,000 — but most people pay far less than they fear, and there are legitimate ways to reduce it significantly."
        category="Tax"
        publishDate="April 2026"
        readTime="5 min"
        heroImage="/og-image.png"
        directAnswer="Inheritance Tax (IHT) in the UK is charged at 40% on the value of an estate above the nil-rate band of £325,000. With the Residence Nil-Rate Band (£175,000), individuals can pass up to £500,000 tax-free; married couples up to £1,000,000. The estate must pay IHT within 6 months of death. Gifts made more than 7 years before death are fully exempt."
        hasPaidSection={false}
        relatedCalculators={[
          { label: "Inheritance Tax Calculator", path: "/finance/inheritance-tax" },
          { label: "Capital Gains Tax Calculator", path: "/finance/capital-gains-tax" },
          { label: "UK Salary Calculator", path: "/finance/salary" },
        ]}
        relatedArticles={[
          { title: "What Is Capital Gains Tax UK?", description: "The other major asset tax — how it works and how to reduce it.", url: "/blog/what-is-capital-gains-tax-uk" },
          { title: "UK Tax Brackets 2025", description: "Income tax bands explained for 2025/26.", url: "/blog/uk-tax-brackets-2025" },
          { title: "What Is an ISA?", description: "Tax-free savings — ISA assets are outside your estate after 2 years in an AIM ISA.", url: "/blog/what-is-an-isa" },
        ]}
      >
        <p>Inheritance tax is one of the most emotive taxes in the UK — and one of the most misunderstood. Most estates pay nothing. But as property values have risen, more families are being caught by a threshold that hasn't kept pace.</p>

        <h2>The nil-rate band: the starting point</h2>

        <p>The first <strong>£325,000</strong> of any estate is completely exempt from IHT. This is called the nil-rate band. On amounts above this, the rate is a flat <strong>40%</strong>.</p>

        <p>So an estate worth £500,000 would owe: (£500,000 − £325,000) × 40% = <strong>£70,000</strong> in IHT.</p>

        <p>The nil-rate band has been frozen at £325,000 since 2009. Meanwhile, average UK house prices have risen from around £167,000 to over £280,000. This fiscal drag means far more estates now breach the threshold than was ever intended.</p>

        <h2>The Residence Nil-Rate Band: an extra £175,000</h2>

        <p>Since 2017, there is an additional allowance — the <strong>Residence Nil-Rate Band (RNRB)</strong> — worth £175,000 in 2025/26. It applies when:</p>

        <ul>
          <li>You leave your main home (or its equivalent value if it was sold) to a direct descendant</li>
          <li>Direct descendants include children, stepchildren, adopted children, foster children, and grandchildren</li>
        </ul>

        <p>This brings the total potential threshold for an individual to <strong>£500,000</strong> (£325,000 + £175,000).</p>

        <p>For married couples and civil partners who leave everything to each other, unused thresholds transfer to the surviving spouse. This means a couple can collectively pass up to <strong>£1,000,000</strong> tax-free.</p>

        <p>Important caveat: the RNRB tapers away for estates worth over £2,000,000, reducing by £1 for every £2 above the threshold.</p>

        <h2>What is exempt from IHT?</h2>

        <p>A significant portion of most estates is exempt:</p>

        <ul>
          <li><strong>Transfers to a spouse or civil partner</strong> — no limit, regardless of value</li>
          <li><strong>Charitable gifts</strong> — fully exempt. Leaving 10%+ of your estate to charity also reduces the IHT rate on the rest from 40% to 36%</li>
          <li><strong>Business Property Relief</strong> — qualifying business assets (including some AIM-listed shares) can be passed on at 0% or 50% IHT</li>
          <li><strong>Agricultural Property Relief</strong> — qualifying farmland and farm buildings</li>
          <li><strong>Pension funds</strong> — typically outside your estate (though rules changed from April 2027)</li>
        </ul>

        <h2>The 7-year rule: gifting early</h2>

        <p>Gifts you make during your lifetime are generally free of IHT if you survive for <strong>7 years</strong> after making them. These are called Potentially Exempt Transfers (PETs).</p>

        <p>If you die within 7 years, the gift is tapered — meaning the IHT charge reduces the older the gift was:</p>

        <ul>
          <li>0–3 years before death: 40% (full rate)</li>
          <li>3–4 years: 32%</li>
          <li>4–5 years: 24%</li>
          <li>5–6 years: 16%</li>
          <li>6–7 years: 8%</li>
          <li>7+ years: 0% (fully exempt)</li>
        </ul>

        <p>This is why experienced estate planners advise starting gifting as early as possible. The clock starts from the date of each gift.</p>

        <h2>Annual exemptions: smaller gifts that are always free</h2>

        <p>Several gifting allowances are immediately exempt — no 7-year wait required:</p>

        <ul>
          <li><strong>Annual exemption:</strong> £3,000 per year (unused allowance can carry forward one year)</li>
          <li><strong>Small gifts:</strong> Up to £250 to any number of people</li>
          <li><strong>Wedding/civil partnership gifts:</strong> £5,000 from parents, £2,500 from grandparents, £1,000 from others</li>
          <li><strong>Gifts from income:</strong> Regular gifts from surplus income (not capital) are exempt, with no limit</li>
        </ul>

        <h2>Key strategies to reduce IHT</h2>

        <p><strong>1. Give early and live 7 years.</strong> The 7-year clock starts on the date of each gift. A programme of regular giving can substantially reduce an estate over time.</p>

        <p><strong>2. Use the annual exemption every year.</strong> £3,000/year for 20 years = £60,000 gifted tax-free. Many people forget to use this.</p>

        <p><strong>3. Leave assets to charity.</strong> Charitable bequests are fully exempt and reduce your IHT rate from 40% to 36% on the remainder.</p>

        <p><strong>4. Invest in Business Property Relief assets.</strong> AIM-listed shares held for at least 2 years qualify for 100% Business Property Relief — meaning they pass outside your estate entirely.</p>

        <p><strong>5. Consider life insurance written in trust.</strong> A whole-of-life policy written in trust pays out directly to beneficiaries outside the estate, providing liquid funds to pay the IHT bill without having to sell property.</p>

        <h2>When does the estate pay IHT?</h2>

        <p>IHT must be paid within <strong>6 months</strong> of the end of the month of death. HMRC charges interest on any outstanding amount after this date.</p>

        <p>For property in the estate, it's often impossible to sell within 6 months. HMRC allows the IHT on property to be paid in annual instalments over 10 years, with interest charged on the unpaid balance.</p>

        <p>The executors of the estate are responsible for paying IHT before probate is granted — meaning the estate must often find liquid funds to pay the tax before it can access the assets.</p>

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
