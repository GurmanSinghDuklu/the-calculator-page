import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SEO } from "@/components/SEO";

type Country = "UK" | "US";
type FilingStatus = "single" | "married_joint" | "married_separate" | "head_household";

const SalaryCalculator = () => {
  const [salary, setSalary] = useState<string>("50000");
  const [period, setPeriod] = useState<string>("yearly");
  const [country, setCountry] = useState<Country>("UK");
  const [taxCode, setTaxCode] = useState<string>("1257L");
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [state, setState] = useState<string>("none");

  // UK Tax Rates 2024/25
  const ukPersonalAllowance = 12570;
  const ukBasicRateThreshold = 50270;
  const ukHigherRateThreshold = 125140;

  // US Federal Tax Rates 2024 (Single)
  const usTaxBrackets = {
    single: [
      { min: 0, max: 11600, rate: 0.10 },
      { min: 11600, max: 47150, rate: 0.12 },
      { min: 47150, max: 100525, rate: 0.22 },
      { min: 100525, max: 191950, rate: 0.24 },
      { min: 191950, max: 243725, rate: 0.32 },
      { min: 243725, max: 609350, rate: 0.35 },
      { min: 609350, max: Infinity, rate: 0.37 },
    ],
    married_joint: [
      { min: 0, max: 23200, rate: 0.10 },
      { min: 23200, max: 94300, rate: 0.12 },
      { min: 94300, max: 201050, rate: 0.22 },
      { min: 201050, max: 383900, rate: 0.24 },
      { min: 383900, max: 487450, rate: 0.32 },
      { min: 487450, max: 731200, rate: 0.35 },
      { min: 731200, max: Infinity, rate: 0.37 },
    ],
    married_separate: [
      { min: 0, max: 11600, rate: 0.10 },
      { min: 11600, max: 47150, rate: 0.12 },
      { min: 47150, max: 100525, rate: 0.22 },
      { min: 100525, max: 191950, rate: 0.24 },
      { min: 191950, max: 243725, rate: 0.32 },
      { min: 243725, max: 365600, rate: 0.35 },
      { min: 365600, max: Infinity, rate: 0.37 },
    ],
    head_household: [
      { min: 0, max: 16550, rate: 0.10 },
      { min: 16550, max: 63100, rate: 0.12 },
      { min: 63100, max: 100500, rate: 0.22 },
      { min: 100500, max: 191950, rate: 0.24 },
      { min: 191950, max: 243700, rate: 0.32 },
      { min: 243700, max: 609350, rate: 0.35 },
      { min: 609350, max: Infinity, rate: 0.37 },
    ],
  };

  const usStandardDeduction = {
    single: 14600,
    married_joint: 29200,
    married_separate: 14600,
    head_household: 21900,
  };

  // State tax rates (simplified flat rates for major states)
  const stateTaxRates: Record<string, number> = {
    none: 0,
    CA: 0.0725, // California average
    NY: 0.0685, // New York average
    TX: 0,      // Texas - no income tax
    FL: 0,      // Florida - no income tax
    WA: 0,      // Washington - no income tax
    IL: 0.0495, // Illinois flat rate
    PA: 0.0307, // Pennsylvania flat rate
    OH: 0.04,   // Ohio average
    GA: 0.055,  // Georgia average
    NC: 0.0525, // North Carolina flat rate
  };

  const calculateUKTax = (annualSalary: number) => {
    let taxableIncome = Math.max(0, annualSalary - ukPersonalAllowance);
    
    if (annualSalary > 100000) {
      const reduction = Math.min(ukPersonalAllowance, (annualSalary - 100000) / 2);
      taxableIncome = annualSalary - (ukPersonalAllowance - reduction);
    }
    
    let incomeTax = 0;
    
    if (taxableIncome > 0) {
      const basicRateTax = Math.min(taxableIncome, ukBasicRateThreshold - ukPersonalAllowance) * 0.20;
      incomeTax += basicRateTax;
    }
    
    if (taxableIncome > (ukBasicRateThreshold - ukPersonalAllowance)) {
      const higherRateAmount = Math.min(
        taxableIncome - (ukBasicRateThreshold - ukPersonalAllowance),
        ukHigherRateThreshold - ukBasicRateThreshold
      );
      incomeTax += higherRateAmount * 0.40;
    }
    
    if (taxableIncome > (ukHigherRateThreshold - ukPersonalAllowance)) {
      const additionalRateAmount = taxableIncome - (ukHigherRateThreshold - ukPersonalAllowance);
      incomeTax += additionalRateAmount * 0.45;
    }
    
    let nationalInsurance = 0;
    const niThreshold = 12570;
    const niUpperLimit = 50270;
    
    if (annualSalary > niThreshold) {
      const niAtBasic = Math.min(annualSalary - niThreshold, niUpperLimit - niThreshold) * 0.12;
      nationalInsurance += niAtBasic;
      
      if (annualSalary > niUpperLimit) {
        nationalInsurance += (annualSalary - niUpperLimit) * 0.02;
      }
    }
    
    return { incomeTax, socialTax: nationalInsurance, socialTaxLabel: "National Insurance" };
  };

  const calculateUSTax = (annualSalary: number) => {
    const deduction = usStandardDeduction[filingStatus];
    const taxableIncome = Math.max(0, annualSalary - deduction);
    const brackets = usTaxBrackets[filingStatus];
    
    let federalTax = 0;
    let remainingIncome = taxableIncome;
    
    for (const bracket of brackets) {
      if (remainingIncome <= 0) break;
      const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
      federalTax += taxableInBracket * bracket.rate;
      remainingIncome -= taxableInBracket;
    }
    
    // FICA taxes (Social Security + Medicare)
    const socialSecurityRate = 0.062;
    const medicareRate = 0.0145;
    const socialSecurityWageBase = 168600;
    
    const socialSecurity = Math.min(annualSalary, socialSecurityWageBase) * socialSecurityRate;
    const medicare = annualSalary * medicareRate;
    const additionalMedicare = annualSalary > 200000 ? (annualSalary - 200000) * 0.009 : 0;
    
    const ficaTax = socialSecurity + medicare + additionalMedicare;
    
    // State tax
    const stateTax = annualSalary * (stateTaxRates[state] || 0);
    
    return { 
      incomeTax: federalTax + stateTax, 
      socialTax: ficaTax, 
      socialTaxLabel: "FICA (SS + Medicare)",
      federalTax,
      stateTax
    };
  };

  const calculateTax = () => {
    const annualSalary = parseFloat(salary) || 0;
    
    const taxResult = country === "UK" 
      ? calculateUKTax(annualSalary) 
      : calculateUSTax(annualSalary);
    
    const totalDeductions = taxResult.incomeTax + taxResult.socialTax;
    const netSalary = annualSalary - totalDeductions;
    
    return {
      gross: annualSalary,
      incomeTax: taxResult.incomeTax,
      socialTax: taxResult.socialTax,
      socialTaxLabel: taxResult.socialTaxLabel,
      federalTax: 'federalTax' in taxResult ? taxResult.federalTax : undefined,
      stateTax: 'stateTax' in taxResult ? taxResult.stateTax : undefined,
      totalDeductions,
      net: netSalary,
      monthly: netSalary / 12,
      weekly: netSalary / 52,
      daily: netSalary / 260
    };
  };

  const results = calculateTax();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(country === "UK" ? 'en-GB' : 'en-US', {
      style: 'currency',
      currency: country === "UK" ? 'GBP' : 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const currencySymbol = country === "UK" ? "£" : "$";

  return (
    <>
      <SEO
        title="Salary Calculator - Calculate Take Home Pay After Tax"
        description="Free salary calculator for 2024. Calculate your take-home pay after income tax deductions for UK and US. Get monthly, weekly and daily breakdowns."
        keywords="salary calculator, take home pay calculator, income tax calculator, net salary calculator, gross to net calculator"
        canonicalUrl="https://www.thecalculatorpage.com/finance/salary"
      />
      <CalculatorLayout
        title="Salary Calculator"
        description="Calculate your take-home pay after tax deductions"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Card */}
          <Card>
            <CardHeader>
              <CardTitle>Salary Details</CardTitle>
              <CardDescription>Enter your salary information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select value={country} onValueChange={(v) => setCountry(v as Country)}>
                  <SelectTrigger id="country">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UK">🇬🇧 United Kingdom</SelectItem>
                    <SelectItem value="US">🇺🇸 United States</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary">Annual Salary ({currencySymbol})</Label>
                <Input
                  id="salary"
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="50000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="period">Pay Period</Label>
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger id="period">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yearly">Yearly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {country === "UK" ? (
                <div className="space-y-2">
                  <Label htmlFor="taxCode">Tax Code (2024/25)</Label>
                  <Input
                    id="taxCode"
                    type="text"
                    value={taxCode}
                    onChange={(e) => setTaxCode(e.target.value)}
                    placeholder="1257L"
                  />
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="filingStatus">Filing Status</Label>
                    <Select value={filingStatus} onValueChange={(v) => setFilingStatus(v as FilingStatus)}>
                      <SelectTrigger id="filingStatus">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married_joint">Married Filing Jointly</SelectItem>
                        <SelectItem value="married_separate">Married Filing Separately</SelectItem>
                        <SelectItem value="head_household">Head of Household</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select value={state} onValueChange={setState}>
                      <SelectTrigger id="state">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No State Tax</SelectItem>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="TX">Texas (No Income Tax)</SelectItem>
                        <SelectItem value="FL">Florida (No Income Tax)</SelectItem>
                        <SelectItem value="WA">Washington (No Income Tax)</SelectItem>
                        <SelectItem value="IL">Illinois</SelectItem>
                        <SelectItem value="PA">Pennsylvania</SelectItem>
                        <SelectItem value="OH">Ohio</SelectItem>
                        <SelectItem value="GA">Georgia</SelectItem>
                        <SelectItem value="NC">North Carolina</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card>
            <CardHeader>
              <CardTitle>Take Home Pay</CardTitle>
              <CardDescription>Your net income breakdown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Gross Salary</span>
                  <span className="font-semibold">{formatCurrency(results.gross)}</span>
                </div>
                
                {country === "US" && typeof results.federalTax === 'number' && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Federal Tax</span>
                    <span className="text-destructive">-{formatCurrency(results.federalTax)}</span>
                  </div>
                )}
                
                {country === "US" && typeof results.stateTax === 'number' && results.stateTax > 0 && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">State Tax</span>
                    <span className="text-destructive">-{formatCurrency(results.stateTax)}</span>
                  </div>
                )}
                
                {country === "UK" && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Income Tax</span>
                    <span className="text-destructive">-{formatCurrency(results.incomeTax)}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">{results.socialTaxLabel}</span>
                  <span className="text-destructive">-{formatCurrency(results.socialTax)}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 bg-primary/5 px-3 rounded-lg">
                  <span className="font-semibold text-lg">Net Annual Salary</span>
                  <span className="font-bold text-lg text-primary">{formatCurrency(results.net)}</span>
                </div>

                <div className="pt-4 space-y-2 border-t">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Monthly</span>
                    <span className="font-medium">{formatCurrency(results.monthly)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Weekly</span>
                    <span className="font-medium">{formatCurrency(results.weekly)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Daily</span>
                    <span className="font-medium">{formatCurrency(results.daily)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>About {country === "UK" ? "UK" : "US"} Salary Tax Rates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {country === "UK" ? (
              <>
                <p className="text-sm text-muted-foreground">
                  This calculator uses the UK tax rates for the 2024/25 tax year:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Personal Allowance: £12,570 (tax-free)</li>
                  <li>Basic Rate (20%): £12,571 to £50,270</li>
                  <li>Higher Rate (40%): £50,271 to £125,140</li>
                  <li>Additional Rate (45%): Over £125,140</li>
                  <li>National Insurance: 12% on £12,571-£50,270, then 2% above</li>
                </ul>
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  This calculator uses the US federal tax rates for 2024:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Standard Deduction (Single): $14,600</li>
                  <li>Federal brackets: 10%, 12%, 22%, 24%, 32%, 35%, 37%</li>
                  <li>Social Security: 6.2% (up to $168,600)</li>
                  <li>Medicare: 1.45% (+ 0.9% above $200,000)</li>
                  <li>State taxes vary by location</li>
                </ul>
              </>
            )}
            <p className="text-xs text-muted-foreground mt-4">
              Note: This is a simplified calculation. Actual take-home pay may vary based on pension contributions, 
              {country === "UK" ? " student loans, tax codes," : " 401(k) contributions, health insurance,"} and other factors. 
              Consult {country === "UK" ? "HMRC" : "the IRS"} or a tax professional for accurate advice.
            </p>
          </CardContent>
        </Card>
      </CalculatorLayout>
    </>
  );
};

export default SalaryCalculator;
