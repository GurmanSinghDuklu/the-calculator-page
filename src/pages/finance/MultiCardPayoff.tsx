import { useState } from "react";
import { SEO } from "@/components/SEO";
import { seoData } from "@/utils/seoData";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Plus, Trash2, Download, Target } from "lucide-react";
import { toast } from "sonner";

interface CreditCard {
  id: string;
  name: string;
  balance: number;
  apr: number;
  minPct: number;
  floorMin: number;
}

interface SimulationResult {
  months: number;
  totalInterestAll: number;
  totalPaidAll: number;
  cards: Array<{
    name: string;
    paidOffMonth: number | null;
    totalInterest: number;
    totalPaid: number;
  }>;
  schedule: Array<{
    month: number;
    totalBalance: number;
    spend: number;
    interest: number;
    items: Array<{
      name: string;
      minPay: number;
      extra: number;
      endBal: number;
    }>;
  }>;
}

export default function MultiCardPayoff() {
  const [cards, setCards] = useState<CreditCard[]>([
    { id: "1", name: "Card A", balance: 2400, apr: 24.9, minPct: 2, floorMin: 25 }
  ]);
  const [strategy, setStrategy] = useState<"avalanche" | "snowball">("avalanche");
  const [budget, setBudget] = useState("400");
  const [days, setDays] = useState("30");
  const [maxMonths, setMaxMonths] = useState("600");
  const [result, setResult] = useState<SimulationResult | null>(null);

  const addCard = () => {
    setCards([...cards, {
      id: Date.now().toString(),
      name: `Card ${String.fromCharCode(65 + cards.length)}`,
      balance: 0,
      apr: 29.9,
      minPct: 2,
      floorMin: 25
    }]);
  };

  const removeCard = (id: string) => {
    setCards(cards.filter(c => c.id !== id));
  };

  const updateCard = (id: string, field: keyof CreditCard, value: string | number) => {
    setCards(cards.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const monthlyRate = (aprDecimal: number, daysInCycle: number) => {
    return Math.pow(1 + aprDecimal / 365, daysInCycle) - 1;
  };

  const simulateDebtPaydown = (): SimulationResult | null => {
    const budgetNum = parseFloat(budget);
    const daysNum = parseInt(days);
    const maxMonthsNum = parseInt(maxMonths);

    if (!cards.length) {
      toast.error("Add at least one card");
      return null;
    }
    if (budgetNum <= 0) {
      toast.error("Please enter a positive monthly budget");
      return null;
    }

    const cardsCopy = cards.map(c => ({
      ...c,
      balance: c.balance,
      totalInterest: 0,
      totalPaid: 0,
      paidOffMonth: null as number | null,
    }));

    const schedule: SimulationResult["schedule"] = [];
    let month = 0;
    let totalInterestAll = 0;
    let totalPaidAll = 0;

    const alive = () => cardsCopy.filter(c => c.balance > 0.000001);
    const sortKey = (c: typeof cardsCopy[0]) =>
      strategy === "avalanche" ? -c.apr : c.balance;

    while (alive().length && month < maxMonthsNum) {
      month += 1;
      let remaining = budgetNum;
      const monthData = { month, totalBalance: 0, spend: 0, interest: 0, items: [] as any[] };

      // Step 1: Pay minimums
      for (const c of cardsCopy) {
        if (c.balance <= 0) continue;

        const iM = monthlyRate(c.apr / 100, daysNum);
        const interest = c.balance * iM;
        const minCandidate = Math.max(c.floorMin, (c.minPct / 100) * c.balance, interest + 1);
        const dueNow = Math.min(remaining, Math.min(c.balance + interest, minCandidate));

        const payment = dueNow;
        remaining -= payment;

        const principal = Math.max(0, payment - interest);
        c.balance = Math.max(0, c.balance - principal);

        c.totalInterest += interest;
        c.totalPaid += payment;
        totalInterestAll += interest;
        totalPaidAll += payment;

        monthData.items.push({
          name: c.name,
          minPay: payment,
          extra: 0,
          endBal: c.balance
        });
        monthData.interest += interest;
        monthData.spend += payment;
      }

      // Step 2: Allocate extra to highest priority card
      while (remaining > 0.000001 && alive().length) {
        const ordered = alive().slice().sort((a, b) => {
          const ka = sortKey(a);
          const kb = sortKey(b);
          if (ka < kb) return -1;
          if (ka > kb) return 1;
          return strategy === "avalanche" ? (a.balance - b.balance) : (b.apr - a.apr);
        });

        const target = ordered[0];
        const pay = Math.min(remaining, target.balance);
        target.balance = Math.max(0, target.balance - pay);
        target.totalPaid += pay;
        totalPaidAll += pay;
        remaining -= pay;

        const item = monthData.items.find(x => x.name === target.name);
        if (item) {
          item.extra += pay;
          item.endBal = target.balance;
        }
        monthData.spend += pay;

        if (target.balance <= 0.000001 && target.paidOffMonth === null) {
          target.paidOffMonth = month;
        }
      }

      monthData.totalBalance = cardsCopy.reduce((s, c) => s + c.balance, 0);
      schedule.push(monthData);

      // Cleanup rounding errors
      for (const c of cardsCopy) {
        if (c.balance < 0.005) c.balance = 0;
      }
    }

    return {
      months: month,
      totalInterestAll,
      totalPaidAll,
      cards: cardsCopy.map(c => ({
        name: c.name,
        paidOffMonth: c.paidOffMonth,
        totalInterest: c.totalInterest,
        totalPaid: c.totalPaid
      })),
      schedule
    };
  };

  const handleSimulate = () => {
    const res = simulateDebtPaydown();
    if (res) {
      setResult(res);
      toast.success("Simulation complete!");
    }
  };

  const loadDemo = () => {
    setCards([
      { id: "1", name: "Card A", balance: 2400, apr: 24.9, minPct: 2, floorMin: 25 },
      { id: "2", name: "Card B", balance: 1200, apr: 29.9, minPct: 2, floorMin: 25 },
      { id: "3", name: "Card C", balance: 800, apr: 19.9, minPct: 2, floorMin: 25 }
    ]);
    setBudget("400");
    setStrategy("avalanche");
    toast.success("Demo data loaded");
  };

  const downloadCSV = () => {
    if (!result || !result.schedule.length) {
      toast.error("Run simulation first");
      return;
    }

    let csv = "Month,Total Spend,Total Interest,Total Balance";
    const names = [...new Set(result.schedule.flatMap(r => r.items.map(i => i.name)))];
    for (const n of names) {
      csv += `,${n} Min,${n} Extra,${n} Balance`;
    }
    csv += "\n";

    for (const r of result.schedule) {
      const line = [r.month, r.spend.toFixed(2), r.interest.toFixed(2), r.totalBalance.toFixed(2)];
      const map = Object.fromEntries(r.items.map(i => [i.name, i]));
      for (const n of names) {
        const it = map[n] || { minPay: 0, extra: 0, endBal: 0 };
        line.push(it.minPay.toFixed(2), it.extra.toFixed(2), it.endBal.toFixed(2));
      }
      csv += line.join(",") + "\n";
    }

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "debt_paydown_schedule.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("CSV downloaded");
  };

  const solveForTarget = () => {
    const targetStr = prompt("Target months to be debt-free (e.g., 36):");
    const target = parseInt(targetStr || "", 10);
    if (!target || target < 1) return;

    const daysNum = parseInt(days);
    let lower = cards.reduce((s, c) => {
      const iM = monthlyRate(c.apr / 100, daysNum);
      return s + Math.max(c.floorMin, (c.minPct / 100) * c.balance, c.balance * iM + 1);
    }, 0);
    let upper = cards.reduce((s, c) => s + c.balance, 0) + 1000;

    let bestBudget = null;
    let iters = 0;

    const originalBudget = budget;
    while (iters++ < 40 && upper - lower > 0.01) {
      const mid = (lower + upper) / 2;
      setBudget(mid.toString());
      const res = simulateDebtPaydown();
      
      if (res && res.months <= target && res.months > 0) {
        bestBudget = mid;
        upper = mid;
      } else {
        lower = mid;
      }
    }

    if (bestBudget) {
      setBudget(Math.ceil(bestBudget).toString());
      const finalRes = simulateDebtPaydown();
      if (finalRes) setResult(finalRes);
      toast.success(`Budget adjusted to £${Math.ceil(bestBudget).toLocaleString()} for ~${target} months`);
    } else {
      setBudget(originalBudget);
      toast.error(`Couldn't reach ${target} months with reasonable budget`);
    }
  };

  const chartData = result?.schedule.slice(0, 200).map(s => ({
    month: s.month,
    balance: s.totalBalance
  })) || [];

  const seo = seoData['/finance/multi-card-payoff'];

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={`${window.location.origin}/finance/multi-card-payoff`}
      />
      <CalculatorLayout
        title="Multi-Card Credit Card Payoff Calculator"
        description="Pay off multiple credit cards faster with Snowball or Avalanche strategies"
      >
        <div className="grid gap-6">
          {/* Controls */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Strategy & Budget</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="strategy">Strategy</Label>
                  <Select value={strategy} onValueChange={(v: any) => setStrategy(v)}>
                    <SelectTrigger id="strategy">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="avalanche">Avalanche (highest APR first)</SelectItem>
                      <SelectItem value="snowball">Snowball (lowest balance first)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Monthly Budget (£)</Label>
                  <Input
                    id="budget"
                    type="number"
                    min="1"
                    step="1"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="days">Days per cycle</Label>
                  <Input
                    id="days"
                    type="number"
                    min="28"
                    max="31"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxMonths">Max months (safety)</Label>
                  <Input
                    id="maxMonths"
                    type="number"
                    min="12"
                    step="12"
                    value={maxMonths}
                    onChange={(e) => setMaxMonths(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button onClick={handleSimulate} className="gap-2">
                  Simulate
                </Button>
                <Button onClick={addCard} variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Card
                </Button>
                <Button onClick={loadDemo} variant="outline">
                  Load Demo
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                Minimum payment model: max(floor, min% × balance, interest + 1)
              </p>
            </CardContent>
          </Card>

          {/* Cards Table */}
          <Card className="border-secondary/20">
            <CardHeader>
              <CardTitle>Credit Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cards.map((card) => (
                  <div key={card.id} className="grid gap-3 sm:grid-cols-6 items-end p-4 bg-muted/30 rounded-lg border">
                    <div className="space-y-2 sm:col-span-1">
                      <Label className="text-xs">Name</Label>
                      <Input
                        value={card.name}
                        onChange={(e) => updateCard(card.id, "name", e.target.value)}
                        placeholder="Card name"
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-1">
                      <Label className="text-xs">Balance (£)</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={card.balance}
                        onChange={(e) => updateCard(card.id, "balance", parseFloat(e.target.value) || 0)}
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-1">
                      <Label className="text-xs">APR (%)</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={card.apr}
                        onChange={(e) => updateCard(card.id, "apr", parseFloat(e.target.value) || 0)}
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-1">
                      <Label className="text-xs">Min %</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={card.minPct}
                        onChange={(e) => updateCard(card.id, "minPct", parseFloat(e.target.value) || 0)}
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-1">
                      <Label className="text-xs">Min floor (£)</Label>
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        value={card.floorMin}
                        onChange={(e) => updateCard(card.id, "floorMin", parseFloat(e.target.value) || 0)}
                      />
                    </div>

                    <Button
                      onClick={() => removeCard(card.id)}
                      variant="destructive"
                      size="icon"
                      className="sm:col-span-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                {cards.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No cards added yet. Click "Add Card" to get started.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {result && (
            <>
              <Card className="border-accent/20">
                <CardHeader>
                  <CardTitle>Results Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                      <p className="text-sm text-muted-foreground mb-1">Total Months</p>
                      <p className="text-3xl font-bold text-primary">{result.months}</p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg border border-secondary/20">
                      <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
                      <p className="text-2xl font-bold text-secondary">£{result.totalInterestAll.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg border border-accent/20">
                      <p className="text-sm text-muted-foreground mb-1">Total Paid</p>
                      <p className="text-2xl font-bold text-accent">£{result.totalPaidAll.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3">Payoff Timeline</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.cards.map((c, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-2 bg-muted rounded-full text-sm border"
                        >
                          <span className="font-medium">{c.name}:</span>{" "}
                          <span className="text-muted-foreground">
                            {c.paidOffMonth ? `${c.paidOffMonth} mo` : "—"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis
                          dataKey="month"
                          label={{ value: "Month", position: "insideBottom", offset: -5 }}
                          className="text-xs"
                        />
                        <YAxis
                          label={{ value: "Balance (£)", angle: -90, position: "insideLeft" }}
                          className="text-xs"
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "0.5rem"
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="balance"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button onClick={downloadCSV} variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download CSV
                    </Button>
                    <Button onClick={solveForTarget} variant="outline" className="gap-2">
                      <Target className="h-4 w-4" />
                      Solve for Target
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Schedule Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Schedule (Sample)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Month</TableHead>
                          <TableHead className="text-right">Spend</TableHead>
                          <TableHead className="text-right">Interest</TableHead>
                          <TableHead className="text-right">Balance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {result.schedule.slice(0, 50).map((row, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{row.month}</TableCell>
                            <TableCell className="text-right">£{row.spend.toFixed(2)}</TableCell>
                            <TableCell className="text-right">£{row.interest.toFixed(2)}</TableCell>
                            <TableCell className="text-right">£{row.totalBalance.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  {result.schedule.length > 50 && (
                    <p className="text-sm text-muted-foreground mt-4 text-center">
                      Showing first 50 of {result.schedule.length} months. Download CSV for full schedule.
                    </p>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </CalculatorLayout>
    </>
  );
}
