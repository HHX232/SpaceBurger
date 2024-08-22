import {request} from '../../utils/responses'
export const TAKE_INGREDIENTS_PROGRESS = "TAKE_INGREDIENTS_PROGRESS";
export const TAKE_INGREDIENTS_SUCCESS = "TAKE_INGREDIENTS_SUCCESS"; 
export const TAKE_INGREDIENTS_ERROR = "TAKE_INGREDIENTS_ERROR";

 
 
export function takeIngredients() { 
  return function (dispatch) {
    dispatch({ type: TAKE_INGREDIENTS_PROGRESS });

    request('ingredients')  
      .then(data => {
        dispatch({ type: TAKE_INGREDIENTS_SUCCESS, ingredients: data.data });
      })
      .catch(err => {
        console.error(err);
        dispatch({ type: TAKE_INGREDIENTS_ERROR });
      });
  };
}