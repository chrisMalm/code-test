export type TypeCategory = "all" | "accessories" | "tops" | "bottom" | "sports";

export type Category =
  | "Sunglasses"
  | "Watches"
  | "Bags"
  | "Jeans"
  | "T-Shirts"
  | "Hoodies"
  | "Shoes";

export interface Items {
  name: string;
  category: Category;
  type: TypeCategory;
}
