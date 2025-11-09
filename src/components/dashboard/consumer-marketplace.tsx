
"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import type { Produce } from "@/context/cart-provider";
import { AvailableProduce } from "./available-produce";

const allProduce: Produce[] = [
  { name: 'Heirloom Tomatoes', farmer: 'Maria G.', price: '$2.50/lb', status: 'Available', image: "https://placehold.co/300x200.png", imageAiHint: "heirloom tomatoes", grade: "A", category: "Vegetables", rating: 4.8, reviews: 25, description: "Sweet and juicy organic tomatoes, non-GMO. Ideal for salads, sauces, or just eating fresh." },
  { name: 'Red Lentils', farmer: 'Chen W.', price: '$1.80/lb', status: 'Available', image: "https://placehold.co/300x200.png", imageAiHint: "red lentils", grade: "B", category: "Pulses", rating: 4.5, reviews: 18, description: "Nutritious and quick-cooking red lentils, perfect for soups, stews, and curries." },
  { name: 'Organic Spinach', farmer: 'John D.', price: '$3.00/bunch', status: 'Available', image: "https://placehold.co/300x200.png", imageAiHint: "fresh spinach", grade: "A", category: "Vegetables", rating: 4.9, reviews: 32, description: "Tender, organic spinach leaves. Great for salads, smoothies, or wilting into pasta dishes." },
  { name: 'Russet Potatoes', farmer: 'David S.', price: '$0.90/lb', status: 'Low Stock', image: "https://placehold.co/300x200.png", imageAiHint: "russet potatoes", grade: "A", category: "Vegetables", rating: 4.6, reviews: 40, description: "Classic Russet potatoes, perfect for baking, mashing, or frying. A versatile kitchen staple." },
  { name: 'Chickpeas', farmer: 'Chen W.', price: '$2.00/lb', status: 'Available', image: "https://placehold.co/300x200.png", imageAiHint: "chickpeas", grade: "A", category: "Pulses", rating: 4.7, reviews: 22, description: "Creamy and delicious chickpeas, also known as garbanzo beans. Essential for hummus, salads, and stews." },
   { name: 'Strawberries', farmer: 'Maria G.', price: '$4.50/pint', status: 'Available', image: "https://placehold.co/300x200.png", imageAiHint: "fresh strawberries", grade: "A", category: "Fruits", rating: 5.0, reviews: 55, description: "Juicy, sweet, and freshly picked strawberries. Perfect for desserts, breakfast, or a healthy snack." },
  { name: 'Blueberries', farmer: 'John D.', price: '$5.00/pint', status: 'Low Stock', image: "https://placehold.co/300x200.png", imageAiHint: "fresh blueberries", grade: "A", category: "Fruits", rating: 4.9, reviews: 45, description: "Plump, antioxidant-rich blueberries. Wonderful in pancakes, yogurt, or by the handful." },
];

export function ConsumerMarketplace() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [category, setCategory] = React.useState("all");
  const [sort, setSort] = React.useState("rating");
  
  const filteredProduce = React.useMemo(() => {
    let items = allProduce;

    if (searchQuery) {
        items = items.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (category !== 'all') {
        items = items.filter(p => p.category === category);
    }
    
    items.sort((a, b) => {
        if (sort === 'rating') {
            return (b.rating || 0) - (a.rating || 0);
        }
        if (sort === 'price_asc') {
             const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g,""));
             const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g,""));
            return priceA - priceB;
        }
        if (sort === 'price_desc') {
            const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g,""));
             const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g,""));
            return priceB - priceA;
        }
        return 0;
    });

    return items;
  }, [searchQuery, category, sort]);

  return (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    placeholder="Search produce..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                 <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Vegetables">Vegetables</SelectItem>
                        <SelectItem value="Fruits">Fruits</SelectItem>
                        <SelectItem value="Pulses">Pulses</SelectItem>
                    </SelectContent>
                </Select>
                 <Select value={sort} onValueChange={setSort}>
                    <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="rating">Sort by Rating</SelectItem>
                        <SelectItem value="price_asc">Sort by Price: Low to High</SelectItem>
                        <SelectItem value="price_desc">Sort by Price: High to Low</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        <AvailableProduce items={filteredProduce} />
    </div>
  );
}
