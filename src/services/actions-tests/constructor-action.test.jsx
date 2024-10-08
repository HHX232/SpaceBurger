import {ADD_INGREDIENT,REMOVE_INGREDIENT,REORDER_INGREDIENTS, addIngredient,removeIngredient,reorderIngredients} from '../actions/constructor-action'

const ingredient = {
   _id: "1234567890",
   text: "Chicken Breast",
   type: "meat",
   proteins: 35,
   fat: 10,
   carbohydrates: 0,
   calories: 165,
   price: 250,
   image: "https://example.com/chicken-breast.jpg",
   image_mobile: "https://example.com/chicken-breast-mobile.jpg",
   image_large: "https://example.com/chicken-breast-large.jpg",
   __v: 0,
   isOpen: false,
   name: "Chicken Breast",
   food_title: "Chicken Breast Fillet",
   generatedId: "INGREDIENT_123"
 }
 
describe('Constructor Action creator', ()=>{

   it('Should create an action with new ingredient', ()=>{
      
      const expectedAction = {
         type: ADD_INGREDIENT,
         payload: ingredient
      }
      expect(addIngredient(ingredient)).toEqual(expectedAction)
   })
   it('Should create an action with removed ingredient', ()=>{

      const expectedAction = {
         type: REMOVE_INGREDIENT,
         payload: ingredient.generatedId
      }
      expect(removeIngredient(ingredient.generatedId)).toEqual(expectedAction)
   })
   it('Reorder Ingredients ACtion', ()=>{
      const expectedIngredientsArray =[ingredient, ingredient]
      const expectedAction = {
         type:REORDER_INGREDIENTS,
         payload: expectedIngredientsArray
      }
      expect(reorderIngredients(expectedIngredientsArray)).toEqual(expectedAction)
   })
})