export type Market = 'uk' | 'us';
export type Category = 'Mortgage' | 'Salary' | 'Savings' | 'Debt' | 'Pension';

export interface ComparisonRow {
  label: string;
  value: string;
}

export interface AnswerFAQ {
  question: string;
  answer: string;
}

export interface ChartPoint {
  name: string;
  value: number;
}

export interface OfficialSource {
  label: string;
  url: string;
}

export interface AnswerPageData {
  /** URL slug, unique within a market, e.g. "200k-mortgage-monthly-payment" */
  slug: string;
  market: Market;
  category: Category;
  /** Currency symbol for display, "£" or "$" */
  currency: string;
  /** H1 / SEO title, phrased exactly as searched */
  question: string;
  /** ≤160 char meta description, ideally containing the answer */
  metaDescription: string;
  keywords: string;
  /** The headline answer, ≤40 words, lifted by AI engines. Plain text. */
  answer: string;
  /** The single key number, used on cards/homepage, e.g. "£1,169/mo" */
  answerNumber: string;
  /** Assumptions shown under "How this is calculated" */
  assumptions: string[];
  /** Formula string shown on-page, e.g. "M = P·r(1+r)ⁿ / ((1+r)ⁿ−1)" */
  formula: string;
  comparison: { title: string; columns: [string, string]; rows: ComparisonRow[] };
  chart?: { title: string; points: ChartPoint[] };
  faqs: AnswerFAQ[];
  /** Calculator link with pre-fill params, e.g. "/finance/mortgage?amount=200000&rate=5&term=25" */
  calculatorPath: string;
  calculatorLabel: string;
  /** slugs (same market) for related links */
  related: string[];
  /** Official government / regulatory sources that back the figures */
  officialSources: OfficialSource[];
  datePublished: string; // ISO
  dateModified?: string;
}
