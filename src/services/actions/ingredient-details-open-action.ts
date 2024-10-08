import Ingredient from "../../utils/types"

export const INGREDIENT_DETAILS_IS_OPEN = "INGREDIENT_DETAILS_IS_OPEN"
export const INGREDIENT_DETAILS_IS_CLOSE = "INGREDIENT_DETAILS_IS_CLOSE"

export type Tingredient = {
  _id: string | number;
  id:string | number;
  text: string;
  type: string;
  proteins: number;
  fat: number;
  name: string;
  food_title:string;
  cardIndex: string | number
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}
export const openIngredientDetails = (ingredient: Ingredient | Tingredient)=>({
  type: INGREDIENT_DETAILS_IS_OPEN,
  payload: ingredient
})

export const closeIngredientDetails = ()=>({
    type: INGREDIENT_DETAILS_IS_CLOSE,
    payload: null
})
 