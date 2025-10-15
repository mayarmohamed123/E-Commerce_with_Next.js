// import Image from "next/image";
"use client";
import { HeroSection } from "@/Components/shared";
import "./globals.css";
import { Button, ProductCard, Spinner } from "@/Components";
import { useEffect, useState } from "react";
import { Grid, List } from "lucide-react";
import { Product } from "@/interfaces";
import { ProductsResponse } from "@/Types";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  async function fetchProducts() {
    setLoading(true);
    const data: ProductsResponse = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products"
    ).then((res) => res.json());
    setProducts(data.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, []);
  if (loading && products.length === 0) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button>Try Again</Button>
        </div>
      </div>
    );
  }
  return (
    <main className="min-h-screen">
      <HeroSection />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-end mb-6">
          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none">
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none">
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              : "grid-cols-1"
          }`}>
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              viewMode={viewMode}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
