// src/actions/ingredients-action.ts

import { Dispatch } from 'redux';
import { request } from '../../utils/responses'; // Adjust the import path as needed
import Ingredient from '../../utils/types';
export const TAKE_INGREDIENTS_PROGRESS = 'TAKE_INGREDIENTS_PROGRESS' as const;
export const TAKE_INGREDIENTS_SUCCESS = 'TAKE_INGREDIENTS_SUCCESS' as const;
export const TAKE_INGREDIENTS_ERROR = 'TAKE_INGREDIENTS_ERROR' as const;

// Define action types
interface TakeIngredientsProgressAction {
  type: typeof TAKE_INGREDIENTS_PROGRESS;
}

interface TakeIngredientsSuccessAction {
  type: typeof TAKE_INGREDIENTS_SUCCESS;
  ingredients: Ingredient[];
}

interface TakeIngredientsErrorAction {
  type: typeof TAKE_INGREDIENTS_ERROR;
}

type TakeIngredientsActions =
  | TakeIngredientsProgressAction
  | TakeIngredientsSuccessAction
  | TakeIngredientsErrorAction;

// Thunk action creator
export function takeIngredients() {
  return function (dispatch: Dispatch<TakeIngredientsActions>) {
    dispatch({ type: TAKE_INGREDIENTS_PROGRESS });

    request<{ data: Ingredient[] }>('ingredients', {})
      .then((response) => {
        dispatch({ type: TAKE_INGREDIENTS_SUCCESS, ingredients: response.data });
      })
      .catch((err: Error) => {
        console.error(err);
        dispatch({ type: TAKE_INGREDIENTS_ERROR });
      });
  };
}
