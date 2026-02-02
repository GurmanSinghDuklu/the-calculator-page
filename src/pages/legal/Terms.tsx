import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SEO } from "@/components/SEO";
import { NavigationMenu } from "@/components/NavigationMenu";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <>
      <SEO
        title="Terms of Use - The Calculator Page"
        description="Terms and conditions for using The Calculator Page. Learn about acceptable use, intellectual property, and service availability."
        keywords="terms of use, terms and conditions, legal, acceptable use"
        canonicalUrl="https://thecalculatorpage.lovable.app/terms"
      />

      <div className="min-h-screen bg-background">
        <NavigationMenu />

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <Link to="/home" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <article className="prose prose-slate dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold text-foreground mb-2">Terms of Use</h1>
            <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Agreement to Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing and using The Calculator Page ("the Website"), you agree to be bound by these Terms of Use. 
                If you do not agree to these terms, please do not use our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Acceptable Use</h2>
              <p className="text-muted-foreground mb-4">
                You agree to use our website only for lawful purposes and in accordance with these Terms. You agree NOT to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Use the Website for any commercial purpose without our prior written consent</li>
                <li>Use automated systems, bots, scrapers, or similar tools to access or extract data from the Website</li>
                <li>Attempt to interfere with, compromise, or disrupt the Website's security or functionality</li>
                <li>Use the Website to transmit any malicious code, viruses, or harmful content</li>
                <li>Impersonate or misrepresent your affiliation with any person or entity</li>
                <li>Violate any applicable local, national, or international laws or regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Personal Use Only</h2>
              <p className="text-muted-foreground">
                By using this website, you agree to use our tools for <strong>personal, non-commercial use</strong>. 
                Automated scraping or "botting" of our calculation engines is strictly prohibited to maintain service 
                availability for all users.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                All content on The Calculator Page, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Text, graphics, logos, and images</li>
                <li>Calculator designs and user interfaces</li>
                <li>Software code and algorithms</li>
                <li>Educational content and guides</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                ...is the property of The Calculator Page or its licensors and is protected by copyright and other 
                intellectual property laws. You may not reproduce, distribute, modify, or create derivative works 
                without our express written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Calculator Results</h2>
              <p className="text-muted-foreground mb-4">
                The calculators provided on this website are for <strong>informational and educational purposes only</strong>. 
                While we strive for accuracy:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Results should not be considered as professional financial, legal, or tax advice</li>
                <li>Actual results may vary based on factors not accounted for in our calculations</li>
                <li>We recommend consulting with qualified professionals before making significant financial decisions</li>
                <li>We are not liable for any decisions made based on calculator results</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Service Availability</h2>
              <p className="text-muted-foreground mb-4">
                We aim to maintain high availability of our services, but we cannot guarantee uninterrupted access. We reserve the right to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Modify, suspend, or discontinue any part of the Website at any time</li>
                <li>Restrict access to some parts or all of the Website</li>
                <li>Perform maintenance that may temporarily affect availability</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                To the fullest extent permitted by law, The Calculator Page and its operators shall not be liable for:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                <li>Any loss of profits, data, use, goodwill, or other intangible losses</li>
                <li>Any damages resulting from your use or inability to use the Website</li>
                <li>Any errors or inaccuracies in calculator results</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to indemnify and hold harmless The Calculator Page and its operators from any claims, 
                damages, losses, liabilities, and expenses (including legal fees) arising from your use of the 
                Website or violation of these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Links</h2>
              <p className="text-muted-foreground">
                Our Website may contain links to third-party websites. We are not responsible for the content, 
                privacy policies, or practices of any third-party websites. Visiting these links is at your own risk.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately 
                upon posting to the Website. Your continued use of the Website after any changes constitutes acceptance 
                of the new Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms shall be governed by and construed in accordance with the laws of England and Wales, 
                without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Use, please contact us at:{" "}
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

export default Terms;