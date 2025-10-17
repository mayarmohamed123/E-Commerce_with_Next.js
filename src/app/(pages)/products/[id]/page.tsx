"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Spinner } from "@/Components";
import { Product } from "@/interfaces";
import { formatPrice } from "@/helpers/currency";
import { renderStars } from "@/helpers/rating";
import { ShoppingCart, Heart, ArrowLeft } from "lucide-react";
import { SingleProductResponse } from "@/Types";
import { apiServices } from "@/Services/api";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(-1);
  const [addToCartLoading, setAddToCartLoading] = useState(false);

  async function getSingleProduct() {
    setLoading(true);
    setError(null);
    try {
      const data: SingleProductResponse = await apiServices.getSingleProduct(
        String(id)
      );
      setProduct(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }
  async function handleAddToCart() {
    setAddToCartLoading(true);
    await apiServices.addProductToCart(product!._id);
    toast.success("Product added to cart");
    setAddToCartLoading(false);
  }

  useEffect(() => {
    getSingleProduct();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner className="size-20 text-blue-500" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Product not found"}</p>
          <Button asChild>
            <Link href="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={product.images[selectedImage] ?? product.imageCover}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-5 gap-2">
                {product.images.slice(0, 5).map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-md ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-gray-200"
                    }`}>
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 25vw, 12.5vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                <Link
                  href={`/brands/${product.brand._id}`}
                  className="hover:text-primary">
                  {product.brand.name}
                </Link>
              </p>
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(product.ratingsAverage)}
                  <span className="text-sm text-muted-foreground ml-1">
                    ({product.ratingsQuantity} reviews)
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.sold} sold
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Category:</span>
                <Link
                  href={`/categories/${product.category._id}`}
                  className="text-primary hover:underline">
                  {product.category.name}
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Stock:</span>
                <span
                  className={
                    product.quantity > 0 ? "text-green-600" : "text-red-600"
                  }>
                  {product.quantity > 0
                    ? `${product.quantity} available`
                    : "Out of stock"}
                </span>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleAddToCart}
                  // onLoad={}
                  disabled={product.quantity === 0 || addToCartLoading}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {addToCartLoading && <Spinner />}
                  {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
