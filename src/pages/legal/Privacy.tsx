import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SEO } from "@/components/SEO";
import { NavigationMenu } from "@/components/NavigationMenu";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <>
      <SEO
        title="Privacy Policy - The Calculator Page"
        description="Learn how The Calculator Page protects your privacy. We don't collect, store, or sell your personal data."
        keywords="privacy policy, data protection, GDPR, CCPA, privacy"
        canonicalUrl="https://thecalculatorpage.lovable.app/privacy"
      />

      <div className="min-h-screen bg-background">
        <NavigationMenu />

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <Link to="/home" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <article className="prose prose-slate dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Our Commitment to Privacy</h2>
              <p className="text-muted-foreground mb-4">
                We value your privacy. <strong>The Calculator Page does not store, collect, or sell any personal data</strong> entered 
                into our calculators. All calculations are performed entirely within your browser (client-side), meaning 
                your financial information never leaves your device.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Don't Collect</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Personal financial data entered into calculators</li>
                <li>Names, addresses, or contact information (unless you email us directly)</li>
                <li>Bank account or credit card details</li>
                <li>Location data beyond general geographic region for analytics</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Information We May Collect</h2>
              <p className="text-muted-foreground mb-4">
                We use minimal, privacy-respecting analytics to understand how our site is used and to improve the user experience:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Anonymous usage data:</strong> Page views, calculator usage frequency, and general traffic patterns</li>
                <li><strong>Technical data:</strong> Browser type, device type, and screen resolution for optimization</li>
                <li><strong>Geographic region:</strong> Country-level location for understanding our audience</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                This data is aggregated and anonymized—it cannot be used to identify individual users.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Cookies</h2>
              <p className="text-muted-foreground mb-4">
                We use minimal cookies to analyze site traffic and improve user experience. These cookies:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Do not track you across other websites</li>
                <li>Do not contain any personal information</li>
                <li>Can be blocked by your browser without affecting calculator functionality</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                For more details, see our <Link to="/cookies" className="text-primary hover:underline">Cookie Policy</Link>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Services</h2>
              <p className="text-muted-foreground mb-4">
                We may use the following third-party services:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Analytics:</strong> Anonymous, aggregated traffic data</li>
                <li><strong>Hosting:</strong> Our hosting provider may collect server logs for security purposes</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                We do not share any data with advertisers or sell data to third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights (GDPR/CCPA)</h2>
              <p className="text-muted-foreground mb-4">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Right to Access:</strong> Request information about data we hold (note: we hold no personal data from calculator use)</li>
                <li><strong>Right to Deletion:</strong> Request deletion of any personal data</li>
                <li><strong>Right to Opt-Out:</strong> Disable cookies through your browser settings</li>
                <li><strong>Right to Non-Discrimination:</strong> We will not treat you differently for exercising your rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Data Security</h2>
              <p className="text-muted-foreground mb-4">
                Since calculations happen entirely in your browser:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Your financial data is never transmitted to our servers</li>
                <li>There is no database of user calculations to breach</li>
                <li>Your data exists only in your browser's memory and is cleared when you close the tab</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our service is designed for general audiences and is suitable for educational use. We do not knowingly 
                collect any personal information from children under 13. If you believe a child has provided us with 
                personal information, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this privacy policy from time to time. Any changes will be posted on this page with an 
                updated revision date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at:{" "}
                <a href="mailto:hello@thecalculatorpage.com" className="text-primary hover:underline">
                  hello@thecalculatorpage.com
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

export default Privacy;