import { Link } from "react-router-dom";
import { Mail, Twitter, Linkedin, Facebook, ShieldCheck, Calculator } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        
        {/* --- SEO METHODOLOGY SECTION --- */}
        <div className="mb-12 border-b border-border pb-12">
          <div className="max-w-4xl">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              How Our Calculators Work
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              At <strong>The Calculator Page</strong>, we bridge the gap between complex financial mathematics and everyday usability. 
              Our suite of tools is engineered using industry-standard models and verified against real-world financial benchmarks 
              to ensure precision.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4 p-4 rounded-xl bg-background/50 border border-border/50">
                <div className="mt-1">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1">Privacy-First Architecture</h4>
                  <p className="text-xs text-muted-foreground">
                    Your financial data never touches our servers. All processing happens <strong>client-side</strong> 
                    in your browser, ensuring 100% data sovereignty.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl bg-background/50 border border-border/50">
                <div className="mt-1">
                  <Calculator className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1">Mathematical Transparency</h4>
                  <p className="text-xs text-muted-foreground">
                    We believe in "White Box" math. Our formulas are transparently explained on every page, 
                    helping you understand the <em>why</em> behind the numbers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- MAIN NAVIGATION GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1: Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-lg">Categories</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2 underline underline-offset-4 decoration-primary/30">Finance</h4>
                <ul className="space-y-1">
                  <li><Link to="/finance/compound-interest" className="text-sm text-muted-foreground hover:text-primary transition-colors">Compound Interest</Link></li>
                  <li><Link to="/finance/mortgage" className="text-sm text-muted-foreground hover:text-primary transition-colors">Mortgage</Link></li>
                  <li><Link to="/finance/loan" className="text-sm text-muted-foreground hover:text-primary transition-colors">Loan</Link></li>
                  <li><Link to="/finance/salary" className="text-sm text-muted-foreground hover:text-primary transition-colors">Salary</Link></li>
                  <li><Link to="/finance/retirement" className="text-sm text-muted-foreground hover:text-primary transition-colors">Retirement</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2 underline underline-offset-4 decoration-primary/30">Everyday</h4>
                <ul className="space-y-1">
                  <li><Link to="/misc/percentage-of" className="text-sm text-muted-foreground hover:text-primary transition-colors">Percentage Of</Link></li>
                  <li><Link to="/misc/percentage-change" className="text-sm text-muted-foreground hover:text-primary transition-colors">Percentage Change</Link></li>
                  <li><Link to="/misc/discount" className="text-sm text-muted-foreground hover:text-primary transition-colors">Discount</Link></li>
                  <li><Link to="/misc/age" className="text-sm text-muted-foreground hover:text-primary transition-colors">Age</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Column 2: Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-lg">Resources</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2 underline underline-offset-4 decoration-primary/30">Learn Hub</h4>
                <ul className="space-y-1">
                  <li><Link to="/learn" className="text-sm text-muted-foreground hover:text-primary transition-colors">All Articles</Link></li>
                  <li><Link to="/learn/financial-journey" className="text-sm text-muted-foreground hover:text-primary transition-colors">Financial Journey</Link></li>
                  <li><Link to="/learn/50-30-20-budget" className="text-sm text-muted-foreground hover:text-primary transition-colors">50/30/20 Budget</Link></li>
                  <li><Link to="/learn/emergency-fund" className="text-sm text-muted-foreground hover:text-primary transition-colors">Emergency Fund</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2 underline underline-offset-4 decoration-primary/30">Tools</h4>
                <ul className="space-y-1">
                  <li><Link to="/formulas" className="text-sm text-muted-foreground hover:text-primary transition-colors">Formula Directory</Link></li>
                  <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Column 3: Legal & About */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-lg">Legal & About</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookie Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Use</Link></li>
              <li><Link to="/disclaimer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Disclaimer</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-lg">Contact & Social</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2 underline underline-offset-4 decoration-primary/30">Get in Touch</h4>
                <a href="mailto:thecalculatorpage@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="h-4 w-4" />
                  thecalculatorpage@gmail.com
                </a>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2 underline underline-offset-4 decoration-primary/30">Follow Us</h4>
                <div className="flex gap-3">
                  <a href="https://twitter.com/thecalcpage" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-background border border-border hover:bg-primary/10 hover:text-primary transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="https://linkedin.com/company/thecalculatorpage" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-background border border-border hover:bg-primary/10 hover:text-primary transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Logo size="sm" />
              <span className="text-xs text-muted-foreground">
                © {currentYear} The Calculator Page. All rights reserved.
              </span>
            </div>
            <p className="text-[10px] md:text-xs text-muted-foreground text-center md:text-right max-w-md italic">
              *All calculations are for informational purposes only. Results are not guaranteed and may vary based on institutional terms.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;