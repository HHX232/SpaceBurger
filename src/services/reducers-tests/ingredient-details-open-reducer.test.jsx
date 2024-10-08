import {
   INGREDIENT_DETAILS_IS_OPEN,
   INGREDIENT_DETAILS_IS_CLOSE,
 } from "../actions/ingredient-details-open-action";
import ingredientDetailsReducer from "../reducers/ingredient-details-open-reducer";


 const initialState = {
   ingredientObject: {
     isOpen: false,
     proteins: 0,
     fat: 0,
     carbohydrates: 0,
     calories: 110,
     image: "",
     food_title: "",
     cardIndex: 0,
   },
 };

 describe("ingredientDetailsReducer test", () => {
it("should success work ", ()=>{
   const action = {type: INGREDIENT_DETAILS_IS_OPEN, payload: {
      isOpen: true,
      proteins: 111,
      fat: 111,
      carbohydrates: 111,
      calories: 110,
      image: "imageURL",
      food_title: "Some title",
      cardIndex: 111,
    } }
    const expectedState = {ingredientObject:{
      isOpen: true,
      proteins: 111,
      fat: 111,
      carbohydrates: 111,
      calories: 110,
      image: "imageURL",
      food_title: "Some title",
      cardIndex: 111,
    } }

    expect(ingredientDetailsReducer(initialState, action)).toEqual(expectedState)
})
it("should return initial state for unknown action ", ()=>{
   const action = {type: "UNKNOWN_ACTION"}
   expect(ingredientDetailsReducer(initialState, action)).toEqual(initialState)
 })
 it("should close ingredient details ", ()=>{
   const action = {type: INGREDIENT_DETAILS_IS_CLOSE}
  const someState = {ingredientObject:{
   isOpen: true,
   proteins: 111,
   fat: 111,
   carbohydrates: 111,
   calories: 110,
   image: "imageURL",
   food_title: "Some title",
   cardIndex: 111,
 } }
   expect(ingredientDetailsReducer(someState, action)).toEqual({ingredientObject:{
    isOpen: false,
    proteins: 111,
    fat: 111,
    carbohydrates: 111,
    calories: 110,
    image: "imageURL",
    food_title: "Some title",
    cardIndex: 111,
  }})
 })
 })

