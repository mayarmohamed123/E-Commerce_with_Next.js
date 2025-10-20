"use client";
import React, { useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/helpers/currency";
import { Button } from "@/Components";
import { Trash2 } from "lucide-react";
import CartProduct from "@/Components/products/CartProduct";
import { GetUserCartResponse } from "@/interfaces";
import { apiServices } from "@/Services/api";
import toast from "react-hot-toast";

interface InnerCartProps {
  cartData: GetUserCartResponse;
}

export default function InnerCart({ cartData }: InnerCartProps) {
  const [innerCartData, setInnerCartData] =
    useState<GetUserCartResponse>(cartData);

  async function handleRemoveProduct(
    productId: string,
    setIsRemovingProduct: (value: boolean) => void
  ) {
    setIsRemovingProduct(true);
    const response = await apiServices.removeCartProduct(productId);
    console.log(response);
    toast.success("Product removed from cart", {
      position: "bottom-right",
    });
    setIsRemovingProduct(false);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
        <p className="text-muted-foreground">
          {cartData.numOfCartItems} item
          {cartData.numOfCartItems !== 1 ? "s" : ""} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartData.data.products.map((item) => (
              <CartProduct key={item._id} item={item} />
            ))}
          </div>

          {/* Clear Cart */}
          <div className="mt-6">
            <Button variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Orders Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-4">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal ({cartData.numOfCartItems} items)</span>
                <span>{formatPrice(cartData.data.totalCartPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">free</span>
              </div>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-semibold text-lg mb-6">
              <span>Total</span>
              <span>{formatPrice(cartData.data.totalCartPrice)}</span>
            </div>

            <Button className="w-full" size="lg">
              Proceed to checkout
            </Button>

            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
