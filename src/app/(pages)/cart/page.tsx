import React from "react";

import { apiServices } from "@/Services/api";

import InnerCart from "./InnerCart";

export default async function CartPage() {
  async function fetchCartData() {
    const response = await apiServices.getUserCart();
    return response;
  }

  const response = await fetchCartData();

  return <InnerCart cartData={response} />;
}
