
"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image";
import { Button } from "../ui/button";
import { Star, StarHalf } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { Produce } from "@/context/cart-provider";

const produce: Produce[] = [
  { name: 'Winter Wheat', farmer: 'John D.', price: '$255/ton', status: 'Available', image: "https://placehold.co/300x200.png", imageAiHint: "wheat grains", grade: "A", category: "Grains", rating: 4.5, reviews: 12, description: "High-quality winter wheat, perfect for baking bread. Grown using sustainable farming practices. Rich in nutrients and flavor." },
  { name: 'Organic Corn', farmer: 'Maria G.', price: '$220/ton', status: 'Available', image: "https://placehold.co/300x200.png", imageAiHint: "corn cob", grade: "A", category: "Grains", rating: 4.8, reviews: 25, description: "Sweet and juicy organic corn, non-GMO. Ideal for grilling, roasting, or making fresh corn salads. A family favorite." },
  { name: 'Soybeans', farmer: 'Chen W.', price: '$410/ton', status: 'Low Stock', image: "https://placehold.co/300x200.png", imageAiHint: "soybeans", grade: "B", category: "Pulses", rating: 4.2, reviews: 8, description: "Versatile soybeans, great for making tofu, soy milk, or edamame. A fantastic source of plant-based protein." },
];


const Rating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
            {halfStar && <StarHalf className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
            {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} className="w-4 h-4 text-yellow-500" />)}
        </div>
    );
};

export function SourcedProduce() {
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
        return 'bg-green-600/20 text-green-800 border-green-600/20';
      case 'B':
        return 'bg-yellow-600/20 text-yellow-800 border-yellow-600/20';
      case 'C':
        return 'bg-orange-600/20 text-orange-800 border-orange-600/20';
      default:
        return '';
    }
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle>Available Produce</CardTitle>
            <CardDescription>A list of currently available produce from farmers.</CardDescription>
        </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
        {produce.map((item) => (
          <Card key={item.name} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group flex flex-col">
             <CardHeader className="p-0 relative">
                <Image 
                    src={item.image}
                    alt={item.name}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover"
                    data-ai-hint={item.imageAiHint}
                />
                <Badge variant={getBadgeVariant(item.status!)} className={`absolute top-2 right-2 ${
                    item.status === 'Available' ? 'bg-green-100 text-green-800 border-green-200' : ''
                  }`}>
                    {item.status}
                </Badge>
            </CardHeader>
            <CardContent className="p-4 space-y-2 flex-grow">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">from {item.farmer}</p>
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
            <CardFooter className="p-4 pt-0">
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
                                        <div className="flex items-center gap-2"><p className="font-semibold">Mike P.</p> <Rating rating={4} /></div>
                                        <p className="text-sm text-muted-foreground">Good quality, but a bit pricey. Would buy again for a special occasion.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardFooter>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}
