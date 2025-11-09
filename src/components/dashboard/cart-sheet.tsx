
"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useCart } from "@/context/cart-provider";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Trash2 } from "lucide-react";

export function CartSheet() {
  const { cartItems, cartCount, cartTotal, removeFromCart, clearCart } = useCart();
  const { toast } = useToast();

  const handleCheckout = () => {
    if (cartCount === 0) {
        toast({
            variant: "destructive",
            title: "Your cart is empty",
            description: "Add some items to your cart before checking out.",
        });
        return;
    }
    
    clearCart();
    toast({
        title: "Checkout Successful!",
        description: "Thank you for your purchase. Your order is being processed.",
    });
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 justify-center p-0">{cartCount}</Badge>
          )}
          <span className="sr-only">View Cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Shopping Cart</SheetTitle>
          <SheetDescription>
            Review your items before proceeding to checkout.
          </SheetDescription>
        </SheetHeader>
        {cartCount > 0 ? (
          <ScrollArea className="flex-grow">
            <div className="pr-4">
              {cartItems.map((item) => (
                <div key={item.name} className="flex items-start gap-4 py-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                    data-ai-hint={item.imageAiHint}
                  />
                  <div className="flex-grow">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    <p className="text-sm font-bold text-primary">{item.price}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => removeFromCart(item.name)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove item</span>
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold">Your cart is empty</h3>
            <p className="text-muted-foreground">Add some produce from the marketplace!</p>
          </div>
        )}
        <SheetFooter className="mt-auto">
            <div className="w-full space-y-4">
                 <Separator />
                <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                </div>
                <SheetClose asChild>
                    <Button className="w-full" onClick={handleCheckout}>Proceed to Checkout</Button>
                </SheetClose>
            </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

