import { useState, useEffect } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SEO } from "@/components/SEO";
import { Home, Building2, TrendingUp, Calculator, Info, PoundSterling } from "lucide-react";

type BuyerType = "first-time" | "home-mover" | "additional";

interface TaxBand {
  from: number;
  to: number | null;
  rate: number;
  taxableSum: number;
  tax: number;
}

interface CalculationResult {
  totalTax: number;
  effectiveRate: number;
  bands: TaxBand[];
}

// UK Stamp Duty rates effective from 1st April 2025
const STAMP_DUTY_RATES = {
  "first-time": {
    // First time buyers get relief up to £300k (0%), then 5% from £300k-£500k
    // If property > £500k, they lose FTB relief and pay standard rates
    thresholdForRelief: 500000,
    bands: [
      { from: 0, to: 300000, rate: 0 },
      { from: 300000, to: 500000, rate: 5 },
    ],
    // If over £500k, use standard rates
    standardBands: [
      { from: 0, to: 125000, rate: 0 },
      { from: 125000, to: 250000, rate: 2 },
      { from: 250000, to: 925000, rate: 5 },
      { from: 925000, to: 1500000, rate: 10 },
      { from: 1500000, to: null, rate: 12 },
    ],
  },
  "home-mover": {
    bands: [
      { from: 0, to: 125000, rate: 0 },
      { from: 125000, to: 250000, rate: 2 },
      { from: 250000, to: 925000, rate: 5 },
      { from: 925000, to: 1500000, rate: 10 },
      { from: 1500000, to: null, rate: 12 },
    ],
  },
  "additional": {
    // Additional property rates (Buy to Let / Second Homes) - 5% surcharge
    bands: [
      { from: 0, to: 125000, rate: 5 },
      { from: 125000, to: 250000, rate: 7 },
      { from: 250000, to: 925000, rate: 10 },
      { from: 925000, to: 1500000, rate: 15 },
      { from: 1500000, to: null, rate: 17 },
    ],
  },
};

