export interface Ingredient {
    id: string,
    name: string,
    packingUnit: PackingUnit,
    quantity: number,
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