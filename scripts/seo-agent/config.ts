/**
 * SEO Agent Configuration
 * Defines all pages, competitors, and SEO optimization rules
 */

export const COMPETITORS = [
  {
    domain: 'www.thecalculatorsite.com',
    name: 'Calculator Site',
    priority: 'high'
  },
  {
    domain: 'omnicalculator.com',
    name: 'OmniCalculator',
    priority: 'high'
  },
  {
    domain: 'calculator.net',
    name: 'Calculator.net',
    priority: 'high'
  }
];

export const SITE_URL = 'https://www.thecalculatorpage.com';

/**
 * All 70 pages organized by category
 * Used to scan competitors and generate optimized SEO for each page
 */
export const ALL_PAGES = {
  // Core pages (5)
  core: [
    { key: 'home', path: '/', title: 'The Calculator Page', category: 'core', priority: 'critical' },
    { key: 'learn-hub', path: '/learn', title: 'Learn Hub', category: 'core', priority: 'high' },
    { key: 'formulas', path: '/formulas', title: 'Formulas', category: 'core', priority: 'high' },
    { key: 'finance-category', path: '/categories/finance', title: 'Finance Calculators', category: 'core', priority: 'high' },
    { key: 'misc-category', path: '/categories/misc', title: 'Everyday Calculators', category: 'core', priority: 'high' }
  ],

  // Finance Calculators (20)
  finance: [
    { key: 'compound-interest', path: '/finance/compound-interest', title: 'Compound Interest Calculator', category: 'finance', priority: 'critical' },
    { key: 'mortgage', path: '/finance/mortgage', title: 'Mortgage Calculator', category: 'finance', priority: 'critical' },
    { key: 'loan', path: '/finance/loan', title: 'Loan Calculator', category: 'finance', priority: 'high' },
    { key: 'savings', path: '/finance/savings', title: 'Savings Calculator', category: 'finance', priority: 'high' },
    { key: 'roi', path: '/finance/roi', title: 'ROI Calculator', category: 'finance', priority: 'high' },
    { key: 'retirement', path: '/finance/retirement', title: 'Retirement Calculator', category: 'finance', priority: 'high' },
    { key: 'investment', path: '/finance/investment', title: 'Investment Calculator', category: 'finance', priority: 'high' },
    { key: 'simple-interest', path: '/finance/simple-interest', title: 'Simple Interest Calculator', category: 'finance', priority: 'medium' },
    { key: 'apr-apy', path: '/finance/apr-apy', title: 'APR to APY Calculator', category: 'finance', priority: 'medium' },
    { key: 'break-even', path: '/finance/break-even', title: 'Break Even Calculator', category: 'finance', priority: 'medium' },
    { key: 'future-value', path: '/finance/future-value', title: 'Future Value Calculator', category: 'finance', priority: 'medium' },
    { key: 'present-value', path: '/finance/present-value', title: 'Present Value Calculator', category: 'finance', priority: 'medium' },
    { key: 'annuity', path: '/finance/annuity', title: 'Annuity Calculator', category: 'finance', priority: 'medium' },
    { key: 'amortization', path: '/finance/amortization', title: 'Amortization Calculator', category: 'finance', priority: 'medium' },
    { key: 'debt-payoff', path: '/finance/debt-payoff', title: 'Debt Payoff Calculator', category: 'finance', priority: 'medium' },
    { key: 'net-worth', path: '/finance/net-worth', title: 'Net Worth Calculator', category: 'finance', priority: 'low' },
    { key: 'tip', path: '/finance/tip', title: 'Tip Calculator', category: 'finance', priority: 'low' },
    { key: 'gratuity', path: '/finance/gratuity', title: 'Gratuity Calculator', category: 'finance', priority: 'medium' },
    { key: 'cagr', path: '/finance/cagr', title: 'CAGR Calculator', category: 'finance', priority: 'medium' },
    { key: 'lumpsum', path: '/finance/lumpsum', title: 'Lump Sum Calculator', category: 'finance', priority: 'medium' }
  ],

  // Misc/Everyday Calculators (6)
  misc: [
    { key: 'percentage', path: '/misc/percentage', title: 'Percentage Calculator', category: 'misc', priority: 'high' },
    { key: 'days-between', path: '/misc/days-between', title: 'Days Between Calculator', category: 'misc', priority: 'high' },
    { key: 'bmi', path: '/misc/bmi', title: 'BMI Calculator', category: 'misc', priority: 'high' },
    { key: 'age', path: '/misc/age', title: 'Age Calculator', category: 'misc', priority: 'medium' },
    { key: 'average', path: '/misc/average', title: 'Average Calculator', category: 'misc', priority: 'medium' },
    { key: 'even-odd', path: '/misc/even-odd', title: 'Even Odd Calculator', category: 'misc', priority: 'low' }
  ],

  // Converters (4)
  converters: [
    { key: 'length-converter', path: '/converters/length', title: 'Length Converter', category: 'converters', priority: 'high' },
    { key: 'weight-converter', path: '/converters/weight', title: 'Weight Converter', category: 'converters', priority: 'high' },
    { key: 'temperature-converter', path: '/converters/temperature', title: 'Temperature Converter', category: 'converters', priority: 'high' },
    { key: 'volume-converter', path: '/converters/volume', title: 'Volume Converter', category: 'converters', priority: 'high' }
  ],

  // Learn/Articles (25)
  learn: [
    { key: 'learn-50-30-20', path: '/learn/50-30-20-budget', title: '50/30/20 Budget Rule', category: 'learn', priority: 'high' },
    { key: 'learn-compound-interest', path: '/learn/what-is-compound-interest', title: 'What is Compound Interest', category: 'learn', priority: 'high' },
    { key: 'learn-simple-interest', path: '/learn/simple-interest-formula', title: 'Simple Interest Formula', category: 'learn', priority: 'medium' },
    { key: 'learn-mortgage', path: '/learn/mortgage-guide', title: 'Mortgage Guide', category: 'learn', priority: 'medium' },
    { key: 'learn-roi', path: '/learn/roi-formula', title: 'ROI Formula', category: 'learn', priority: 'medium' },
    { key: 'learn-amortization', path: '/learn/amortization', title: 'Amortization Explained', category: 'learn', priority: 'medium' },
    { key: 'learn-savings', path: '/learn/savings-guide', title: 'Savings Guide', category: 'learn', priority: 'medium' },
    { key: 'learn-retirement', path: '/learn/retirement-planning', title: 'Retirement Planning', category: 'learn', priority: 'medium' },
    { key: 'learn-investment', path: '/learn/investment-guide', title: 'Investment Guide', category: 'learn', priority: 'medium' },
    { key: 'learn-debt', path: '/learn/debt-management', title: 'Debt Management', category: 'learn', priority: 'medium' },
    { key: 'learn-budgeting', path: '/learn/budgeting-tips', title: 'Budgeting Tips', category: 'learn', priority: 'medium' },
    { key: 'learn-credit', path: '/learn/credit-score-guide', title: 'Credit Score Guide', category: 'learn', priority: 'low' },
    { key: 'learn-insurance', path: '/learn/insurance-guide', title: 'Insurance Guide', category: 'learn', priority: 'low' },
    { key: 'learn-taxes', path: '/learn/tax-planning', title: 'Tax Planning Guide', category: 'learn', priority: 'low' },
    { key: 'learn-stocks', path: '/learn/stock-investing', title: 'Stock Investing Guide', category: 'learn', priority: 'low' },
    { key: 'learn-bonds', path: '/learn/bonds-guide', title: 'Bonds Investment Guide', category: 'learn', priority: 'low' },
    { key: 'learn-mutual-funds', path: '/learn/mutual-funds', title: 'Mutual Funds Guide', category: 'learn', priority: 'low' },
    { key: 'learn-crypto', path: '/learn/crypto-guide', title: 'Cryptocurrency Guide', category: 'learn', priority: 'low' },
    { key: 'learn-real-estate', path: '/learn/real-estate', title: 'Real Estate Guide', category: 'learn', priority: 'low' },
    { key: 'learn-etf', path: '/learn/etf-guide', title: 'ETF Investing Guide', category: 'learn', priority: 'low' },
    { key: 'learn-inflation', path: '/learn/inflation', title: 'Understanding Inflation', category: 'learn', priority: 'low' },
    { key: 'learn-forex', path: '/learn/forex-trading', title: 'Forex Trading Guide', category: 'learn', priority: 'low' },
    { key: 'learn-options', path: '/learn/options-trading', title: 'Options Trading Guide', category: 'learn', priority: 'low' },
    { key: 'learn-diversification', path: '/learn/portfolio-diversification', title: 'Portfolio Diversification', category: 'learn', priority: 'low' },
    { key: 'learn-financial-freedom', path: '/learn/financial-freedom', title: 'Path to Financial Freedom', category: 'learn', priority: 'low' }
  ],

  // Blog (5)
  blog: [
    { key: 'blog-index', path: '/blog', title: 'Calculator Blog', category: 'blog', priority: 'high' },
    { key: 'blog-mortgage-cheat', path: '/blog/mortgage-cheat-code', title: 'Mortgage Cheat Code', category: 'blog', priority: 'high' },
    { key: 'blog-early-payoff', path: '/blog/early-payoff-calculator', title: 'Early Payoff Calculator Blog', category: 'blog', priority: 'medium' },
    { key: 'blog-compound-growth', path: '/blog/compound-interest-growth', title: 'Compound Interest Growth', category: 'blog', priority: 'medium' },
    { key: 'blog-financial-tips', path: '/blog/financial-tips', title: 'Financial Tips', category: 'blog', priority: 'low' }
  ],

  // Legal Pages (5)
  legal: [
    { key: 'about', path: '/about', title: 'About The Calculator Page', category: 'legal', priority: 'medium' },
    { key: 'privacy', path: '/privacy', title: 'Privacy Policy', category: 'legal', priority: 'high' },
    { key: 'cookies', path: '/cookies', title: 'Cookie Policy', category: 'legal', priority: 'high' },
    { key: 'terms', path: '/terms', title: 'Terms of Service', category: 'legal', priority: 'high' },
    { key: 'disclaimer', path: '/disclaimer', title: 'Disclaimer', category: 'legal', priority: 'high' }
  ]
};

