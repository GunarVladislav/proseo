import { Building2, PlusCircle, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  currentPath?: string;
}

export const Header = ({ currentPath = "/" }: HeaderProps) => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold text-foreground">MapAnalyzer</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="/" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                currentPath === "/" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Компании
            </a>
            <a 
              href="/add-company" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                currentPath === "/add-company" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Добавить
            </a>
            <a 
              href="/analytics" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                currentPath === "/analytics" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Аналитика
            </a>
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Статистика
          </Button>
          <Button size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Добавить компанию
          </Button>
        </div>
      </div>
    </header>
  );
};