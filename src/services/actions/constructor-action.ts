import Ingredient from "../../utils/types";
export const ADD_INGREDIENT: "ADD_INGREDIENT" = 'ADD_INGREDIENT'
export const REMOVE_INGREDIENT:'REMOVE_INGREDIENT' = 'REMOVE_INGREDIENT' 
export const REORDER_INGREDIENTS:'REORDER_INGREDIENTS' = 'REORDER_INGREDIENTS'


export const addIngredient = (ingredient: Ingredient) => ({
  type: ADD_INGREDIENT,
  payload: ingredient,
});

export const removeIngredient = (generatedId: string) => ({
  type: REMOVE_INGREDIENT,
  payload: generatedId,
});

export const reorderIngredients = (ingredients: Ingredient[]) => ({
  type: REORDER_INGREDIENTS,
  payload: ingredients,
});


export type ConstructorActionTypes =
  | ReturnType<typeof addIngredient>
  | ReturnType<typeof removeIngredient>
  | ReturnType<typeof reorderIngredients>;
