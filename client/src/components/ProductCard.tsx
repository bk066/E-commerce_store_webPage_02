import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  unit: string;
  image: string;
  category: string;
  inStock: boolean;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAddToCart: (productId: string) => void;
  onRemoveFromCart: (productId: string) => void;
}

export default function ProductCard({ 
  product, 
  quantity, 
  onAddToCart, 
  onRemoveFromCart 
}: ProductCardProps) {
  return (
    <Card className="hover-elevate transition-all duration-200 h-full">
      <CardContent className="p-4">
        {/* Product Image */}
        <div className="relative mb-3">
          <div className="aspect-square bg-muted rounded-md overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
              data-testid={`img-product-${product.id}`}
            />
          </div>
          {product.discount && (
            <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground">
              {product.discount}% OFF
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-2 mb-3">
          <h3 className="font-medium text-sm text-foreground line-clamp-2" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground">{product.unit}</p>
          
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary" data-testid={`text-price-${product.id}`}>
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Controls */}
        <div className="flex items-center justify-between">
          {quantity === 0 ? (
            <Button 
              size="sm" 
              className="w-full"
              onClick={() => onAddToCart(product.id)}
              disabled={!product.inStock}
              data-testid={`button-add-to-cart-${product.id}`}
            >
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          ) : (
            <div className="flex items-center gap-2 w-full">
              <Button 
                size="icon" 
                variant="outline"
                onClick={() => onRemoveFromCart(product.id)}
                className="h-8 w-8"
                data-testid={`button-decrease-${product.id}`}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="flex-1 text-center font-medium" data-testid={`text-quantity-${product.id}`}>
                {quantity}
              </span>
              <Button 
                size="icon"
                onClick={() => onAddToCart(product.id)}
                className="h-8 w-8"
                data-testid={`button-increase-${product.id}`}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}