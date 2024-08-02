
export const TAKE_INGREDIENTS_PROGRESS = "TAKE_INGREDIENTS_PROGRESS";
export const TAKE_INGREDIENTS_SUCCESS = "TAKE_INGREDIENTS_SUCCESS"; 
export const TAKE_INGREDIENTS_ERROR = "TAKE_INGREDIENTS_ERROR";
export const API = "https://norma.nomoreparties.space/api/ingredients";

export function takeIngredients() {
  return function (dispatch) {
    dispatch({ type: TAKE_INGREDIENTS_PROGRESS });
    fetch(API)
      .then(res => res.json())
      .then(data => {
        if (data && data.success) {
          dispatch({ type: TAKE_INGREDIENTS_SUCCESS, ingredients: data.data });
        } else {
          dispatch({ type: TAKE_INGREDIENTS_ERROR });
        }
      })
      .catch(err => {
         console.error(err)
        dispatch({ type: TAKE_INGREDIENTS_ERROR });
      });
  };
}
