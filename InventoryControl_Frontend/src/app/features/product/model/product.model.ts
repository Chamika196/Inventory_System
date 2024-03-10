import { Category } from "../../product_category/model/category.model";

export interface Product{
    id: string;
    productName: string;
    
    productDescription: string;
    productPrice: number;
    productQuantity: string;
    categories: Category[];
}