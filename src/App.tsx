import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { TooltipProvider } from "@/components/ui/tooltip";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const App = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 1. Prevents Hydration Errors (#418, #423)
  // By waiting for isMounted, we ensure the server-side HTML matches 
  // the client-side interactive React tree exactly.
  if (!isMounted) {
    return null; 
  }

  return (
    <HelmetProvider>
      <TooltipProvider>
        <div className="flex min-h-screen flex-col">
          {/* 2. Global Scroll Management */}
          {/* Resets scroll position to (0,0) whenever the URL path changes */}
          <ScrollToTop />

          <SEO 
            title="The Calculator Page - Professional Financial Tools" 
            description="Expert financial calculators, mortgage advice tools, and unit converters." 
          />

          {/* Optional: Add <Navbar /> here if you have one */}

          <main className="flex-grow">
            {/* 3. Dynamic Page Content */}
            {/* This renders the specific calculator or article based on index.tsx */}
            <Outlet /> 
          </main>

          {/* 4. High-Authority SEO Footer */}
          <Footer />
        </div>
      </TooltipProvider>
    </HelmetProvider>
  );
};

export default App;