import { AddToCartResponse, GetUserCartResponse, Category, Brand, Subcategory } from "@/interfaces";
import { ProductsResponse, SingleProductResponse, CategoriesResponse, BrandsResponse, SubcategoriesResponse, SingleCategoryResponse, SingleBrandResponse, SingleSubcategoryResponse } from "@/Types";
import { json } from "stream/consumers";

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

  // Clear User Cart
  async clearUserCart(): Promise<GetUserCartResponse> {
    return await fetch(this.#baseUrl + `api/v1/cart`, {
      method: "DELETE",
      headers: this.#getHeaders(),
    }).then((res) => res.json());
  }

  // Update Cat Product Count
  async updateCartProductCount(
    productId: string,
    count: number
  ): Promise<GetUserCartResponse> {
    return await fetch(this.#baseUrl + `api/v1/cart/` + productId, {
      method: "put",
      headers: this.#getHeaders(),
      body: JSON.stringify({
        count,
      }),
    }).then((res) => res.json());
  }

  // Get All Categories
  async getAllCategories(): Promise<CategoriesResponse> {
    return await fetch(this.#baseUrl + "api/v1/categories", {
      next: {
        revalidate: 10,
      },
      cache: "no-cache",
    }).then((res) => res.json());
  }

  // Get Single Category Details
  async getSingleCategory(id: string): Promise<SingleCategoryResponse> {
    return await fetch(this.#baseUrl + `api/v1/categories/${id}`).then((res) =>
      res.json()
    );
  }

  // Get All Brands
  async getAllBrands(): Promise<BrandsResponse> {
    return await fetch(this.#baseUrl + "api/v1/brands", {
      next: {
        revalidate: 10,
      },
      cache: "no-cache",
    }).then((res) => res.json());
  }

  // Get Single Brand Details
  async getSingleBrand(id: string): Promise<SingleBrandResponse> {
    return await fetch(this.#baseUrl + `api/v1/brands/${id}`).then((res) =>
      res.json()
    );
  }

  // Get All Subcategories
  async getAllSubcategories(): Promise<SubcategoriesResponse> {
    return await fetch(this.#baseUrl + "api/v1/subcategories", {
      next: {
        revalidate: 10,
      },
      cache: "no-cache",
    }).then((res) => res.json());
  }

  // Get Single Subcategory Details
  async getSingleSubcategory(id: string): Promise<SingleSubcategoryResponse> {
    return await fetch(this.#baseUrl + `api/v1/subcategories/${id}`).then((res) =>
      res.json()
    );
  }
}

export const apiServices = new ApiServicees();
