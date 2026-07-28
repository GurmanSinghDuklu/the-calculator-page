import type { AnswerPageData } from "./types";
import {
  ukTakeHome, mortgagePayment, futureValueMonthly,
  creditCardAnnualInterest, creditCardPayoffMonths,
} from "./calc";

const gbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");
const TODAY = "2026-06-09";
const MODIFIED = "2026-06-18";

// Shared official source sets
const UK_MORTGAGE_SOURCES = [
  { label: "Bank of England — Mortgage Rates", url: "https://www.bankofengland.co.uk/monetary-policy/the-interest-rate-bank-rate" },
  { label: "FCA — Mortgage Conduct of Business Rules", url: "https://www.fca.org.uk/consumers/mortgages" },
  { label: "MoneyHelper — How mortgages work", url: "https://www.moneyhelper.org.uk/en/homes/buying-a-home/how-repayment-mortgages-work" },
];
const UK_SALARY_SOURCES = [
  { label: "HMRC — Income Tax rates and allowances 2026/27", url: "https://www.gov.uk/income-tax-rates" },
  { label: "HMRC — National Insurance rates 2026/27", url: "https://www.gov.uk/national-insurance/how-much-national-insurance-you-pay" },
  { label: "HMRC — Personal Allowance", url: "https://www.gov.uk/income-tax-rates/personal-allowances" },
];
const UK_SAVINGS_SOURCES = [
  { label: "FCA — Investing basics", url: "https://www.fca.org.uk/consumers/investing" },
  { label: "MoneyHelper — How to save and invest", url: "https://www.moneyhelper.org.uk/en/savings/types-of-savings/stocks-and-shares-isas" },
  { label: "HMRC — ISA allowances", url: "https://www.gov.uk/individual-savings-accounts" },
];
const UK_DEBT_SOURCES = [
  { label: "FCA — Credit card rules", url: "https://www.fca.org.uk/consumers/credit-cards" },
  { label: "StepChange — Understanding credit card debt", url: "https://www.stepchange.org/debt-info/credit-card-debt.aspx" },
  { label: "MoneyHelper — Balance transfers explained", url: "https://www.moneyhelper.org.uk/en/everyday-money/credit/credit-card-balance-transfers" },
];
const UK_PENSION_SOURCES = [
  { label: "Gov.uk — State Pension age", url: "https://www.gov.uk/state-pension-age" },
  { label: "MoneyHelper — Pension withdrawal options", url: "https://www.moneyhelper.org.uk/en/pensions-and-retirement/taking-your-pension" },
  { label: "The Pensions Regulator — Workplace pensions", url: "https://www.thepensionsregulator.gov.uk/en/workers/what-is-a-workplace-pension" },
];

// Pre-computed figures
const m200 = mortgagePayment(200000, 5, 25);
const m300 = mortgagePayment(300000, 5, 25);
const th30 = ukTakeHome(30000);
const th40 = ukTakeHome(40000);
const th50 = ukTakeHome(50000);
const th60 = ukTakeHome(60000);
const th100 = ukTakeHome(100000);
const fv500 = futureValueMonthly(500, 7, 20);
const fv10k = 10000 * Math.pow(1.07, 10);
const cc10kInt = creditCardAnnualInterest(10000, 24);
const cc5kMonths = creditCardPayoffMonths(5000, 22, 150);

