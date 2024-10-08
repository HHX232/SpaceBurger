import {socketReducer} from '../reducers/socket-reducer'


const initialState = {
   orders: [],
   total: '0',
   totalToday: '0',
   error: null,
   connected: false,
 };
 
describe('WebSocket test', ()=>{
   it('WS open', ()=>{
      const action = { type: 'WS_OPEN' };
      expect(socketReducer(undefined, action)).toEqual({ ...initialState, connected: true });
    })
    it('default state', ()=>{
      expect(socketReducer(undefined, {})).toEqual(initialState);
    })
    it('WS Error', ()=>{
      const action = {type: 'WS_ERROR', payload: "Some error message"}
      expect(socketReducer(undefined, action)).toEqual({...initialState, error: "Some error message" });
    })
    it('On WS Close', ()=>{
      const action = { type: 'WS_CLOSE' };
      const newState = {
         orders: [],
         total: '79301',
         totalToday: '144',
         error: "Some message",
         connected: true,
       }
       expect(socketReducer(newState, action)).toEqual({...newState, connected: false, error: null });
    })
})
