
"use client";

import { FavoritesList } from "@/components/dashboard/favorites-list";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
  return (
    <>
      <div className="flex items-center mb-6">
        <div className="flex-shrink-0 mr-4 bg-destructive/10 text-destructive p-3 rounded-full">
            <Heart className="h-6 w-6" />
        </div>
        <div>
            <h1 className="text-2xl font-semibold md:text-3xl font-headline">
              My Favorites
            </h1>
            <p className="text-muted-foreground">
              A list of all the produce you've saved for later.
            </p>
        </div>
      </div>
      <FavoritesList />
    </>
  );
}
