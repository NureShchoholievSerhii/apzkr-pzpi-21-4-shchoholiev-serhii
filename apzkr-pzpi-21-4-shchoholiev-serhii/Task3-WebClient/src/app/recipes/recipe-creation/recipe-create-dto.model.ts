import { Product } from "../../products/product.model";
import { Category } from "../category.model";

export class RecipeCreateDto {
    name: string = '';
    thumbnail: File | null = null;
    text: string = '';
    ingredients: Product[] = [];
    categories: Category[] = [];
    groupId: string = '';
}
