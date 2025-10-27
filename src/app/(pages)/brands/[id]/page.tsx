"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Spinner } from "@/Components";
import { Brand } from "@/interfaces";
import { ArrowLeft } from "lucide-react";
import { SingleBrandResponse } from "@/Types";
import { apiServices } from "@/Services/api";

export default function BrandDetailPage() {
  const { id } = useParams();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function getSingleBrand() {
    setLoading(true);
    setError(null);
    try {
      const data: SingleBrandResponse = await apiServices.getSingleBrand(
        String(id)
      );
      setBrand(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getSingleBrand();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner className="size-20 text-blue-500" />
      </div>
    );
  }

  if (error || !brand) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Brand not found"}</p>
          <Button asChild>
            <Link href="/brands">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Brands
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
          <Link href="/brands" className="hover:text-primary">
            Brands
          </Link>
          <span>/</span>
          <span className="text-foreground">{brand.name}</span>
        </nav>

        {/* Brand Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="md:w-1/2">
            <div className="relative aspect-square overflow-hidden rounded-lg border bg-card">
              <Image
                src={brand.image || "/placeholder-brand.png"}
                alt={brand.name}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder-brand.png";
                }}
              />
            </div>
          </div>
          
          <div className="md:w-1/2 space-y-4">
            <h1 className="text-4xl font-bold">{brand.name}</h1>
            <p className="text-lg text-muted-foreground">
              Slug: {brand.slug}
            </p>
            
            {brand.createdAt && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Created: {new Date(brand.createdAt).toLocaleDateString()}
                </p>
                {brand.updatedAt && brand.updatedAt !== brand.createdAt && (
                  <p className="text-sm text-muted-foreground">
                    Updated: {new Date(brand.updatedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}

            <div className="pt-4">
              <Button asChild>
                <Link href={`/products?brand=${brand._id}`}>
                  View Products from this Brand
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Brand Information */}
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Brand Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Brand ID</h3>
              <p className="text-sm font-mono">{brand._id}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Slug</h3>
              <p className="text-sm">{brand.slug}</p>
            </div>
            {brand.createdAt && (
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Created At</h3>
                <p className="text-sm">{new Date(brand.createdAt).toLocaleString()}</p>
              </div>
            )}
            {brand.updatedAt && (
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Updated At</h3>
                <p className="text-sm">{new Date(brand.updatedAt).toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Button asChild variant="outline">
            <Link href="/brands">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Brands
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
