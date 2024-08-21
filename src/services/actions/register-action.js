import data from '../../utils/data';
import { request } from '../../utils/responses';

export const REGISTER_IN_PROGRESS = "REGISTER_IN_PROGRESS";
export const REGISTER_FAILED = "REGISTER_FAILED"; 
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const CREATE_NEW_ACCESS_TOKEN = "CREATE_NEW_ACCESS_TOKEN"
export const LOGIN_VALUE_DATA = "LOGIN_VALUE_DATA"
export const UPDATE_SUCCESS_STATE = "UPDATE_SUCCESS_STATE";


export const FORGOT_PASSWORD_VISITED = 'FORGOT_PASSWORD_VISITED';

export const markForgotPasswordVisited = () => ({
    type: FORGOT_PASSWORD_VISITED,
});


const refreshTokenExpiry = 30 * 24 * 60 * 60 * 1000; // 30 дней
export const updateSuccessState = (success) => ({
  type: UPDATE_SUCCESS_STATE,
  success,
});

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

export const clearTokens = () => {
  setCookie('refreshToken', '', { expires: new Date(0) });

  setCookie('accessToken', '', { expires: new Date(0) });

  console.log('Токены были очищены.');
};
clearTokens()
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
      clearTokens()
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
  setCookie('refreshToken', refreshToken, { expires: new Date(Date.now() + refreshTokenExpiry) });
  setCookie('accessToken', accessToken, { expires: new Date(Date.now() + 20 * 60 * 1000) }); 

  return {
    type: LOGIN_VALUE_DATA,
    email,
    name,
    refreshToken,
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

      setCookie('refreshToken', refreshToken, { expires: new Date(Date.now() + refreshTokenExpiry) }); // 30 дней
      setCookie('accessToken', accessToken, { expires: new Date(Date.now() + 20 * 60 * 1000) }); // 20 минут
      
      dispatch(registerSuccess(user, refreshToken, 1200));

    } catch (error) {
      console.error("Registration failed:", error);
      dispatch(registerFailed(error.message));
    }
  };
};




// Функция для декодирования JWT и извлечения времени истечения
const decodeToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1])); 
    return payload.exp * 1000; 
  } catch (e) {
    console.error('Не удалось декодировать токен:', e);
    return null;
  }
};

export const checkAndUpdateAccessToken = async () => {
  const accessToken = getCookie('accessToken');

  if (!accessToken) {
    console.log('AccessToken отсутствует, требуется обновление');
    return updateToken();
  }

  // Проверяем срок жизни accessToken
  const tokenExpirationTime = decodeToken(accessToken);

  if (tokenExpirationTime && Date.now() >= tokenExpirationTime) {
    console.log('Срок действия AccessToken истек, требуется обновление');
    return updateToken();
  }

  console.log('AccessToken присутствует и еще не истек.');
};

export const updateToken = async () => {

  const refreshToken = getCookie('refreshToken');
  if (!refreshToken) {
    alert('Пройдите регистрацию');
    return;
  }

  try {
  
    const response = await request("auth/token", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: refreshToken }),
    });

    if (response.success) {
      const { accessToken: newAccessTokenValue, refreshToken: newRefreshToken } = response;

      setCookie('accessToken', newAccessTokenValue, { expires: new Date(Date.now() + 20 * 60 * 1000) }); // 20 минут

      setCookie('refreshToken', newRefreshToken, { expires: new Date(Date.now() + refreshTokenExpiry) });

      console.log('AccessToken и RefreshToken были успешно обновлены.');
    } else {
      console.error('Не удалось обновить AccessToken');
    }
  } catch (error) {
    console.error('Ошибка при обновлении AccessToken:', error);
  }
};


setInterval(() => {
  checkAndUpdateAccessToken();
  console.log("Проверка и обновление AccessToken каждые 20 минут");
}, 20 * 60 * 1000); 