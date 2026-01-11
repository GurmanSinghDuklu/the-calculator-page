import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { TrendingUp, Download, PiggyBank, Sparkles, Calendar, Plus, X, BarChart3, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area, ComposedChart, Bar } from "recharts";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";

type FrequencyType = "daily" | "weekly" | "bi-weekly" | "monthly" | "quarterly" | "annually";

interface CalculationResult {
  finalValue: number;
  totalContributions: number;
  totalInterest: number;
  schedule: {
    step: number;
    year: number;
    added: number;
    interest: number;
    balance: number;
  }[];
}

interface MonthlyLumpSum {
  month: number;
  amount: number;
  enabled: boolean;
}

interface MarketComparison {
  year: number;
  yourPlan: number;
  sp500: number;
  nasdaq: number;
  ftse100: number;
}

const FREQ: Record<FrequencyType, number> = {
  annually: 1,
  quarterly: 4,
  monthly: 12,
  "bi-weekly": 26,
  weekly: 52,
  daily: 365,
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Historical market returns (10-year average annualized returns as of 2024)
const MARKET_RETURNS = {
  "sp500": { name: "S&P 500", rate: 12.2, color: "hsl(142, 76%, 36%)" },
  "nasdaq": { name: "NASDAQ", rate: 16.0, color: "hsl(271, 76%, 53%)" },
  "ftse100": { name: "FTSE 100", rate: 5.8, color: "hsl(221, 83%, 53%)" },
  "msci_world": { name: "MSCI World", rate: 10.5, color: "hsl(25, 95%, 53%)" },
} as const;

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const lcm2 = (a: number, b: number) => Math.abs(a * b) / gcd(a, b);
const lcm = (...nums: number[]) => nums.reduce((acc, n) => lcm2(acc, n));

function compoundFlexible(params: {
  initial: number;
  years: number;
  annualRate: number;
  compounding: FrequencyType;
  dcaAmount: number;
  dcaEvery: FrequencyType;
  annualLumpSum: number;
  annualLumpMonth: number;
  monthlyLumpSums: MonthlyLumpSum[];
  contributionTiming: "start" | "end";
}): CalculationResult {
  const {
    initial,
    years,
    annualRate,
    compounding,
    dcaAmount = 0,
    dcaEvery = "monthly",
    annualLumpSum = 0,
    annualLumpMonth = 1,
    monthlyLumpSums = [],
    contributionTiming = "end",
  } = params;

  const compPerYear = FREQ[compounding];
  const dcaPerYear = FREQ[dcaEvery];

  // We'll use monthly granularity for lump sums
  const stepsPerYear = lcm(compPerYear, dcaPerYear, 12);
  const totalSteps = Math.round(years * stepsPerYear);
  const stepRate = annualRate / stepsPerYear;

  const dcaEverySteps = Math.round(stepsPerYear / dcaPerYear);
  const stepsPerMonth = Math.round(stepsPerYear / 12);

  let balance = Number(initial) || 0;
  let totalContrib = Number(initial) || 0;
  let totalInterest = 0;

  const schedule: CalculationResult["schedule"] = [];

  for (let s = 1; s <= totalSteps; s++) {
    const isDcaStep = dcaAmount > 0 && s % dcaEverySteps === 0;
    
    // Calculate current month (1-12)
    const currentMonth = Math.ceil((s % stepsPerYear || stepsPerYear) / stepsPerMonth);
    const isFirstStepOfMonth = s % stepsPerMonth === 1 || stepsPerMonth === 1;
    
    // Check for annual lump sum
    const isAnnualLumpStep = annualLumpSum > 0 && currentMonth === annualLumpMonth && isFirstStepOfMonth && s > stepsPerMonth;
    
    // Check for monthly lump sums
    let monthlyLumpAmount = 0;
    if (isFirstStepOfMonth) {
      const monthLump = monthlyLumpSums.find(m => m.month === currentMonth && m.enabled);
      if (monthLump) {
        monthlyLumpAmount = monthLump.amount;
      }
    }
    
    let added = 0;

    if (contributionTiming === "start") {
      if (isDcaStep) {
        balance += dcaAmount;
        added += dcaAmount;
      }
      if (isAnnualLumpStep) {
        balance += annualLumpSum;
        added += annualLumpSum;
      }
      if (monthlyLumpAmount > 0) {
        balance += monthlyLumpAmount;
        added += monthlyLumpAmount;
      }
      totalContrib += added;
    }

    const before = balance;
    balance *= 1 + stepRate;
    const interest = balance - before;
    totalInterest += interest;

    if (contributionTiming === "end") {
      if (isDcaStep) {
        balance += dcaAmount;
        added += dcaAmount;
      }
      if (isAnnualLumpStep) {
        balance += annualLumpSum;
        added += annualLumpSum;
      }
      if (monthlyLumpAmount > 0) {
        balance += monthlyLumpAmount;
        added += monthlyLumpAmount;
      }
      totalContrib += added;
    }

    schedule.push({
      step: s,
      year: s / stepsPerYear,
      added,
      interest,
      balance,
    });
  }

  return {
    finalValue: balance,
    totalContributions: totalContrib,
    totalInterest,
    schedule,
  };
}

// Calculate projection for a given market return rate
function calculateMarketProjection(
  initial: number,
  years: number,
  annualRate: number,
  dcaAmount: number,
  dcaEvery: FrequencyType,
  annualLumpSum: number,
  monthlyLumpSums: MonthlyLumpSum[]
): number[] {
  const yearlyBalances: number[] = [];
  const dcaPerYear = FREQ[dcaEvery];
  const dcaPerPeriod = dcaAmount * dcaPerYear;
  
  let balance = initial;
  
  for (let y = 0; y <= years; y++) {
    yearlyBalances.push(balance);
    if (y < years) {
      // Add DCA contributions
      balance += dcaPerPeriod;
      // Add annual lump sum
      balance += annualLumpSum;
      // Add monthly lump sums
      const totalMonthlyLumps = monthlyLumpSums
        .filter(m => m.enabled)
        .reduce((sum, m) => sum + m.amount, 0);
      balance += totalMonthlyLumps;
      // Apply growth
      balance *= (1 + annualRate);
    }
  }
  
  return yearlyBalances;
}

export const AdvancedCompoundCalculator = () => {
  const [initial, setInitial] = useState("10000");
  const [years, setYears] = useState("20");
  const [rate, setRate] = useState("8");
  const [compounding, setCompounding] = useState<FrequencyType>("monthly");
  const [timing, setTiming] = useState<"start" | "end">("end");
  const [currency, setCurrency] = useState<Currency>("GBP");
  
  const [useMarketReturns, setUseMarketReturns] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState<keyof typeof MARKET_RETURNS>("sp500");
  
  const [dcaAmount, setDcaAmount] = useState("500");
  const [dcaEvery, setDcaEvery] = useState<FrequencyType>("monthly");
  
  // Annual lump sum
  const [annualLumpSum, setAnnualLumpSum] = useState("0");
  const [annualLumpMonth, setAnnualLumpMonth] = useState(1);
  
  // Monthly lump sums for specific months
  const [monthlyLumpSums, setMonthlyLumpSums] = useState<MonthlyLumpSum[]>(
    MONTH_NAMES.map((_, i) => ({ month: i + 1, amount: 0, enabled: false }))
  );
  const [showMonthlyLumps, setShowMonthlyLumps] = useState(false);
  
  const [platformFee, setPlatformFee] = useState("");
  const [fundFee, setFundFee] = useState("");
  
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showMarketComparison, setShowMarketComparison] = useState(true);

  const fmt = (n: number, cur = currency) => {
    if (!isFinite(n)) return "—";
    const symbol = currencies[cur]?.symbol || cur;
    return symbol + n.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  const fmtDetailed = (n: number, cur = currency) => {
    if (!isFinite(n)) return "—";
    const symbol = currencies[cur]?.symbol || cur;
    return symbol + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const calculate = () => {
    try {
      const effectiveRate = useMarketReturns 
        ? MARKET_RETURNS[selectedMarket].rate 
        : parseFloat(rate) || 0;
      
      // Deduct platform and fund fees from return rate
      const platformFeeRate = parseFloat(platformFee) || 0;
      const fundFeeRate = parseFloat(fundFee) || 0;
      const netRate = effectiveRate - platformFeeRate - fundFeeRate;
      
      const res = compoundFlexible({
        initial: parseFloat(initial) || 0,
        years: parseFloat(years) || 0,
        annualRate: netRate / 100,
        compounding,
        dcaAmount: parseFloat(dcaAmount) || 0,
        dcaEvery,
        annualLumpSum: parseFloat(annualLumpSum) || 0,
        annualLumpMonth,
        monthlyLumpSums,
        contributionTiming: timing,
      });
      setResult(res);
    } catch (e) {
      console.error(e);
    }
  };

  const updateMonthlyLump = (month: number, field: "amount" | "enabled", value: number | boolean) => {
    setMonthlyLumpSums(prev => 
      prev.map(m => 
        m.month === month 
          ? { ...m, [field]: value }
          : m
      )
    );
  };

  const getTotalMonthlyLumps = () => {
    return monthlyLumpSums
      .filter(m => m.enabled && m.amount > 0)
      .reduce((sum, m) => sum + m.amount, 0);
  };

  // Generate market comparison data
  const marketComparisonData = useMemo(() => {
    if (!result) return [];
    
    const yearsNum = parseFloat(years) || 0;
    const initialNum = parseFloat(initial) || 0;
    const dcaAmountNum = parseFloat(dcaAmount) || 0;
    const annualLumpNum = parseFloat(annualLumpSum) || 0;
    const platformFeeNum = parseFloat(platformFee) || 0;
    const fundFeeNum = parseFloat(fundFee) || 0;
    
    const data: MarketComparison[] = [];
    
    // Your plan projection from result
    const stepsPerYear = result.schedule.length / yearsNum;
    
    for (let y = 0; y <= yearsNum; y++) {
      const stepIndex = Math.min(Math.round(y * stepsPerYear) - 1, result.schedule.length - 1);
      const yourBalance = y === 0 ? initialNum : (result.schedule[stepIndex]?.balance || 0);
      
      // Calculate market projections
      const sp500Balances = calculateMarketProjection(
        initialNum, y, (MARKET_RETURNS.sp500.rate - platformFeeNum - fundFeeNum) / 100,
        dcaAmountNum, dcaEvery, annualLumpNum, monthlyLumpSums
      );
      const nasdaqBalances = calculateMarketProjection(
        initialNum, y, (MARKET_RETURNS.nasdaq.rate - platformFeeNum - fundFeeNum) / 100,
        dcaAmountNum, dcaEvery, annualLumpNum, monthlyLumpSums
      );
      const ftse100Balances = calculateMarketProjection(
        initialNum, y, (MARKET_RETURNS.ftse100.rate - platformFeeNum - fundFeeNum) / 100,
        dcaAmountNum, dcaEvery, annualLumpNum, monthlyLumpSums
      );
      
      data.push({
        year: y,
        yourPlan: yourBalance,
        sp500: sp500Balances[y] || 0,
        nasdaq: nasdaqBalances[y] || 0,
        ftse100: ftse100Balances[y] || 0,
      });
    }
    
    return data;
  }, [result, years, initial, dcaAmount, dcaEvery, annualLumpSum, monthlyLumpSums, platformFee, fundFee]);

  const loadDemo = () => {
    setInitial("10000");
    setYears("20");
    setRate("8");
    setCompounding("weekly");
    setTiming("end");
    setDcaAmount("500");
    setDcaEvery("monthly");
    setAnnualLumpSum("2000");
    setAnnualLumpMonth(12);
    setPlatformFee("0.25");
    setFundFee("0.15");
    setUseMarketReturns(false);
    setMonthlyLumpSums(MONTH_NAMES.map((_, i) => ({ month: i + 1, amount: 0, enabled: false })));
    setTimeout(calculate, 100);
  };

  const downloadCSV = () => {
    if (!result || !result.schedule.length) return;
    
    let csv = "Step,Year,Added,Interest,Balance\n";
    for (const r of result.schedule) {
      csv += `${r.step},${r.year.toFixed(4)},${r.added.toFixed(2)},${r.interest.toFixed(2)},${r.balance.toFixed(2)}\n`;
    }
    
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    a.download = `compound-schedule-${ts}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Calculate growth breakdown for visualization
  const growthBreakdown = useMemo(() => {
    if (!result) return null;
    const contributions = result.totalContributions;
    const interest = result.totalInterest;
    const total = result.finalValue;
    return {
      contributionPercent: (contributions / total) * 100,
      interestPercent: (interest / total) * 100,
    };
  }, [result]);

  return (
    <div className="w-full space-y-8">
      <Card className="w-full border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-card via-card to-primary/5">
        <CardHeader className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-3">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg flex-shrink-0">
              <TrendingUp className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl break-words">Ultimate Compound Interest Calculator</CardTitle>
              <CardDescription className="text-sm sm:text-base lg:text-lg mt-1">
                The most comprehensive stock market compound calculator with DCA, lump sums & historical comparisons
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-4 sm:p-6 lg:p-8">
          {/* Basic Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="initial" className="text-sm sm:text-base">Initial Investment ({currencies[currency]?.symbol})</Label>
              <Input
                id="initial"
                type="number"
                min="0"
                step="100"
                value={initial}
                onChange={(e) => setInitial(e.target.value)}
                placeholder="10000"
                className="h-11 sm:h-12 text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="years" className="text-sm sm:text-base">Investment Period (years)</Label>
              <Input
                id="years"
                type="number"
                min="1"
                max="100"
                step="1"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="20"
                className="h-11 sm:h-12 text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency" className="text-sm sm:text-base">Currency</Label>
              <CurrencySelector value={currency} onChange={setCurrency} />
            </div>
          </div>

          <div className="border-t pt-4" />

          {/* Return Rate Selection */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                type="button"
                variant={!useMarketReturns ? "default" : "outline"}
                onClick={() => setUseMarketReturns(false)}
                className="h-10 sm:h-11 text-sm sm:text-base"
              >
                Custom Annual Return %
              </Button>
              <Button
                type="button"
                variant={useMarketReturns ? "default" : "outline"}
                onClick={() => setUseMarketReturns(true)}
                className="h-10 sm:h-11 text-sm sm:text-base"
              >
                Historical Market Returns
              </Button>
            </div>

            {!useMarketReturns ? (
              <div className="space-y-2">
                <Label htmlFor="rate">Expected Annual Return (%)</Label>
                <Input
                  id="rate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="8"
                />
                <p className="text-xs text-muted-foreground">
                  Historical average: S&P 500 ~12%, NASDAQ ~16%, FTSE 100 ~6%
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="marketSelect">Select Market Index (10-year avg returns)</Label>
                <Select value={selectedMarket} onValueChange={(v) => setSelectedMarket(v as keyof typeof MARKET_RETURNS)}>
                  <SelectTrigger id="marketSelect">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(MARKET_RETURNS).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value.name} ({value.rate}% avg)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Ongoing Charges */}
          <div className="border-t pt-4" />
          <div className="space-y-4">
            <div className="space-y-1">
              <Label className="text-base font-semibold">Ongoing Charges (Optional)</Label>
              <p className="text-sm text-muted-foreground">These fees reduce your net annual return</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="platformFee">Platform Fee (%)</Label>
                <Input
                  id="platformFee"
                  type="number"
                  min="0"
                  step="0.01"
                  value={platformFee}
                  onChange={(e) => setPlatformFee(e.target.value)}
                  placeholder="e.g., 0.25"
                />
                <p className="text-xs text-muted-foreground">Typical: 0.15% - 0.45%</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fundFee">Fund Management Fee (%)</Label>
                <Input
                  id="fundFee"
                  type="number"
                  min="0"
                  step="0.01"
                  value={fundFee}
                  onChange={(e) => setFundFee(e.target.value)}
                  placeholder="e.g., 0.15"
                />
                <p className="text-xs text-muted-foreground">Index funds: 0.03% - 0.20%</p>
              </div>
            </div>
          </div>

          {/* Compounding Frequency */}
          <div className="border-t pt-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="compounding">Compounding Frequency</Label>
              <Select value={compounding} onValueChange={(v) => setCompounding(v as FrequencyType)}>
                <SelectTrigger id="compounding">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily (365x/year)</SelectItem>
                  <SelectItem value="weekly">Weekly (52x/year)</SelectItem>
                  <SelectItem value="bi-weekly">Bi-weekly (26x/year)</SelectItem>
                  <SelectItem value="monthly">Monthly (12x/year)</SelectItem>
                  <SelectItem value="quarterly">Quarterly (4x/year)</SelectItem>
                  <SelectItem value="annually">Annually (1x/year)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timing">Contribution Timing</Label>
              <Select value={timing} onValueChange={(v) => setTiming(v as "start" | "end")}>
                <SelectTrigger id="timing">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="start">Start of period (more growth)</SelectItem>
                  <SelectItem value="end">End of period</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Regular Contributions (DCA) */}
          <div className="border-t pt-4" />
          <div className="space-y-4">
            <div className="space-y-1">
              <Label className="text-base font-semibold flex items-center gap-2">
                <PiggyBank className="h-5 w-5" />
                Regular Contributions (DCA)
              </Label>
              <p className="text-sm text-muted-foreground">Dollar-cost averaging - consistent investing over time</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dcaAmount">Contribution Amount ({currencies[currency]?.symbol})</Label>
                <Input
                  id="dcaAmount"
                  type="number"
                  min="0"
                  step="10"
                  value={dcaAmount}
                  onChange={(e) => setDcaAmount(e.target.value)}
                  placeholder="500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dcaEvery">Contribution Frequency</Label>
                <Select value={dcaEvery} onValueChange={(v) => setDcaEvery(v as FrequencyType)}>
                  <SelectTrigger id="dcaEvery">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="bi-weekly">Bi-weekly (fortnightly)</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="annually">Annually</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>&nbsp;</Label>
                <Button variant="outline" className="w-full" onClick={() => setDcaAmount("0")}>
                  Clear DCA
                </Button>
              </div>
            </div>
          </div>

          {/* Annual Lump Sum */}
          <div className="border-t pt-4" />
          <div className="space-y-4">
            <div className="space-y-1">
              <Label className="text-base font-semibold flex items-center gap-2">
                <Target className="h-5 w-5" />
                Annual Lump Sum
              </Label>
              <p className="text-sm text-muted-foreground">Bonus, tax refund, or yearly extra investment</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="annualLumpSum">Annual Lump Sum ({currencies[currency]?.symbol})</Label>
                <Input
                  id="annualLumpSum"
                  type="number"
                  min="0"
                  step="100"
                  value={annualLumpSum}
                  onChange={(e) => setAnnualLumpSum(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="annualLumpMonth">Month to Add</Label>
                <Select value={annualLumpMonth.toString()} onValueChange={(v) => setAnnualLumpMonth(parseInt(v))}>
                  <SelectTrigger id="annualLumpMonth">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTH_NAMES.map((name, i) => (
                      <SelectItem key={i} value={(i + 1).toString()}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>&nbsp;</Label>
                <Button variant="outline" className="w-full" onClick={() => setAnnualLumpSum("0")}>
                  Clear Annual Lump
                </Button>
              </div>
            </div>
          </div>

          {/* Monthly Lump Sums */}
          <div className="border-t pt-4" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Specific Monthly Lump Sums
                </Label>
                <p className="text-sm text-muted-foreground">Add extra investments for specific months each year</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMonthlyLumps(!showMonthlyLumps)}
              >
                {showMonthlyLumps ? <X className="h-4 w-4 mr-1" /> : <Plus className="h-4 w-4 mr-1" />}
                {showMonthlyLumps ? "Hide" : "Configure"}
              </Button>
            </div>
            
            {showMonthlyLumps && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-4 bg-muted/30 rounded-lg border">
                {MONTH_NAMES.map((name, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`month-${i}`}
                        checked={monthlyLumpSums[i]?.enabled || false}
                        onCheckedChange={(checked) => updateMonthlyLump(i + 1, "enabled", !!checked)}
                      />
                      <Label htmlFor={`month-${i}`} className="text-sm font-medium">{name}</Label>
                    </div>
                    {monthlyLumpSums[i]?.enabled && (
                      <Input
                        type="number"
                        min="0"
                        step="100"
                        value={monthlyLumpSums[i]?.amount || ""}
                        onChange={(e) => updateMonthlyLump(i + 1, "amount", parseFloat(e.target.value) || 0)}
                        placeholder="Amount"
                        className="h-9"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {getTotalMonthlyLumps() > 0 && (
              <p className="text-sm text-primary font-medium">
                Total monthly lump sums per year: {fmt(getTotalMonthlyLumps())}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 pt-4 border-t">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <Button onClick={calculate} size="lg" className="h-14 px-8 text-lg font-semibold w-full">
                <BarChart3 className="h-5 w-5 mr-2" />
                Calculate Growth
              </Button>
              <Button variant="outline" onClick={loadDemo} className="h-14 px-6 text-base w-full">
                <Sparkles className="h-5 w-5 mr-2" />
                Load Example
              </Button>
              <Button variant="outline" onClick={downloadCSV} disabled={!result} className="h-14 px-6 text-base w-full sm:col-span-2 lg:col-span-1">
                <Download className="h-5 w-5 mr-2" />
                Download CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card className="border-2 border-primary/20 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardHeader className="space-y-2">
            <CardTitle className="text-xl sm:text-2xl flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-primary" />
              Your Investment Projection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-4 sm:p-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-5 border border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-primary-foreground" strokeWidth={2} />
                  </div>
                  <div className="text-sm text-muted-foreground">Final Value</div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-primary break-words">{fmt(result.finalValue)}</div>
              </div>
              <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl p-5 border border-secondary/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <PiggyBank className="h-5 w-5 text-secondary-foreground" strokeWidth={2} />
                  </div>
                  <div className="text-sm text-muted-foreground">Total Invested</div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-secondary break-words">{fmt(result.totalContributions)}</div>
              </div>
              <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-5 border border-accent/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-5 w-5 text-accent-foreground" strokeWidth={2} />
                  </div>
                  <div className="text-sm text-muted-foreground">Total Growth</div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-accent break-words">{fmt(result.totalInterest)}</div>
              </div>
              <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl p-5 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-muted-foreground/20 flex items-center justify-center flex-shrink-0">
                    <Target className="h-5 w-5 text-foreground" strokeWidth={2} />
                  </div>
                  <div className="text-sm text-muted-foreground">Return on Investment</div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold break-words">
                  {((result.totalInterest / result.totalContributions) * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Growth Breakdown Bar */}
            {growthBreakdown && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Portfolio Composition</h3>
                <div className="relative h-10 rounded-full overflow-hidden bg-muted">
                  <div 
                    className="absolute left-0 top-0 h-full bg-secondary transition-all duration-500"
                    style={{ width: `${growthBreakdown.contributionPercent}%` }}
                  />
                  <div 
                    className="absolute top-0 h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                    style={{ left: `${growthBreakdown.contributionPercent}%`, width: `${growthBreakdown.interestPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-secondary" />
                    <span>Contributions: {growthBreakdown.contributionPercent.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent" />
                    <span>Growth: {growthBreakdown.interestPercent.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Balance Over Time Chart */}
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold">Your Investment Growth</h3>
              <div className="bg-muted/30 rounded-xl p-3 sm:p-6 border border-border">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart
                    data={result.schedule
                      .filter((_, i) => i % Math.max(1, Math.ceil(result.schedule.length / 200)) === 0)
                      .map(r => ({
                        year: r.year,
                        balance: r.balance,
                      }))}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="year" 
                      stroke="hsl(var(--muted-foreground))"
                      tickFormatter={(value) => `Y${Math.round(value)}`}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      tickFormatter={(value) => {
                        const abs = Math.abs(value);
                        if (abs >= 1e6) return `${currencies[currency]?.symbol}${(value/1e6).toFixed(1)}M`;
                        if (abs >= 1e3) return `${currencies[currency]?.symbol}${(value/1e3).toFixed(0)}k`;
                        return `${currencies[currency]?.symbol}${value.toFixed(0)}`;
                      }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--foreground))'
                      }}
                      formatter={(value: number) => [fmtDetailed(value, currency), 'Balance']}
                      labelFormatter={(value) => `Year ${Number(value).toFixed(1)}`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="balance" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2.5}
                      fill="url(#balanceGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Market Comparison Chart */}
            {showMarketComparison && marketComparisonData.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-semibold">Compare to Historical Market Performance</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMarketComparison(!showMarketComparison)}
                  >
                    {showMarketComparison ? "Hide" : "Show"}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  See how your plan compares if invested in major indices (based on 10-year average returns)
                </p>
                <div className="bg-muted/30 rounded-xl p-3 sm:p-6 border border-border">
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                      data={marketComparisonData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="year" 
                        stroke="hsl(var(--muted-foreground))"
                        tickFormatter={(value) => `Y${value}`}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        tickFormatter={(value) => {
                          const abs = Math.abs(value);
                          if (abs >= 1e6) return `${currencies[currency]?.symbol}${(value/1e6).toFixed(1)}M`;
                          if (abs >= 1e3) return `${currencies[currency]?.symbol}${(value/1e3).toFixed(0)}k`;
                          return `${currencies[currency]?.symbol}${value.toFixed(0)}`;
                        }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          color: 'hsl(var(--foreground))'
                        }}
                        formatter={(value: number) => fmtDetailed(value, currency)}
                        labelFormatter={(value) => `Year ${value}`}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="yourPlan" 
                        name="Your Plan"
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        dot={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="sp500" 
                        name={`S&P 500 (${MARKET_RETURNS.sp500.rate}%)`}
                        stroke={MARKET_RETURNS.sp500.color}
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="nasdaq" 
                        name={`NASDAQ (${MARKET_RETURNS.nasdaq.rate}%)`}
                        stroke={MARKET_RETURNS.nasdaq.color}
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="ftse100" 
                        name={`FTSE 100 (${MARKET_RETURNS.ftse100.rate}%)`}
                        stroke={MARKET_RETURNS.ftse100.color}
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(var(--primary))' }} />
                    <span>Your Plan: {fmt(result.finalValue)}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: MARKET_RETURNS.sp500.color }} />
                    <span>S&P 500: {fmt(marketComparisonData[marketComparisonData.length - 1]?.sp500 || 0)}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: MARKET_RETURNS.nasdaq.color }} />
                    <span>NASDAQ: {fmt(marketComparisonData[marketComparisonData.length - 1]?.nasdaq || 0)}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: MARKET_RETURNS.ftse100.color }} />
                    <span>FTSE 100: {fmt(marketComparisonData[marketComparisonData.length - 1]?.ftse100 || 0)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Breakdown Toggle */}
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setShowBreakdown(!showBreakdown)}
            >
              {showBreakdown ? "Hide" : "Show"} detailed step-by-step breakdown
            </Button>

            {showBreakdown && (
              <div className="overflow-auto max-h-96 border rounded-lg -mx-2 sm:mx-0">
                <table className="w-full text-xs sm:text-sm">
                  <thead className="bg-muted sticky top-0">
                    <tr>
                      <th className="text-left p-1.5 sm:p-2 border-b whitespace-nowrap">Step</th>
                      <th className="text-right p-1.5 sm:p-2 border-b whitespace-nowrap">Year</th>
                      <th className="text-right p-1.5 sm:p-2 border-b whitespace-nowrap">Added</th>
                      <th className="text-right p-1.5 sm:p-2 border-b whitespace-nowrap">Interest</th>
                      <th className="text-right p-1.5 sm:p-2 border-b whitespace-nowrap">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule
                      .filter((_, i) => i % Math.max(1, Math.ceil(result.schedule.length / 500)) === 0)
                      .map((row) => (
                        <tr key={row.step} className="border-b hover:bg-muted/30">
                          <td className="p-1.5 sm:p-2">{row.step}</td>
                          <td className="text-right p-1.5 sm:p-2">{row.year.toFixed(2)}</td>
                          <td className="text-right p-1.5 sm:p-2">{fmtDetailed(row.added)}</td>
                          <td className="text-right p-1.5 sm:p-2">{fmtDetailed(row.interest)}</td>
                          <td className="text-right p-1.5 sm:p-2 font-semibold">{fmt(row.balance)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};