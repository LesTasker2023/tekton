import type { SchemaTypeDefinition } from "sanity";
import { itemType } from "./schemas/item";
import { itemCategoryType } from "./schemas/itemCategory";

export const catalogSchemas: SchemaTypeDefinition[] = [
  itemType,
  itemCategoryType,
];
