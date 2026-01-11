import { Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import SEO from "@/components/SEO";
import { TooltipProvider } from "@/components/ui/tooltip";

const App = () => {
  return (
    <HelmetProvider>
      <TooltipProvider>
        {/* We provide default SEO props so it doesn't error out */}
        <SEO title="The Calculator Page" description="Expert financial calculators and mortgage advice tools designed for the modern financial journey." />
        <main>
          {/* WITHOUT THIS LINE, THE PAGE WILL BE BLANK */}
          <Outlet /> 
        </main>
      </TooltipProvider>
    </HelmetProvider>
  );
};

export default App;