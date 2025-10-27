"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Spinner } from "@/Components";
import { Subcategory } from "@/interfaces";
import { ArrowLeft } from "lucide-react";
import { SingleSubcategoryResponse } from "@/Types";
import { apiServices } from "@/Services/api";

export default function SubcategoryDetailPage() {
  const { id } = useParams();
  const [subcategory, setSubcategory] = useState<Subcategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function getSingleSubcategory() {
    setLoading(true);
    setError(null);
    try {
      const data: SingleSubcategoryResponse = await apiServices.getSingleSubcategory(
        String(id)
      );
      setSubcategory(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getSingleSubcategory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner className="size-20 text-blue-500" />
      </div>
    );
  }

  if (error || !subcategory) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Subcategory not found"}</p>
          <Button asChild>
            <Link href="/subcategories">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Subcategories
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link href="/subcategories" className="hover:text-primary">
            Subcategories
          </Link>
          <span>/</span>
          <span className="text-foreground">{subcategory.name}</span>
        </nav>

        {/* Subcategory Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="md:w-1/2">
            <div className="relative aspect-square overflow-hidden rounded-lg border bg-card">
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <span className="text-8xl font-bold text-muted-foreground">
                  {subcategory.name.charAt(0)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 space-y-4">
            <h1 className="text-4xl font-bold">{subcategory.name}</h1>
            <p className="text-lg text-muted-foreground">
              Slug: {subcategory.slug}
            </p>
            
            {subcategory.createdAt && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Created: {new Date(subcategory.createdAt).toLocaleDateString()}
                </p>
                {subcategory.updatedAt && subcategory.updatedAt !== subcategory.createdAt && (
                  <p className="text-sm text-muted-foreground">
                    Updated: {new Date(subcategory.updatedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}

            <div className="pt-4 space-x-4">
              <Button asChild>
                <Link href={`/products?subcategory=${subcategory._id}`}>
                  View Products in this Subcategory
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={`/categories/${subcategory.category}`}>
                  View Parent Category
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Subcategory Information */}
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Subcategory Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Subcategory ID</h3>
              <p className="text-sm font-mono">{subcategory._id}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Slug</h3>
              <p className="text-sm">{subcategory.slug}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Parent Category ID</h3>
              <p className="text-sm font-mono">{subcategory.category}</p>
            </div>
            {subcategory.createdAt && (
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Created At</h3>
                <p className="text-sm">{new Date(subcategory.createdAt).toLocaleString()}</p>
              </div>
            )}
            {subcategory.updatedAt && (
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Updated At</h3>
                <p className="text-sm">{new Date(subcategory.updatedAt).toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Button asChild variant="outline">
            <Link href="/subcategories">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Subcategories
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
