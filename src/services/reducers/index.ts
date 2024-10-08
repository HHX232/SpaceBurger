import { combineReducers } from 'redux';
import ingredientReducer, { IIngredientsState } from './ingredient-reducer'; 
import constructorReducer, { ConstructorState } from './constructor-reducer'
import ingredientDetailsReducer, { IIngredientDetailsState } from './ingredient-details-open-reducer'
import orderDetailsReducer, { IOrderDetailsState } from './order-details-reducer'
import registerReducer, { RegisterState } from './register-reducer'
import { socketReducer } from './socket-reducer';
import { Order } from '../../components/Pages/Feed/Feed';
export interface SocketState {
    orders: Order[];      // Список всех заказов
    total: string;        // Общее количество выполненных заказов за всё время
    totalToday: string;   // Общее количество выполненных заказов за сегодня
    error: string | null; // Ошибки WebSocket
    connected: boolean;   // Статус подключения WebSocket (true если соединение установлено)
  }
export interface IRootReducers {
    ingredients: IIngredientsState,
    constructorList: ConstructorState,
    ingredientDetails: IIngredientDetailsState,
    orderDetails: IOrderDetailsState,
    register: RegisterState, 
    socket: SocketState; 
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
    socket: socketReducer, 
});

export default rootReducer;
