import { SEO } from "@/components/SEO";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Formulas() {
  return (
    <>
      <SEO
        title="Calculator Formulas & Mathematical Reference Guide"
        description="Complete reference guide of all calculator formulas and mathematical equations. Learn the math behind compound interest, mortgage payments, loan calculations, and more."
        keywords="calculator formulas, mathematical formulas, compound interest formula, mortgage formula, loan payment formula, financial calculations"
      />
      <CalculatorLayout
        title="Calculator Formulas Reference"
        description="Complete mathematical formulas and equations for all calculators"
      >
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About This Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This comprehensive guide provides the mathematical formulas and equations used in all our calculators. 
                Understanding these formulas helps you verify calculations and apply them in your own financial planning.
              </p>
              <div className="mt-4">
                <Link to="/learn/calculator-formulas-guide">
                  <Button variant="outline">Read Our Complete Formula Guide</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="finance" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="finance">Finance</TabsTrigger>
              <TabsTrigger value="converters">Converters</TabsTrigger>
              <TabsTrigger value="misc">Miscellaneous</TabsTrigger>
            </TabsList>

            <TabsContent value="finance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Compound Interest Formula</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                    FV = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)]
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="font-serif text-base">Where:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li><strong>FV</strong> = Future Value</li>
                      <li><strong>P</strong> = Principal (initial investment)</li>
                      <li><strong>r</strong> = Annual interest rate (decimal)</li>
                      <li><strong>n</strong> = Number of times interest compounds per year</li>
                      <li><strong>t</strong> = Time in years</li>
                      <li><strong>PMT</strong> = Regular contribution amount</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Loan Payment Formula (Amortization)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                    M = P × [r(1 + r)^n] / [(1 + r)^n - 1]
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>Where:</strong></p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li><strong>M</strong> = Monthly payment</li>
                      <li><strong>P</strong> = Principal loan amount</li>
                      <li><strong>r</strong> = Monthly interest rate (annual rate / 12)</li>
                      <li><strong>n</strong> = Total number of payments (months)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>APY (Annual Percentage Yield) Formula</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                    APY = (1 + r/n)^n - 1
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>Where:</strong></p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li><strong>APY</strong> = Annual Percentage Yield</li>
                      <li><strong>r</strong> = Nominal annual interest rate (decimal)</li>
                      <li><strong>n</strong> = Number of compounding periods per year</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Simple Interest Formula</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                    I = P × r × t
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>Where:</strong></p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li><strong>I</strong> = Interest earned</li>
                      <li><strong>P</strong> = Principal amount</li>
                      <li><strong>r</strong> = Annual interest rate (decimal)</li>
                      <li><strong>t</strong> = Time in years</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mortgage Payment Formula</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                    M = L × [r(1 + r)^n] / [(1 + r)^n - 1] + T/12 + I/12
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>Where:</strong></p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li><strong>M</strong> = Total monthly payment</li>
                      <li><strong>L</strong> = Loan amount (home price - down payment)</li>
                      <li><strong>r</strong> = Monthly interest rate (annual rate / 12)</li>
                      <li><strong>n</strong> = Total number of payments (years × 12)</li>
                      <li><strong>T</strong> = Annual property tax</li>
                      <li><strong>I</strong> = Annual home insurance</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Retirement Savings Formula</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                    FV = P(1 + r)^t + C × [((1 + r)^t - 1) / r]
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>Where:</strong></p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li><strong>FV</strong> = Future value at retirement</li>
                      <li><strong>P</strong> = Current savings</li>
                      <li><strong>r</strong> = Annual return rate (decimal)</li>
                      <li><strong>t</strong> = Years until retirement</li>
                      <li><strong>C</strong> = Annual contribution</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Future House Value Formula</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                    FV = PV × (1 + g)^t
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>Where:</strong></p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li><strong>FV</strong> = Future property value</li>
                      <li><strong>PV</strong> = Present (current) value</li>
                      <li><strong>g</strong> = Annual growth rate (decimal)</li>
                      <li><strong>t</strong> = Time in years</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Credit Card Payoff Formula</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                    n = -log(1 - (B × r)/M) / log(1 + r)
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>Where:</strong></p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li><strong>n</strong> = Number of months to pay off</li>
                      <li><strong>B</strong> = Current balance</li>
                      <li><strong>r</strong> = Monthly interest rate (APR / 12)</li>
                      <li><strong>M</strong> = Monthly payment</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="converters" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Temperature Conversion Formulas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold mb-2">Celsius to Fahrenheit:</p>
                      <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                        °F = (°C × 9/5) + 32
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Fahrenheit to Celsius:</p>
                      <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                        °C = (°F - 32) × 5/9
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Celsius to Kelvin:</p>
                      <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                        K = °C + 273.15
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Length Conversion Formulas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold mb-2">Meters to Feet:</p>
                      <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                        feet = meters × 3.28084
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Kilometers to Miles:</p>
                      <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                        miles = kilometers × 0.621371
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Inches to Centimeters:</p>
                      <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                        cm = inches × 2.54
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weight Conversion Formulas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold mb-2">Kilograms to Pounds:</p>
                      <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                        lbs = kg × 2.20462
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Pounds to Kilograms:</p>
                      <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                        kg = lbs × 0.453592
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Ounces to Grams:</p>
                      <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                        g = oz × 28.3495
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="misc" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Percentage Calculation Formulas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold mb-2">Percentage of a Number:</p>
                      <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                        Result = (Percentage / 100) × Number
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Percentage Change:</p>
                      <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                        % Change = ((New - Old) / Old) × 100
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Percentage Increase:</p>
                      <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                        New Value = Old Value × (1 + Percentage/100)
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Discount Formula</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                    Final Price = Original Price × (1 - Discount%/100)
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>Savings Amount:</strong></p>
                    <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                      Savings = Original Price × (Discount%/100)
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tip Calculation Formula</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold mb-2">Tip Amount:</p>
                      <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                        Tip = Bill Amount × (Tip%/100)
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Total Amount:</p>
                      <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                        Total = Bill Amount + Tip
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Split Per Person:</p>
                      <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                        Per Person = Total / Number of People
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Age Calculation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                    Age = Current Year - Birth Year
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">
                      More precise calculation accounts for whether the birthday has occurred this year:
                    </p>
                    <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                      If (Current Month, Day) &lt; (Birth Month, Day): Age = Age - 1
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </CalculatorLayout>
    </>
  );
}
