import { ORDER_DETAILS_OPEN, ORDER_DETAILS_CLOSE } from '../actions/order-details-action';

const initialState = {
  isOpen: false
};

const orderDetailsReducer = (state = initialState, action) => {
  switch(action.type) {
    case ORDER_DETAILS_OPEN:
      return { isOpen: true };
    case ORDER_DETAILS_CLOSE:
      return { isOpen: false };
    default:
      return state;
  }
};

export default orderDetailsReducer;