"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/Components/ui';

export default function WishlistPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
        <p className="text-muted-foreground mb-6">
          Save items you love for later
        </p>
        <div className="bg-muted/50 p-8 rounded-lg">
          <p className="text-muted-foreground mb-4">
            Wishlist page is under development
          </p>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
