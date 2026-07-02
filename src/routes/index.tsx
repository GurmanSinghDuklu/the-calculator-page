import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import App from '../App';
import { getAllAnswerPages } from '../data/most-searched';

// All page components are lazy-loaded so each route ships only its own code.
// vite-react-ssg still pre-renders every route to static HTML at build time;
// the lazy chunks are fetched on demand during client-side navigation.

// Main & Hubs
const Index = lazy(() => import('../pages/Index'));
const LearnHub = lazy(() => import('../pages/LearnHub'));
const MortgageHub = lazy(() => import('../pages/mortgages/MortgageHub'));
const SalaryForMortgage = lazy(() => import('../pages/mortgages/SalaryForMortgage'));
const MortgageForNewResidents = lazy(() => import('../pages/mortgages/MortgageForNewResidents'));
const Formulas = lazy(() => import('../pages/Formulas'));
const NotFound = lazy(() => import('../pages/NotFound'));
const CategoryProperty = lazy(() => import('../pages/categories/CategoryProperty'));
const CategoryFinance = lazy(() => import('../pages/categories/CategoryFinance'));
const CategoryEveryday = lazy(() => import('../pages/categories/CategoryEveryday'));

// Finance Calculators
const CompoundInterest = lazy(() => import('../pages/finance/CompoundInterest'));
const MortgageCalculator = lazy(() => import('../pages/finance/MortgageCalculator'));
const LoanCalculator = lazy(() => import('../pages/finance/LoanCalculator'));
const SavingsCalculator = lazy(() => import('../pages/finance/SavingsCalculator'));
const RetirementCalculator = lazy(() => import('../pages/finance/RetirementCalculator'));
const ApyCalculator = lazy(() => import('../pages/finance/ApyCalculator'));
const BudgetCalculator = lazy(() => import('../pages/finance/BudgetCalculator'));
const CarLoanCalculator = lazy(() => import('../pages/finance/CarLoanCalculator'));
const CashbackCalculator = lazy(() => import('../pages/finance/CashbackCalculator'));
const CreditCardPayoff = lazy(() => import('../pages/finance/CreditCardPayoff'));
const FutureHouseValue = lazy(() => import('../pages/finance/FutureHouseValue'));
const HowLongToSave = lazy(() => import('../pages/finance/HowLongToSave'));
const HowMuchToSave = lazy(() => import('../pages/finance/HowMuchToSave'));
const IrrCalculator = lazy(() => import('../pages/finance/IrrCalculator'));
const MortgageCostComparison = lazy(() => import('../pages/finance/MortgageCostComparison'));
const MortgageOverpayment = lazy(() => import('../pages/finance/MortgageOverpayment'));
const MultiCardPayoff = lazy(() => import('../pages/finance/MultiCardPayoff'));
const SalaryCalculator = lazy(() => import('../pages/finance/SalaryCalculator'));
const SimpleInterest = lazy(() => import('../pages/finance/SimpleInterest'));
const StampDutyCalculator = lazy(() => import('../pages/finance/StampDutyCalculator'));
const WeeklyMortgageCalculator = lazy(() => import('../pages/finance/WeeklyMortgageCalculator'));
const VatCalculator = lazy(() => import('../pages/finance/VatCalculator'));
const IsaCalculator = lazy(() => import('../pages/finance/IsaCalculator'));
const CapitalGainsTaxCalculator = lazy(() => import('../pages/finance/CapitalGainsTaxCalculator'));
const InheritanceTaxCalculator = lazy(() => import('../pages/finance/InheritanceTaxCalculator'));
const FourOOneKCalculator = lazy(() => import('../pages/finance/FourOOneKCalculator'));
const UsSalesTaxCalculator = lazy(() => import('../pages/finance/UsSalesTaxCalculator'));
const UsSalaryCalculator = lazy(() => import('../pages/finance/UsSalaryCalculator'));