/**
 * Page categorization for batch processing
 * Group pages by category for efficient API calls
 */
export const PAGE_CATEGORIES = {
  critical: getAllPages().filter(p => p.priority === 'critical'),
  high: getAllPages().filter(p => p.priority === 'high'),
  medium: getAllPages().filter(p => p.priority === 'medium'),
  low: getAllPages().filter(p => p.priority === 'low')
};

export function getAllPages() {
  return Object.values(ALL_PAGES).flat();
}

export function getPageCount(): number {
  return getAllPages().length;
}

/**
 * SEO optimization rules and constraints
 */
export const SEO_CONSTRAINTS = {
  title: {
    minLength: 30,
    maxLength: 60,
    ideal: 50,
    includeBrand: true
  },
  description: {
    minLength: 80,
    maxLength: 160,
    ideal: 120,
    includeCTA: true
  },
  keywords: {
    minCount: 3,
    maxCount: 6,
    includeVariations: true,
    includeBrand: false
  }
};

/**
 * Categories of calculators for competitor analysis
 * Maps to common competitor page structures
 */
export const CALC_CATEGORIES_FOR_ANALYSIS = [
  'financial calculators',
  'compound interest calculator',
  'mortgage calculator',
  'savings calculator',
  'loan calculator',
  'retirement calculator',
  'investment calculator',
  'percentage calculator',
  'BMI calculator',
  'unit converters'
];
