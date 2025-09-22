import ProductCard, { type Product } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  cartQuantities: Record<string, number>;
  onAddToCart: (productId: string) => void;
  onRemoveFromCart: (productId: string) => void;
}

export default function ProductGrid({ 
  products, 
  cartQuantities, 
  onAddToCart, 
  onRemoveFromCart 
}: ProductGridProps) {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={cartQuantities[product.id] || 0}
            onAddToCart={onAddToCart}
            onRemoveFromCart={onRemoveFromCart}
          />
        ))}
      </div>
    </div>
  );
}