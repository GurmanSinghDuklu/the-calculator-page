import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SEO } from "@/components/SEO";
import { NavigationMenu } from "@/components/NavigationMenu";
import Footer from "@/components/Footer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Cookies = () => {
  return (
    <>
      <SEO
        title="Cookie Policy - The Calculator Page"
        description="Learn about how The Calculator Page uses cookies. We use minimal cookies solely for analytics and improving user experience."
        keywords="cookie policy, cookies, tracking, analytics, privacy"
        canonicalUrl="https://thecalculatorpage.lovable.app/cookies"
      />

      <div className="min-h-screen bg-background">
        <NavigationMenu />

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <Link to="/home" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <article className="prose prose-slate dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold text-foreground mb-2">Cookie Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">What Are Cookies?</h2>
              <p className="text-muted-foreground mb-4">
                Cookies are small text files that are stored on your device when you visit a website. They are widely 
                used to make websites work more efficiently and to provide information to website owners.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Our Cookie Use</h2>
              <p className="text-muted-foreground mb-4">
                The Calculator Page uses minimal cookies. We believe in privacy-first design, so we limit cookie usage 
                to only what's necessary for basic analytics and site functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Types of Cookies We Use</h2>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cookie Type</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Duration</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Essential</TableCell>
                      <TableCell>Required for the website to function properly (e.g., remembering preferences)</TableCell>
                      <TableCell>Session</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Analytics</TableCell>
                      <TableCell>Help us understand how visitors interact with our website (anonymized)</TableCell>
                      <TableCell>Up to 12 months</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Preferences</TableCell>
                      <TableCell>Remember your settings like dark mode or currency preferences</TableCell>
                      <TableCell>Up to 12 months</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">What We Don't Use Cookies For</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Advertising:</strong> We do not use advertising cookies or show personalized ads</li>
                <li><strong>Cross-site tracking:</strong> We do not track you across other websites</li>
                <li><strong>Personal data collection:</strong> Our cookies contain no personal information</li>
                <li><strong>Selling data:</strong> We never sell cookie data to third parties</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Cookies</h2>
              <p className="text-muted-foreground mb-4">
                We may use the following third-party services that set their own cookies:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Analytics providers:</strong> To help us understand site usage patterns (anonymized data only)</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                These third parties have their own privacy policies governing their use of cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Managing Cookies</h2>
              <p className="text-muted-foreground mb-4">
                You have full control over cookies. You can:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Block all cookies:</strong> Through your browser settings (note: this may affect site functionality)</li>
                <li><strong>Delete existing cookies:</strong> Clear your browser's cookie storage at any time</li>
                <li><strong>Block third-party cookies:</strong> Most browsers allow you to block cookies from third-party sites</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">How to Manage Cookies in Popular Browsers</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                <li><strong>Edge:</strong> Settings → Privacy, Search, and Services → Cookies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Calculator Functionality Without Cookies</h2>
              <p className="text-muted-foreground">
                All our calculators work fully without cookies. Blocking cookies will not prevent you from using any 
                calculator on our site. The only features that may be affected are preference persistence (like 
                remembering your preferred currency) and site analytics.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Cookie Policy from time to time. Any changes will be posted on this page with an 
                updated revision date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about our use of cookies, please contact us at:{" "}
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

export default Cookies;