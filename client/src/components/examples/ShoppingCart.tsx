import { useState } from 'react';
import ShoppingCart from '../ShoppingCart';
import { type Product } from '../ProductCard';

// todo: remove mock functionality
const mockCartItems = [
  {
    product: {
      id: "1",
      name: "Basmati Rice Premium Quality 1kg",
      price: 180,
      unit: "1 kg",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e26c?w=300&h=300&fit=crop",
      category: "groceries",
      inStock: true
    } as Product,
    quantity: 2
  },
  {
    product: {
      id: "2", 
      name: "Dish Soap Liquid 500ml",
      price: 85,
      unit: "500 ml",
      image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=300&fit=crop",
      category: "cleaning",
      inStock: true
    } as Product,
    quantity: 1
  }
];

export default function ShoppingCartExample() {
  const [isOpen, setIsOpen] = useState(true);
  const [items, setItems] = useState(mockCartItems);

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => item.product.id !== productId));
    } else {
      setItems(prev => prev.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      ));
    }
    console.log('Quantity updated');
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout');
    setIsOpen(false);
  };

  return (
    <ShoppingCart 
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      items={items}
      onUpdateQuantity={handleUpdateQuantity}
      onCheckout={handleCheckout}
    />
  );
}