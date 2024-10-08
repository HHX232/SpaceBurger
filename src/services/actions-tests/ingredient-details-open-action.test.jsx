import {INGREDIENT_DETAILS_IS_OPEN,INGREDIENT_DETAILS_IS_CLOSE,openIngredientDetails,closeIngredientDetails} from '../actions/ingredient-details-open-action'

describe(' ingredient Open/Close Details Action', ()=>{
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
    
it('Open ingredient Details', ()=>{
const expectAction={
   type:INGREDIENT_DETAILS_IS_OPEN,
   payload: ingredient
}
expect(openIngredientDetails(ingredient)).toEqual(expectAction)
})

it('Close ingredient Details', ()=>{
   const expectAction={
      type:INGREDIENT_DETAILS_IS_CLOSE,
      payload: null
   }
   expect(closeIngredientDetails(ingredient.generatedId)).toEqual(expectAction)
})
})