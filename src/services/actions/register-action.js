import { useNavigate } from 'react-router-dom';
import { request } from '../../utils/responses';

export const REGISTER_IN_PROGRESS = "REGISTER_IN_PROGRESS";
export const REGISTER_FAILED = "REGISTER_FAILED"; 
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";


export const registerInProgress = () => ({
  type: REGISTER_IN_PROGRESS,
});

export const registerSuccess = (user, accessToken, refreshToken, expiresIn) => ({
  type: REGISTER_SUCCESS,
  user,
  accessToken,
  refreshToken,
  expiresIn
});

export const registerFailed = (error) => ({
  type: REGISTER_FAILED,
  error,
});


const setCookie = (name, value, options = {}) => {

  options = {
    path: '/',
    secure: true,
    samesite: 'strict',
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
};


export const registerUser = (registerMail, registerPassword, registerName) => {
   
  return async (dispatch) => {
    dispatch(registerInProgress());
    try {
      const data = await request('auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: registerMail, password: registerPassword, name: registerName }),
      });

      const { accessToken, refreshToken, user } = data;

      setCookie('refreshToken', refreshToken);
      dispatch(registerSuccess(user, accessToken, refreshToken, 1200 
       ));

    } catch (error) {
      console.error("Registration failed:", error);
      
      if (error.response) {
        console.log("Error response data:", error.response.data);
      }
      dispatch(registerFailed(error.message));
    }
  };
};
