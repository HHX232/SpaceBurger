import {
  ORDER_DETAILS_OPEN,
  ORDER_DETAILS_CLOSE,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAILURE,
} from '../actions/order-details-action';

export interface IOrderDetailsState {
  isOpen: boolean,
  number: string,
  loading: boolean,
  error: unknown,
}

const initialState = {
  isOpen: false,
  number: "11100",
  loading: false,
  error: null,
};
  
const orderDetailsReducer = (state = initialState, action:{type: string; number:  string; orderNumber: string, error: object}) => {
  switch (action.type) {
    
    case ORDER_DETAILS_OPEN:
      return { ...state, isOpen: true, number: action.number };
    case ORDER_DETAILS_CLOSE:
      return { ...state, isOpen: false, number: "00000" };
    case ORDER_REQUEST:
      return { ...state, loading: true, error: null };
    case ORDER_SUCCESS:
      return { ...state, loading: false, number: action.orderNumber };
    case ORDER_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default orderDetailsReducer;
