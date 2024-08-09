export const INGREDIENT_DETAILS_IS_OPEN = "INGREDIENT_DETAILS_IS_OPEN"
export const INGREDIENT_DETAILS_IS_CLOSE = "INGREDIENT_DETAILS_IS_CLOSE"

export const openIngredientDetails = (ingredient)=>({
  type: INGREDIENT_DETAILS_IS_OPEN,
  payload: ingredient
})
export const closeIngredientDetails = ()=>({
    type: INGREDIENT_DETAILS_IS_CLOSE,
    payload: null
})
