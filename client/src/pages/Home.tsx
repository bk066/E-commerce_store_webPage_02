import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import ProductGrid from "@/components/ProductGrid";
import ShoppingCart from "@/components/ShoppingCart";
import UserForm from "@/components/UserForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { type Product } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";


export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);

  // Fetch products from API
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['/api/products', selectedCategory],
    queryFn: () => {
      const params = selectedCategory !== 'all' ? `?category=${selectedCategory}` : '';
      return fetch(`/api/products${params}`).then(res => res.json());
    }
  });

  // Convert price strings to numbers for calculations
  const filteredProducts = useMemo(() => {
    return products.map((product: Product) => ({
      ...product,
      price: parseFloat(product.price as unknown as string),
      originalPrice: product.originalPrice ? parseFloat(product.originalPrice as unknown as string) : undefined
    }));
  }, [products]);

  // Calculate cart items and total count
  const cartItems = useMemo(() => {
    return Object.entries(cartQuantities)
      .filter(([_, quantity]) => quantity > 0)
      .map(([productId, quantity]) => ({
        product: filteredProducts.find((p: Product) => p.id === productId)!,
        quantity
      }));
  }, [cartQuantities, filteredProducts]);

  const totalCartCount = Object.values(cartQuantities).reduce((sum, qty) => sum + qty, 0);

  // Calculate if discount applies
  const subtotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const hasDiscount = subtotal >= 2500;

  const handleAddToCart = (productId: string) => {
    setCartQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) - 1)
    }));
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartQuantities(prev => {
        const newState = { ...prev };
        delete newState[productId];
        return newState;
      });
    } else {
      setCartQuantities(prev => ({
        ...prev,
        [productId]: quantity
      }));
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsUserFormOpen(true);
  };

  const handleUserSubmit = async (userData: any) => {
    try {
      // Register user
      const userResponse = await apiRequest("POST", "/api/users", userData);
      const user = await userResponse.json();
      
      if (!userResponse.ok) {
        throw new Error(user.message || 'Failed to register user');
      }
      
      // Create order - let server validate and calculate totals
      const orderData = {
        userId: user.id,
        items: cartItems.map(item => ({
          productId: item.product.id,
          quantity: item.quantity
        }))
      };
      
      const orderResponse = await apiRequest("POST", "/api/orders", orderData);
      const order = await orderResponse.json();
      
      if (!orderResponse.ok) {
        throw new Error(order.message || 'Failed to create order');
      }
      
      console.log('Order created successfully:', order);
      setIsUserFormOpen(false);
      
      // Navigate to checkout with order ID
      window.location.href = `/checkout/${order.id}`;
      
    } catch (error: any) {
      console.error('Error creating order:', error);
      alert('Error creating order: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        cartCount={totalCartCount}
        onCartClick={() => setIsCartOpen(true)}
        onUserClick={() => setIsUserFormOpen(true)}
      />

      {/* Theme Toggle - Fixed position */}
      <div className="fixed top-4 right-4 z-40">
        <ThemeToggle />
      </div>

      {/* Discount Banner */}
      {hasDiscount && (
        <div className="bg-primary text-primary-foreground py-2 px-4 text-center">
          <Badge className="bg-secondary text-secondary-foreground mr-2">
            🎉 Discount Applied!
          </Badge>
          You're saving 10% on your order! Free delivery included.
        </div>
      )}

      {/* Category Navigation */}
      <CategoryNav 
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {/* Main Content */}
      <main>
        {/* Products Header */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {selectedCategory === "all" ? "All Products" : 
                 selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).replace("-", " ")}
              </h2>
              <p className="text-muted-foreground">
                {isLoading ? "Loading..." : `${filteredProducts.length} products available`}
              </p>
            </div>
            
            {subtotal > 0 && (
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Cart Total</p>
                <p className="text-lg font-bold text-primary">₹{subtotal}</p>
                {!hasDiscount && subtotal < 2500 && (
                  <p className="text-xs text-muted-foreground">
                    Add ₹{2500 - subtotal} more for 10% discount
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid 
          products={filteredProducts}
          cartQuantities={cartQuantities}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
        />
      </main>

      {/* Shopping Cart Overlay */}
      <ShoppingCart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onCheckout={handleCheckout}
      />

      {/* User Form Overlay */}
      <UserForm 
        isOpen={isUserFormOpen}
        onClose={() => setIsUserFormOpen(false)}
        onSubmit={handleUserSubmit}
      />
    </div>
  );
}