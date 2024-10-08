import {WS_CONNECT, WS_MESSAGE, WS_ERROR, WS_OPEN, WS_CLOSE, wsDisconnect,wsOnMessage,wsOnError,wsOnOpen,wsConnect,wsOnClose} from '../actions/socketActions'

describe('Socket actions are worked', ()=>{
   it('Should create an action with WS_CONNECT', ()=>{
      const expectedAction = {
         type: WS_CONNECT
      }
      expect(wsConnect()).toEqual(expectedAction)
   })
   it('Should create an action with WS_MESSAGE', ()=>{
      const expectedAction = {
         type: WS_MESSAGE,
         payload: 'Hello Server!'
      }
      expect(wsOnMessage('Hello Server!')).toEqual(expectedAction)
   })
   it('Should create an action with WS_ERROR', ()=>{
      const expectedAction = {
         type: WS_ERROR,
         payload: new Error('Connection error')
      }
      expect(wsOnError(new Error('Connection error'))).toEqual(expectedAction)
   })
   it('Should create an action with WS_OPEN', ()=>{
      const expectedAction = {
         type: WS_OPEN
      }
      expect(wsOnOpen()).toEqual(expectedAction)
   })
   it('Should create an action with WS_CLOSE', ()=>{
      const expectedAction = {
         type: WS_CLOSE
      }
      expect(wsOnClose()).toEqual(expectedAction)
   })
   it("wsDisconnect success", ()=>{
      const expectedAction ={
         type: WS_CONNECT
      }
      expect(wsDisconnect()).toEqual(expectedAction)
   })

})