import {ORDER_FAILURE,ORDER_SUCCESS,ORDER_REQUEST,ORDER_DETAILS_CLOSE,ORDER_DETAILS_OPEN,openOrderDetails,closeOrderDetails,orderRequest,orderSuccess,orderFailure,submitOrder} from '../actions/order-details-action'
import {thunk} from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const ingredient = {
   _id: "1234567890",
   text: "Chicken Breast",
   proteins: 35,
   fat: 10,
   carbohydrates: 0,
   calories: 165,
   price: 250,
   number: "123123",
   image: "https://example.com/chicken-breast.jpg",
   image_mobile: "https://example.com/chicken-breast-mobile.jpg",
   image_large: "https://example.com/chicken-breast-large.jpg",
   __v: 0,
   name: "Chicken Breast",
 };
 const initialState = {
   isOpen: false,
   number: "11100",
   loading: false,
   error: null,
 }; 
 describe('async order-details Action', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('handles empty ingredients array', async () => {
    const expectedActions = [
      { type: ORDER_REQUEST },
      { type: ORDER_FAILURE, error: "выберите булочку" }
    ]; 
  
    const store = mockStore(initialState);
  
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
  
    await store.dispatch(submitOrder([]));
  
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  
    expect(spy).toHaveBeenCalledWith(
      "Order submission failed:",
      expect.objectContaining({ message: "выберите булочку" })
    );
  
    expect(spyAlert).toHaveBeenCalledWith("выберите сначала булочку, пожалуйста");
  
    spy.mockRestore();
    spyAlert.mockRestore();
  });
  
  it('succes work async order-details', () => {
    fetchMock.postOnce('https://norma.nomoreparties.space/api/orders', {
      body: { order: [ingredient, ingredient], success: true },
      headers: { 'content-type': 'application/json' },
    });

    const expectedNumber = "123";
    const expectedActions = [
      {
        type: ORDER_REQUEST
      },
      {
        type: ORDER_SUCCESS,
        payload: expectedNumber
      },
      {
        type: ORDER_DETAILS_OPEN,
        number: expectedNumber
      },
      {
        type: ORDER_DETAILS_CLOSE,
        payload: expectedNumber
      }
    ];

    const store = mockStore(initialState);
    store.dispatch(submitOrder([ingredient._id, ingredient._id]));

    setTimeout(() => {
      expect(store.getActions()).toEqual(expectedActions);
    }, 0);
  });
});


