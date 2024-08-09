// actions/order-details-action.js
import {request} from '../../utils/responses'
export const ORDER_DETAILS_OPEN = "ORDER_DETAILS_OPEN";
export const ORDER_DETAILS_CLOSE = "ORDER_DETAILS_CLOSE";
export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ORDER_FAILURE = "ORDER_FAILURE";

export const openOrderDetails = (number) => ({
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

export const orderSuccess = (orderNumber) => ({
  type: ORDER_SUCCESS,
  orderNumber,
});

export const orderFailure = (error) => ({
  type: ORDER_FAILURE,
  error,
});

export const submitOrder = (ingredients) => {
  return async (dispatch) => {
    dispatch(orderRequest());
    try {
      if(ingredients[1] === undefined || ingredients[1] === null){
        // console.log("new error")
        alert("выберите сначала булочку, пожалуйста")
        throw new Error("выберите булочку")}
      const data = await request('orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients }),
      });

      dispatch(orderSuccess(data.order.number));
      dispatch(openOrderDetails(data.order.number));
    } catch (error) {
      console.error("Order submission failed:", error);
      dispatch(orderFailure(error.message));
    }
  };
};