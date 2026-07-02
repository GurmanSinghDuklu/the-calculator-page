import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/ScrollToTop";

const App = () => {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen flex-col">
        <ScrollToTop />

        <SEO
          title="The Calculator App - Professional Financial Tools"
          description="Expert financial calculators, mortgage advice tools, and unit converters."
        />

        <main className="flex-grow">
          {/* Suspense boundary for lazily-loaded route chunks. During SSG the
              full page is pre-rendered, so this fallback only shows briefly on
              client-side navigation between routes. */}
          <Suspense fallback={<div className="min-h-screen bg-dark-bg" aria-hidden="true" />}>
            <Outlet />
          </Suspense>
        </main>

      </div>
    </TooltipProvider>
  );
};

export default App;