import { useState, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { TrendingUp, Download, PiggyBank, Sparkles, Plus, X, BarChart3, Target, ArrowRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from "recharts";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";

const ACCENT = "#3B82F6";

type FrequencyType = "daily" | "weekly" | "bi-weekly" | "monthly" | "quarterly" | "annually";

interface CalculationResult {
  finalValue: number;
  totalContributions: number;
  totalInterest: number;
  schedule: { step: number; year: number; added: number; interest: number; balance: number }[];
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
  annually: 1, quarterly: 4, monthly: 12, "bi-weekly": 26, weekly: 52, daily: 365,
};

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const MARKET_RETURNS = {
  sp500:      { name: "S&P 500",    rate: 12.2, color: "#22c55e" },
  nasdaq:     { name: "NASDAQ",     rate: 16.0, color: "#a855f7" },
  ftse100:    { name: "FTSE 100",   rate: 5.8,  color: "#3b82f6" },
  msci_world: { name: "MSCI World", rate: 10.5, color: "#f97316" },
} as const;

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const lcm2 = (a: number, b: number) => Math.abs(a * b) / gcd(a, b);
const lcm = (...nums: number[]) => nums.reduce((acc, n) => lcm2(acc, n));

function compoundFlexible(params: {
  initial: number; years: number; annualRate: number; compounding: FrequencyType;
  dcaAmount: number; dcaEvery: FrequencyType; annualLumpSum: number; annualLumpMonth: number;
  monthlyLumpSums: MonthlyLumpSum[]; contributionTiming: "start" | "end";
}): CalculationResult {
  const {
    initial, years, annualRate, compounding,
    dcaAmount = 0, dcaEvery = "monthly",
    annualLumpSum = 0, annualLumpMonth = 1,
    monthlyLumpSums = [], contributionTiming = "end",
  } = params;

  const compPerYear   = FREQ[compounding];
  const dcaPerYear    = FREQ[dcaEvery];
  const stepsPerYear  = lcm(compPerYear, dcaPerYear, 12);
  const totalSteps    = Math.round(years * stepsPerYear);
  const stepRate      = annualRate / stepsPerYear;
  const dcaEverySteps = Math.round(stepsPerYear / dcaPerYear);
  const stepsPerMonth = Math.round(stepsPerYear / 12);

  let balance     = Number(initial) || 0;
  let totalContrib  = Number(initial) || 0;
  let totalInterest = 0;
  const schedule: CalculationResult["schedule"] = [];

  for (let s = 1; s <= totalSteps; s++) {
    const isDcaStep          = dcaAmount > 0 && s % dcaEverySteps === 0;
    const currentMonth       = Math.ceil((s % stepsPerYear || stepsPerYear) / stepsPerMonth);
    const isFirstStepOfMonth = s % stepsPerMonth === 1 || stepsPerMonth === 1;
    const isAnnualLumpStep   = annualLumpSum > 0 && currentMonth === annualLumpMonth && isFirstStepOfMonth && s > stepsPerMonth;

    let monthlyLumpAmount = 0;
    if (isFirstStepOfMonth) {
      const monthLump = monthlyLumpSums.find(m => m.month === currentMonth && m.enabled);
      if (monthLump) monthlyLumpAmount = monthLump.amount;
    }

    let added = 0;
    if (contributionTiming === "start") {
      if (isDcaStep)         { balance += dcaAmount;         added += dcaAmount;         }
      if (isAnnualLumpStep)  { balance += annualLumpSum;     added += annualLumpSum;     }
      if (monthlyLumpAmount) { balance += monthlyLumpAmount; added += monthlyLumpAmount; }
      totalContrib += added;
    }

    const before = balance;
    balance *= 1 + stepRate;
    totalInterest += balance - before;

    if (contributionTiming === "end") {
      if (isDcaStep)         { balance += dcaAmount;         added += dcaAmount;         }
      if (isAnnualLumpStep)  { balance += annualLumpSum;     added += annualLumpSum;     }
      if (monthlyLumpAmount) { balance += monthlyLumpAmount; added += monthlyLumpAmount; }
      totalContrib += added;
    }

    schedule.push({ step: s, year: s / stepsPerYear, added, interest: balance - before, balance });
  }

  return { finalValue: balance, totalContributions: totalContrib, totalInterest, schedule };
}

function calculateMarketProjection(
  initial: number, years: number, annualRate: number,
  dcaAmount: number, dcaEvery: FrequencyType,
  annualLumpSum: number, monthlyLumpSums: MonthlyLumpSum[],
): number[] {
  const yearlyBalances: number[] = [];
  const dcaPerPeriod = dcaAmount * FREQ[dcaEvery];
  let balance = initial;
  for (let y = 0; y <= years; y++) {
    yearlyBalances.push(balance);
    if (y < years) {
      balance += dcaPerPeriod + annualLumpSum;
      balance += monthlyLumpSums.filter(m => m.enabled).reduce((s, m) => s + m.amount, 0);
      balance *= (1 + annualRate);
    }
  }
  return yearlyBalances;
}

const inputClass = "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-base font-medium placeholder-white/20 focus:outline-none transition-all";
const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

function DarkInput({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input
        {...props}
        className={inputClass}
        onFocus={e => (e.target.style.borderColor = ACCENT)}
        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
      />
    </div>
  );
}

function SectionDivider({ title }: { title: string }) {
  return (
    <div className="border-t border-white/10 pt-6">
      <p className="text-[10px] font-heading uppercase tracking-widest text-white/30 mb-4">{title}</p>
    </div>
  );
}

export const AdvancedCompoundCalculator = () => {
  const [initial,          setInitial]          = useState("10000");
  const [years,            setYears]            = useState("20");
  const [rate,             setRate]             = useState("8");
  const [compounding,      setCompounding]      = useState<FrequencyType>("monthly");
  const [timing,           setTiming]           = useState<"start" | "end">("end");
  const [currency,         setCurrency]         = useState<Currency>("GBP");
  const [useMarketReturns, setUseMarketReturns] = useState(false);
  const [selectedMarket,   setSelectedMarket]   = useState<keyof typeof MARKET_RETURNS>("sp500");
  const [dcaAmount,        setDcaAmount]        = useState("500");
  const [dcaEvery,         setDcaEvery]         = useState<FrequencyType>("monthly");
  const [annualLumpSum,    setAnnualLumpSum]    = useState("0");
  const [annualLumpMonth,  setAnnualLumpMonth]  = useState(1);
  const [monthlyLumpSums,  setMonthlyLumpSums]  = useState<MonthlyLumpSum[]>(
    MONTH_NAMES.map((_, i) => ({ month: i + 1, amount: 0, enabled: false }))
  );
  const [showMonthlyLumps,    setShowMonthlyLumps]    = useState(false);
  const [platformFee,         setPlatformFee]         = useState("");
  const [fundFee,             setFundFee]             = useState("");
  const [result,              setResult]              = useState<CalculationResult | null>(null);
  const [showBreakdown,       setShowBreakdown]       = useState(false);
  const [showMarketComparison,setShowMarketComparison]= useState(true);

  const sym  = currencies[currency]?.symbol || "£";
  const fmt  = (n: number) => !isFinite(n) ? "—" : sym + n.toLocaleString(undefined, { maximumFractionDigits: 0 });
  const fmtD = (n: number) => !isFinite(n) ? "—" : sym + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const calculate = () => {
    const effectiveRate = useMarketReturns ? MARKET_RETURNS[selectedMarket].rate : parseFloat(rate) || 0;
    const netRate = effectiveRate - (parseFloat(platformFee) || 0) - (parseFloat(fundFee) || 0);
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
  };

  const updateMonthlyLump = (month: number, field: "amount" | "enabled", value: number | boolean) => {
    setMonthlyLumpSums(prev => prev.map(m => m.month === month ? { ...m, [field]: value } : m));
  };

  const loadDemo = () => {
    setInitial("10000"); setYears("20"); setRate("8"); setCompounding("weekly");
    setTiming("end"); setDcaAmount("500"); setDcaEvery("monthly");
    setAnnualLumpSum("2000"); setAnnualLumpMonth(12);
    setPlatformFee("0.25"); setFundFee("0.15"); setUseMarketReturns(false);
    setMonthlyLumpSums(MONTH_NAMES.map((_, i) => ({ month: i + 1, amount: 0, enabled: false })));
    setTimeout(calculate, 100);
  };

  const downloadCSV = () => {
    if (!result?.schedule.length) return;
    let csv = "Step,Year,Added,Interest,Balance\n";
    for (const r of result.schedule)
      csv += `${r.step},${r.year.toFixed(4)},${r.added.toFixed(2)},${r.interest.toFixed(2)},${r.balance.toFixed(2)}\n`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url;
    a.download = `compound-schedule-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const marketComparisonData = useMemo((): MarketComparison[] => {
    if (!result) return [];
    const yearsNum     = parseFloat(years)      || 0;
    const initialNum   = parseFloat(initial)    || 0;
    const dcaAmountNum = parseFloat(dcaAmount)  || 0;
    const annualLumpNum= parseFloat(annualLumpSum) || 0;
    const pfee = parseFloat(platformFee) || 0;
    const ffee = parseFloat(fundFee)     || 0;
    const stepsPerYear = result.schedule.length / yearsNum;
    return Array.from({ length: yearsNum + 1 }, (_, y) => {
      const stepIndex    = Math.min(Math.round(y * stepsPerYear) - 1, result.schedule.length - 1);
      const yourBalance  = y === 0 ? initialNum : (result.schedule[stepIndex]?.balance || 0);
      const sp500   = calculateMarketProjection(initialNum, y, (MARKET_RETURNS.sp500.rate   - pfee - ffee) / 100, dcaAmountNum, dcaEvery, annualLumpNum, monthlyLumpSums)[y] || 0;
      const nasdaq  = calculateMarketProjection(initialNum, y, (MARKET_RETURNS.nasdaq.rate  - pfee - ffee) / 100, dcaAmountNum, dcaEvery, annualLumpNum, monthlyLumpSums)[y] || 0;
      const ftse100 = calculateMarketProjection(initialNum, y, (MARKET_RETURNS.ftse100.rate - pfee - ffee) / 100, dcaAmountNum, dcaEvery, annualLumpNum, monthlyLumpSums)[y] || 0;
      return { year: y, yourPlan: yourBalance, sp500, nasdaq, ftse100 };
    });
  }, [result, years, initial, dcaAmount, dcaEvery, annualLumpSum, monthlyLumpSums, platformFee, fundFee]);

  const growthBreakdown = useMemo(() => {
    if (!result) return null;
    const total = result.finalValue;
    return {
      contributionPercent: (result.totalContributions / total) * 100,
      interestPercent:     (result.totalInterest      / total) * 100,
    };
  }, [result]);

  const selectClass        = "bg-black/40 border-white/10 text-white rounded-lg";
  const selectContentClass = "bg-[#1C1A1A] border-white/10 text-white";

  const tickFmt = (v: number) => {
    const a = Math.abs(v);
    return a >= 1e6 ? `${sym}${(v / 1e6).toFixed(1)}M` : a >= 1e3 ? `${sym}${(v / 1e3).toFixed(0)}k` : `${sym}${v}`;
  };

  return (
    <div className="w-full space-y-8 font-sans">

      {/* ── Main form card ── */}
      <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-display text-3xl md:text-4xl uppercase text-white tracking-wide">Advanced Calculator</h3>
            <p className="text-white/30 text-sm font-sans mt-1">DCA, lump sums &amp; market comparisons</p>
          </div>
          <TrendingUp className="h-7 w-7 flex-shrink-0" style={{ color: ACCENT }} />
        </div>

        {/* Basic inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <DarkInput label={`Initial Investment (${sym})`} type="number" min="0" step="100" value={initial} onChange={e => setInitial(e.target.value)} placeholder="10000" />
          <DarkInput label="Investment Period (Years)" type="number" min="1" max="100" value={years} onChange={e => setYears(e.target.value)} placeholder="20" />
          <div>
            <label className={labelClass}>Currency</label>
            <CurrencySelector value={currency} onChange={setCurrency} />
          </div>
        </div>

        {/* Return rate */}
        <SectionDivider title="Return Rate" />
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { label: "Custom Rate",        val: false },
            { label: "Historical Markets", val: true  },
          ].map(opt => (
            <button
              key={opt.label}
              onClick={() => setUseMarketReturns(opt.val)}
              className="py-3 font-heading text-xs uppercase tracking-widest transition-colors border rounded-lg"
              style={{
                background:  useMarketReturns === opt.val ? ACCENT : "transparent",
                borderColor: useMarketReturns === opt.val ? ACCENT : "rgba(255,255,255,0.1)",
                color:       useMarketReturns === opt.val ? "#000"  : "rgba(255,255,255,0.5)",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {!useMarketReturns ? (
          <div>
            <DarkInput label="Expected Annual Return (%)" type="number" min="0" max="100" step="0.1" value={rate} onChange={e => setRate(e.target.value)} placeholder="8" />
            <p className="text-white/20 text-xs font-sans mt-1">Historical avg: S&amp;P 500 ~12%, NASDAQ ~16%, FTSE 100 ~6%</p>
          </div>
        ) : (
          <div>
            <label className={labelClass}>Market Index (10-year avg returns)</label>
            <Select value={selectedMarket} onValueChange={v => setSelectedMarket(v as keyof typeof MARKET_RETURNS)}>
              <SelectTrigger className={selectClass}><SelectValue /></SelectTrigger>
              <SelectContent className={selectContentClass}>
                {Object.entries(MARKET_RETURNS).map(([key, val]) => (
                  <SelectItem key={key} value={key}>{val.name} ({val.rate}% avg)</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Fees */}
        <SectionDivider title="Ongoing Charges (Optional)" />
        <p className="text-white/20 text-xs font-sans -mt-2 mb-4">These fees reduce your net annual return</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <DarkInput label="Platform Fee (%)" type="number" min="0" step="0.01" value={platformFee} onChange={e => setPlatformFee(e.target.value)} placeholder="e.g. 0.25" />
            <p className="text-white/20 text-xs font-sans mt-1">Typical: 0.15% – 0.45%</p>
          </div>
          <div>
            <DarkInput label="Fund Management Fee (%)" type="number" min="0" step="0.01" value={fundFee} onChange={e => setFundFee(e.target.value)} placeholder="e.g. 0.15" />
            <p className="text-white/20 text-xs font-sans mt-1">Index funds: 0.03% – 0.20%</p>
          </div>
        </div>

        {/* Compounding */}
        <SectionDivider title="Compounding Settings" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Compounding Frequency</label>
            <Select value={compounding} onValueChange={v => setCompounding(v as FrequencyType)}>
              <SelectTrigger className={selectClass}><SelectValue /></SelectTrigger>
              <SelectContent className={selectContentClass}>
                <SelectItem value="daily">Daily (365x/year)</SelectItem>
                <SelectItem value="weekly">Weekly (52x/year)</SelectItem>
                <SelectItem value="bi-weekly">Bi-weekly (26x/year)</SelectItem>
                <SelectItem value="monthly">Monthly (12x/year)</SelectItem>
                <SelectItem value="quarterly">Quarterly (4x/year)</SelectItem>
                <SelectItem value="annually">Annually (1x/year)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className={labelClass}>Contribution Timing</label>
            <Select value={timing} onValueChange={v => setTiming(v as "start" | "end")}>
              <SelectTrigger className={selectClass}><SelectValue /></SelectTrigger>
              <SelectContent className={selectContentClass}>
                <SelectItem value="start">Start of period (more growth)</SelectItem>
                <SelectItem value="end">End of period</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* DCA */}
        <SectionDivider title="Regular Contributions (DCA)" />
        <p className="text-white/20 text-xs font-sans -mt-2 mb-4">Dollar-cost averaging — consistent investing over time</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DarkInput label={`Contribution Amount (${sym})`} type="number" min="0" step="10" value={dcaAmount} onChange={e => setDcaAmount(e.target.value)} placeholder="500" />
          <div>
            <label className={labelClass}>Contribution Frequency</label>
            <Select value={dcaEvery} onValueChange={v => setDcaEvery(v as FrequencyType)}>
              <SelectTrigger className={selectClass}><SelectValue /></SelectTrigger>
              <SelectContent className={selectContentClass}>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="annually">Annually</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setDcaAmount("0")}
              className="w-full py-3 border border-white/10 font-heading text-xs uppercase tracking-widest text-white/40 hover:text-white hover:border-white/30 transition-colors rounded-lg"
            >
              Clear DCA
            </button>
          </div>
        </div>

        {/* Annual Lump Sum */}
        <SectionDivider title="Annual Lump Sum" />
        <p className="text-white/20 text-xs font-sans -mt-2 mb-4">Bonus, tax refund, or yearly extra investment</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DarkInput label={`Annual Lump Sum (${sym})`} type="number" min="0" step="100" value={annualLumpSum} onChange={e => setAnnualLumpSum(e.target.value)} placeholder="0" />
          <div>
            <label className={labelClass}>Month to Add</label>
            <Select value={annualLumpMonth.toString()} onValueChange={v => setAnnualLumpMonth(parseInt(v))}>
              <SelectTrigger className={selectClass}><SelectValue /></SelectTrigger>
              <SelectContent className={selectContentClass}>
                {MONTH_NAMES.map((name, i) => (
                  <SelectItem key={i} value={(i + 1).toString()}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setAnnualLumpSum("0")}
              className="w-full py-3 border border-white/10 font-heading text-xs uppercase tracking-widest text-white/40 hover:text-white hover:border-white/30 transition-colors rounded-lg"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Monthly Lump Sums */}
        <SectionDivider title="Specific Monthly Lump Sums" />
        <div className="flex items-center justify-between mb-4">
          <p className="text-white/20 text-xs font-sans">Add extra investments for specific months each year</p>
          <button
            onClick={() => setShowMonthlyLumps(!showMonthlyLumps)}
            className="flex items-center gap-1 font-heading text-xs uppercase tracking-widest transition-colors"
            style={{ color: ACCENT }}
          >
            {showMonthlyLumps ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
            {showMonthlyLumps ? "Hide" : "Configure"}
          </button>
        </div>

        {showMonthlyLumps && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-4 bg-black/30 border border-white/10 rounded-lg mb-4">
            {MONTH_NAMES.map((name, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`month-${i}`}
                    checked={monthlyLumpSums[i]?.enabled || false}
                    onCheckedChange={checked => updateMonthlyLump(i + 1, "enabled", !!checked)}
                    className="border-white/20"
                  />
                  <label htmlFor={`month-${i}`} className="text-xs font-heading uppercase tracking-wide text-white/50">{name}</label>
                </div>
                {monthlyLumpSums[i]?.enabled && (
                  <input
                    type="number" min="0" step="100"
                    value={monthlyLumpSums[i]?.amount || ""}
                    onChange={e => updateMonthlyLump(i + 1, "amount", parseFloat(e.target.value) || 0)}
                    placeholder="Amount"
                    className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none"
                    onFocus={e => (e.target.style.borderColor = ACCENT)}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="pt-6 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={calculate}
              className="flex items-center justify-center gap-2 py-4 font-heading font-bold text-sm uppercase tracking-widest text-black rounded-lg transition-all hover:-translate-y-0.5"
              style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
            >
              <BarChart3 className="h-4 w-4" />
              Calculate Growth
            </button>
            <button
              onClick={loadDemo}
              className="flex items-center justify-center gap-2 py-4 font-heading text-sm uppercase tracking-widest text-white/60 hover:text-white border border-white/10 hover:border-white/30 rounded-lg transition-all"
            >
              <Sparkles className="h-4 w-4" />
              Load Example
            </button>
            <button
              onClick={downloadCSV}
              disabled={!result}
              className="flex items-center justify-center gap-2 py-4 font-heading text-sm uppercase tracking-widest text-white/60 hover:text-white border border-white/10 hover:border-white/30 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Download className="h-4 w-4" />
              Download CSV
            </button>
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      {result && (
        <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl space-y-8">

          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6" style={{ color: ACCENT }} />
            <h3 className="font-display text-3xl uppercase text-white tracking-wide">Your Projection</h3>
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Final Value",         value: fmt(result.finalValue),         icon: TrendingUp, color: ACCENT    },
              { label: "Total Invested",       value: fmt(result.totalContributions), icon: PiggyBank,  color: "#22c55e" },
              { label: "Total Growth",         value: fmt(result.totalInterest),      icon: Sparkles,   color: "#a78bfa" },
              { label: "Return on Investment", value: `${((result.totalInterest / result.totalContributions) * 100).toFixed(1)}%`, icon: Target, color: "#f97316" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-black/30 border border-white/10 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="h-4 w-4" style={{ color }} />
                  <span className="text-[10px] font-heading uppercase tracking-widest text-white/30">{label}</span>
                </div>
                <div className="font-display text-2xl text-white">{value}</div>
              </div>
            ))}
          </div>

          {/* Growth bar */}
          {growthBreakdown && (
            <div className="space-y-3">
              <p className="text-[10px] font-heading uppercase tracking-widest text-white/30">Portfolio Composition</p>
              <div className="relative h-8 rounded-full overflow-hidden bg-white/5">
                <div
                  className="absolute left-0 top-0 h-full bg-blue-500/60 transition-all duration-500"
                  style={{ width: `${growthBreakdown.contributionPercent}%` }}
                />
                <div
                  className="absolute top-0 h-full transition-all duration-500"
                  style={{
                    left:       `${growthBreakdown.contributionPercent}%`,
                    width:      `${growthBreakdown.interestPercent}%`,
                    background: `linear-gradient(90deg, ${ACCENT}, #a78bfa)`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs font-heading uppercase tracking-widest text-white/40">
                <span>Contributions {growthBreakdown.contributionPercent.toFixed(1)}%</span>
                <span>Growth {growthBreakdown.interestPercent.toFixed(1)}%</span>
              </div>
            </div>
          )}

          {/* Balance chart */}
          <div>
            <p className="text-[10px] font-heading uppercase tracking-widest text-white/30 mb-4">Investment Growth Over Time</p>
            <div className="bg-black/20 border border-white/10 rounded-xl p-4">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={result.schedule
                    .filter((_, i) => i % Math.max(1, Math.ceil(result.schedule.length / 200)) === 0)
                    .map(r => ({ year: r.year, balance: r.balance }))}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={ACCENT} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={ACCENT} stopOpacity={0}   />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="year" stroke="rgba(255,255,255,0.2)" tickFormatter={v => `Y${Math.round(v)}`} tick={{ fontSize: 10, fontFamily: "Oswald" }} />
                  <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 10, fontFamily: "Oswald" }} tickFormatter={tickFmt} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1C1A1A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "white", fontFamily: "Oswald" }}
                    formatter={(v: number) => [fmtD(v), "Balance"]}
                    labelFormatter={v => `Year ${Number(v).toFixed(1)}`}
                  />
                  <Area type="monotone" dataKey="balance" stroke={ACCENT} strokeWidth={2} fill="url(#balGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Market comparison */}
          {showMarketComparison && marketComparisonData.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-heading uppercase tracking-widest text-white/30">Compare to Historical Markets</p>
                <button
                  onClick={() => setShowMarketComparison(false)}
                  className="text-[10px] font-heading uppercase tracking-widest text-white/20 hover:text-white transition-colors"
                >
                  Hide
                </button>
              </div>
              <p className="text-white/20 text-xs font-sans mb-4">Based on 10-year average returns, after fees</p>
              <div className="bg-black/20 border border-white/10 rounded-xl p-4">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={marketComparisonData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="year" stroke="rgba(255,255,255,0.2)" tickFormatter={v => `Y${v}`} tick={{ fontSize: 10, fontFamily: "Oswald" }} />
                    <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 10, fontFamily: "Oswald" }} tickFormatter={tickFmt} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1C1A1A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "white", fontFamily: "Oswald" }}
                      formatter={(v: number) => fmtD(v)}
                      labelFormatter={v => `Year ${v}`}
                    />
                    <Legend wrapperStyle={{ fontFamily: "Oswald", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)" }} />
                    <Line type="monotone" dataKey="yourPlan" name="Your Plan"                                    stroke={ACCENT}                    strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="sp500"    name={`S&P 500 (${MARKET_RETURNS.sp500.rate}%)`}   stroke={MARKET_RETURNS.sp500.color}  strokeWidth={2} strokeDasharray="5 5" dot={false} />
                    <Line type="monotone" dataKey="nasdaq"   name={`NASDAQ (${MARKET_RETURNS.nasdaq.rate}%)`}   stroke={MARKET_RETURNS.nasdaq.color} strokeWidth={2} strokeDasharray="5 5" dot={false} />
                    <Line type="monotone" dataKey="ftse100"  name={`FTSE 100 (${MARKET_RETURNS.ftse100.rate}%)`}stroke={MARKET_RETURNS.ftse100.color}strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                {[
                  { label: "Your Plan", color: ACCENT,                     val: fmt(result.finalValue) },
                  { label: "S&P 500",   color: MARKET_RETURNS.sp500.color,  val: fmt(marketComparisonData[marketComparisonData.length - 1]?.sp500   || 0) },
                  { label: "NASDAQ",    color: MARKET_RETURNS.nasdaq.color,  val: fmt(marketComparisonData[marketComparisonData.length - 1]?.nasdaq  || 0) },
                  { label: "FTSE 100",  color: MARKET_RETURNS.ftse100.color, val: fmt(marketComparisonData[marketComparisonData.length - 1]?.ftse100 || 0) },
                ].map(({ label, color, val }) => (
                  <div key={label} className="flex items-center gap-2 p-2 bg-black/20 border border-white/5 rounded-lg">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                    <div>
                      <div className="text-[9px] font-heading uppercase tracking-widest text-white/30">{label}</div>
                      <div className="text-xs font-heading text-white">{val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Breakdown toggle */}
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="w-full py-3 border border-white/10 font-heading text-xs uppercase tracking-widest text-white/30 hover:text-white hover:border-white/30 transition-colors rounded-lg flex items-center justify-center gap-2"
          >
            <ArrowRight className={`h-3 w-3 transition-transform ${showBreakdown ? "rotate-90" : ""}`} />
            {showBreakdown ? "Hide" : "Show"} Step-by-Step Breakdown
          </button>

          {showBreakdown && (
            <div className="overflow-auto max-h-96 border border-white/10 rounded-lg">
              <table className="w-full text-xs">
                <thead className="bg-black/40 sticky top-0">
                  <tr>
                    {["Step","Year","Added","Interest","Balance"].map(h => (
                      <th key={h} className="text-left p-2 border-b border-white/10 font-heading uppercase tracking-widest text-white/30">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.schedule
                    .filter((_, i) => i % Math.max(1, Math.ceil(result.schedule.length / 500)) === 0)
                    .map(row => (
                      <tr key={row.step} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-2 text-white/40">{row.step}</td>
                        <td className="p-2 text-white/40">{row.year.toFixed(2)}</td>
                        <td className="p-2 text-white/60">{fmtD(row.added)}</td>
                        <td className="p-2 text-white/60">{fmtD(row.interest)}</td>
                        <td className="p-2 font-heading text-white">{fmt(row.balance)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};