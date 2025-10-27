"use client";

import { Button, Spinner } from "@/Components";
import { useEffect, useState } from "react";
import { Grid, List, Search, Filter, ArrowRight, Tag, Layers, FolderOpen } from "lucide-react";
import { Subcategory } from "@/interfaces";
import { SubcategoriesResponse } from "@/Types";
import { apiServices } from "@/Services/api";
import Link from "next/link";
import { Input } from "@/Components/ui";

export default function SubcategoriesPage() {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "date">("name");

  async function fetchSubcategories() {
    setLoading(true);
    setError(null);
    try {
      const data: SubcategoriesResponse = await apiServices.getAllSubcategories();
      setSubcategories(data.data);
      setFilteredSubcategories(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSubcategories();
  }, []);

  // Filter and sort subcategories
  useEffect(() => {
    let filtered = subcategories;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(subcategory =>
        subcategory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subcategory.slug.toLowerCase().includes(searchQuery.toLowerCase())
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

    setFilteredSubcategories(filtered);
  }, [subcategories, searchQuery, sortBy]);

  if (loading && subcategories.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center">
          <Spinner className="size-20 text-green-500 mb-4" />
          <p className="text-lg text-gray-600">Loading subcategories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-red-50 to-pink-100">
        <div className="text-center">
          <p className="text-red-500 mb-4 text-lg">{error}</p>
          <Button onClick={fetchSubcategories} className="bg-red-500 hover:bg-red-600">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
            Subcategories
          </h1>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Dive deeper into specific product categories and find exactly what you need
          </p>
          <div className="flex items-center justify-center gap-4 text-green-200">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              <span>{subcategories.length} Subcategories</span>
            </div>
            <div className="w-1 h-1 bg-green-300 rounded-full"></div>
            <div className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              <span>Organized</span>
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
                  placeholder="Search subcategories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border-gray-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "name" | "date")}
                  className="border border-gray-200 rounded-md px-3 py-2 text-sm focus:border-green-500 focus:ring-green-500"
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
            Showing {filteredSubcategories.length} of {subcategories.length} subcategories
            {searchQuery && (
              <span className="text-green-600 font-medium"> for "{searchQuery}"</span>
            )}
          </p>
        </div>

        {/* Subcategories Grid */}
        {filteredSubcategories.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No subcategories found</h3>
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
            {filteredSubcategories.map((subcategory, index) => (
              <SubcategoryCard
                key={subcategory._id}
                subcategory={subcategory}
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

interface SubcategoryCardProps {
  subcategory: Subcategory;
  viewMode?: "grid" | "list";
  index: number;
}

function SubcategoryCard({ subcategory, viewMode = "grid", index }: SubcategoryCardProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2);
  };

  const getRandomColor = (name: string) => {
    const colors = [
      'from-blue-400 to-blue-600',
      'from-green-400 to-green-600',
      'from-purple-400 to-purple-600',
      'from-pink-400 to-pink-600',
      'from-orange-400 to-orange-600',
      'from-teal-400 to-teal-600',
      'from-indigo-400 to-indigo-600',
      'from-red-400 to-red-600'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  if (viewMode === "list") {
    return (
      <Link href={`/subcategories/${subcategory._id}`}>
        <div 
          className="flex items-center space-x-6 p-6 bg-white rounded-xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-green-200 group"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br ${getRandomColor(subcategory.name)} flex items-center justify-center`}>
            <span className="text-2xl font-bold text-white">
              {getInitials(subcategory.name)}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors mb-2">
              {subcategory.name}
            </h3>
            <p className="text-gray-500 mb-2">Slug: {subcategory.slug}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Category ID: {subcategory.category}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/subcategories/${subcategory._id}`}>
      <div 
        className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${getRandomColor(subcategory.name)} flex items-center justify-center`}>
          <div className="text-center">
            <span className="text-6xl font-bold text-white mb-2 block">
              {getInitials(subcategory.name)}
            </span>
            <div className="w-16 h-1 bg-white/30 rounded-full mx-auto"></div>
          </div>
          
          {/* Floating Action Button */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
              <ArrowRight className="h-4 w-4 text-green-600" />
            </div>
          </div>

          {/* Subcategory Badge */}
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-green-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Tag className="h-3 w-3" />
              Subcategory
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors mb-3">
            {subcategory.name}
          </h3>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              <span className="font-medium">Slug:</span> {subcategory.slug}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Category ID:</span> {subcategory.category}
            </p>
            {subcategory.createdAt && (
              <p className="text-sm text-gray-400">
                <span className="font-medium">Created:</span> {new Date(subcategory.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-green-600">
              <span className="text-sm font-medium">Explore</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full group-hover:scale-150 transition-transform"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full group-hover:scale-150 transition-transform delay-75"></div>
              <div className="w-2 h-2 bg-green-300 rounded-full group-hover:scale-150 transition-transform delay-150"></div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
