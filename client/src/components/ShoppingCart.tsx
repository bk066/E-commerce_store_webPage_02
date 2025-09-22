import { X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { type Product } from "./ProductCard";

interface CartItem {
  product: Product;
  quantity: number;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onCheckout: () => void;
}

export default function ShoppingCart({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onCheckout 
}: ShoppingCartProps) {
  const subtotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const hasDiscount = subtotal >= 2500;
  const discountAmount = hasDiscount ? subtotal * 0.1 : 0;
  const total = subtotal - discountAmount;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border">
        <Card className="h-full rounded-none border-0">
          <CardHeader className="flex-row items-center justify-between border-b border-card-border">
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Shopping Cart ({items.length})
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} data-testid="button-close-cart">
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>

          <CardContent className="p-0 flex flex-col h-[calc(100%-5rem)]">
            {items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center flex-col gap-4 p-6">
                <ShoppingBag className="w-16 h-16 text-muted-foreground" />
                <p className="text-muted-foreground text-center">Your cart is empty</p>
                <Button onClick={onClose}>Continue Shopping</Button>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3 p-3 bg-card rounded-md border border-card-border">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                        data-testid={`img-cart-product-${item.product.id}`}
                      />
                      <div className="flex-1 space-y-1">
                        <h4 className="font-medium text-sm" data-testid={`text-cart-product-name-${item.product.id}`}>
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">{item.product.unit}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-primary" data-testid={`text-cart-price-${item.product.id}`}>
                            ₹{item.product.price}
                          </span>
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              data-testid={`button-cart-decrease-${item.product.id}`}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center" data-testid={`text-cart-quantity-${item.product.id}`}>
                              {item.quantity}
                            </span>
                            <Button 
                              size="sm"
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              data-testid={`button-cart-increase-${item.product.id}`}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="border-t border-card-border p-4 space-y-4">
                  {hasDiscount && (
                    <div className="bg-primary/10 border border-primary/20 rounded-md p-3">
                      <Badge className="bg-primary text-primary-foreground mb-2">
                        🎉 Discount Applied!
                      </Badge>
                      <p className="text-sm text-primary font-medium">
                        You saved ₹{discountAmount.toFixed(0)} on orders over ₹2500
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span data-testid="text-subtotal">₹{subtotal}</span>
                    </div>
                    {hasDiscount && (
                      <div className="flex justify-between text-sm text-primary">
                        <span>Discount (10%):</span>
                        <span data-testid="text-discount">-₹{discountAmount.toFixed(0)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span data-testid="text-total">₹{total.toFixed(0)}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={onCheckout}
                    data-testid="button-checkout"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}