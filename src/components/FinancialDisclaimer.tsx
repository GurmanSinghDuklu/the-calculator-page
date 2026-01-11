import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FinancialDisclaimerProps {
  type?: "investment" | "loan" | "retirement" | "general";
  className?: string;
}

export function FinancialDisclaimer({ type = "general", className }: FinancialDisclaimerProps) {
  const disclaimers = {
    investment: {
      title: "Investment Disclaimer",
      content: (
        <>
          <p className="font-serif text-base mb-2">Important Information</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Past performance does not indicate future returns</li>
            <li>Investment values can go down as well as up</li>
            <li>You may get back less than you originally invested</li>
            <li>This calculator provides estimates only and should not be considered financial advice</li>
            <li>Consult a qualified financial advisor before making investment decisions</li>
          </ul>
        </>
      )
    },
    loan: {
      title: "Loan Calculator Disclaimer",
      content: (
        <>
          <p className="font-serif text-base mb-2">Important Information</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Results are estimates based on the information you provide</li>
            <li>Actual loan terms may vary depending on your creditworthiness and lender</li>
            <li>Interest rates shown are for illustration purposes only</li>
            <li>Additional fees and charges may apply</li>
            <li>Always read the terms and conditions before committing to any loan</li>
          </ul>
        </>
      )
    },
    retirement: {
      title: "Retirement Planning Disclaimer",
      content: (
        <>
          <p className="font-serif text-base mb-2">Important Information</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>This calculator provides estimates based on assumptions about growth rates and inflation</li>
            <li>Actual returns may differ significantly from projections</li>
            <li>Past performance is not a reliable indicator of future results</li>
            <li>Tax rules and state pension amounts may change over time</li>
            <li>Consider seeking professional financial advice for retirement planning</li>
            <li>Pension regulations vary by country - ensure you understand the rules applicable to you</li>
          </ul>
        </>
      )
    },
    general: {
      title: "Financial Calculator Disclaimer",
      content: (
        <>
          <p className="font-serif text-base mb-2">Important Information</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>This calculator provides estimates for informational purposes only</li>
            <li>Results are based on the information you enter and may not reflect your actual circumstances</li>
            <li>This is not financial advice - consult a qualified professional for personalized guidance</li>
            <li>Rates, fees, and regulations may vary by location and change over time</li>
            <li>Always verify calculations and seek professional advice before making financial decisions</li>
          </ul>
        </>
      )
    }
  };

  const disclaimer = disclaimers[type];

  return (
    <Alert className={className}>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        {disclaimer.content}
      </AlertDescription>
    </Alert>
  );
}
