import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { Header } from "@/components/Layout/Header";
import { CompanyCard } from "@/components/CompanyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Моковые данные для демонстрации
const mockCompanies = [
  {
    id: "1",
    name: "Кофейня на Невском",
    address: "Санкт-Петербург, Невский пр., 45",
    category: "Кафе и рестораны",
    phones: ["+7 (812) 123-45-67"],
    website: "coffee-nevsky.ru",
    score: 7,
    lastAnalyzed: "15.01.2024",
    status: "active" as const
  },
  {
    id: "2", 
    name: "Автосервис Премиум",
    address: "Москва, ул. Гагарина, 23",
    category: "Автосервис",
    phones: ["+7 (495) 987-65-43"],
    score: 5,
    lastAnalyzed: "12.01.2024",
    status: "needs_analysis" as const
  },
  {
    id: "3",
    name: "Салон красоты Элегант",
    address: "Екатеринбург, ул. Ленина, 78",
    category: "Красота и здоровье",
    phones: ["+7 (343) 555-12-34"],
    website: "elegant-salon.ru",
    status: "draft" as const
  }
];

export const CompanyList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || company.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAnalyze = (id: string) => {
    toast({
      title: "Анализ запущен",
      description: "Анализ карточки компании начат. Это займет несколько минут.",
    });
  };

  const handleView = (id: string) => {
    toast({
      title: "Переход к компании",
      description: `Открытие детальной страницы компании ${id}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentPath="/" />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Мои компании</h1>
            <p className="text-muted-foreground">Управляйте карточками ваших компаний</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Добавить компанию
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по названию или адресу..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="active">Активные</SelectItem>
              <SelectItem value="needs_analysis">Требует анализа</SelectItem>
              <SelectItem value="draft">Черновики</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onAnalyze={handleAnalyze}
              onView={handleView}
            />
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Компании не найдены</p>
            <Button className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Добавить первую компанию
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};