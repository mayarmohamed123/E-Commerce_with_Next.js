import { AddToCartResponse, GetUserCartResponse } from "@/interfaces";
import { ProductsResponse, SingleProductResponse } from "@/Types";

class ApiServicees {
  #baseUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL!;
  #getHeaders() {
    return {
      "Content-Type": "application/json",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjZiYTNjZmM1NTUzYzMzNzdhYWU3MyIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzYwNjcwNTEyLCJleHAiOjE3Njg0NDY1MTJ9.8ctXgplcC91P5UpNUeMUh1bTgBqBalzY6-eiHKfQvhQ",
    };
  }

  // Get All Products
  async getAllProducts(): Promise<ProductsResponse> {
    return await fetch(this.#baseUrl + "api/v1/products", {
      next: {
        revalidate: 10,
      },
      cache: "no-cache",
    }).then((res) => res.json());
  }

  //   Get Single Product Details
  async getSingleProduct(id: string): Promise<SingleProductResponse> {
    return await fetch(this.#baseUrl + `api/v1/products/${id}`).then((res) =>
      res.json()
    );
  }

  //  Add Product to Cart
  async addProductToCart(id: string): Promise<AddToCartResponse> {
    return fetch(this.#baseUrl + "api/v1/cart", {
      method: "POST",
      body: JSON.stringify({ productId: id }),
      headers: this.#getHeaders(),
    }).then((res) => res.json());
  }

  // Get User Cart
  async getUserCart(): Promise<GetUserCartResponse> {
    return await fetch(this.#baseUrl + "api/v1/cart", {
      headers: this.#getHeaders(),
    }).then((res) => res.json());
  }

  // Remove Product from Cart
  async removeCartProduct(id: string): Promise<GetUserCartResponse> {
    return await fetch(this.#baseUrl + `api/v1/cart/${id}`, {
      method: "DELETE",
      headers: this.#getHeaders(),
    }).then((res) => res.json());
  }
}

export const apiServices = new ApiServicees();