// Everyday Calculators & Converters
const AgeCalculator = lazy(() => import('../pages/misc/AgeCalculator'));
const DiscountCalculator = lazy(() => import('../pages/misc/DiscountCalculator'));
const PercentageCalculator = lazy(() => import('../pages/misc/PercentageCalculator'));
const PercentageOfCalculator = lazy(() => import('../pages/misc/PercentageOfCalculator'));
const PercentageChangeCalculator = lazy(() => import('../pages/misc/PercentageChangeCalculator'));
const TipCalculator = lazy(() => import('../pages/misc/TipCalculator'));
const DaysFromTodayCalculator = lazy(() => import('../pages/misc/DaysFromTodayCalculator'));
const WorkingDaysCalculator = lazy(() => import('../pages/misc/WorkingDaysCalculator'));
const DaysFromTodayPage = lazy(() => import('../pages/misc/DaysFromTodayPage'));
const BmiCalculator = lazy(() => import('../pages/misc/BmiCalculator'));
const CalorieCalculator = lazy(() => import('../pages/misc/CalorieCalculator'));
const DaysBetweenDatesCalculator = lazy(() => import('../pages/misc/DaysBetweenDatesCalculator'));
const HoursCalculator = lazy(() => import('../pages/misc/HoursCalculator'));
const MonthsBetweenDatesCalculator = lazy(() => import('../pages/misc/MonthsBetweenDatesCalculator'));
const SquareFootageCalculator = lazy(() => import('../pages/misc/SquareFootageCalculator'));
const GravelCalculator = lazy(() => import('../pages/misc/GravelCalculator'));
const CubicYardsCalculator = lazy(() => import('../pages/misc/CubicYardsCalculator'));
const MulchCalculator = lazy(() => import('../pages/misc/MulchCalculator'));
const ConcreteCalculator = lazy(() => import('../pages/misc/ConcreteCalculator'));
const LengthConverter = lazy(() => import('../pages/converters/LengthConverter'));
const WeightConverter = lazy(() => import('../pages/converters/WeightConverter'));
const TemperatureConverter = lazy(() => import('../pages/converters/TemperatureConverter'));
const UniversalConverter = lazy(() => import('../pages/converters/UniversalConverter'));
const StoneConverter = lazy(() => import('../pages/converters/StoneConverter'));
const CupsToGrams = lazy(() => import('../pages/converters/CupsToGrams'));
const CmToInches = lazy(() => import('../pages/converters/CmToInches'));
const KmToMiles = lazy(() => import('../pages/converters/KmToMiles'));
const GallonsToLitres = lazy(() => import('../pages/converters/GallonsToLitres'));
const MlToOz = lazy(() => import('../pages/converters/MlToOz'));
const GramsToTablespoons = lazy(() => import('../pages/converters/GramsToTablespoons'));
const LbsToKg = lazy(() => import('../pages/converters/LbsToKg'));
const MetresToFeet = lazy(() => import('../pages/converters/MetresToFeet'));
const InchesToCm = lazy(() => import('../pages/converters/InchesToCm'));
const FahrenheitToCelsius = lazy(() => import('../pages/converters/FahrenheitToCelsius'));
const OuncesToGrams = lazy(() => import('../pages/converters/OuncesToGrams'));
const TeaspoonsToMl = lazy(() => import('../pages/converters/TeaspoonsToMl'));

// Learn Articles (Existing)
const CompoundInterestFormula = lazy(() => import('../pages/learn/CompoundInterestFormula'));
const FinancialJourney = lazy(() => import('../pages/learn/FinancialJourney'));
const WhereMoneyGoes = lazy(() => import('../pages/learn/WhereMoneyGoes'));
const FiftyThirtyTwentyBudget = lazy(() => import('../pages/learn/FiftyThirtyTwentyBudget'));
const AutomateFinances = lazy(() => import('../pages/learn/AutomateFinances'));
const EmergencyFund = lazy(() => import('../pages/learn/EmergencyFund'));
const CalculatorFormulasGuide = lazy(() => import('../pages/learn/CalculatorFormulasGuide'));

