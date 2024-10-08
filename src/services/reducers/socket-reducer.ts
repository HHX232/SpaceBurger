import { Order } from "../../components/Pages/Feed/Feed";

interface SocketState {
   orders: Order[];
   total: string;
   totalToday: string;
   error: string | null;
   connected: boolean;
 }
 
 const initialState: SocketState = {
   orders: [],
   total: '0',
   totalToday: '0',
   error: null,
   connected: false,
 };
 
 export const socketReducer = (state = initialState, action: any): SocketState => {
   switch (action.type) {
     case 'WS_OPEN':
       return { ...state, connected: true };
 
     case 'WS_MESSAGE':
       return {
         ...state,
         orders: action.payload.orders,
         total: action.payload.total,
         totalToday: action.payload.totalToday,
       };
  
       
     case 'WS_ERROR':
       return { ...state, error: action.payload };
 
     case 'WS_CLOSE':
       return { ...state, connected: false, error: null };
 
     default:
       return state;
   }
 };
 