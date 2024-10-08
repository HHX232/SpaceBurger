
import { type } from 'os';
import {
   ADD_INGREDIENT,
   REMOVE_INGREDIENT,
   REORDER_INGREDIENTS,
 } from '../actions/constructor-action';
import constructorReducer from '../reducers/constructor-reducer';

 
 const initialState = {
   ingredients: [{_id:"123"},{_id:"456"}], 
   bun: {
     _id: "11111111111",
     text: "Перетащите булочку",
     type: "bun",
     proteins: 0,
     fat: 0,
     carbohydrates: 0,
     calories: 0,
     price: 0,
     image: "starIMG",
     image_mobile: "starIMG",
     image_large: "starIMG",
     __v: 0,
   },
 };

 describe("constructor reducer test", ()=>{
it("success push ingerdient, not bun", ()=>{
   const action = {type:ADD_INGREDIENT, payload:{type:"souce", _id: "11111111111",
      text: "some text",
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 10,
      price: 10,
      image: "starIMG222",
      image_mobile: "starIMG222",
      image_large: "starIMG222",
      __v: 122,}
     }

const expectedState = {ingredients:[{_id:"123"},{_id:"456"},{type:"souce", _id: "11111111111",
   text: "some text",
   proteins: 10,
   fat: 10,
   carbohydrates: 10,
   calories: 10,
   price: 10,
   image: "starIMG222",
   image_mobile: "starIMG222",
   image_large: "starIMG222",
   __v: 122,}], bun: {
      _id: "11111111111",
      text: "Перетащите булочку",
      type: "bun",
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: "starIMG",
      image_mobile: "starIMG",
      image_large: "starIMG",
      __v: 0,
    }

}
      expect(constructorReducer(initialState, action)).toEqual(expectedState)
})
it("succes add bun", ()=>{
   const action = {type:ADD_INGREDIENT, payload:{type:"bun", _id: "1234",
      text: "some text",
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 10,
      price: 10,
      image: "starIMG222",
      image_mobile: "starIMG222",
      image_large: "starIMG222",
      __v: 122,}
     }
     const expectedState = {ingredients:[{_id:"123"},{_id:"456"}], bun: {
         _id: "1234",
         text: "some text",
         type: "bun",
         proteins: 10,
         fat: 10,
         carbohydrates: 10,
         calories: 10,
         price: 10,
         image: "starIMG222",
         image_mobile: "starIMG222",
         image_large: "starIMG222",
         __v: 122,
       }
   }
   expect(constructorReducer(initialState, action)).toEqual(expectedState)
})
it("Unknown action", ()=>{
   const action = {type: "UNKNOWN_ACTION"}
   expect(constructorReducer(initialState, action)).toEqual(initialState)
})
it("success remove item", ()=>{
   const action = {type: REMOVE_INGREDIENT, payload: "999"}
   const errorAction = {type: REMOVE_INGREDIENT, payload: "8888888"}
   const currentState = {bun:{}, ingredients:[{generatedId:"111"},{generatedId:"222"},{generatedId:"999"}]}
   const expectedState = {bun:{}, ingredients:[{generatedId:"111"},{generatedId:"222"}]}
   expect(constructorReducer(currentState, action)).toEqual(expectedState)
expect(constructorReducer(currentState, errorAction)).toEqual(currentState)
})

it('should reorder ingredients', () => {
   const initialState = {
     ingredients: [
       { generatedId: 1, name: 'Ingredient 1' },
       { generatedId: 2, name: 'Ingredient 2' },
       { generatedId: 3, name: 'Ingredient 3' },
     ],
   };

   const action = {
     type: REORDER_INGREDIENTS,
     payload: [
       { generatedId: 3, name: 'Ingredient 3' },
       { generatedId: 1, name: 'Ingredient 1' },
       { generatedId: 2, name: 'Ingredient 2' },
     ],
   };

   const expectedState = {
     ingredients: [
       { generatedId: 3, name: 'Ingredient 3' },
       { generatedId: 1, name: 'Ingredient 1' },
       { generatedId: 2, name: 'Ingredient 2' },
     ],
   };

   expect(constructorReducer(initialState, action)).toEqual(expectedState);
 });

 it('should not reorder ingredients if no changes', () => {
   const initialState = {
     ingredients: [
       { generatedId: 1, name: 'Ingredient 1' },
       { generatedId: 2, name: 'Ingredient 2' },
       { generatedId: 3, name: 'Ingredient 3' },
     ],
   };

   const action = {
     type: REORDER_INGREDIENTS,
     payload: [
       { generatedId: 1, name: 'Ingredient 1' },
       { generatedId: 2, name: 'Ingredient 2' },
       { generatedId: 3, name: 'Ingredient 3' },
     ],
   };

   expect(constructorReducer(initialState, action)).toEqual(initialState);
 });

 it('should handle empty payload', () => {
   const initialState = {
     ingredients: [
       { generatedId: 1, name: 'Ingredient 1' },
       { generatedId: 2, name: 'Ingredient 2' },
       { generatedId: 3, name: 'Ingredient 3' },
     ],
   };

   const action = {
     type: REORDER_INGREDIENTS,
     payload: [],
   };

   expect(constructorReducer(initialState, action)).toEqual(initialState);
 });
 })