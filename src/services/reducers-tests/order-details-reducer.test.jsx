import orderDetailsReducer from "../reducers/order-details-reducer";
import {
   ORDER_DETAILS_OPEN,
   ORDER_DETAILS_CLOSE,
   ORDER_REQUEST,
   ORDER_SUCCESS,
   ORDER_FAILURE,
 } from '../actions/order-details-action';
import { act } from "react";

const initialState = {
   isOpen: false,
   number: "11100",
   loading: false,
   error: null,
 };
describe('Order details reducer test', ()=>{
it('should open oreder details', ()=>{
   const action = {type:ORDER_DETAILS_OPEN, number:"999"}
   expect(orderDetailsReducer(initialState, action)).toEqual({...initialState, number: action.number, isOpen:true})
})
it('should close order details', ()=>{
   const action = {type:ORDER_DETAILS_CLOSE}
   expect(orderDetailsReducer(initialState, action)).toEqual({...initialState, isOpen:false, number:"00000"})
})
it('should handle request order', ()=>{
   const action = {type:ORDER_REQUEST}
   expect(orderDetailsReducer(initialState, action)).toEqual({...initialState, loading: true, error: null})
})
it('should handle success order', ()=>{
   const action = {type:ORDER_SUCCESS, orderNumber: "222"}
   expect(orderDetailsReducer(initialState, action)).toEqual({...initialState, loading: false,  number: action.orderNumber})
})
it('should handle failure order', ()=>{
   const action = {type: ORDER_FAILURE, error: new Error("Some error")}
   expect(orderDetailsReducer(initialState, action)).toEqual({...initialState, loading: false, error: action.error})
})
it('ws with unknown action', ()=>{
   const action = {type: "UNKNOWN_ACTION"}
   expect(orderDetailsReducer(initialState, action)).toEqual(initialState)
})

})