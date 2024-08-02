import {
   ADD_INGREDIENT,
   REMOVE_INGREDIENT,
   REORDER_INGREDIENTS,
 } from '../actions/constructor-action';
 
 const initialState = {
   ingredients: [], 
   bun: null,
 };
 
 const constructorReducer = (state = initialState, action) => {
   switch (action.type) {
     case ADD_INGREDIENT:
       if (action.payload.type === "bun") {
         return {
           ...state,
           bun: action.payload
         };
       }
       return {
         ...state,
         ingredients: [...state.ingredients, action.payload]
       };
       case REMOVE_INGREDIENT:
         return {
           ...state,
           ingredients: state.ingredients ? state.ingredients.filter((item) => item._id !== action.payload) : []
         };
     case REORDER_INGREDIENTS:
       return {
         ...state,
         ingredients: [action.payload]
       };
     default:
       return state;
   }
 };
 
 export default constructorReducer;
 