import { Product, Brand, Category, Subcategory, ApiResponse } from '@/interfaces';

export type ProductsResponse = ApiResponse<Product>;
export type BrandsResponse = ApiResponse<Brand>;
export type CategoriesResponse = ApiResponse<Category>;
export type SubcategoriesResponse = ApiResponse<Subcategory>;

// Single item responses
export type SingleProductResponse = {
  data: Product;
}

export type SingleBrandResponse = {
  data: Brand;
}

export type SingleCategoryResponse = {
  data: Category;
}

export type SingleSubcategoryResponse = {
  data: Subcategory;
}