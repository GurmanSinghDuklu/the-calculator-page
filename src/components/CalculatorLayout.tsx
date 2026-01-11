import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationMenu } from "@/components/NavigationMenu";
import { Logo } from "@/components/Logo";

interface CalculatorLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

export const CalculatorLayout = ({ children, title, description }: CalculatorLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo size="sm" linkTo="/home" />
            <div className="flex items-center gap-4">
              <Link to="/home">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="gap-2 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
              </Link>
              <NavigationMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="mb-10">
          <h1 className="font-serif text-4xl md:text-5xl font-normal mb-4 text-foreground tracking-tight">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        <div>
          {children}
        </div>
      </main>
    </div>
  );
};
