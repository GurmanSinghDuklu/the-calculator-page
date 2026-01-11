import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";

const DiscountCalculator = () => {
  const [originalPrice, setOriginalPrice] = useState("100");
  const [discountPercent, setDiscountPercent] = useState("20");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [result, setResult] = useState<{
    finalPrice: number;
    savings: number;
  } | null>(null);

  const calculateDiscount = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent);

    if (isNaN(price) || isNaN(discount) || price <= 0 || discount < 0) {
      return;
    }

    const savings = (price * discount) / 100;
    const finalPrice = price - savings;

    setResult({
      finalPrice: Math.round(finalPrice * 100) / 100,
      savings: Math.round(savings * 100) / 100,
    });
  };

  return (
    <>
      <SEO 
        title="Discount Calculator - Calculate Sale Price & Savings"
        description="Free discount calculator to find sale prices and savings. Calculate percentage discounts instantly."
        keywords="discount calculator, sale price calculator, percentage off calculator, discount percentage calculator"
      />
      <CalculatorLayout
        title="Discount Calculator"
        description="Calculate sale prices and total savings on discounted items"
      >
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Price Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />

            <div className="space-y-2">
              <Label htmlFor="originalPrice">Original Price ({currencies[currency].symbol})</Label>
              <Input
                id="originalPrice"
                type="number"
                step="0.01"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountPercent">Discount (%)</Label>
              <Input
                id="discountPercent"
                type="number"
                step="0.1"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                placeholder="20"
              />
            </div>

            <Button onClick={calculateDiscount} className="w-full">
              Calculate Discount
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle>Sale Price</CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-6">
                <div className="p-4 bg-card rounded-lg border-2 border-primary">
                  <p className="text-sm text-muted-foreground mb-1">Final Price</p>
                  <p className="text-4xl font-bold text-primary">
                    {currencies[currency].symbol}{result.finalPrice.toLocaleString()}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                    <span className="text-muted-foreground">Original Price</span>
                    <span className="font-semibold line-through">
                      {currencies[currency].symbol}{parseFloat(originalPrice).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                    <span className="text-muted-foreground">You Save</span>
                    <span className="font-semibold text-accent text-lg">
                      {currencies[currency].symbol}{result.savings.toLocaleString()} ({discountPercent}%)
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                    <span className="text-muted-foreground">Discount Applied</span>
                    <span className="font-semibold">{discountPercent}% OFF</span>
                  </div>
                </div>

                <div className="p-4 bg-accent/10 rounded-lg border border-accent">
                  <p className="text-sm font-medium text-center">
                    🎉 You're saving {((result.savings / parseFloat(originalPrice)) * 100).toFixed(1)}% on this purchase!
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>Enter price and discount to see your savings</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
    </>
  );
};

export default DiscountCalculator;
