export interface Ingredient {
    id: string,
    owner: string,
    name: string,
    packingUnit: PackingUnit,
    quantity: number,
    category: Category,
    price: number,
    allergens: Allergens[]
}

export enum PackingUnit {
    KILOGRAMM, GRAMM, LITRE, MILLILITRE, POUND
}

export enum Allergens {
    MILK, FISH, CEREALS, CRUSTACEANS, EGGS, 
    LUPIN, MOLLUSCS, MUSTARD, NUTS, PEANUTS, SESAME_SEEDS,
    SOY, SULPUHR_DIOXIDE
}

export enum Category {
    VEGETABLES, DAIRY_RODUCT, FISH, SEASONING, GRAIN,
    FRUIT, MISCELLANEOUS, STAPLE_FOOD
}