import { combineReducers } from 'redux';
import ingredientReducer, { IIngredientsState } from '../reducers/ingredient-reducer'; 
import constructorReducer, { ConstructorState } from '../reducers/constructor-reducer'
import ingredientDetailsReducer, { IIngredientDetailsState } from '../reducers/ingredient-details-open-reducer'
import orderDetailsReducer, { IOrderDetailsState } from '../reducers/order-details-reducer'
import registerReducer, { RegisterState } from '../reducers/register-reducer'
import { socketReducer } from '../reducers/socket-reducer';
import { Order } from '../../components/Pages/Feed/Feed';
import rootReducer from '../reducers';

describe('rootReducer', () => {
   it('should return the initial state', () => {
     const initialState = {
       ingredients: ingredientReducer(undefined, {}),
       constructorList: constructorReducer(undefined, {}),
       ingredientDetails: ingredientDetailsReducer(undefined, {}),
       orderDetails: orderDetailsReducer(undefined, {}),
       register: registerReducer(undefined, {}),
       socket: socketReducer(undefined, {}),
     };
 
     expect(rootReducer(undefined, {})).toEqual(initialState);
   });
 
   it('should handle actions correctly', () => {
     const action = { type: 'SOME_ACTION' };
 
     const ingredientState = ingredientReducer(undefined, action);
     const constructorState = constructorReducer(undefined, action);
     const ingredientDetailsState = ingredientDetailsReducer(undefined, action);
     const orderDetailsState = orderDetailsReducer(undefined, action);
     const registerState = registerReducer(undefined, action);
     const socketState = socketReducer(undefined, action);
 
     const expectedState = {
       ingredients: ingredientState,
       constructorList: constructorState,
       ingredientDetails: ingredientDetailsState,
       orderDetails: orderDetailsState,
       register: registerState,
       socket: socketState,
     };
 
     expect(rootReducer(undefined, action)).toEqual(expectedState);
   });
 });