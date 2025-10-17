"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/Components/ui';

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">My Profile</h1>
        <p className="text-muted-foreground mb-6">
          Manage your account settings and preferences
        </p>
        <div className="bg-muted/50 p-8 rounded-lg">
          <p className="text-muted-foreground mb-4">
            Profile page is under development
          </p>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
