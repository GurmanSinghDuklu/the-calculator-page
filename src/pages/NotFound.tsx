import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO 
        title="404 Page Not Found"
        description="The page you are looking for could not be found. Return to Calculator Page homepage for free online calculators."
        keywords="404, page not found"
      />
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center px-6">
          <h1 className="mb-6 font-serif text-6xl font-normal text-foreground">404</h1>
          <p className="mb-8 text-lg text-muted-foreground">Page not found</p>
          
          {/* Changed <a> to <Link> and added 'replace' */}
          <Link 
            to="/home" 
            replace={true}
            className="inline-block px-8 py-3 text-sm tracking-wider uppercase border border-foreground/20 hover:border-foreground/60 hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Return Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;