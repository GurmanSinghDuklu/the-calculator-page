import { Outlet } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/ScrollToTop";
import { Navbar } from "@/components/Navbar";

const App = () => {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen flex-col">
        <ScrollToTop />

        <SEO
          title="The Calculator Page - Professional Financial Tools"
          description="Expert financial calculators, mortgage advice tools, and unit converters."
        />

        <Navbar />

        <main className="flex-grow">
          <Outlet />
        </main>

      </div>
    </TooltipProvider>
  );
};

export default App;