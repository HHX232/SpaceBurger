import {REGISTER_IN_PROGRESS,REGISTER_FAILED,REGISTER_SUCCESS,CREATE_NEW_ACCESS_TOKEN,LOGIN_VALUE_DATA,UPDATE_SUCCESS_STATE,SET_CHECK_USER_LOADING,SET_CHECK_USER_AUTH,FORGOT_PASSWORD_VISITED,markForgotPasswordVisited,updateSuccessState,registerInProgress,registerSuccess,registerFailed,newAccessToken,logout,newLoginData,registerUser,getCookie, clearTokens, loginUserThunk, setCheckUserLoading, setCheckUserAuth, passwordResetThunk, forgotPasswordThunk, setCookie} from '../actions/register-action'

import configureMockStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { request } from '../../utils/responses';
import { useNavigate } from 'react-router-dom';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../../utils/responses', () => ({
  request: jest.fn(), 

}));
jest.mock('../actions/register-action', () => ({
  ...jest.requireActual('../actions/register-action'),
  setCookie: jest.fn(), 
}));
describe("Test register action", ()=>{
const initialState = {}
beforeEach(() => {
  fetchMock.restore();
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});
afterEach(() => {
  fetchMock.restore();
  jest.restoreAllMocks();
});
 

it('should navigate to /reset-password on success', async () => {
  const email = 'test@example.com';
  const navigate = jest.fn();

  request.mockResolvedValue({
    success: true,
    message: 'Success',
  });

  await forgotPasswordThunk(email, navigate)();

  expect(navigate).toHaveBeenCalledTimes(1);
  expect(navigate).toHaveBeenCalledWith('/reset-password');
});


it('should alert error message on failure', async () => {
  const email = 'test@example.com';
  const navigate = jest.fn();

  useNavigate.mockReturnValue(navigate);

  fetchMock.mock('password-reset', {
    status: 400,
    body: { success: false, message: 'Error message' },
  });

  const alertSpy = jest.spyOn(window, 'alert');

  await forgotPasswordThunk(email, navigate)();

  expect(alertSpy).toHaveBeenCalledTimes(1);

});

console.log(jest.isMockFunction(setCookie)); 
 //регистраци
 it('registerUser      success', () => {
   const registerMail = 'john@example.com';
   const registerPassword = 'password123';
   const registerName = 'John Doe';
   const data = {
     accessToken: 'abc123',
     refreshToken: 'xyz789',
     user: { name: 'John Doe', email: 'john@example.com' },
   };

   fetchMock.mock('https://norma.nomoreparties.space/api/auth/register', {
     status: 200,
     body: data,
   });

   const store = mockStore(initialState);
   store.dispatch(registerUser     (registerMail, registerPassword, registerName));

   setTimeout(() => {
     expect(store.getActions()).toEqual([
       { type: REGISTER_IN_PROGRESS },
       { type: REGISTER_SUCCESS, user: data.user, accessToken: data.refreshToken, refreshToken: '1200' },
     ]);
   }, 0);
 });


 it('registerUser      failed', () => {
   const registerMail = 'john@example.com';
   const registerPassword = 'password123';
   const registerName = 'John Doe';
   const error = new Error('Registration failed');

   fetchMock.mock('https://norma.nomoreparties.space/api/auth/register', {
     status: 400,
     body: error,
   });

   const store = mockStore(initialState);
   store.dispatch(registerUser (registerMail, registerPassword, registerName));

   setTimeout(() => {
     expect(store.getActions()).toEqual([
       { type: REGISTER_IN_PROGRESS },
       { type: REGISTER_FAILED, error },
     ]);
   }, 0);
 });
    
    it('registerUser  error', () => {
      const registerMail = 'john@example.com';
      const registerPassword = 'password123';
      const registerName = 'John Doe';
      const error = new Error('Network error');
    
      fetchMock.postOnce('auth/register', {
        status: 500,
        body: error,
      });
    
      const store = mockStore(initialState);
      store.dispatch(registerUser (registerMail, registerPassword, registerName));
    
      setTimeout(() => {
        expect(store.getActions()).toEqual([
          { type: REGISTER_IN_PROGRESS },
          { type: REGISTER_FAILED, error },
        ]);
      }, 0);
    });



//!
 it('should navigate to /profile on success', async () => {
  const password = 'newpassword';
  const token = 'token123';
  const navigate = jest.fn();

  useNavigate.mockReturnValue(navigate);

  fetchMock.mock('https://norma.nomoreparties.space/api/password-reset/reset', {
    status: 200,
    body: { success: true },
  });

  await passwordResetThunk(password, token, navigate)();

  expect(navigate).toHaveBeenCalledTimes(1);
  expect(navigate).toHaveBeenCalledWith('/profile');
});

it('should throw error on failure', async () => {
  const password = 'newpassword';
  const token = 'token123';
  const navigate = jest.fn();

  useNavigate.mockReturnValue(navigate);

  fetchMock.mock('https://norma.nomoreparties.space/api/password-reset/reset', {
    status: 400,
    body: { success: false, message: 'Error message' },
  });

  await expect(passwordResetThunk(password, token, navigate)()).rejects.toEqual('Error message');
});


it('should log unknown error on unknown error', async () => {
  const password = 'newpassword';
  const token = 'token123';
  const navigate = jest.fn();

  useNavigate.mockReturnValue(navigate);

  fetchMock.mock('https://norma.nomoreparties.space/api/password-reset/reset', {
    status: 500,
    body: 'Unknown error',
  });

  const consoleLogSpy = jest.spyOn(console, 'log');

  await expect(passwordResetThunk(password, token, navigate)()).rejects.toEqual('Unexpected token \'U\', "Unknown error" is not valid JSON');

  expect(consoleLogSpy).not.toHaveBeenCalled();
});

 it('should console.error on Loginerror', async () => {
   const loginUservalue = { email: 'john@example.com', password: 'password123' };
   const navigate = jest.fn();
   const location = { state: { from: { pathname: '/dashboard' } } };
   const store = mockStore();

   fetchMock.mock('https://norma.nomoreparties.space/api/auth/login', {
     status: 400,
     body: { error: 'Invalid email or password' },
   });

   const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

   await store.dispatch(loginUserThunk(loginUservalue, navigate, location));

   expect(spy).toHaveBeenCalledTimes(1);
   expect(spy).toHaveBeenCalledWith('Ошибка в данных пользователя');
 });
    //!

    it('should return correct action for setCheckUser Loading', () => {
      const isLoading = true;
      const action = setCheckUserLoading(isLoading);
      expect(action).toEqual({
        type: 'SET_CHECK_USER_LOADING',
        isLoading,
      });
    });
  
    it('should return correct action for setCheckUser Auth', () => {
      const isSuccess = true;
      const action = setCheckUserAuth(isSuccess);
      expect(action).toEqual({
        type: 'SET_CHECK_USER_AUTH',
        isSuccess,
      });
    });
   it("success forgot password visited",()=>{
      const expectedAction = {
         type: FORGOT_PASSWORD_VISITED,
      }
      expect(markForgotPasswordVisited()).toEqual(expectedAction)
   })

   it("update state success", ()=>{
      const expectedAction = {
         type: UPDATE_SUCCESS_STATE,
         success: true
      }
      expect(updateSuccessState(true)).toEqual(expectedAction)
   })
   it("Register in progress", ()=>{
      const expectedAction = {
         type: REGISTER_IN_PROGRESS
      }
      expect(registerInProgress()).toEqual(expectedAction)
   })
   it('registerSuccess action with all arguments', () => {
      const user = { name: 'John Doe', email: 'john@example.com' };
      const accessToken = 'abc123';
      const refreshToken = 'xyz789';
      const expiresIn = new Date();
  
      const expectedAction = {
        type: REGISTER_SUCCESS,
        user,
        accessToken,
        refreshToken,
        expiresIn,
      };
  
      expect(registerSuccess(user, accessToken, refreshToken, expiresIn)).toEqual(expectedAction);
    });
    it('registerSuccess action without expiresIn', () => {
      const user = { name: 'John Doe', email: 'john@example.com' };
      const accessToken = 'abc123';
      const refreshToken = 'xyz789';
  
      const expectedAction = {
        type: REGISTER_SUCCESS,
        user,
        accessToken,
        refreshToken,
        expiresIn: undefined,
      };
  
      expect(registerSuccess(user, accessToken, refreshToken)).toEqual(expectedAction);
    });
    it('registerFailed action with error string', () => {
      const error = 'Registration failed';
  
      const expectedAction = {
        type: REGISTER_FAILED,
        error,
      };
  
      expect(registerFailed(error)).toEqual(expectedAction);
    });
  
    it('registerFailed action with error object', () => {
      const error = new Error('Registration failed');
  
      const expectedAction = {
        type: REGISTER_FAILED,
        error,
      };
  
      expect(registerFailed(error)).toEqual(expectedAction);
    });
    it('newAccessToken action', () => {
      const accessToken = 'abc123';
  
      const expectedAction = {
        type: CREATE_NEW_ACCESS_TOKEN,
        accessToken,
      };
  
      expect(newAccessToken(accessToken)).toEqual(expectedAction);
    });
})