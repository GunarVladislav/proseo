import { Building2, MapPin, Phone, Globe, Star, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Company {
  id: string;
  name: string;
  address: string;
  category: string;
  phones?: string[];
  website?: string;
  score?: number;
  lastAnalyzed?: string;
  status: 'active' | 'needs_analysis' | 'draft';
}

interface CompanyCardProps {
  company: Company;
  onAnalyze?: (id: string) => void;
  onView?: (id: string) => void;
}

export const CompanyCard = ({ company, onAnalyze, onView }: CompanyCardProps) => {
  const getStatusColor = (status: Company['status']) => {
    switch (status) {
      case 'active': return 'bg-success';
      case 'needs_analysis': return 'bg-warning';
      case 'draft': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  const getStatusText = (status: Company['status']) => {
    switch (status) {
      case 'active': return 'Активна';
      case 'needs_analysis': return 'Требует анализа';
      case 'draft': return 'Черновик';
      default: return 'Неизвестно';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">{company.name}</h3>
          </div>
          <Badge variant="secondary" className={getStatusColor(company.status)}>
            {getStatusText(company.status)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2" />
          {company.address}
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Badge variant="outline">{company.category}</Badge>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            {company.phones && (
              <div className="flex items-center text-muted-foreground">
                <Phone className="h-4 w-4 mr-1" />
                {company.phones[0]}
              </div>
            )}
            {company.website && (
              <div className="flex items-center text-muted-foreground">
                <Globe className="h-4 w-4 mr-1" />
                Есть сайт
              </div>
            )}
          </div>
          
          {company.score && (
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 text-warning" />
              <span className="font-medium">{company.score}/10</span>
            </div>
          )}
        </div>
        
        {company.lastAnalyzed && (
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            Анализ: {company.lastAnalyzed}
          </div>
        )}
        
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" onClick={() => onView?.(company.id)}>
            Просмотр
          </Button>
          <Button size="sm" onClick={() => onAnalyze?.(company.id)}>
            Анализировать
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};