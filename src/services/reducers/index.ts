import { combineReducers } from 'redux';
import ingredientReducer, { IIngredientsState } from './ingredient-reducer'; 
import constructorReducer, { ConstructorState } from './constructor-reducer'
import ingredientDetailsReducer, { IIngredientDetailsState } from './ingredient-details-open-reducer'
import orderDetailsReducer, { IOrderDetailsState } from './order-details-reducer'
import registerReducer, { RegisterState } from './register-reducer'

export interface IRootReducers {
    ingredients: IIngredientsState,
    constructorList: ConstructorState,
    ingredientDetails: IIngredientDetailsState,
    orderDetails: IOrderDetailsState,
    register: RegisterState, 
}

const rootReducer = combineReducers({
   //ingredients берется с сервера и прекрасно работает вообще
    ingredients: ingredientReducer,
    //constructor это состояния burgerConstructor
    constructorList: constructorReducer,
    //модальное окно деталей ингредиента
    ingredientDetails: ingredientDetailsReducer ,
    orderDetails: orderDetailsReducer,
    register: registerReducer, 
});

export default rootReducer;
