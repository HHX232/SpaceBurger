export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const REORDER_INGREDIENTS = 'REORDER_INGREDIENTS';

export const addIngredient = (ingredient) => ({
  type: ADD_INGREDIENT, 
  payload: ingredient
});

export const removeIngredient = (id) => ({
  type: REMOVE_INGREDIENT,
  payload: id
});

export const reorderIngredients = (ingredients) => ({
  type: REORDER_INGREDIENTS,
  payload: ingredients
});