// New Learn Hub
const BeforeYouInvest = lazy(() => import('../pages/learn/BeforeYouInvest'));
const BudgetIrregularCosts = lazy(() => import('../pages/learn/BudgetIrregularCosts'));
const BuildPortfolio = lazy(() => import('../pages/learn/BuildPortfolio'));
const ChooseSavingsAccount = lazy(() => import('../pages/learn/ChooseSavingsAccount'));
const CreditScores = lazy(() => import('../pages/learn/CreditScores'));
const DebtLandscape = lazy(() => import('../pages/learn/DebtLandscape'));
const EthicalInvesting = lazy(() => import('../pages/learn/EthicalInvesting'));
const FinancialFreedom = lazy(() => import('../pages/learn/FinancialFreedom'));
const First1000 = lazy(() => import('../pages/learn/First1000'));
const InflationGuide = lazy(() => import('../pages/learn/InflationGuide'));
const InterestImpact = lazy(() => import('../pages/learn/InterestImpact'));
const InvestingBasics = lazy(() => import('../pages/learn/InvestingBasics'));
const InvestingVsTrading = lazy(() => import('../pages/learn/InvestingVsTrading'));
const MonthlyDashboard = lazy(() => import('../pages/learn/MonthlyDashboard'));
const PortfolioRebalancing = lazy(() => import('../pages/learn/PortfolioRebalancing'));
const ProtectWealth = lazy(() => import('../pages/learn/ProtectWealth'));
const SnowballAvalanche = lazy(() => import('../pages/learn/SnowballAvalanche'));
const TaxEfficientAccounts = lazy(() => import('../pages/learn/TaxEfficientAccounts'));
const TeachMoneySkills = lazy(() => import('../pages/learn/TeachMoneySkills'));
const UkFinanceStats = lazy(() => import('../pages/learn/UkFinanceStats'));

// Legal Pages
const About = lazy(() => import('../pages/legal/About'));
const Cookies = lazy(() => import('../pages/legal/Cookies'));
const Disclaimer = lazy(() => import('../pages/legal/Disclaimer'));
const Privacy = lazy(() => import('../pages/legal/Privacy'));
const Terms = lazy(() => import('../pages/legal/Terms'));

// Blog & Cheat Codes
const BlogIndex = lazy(() => import('../pages/blog/BlogIndex'));
const HowMuchCanIBorrow = lazy(() => import('../pages/blog/HowMuchCanIBorrow'));
const FixedVsTracker = lazy(() => import('../pages/blog/FixedVsTracker'));
const WhatIsLTV = lazy(() => import('../pages/blog/WhatIsLTV'));
const PayOffMortgageEarly = lazy(() => import('../pages/blog/PayOffMortgageEarly'));
const StampDuty2025 = lazy(() => import('../pages/blog/StampDuty2025'));
const FirstTimeBuyerGuide = lazy(() => import('../pages/blog/FirstTimeBuyerGuide'));
const UkTaxBrackets2025 = lazy(() => import('../pages/blog/UkTaxBrackets2025'));
const PersonalAllowanceUK = lazy(() => import('../pages/blog/PersonalAllowanceUK'));
const NationalInsurance2025 = lazy(() => import('../pages/blog/NationalInsurance2025'));
const MortgageAndInterestRates = lazy(() => import('../pages/blog/MortgageAndInterestRates'));
const HowLongToPayOffMortgage = lazy(() => import('../pages/blog/HowLongToPayOffMortgage'));
const WhatIsAGoodSalaryUK = lazy(() => import('../pages/blog/WhatIsAGoodSalaryUK'));
const HowMuchShouldISavePerMonth = lazy(() => import('../pages/blog/HowMuchShouldISavePerMonth'));
const WhatIsAnISA = lazy(() => import('../pages/blog/WhatIsAnISA'));
const HowMuchDoINeedToRetire = lazy(() => import('../pages/blog/HowMuchDoINeedToRetire'));
const WhatIsCompoundInterest = lazy(() => import('../pages/blog/WhatIsCompoundInterest'));
const WhatIsCapitalGainsTax = lazy(() => import('../pages/blog/WhatIsCapitalGainsTax'));
const WhatIsInheritanceTax = lazy(() => import('../pages/blog/WhatIsInheritanceTax'));
const HowToCalculatePercentage = lazy(() => import('../pages/blog/HowToCalculatePercentage'));
const WhatIsBMI = lazy(() => import('../pages/blog/WhatIsBMI'));
const HowDoISaveForAHouse = lazy(() => import('../pages/blog/HowDoISaveForAHouse'));
const WhatIsVAT = lazy(() => import('../pages/blog/WhatIsVAT'));
const HowMuchIsStampDuty = lazy(() => import('../pages/blog/HowMuchIsStampDuty'));
const WhatIsAStocksAndSharesISA = lazy(() => import('../pages/blog/WhatIsAStocksAndSharesISA'));
const MortgageCheatCode = lazy(() => import('../pages/blog/MortgageCheatCode'));
const CheatCode01 = lazy(() => import('../pages/blog/CheatCode01'));
const CheatCode01Payment = lazy(() => import('../pages/blog/CheatCode01Payment'));
const CheatCode01Unlocked = lazy(() => import('../pages/blog/CheatCode01Unlocked'));
const WeeklyVsMonthly = lazy(() => import('../pages/blog/WeeklyVsMonthly'));
const AppLanding = lazy(() => import('../pages/AppLanding'));
const MortgageCalculatorApp = lazy(() => import('../pages/app/MortgageCalculatorApp'));
const CompoundInterestApp = lazy(() => import('../pages/app/CompoundInterestApp'));
const SalaryCalculatorApp = lazy(() => import('../pages/app/SalaryCalculatorApp'));
const SavingsCalculatorApp = lazy(() => import('../pages/app/SavingsCalculatorApp'));
const PercentageCalculatorApp = lazy(() => import('../pages/app/PercentageCalculatorApp'));

