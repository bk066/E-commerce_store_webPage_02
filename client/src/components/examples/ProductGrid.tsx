import { useState } from 'react';
import ProductGrid from '../ProductGrid';
import { type Product } from '../ProductCard';

// todo: remove mock functionality
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Basmati Rice Premium Quality 1kg Pack",
    price: 180,
    originalPrice: 220,
    unit: "1 kg",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e26c?w=300&h=300&fit=crop",
    category: "groceries",
    inStock: true,
    discount: 18
  },
  {
    id: "2",
    name: "Dish Soap Liquid 500ml",
    price: 85,
    unit: "500 ml", 
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=300&fit=crop",
    category: "cleaning",
    inStock: true
  },
  {
    id: "3",
    name: "Organic Toor Dal 1kg",
    price: 120,
    unit: "1 kg",
    image: "https://images.unsplash.com/photo-1599909533554-9e3b7cae1b7a?w=300&h=300&fit=crop", 
    category: "groceries",
    inStock: true
  },
  {
    id: "4",
    name: "Shampoo Anti-Dandruff 400ml",
    price: 240,
    originalPrice: 280,
    unit: "400 ml",
    image: "https://images.unsplash.com/photo-1556229174-f412d0dcbce2?w=300&h=300&fit=crop",
    category: "personal-care", 
    inStock: true,
    discount: 14
  },
  {
    id: "5",
    name: "All Purpose Cleaner 1L",
    price: 150,
    unit: "1 L",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300&h=300&fit=crop",
    category: "cleaning",
    inStock: false
  },
  {
    id: "6", 
    name: "Green Tea Bags 25 Count",
    price: 95,
    unit: "25 bags",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=300&fit=crop",
    category: "beverages",
    inStock: true
  }
];

export default function ProductGridExample() {
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>({});

  const handleAddToCart = (productId: string) => {
    setCartQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
    console.log('Added to cart:', productId);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) - 1)
    }));
    console.log('Removed from cart:', productId);
  };

  return (
    <ProductGrid 
      products={mockProducts}
      cartQuantities={cartQuantities}
      onAddToCart={handleAddToCart}
      onRemoveFromCart={handleRemoveFromCart}
    />
  );
}