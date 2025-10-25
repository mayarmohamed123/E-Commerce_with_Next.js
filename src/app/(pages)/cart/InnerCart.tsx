"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/helpers/currency";
import { Button } from "@/Components";
import { Loader2, Trash2 } from "lucide-react";
import CartProduct from "@/Components/products/CartProduct";
import { GetUserCartResponse } from "@/interfaces";
import { apiServices } from "@/Services/api";
import toast from "react-hot-toast";
import { cartContext } from "@/Contexts/cartContext";

interface InnerCartProps {
  cartData: GetUserCartResponse;
}

export default function InnerCart({ cartData }: InnerCartProps) {
  const [innerCartData, setInnerCartData] =
    useState<GetUserCartResponse>(cartData);
  const [isClearingCart, setIsClearingCart] = useState<boolean>(false);
  const { setCartCount } = useContext(cartContext);

  useEffect(() => {
    setCartCount(innerCartData.numOfCartItems);
  }, [innerCartData]);

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
    const newCartResponse = await apiServices.getUserCart();
    setInnerCartData(newCartResponse);
  }

  async function handleClearCart() {
    setIsClearingCart(true);
    const response = await apiServices.clearUserCart();
    console.log(response);
    setIsClearingCart(false);
    toast.success("Cart cleared successfully", {
      position: "bottom-right",
    });
    const newCartResponse = await apiServices.getUserCart();
    setInnerCartData(newCartResponse);
  }

  async function handleUpdateCartProduct(productId: string, count: number) {
    const response = await apiServices.updateCartProductCount(productId, count);
    console.log(response);
    const newCartData = await apiServices.getUserCart();
    setInnerCartData(newCartData);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
        {innerCartData.numOfCartItems > 0 && (
          <p className="text-muted-foreground">
            {innerCartData.numOfCartItems} item
            {innerCartData.numOfCartItems !== 1 ? "s" : ""} in your cart
          </p>
        )}
      </div>

      {innerCartData.numOfCartItems > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {innerCartData.data.products.map((item) => (
                <CartProduct
                  key={item._id}
                  item={item}
                  handleRemoveProduct={handleRemoveProduct}
                  handleUpdateCartProduct={handleUpdateCartProduct}
                />
              ))}
            </div>

            {/* Clear Cart */}
            <div className="mt-6">
              <Button
                disabled={isClearingCart}
                onClick={handleClearCart}
                variant="destructive">
                {isClearingCart ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4 mr-2" />
                )}
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
                  <span>Subtotal ({innerCartData.numOfCartItems} items)</span>
                  <span>{formatPrice(innerCartData.data.totalCartPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">free</span>
                </div>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between font-semibold text-lg mb-6">
                <span>Total</span>
                <span>{formatPrice(innerCartData.data.totalCartPrice)}</span>
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
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4 text-gary-700">
            No Product in your cart{" "}
          </h2>
          <Button variant="outline" className="w-fit mt-2" asChild>
            <Link href="/products"> Add Product First</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
