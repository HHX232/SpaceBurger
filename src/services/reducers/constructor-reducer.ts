// src/reducers/constructorReducer.ts
import {
   ADD_INGREDIENT,
   REMOVE_INGREDIENT,
   REORDER_INGREDIENTS,
 } from '../actions/constructor-action';
 import starIMG from '../../images/star-svgrepo-com.svg';
 
 interface BigIngredient {
   _id: string;
   text: string;
   type: string;
   proteins: number;
   fat: number;
   carbohydrates: number;
   calories: number;
   price: number;
   image: string;
   image_mobile: string;
   image_large: string;
   __v: number;
   generatedId?: string; 
 }
 export interface ConstructorState {
   ingredients: BigIngredient[];
   bun: BigIngredient;
 }
 
 interface AddIngredientAction {
   type: typeof ADD_INGREDIENT;
   payload: BigIngredient;
 }
 
 interface RemoveIngredientAction {
   type: typeof REMOVE_INGREDIENT;
   payload: string; 
 }
 
 interface ReorderIngredientsAction {
   type: typeof REORDER_INGREDIENTS;
   payload: BigIngredient[]; 
 }
 
 type ConstructorActions =
   | AddIngredientAction
   | RemoveIngredientAction
   | ReorderIngredientsAction;
 
 const initialState: ConstructorState = {
   ingredients: [], 
   bun: {
     _id: "11111111111",
     text: "Перетащите булочку",
     type: "bun",
     proteins: 0,
     fat: 0,
     carbohydrates: 0,
     calories: 0,
     price: 0,
     image: starIMG,
     image_mobile: starIMG,
     image_large: starIMG,
     __v: 0,
   },
 };
 
 // Constructor reducer function
 const constructorReducer = (state = initialState, action: ConstructorActions): ConstructorState => {
   switch (action.type) {
     case ADD_INGREDIENT:
       if (action.payload.type === "bun") {
         return {
           ...state,
           bun: action.payload,
           ingredients: state.ingredients.filter((item) => item.type !== "bun"),
         };
       }
       return {
         ...state,
         ingredients: [...state.ingredients, action.payload],
       };
 
     case REMOVE_INGREDIENT:
       return {
         ...state,
         ingredients: state.ingredients.filter((item) => item.generatedId !== action.payload),
       };
 
     case REORDER_INGREDIENTS: {
       const newIngredients = action.payload;
       const currentIngredients = [...state.ingredients];
       
       newIngredients.forEach((newItem, newIndex) => {
         const currentIndex = currentIngredients.findIndex(
           (item) => item.generatedId === newItem.generatedId
         );
         if (currentIndex !== -1 && currentIndex !== newIndex) {
           const [movedItem] = currentIngredients.splice(currentIndex, 1);
           currentIngredients.splice(newIndex, 0, movedItem);
         }
       });
 
       return {
         ...state,
         ingredients: currentIngredients,
       };
     }
 
     default:
       return state;
   }
 };
 
 export default constructorReducer;
 