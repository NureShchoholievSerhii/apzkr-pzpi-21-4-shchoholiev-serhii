import { Product } from "../products/product.model";
import { Category } from "./category.model";
import { Image } from "./image.model";

export class Recipe {
    id: string = '';
    name: string = '';
    thumbnail?: Image;
    text: string = '';
    ingredients: Product[] = [];
    categories: Category[] = [];
}