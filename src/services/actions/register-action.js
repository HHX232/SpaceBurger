import data from '../../utils/data';
import { request } from '../../utils/responses';

export const REGISTER_IN_PROGRESS = "REGISTER_IN_PROGRESS";
export const REGISTER_FAILED = "REGISTER_FAILED"; 
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const CREATE_NEW_ACCESS_TOKEN = "CREATE_NEW_ACCESS_TOKEN"
export const LOGIN_VALUE_DATA = "LOGIN_VALUE_DATA"


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

//функция для сохранения access токена
export const newAccessToken = (accessToken) =>({
  type:CREATE_NEW_ACCESS_TOKEN,
  accessToken
})

//функция для поднятия данных из куки
export function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}


//функция для сохранения куки
export const setCookie = (name, value, options = {}) => {
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

//выходим из системы
export const logout = () =>{
  console.log("start logout")
  const refreshToken = getCookie("refreshToken")
  if (!refreshToken) {
    console.error('No refreshToken found');
    return;
  }
  try{
   const {success} = request("auth/logout",{
      method: "POST",
      headers:  {'Content-Type': 'application/json'},
      body: JSON.stringify({token: refreshToken}) 
    })
    if(success){
      setCookie('refreshToken', '', { expires: new Date(0) });
      return {
        type: LOGIN_VALUE_DATA,
        email: '',
        name: '',
        accessToken: '',
        refreshToken: '',
        success: false,
        timestamp: 0,
        errorRegister: false,
        loading: false,
        expiresIn: 0,
      };
    }else {
      console.error('Logout failed');
    }
  }catch(error){
    console.error("error in logout: ", error)
  }


}

//при входе в существующий акк
export const newLoginData = (email, name, accessToken, refreshToken) => {
  setCookie('refreshToken', refreshToken);

  return {
    type: LOGIN_VALUE_DATA,
    email,
    name,
    accessToken,
    refreshToken
  };
};

//при регистрации
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

//обновление токена каждые 20 мин
export const updateAccessToken =  () =>{
  return async function (dispatch) {
    const refreshToken = getCookie('refreshToken');
    console.log("refreshToken from updateAccessToken: ", refreshToken)
    if(!refreshToken){
      //добавить перенаправление на регистрацию или же allert хотя бы
      console.error("refresh token die ;( ")
      throw new Error("please create new refresh token ")
    }
    try{
    const data = await request("auth/token", {
      method: "POST",
      header:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token: refreshToken }),
      
    })
    const { accessToken } = data;
    dispatch(newAccessToken(accessToken));
  }catch(error){
      console.error(error);
      console.log("error to submit new access token")
    }

  }
}
setInterval(() => {
  updateAccessToken();
}, 19 * 60 * 1000);


