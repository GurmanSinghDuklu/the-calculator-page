import { Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import SEO from "@/components/SEO";
import { TooltipProvider } from "@/components/ui/tooltip";

const App = () => {
  return (
    <HelmetProvider>
      <TooltipProvider>
        {/* Move SEO inside the main container or ensure it's rendered consistently */}
        <SEO 
          title="The Calculator Page" 
          description="Expert financial calculators and mortgage advice tools." 
        />
        <main>
          <Outlet /> 
        </main>
      </TooltipProvider>
    </HelmetProvider>
  );
};

export default App;