import {
   ADD_INGREDIENT,
   REMOVE_INGREDIENT,
   REORDER_INGREDIENTS,
 } from '../actions/constructor-action';
 
 const initialState = {
   ingredients: [], 
   bun: {
      _id: "11111111111",
      text: "Выберите булочку",
      type: "bun",
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      __v: 0,
    },
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
         ingredients: action.payload ?? []
       };
     default:
       return state;
   }
 };
 
 export default constructorReducer;
 