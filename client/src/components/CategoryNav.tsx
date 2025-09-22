import { ShoppingBasket, Sparkles, Heart, Home, Coffee, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const categories: Category[] = [
  { id: "groceries", name: "Groceries", icon: ShoppingBasket, color: "text-primary" },
  { id: "cleaning", name: "Cleaning", icon: Sparkles, color: "text-accent" },
  { id: "personal-care", name: "Personal Care", icon: Heart, color: "text-secondary" },
  { id: "household", name: "Household", icon: Home, color: "text-muted-foreground" },
  { id: "beverages", name: "Beverages", icon: Coffee, color: "text-primary" },
  { id: "baby-care", name: "Baby Care", icon: Baby, color: "text-accent" },
];

interface CategoryNavProps {
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

export default function CategoryNav({ selectedCategory, onCategorySelect }: CategoryNavProps) {
  return (
    <nav className="bg-card border-b border-card-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <Button
            variant={selectedCategory === "all" ? "default" : "ghost"}
            size="sm"
            onClick={() => onCategorySelect("all")}
            className="whitespace-nowrap"
            data-testid="button-category-all"
          >
            All Categories
          </Button>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onCategorySelect(category.id)}
                className="whitespace-nowrap flex items-center gap-2"
                data-testid={`button-category-${category.id}`}
              >
                <Icon className={`w-4 h-4 ${selectedCategory === category.id ? 'text-primary-foreground' : category.color}`} />
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}