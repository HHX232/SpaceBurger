import { 
   TAKE_INGREDIENTS_PROGRESS, 
   TAKE_INGREDIENTS_SUCCESS, 
   TAKE_INGREDIENTS_ERROR 
 } from '../actions/ingredient-action';
 
 const initialState = {
   globalIngredients: [], 
   ingredientsProgress: false,
   ingredientsFaild: false
 };
 
 const ingredientReducer = (state = initialState, action) => {
   switch (action.type) {
     case TAKE_INGREDIENTS_PROGRESS:
       console.log("ingredients in progress");
       return { ...state, ingredientsProgress: true, ingredientsFaild: false };
     case TAKE_INGREDIENTS_SUCCESS:
       console.log("ingredients ready");
       return { ...state, globalIngredients: action.ingredients, ingredientsProgress: false, ingredientsFaild: false };
     case TAKE_INGREDIENTS_ERROR:
       console.log("ERROR!!!!");
       return { ...state, ingredientsProgress: false, ingredientsFaild: true };
     default:
       return state;
   }
 };
 
 export default ingredientReducer;
 