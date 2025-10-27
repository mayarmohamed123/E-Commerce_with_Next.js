"use client";

import { Button, Spinner } from "@/Components";
import { useEffect, useState } from "react";
import { Grid, List, Search, Filter, ArrowRight, Star, ShoppingBag } from "lucide-react";
import { Category } from "@/interfaces";
import { CategoriesResponse } from "@/Types";
import { apiServices } from "@/Services/api";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/Components/ui";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "date">("name");

  async function fetchCategories() {
    setLoading(true);
    setError(null);
    try {
      const data: CategoriesResponse = await apiServices.getAllCategories();
      setCategories(data.data);
      setFilteredCategories(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter and sort categories
  useEffect(() => {
    let filtered = categories;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.slug.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else {
        return new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime();
      }
    });

    setFilteredCategories(filtered);
  }, [categories, searchQuery, sortBy]);

  if (loading && categories.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Spinner className="size-20 text-blue-500 mb-4" />
          <p className="text-lg text-gray-600">Loading amazing categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-red-50 to-pink-100">
        <div className="text-center">
          <p className="text-red-500 mb-4 text-lg">{error}</p>
          <Button onClick={fetchCategories} className="bg-red-500 hover:bg-red-600">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Discover Categories
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Explore our diverse range of product categories and find exactly what you're looking for
          </p>
          <div className="flex items-center justify-center gap-4 text-blue-200">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              <span>{categories.length} Categories</span>
            </div>
            <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              <span>Premium Quality</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "name" | "date")}
                  className="border border-gray-200 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="name">Sort by Name</option>
                  <option value="date">Sort by Date</option>
                </select>
              </div>
              
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none border-0">
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-none border-0">
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCategories.length} of {categories.length} categories
            {searchQuery && (
              <span className="text-blue-600 font-medium"> for "{searchQuery}"</span>
            )}
          </p>
        </div>

        {/* Categories Grid */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No categories found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <Button onClick={() => setSearchQuery("")} variant="outline">
              Clear Search
            </Button>
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}>
            {filteredCategories.map((category, index) => (
              <CategoryCard
                key={category._id}
                category={category}
                viewMode={viewMode}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

interface CategoryCardProps {
  category: Category;
  viewMode?: "grid" | "list";
  index: number;
}

function CategoryCard({ category, viewMode = "grid", index }: CategoryCardProps) {
  if (viewMode === "list") {
    return (
      <Link href={`/categories/${category._id}`}>
        <div 
          className="flex items-center space-x-6 p-6 bg-white rounded-xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-blue-200 group"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
            <Image
              src={category.image || "/placeholder-category.png"}
              alt={category.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder-category.png";
              }}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2">
              {category.name}
            </h3>
            <p className="text-gray-500 mb-2">Slug: {category.slug}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Created: {category.createdAt && new Date(category.createdAt).toLocaleDateString()}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/categories/${category._id}`}>
      <div 
        className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
          <Image
            src={category.image || "/placeholder-category.png"}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder-category.png";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Floating Action Button */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
              <ArrowRight className="h-4 w-4 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-3">
            {category.name}
          </h3>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              <span className="font-medium">Slug:</span> {category.slug}
            </p>
            {category.createdAt && (
              <p className="text-sm text-gray-400">
                <span className="font-medium">Created:</span> {new Date(category.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-600">
              <span className="text-sm font-medium">Explore</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div>
          </div>
        </div>
      </div>
    </Link>
  );
}
