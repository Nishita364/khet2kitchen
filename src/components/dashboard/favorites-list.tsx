
"use client";

import { useFavorites } from "@/context/favorites-provider";
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Heart } from "lucide-react";
import { AvailableProduce } from "./available-produce";

export function FavoritesList() {
  const { favoriteItems } = useFavorites();

  if (favoriteItems.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center min-h-[300px] text-center">
          <Heart className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-xl font-semibold">No Favorites Yet</h3>
          <p className="text-muted-foreground">Click the heart icon on any product to add it to your favorites.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <AvailableProduce items={favoriteItems} />
  );
}
