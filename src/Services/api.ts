import { CartResponse } from "@/interfaces";
import { ProductsResponse, SingleProductResponse } from "@/Types";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

class ApiServicees {
  baseUrl: string = "";
  constructor() {
    this.baseUrl = baseUrl ?? "";
    console.log("API Base URL:", this.baseUrl);
  }

  // Get All Products

  async getAllProducts(): Promise<ProductsResponse> {
    return await fetch(this.baseUrl + "api/v1/products").then((res) =>
      res.json()
    );
  }

  //   Get Single Product Details

  async getSingleProduct(id: string): Promise<SingleProductResponse> {
    return await fetch(this.baseUrl + `api/v1/products/${id}`).then((res) =>
      res.json()
    );
  }

  getHeaders() {
    return {
      "Content-Type": "application/json",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjZiYTNjZmM1NTUzYzMzNzdhYWU3MyIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzYwNjcwNTEyLCJleHAiOjE3Njg0NDY1MTJ9.8ctXgplcC91P5UpNUeMUh1bTgBqBalzY6-eiHKfQvhQ",
    };
  }

  async addProductToCart(id: string): Promise<CartResponse> {
    return fetch(this.baseUrl + "api/v1/cart", {
      method: "POST",
      body: JSON.stringify({ productId: id }),
      headers: this.getHeaders(),
    }).then((res) => res.json());
  }
}

export const apiServices = new ApiServicees();
