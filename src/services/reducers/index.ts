import { combineReducers } from 'redux';
import ingredientReducer from './ingredient-reducer'; 
import constructorReducer from './constructor-reducer'
import ingredientDetailsReducer from './ingredient-details-open-reducer'
import orderDetailsReducer from './order-details-reducer'
import registerReducer from './register-reducer'
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
