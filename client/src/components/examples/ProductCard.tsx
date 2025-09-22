import { useState } from 'react';
import ProductCard, { type Product } from '../ProductCard';

// todo: remove mock functionality
const mockProduct: Product = {
  id: "1",
  name: "Basmati Rice Premium Quality 1kg Pack",
  price: 180,
  originalPrice: 220,
  unit: "1 kg",
  image: "https://images.unsplash.com/photo-1586201375761-83865001e26c?w=300&h=300&fit=crop",
  category: "groceries",
  inStock: true,
  discount: 18
};

export default function ProductCardExample() {
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    setQuantity(prev => prev + 1);
    console.log('Added to cart');
  };

  const handleRemoveFromCart = () => {
    setQuantity(prev => Math.max(0, prev - 1));
    console.log('Removed from cart');
  };

  return (
    <div className="w-64">
      <ProductCard 
        product={mockProduct}
        quantity={quantity}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
      />
    </div>
  );
}