import { Link } from "react-router-dom";
import { ArrowLeft, Calculator, Shield, Zap, Users, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { NavigationMenu } from "@/components/NavigationMenu";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <>
      <SEO
        title="About Us - The Calculator Page"
        description="Learn about The Calculator Page - our mission to provide free, accurate, and privacy-focused financial calculators and tools for everyone."
        keywords="about us, calculator page, financial tools, free calculators, mission"
        canonicalUrl="https://thecalculatorpage.lovable.app/about"
      />

      <div className="min-h-screen bg-background">
        <NavigationMenu />

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <Link to="/home" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <article className="prose prose-slate dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold text-foreground mb-6">About The Calculator Page</h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              We believe everyone deserves access to powerful financial tools without complexity, cost, or compromise on privacy. 
              The Calculator Page is your trusted companion for making informed financial decisions.
            </p>

            {/* Mission Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                To democratize financial literacy by providing free, accurate, and easy-to-use calculators that empower 
                individuals to understand and optimize their financial decisions. Whether you're planning a mortgage, 
                calculating compound interest, or simply splitting a bill, we're here to help.
              </p>
            </section>

            {/* Values Grid */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-6">What We Stand For</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-muted/30">
                  <CardContent className="p-6">
                    <Calculator className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Mathematical Precision</h3>
                    <p className="text-sm text-muted-foreground">
                      Every calculator is built using standardized industry formulas, verified against financial 
                      standards used by major institutions.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-muted/30">
                  <CardContent className="p-6">
                    <Shield className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Privacy First</h3>
                    <p className="text-sm text-muted-foreground">
                      Your data never leaves your device. All calculations are performed locally in your browser 
                      for maximum privacy and speed.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-muted/30">
                  <CardContent className="p-6">
                    <Zap className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Real-Time Results</h3>
                    <p className="text-sm text-muted-foreground">
                      Reactive state management provides instant results as you type, enabling "what-if" 
                      scenario testing in real-time.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-muted/30">
                  <CardContent className="p-6">
                    <Users className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Free For Everyone</h3>
                    <p className="text-sm text-muted-foreground">
                      No subscriptions, no paywalls, no hidden fees. Our core calculators will always be 
                      free to use for everyone.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* How It Works */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Transparency in Calculation</h2>
              <p className="text-muted-foreground mb-4">
                At The Calculator Page, we prioritize mathematical precision and financial transparency. Our tools 
                are built using standardized industry formulas (such as the <strong>Standard Annuity Formula</strong> for 
                mortgages and <strong>Compound Interest Algorithms</strong>) to ensure accuracy down to the sixth decimal place.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mb-4">Our Process</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">Formula Verification:</span>
                    <span className="text-muted-foreground"> Every calculator is vetted against financial standards used by major institutions like Nationwide and leading banks.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">Client-Side Processing:</span>
                    <span className="text-muted-foreground"> Your data never leaves your device. Calculations are performed locally in your browser for maximum privacy and speed.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">Real-Time Validation:</span>
                    <span className="text-muted-foreground"> We use reactive state management to provide instant results as you type, allowing for "what-if" scenario testing in real-time.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Get in Touch</h2>
              <p className="text-muted-foreground mb-4">
                Have a question, suggestion, or found a bug? We'd love to hear from you.
              </p>
              <p className="text-muted-foreground">
                Email us at: <a href="mailto:thecalculatorpage@gmail.com" className="text-primary hover:underline">thecalculatorpage@gmail.com</a>
              </p>
            </section>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;