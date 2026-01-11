# The Calculator Page - Complete Pages Documentation

This document contains all pages, routes, and component file locations for the website.

---

## Table of Contents
1. [Main Pages](#main-pages)
2. [Finance Calculators](#finance-calculators)
3. [Miscellaneous Calculators](#miscellaneous-calculators)
4. [Converters](#converters)
5. [Learn Hub Articles](#learn-hub-articles)
6. [Blog Pages](#blog-pages)
7. [Reference Pages](#reference-pages)

---

## Main Pages

| Route | Component File | Description |
|-------|---------------|-------------|
| `/` | `src/pages/Welcome.tsx` | Welcome/landing page with animated background and enter button |
| `/home` | `src/pages/Index.tsx` | Main homepage with calculator categories and featured tools |
| `/*` (404) | `src/pages/NotFound.tsx` | 404 error page for non-existent routes |

---

## Finance Calculators

| Route | Component File | Description |
|-------|---------------|-------------|
| `/finance/compound-interest` | `src/pages/finance/CompoundInterest.tsx` | Calculate compound interest growth over time |
| `/finance/loan` | `src/pages/finance/LoanCalculator.tsx` | General loan payment calculator |
| `/finance/simple-interest` | `src/pages/finance/SimpleInterest.tsx` | Simple interest calculation |
| `/finance/savings` | `src/pages/finance/SavingsCalculator.tsx` | Savings goal and growth calculator |
| `/finance/mortgage` | `src/pages/finance/MortgageCalculator.tsx` | Mortgage payment calculator |
| `/finance/apy` | `src/pages/finance/ApyCalculator.tsx` | Annual Percentage Yield calculator |
| `/finance/car-loan` | `src/pages/finance/CarLoanCalculator.tsx` | Car loan payment calculator with balloon option |
| `/finance/cashback` | `src/pages/finance/CashbackCalculator.tsx` | Credit card cashback rewards calculator |
| `/finance/budget` | `src/pages/finance/BudgetCalculator.tsx` | Budget planning and allocation tool |
| `/finance/credit-card-payoff` | `src/pages/finance/CreditCardPayoff.tsx` | Single credit card payoff calculator |
| `/finance/multi-card-payoff` | `src/pages/finance/MultiCardPayoff.tsx` | Multiple credit card payoff strategy |
| `/finance/future-house-value` | `src/pages/finance/FutureHouseValue.tsx` | Property appreciation calculator |
| `/finance/how-long-to-save` | `src/pages/finance/HowLongToSave.tsx` | Time to reach savings goal |
| `/finance/how-much-to-save` | `src/pages/finance/HowMuchToSave.tsx` | Monthly savings needed calculator |
| `/finance/irr` | `src/pages/finance/IrrCalculator.tsx` | Internal Rate of Return calculator |
| `/finance/mortgage-overpayment` | `src/pages/finance/MortgageOverpayment.tsx` | Mortgage overpayment impact calculator |
| `/finance/weekly-mortgage` | `src/pages/finance/WeeklyMortgageCalculator.tsx` | Weekly vs monthly mortgage comparison |
| `/finance/retirement` | `src/pages/finance/RetirementCalculator.tsx` | Retirement savings planner |
| `/finance/salary` | `src/pages/finance/SalaryCalculator.tsx` | Salary breakdown and tax calculator |
| `/finance/stamp-duty` | `src/pages/finance/StampDutyCalculator.tsx` | UK stamp duty land tax calculator |

---

## Miscellaneous Calculators

| Route | Component File | Description |
|-------|---------------|-------------|
| `/misc/percentage` | `src/pages/misc/PercentageCalculator.tsx` | Various percentage calculations |
| `/misc/age` | `src/pages/misc/AgeCalculator.tsx` | Age calculation from birthdate |
| `/misc/date` | `src/pages/misc/DateCalculator.tsx` | Date difference and addition |
| `/misc/discount` | `src/pages/misc/DiscountCalculator.tsx` | Discount and sale price calculator |
| `/misc/tip` | `src/pages/misc/TipCalculator.tsx` | Restaurant tip calculator |

---

## Converters

| Route | Component File | Description |
|-------|---------------|-------------|
| `/converters/universal` | `src/pages/converters/UniversalConverter.tsx` | Multi-category unit converter |
| `/converters/length` | `src/pages/converters/LengthConverter.tsx` | Length/distance unit converter |
| `/converters/temperature` | `src/pages/converters/TemperatureConverter.tsx` | Temperature unit converter |
| `/converters/weight` | `src/pages/converters/WeightConverter.tsx` | Weight/mass unit converter |

---

## Learn Hub Articles

| Route | Component File | Description |
|-------|---------------|-------------|
| `/learn` | `src/pages/LearnHub.tsx` | Learning hub index with all articles |
| `/learn/financial-journey` | `src/pages/learn/FinancialJourney.tsx` | Personal finance journey guide |
| `/learn/where-money-goes` | `src/pages/learn/WhereMoneyGoes.tsx` | Understanding spending patterns |
| `/learn/50-30-20-budget` | `src/pages/learn/FiftyThirtyTwentyBudget.tsx` | 50/30/20 budgeting rule guide |
| `/learn/automate-finances` | `src/pages/learn/AutomateFinances.tsx` | Financial automation strategies |
| `/learn/emergency-fund` | `src/pages/learn/EmergencyFund.tsx` | Emergency fund building guide |
| `/learn/calculator-formulas-guide` | `src/pages/learn/CalculatorFormulasGuide.tsx` | Mathematical formulas reference |

---

## Blog Pages

| Route | Component File | Description |
|-------|---------------|-------------|
| `/blog` | `src/pages/blog/BlogIndex.tsx` | Blog index with all posts |
| `/blog/cheat-code-01` | `src/pages/blog/CheatCode01.tsx` | Cheat code article part 1 |
| `/blog/cheat-code-01/payment` | `src/pages/blog/CheatCode01Payment.tsx` | Premium content payment page |
| `/blog/cheat-code-01/unlocked` | `src/pages/blog/CheatCode01Unlocked.tsx` | Unlocked premium content |
| `/blog/mortgage-cheat-code` | `src/pages/blog/MortgageCheatCode.tsx` | Mortgage optimization guide |

---

## Reference Pages

| Route | Component File | Description |
|-------|---------------|-------------|
| `/formulas` | `src/pages/Formulas.tsx` | Mathematical formulas reference |

---

## Shared Components

| Component | File Path | Purpose |
|-----------|-----------|---------|
| SEO | `src/components/SEO.tsx` | Meta tags, Open Graph, JSON-LD schema |
| CalculatorLayout | `src/components/CalculatorLayout.tsx` | Consistent calculator page layout |
| CalculatorStaticContent | `src/components/CalculatorStaticContent.tsx` | SEO-rich static content sections |
| ArticleLayout | `src/components/ArticleLayout.tsx` | Blog/article page layout |
| BlogLayout | `src/components/BlogLayout.tsx` | Blog-specific layout |
| NavigationMenu | `src/components/NavigationMenu.tsx` | Main site navigation |
| Breadcrumbs | `src/components/Breadcrumbs.tsx` | Page breadcrumb navigation |
| CurrencySelector | `src/components/CurrencySelector.tsx` | Currency selection dropdown |
| FinancialDisclaimer | `src/components/FinancialDisclaimer.tsx` | Financial advice disclaimer |
| SocialShare | `src/components/SocialShare.tsx` | Social media sharing buttons |
| RelatedArticles | `src/components/RelatedArticles.tsx` | Related content suggestions |
| ProgressTracker | `src/components/ProgressTracker.tsx` | User progress tracking |
| CompletionButton | `src/components/CompletionButton.tsx` | Mark item as complete |

---

## Static Files

| File | Path | Purpose |
|------|------|---------|
| Sitemap | `public/sitemap.xml` | XML sitemap for search engines |
| Robots.txt | `public/robots.txt` | Crawler instructions |
| RSS Feed | `public/rss.xml` | RSS feed for content |
| Bing Auth | `public/BingSiteAuth.xml` | Bing webmaster verification |

---

## Build Configuration

| File | Purpose |
|------|---------|
| `prerender.js` | Static HTML generation for all 55 routes |
| `src/entry-server.tsx` | Server-side rendering entry point |
| `vite.config.ts` | Vite build configuration |
| `tailwind.config.ts` | Tailwind CSS theme configuration |
| `src/index.css` | Global styles and CSS variables |

---

## Total Page Count

- **Main Pages**: 3
- **Finance Calculators**: 20
- **Misc Calculators**: 5
- **Converters**: 4
- **Learn Articles**: 7
- **Blog Pages**: 5
- **Reference Pages**: 1

**Total: 45 unique pages**

---

*Generated for The Calculator Page - Free Online Calculators & Unit Converters*
