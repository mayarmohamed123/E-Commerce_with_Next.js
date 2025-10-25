"use client";

import React, { useContext, useState } from "react";
import { Button, Spinner } from "../ui";
import { ShoppingCart } from "lucide-react";
import { apiServices } from "@/Services/api";
import toast from "react-hot-toast";
import { cartContext } from "@/Contexts/cartContext";

interface AddToCardButtonProps {
  productQuantity: number;
  productId: string;
}

export default function AddToCardButton({
  productQuantity,
  productId,
}: AddToCardButtonProps) {
  const [addToCartLoading, setAddToCartLoading] = useState<boolean>(false);
  const { setCartCount } = useContext(cartContext);

  async function handleAddToCart() {
    setAddToCartLoading(true);
    const data = await apiServices.addProductToCart(productId);
    setCartCount(data.numOfCartItems);
    toast.success("Product added to cart");
    setAddToCartLoading(false);
  }

  return (
    <Button
      className="w-full"
      size="lg"
      onClick={handleAddToCart}
      disabled={productQuantity === 0 || addToCartLoading}>
      <ShoppingCart className="h-4 w-4 mr-2" />
      {addToCartLoading && <Spinner />}
      {productQuantity > 0 ? "Add to Cart" : "Out of Stock"}
    </Button>
  );
}
