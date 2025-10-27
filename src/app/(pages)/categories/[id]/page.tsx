"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Spinner } from "@/Components";
import { Category } from "@/interfaces";
import { ArrowLeft, Calendar, Tag, ExternalLink, ShoppingBag, Star } from "lucide-react";
import { SingleCategoryResponse } from "@/Types";
import { apiServices } from "@/Services/api";

export default function CategoryDetailPage() {
  const { id } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function getSingleCategory() {
    setLoading(true);
    setError(null);
    try {
      const data: SingleCategoryResponse = await apiServices.getSingleCategory(
        String(id)
      );
      setCategory(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getSingleCategory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Spinner className="size-20 text-blue-500 mb-4" />
          <p className="text-lg text-gray-600">Loading category details...</p>
        </div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-red-50 to-pink-100">
        <div className="text-center">
          <p className="text-red-500 mb-4 text-lg">{error || "Category not found"}</p>
          <Button asChild className="bg-red-500 hover:bg-red-600">
            <Link href="/categories">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-blue-200 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-white transition-colors">
              Categories
            </Link>
            <span>/</span>
            <span className="text-white font-medium">{category.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/3">
              <div className="relative aspect-square overflow-hidden rounded-2xl border-4 border-white/20 bg-white/10 backdrop-blur-sm">
                <Image
                  src={category.image || "/placeholder-category.png"}
                  alt={category.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder-category.png";
                  }}
                />
              </div>
            </div>
            
            <div className="lg:w-2/3 text-center lg:text-left">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                {category.name}
              </h1>
              <p className="text-xl text-blue-100 mb-6">
                Explore products in this category and discover amazing items
              </p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-blue-200 mb-8">
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  <span>Slug: {category.slug}</span>
                </div>
                {category.createdAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>Created: {new Date(category.createdAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  <Link href={`/products?category=${category._id}`}>
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    View Products
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Link href="/categories">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to Categories
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Category Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Tag className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Category Details</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 mb-1">Category ID</p>
                <p className="text-sm font-mono bg-gray-50 p-2 rounded">{category._id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Slug</p>
                <p className="text-sm font-medium">{category.slug}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Timeline</h3>
            </div>
            <div className="space-y-3">
              {category.createdAt && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Created At</p>
                  <p className="text-sm font-medium">{new Date(category.createdAt).toLocaleString()}</p>
                </div>
              )}
              {category.updatedAt && category.updatedAt !== category.createdAt && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Updated At</p>
                  <p className="text-sm font-medium">{new Date(category.updatedAt).toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
            </div>
            <div className="space-y-3">
              <Button asChild className="w-full justify-start" variant="outline">
                <Link href={`/products?category=${category._id}`}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Browse Products
                </Link>
              </Button>
              <Button asChild className="w-full justify-start" variant="outline">
                <Link href="/categories">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  All Categories
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Discover amazing products in the {category.name} category and find exactly what you're looking for.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
            <Link href={`/products?category=${category._id}`}>
              <ShoppingBag className="h-5 w-5 mr-2" />
              Start Shopping
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
