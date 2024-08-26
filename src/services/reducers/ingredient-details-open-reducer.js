import {INGREDIENT_DETAILS_IS_OPEN, INGREDIENT_DETAILS_IS_CLOSE} from '../actions/ingredient-details-open-action'
const initialState = {
   ingredientObject:{isOpen: false, proteins: 0, fat: 0, carbohydrates: 0, calories: 110, image: "", food_title: "", cardIndex: 0}
}

const ingredientDetailsReducer = (state=initialState, action)=>{

   switch(action.type){ 
      case INGREDIENT_DETAILS_IS_OPEN:
         return {...state, ingredientObject: action.payload}
      case INGREDIENT_DETAILS_IS_CLOSE:
         return {...state, ingredientObject: {...state.ingredientObject, isOpen: false}}
      default:
         return state
   }
}

export default ingredientDetailsReducer