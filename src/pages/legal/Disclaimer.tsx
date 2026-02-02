import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SEO } from "@/components/SEO";
import { NavigationMenu } from "@/components/NavigationMenu";
import Footer from "@/components/Footer";

const Disclaimer = () => {
  return (
    <>
      <SEO
        title="Disclaimer - The Calculator Page"
        description="Important disclaimer about the use of calculators on The Calculator Page. Results are for informational purposes only."
        keywords="disclaimer, financial disclaimer, calculator accuracy, legal notice"
        canonicalUrl="https://thecalculatorpage.lovable.app/disclaimer"
      />

      <div className="min-h-screen bg-background">
        <NavigationMenu />

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <Link to="/home" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <article className="prose prose-slate dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold text-foreground mb-2">Disclaimer</h1>
            <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

            {/* Important Notice */}
            <Alert className="mb-8 border-amber-500/50 bg-amber-500/10">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <AlertTitle className="text-foreground font-semibold">Important Notice</AlertTitle>
              <AlertDescription className="text-muted-foreground">
                The results provided by our calculators are for <strong>informational purposes only</strong> and do 
                not constitute professional financial advice. While we strive for 100% accuracy, we recommend 
                consulting with a qualified professional before making significant financial decisions.
              </AlertDescription>
            </Alert>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">General Information Only</h2>
              <p className="text-muted-foreground mb-4">
                The information and calculator tools provided on The Calculator Page are intended for general 
                informational and educational purposes only. They are not intended to be, and should not be 
                construed as:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Financial advice or recommendations</li>
                <li>Legal advice</li>
                <li>Tax advice or tax return preparation</li>
                <li>Investment advice or securities recommendations</li>
                <li>Professional advice of any kind</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Accuracy of Calculations</h2>
              <p className="text-muted-foreground mb-4">
                While we make every effort to ensure the accuracy of our calculators:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Results are <strong>estimates</strong> based on the information you provide</li>
                <li>Actual results may differ due to factors not accounted for in the calculations</li>
                <li>Tax rates, interest rates, and other financial variables change over time</li>
                <li>Regional variations in laws, taxes, and regulations may affect accuracy</li>
                <li>Rounding and mathematical approximations may cause minor discrepancies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">No Professional Relationship</h2>
              <p className="text-muted-foreground">
                Use of The Calculator Page does not create a professional-client relationship of any kind. 
                We do not provide personalized advice, and our tools cannot account for your unique financial 
                situation, goals, or circumstances.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Consult Qualified Professionals</h2>
              <p className="text-muted-foreground mb-4">
                Before making any significant financial decisions, we strongly recommend consulting with:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Financial Advisors:</strong> For investment and financial planning decisions</li>
                <li><strong>Mortgage Brokers:</strong> For home loan and mortgage decisions</li>
                <li><strong>Accountants:</strong> For tax planning and accounting matters</li>
                <li><strong>Solicitors:</strong> For legal matters and contracts</li>
                <li><strong>Estate Planners:</strong> For inheritance and estate planning</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">No Warranty</h2>
              <p className="text-muted-foreground mb-4">
                The Calculator Page provides its tools and content "as is" and "as available" without any 
                warranties, express or implied. We do not warrant that:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>The calculations will be error-free or uninterrupted</li>
                <li>The results will be accurate for your specific situation</li>
                <li>The tools will meet your specific requirements</li>
                <li>Any errors will be corrected</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground">
                To the maximum extent permitted by applicable law, The Calculator Page and its operators 
                shall not be liable for any direct, indirect, incidental, consequential, special, or 
                exemplary damages arising from your use of or reliance on any calculator results or 
                content on this website. This includes, but is not limited to, damages for loss of 
                profits, savings, or other financial losses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Educational Purpose</h2>
              <p className="text-muted-foreground">
                Our calculators and educational content are designed to help you understand financial 
                concepts and explore different scenarios. They should be used as learning tools and 
                starting points for further research, not as the sole basis for financial decisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to This Disclaimer</h2>
              <p className="text-muted-foreground">
                We may update this disclaimer from time to time. Any changes will be posted on this page 
                with an updated revision date. Your continued use of the Website after changes constitutes 
                acceptance of the updated disclaimer.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Questions</h2>
              <p className="text-muted-foreground">
                If you have any questions about this disclaimer, please contact us at:{" "}
                <a href="mailto:thecalculatorpage@gmail.com" className="text-primary hover:underline">
                  thecalculatorpage@gmail.com
                </a>
              </p>
            </section>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Disclaimer;