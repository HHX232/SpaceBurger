import { Dispatch } from 'redux';
import {request} from '../../utils/responses'
import Ingredient from '../../utils/types';
import { IIngredient } from '../../components/Pages/BurgerConstructor/BurgerConstructor';
import { getCookie } from './register-action';
export const ORDER_DETAILS_OPEN = "ORDER_DETAILS_OPEN" as const;
export const ORDER_DETAILS_CLOSE = "ORDER_DETAILS_CLOSE" as const;
export const ORDER_REQUEST = "ORDER_REQUEST" as const;
export const ORDER_SUCCESS = "ORDER_SUCCESS" as const;
export const ORDER_FAILURE = "ORDER_FAILURE" as const;

export const openOrderDetails = (number: string) => ({ 
  type: ORDER_DETAILS_OPEN,
  number: number
});

export const closeOrderDetails = () => ({
  type: ORDER_DETAILS_CLOSE,
  number: "00000"
});

export const orderRequest = () => ({
  type: ORDER_REQUEST,
});

export const orderSuccess = (orderNumber: string) => ({
  type: ORDER_SUCCESS,
  orderNumber,
}); 

export const orderFailure = (error:Error) => ({
  type: ORDER_FAILURE,
  error,
});
interface OrderResponse {
  order: {
    number: string;
  };
}

export const submitOrder = (ingredients: string[]) => {
  return async (dispatch: Dispatch) => {
    const accessTokenfromCookie = getCookie('accessToken')
    const accessToken = accessTokenfromCookie ? accessTokenfromCookie.replace("Bearer%20", "") : ""
    dispatch(orderRequest());
    try {
      if(ingredients[1] === undefined || ingredients[1] === null){
        alert("выберите сначала булочку, пожалуйста")
        throw new Error("выберите булочку")}
      const data: OrderResponse = await request('orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ ingredients }),
        
      });

      dispatch(orderSuccess(data.order.number));
      dispatch(openOrderDetails(data.order.number));
    } catch (error: any) {
      console.error("Order submission failed:", error);
      dispatch(orderFailure(error.message));
    }
  };
};