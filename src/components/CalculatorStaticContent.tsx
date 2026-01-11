import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, BookOpen, Calculator, CheckCircle } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface HowToStep {
  step: number;
  title: string;
  description: string;
}

interface CalculatorStaticContentProps {
  whatIs: {
    title: string;
    description: string;
  };
  howItWorks: {
    title: string;
    description: string;
    steps?: HowToStep[];
  };
  formula?: {
    title: string;
    formula: string;
    explanation: string;
  };
  faqs: FAQ[];
  tips?: string[];
}

export const CalculatorStaticContent = ({
  whatIs,
  howItWorks,
  formula,
  faqs,
  tips
}: CalculatorStaticContentProps) => {
  return (
    <div className="mt-12 space-y-8">
      {/* What Is Section */}
      <section className="prose prose-slate dark:prose-invert max-w-none">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              {whatIs.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {whatIs.description}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* How It Works Section */}
      <section className="prose prose-slate dark:prose-invert max-w-none">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              {howItWorks.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {howItWorks.description}
            </p>
            {howItWorks.steps && (
              <ol className="list-decimal list-inside space-y-3">
                {howItWorks.steps.map((step) => (
                  <li key={step.step} className="text-foreground">
                    <strong>{step.title}:</strong>{" "}
                    <span className="text-muted-foreground">{step.description}</span>
                  </li>
                ))}
              </ol>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Formula Section */}
      {formula && (
        <section className="prose prose-slate dark:prose-invert max-w-none">
          <Card>
            <CardHeader>
              <CardTitle>{formula.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg font-mono text-center text-lg">
                {formula.formula}
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {formula.explanation}
              </p>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Tips Section */}
      {tips && tips.length > 0 && (
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Tips & Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-primary font-bold">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      )}

      {/* FAQ Section */}
      <section className="prose prose-slate dark:prose-invert max-w-none">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
