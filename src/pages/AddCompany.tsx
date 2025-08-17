import { useState } from "react";
import { ArrowLeft, Link, FileText, Plus, Trash2 } from "lucide-react";
import { Header } from "@/components/Layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export const AddCompany = () => {
  const [mode, setMode] = useState<"existing" | "new" | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phones: [""],
    website: "",
    yandex_url: "",
    dgis_url: "",
    category: "",
    hours: "",
    usp: "",
    description_short: "",
    description_full: "",
    delivery: false,
    pickup: false,
    socials: {
      vk: "",
      whatsapp: "",
      telegram: "",
      instagram: "",
      email: ""
    }
  });
  
  const { toast } = useToast();

  const addPhone = () => {
    setFormData(prev => ({
      ...prev,
      phones: [...prev.phones, ""]
    }));
  };

  const removePhone = (index: number) => {
    setFormData(prev => ({
      ...prev,
      phones: prev.phones.filter((_, i) => i !== index)
    }));
  };

  const updatePhone = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      phones: prev.phones.map((phone, i) => i === index ? value : phone)
    }));
  };

  const handleSubmit = () => {
    toast({
      title: "Компания добавлена",
      description: "Для полного функционала подключите Supabase интеграцию",
    });
  };

  if (!mode) {
    return (
      <div className="min-h-screen bg-background">
        <Header currentPath="/add-company" />
        
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="mb-6">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к списку
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Добавить компанию</h1>
            <p className="text-muted-foreground">Выберите способ добавления компании</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setMode("existing")}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Link className="h-5 w-5 mr-2 text-primary" />
                  Существующая компания
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  У вас уже есть карточка на Яндекс.Картах или 2ГИС? Добавьте ссылки для анализа.
                </p>
                <ul className="text-sm space-y-2">
                  <li>• Анализ текущего состояния</li>
                  <li>• Автозагрузка данных</li>
                  <li>• Рекомендации по улучшению</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setMode("new")}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  Новая компания
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Создайте карточку с нуля, заполнив подробную анкету о вашем бизнесе.
                </p>
                <ul className="text-sm space-y-2">
                  <li>• Пошаговое заполнение</li>
                  <li>• Готовые тексты для карточек</li>
                  <li>• План продвижения</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentPath="/add-company" />
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => setMode(null)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к выбору
          </Button>
          <h1 className="text-2xl font-bold text-foreground">
            {mode === "existing" ? "Существующая компания" : "Новая компания"}
          </h1>
        </div>

        <div className="space-y-6">
          {mode === "existing" && (
            <Card>
              <CardHeader>
                <CardTitle>Ссылки на карточки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="yandex_url">Ссылка на Яндекс.Карты</Label>
                  <Input
                    id="yandex_url"
                    placeholder="https://yandex.ru/maps/org/..."
                    value={formData.yandex_url}
                    onChange={(e) => setFormData(prev => ({...prev, yandex_url: e.target.value}))}
                  />
                </div>
                <div>
                  <Label htmlFor="dgis_url">Ссылка на 2ГИС</Label>
                  <Input
                    id="dgis_url"
                    placeholder="https://2gis.ru/firm/..."
                    value={formData.dgis_url}
                    onChange={(e) => setFormData(prev => ({...prev, dgis_url: e.target.value}))}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Название компании</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Категория</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({...prev, category: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cafe">Кафе и рестораны</SelectItem>
                      <SelectItem value="auto">Автосервис</SelectItem>
                      <SelectItem value="beauty">Красота и здоровье</SelectItem>
                      <SelectItem value="retail">Торговля</SelectItem>
                      <SelectItem value="services">Услуги</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Адрес</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({...prev, address: e.target.value}))}
                />
              </div>

              <div>
                <Label>Телефоны</Label>
                {formData.phones.map((phone, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <Input
                      placeholder="+7 (999) 123-45-67"
                      value={phone}
                      onChange={(e) => updatePhone(index, e.target.value)}
                    />
                    {formData.phones.length > 1 && (
                      <Button variant="outline" size="icon" onClick={() => removePhone(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addPhone} className="mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить телефон
                </Button>
              </div>
            </CardContent>
          </Card>

          {mode === "new" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Контакты и соцсети</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="website">Сайт</Label>
                      <Input
                        id="website"
                        placeholder="https://example.com"
                        value={formData.website}
                        onChange={(e) => setFormData(prev => ({...prev, website: e.target.value}))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.socials.email}
                        onChange={(e) => setFormData(prev => ({...prev, socials: {...prev.socials, email: e.target.value}}))}
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="whatsapp">WhatsApp</Label>
                      <Input
                        id="whatsapp"
                        placeholder="+7 (999) 123-45-67"
                        value={formData.socials.whatsapp}
                        onChange={(e) => setFormData(prev => ({...prev, socials: {...prev.socials, whatsapp: e.target.value}}))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="telegram">Telegram</Label>
                      <Input
                        id="telegram"
                        placeholder="@username"
                        value={formData.socials.telegram}
                        onChange={(e) => setFormData(prev => ({...prev, socials: {...prev.socials, telegram: e.target.value}}))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Описания и УТП</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="usp">Уникальное торговое предложение</Label>
                    <Input
                      id="usp"
                      placeholder="Чем вы отличаетесь от конкурентов?"
                      value={formData.usp}
                      onChange={(e) => setFormData(prev => ({...prev, usp: e.target.value}))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description_short">Краткое описание (до 250 символов)</Label>
                    <Textarea
                      id="description_short"
                      rows={3}
                      value={formData.description_short}
                      onChange={(e) => setFormData(prev => ({...prev, description_short: e.target.value}))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description_full">Полное описание (до 1000 символов)</Label>
                    <Textarea
                      id="description_full"
                      rows={5}
                      value={formData.description_full}
                      onChange={(e) => setFormData(prev => ({...prev, description_full: e.target.value}))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Дополнительные услуги</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="delivery">Доставка</Label>
                    <Switch
                      id="delivery"
                      checked={formData.delivery}
                      onCheckedChange={(checked) => setFormData(prev => ({...prev, delivery: checked}))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pickup">Самовывоз</Label>
                    <Switch
                      id="pickup"
                      checked={formData.pickup}
                      onCheckedChange={(checked) => setFormData(prev => ({...prev, pickup: checked}))}
                    />
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          <div className="flex gap-4">
            <Button onClick={handleSubmit} className="flex-1">
              Сохранить компанию
            </Button>
            <Button variant="outline" onClick={() => setMode(null)}>
              Отмена
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};