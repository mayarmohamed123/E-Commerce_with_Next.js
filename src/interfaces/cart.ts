import { Brand } from "./brand";
import { Category, Subcategory } from "./category";

export interface AddToCartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartResponseData<string>;
}

export interface GetUserCartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartResponseData<InnerProduct>;
}

export interface CartResponseData<T> {
  _id: string;
  cartOwner: string;
  products: CartProduct<T>[];
  createdAt: string;
  updatedAt: string;
  totalCartPrice: number;
}

export interface CartProduct<T> {
  count: number;
  _id: string;
  product: T;
  price: number;
}

export interface InnerProduct {
  subcategory: Subcategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}