export const ukPages: AnswerPageData[] = [
  {
    slug: "200k-mortgage-monthly-payment",
    market: "uk", category: "Mortgage", currency: "£",
    question: "How much is a £200,000 mortgage per month?",
    metaDescription: `A £200,000 mortgage over 25 years at 5% costs ${gbp(m200)} per month. See the full repayment breakdown and how the rate changes it.`,
    keywords: "200000 mortgage monthly payment, 200k mortgage per month uk, how much is a 200000 mortgage",
    answer: `A £200,000 mortgage over 25 years at 5% costs ${gbp(m200)} per month. Across the full term you repay ${gbp(m200 * 300)}, of which roughly ${gbp(m200 * 300 - 200000)} is interest.`,
    answerNumber: `${gbp(m200)}/mo`,
    assumptions: ["25-year term", "5% annual interest rate", "Repayment (capital & interest) mortgage", "Rate held constant for illustration"],
    formula: "M = P·r(1+r)ⁿ ÷ ((1+r)ⁿ − 1)",
    comparison: {
      title: "£200,000 monthly payment by rate (25-year term)",
      columns: ["Interest rate", "Monthly payment"],
      rows: [
        { label: "4%", value: gbp(mortgagePayment(200000, 4, 25)) },
        { label: "5%", value: gbp(m200) },
        { label: "6%", value: gbp(mortgagePayment(200000, 6, 25)) },
        { label: "7%", value: gbp(mortgagePayment(200000, 7, 25)) },
      ],
    },
    chart: {
      title: "Monthly payment by rate",
      points: [
        { name: "4%", value: Math.round(mortgagePayment(200000, 4, 25)) },
        { name: "5%", value: Math.round(m200) },
        { name: "6%", value: Math.round(mortgagePayment(200000, 6, 25)) },
        { name: "7%", value: Math.round(mortgagePayment(200000, 7, 25)) },
      ],
    },
    faqs: [
      { question: "How much deposit do I need for a £200,000 mortgage?", answer: "Most lenders want at least 10% — so around £20,000–£22,000 on a property where you're borrowing £200,000. A 5% deposit is possible with some lenders but rates are higher." },
      { question: "What salary do I need for a £200,000 mortgage?", answer: "At the common 4.5× income multiple you'd need roughly £44,000 combined income. Some lenders stretch to 5× for strong applicants." },
      { question: "How much would I pay over the full term?", answer: `Over 25 years at 5% you repay about ${gbp(m200 * 300)} in total — roughly ${gbp(m200 * 300 - 200000)} of that is interest on top of the £200,000 borrowed.` },
    ],
    calculatorPath: "/finance/mortgage?amount=200000&rate=5&term=25",
    calculatorLabel: "Open in mortgage calculator",
    related: ["300k-mortgage-monthly-payment", "salary-for-400k-house", "deposit-for-250k-house"],
    officialSources: UK_MORTGAGE_SOURCES,
    datePublished: TODAY, dateModified: MODIFIED,
  },
  {
    slug: "300k-mortgage-monthly-payment",
    market: "uk", category: "Mortgage", currency: "£",
    question: "How much is a £300,000 mortgage per month?",
    metaDescription: `A £300,000 mortgage over 25 years at 5% costs ${gbp(m300)} per month. Full repayment breakdown and rate comparison.`,
    keywords: "300000 mortgage monthly payment, 300k mortgage per month uk, how much is a 300000 mortgage",
    answer: `A £300,000 mortgage over 25 years at 5% costs ${gbp(m300)} per month. Across the full term you repay ${gbp(m300 * 300)}, of which around ${gbp(m300 * 300 - 300000)} is interest.`,
    answerNumber: `${gbp(m300)}/mo`,
    assumptions: ["25-year term", "5% annual interest rate", "Repayment mortgage", "Rate held constant for illustration"],
    formula: "M = P·r(1+r)ⁿ ÷ ((1+r)ⁿ − 1)",
    comparison: {
      title: "£300,000 monthly payment by rate (25-year term)",
      columns: ["Interest rate", "Monthly payment"],
      rows: [
        { label: "4%", value: gbp(mortgagePayment(300000, 4, 25)) },
        { label: "5%", value: gbp(m300) },
        { label: "6%", value: gbp(mortgagePayment(300000, 6, 25)) },
        { label: "7%", value: gbp(mortgagePayment(300000, 7, 25)) },
      ],
    },
    chart: {
      title: "Monthly payment by rate",
      points: [
        { name: "4%", value: Math.round(mortgagePayment(300000, 4, 25)) },
        { name: "5%", value: Math.round(m300) },
        { name: "6%", value: Math.round(mortgagePayment(300000, 6, 25)) },
        { name: "7%", value: Math.round(mortgagePayment(300000, 7, 25)) },
      ],
    },
    faqs: [
      { question: "What salary do I need for a £300,000 mortgage?", answer: "At 4.5× income, roughly £67,000 combined. Lenders assessing affordability also look at outgoings, not just income multiples." },
      { question: "How much deposit for a £300,000 mortgage?", answer: "Typically 10% of the property price. If you're borrowing £300,000 on a £333,000 home that's a £33,000 deposit." },
      { question: "How much interest will I pay?", answer: `About ${gbp(m300 * 300 - 300000)} over 25 years at 5% — overpaying even a little cuts that significantly.` },
    ],
    calculatorPath: "/finance/mortgage?amount=300000&rate=5&term=25",
    calculatorLabel: "Open in mortgage calculator",
    related: ["200k-mortgage-monthly-payment", "salary-for-400k-house", "deposit-for-250k-house"],
    officialSources: UK_MORTGAGE_SOURCES,
    datePublished: TODAY, dateModified: MODIFIED,
  },
  {
    slug: "salary-for-400k-house",
    market: "uk", category: "Mortgage", currency: "£",
    question: "What salary do I need to buy a £400,000 house?",
    metaDescription: "To buy a £400,000 house with a 10% deposit you typically need around £80,000 income at 4.5× lending. See the full breakdown.",
    keywords: "salary for 400k house uk, income needed for 400000 mortgage, what salary to buy 400k house",
    answer: "To buy a £400,000 house with a 10% (£40,000) deposit, you borrow £360,000. At the common 4.5× income multiple you'd need about £80,000 of income — or £72,000 between two applicants at 5×.",
    answerNumber: "~£80,000",
    assumptions: ["10% deposit (£40,000)", "£360,000 borrowed", "4.5× income multiple (standard)", "Joint applications can combine incomes"],
    formula: "Income needed ≈ Loan ÷ multiple",
    comparison: {
      title: "Income needed for a £400,000 house by deposit & multiple",
      columns: ["Scenario", "Income needed"],
      rows: [
        { label: "10% deposit, 4.5×", value: "£80,000" },
        { label: "10% deposit, 5×", value: "£72,000" },
        { label: "20% deposit, 4.5×", value: "£71,000" },
        { label: "20% deposit, 5×", value: "£64,000" },
      ],
    },
    faqs: [
      { question: "Can two people combine salaries?", answer: "Yes — most lenders add both applicants' incomes, so two people earning £40,000 each can often borrow as much as one person on £80,000." },
      { question: "What if I have a bigger deposit?", answer: "A larger deposit means a smaller loan and lower income requirement, plus access to lower interest rates at better loan-to-value bands." },
      { question: "Do lenders only look at income?", answer: "No. Affordability checks include your outgoings, debts, dependents and credit history, not just the income multiple." },
    ],
    calculatorPath: "/mortgages/salary-for-mortgage?price=400000",
    calculatorLabel: "Open salary-for-mortgage calculator",
    related: ["deposit-for-250k-house", "200k-mortgage-monthly-payment", "300k-mortgage-monthly-payment"],
    officialSources: [
      ...UK_MORTGAGE_SOURCES,
      { label: "FCA — Mortgage affordability rules", url: "https://www.fca.org.uk/consumers/mortgages/mortgage-affordability" },
    ],
    datePublished: TODAY, dateModified: MODIFIED,
  },
  {
    slug: "deposit-for-250k-house",
    market: "uk", category: "Mortgage", currency: "£",
    question: "How much deposit do I need for a £250,000 house?",
    metaDescription: "For a £250,000 house you typically need a 10% deposit of £25,000, though 5% (£12,500) deals exist. See deposit sizes and what they unlock.",
    keywords: "deposit for 250k house uk, how much deposit 250000 house, 250k house deposit",
    answer: "For a £250,000 house, a 10% deposit is £25,000 and a 5% deposit is £12,500. A bigger deposit unlocks lower rates — at 15% (£37,500) you reach a much cheaper loan-to-value band.",
    answerNumber: "£25,000",
    assumptions: ["Deposit shown as % of £250,000 purchase price", "Higher deposit = lower loan-to-value = better rates", "5% deals exist but carry higher rates"],
    formula: "Deposit = price × deposit %",
    comparison: {
      title: "Deposit sizes for a £250,000 house",
      columns: ["Deposit %", "Amount"],
      rows: [
        { label: "5%", value: "£12,500" },
        { label: "10%", value: "£25,000" },
        { label: "15%", value: "£37,500" },
        { label: "20%", value: "£50,000" },
      ],
    },
    faqs: [
      { question: "Is a 5% deposit enough?", answer: "Yes, some lenders accept 5% (£12,500 on a £250,000 home), but you'll pay a higher interest rate than at 10% or 15%." },
      { question: "Does a bigger deposit save money?", answer: "Significantly. Crossing into a lower loan-to-value band (e.g. 90% to 85%) typically drops your rate, saving thousands over the term." },
      { question: "Do I need extra cash on top of the deposit?", answer: "Yes — budget for stamp duty (if applicable), legal fees, surveys and moving costs, often £2,000–£5,000+." },
    ],
    calculatorPath: "/finance/stamp-duty?price=250000",
    calculatorLabel: "Check stamp duty on £250,000",
    related: ["salary-for-400k-house", "200k-mortgage-monthly-payment", "300k-mortgage-monthly-payment"],
    officialSources: [
      { label: "Gov.uk — Stamp Duty Land Tax rates", url: "https://www.gov.uk/stamp-duty-land-tax/residential-property-rates" },
      { label: "Gov.uk — Help to Buy: Equity Loan", url: "https://www.gov.uk/help-to-buy-equity-loan" },
      ...UK_MORTGAGE_SOURCES.slice(0, 2),
    ],
    datePublished: TODAY, dateModified: MODIFIED,
  },
  // ---- Salary pages ----
  ...[
    { gross: 30000, th: th30 },
    { gross: 40000, th: th40 },
    { gross: 50000, th: th50 },
    { gross: 60000, th: th60 },
    { gross: 100000, th: th100 },
  ].map(({ gross, th }): AnswerPageData => ({
    slug: `${gross}-after-tax`,
    market: "uk", category: "Salary", currency: "£",
    question: `£${gross.toLocaleString("en-GB")} after tax UK`,
    metaDescription: `£${gross.toLocaleString("en-GB")} a year is ${gbp(th.net)} after tax and National Insurance in 2026/27 — about ${gbp(th.net / 12)} a month take-home.`,
    keywords: `${gross} after tax uk, ${gross} take home pay, ${gross} salary after tax`,
    answer: `£${gross.toLocaleString("en-GB")} a year is ${gbp(th.net)} after tax and National Insurance in 2026/27 — about ${gbp(th.net / 12)} per month. You pay ${gbp(th.incomeTax)} income tax and ${gbp(th.ni ?? 0)} NI.`,
    answerNumber: `${gbp(th.net)}`,
    assumptions: ["2026/27 tax year", "England/Wales/NI rates (Scotland differs)", "Standard 1257L tax code", "Class 1 employee National Insurance"],
    formula: "Net = Gross − Income Tax − National Insurance",
    comparison: {
      title: `£${gross.toLocaleString("en-GB")} breakdown (2026/27)`,
      columns: ["Item", "Amount"],
      rows: [
        { label: "Gross salary", value: gbp(gross) },
        { label: "Income tax", value: "−" + gbp(th.incomeTax) },
        { label: "National Insurance", value: "−" + gbp(th.ni ?? 0) },
        { label: "Take-home (year)", value: gbp(th.net) },
        { label: "Take-home (month)", value: gbp(th.net / 12) },
      ],
    },
    faqs: [
      { question: `What is £${gross.toLocaleString("en-GB")} after tax per month?`, answer: `About ${gbp(th.net / 12)} per month in the 2026/27 tax year, after income tax and National Insurance.` },
      { question: "Does this include a pension?", answer: "No — this is take-home before any workplace pension contribution. Pension contributions would reduce both your taxable pay and your net pay." },
      { question: "Are Scottish rates different?", answer: "Yes. Scotland has its own income tax bands, so take-home differs slightly. National Insurance is the same UK-wide." },
    ],
    calculatorPath: `/finance/salary?salary=${gross}&country=UK`,
    calculatorLabel: "Open in UK salary calculator",
    related: [30000, 40000, 50000, 60000, 100000].filter((g) => g !== gross).slice(0, 3).map((g) => `${g}-after-tax`),
    officialSources: UK_SALARY_SOURCES,
    datePublished: TODAY, dateModified: MODIFIED,
  })),
  // ---- Savings / investing ----
  {
    slug: "500-a-month-20-years",
    market: "uk", category: "Savings", currency: "£",
    question: "How much is £500 a month invested for 20 years?",
    metaDescription: `Investing £500 a month for 20 years at a 7% average return grows to about ${gbp(fv500)} — you contribute £120,000 and growth adds the rest.`,
    keywords: "500 a month invested for 20 years, 500 per month investment 20 years, invest 500 monthly",
    answer: `Investing £500 a month for 20 years at a 7% average annual return grows to about ${gbp(fv500)}. You contribute £120,000 — compound growth adds roughly ${gbp(fv500 - 120000)} on top.`,
    answerNumber: `${gbp(fv500)}`,
    assumptions: ["7% average annual return (long-run global equity proxy)", "£500 invested monthly for 240 months", "Returns reinvested (compounded monthly)", "Before inflation, fees and tax"],
    formula: "FV = PMT × ((1+r)ⁿ − 1) ÷ r",
    comparison: {
      title: "£500/month for 20 years by return rate",
      columns: ["Annual return", "Final value"],
      rows: [
        { label: "5%", value: gbp(futureValueMonthly(500, 5, 20)) },
        { label: "7%", value: gbp(fv500) },
        { label: "9%", value: gbp(futureValueMonthly(500, 9, 20)) },
      ],
    },
    chart: {
      title: "Final value by return rate",
      points: [
        { name: "5%", value: Math.round(futureValueMonthly(500, 5, 20)) },
        { name: "7%", value: Math.round(fv500) },
        { name: "9%", value: Math.round(futureValueMonthly(500, 9, 20)) },
      ],
    },
    faqs: [
      { question: "Is 7% a realistic return?", answer: "It's a common long-run average for a globally diversified equity portfolio before inflation. Real returns vary year to year and aren't guaranteed." },
      { question: "What about inflation?", answer: "Inflation erodes purchasing power. At 2.5% inflation, the real value of the final pot is lower than the headline figure — though still substantial." },
      { question: "Should I use an ISA?", answer: "A Stocks & Shares ISA shelters the growth from tax. Over 20 years that tax saving can be worth tens of thousands." },
    ],
    calculatorPath: "/finance/compound-interest?principal=0&contribution=500&rate=7&years=20",
    calculatorLabel: "Open in compound interest calculator",
    related: ["10000-invested-10-years", "save-100k-by-40", "pension-to-retire-at-60"],
    officialSources: UK_SAVINGS_SOURCES,
    datePublished: TODAY, dateModified: MODIFIED,
  },
  {
    slug: "10000-invested-10-years",
    market: "uk", category: "Savings", currency: "£",
    question: "How much would £10,000 grow in 10 years?",
    metaDescription: `£10,000 invested for 10 years at 7% grows to about ${gbp(fv10k)} with no further contributions — purely from compound growth.`,
    keywords: "10000 invested for 10 years, how much will 10000 grow in 10 years, 10k investment 10 years",
    answer: `£10,000 invested for 10 years at a 7% average annual return grows to about ${gbp(fv10k)} — with no further contributions. That's ${gbp(fv10k - 10000)} of pure compound growth.`,
    answerNumber: `${gbp(fv10k)}`,
    assumptions: ["7% average annual return", "Lump sum, no further contributions", "Returns compounded annually", "Before inflation, fees and tax"],
    formula: "FV = P × (1 + r)ⁿ",
    comparison: {
      title: "£10,000 after 10 years by return rate",
      columns: ["Annual return", "Final value"],
      rows: [
        { label: "3%", value: gbp(10000 * Math.pow(1.03, 10)) },
        { label: "5%", value: gbp(10000 * Math.pow(1.05, 10)) },
        { label: "7%", value: gbp(fv10k) },
        { label: "9%", value: gbp(10000 * Math.pow(1.09, 10)) },
      ],
    },
    faqs: [
      { question: "What if I add monthly contributions?", answer: "Adding regular contributions dramatically increases the total. £10,000 plus £200/month at 7% would grow to far more than the lump sum alone." },
      { question: "Is this guaranteed?", answer: "No. Investment returns fluctuate and you can get back less than you put in. 7% is a long-run average, not a promise." },
      { question: "Cash savings vs investing?", answer: "A savings account paying 4% would grow £10,000 to about £14,800 over 10 years — less than investing at 7%, but with no capital risk." },
    ],
    calculatorPath: "/finance/compound-interest?principal=10000&contribution=0&rate=7&years=10",
    calculatorLabel: "Open in compound interest calculator",
    related: ["500-a-month-20-years", "save-100k-by-40", "pension-to-retire-at-60"],
    officialSources: UK_SAVINGS_SOURCES,
    datePublished: TODAY, dateModified: MODIFIED,
  },
  {
    slug: "save-100k-by-40",
    market: "uk", category: "Savings", currency: "£",
    question: "How much do I need to save to have £100k by 40?",
    metaDescription: "Starting from zero at 25, you need about £290 a month at 7% to reach £100,000 by 40. Start later and the monthly figure rises sharply.",
    keywords: "save 100k by 40, how to save 100000 by 40, reach 100k savings",
    answer: "Starting from zero at age 25 (15 years), you need about £290 a month invested at 7% to reach £100,000 by 40. Start at 30 instead and it jumps to roughly £480 a month.",
    answerNumber: "~£290/mo",
    assumptions: ["7% average annual return", "Starting from £0", "Target £100,000", "Monthly contributions, compounded monthly"],
    formula: "PMT = FV × r ÷ ((1+r)ⁿ − 1)",
    comparison: {
      title: "Monthly saving needed to hit £100k by 40",
      columns: ["Start age", "Monthly amount"],
      rows: [
        { label: "25 (15 yrs)", value: "£290" },
        { label: "30 (10 yrs)", value: "£480" },
        { label: "35 (5 yrs)", value: "£1,165" },
      ],
    },
    faqs: [
      { question: "Why does starting earlier matter so much?", answer: "Compound growth needs time. Starting at 25 instead of 35 roughly quarters the monthly amount needed, because the market does more of the work." },
      { question: "What return should I assume?", answer: "7% reflects a long-run diversified equity average. Cash savings at 4% would need a higher monthly contribution." },
      { question: "Should this be in an ISA?", answer: "A Stocks & Shares ISA keeps the growth tax-free, helping the pot reach £100,000 faster in real terms." },
    ],
    calculatorPath: "/finance/savings?target=100000&rate=7",
    calculatorLabel: "Open in savings calculator",
    related: ["500-a-month-20-years", "10000-invested-10-years", "pension-to-retire-at-60"],
    officialSources: UK_SAVINGS_SOURCES,
    datePublished: TODAY, dateModified: MODIFIED,
  },
  // ---- Debt ----
  {
    slug: "payoff-5000-credit-card",
    market: "uk", category: "Debt", currency: "£",
    question: "How long to pay off £5,000 of credit card debt?",
    metaDescription: `Paying £150 a month on a £5,000 card at 22% APR clears it in about ${cc5kMonths} months. Pay more each month and you finish far sooner.`,
    keywords: "pay off 5000 credit card, how long to clear 5000 debt, 5000 credit card payoff time",
    answer: `Paying £150 a month on a £5,000 credit card at 22% APR clears it in about ${cc5kMonths} months. Increasing payments to £250 a month roughly halves both the time and the interest.`,
    answerNumber: `~${cc5kMonths} mo`,
    assumptions: ["£5,000 starting balance", "22% representative APR", "Fixed monthly payment", "No further spending on the card"],
    formula: "n = −ln(1 − B·r ÷ PMT) ÷ ln(1 + r)",
    comparison: {
      title: "£5,000 at 22% APR — months to clear",
      columns: ["Monthly payment", "Months to clear"],
      rows: [
        { label: "£100", value: String(creditCardPayoffMonths(5000, 22, 100)) },
        { label: "£150", value: String(cc5kMonths) },
        { label: "£250", value: String(creditCardPayoffMonths(5000, 22, 250)) },
        { label: "£400", value: String(creditCardPayoffMonths(5000, 22, 400)) },
      ],
    },
    faqs: [
      { question: "Would a 0% balance transfer help?", answer: "Hugely. Moving the £5,000 to a 0% balance-transfer card (minus a small fee) means every pound goes to the balance, not interest — clearing it far faster." },
      { question: "What if I only pay the minimum?", answer: "Minimum-only payments can stretch a £5,000 debt over decades and cost more in interest than the original balance. Always pay more than the minimum if you can." },
      { question: "Which debt should I clear first?", answer: "Mathematically, the highest-APR debt first (avalanche). For motivation, smallest balance first (snowball)." },
    ],
    calculatorPath: "/finance/credit-card-payoff?balance=5000&apr=22&payment=150",
    calculatorLabel: "Open in credit card payoff calculator",
    related: ["10000-credit-card-interest", "500-a-month-20-years", "10000-invested-10-years"],
    officialSources: UK_DEBT_SOURCES,
    datePublished: TODAY, dateModified: MODIFIED,
  },
  {
    slug: "10000-credit-card-interest",
    market: "uk", category: "Debt", currency: "£",
    question: "How much interest on £10,000 credit card at 24% APR?",
    metaDescription: `A £10,000 balance at 24% APR costs about ${gbp(cc10kInt)} a year in interest — roughly ${gbp(cc10kInt / 12)} a month if the balance doesn't fall.`,
    keywords: "10000 credit card interest, interest on 10000 at 24 apr, credit card 24 percent interest",
    answer: `A £10,000 credit card balance at 24% APR costs about ${gbp(cc10kInt)} per year in interest — roughly ${gbp(cc10kInt / 12)} every month while the balance stays at £10,000.`,
    answerNumber: `${gbp(cc10kInt)}/yr`,
    assumptions: ["£10,000 balance", "24% APR", "Interest shown on the full balance", "Real cards compound, so actual cost can be higher"],
    formula: "Annual interest = Balance × APR",
    comparison: {
      title: "Annual interest on £10,000 by APR",
      columns: ["APR", "Yearly interest"],
      rows: [
        { label: "18%", value: gbp(creditCardAnnualInterest(10000, 18)) },
        { label: "24%", value: gbp(cc10kInt) },
        { label: "30%", value: gbp(creditCardAnnualInterest(10000, 30)) },
      ],
    },
    faqs: [
      { question: "How do I stop paying this interest?", answer: "A 0% balance-transfer card moves the debt to an interest-free period (for a small fee), so your payments reduce the balance instead of servicing interest." },
      { question: "Is APR the same as monthly interest?", answer: "No. APR is annual; the monthly rate is roughly APR ÷ 12, but real cards compound, so the effective annual cost is slightly higher than the headline APR." },
      { question: "How much should I pay each month?", answer: "As much as you can above the minimum. On a £10,000 balance, minimum payments barely dent the principal while interest keeps accruing." },
    ],
    calculatorPath: "/finance/credit-card-payoff?balance=10000&apr=24&payment=300",
    calculatorLabel: "Open in credit card payoff calculator",
    related: ["payoff-5000-credit-card", "500-a-month-20-years", "10000-invested-10-years"],
    officialSources: UK_DEBT_SOURCES,
    datePublished: TODAY, dateModified: MODIFIED,
  },
  // ---- Pension ----
  {
    slug: "pension-to-retire-at-60",
    market: "uk", category: "Pension", currency: "£",
    question: "How much pension do I need to retire at 60?",
    metaDescription: "For a comfortable retirement at 60 on about £25,000 a year before State Pension, you'd need a pension pot of roughly £500,000 using a 5% withdrawal rate.",
    keywords: "pension to retire at 60, how much pension to retire at 60 uk, pension pot for 60",
    answer: "To retire at 60 on about £25,000 a year (before State Pension kicks in at 66–67), you'd need a pension pot of roughly £500,000 using a sustainable 5% withdrawal. For £35,000 a year, closer to £700,000.",
    answerNumber: "~£500,000",
    assumptions: ["Target income ~£25,000/year", "5% sustainable withdrawal rate", "Bridges to State Pension age (66–67)", "Excludes other savings and State Pension top-up later"],
    formula: "Pot ≈ Annual income ÷ withdrawal rate",
    comparison: {
      title: "Pot needed at 60 by target income (5% withdrawal)",
      columns: ["Annual income", "Pot needed"],
      rows: [
        { label: "£20,000", value: "£400,000" },
        { label: "£25,000", value: "£500,000" },
        { label: "£35,000", value: "£700,000" },
        { label: "£50,000", value: "£1,000,000" },
      ],
    },
    faqs: [
      { question: "Does the State Pension change this?", answer: "Yes. Once the State Pension starts (currently age 66–67) it adds over £11,000 a year, so your private pot only needs to cover the gap before and top up after." },
      { question: "Is 5% a safe withdrawal rate?", answer: "It's higher than the traditional 4% rule. Retiring at 60 means a longer retirement, so many planners prefer 4% for safety, implying a larger pot." },
      { question: "How much do I need to save to get there?", answer: "It depends on your age now and growth rate. Starting at 30, a few hundred pounds a month with employer contributions and growth can build a substantial pot by 60." },
    ],
    calculatorPath: "/finance/retirement?retireAge=60&income=25000",
    calculatorLabel: "Open in retirement calculator",
    related: ["500-a-month-20-years", "save-100k-by-40", "10000-invested-10-years"],
    officialSources: UK_PENSION_SOURCES,
    datePublished: TODAY, dateModified: MODIFIED,
  },
];
