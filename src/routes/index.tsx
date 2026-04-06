import { RouteObject, Navigate } from 'react-router-dom';
import App from '../App';

// Main & Hubs
import Index from '../pages/Index';
import LearnHub from '../pages/LearnHub';
import Formulas from '../pages/Formulas';
import NotFound from '../pages/NotFound';
import CategoryProperty from '../pages/categories/CategoryProperty';
import CategoryFinance from '../pages/categories/CategoryFinance';
import CategoryEveryday from '../pages/categories/CategoryEveryday';

// Finance Calculators
import CompoundInterest from '../pages/finance/CompoundInterest';
import MortgageCalculator from '../pages/finance/MortgageCalculator';
import LoanCalculator from '../pages/finance/LoanCalculator';
import SavingsCalculator from '../pages/finance/SavingsCalculator';
import RetirementCalculator from '../pages/finance/RetirementCalculator';
import ApyCalculator from '../pages/finance/ApyCalculator';
import BudgetCalculator from '../pages/finance/BudgetCalculator';
import CarLoanCalculator from '../pages/finance/CarLoanCalculator';
import CashbackCalculator from '../pages/finance/CashbackCalculator';
import CreditCardPayoff from '../pages/finance/CreditCardPayoff';
import FutureHouseValue from '../pages/finance/FutureHouseValue';
import HowLongToSave from '../pages/finance/HowLongToSave';
import HowMuchToSave from '../pages/finance/HowMuchToSave';
import IrrCalculator from '../pages/finance/IrrCalculator';
import MortgageCostComparison from '../pages/finance/MortgageCostComparison';
import MortgageOverpayment from '../pages/finance/MortgageOverpayment';
import MultiCardPayoff from '../pages/finance/MultiCardPayoff';
import SalaryCalculator from '../pages/finance/SalaryCalculator';
import SimpleInterest from '../pages/finance/SimpleInterest';
import StampDutyCalculator from '../pages/finance/StampDutyCalculator';
import WeeklyMortgageCalculator from '../pages/finance/WeeklyMortgageCalculator';
import VatCalculator from '../pages/finance/VatCalculator';
import IsaCalculator from '../pages/finance/IsaCalculator';
import CapitalGainsTaxCalculator from '../pages/finance/CapitalGainsTaxCalculator';
import InheritanceTaxCalculator from '../pages/finance/InheritanceTaxCalculator';

// Everyday Calculators & Converters
import AgeCalculator from '../pages/misc/AgeCalculator';
import DiscountCalculator from '../pages/misc/DiscountCalculator';
import PercentageCalculator from '../pages/misc/PercentageCalculator';
import PercentageOfCalculator from '../pages/misc/PercentageOfCalculator';
import PercentageChangeCalculator from '../pages/misc/PercentageChangeCalculator';
import TipCalculator from '../pages/misc/TipCalculator';
import DaysFromTodayCalculator from '../pages/misc/DaysFromTodayCalculator';
import WorkingDaysCalculator from '../pages/misc/WorkingDaysCalculator';
import DaysFromTodayPage from '../pages/misc/DaysFromTodayPage';
import BmiCalculator from '../pages/misc/BmiCalculator';
import CalorieCalculator from '../pages/misc/CalorieCalculator';
import DaysBetweenDatesCalculator from '../pages/misc/DaysBetweenDatesCalculator';
import HoursCalculator from '../pages/misc/HoursCalculator';
import LengthConverter from '../pages/converters/LengthConverter';
import WeightConverter from '../pages/converters/WeightConverter';
import TemperatureConverter from '../pages/converters/TemperatureConverter';
import UniversalConverter from '../pages/converters/UniversalConverter';
import StoneConverter from '../pages/converters/StoneConverter';
import CupsToGrams from '../pages/converters/CupsToGrams';
import CmToInches from '../pages/converters/CmToInches';
import KmToMiles from '../pages/converters/KmToMiles';
import GallonsToLitres from '../pages/converters/GallonsToLitres';
import MlToOz from '../pages/converters/MlToOz';
import GramsToTablespoons from '../pages/converters/GramsToTablespoons';

// Learn Articles (Existing)
import FinancialJourney from '../pages/learn/FinancialJourney';
import WhereMoneyGoes from '../pages/learn/WhereMoneyGoes';
import FiftyThirtyTwentyBudget from '../pages/learn/FiftyThirtyTwentyBudget';
import AutomateFinances from '../pages/learn/AutomateFinances';
import EmergencyFund from '../pages/learn/EmergencyFund';
import CalculatorFormulasGuide from '../pages/learn/CalculatorFormulasGuide';

// New Learn Hub
import BeforeYouInvest from '../pages/learn/BeforeYouInvest';
import BudgetIrregularCosts from '../pages/learn/BudgetIrregularCosts';
import BuildPortfolio from '../pages/learn/BuildPortfolio';
import ChooseSavingsAccount from '../pages/learn/ChooseSavingsAccount';
import CreditScores from '../pages/learn/CreditScores';
import DebtLandscape from '../pages/learn/DebtLandscape';
import EthicalInvesting from '../pages/learn/EthicalInvesting';
import FinancialFreedom from '../pages/learn/FinancialFreedom';
import First1000 from '../pages/learn/First1000';
import InflationGuide from '../pages/learn/InflationGuide';
import InterestImpact from '../pages/learn/InterestImpact';
import InvestingBasics from '../pages/learn/InvestingBasics';
import InvestingVsTrading from '../pages/learn/InvestingVsTrading';
import MonthlyDashboard from '../pages/learn/MonthlyDashboard';
import PortfolioRebalancing from '../pages/learn/PortfolioRebalancing';
import ProtectWealth from '../pages/learn/ProtectWealth';
import SnowballAvalanche from '../pages/learn/SnowballAvalanche';
import TaxEfficientAccounts from '../pages/learn/TaxEfficientAccounts';
import TeachMoneySkills from '../pages/learn/TeachMoneySkills';
import UkFinanceStats from '../pages/learn/UkFinanceStats';

// Legal Pages
import About from '../pages/legal/About';
import Cookies from '../pages/legal/Cookies';
import Disclaimer from '../pages/legal/Disclaimer';
import Privacy from '../pages/legal/Privacy';
import Terms from '../pages/legal/Terms';

// Blog & Cheat Codes
import BlogIndex from '../pages/blog/BlogIndex';
import MortgageCheatCode from '../pages/blog/MortgageCheatCode';
import CheatCode01 from '../pages/blog/CheatCode01';
import CheatCode01Payment from '../pages/blog/CheatCode01Payment';
import CheatCode01Unlocked from '../pages/blog/CheatCode01Unlocked';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Index /> },
      { path: 'home', element: <Navigate to="/" replace /> },
      { path: 'learn', element: <LearnHub /> },
      { path: 'formulas', element: <Formulas /> },

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

      // Learning Hub Routes
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

      { path: '*', element: <NotFound /> },
    ],
  },
];