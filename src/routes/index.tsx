import { RouteObject } from 'react-router-dom';
import App from '../App';

// Main & Hubs
import Index from '../pages/Index';
import Welcome from '../pages/Welcome';
import LearnHub from '../pages/LearnHub';
import Formulas from '../pages/Formulas';
import NotFound from '../pages/NotFound';

// Finance Calculators (Standard)
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
import MortgageOverpayment from '../pages/finance/MortgageOverpayment';
import MultiCardPayoff from '../pages/finance/MultiCardPayoff';
import SalaryCalculator from '../pages/finance/SalaryCalculator';
import SimpleInterest from '../pages/finance/SimpleInterest';
import StampDutyCalculator from '../pages/finance/StampDutyCalculator';
import WeeklyMortgageCalculator from '../pages/finance/WeeklyMortgageCalculator';

// --- NEW CALCULATORS & CONVERTERS ---

// Everyday Calculators
import AgeCalculator from '../pages/misc/AgeCalculator';
import DateCalculator from '../pages/misc/DateCalculator';
import DiscountCalculator from '../pages/misc/DiscountCalculator';
import PercentageCalculator from '../pages/misc/PercentageCalculator';
import TipCalculator from '../pages/misc/TipCalculator';

// Unit Converters
import LengthConverter from '../pages/converters/LengthConverter';
import WeightConverter from '../pages/converters/WeightConverter';
import TemperatureConverter from '../pages/converters/TemperatureConverter';
import UniversalConverter from '../pages/converters/UniversalConverter';

// --- END NEW IMPORTS ---

// Learn Articles
import FinancialJourney from '../pages/learn/FinancialJourney';
import WhereMoneyGoes from '../pages/learn/WhereMoneyGoes';
import FiftyThirtyTwentyBudget from '../pages/learn/FiftyThirtyTwentyBudget';
import AutomateFinances from '../pages/learn/AutomateFinances';
import EmergencyFund from '../pages/learn/EmergencyFund';
import CalculatorFormulasGuide from '../pages/learn/CalculatorFormulasGuide';

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
      { index: true, element: <Welcome /> },
      { path: 'home', element: <Index /> },
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

      // Everyday Calculator Routes
      { path: 'misc/age', element: <AgeCalculator /> },
      { path: 'misc/date', element: <DateCalculator /> },
      { path: 'misc/discount', element: <DiscountCalculator /> },
      { path: 'misc/percentage', element: <PercentageCalculator /> },
      { path: 'misc/tip', element: <TipCalculator /> },

      // Unit Converter Routes
      { path: 'converters/length', element: <LengthConverter /> },
      { path: 'converters/weight', element: <WeightConverter /> },
      { path: 'converters/temperature', element: <TemperatureConverter /> },
      { path: 'converters/universal', element: <UniversalConverter /> },

      // Learn Routes
      { path: 'learn/financial-journey', element: <FinancialJourney /> },
      { path: 'learn/where-money-goes', element: <WhereMoneyGoes /> },
      { path: 'learn/50-30-20-budget', element: <FiftyThirtyTwentyBudget /> },
      { path: 'learn/automate-finances', element: <AutomateFinances /> },
      { path: 'learn/emergency-fund', element: <EmergencyFund /> },
      { path: 'learn/calculator-formulas-guide', element: <CalculatorFormulasGuide /> },

      // Blog & Premium Content Routes
      { path: 'blog', element: <BlogIndex /> },
      { path: 'blog/mortgage-cheat-code', element: <MortgageCheatCode /> },
      { path: 'blog/cheat-code-01', element: <CheatCode01 /> },
      { path: 'blog/cheat-code-01-payment', element: <CheatCode01Payment /> },
      { path: 'blog/cheat-code-01-unlocked', element: <CheatCode01Unlocked /> },

      { path: '*', element: <NotFound /> },
    ],
  },
];