const calculateStampDuty = (
  propertyPrice: number,
  buyerType: BuyerType
): CalculationResult => {
  if (propertyPrice <= 0) {
    return { totalTax: 0, effectiveRate: 0, bands: [] };
  }

  let bands: { from: number; to: number | null; rate: number }[];

  if (buyerType === "first-time") {
    // First time buyers lose relief if property > £500k
    if (propertyPrice > STAMP_DUTY_RATES["first-time"].thresholdForRelief) {
      bands = STAMP_DUTY_RATES["first-time"].standardBands;
    } else {
      bands = STAMP_DUTY_RATES["first-time"].bands;
    }
  } else {
    bands = STAMP_DUTY_RATES[buyerType].bands;
  }

  const calculatedBands: TaxBand[] = [];
  let totalTax = 0;
  let remainingValue = propertyPrice;

  for (const band of bands) {
    const bandStart = band.from;
    const bandEnd = band.to ?? Infinity;

    if (remainingValue <= 0 || propertyPrice <= bandStart) {
      calculatedBands.push({
        from: band.from,
        to: band.to,
        rate: band.rate,
        taxableSum: 0,
        tax: 0,
      });
      continue;
    }

    const taxableInBand = Math.min(
      Math.max(0, propertyPrice - bandStart),
      bandEnd - bandStart
    );
    const actualTaxable = Math.min(taxableInBand, remainingValue);
    const taxForBand = actualTaxable * (band.rate / 100);

    calculatedBands.push({
      from: band.from,
      to: band.to,
      rate: band.rate,
      taxableSum: actualTaxable,
      tax: taxForBand,
    });

    totalTax += taxForBand;
    remainingValue -= actualTaxable;
  }

  const effectiveRate = propertyPrice > 0 ? (totalTax / propertyPrice) * 100 : 0;

  return { totalTax, effectiveRate, bands: calculatedBands };
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatBandRange = (from: number, to: number | null): string => {
  if (to === null) {
    return `Over ${formatCurrency(from)}`;
  }
  if (from === 0) {
    return `Up to ${formatCurrency(to)}`;
  }
  return `${formatCurrency(from)} - ${formatCurrency(to)}`;
};

const StampDutyCalculator = () => {
  const [buyerType, setBuyerType] = useState<BuyerType>("first-time");
  const [propertyPrice, setPropertyPrice] = useState<string>("350000");
  const [result, setResult] = useState<CalculationResult | null>(null);

  useEffect(() => {
    const price = parseFloat(propertyPrice) || 0;
    const calculation = calculateStampDuty(price, buyerType);
    setResult(calculation);
  }, [propertyPrice, buyerType]);

  const handleCalculate = () => {
    const price = parseFloat(propertyPrice) || 0;
    const calculation = calculateStampDuty(price, buyerType);
    setResult(calculation);
  };

  const getBuyerTypeInfo = (type: BuyerType) => {
    switch (type) {
      case "first-time":
        return {
          title: "First Time Buyer",
          icon: Home,
          description:
            "First time buyers benefit from stamp duty relief. No tax on properties up to £300,000, and 5% on the portion between £300,000 and £500,000. Properties over £500,000 pay standard rates.",
        };
      case "home-mover":
        return {
          title: "Home Mover",
          icon: Building2,
          description:
            "Standard stamp duty rates apply for home movers. No tax on the first £125,000, then graduated rates apply on the remaining value.",
        };
      case "additional":
        return {
          title: "Buy to Let / Additional Property",
          icon: TrendingUp,
          description:
            "A 5% surcharge applies to all purchases of additional properties, including buy-to-let investments and second homes.",
        };
    }
  };

  const currentInfo = getBuyerTypeInfo(buyerType);
  const price = parseFloat(propertyPrice) || 0;
  const showFTBWarning =
    buyerType === "first-time" &&
    price > STAMP_DUTY_RATES["first-time"].thresholdForRelief;

  return (
    <>
      <SEO
        title="UK Stamp Duty Calculator - Calculate SDLT Tax"
        description="Free UK stamp duty calculator for 2025. Calculate SDLT for first time buyers, home movers, and buy to let properties in England and Northern Ireland."
        keywords="stamp duty calculator, SDLT calculator, UK stamp duty, first time buyer stamp duty, buy to let stamp duty, property tax calculator"
        canonicalUrl="https://thecalculatorpage.com/finance/stamp-duty"
      />
      <CalculatorLayout
        title="UK Stamp Duty Calculator"
        description="Calculate Stamp Duty Land Tax (SDLT) for residential properties in England and Northern Ireland. Updated with rates effective from 1st April 2025."
      >
        <div className="space-y-6">
          {/* Tabs for buyer type */}
          <Tabs
            value={buyerType}
            onValueChange={(value) => setBuyerType(value as BuyerType)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 h-auto">
              <TabsTrigger
                value="first-time"
                className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-3 px-2 text-xs sm:text-sm"
              >
                <Home className="h-4 w-4" />
                <span>First Time Buyer</span>
              </TabsTrigger>
              <TabsTrigger
                value="home-mover"
                className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-3 px-2 text-xs sm:text-sm"
              >
                <Building2 className="h-4 w-4" />
                <span>Home Mover</span>
              </TabsTrigger>
              <TabsTrigger
                value="additional"
                className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-3 px-2 text-xs sm:text-sm"
              >
                <TrendingUp className="h-4 w-4" />
                <span>Buy to Let</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={buyerType} className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Input Card */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <currentInfo.icon className="h-5 w-5 text-brand-gold" />
                      {currentInfo.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {currentInfo.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="propertyPrice" className="text-sm font-medium">
                        Property Purchase Price
                      </Label>
                      <div className="relative">
                        <PoundSterling className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="propertyPrice"
                          type="number"
                          value={propertyPrice}
                          onChange={(e) => setPropertyPrice(e.target.value)}
                          className="pl-9"
                          placeholder="Enter property price"
                          min="0"
                        />
                      </div>
                    </div>

                    <Button onClick={handleCalculate} className="w-full">
                      <Calculator className="mr-2 h-4 w-4" />
                      Calculate Stamp Duty
                    </Button>

                    {showFTBWarning && (
                      <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
                        <p className="text-sm text-amber-800 dark:text-amber-200 flex items-start gap-2">
                          <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>
                            First time buyer relief is only available for properties up to
                            £500,000. Standard rates apply for this purchase.
                          </span>
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Results Card */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Stamp Duty to Pay</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {result && (
                      <div className="space-y-4">
                        <div className="text-center p-6 bg-muted rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">
                            Total Stamp Duty
                          </p>
                          <p className="text-4xl font-serif font-semibold text-foreground">
                            {formatCurrency(result.totalTax)}
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Effective rate:{" "}
                            <span className="font-medium">
                              {result.effectiveRate.toFixed(2)}%
                            </span>
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Property Price</span>
                            <span className="font-medium">{formatCurrency(price)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Stamp Duty</span>
                            <span className="font-medium">
                              {formatCurrency(result.totalTax)}
                            </span>
                          </div>
                          <hr className="my-2" />
                          <div className="flex justify-between text-sm font-semibold">
                            <span>Total Cost</span>
                            <span>{formatCurrency(price + result.totalTax)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Tax Bands Breakdown */}
              {result && result.bands.length > 0 && (
                <Card className="mt-6 shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Tax Band Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-2 font-medium text-muted-foreground">
                              Tax Band
                            </th>
                            <th className="text-right py-3 px-2 font-medium text-muted-foreground">
                              Rate
                            </th>
                            <th className="text-right py-3 px-2 font-medium text-muted-foreground">
                              Taxable Sum
                            </th>
                            <th className="text-right py-3 px-2 font-medium text-muted-foreground">
                              Tax
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.bands.map((band, index) => (
                            <tr key={index} className="border-b last:border-b-0">
                              <td className="py-3 px-2">
                                {formatBandRange(band.from, band.to)}
                              </td>
                              <td className="text-right py-3 px-2">{band.rate}%</td>
                              <td className="text-right py-3 px-2">
                                {formatCurrency(band.taxableSum)}
                              </td>
                              <td className="text-right py-3 px-2 font-medium">
                                {formatCurrency(band.tax)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="bg-muted/50">
                            <td
                              colSpan={3}
                              className="py-3 px-2 font-semibold text-right"
                            >
                              Total SDLT
                            </td>
                            <td className="text-right py-3 px-2 font-semibold">
                              {formatCurrency(result.totalTax)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          {/* Information Section */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">About UK Stamp Duty (SDLT)</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                Stamp Duty Land Tax (SDLT) is a tax paid when purchasing property or land
                in England and Northern Ireland. The rates shown are effective from 1st
                April 2025.
              </p>

              <h4 className="font-semibold text-foreground mt-4 mb-2">
                First Time Buyers
              </h4>
              <p>
                First time buyers benefit from stamp duty relief on properties up to
                £500,000. No tax is payable on the first £300,000, with 5% charged on the
                portion between £300,000 and £500,000. Properties over £500,000 are
                subject to standard rates.
              </p>

              <h4 className="font-semibold text-foreground mt-4 mb-2">Home Movers</h4>
              <p>
                Standard rates apply for home movers replacing their main residence. The
                nil rate band is £125,000, with graduated rates applying above this
                threshold.
              </p>

              <h4 className="font-semibold text-foreground mt-4 mb-2">
                Additional Properties
              </h4>
              <p>
                A 5% surcharge applies to purchases of additional residential properties,
                including buy-to-let investments and second homes. This is added to the
                standard rates.
              </p>

              <p className="text-xs mt-4 italic">
                Note: This calculator is for freehold residential properties in England
                and Northern Ireland only. Different rules apply in Scotland (LBTT) and
                Wales (LTT). Always consult a professional for specific advice.
              </p>
            </CardContent>
          </Card>
        </div>
      </CalculatorLayout>
    </>
  );
};

export default StampDutyCalculator;
