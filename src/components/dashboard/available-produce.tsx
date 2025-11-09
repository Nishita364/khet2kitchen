
"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image";
import { Button } from "../ui/button";
import { Heart, ShoppingCart, Star, StarHalf, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useCart } from "@/context/cart-provider";
import { useFavorites } from "@/context/favorites-provider";
import type { Produce } from "@/context/cart-provider";

const Rating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
            {halfStar && <StarHalf className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
            {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} className="w-4 h-4 text-muted-foreground/30" />)}
        </div>
    );
};


export function AvailableProduce({ items }: { items: Produce[]}) {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'Available':
        return 'default';
      case 'Low Stock':
        return 'destructive';
      default:
        return 'outline';
    }
  };
    const getGradeBadgeClass = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'B':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'C':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return '';
    }
  };

  const handleAddToCart = (item: Produce) => {
    addToCart(item);
    toast({ title: "Added to Cart", description: `${item.name} has been added to your cart.` });
  }
  
  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <Search className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold">No Produce Found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {items.map((item) => (
      <Card key={item.name} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group flex flex-col">
          <CardHeader className="p-0 relative">
            <Image 
                src={item.image}
                alt={item.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
                data-ai-hint={item.imageAiHint}
            />
            <Badge variant={getBadgeVariant(item.status!)} className={`absolute top-2 right-2 ${
                item.status === 'Available' ? 'bg-green-600/80 text-white' : ''
              }`}>
                {item.status}
            </Badge>
              <Button variant="ghost" size="icon" className="absolute top-2 left-2 bg-background/50 backdrop-blur-sm rounded-full h-8 w-8 hover:bg-background/80" onClick={() => toggleFavorite(item)}>
                <Heart className={`h-4 w-4 text-destructive ${isFavorite(item.name) ? 'fill-destructive' : 'fill-transparent'}`} />
            </Button>
        </CardHeader>
        <CardContent className="p-4 space-y-2 flex-grow">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">from <Link href="#" className="hover:underline text-primary">{item.farmer}</Link></p>
                </div>
                  <Badge className={getGradeBadgeClass(item.grade!)}>
                    Grade {item.grade}
                </Badge>
            </div>
            <div className="flex items-center gap-2">
                <Rating rating={item.rating!} />
                <span className="text-xs text-muted-foreground">({item.reviews} reviews)</span>
            </div>
          <p className="text-xl font-bold text-primary">{item.price}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row gap-2">
              <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">View Details</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>{item.name}</DialogTitle>
                    <DialogDescription>
                        Grown by {item.farmer} - Grade {item.grade}
                    </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="relative w-full aspect-video rounded-md overflow-hidden">
                            <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" data-ai-hint={item.imageAiHint} />
                        </div>
                        <p>{item.description}</p>
                        <h4 className="font-semibold">Reviews ({item.reviews})</h4>
                        <div className="space-y-3 max-h-48 overflow-y-auto">
                            <div className="flex gap-2 items-start">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person face" />
                                    <AvatarFallback>S</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="flex items-center gap-2"><p className="font-semibold">Sarah L.</p> <Rating rating={5} /></div>
                                    <p className="text-sm text-muted-foreground">Incredibly fresh and flavorful! Made the best tomato soup.</p>
                                </div>
                            </div>
                            <div className="flex gap-2 items-start">
                                  <Avatar className="w-8 h-8">
                                    <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person face" />
                                    <AvatarFallback>M</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="flex items-center gap-2"><p className="font-semibold">Mike P.</p> <Rating rating={4.5} /></div>
                                    <p className="text-sm text-muted-foreground">Good quality, but a bit pricey. Would buy again for a special occasion.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <Button className="w-full" onClick={() => handleAddToCart(item)}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
            </Button>
        </CardFooter>
      </Card>
    ))}
    </div>
  )
}