// Most Searched — Financial Edition
const MostSearchedHub = lazy(() => import('../pages/most-searched/MostSearchedHub'));
const AnswerPageRoute = lazy(() => import('../pages/most-searched/AnswerPageRoute'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Index /> },
      { path: 'learn', element: <LearnHub /> },
      { path: 'mortgages', element: <MortgageHub /> },
      { path: 'mortgages/salary-for-mortgage', element: <SalaryForMortgage /> },
      { path: 'mortgages/mortgage-for-new-residents', element: <MortgageForNewResidents /> },
      { path: 'formulas', element: <Formulas /> },

      // Most Searched — Financial Edition
      { path: 'most-searched', element: <MostSearchedHub /> },
      {
        path: 'most-searched/:market/:slug',
        element: <AnswerPageRoute />,
        entry: 'src/pages/most-searched/AnswerPageRoute.tsx',
        getStaticPaths: () =>
          getAllAnswerPages().map((p) => `/most-searched/${p.market}/${p.slug}`),
      } as RouteObject,

      // Finance Routes
      { path: 'finance/compound-interest', element: <CompoundInterest /> },
      { path: 'finance/mortgage', element: <MortgageCalculator /> },
      { path: 'finance/loan', element: <LoanCalculator /> },
      { path: 'finance/savings', element: <SavingsCalculator /> },
      { path: 'finance/retirement', element: <RetirementCalculator /> },
      { path: 'finance/apy', element: <ApyCalculator /> },
      { path: 'finance/budget', element: <BudgetCalculator /> },
      { path: 'finance/car-loan', element: <CarLoanCalculator /> },
      { path: 'finance/cashback', element: <CashbackCalculator /> },
      { path: 'finance/credit-card-payoff', element: <CreditCardPayoff /> },
      { path: 'finance/future-house-value', element: <FutureHouseValue /> },
      { path: 'finance/how-long-to-save', element: <HowLongToSave /> },
      { path: 'finance/how-much-to-save', element: <HowMuchToSave /> },
      { path: 'finance/irr', element: <IrrCalculator /> },
      { path: 'finance/mortgage-overpayment', element: <MortgageOverpayment /> },
      { path: 'finance/multi-card-payoff', element: <MultiCardPayoff /> },
      { path: 'finance/salary', element: <SalaryCalculator /> },
      { path: 'finance/simple-interest', element: <SimpleInterest /> },
      { path: 'finance/stamp-duty', element: <StampDutyCalculator /> },
      { path: 'finance/weekly-mortgage', element: <WeeklyMortgageCalculator /> },
      { path: 'finance/mortgage-cost-comparison', element: <MortgageCostComparison /> },
      { path: 'finance/vat-calculator', element: <VatCalculator /> },
      { path: 'finance/isa-calculator', element: <IsaCalculator /> },
      { path: 'finance/capital-gains-tax', element: <CapitalGainsTaxCalculator /> },
      { path: 'finance/inheritance-tax', element: <InheritanceTaxCalculator /> },
      { path: 'finance/401k-calculator', element: <FourOOneKCalculator /> },
      { path: 'finance/us-sales-tax-calculator', element: <UsSalesTaxCalculator /> },
      { path: 'finance/us-salary-calculator', element: <UsSalaryCalculator /> },

      // Everyday & Converter Routes
      { path: 'categories/property', element: <CategoryProperty /> },
      { path: 'categories/finance', element: <CategoryFinance /> },
      { path: 'categories/everyday', element: <CategoryEveryday /> },
      { path: 'misc/age', element: <AgeCalculator /> },
      { path: 'misc/discount', element: <DiscountCalculator /> },
      { path: 'misc/percentage', element: <PercentageCalculator /> },
      { path: 'misc/percentage-of', element: <PercentageOfCalculator /> },
      { path: 'misc/percentage-change', element: <PercentageChangeCalculator /> },
      { path: 'misc/tip', element: <TipCalculator /> },
      { path: 'misc/days-from-today', element: <DaysFromTodayCalculator /> },
      { path: 'misc/working-days', element: <WorkingDaysCalculator /> },
      { path: 'misc/bmi-calculator', element: <BmiCalculator /> },
      { path: 'misc/calorie-calculator', element: <CalorieCalculator /> },
      { path: 'misc/days-between-dates', element: <DaysBetweenDatesCalculator /> },
      { path: 'misc/hours-calculator', element: <HoursCalculator /> },
      { path: 'misc/months-between-dates', element: <MonthsBetweenDatesCalculator /> },
      { path: 'misc/square-footage', element: <SquareFootageCalculator /> },
      { path: 'misc/gravel-calculator', element: <GravelCalculator /> },
      { path: 'misc/cubic-yards', element: <CubicYardsCalculator /> },
      { path: 'misc/mulch-calculator', element: <MulchCalculator /> },
      { path: 'misc/concrete-calculator', element: <ConcreteCalculator /> },

      // Programmatic "X days from today" pages — targets high-volume keywords
      ...[7,10,14,15,20,21,25,28,30,35,40,45,50,55,60,70,75,80,90,100,120,130,150,160,180,200,210,240,250,270,300,330,365].map(n => ({
        path: `misc/days-from-today/${n}`,
        element: <DaysFromTodayPage dayCount={n} />,
      })),
      { path: 'converters/length', element: <LengthConverter /> },
      { path: 'converters/weight', element: <WeightConverter /> },
      { path: 'converters/temperature', element: <TemperatureConverter /> },
      { path: 'converters/universal', element: <UniversalConverter /> },
      { path: 'converters/stone-to-kg', element: <StoneConverter /> },
      { path: 'converters/cups-to-grams', element: <CupsToGrams /> },
      { path: 'converters/cm-to-inches', element: <CmToInches /> },
      { path: 'converters/km-to-miles', element: <KmToMiles /> },
      { path: 'converters/gallons-to-litres', element: <GallonsToLitres /> },
      { path: 'converters/ml-to-oz', element: <MlToOz /> },
      { path: 'converters/grams-to-tablespoons', element: <GramsToTablespoons /> },
      { path: 'converters/lbs-to-kg', element: <LbsToKg /> },
      { path: 'converters/metres-to-feet', element: <MetresToFeet /> },
      { path: 'converters/inches-to-cm', element: <InchesToCm /> },
      { path: 'converters/fahrenheit-to-celsius', element: <FahrenheitToCelsius /> },
      { path: 'converters/ounces-to-grams', element: <OuncesToGrams /> },
      { path: 'converters/teaspoons-to-ml', element: <TeaspoonsToMl /> },

      // Learning Hub Routes
      { path: 'learn/compound-interest-formula', element: <CompoundInterestFormula /> },
      { path: 'learn/financial-journey', element: <FinancialJourney /> },
      { path: 'learn/where-money-goes', element: <WhereMoneyGoes /> },
      { path: 'learn/50-30-20-budget', element: <FiftyThirtyTwentyBudget /> },
      { path: 'learn/automate-finances', element: <AutomateFinances /> },
      { path: 'learn/emergency-fund', element: <EmergencyFund /> },
      { path: 'learn/calculator-formulas-guide', element: <CalculatorFormulasGuide /> },
      { path: 'learn/before-you-invest', element: <BeforeYouInvest /> },
      { path: 'learn/budget-irregular-costs', element: <BudgetIrregularCosts /> },
      { path: 'learn/build-portfolio', element: <BuildPortfolio /> },
      { path: 'learn/choose-savings-account', element: <ChooseSavingsAccount /> },
      { path: 'learn/credit-scores', element: <CreditScores /> },
      { path: 'learn/debt-landscape', element: <DebtLandscape /> },
      { path: 'learn/ethical-investing', element: <EthicalInvesting /> },
      { path: 'learn/financial-freedom', element: <FinancialFreedom /> },
      { path: 'learn/first-1000', element: <First1000 /> },
      { path: 'learn/inflation-guide', element: <InflationGuide /> },
      { path: 'learn/interest-impact', element: <InterestImpact /> },
      { path: 'learn/investing-basics', element: <InvestingBasics /> },
      { path: 'learn/investing-vs-trading', element: <InvestingVsTrading /> },
      { path: 'learn/monthly-dashboard', element: <MonthlyDashboard /> },
      { path: 'learn/portfolio-rebalancing', element: <PortfolioRebalancing /> },
      { path: 'learn/protect-wealth', element: <ProtectWealth /> },
      { path: 'learn/snowball-avalanche', element: <SnowballAvalanche /> },
      { path: 'learn/tax-efficient-accounts', element: <TaxEfficientAccounts /> },
      { path: 'learn/teach-money-skills', element: <TeachMoneySkills /> },
      { path: 'learn/uk-finance-statistics', element: <UkFinanceStats /> },

      // Legal Routes
      { path: 'about', element: <About /> },
      { path: 'cookies', element: <Cookies /> },
      { path: 'disclaimer', element: <Disclaimer /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'terms', element: <Terms /> },

      // Blog & Premium Content
      { path: 'blog', element: <BlogIndex /> },
      { path: 'blog/mortgage-cheat-code', element: <MortgageCheatCode /> },
      { path: 'blog/cheat-code-01', element: <CheatCode01 /> },
      { path: 'blog/cheat-code-01-payment', element: <CheatCode01Payment /> },
      { path: 'blog/cheat-code-01-unlocked', element: <CheatCode01Unlocked /> },
      { path: 'blog/weekly-vs-monthly-investing', element: <WeeklyVsMonthly /> },
      { path: 'blog/how-much-can-i-borrow-mortgage-uk', element: <HowMuchCanIBorrow /> },
      { path: 'blog/fixed-vs-tracker-mortgage', element: <FixedVsTracker /> },
      { path: 'blog/what-is-ltv-mortgage', element: <WhatIsLTV /> },
      { path: 'blog/pay-off-mortgage-early', element: <PayOffMortgageEarly /> },
      { path: 'blog/stamp-duty-uk-2025', element: <StampDuty2025 /> },
      { path: 'blog/first-time-buyer-uk-2025', element: <FirstTimeBuyerGuide /> },
      { path: 'blog/uk-tax-brackets-2025', element: <UkTaxBrackets2025 /> },
      { path: 'blog/personal-allowance-uk', element: <PersonalAllowanceUK /> },
      { path: 'blog/national-insurance-2025', element: <NationalInsurance2025 /> },
      { path: 'blog/mortgage-interest-rates', element: <MortgageAndInterestRates /> },
      { path: 'blog/how-long-to-pay-off-mortgage', element: <HowLongToPayOffMortgage /> },
      { path: 'blog/what-is-a-good-salary-uk', element: <WhatIsAGoodSalaryUK /> },
      { path: 'blog/how-much-should-i-save-per-month', element: <HowMuchShouldISavePerMonth /> },
      { path: 'blog/what-is-an-isa', element: <WhatIsAnISA /> },
      { path: 'blog/how-much-do-i-need-to-retire', element: <HowMuchDoINeedToRetire /> },
      { path: 'blog/what-is-compound-interest', element: <WhatIsCompoundInterest /> },
      { path: 'blog/what-is-capital-gains-tax-uk', element: <WhatIsCapitalGainsTax /> },
      { path: 'blog/what-is-inheritance-tax-uk', element: <WhatIsInheritanceTax /> },
      { path: 'blog/how-to-calculate-percentage', element: <HowToCalculatePercentage /> },
      { path: 'blog/what-is-bmi', element: <WhatIsBMI /> },
      { path: 'blog/how-to-save-for-a-house-deposit', element: <HowDoISaveForAHouse /> },
      { path: 'blog/what-is-vat-uk', element: <WhatIsVAT /> },
      { path: 'blog/how-much-is-stamp-duty-2025', element: <HowMuchIsStampDuty /> },
      { path: 'blog/what-is-a-stocks-and-shares-isa', element: <WhatIsAStocksAndSharesISA /> },
      { path: 'app', element: <AppLanding /> },
      { path: 'app/mortgage-calculator-app', element: <MortgageCalculatorApp /> },
      { path: 'app/compound-interest-app', element: <CompoundInterestApp /> },
      { path: 'app/salary-calculator-app', element: <SalaryCalculatorApp /> },
      { path: 'app/savings-calculator-app', element: <SavingsCalculatorApp /> },
      { path: 'app/percentage-calculator-app', element: <PercentageCalculatorApp /> },

      { path: '*', element: <NotFound /> },
    ],
  },
];
