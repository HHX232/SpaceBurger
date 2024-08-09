import {
   ADD_INGREDIENT,
   REMOVE_INGREDIENT,
   REORDER_INGREDIENTS,
 } from '../actions/constructor-action';
 import starIMG from '../../images/star-svgrepo-com.svg'
 const initialState = {
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
      image:starIMG,
      image_mobile: starIMG,
      image_large: starIMG,
      __v: 0,
    },
 };
 
 const constructorReducer = (state = initialState, action) => {
   switch (action.type) {
     case ADD_INGREDIENT:
      if (action.payload.type === "bun") {
        return {
          ...state,
          bun: action.payload,
          ingredients: state.ingredients.filter((item) => item.type !== "bun")
        };
      }
       return {
         ...state,
         ingredients: [...state.ingredients, action.payload]
       };
        case REMOVE_INGREDIENT:
          return {
            ...state,
            ingredients: state.ingredients.filter((item) => item.generatedId !== action.payload),
          };
          case REORDER_INGREDIENTS:
            return {
              ...state,
              ingredients: action.payload ?? []
            };
     default:
       return state;
   }
 };
 
 export default constructorReducer;
 