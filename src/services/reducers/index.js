import { combineReducers } from 'redux';
import ingredientReducer from '../reducers/ingredient-reducer'; 
import constructorReducer from '../reducers/constructor-reducer'
const rootReducer = combineReducers({
   //ingredients берется с сервера и прекрасно работает вообще
    ingredients: ingredientReducer,
    //constructor это состояния burgerConstructor
    constructor: constructorReducer
});

export default rootReducer;
