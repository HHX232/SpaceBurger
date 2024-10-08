import registerReducer from "../reducers/register-reducer";

import {
   REGISTER_IN_PROGRESS,
   REGISTER_FAILED,
   REGISTER_SUCCESS,
   CREATE_NEW_ACCESS_TOKEN,
   LOGIN_VALUE_DATA,
   UPDATE_SUCCESS_STATE,
   FORGOT_PASSWORD_VISITED,
   SET_CHECK_USER_LOADING,
   SET_CHECK_USER_AUTH,
 } from "../actions/register-action";
const initialState = {
   loading: false,
   success: false,
   errorRegister: false,
   user: {
     email: "",
     name: "",
   },
   accessToken: undefined,
   refreshToken: "",
   expiresIn: 0,
   timestamp: 0,
   forgotPasswordVisited: false,
 };
 
 describe("test register reducer", ()=>{
   const spyError = jest.spyOn(console,'error')
   it("should register loading",()=>{
      const action = { type: REGISTER_IN_PROGRESS };
      expect(registerReducer(initialState, action)).toEqual({...initialState, loading: true });
   })
   it("should register success",()=>{
      const action = {type: REGISTER_SUCCESS, user:{email: "mail@1.ru", name:"some name"}, accessToken:"123123", refreshToken:"3333", expiresIn: 1200}
      const expectedState = {
         ...initialState,
         loading: false,
         success: true,
         errorRegister: false,
         user: action.user,
         accessToken: action.accessToken,
         refreshToken: action.refreshToken,
         expiresIn: action.expiresIn,
         timestamp: expect.any(Number)
      }
      expect(registerReducer(initialState, action)).toEqual(expectedState);
   })
   it('invalid tokens', ()=>{
      const action = {type: REGISTER_SUCCESS, user:{email: "mail@1.ru", name:"some name"}, expiresIn: 1200}
      expect(registerReducer(initialState, action)).toEqual(initialState)
      expect(spyError).toHaveBeenCalledTimes(1)
   })
   it("should failed register reducer", ()=>{
      const action = { type: REGISTER_FAILED };
      expect(registerReducer(initialState, action)).toEqual({...initialState, loading: false, success: false, errorRegister: true });
   })
   it("should success new access token", ()=>{
      const action = {type: CREATE_NEW_ACCESS_TOKEN, accessToken: "123"}
      expect(registerReducer(initialState, action)).toEqual({...initialState, accessToken: action.accessToken });
   })
   it("should console error with new access token", ()=>{
      const action = {type: CREATE_NEW_ACCESS_TOKEN, accessToken: null}
      expect(registerReducer(initialState,action)).toEqual(initialState)
      expect(spyError).toHaveBeenCalledTimes(1)
   })
   it('should handle LOGIN_VALUE_DATA', () => {
      const action = {
        type: 'LOGIN_VALUE_DATA',
        accessToken: 'newAccessToken',
        refreshToken: 'newRefreshToken',
        name: 'John Doe',
        email: 'john.doe@example.com'
      };
  
      const expectedState = {
        ...initialState,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        user: { name: action.name, email: action.email },
        success: true,
        timestamp: expect.any(Number),
        loading: false,
        errorRegister: false,
        expiresIn: 1200
      };
  
      expect(registerReducer(initialState, action)).toEqual(expectedState);
    });
    it('should handle UPDATE_SUCCESS_STATE', () => {
      const action = {
        type: 'UPDATE_SUCCESS_STATE',
        success: true
      };
  
      const expectedState = {
        ...initialState,
        success: true
      };
  
      expect(registerReducer(initialState, action)).toEqual(expectedState);
    });
    it('should handle FORGOT_PASSWORD_VISITED', () => {
      const action = {
        type: 'FORGOT_PASSWORD_VISITED'
      };
  
      const expectedState = {
        ...initialState,
        forgotPasswordVisited: true
      };
  
      expect(registerReducer(initialState, action)).toEqual(expectedState);
    });
    it('should handle SET_CHECK_USER_LOADING', () => {
      const action = {
        type: 'SET_CHECK_USER_LOADING',
        isLoading: true
      };
  
      const expectedState = {
        ...initialState,
        loading: true
      };
  
      expect(registerReducer(initialState, action)).toEqual(expectedState);
    });
    it('should handle SET_CHECK_USER_AUTH', () => {
      const action = {
        type: 'SET_CHECK_USER_AUTH',
        isSuccess: true
      };
  
      const expectedState = {
        ...initialState,
        success: true
      };
  
      expect(registerReducer(initialState, action)).toEqual(expectedState);
    });
    it("register reducer with unkown action", ()=>{
      const action = {type: "UNKNOWN_ACTION"}
      expect(registerReducer(initialState, action)).toEqual(initialState)
    })
    it('should not update state with invalid LOGIN_VALUE_DATA', () => {
      const action = {
        type: 'LOGIN_VALUE_DATA'
        
      };
      const expectedState = {
         ...initialState,
         accessToken: "",
         refreshToken: "",
         user: { name: "", email: "" },
         success: true,
         timestamp: expect.any(Number),
         errorRegister: false,
         loading: false,
         expiresIn: 1200
       };
      
  expect(registerReducer(initialState, action)).toEqual(expectedState);
  expect(spyError).toHaveBeenCalledTimes(1)

    });
    it('should not update state with invalid REGISTER_SUCCESS', () => {
      const action = {
        type: 'REGISTER_SUCCESS'
       
      };
  
      expect(registerReducer(initialState, action)).toEqual(initialState);
      expect(spyError).toHaveBeenCalledWith("Invalid action payload");
    });
    it('should not update state with invalid CREATE_NEW_ACCESS_TOKEN', () => {
      const action = {
        type: 'CREATE_NEW_ACCESS_TOKEN'

      };
  
      expect(registerReducer(initialState, action)).toEqual(initialState);
      expect(spyError).toHaveBeenCalledWith("Invalid action payload");
    });
 })