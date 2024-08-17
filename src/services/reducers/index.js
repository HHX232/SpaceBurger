import { combineReducers } from 'redux';
import ingredientReducer from '../reducers/ingredient-reducer'; 
import constructorReducer from '../reducers/constructor-reducer'
import ingredientDetailsReducer from '../reducers/ingredient-details-open-reducer'
import orderDetailsReducer from '../reducers/order-details-reducer'
import registerReducer from '../reducers/register-reducer'
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
