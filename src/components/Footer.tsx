import { Link } from "react-router-dom";
import { Mail, Twitter, Linkedin, ShieldCheck, Calculator } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const linkStyle = { fontSize: "17px", lineHeight: "1.5" };
  const colHeaderStyle = { fontSize: "13px", letterSpacing: "0.15em" };
  const subHeaderStyle = { fontSize: "11px", letterSpacing: "0.18em" };

  return (
    <footer className="bg-black border-t border-white/8 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* ── How Our Calculators Work ── */}
        <div className="mb-14 pb-14 border-b border-white/8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="h-4 w-4 text-white/20 shrink-0" />
              <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40">How Our Calculators Work</p>
            </div>
            <p className="text-zinc-600 text-sm leading-relaxed mb-8">
              At <strong className="text-zinc-400">The Calculator App</strong>, we bridge the gap between complex financial
              mathematics and everyday usability. Our tools use industry-standard models verified against real-world
              financial benchmarks to ensure precision.
            </p>
            <div className="grid md:grid-cols-2 gap-px bg-white/8 border border-white/8">
              <div className="bg-black px-5 py-5">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="h-4 w-4 text-white/20 shrink-0" />
                  <p className="font-heading text-[10px] uppercase tracking-widest text-white/40">Privacy-First Architecture</p>
                </div>
                <p className="text-zinc-600 text-xs font-sans leading-relaxed">
                  Your financial data never touches our servers. All processing happens{" "}
                  <strong className="text-zinc-500">client-side</strong> in your browser, ensuring 100% data sovereignty.
                </p>
              </div>
              <div className="bg-black px-5 py-5">
                <div className="flex items-center gap-3 mb-2">
                  <Calculator className="h-4 w-4 text-white/20 shrink-0" />
                  <p className="font-heading text-[10px] uppercase tracking-widest text-white/40">Mathematical Transparency</p>
                </div>
                <p className="text-zinc-600 text-xs font-sans leading-relaxed">
                  We believe in "White Box" math. Our formulas are transparently explained on every page,
                  helping you understand the <em>why</em> behind the numbers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Full calculator sitemap ── */}
        <div className="mb-14 pb-14 border-b border-white/8">
          <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/25 mb-8">All Calculators</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-10">

            {/* UK Finance */}
            <div>
              <p className="font-heading uppercase text-white/40 mb-4" style={subHeaderStyle}>UK Finance</p>
              <ul className="space-y-2.5">
                {[
                  ["/finance/mortgage",              "Mortgage Calculator"],
                  ["/finance/mortgage-overpayment",  "Mortgage Overpayment"],
                  ["/finance/stamp-duty",            "Stamp Duty (SDLT)"],
                  ["/finance/weekly-mortgage",       "Weekly Mortgage"],
                  ["/finance/mortgage-cost-comparison", "Mortgage Comparison"],
                  ["/finance/salary",                "UK Salary Calculator"],
                  ["/finance/compound-interest",     "Compound Interest"],
                  ["/finance/savings",               "Savings Calculator"],
                  ["/finance/isa-calculator",        "ISA Calculator"],
                  ["/finance/inheritance-tax",       "Inheritance Tax"],
                  ["/finance/capital-gains-tax",     "Capital Gains Tax"],
                  ["/finance/vat-calculator",        "VAT Calculator"],
                ].map(([to, label]) => (
                  <li key={to}>
                    <Link to={to} className="text-zinc-500 hover:text-white transition-colors font-sans text-sm">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* US Finance */}
            <div>
              <p className="font-heading uppercase text-white/40 mb-4" style={subHeaderStyle}>US Finance</p>
              <ul className="space-y-2.5">
                {[
                  ["/finance/us-salary-calculator",  "US Salary Calculator"],
                  ["/finance/401k-calculator",       "401(k) Calculator"],
                  ["/finance/us-sales-tax-calculator","US Sales Tax"],
                ].map(([to, label]) => (
                  <li key={to}>
                    <Link to={to} className="text-zinc-500 hover:text-white transition-colors font-sans text-sm">{label}</Link>
                  </li>
                ))}
              </ul>

              <p className="font-heading uppercase text-white/40 mb-4 mt-8" style={subHeaderStyle}>Loans & Debt</p>
              <ul className="space-y-2.5">
                {[
                  ["/finance/loan",              "Loan Calculator"],
                  ["/finance/car-loan",          "Car Loan Calculator"],
                  ["/finance/credit-card-payoff","Credit Card Payoff"],
                  ["/finance/multi-card-payoff", "Multi-Card Payoff"],
                ].map(([to, label]) => (
                  <li key={to}>
                    <Link to={to} className="text-zinc-500 hover:text-white transition-colors font-sans text-sm">{label}</Link>
                  </li>
                ))}
              </ul>

              <p className="font-heading uppercase text-white/40 mb-4 mt-8" style={subHeaderStyle}>Planning</p>
              <ul className="space-y-2.5">
                {[
                  ["/finance/retirement",        "Retirement Calculator"],
                  ["/finance/budget",            "Budget Calculator"],
                  ["/finance/how-long-to-save",  "How Long to Save"],
                  ["/finance/how-much-to-save",  "How Much to Save"],
                  ["/finance/future-house-value","Future House Value"],
                  ["/finance/irr",               "IRR Calculator"],
                  ["/finance/cashback",          "Cashback Calculator"],
                  ["/finance/apy",               "APY Calculator"],
                  ["/finance/simple-interest",   "Simple Interest"],
                ].map(([to, label]) => (
                  <li key={to}>
                    <Link to={to} className="text-zinc-500 hover:text-white transition-colors font-sans text-sm">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Everyday */}
            <div>
              <p className="font-heading uppercase text-white/40 mb-4" style={subHeaderStyle}>Everyday</p>
              <ul className="space-y-2.5">
                {[
                  ["/misc/percentage",           "Percentage Calculator"],
                  ["/misc/percentage-of",        "Percentage Of"],
                  ["/misc/percentage-change",    "Percentage Change"],
                  ["/misc/discount",             "Discount Calculator"],
                  ["/misc/tip",                  "Tip Calculator"],
                  ["/misc/bmi-calculator",       "BMI Calculator"],
                  ["/misc/calorie-calculator",   "Calorie Calculator"],
                  ["/misc/age",                  "Age Calculator"],
                  ["/misc/square-footage",       "Square Footage"],
                  ["/misc/gravel-calculator",    "Gravel Calculator"],
                  ["/misc/mulch-calculator",     "Mulch Calculator"],
                  ["/misc/concrete-calculator",  "Concrete Calculator"],
                  ["/misc/cubic-yards",          "Cubic Yards"],
                ].map(([to, label]) => (
                  <li key={to}>
                    <Link to={to} className="text-zinc-500 hover:text-white transition-colors font-sans text-sm">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Date & Time */}
            <div>
              <p className="font-heading uppercase text-white/40 mb-4" style={subHeaderStyle}>Date & Time</p>
              <ul className="space-y-2.5">
                {[
                  ["/misc/days-from-today",      "Days From Today"],
                  ["/misc/days-between-dates",   "Days Between Dates"],
                  ["/misc/months-between-dates", "Months Between Dates"],
                  ["/misc/hours-calculator",     "Hours Calculator"],
                  ["/misc/working-days",         "Working Days"],
                  ["/misc/days-from-today/7",    "7 Days From Today"],
                  ["/misc/days-from-today/14",   "14 Days From Today"],
                  ["/misc/days-from-today/30",   "30 Days From Today"],
                  ["/misc/days-from-today/60",   "60 Days From Today"],
                  ["/misc/days-from-today/90",   "90 Days From Today"],
                  ["/misc/days-from-today/180",  "180 Days From Today"],
                  ["/misc/days-from-today/365",  "365 Days From Today"],
                ].map(([to, label]) => (
                  <li key={to}>
                    <Link to={to} className="text-zinc-500 hover:text-white transition-colors font-sans text-sm">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Converters */}
            <div>
              <p className="font-heading uppercase text-white/40 mb-4" style={subHeaderStyle}>Unit Converters</p>
              <ul className="space-y-2.5">
                {[
                  ["/converters/cm-to-inches",         "CM to Inches"],
                  ["/converters/inches-to-cm",         "Inches to CM"],
                  ["/converters/lbs-to-kg",            "LBS to KG"],
                  ["/converters/stone-to-kg",          "Stone to KG"],
                  ["/converters/km-to-miles",          "KM to Miles"],
                  ["/converters/metres-to-feet",       "Metres to Feet"],
                  ["/converters/fahrenheit-to-celsius","Fahrenheit to Celsius"],
                  ["/converters/gallons-to-litres",    "Gallons to Litres"],
                  ["/converters/ml-to-oz",             "ML to Oz"],
                  ["/converters/cups-to-grams",        "Cups to Grams"],
                  ["/converters/grams-to-tablespoons", "Grams to Tablespoons"],
                  ["/converters/ounces-to-grams",      "Ounces to Grams"],
                  ["/converters/teaspoons-to-ml",      "Teaspoons to ML"],
                  ["/converters/length",               "Length Converter"],
                  ["/converters/weight",               "Weight Converter"],
                  ["/converters/temperature",          "Temperature Converter"],
                  ["/converters/universal",            "Universal Converter"],
                ].map(([to, label]) => (
                  <li key={to}>
                    <Link to={to} className="text-zinc-500 hover:text-white transition-colors font-sans text-sm">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* ── Main nav grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">

          {/* Categories */}
          <div>
            <p className="font-heading uppercase text-white/50 mb-5" style={colHeaderStyle}>Categories</p>
            <div className="space-y-5">
              <div>
                <p className="font-heading uppercase text-white/25 mb-3" style={subHeaderStyle}>Finance</p>
                <ul className="space-y-3">
                  {[
                    ["/finance/compound-interest", "Compound Interest"],
                    ["/finance/mortgage",           "Mortgage"],
                    ["/finance/loan",               "Loan"],
                    ["/finance/salary",             "Salary"],
                    ["/finance/retirement",         "Retirement"],
                  ].map(([to, label]) => (
                    <li key={to}>
                      <Link to={to} className="text-zinc-400 hover:text-white transition-colors font-sans" style={linkStyle}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-heading uppercase text-white/25 mb-3" style={subHeaderStyle}>Everyday</p>
                <ul className="space-y-3">
                  {[
                    ["/misc/percentage-of",     "Percentage Of"],
                    ["/misc/percentage-change", "Percentage Change"],
                    ["/misc/discount",          "Discount"],
                    ["/misc/age",               "Age"],
                  ].map(([to, label]) => (
                    <li key={to}>
                      <Link to={to} className="text-zinc-400 hover:text-white transition-colors font-sans" style={linkStyle}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div>
            <p className="font-heading uppercase text-white/50 mb-5" style={colHeaderStyle}>Resources</p>
            <div className="space-y-5">
              <div>
                <p className="font-heading uppercase text-white/25 mb-3" style={subHeaderStyle}>Learn Hub</p>
                <ul className="space-y-3">
                  {[
                    ["/learn",                   "All Articles"],
                    ["/learn/financial-journey", "Financial Journey"],
                    ["/learn/50-30-20-budget",   "50/30/20 Budget"],
                    ["/learn/emergency-fund",    "Emergency Fund"],
                  ].map(([to, label]) => (
                    <li key={to}>
                      <Link to={to} className="text-zinc-400 hover:text-white transition-colors font-sans" style={linkStyle}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-heading uppercase text-white/25 mb-3" style={subHeaderStyle}>Tools</p>
                <ul className="space-y-3">
                  {[
                    ["/formulas", "Formula Directory"],
                    ["/blog",     "Blog"],
                  ].map(([to, label]) => (
                    <li key={to}>
                      <Link to={to} className="text-zinc-400 hover:text-white transition-colors font-sans" style={linkStyle}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Legal & About */}
          <div>
            <p className="font-heading uppercase text-white/50 mb-5" style={colHeaderStyle}>Legal &amp; About</p>
            <ul className="space-y-3">
              {[
                ["/about",      "About Us"],
                ["/privacy",    "Privacy Policy"],
                ["/cookies",    "Cookie Policy"],
                ["/terms",      "Terms of Use"],
                ["/disclaimer", "Disclaimer"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-zinc-400 hover:text-white transition-colors font-sans" style={linkStyle}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-heading uppercase text-white/50 mb-5" style={colHeaderStyle}>Contact</p>
            <div className="space-y-5">
              <a
                href="mailto:thecalculatorpage@gmail.com"
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-sans"
                style={linkStyle}
              >
                <Mail className="h-4 w-4 shrink-0" />
                thecalculatorpage@gmail.com
              </a>
              <div className="flex gap-2">
                <a
                  href="https://twitter.com/thecalcpage"
                  target="_blank" rel="noopener noreferrer"
                  className="border border-white/8 p-2.5 text-white/25 hover:text-white hover:border-white/20 transition-all"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href="https://linkedin.com/company/thecalculatorpage"
                  target="_blank" rel="noopener noreferrer"
                  className="border border-white/8 p-2.5 text-white/25 hover:text-white hover:border-white/20 transition-all"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-end gap-6">
            <Logo size="sm" />
            <span className="text-zinc-700 text-xs font-sans pb-0.5">
              © {currentYear} The Calculator App. All rights reserved.
            </span>
          </div>
          <p className="text-zinc-800 text-[10px] font-sans italic max-w-sm text-left md:text-right leading-relaxed">
            *All calculations are for informational purposes only. Results are not guaranteed and may vary
            based on institutional terms.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;