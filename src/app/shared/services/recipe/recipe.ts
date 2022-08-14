import { Ingredient } from "./ingredient"

export interface Recipe {
    id: string,
    name: string,
    owner: string,
    preparationText: string,
    ingredients: string[],
    category: Category,
    foodType: FoodType
}

export enum Category {
    RICE, POTATO, SOUP, FISH, GRAIN
}

export enum FoodType {
	MAIN_COURSE, DESSERT, APPETIZER
}
