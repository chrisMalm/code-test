import { Category, Items, TypeCategory } from "../types";

export const getUniqueCategoriesByType = (
  items: Items[],
  type: TypeCategory
): Category[] => {
  return Array.from(
    new Set(
      items.filter((item) => item.type === type).map((item) => item.category)
    )
  );
};
