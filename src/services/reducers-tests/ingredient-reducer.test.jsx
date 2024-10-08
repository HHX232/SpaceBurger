import ingredientReducer from "../reducers/ingredient-reducer";
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
 
// ingredientReducer
describe("test ingedient reducer", ()=>{
const spy = jest.spyOn(console, 'log')
afterEach(() => {
   spy.mockClear(); 
 });

it('should initial progress',()=>{
   const newinitialState = {
      globalIngredients: [], 
      ingredientsProgress: false,
      ingredientsFaild: true
    };
   expect(ingredientReducer(newinitialState, {type:TAKE_INGREDIENTS_PROGRESS})).toEqual({...newinitialState, ingredientsProgress: true, ingredientsFaild: false})
   expect(spy).toHaveBeenCalledTimes(1)
   expect(spy).toHaveBeenCalledWith("ingredients in progress")
})
it('should success take ingerdients', ()=>{

   const action = {type:TAKE_INGREDIENTS_SUCCESS, ingredients:[{number:"1"},{number:"2"}]}
   const expectedState = {
      globalIngredients: action.ingredients, 
      ingredientsProgress: false, 
      ingredientsFaild: false
    };
   expect(ingredientReducer(initialState, action)).toEqual(expectedState)
})
it('should throw error in ingredient reducer', ()=>{
   const action = {type:TAKE_INGREDIENTS_ERROR, error: new Error("Some error")}
   const expectedState = {
      globalIngredients: [], 
      ingredientsProgress: false, 
      ingredientsFaild: true
    };
   expect(ingredientReducer(initialState, action)).toEqual(expectedState)
   expect(spy).toHaveBeenCalledTimes(1)
   expect(spy).toHaveBeenCalledWith("ERROR!!!!")
})
it('ingredient reducer with unknoun action', ()=>{
   const action = {type: "UNKNOWN_ACTION"}
   expect(ingredientReducer(initialState, action)).toEqual(initialState)
})
})