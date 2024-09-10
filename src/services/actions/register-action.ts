import { Dispatch } from "redux";
import { request } from "../../utils/responses";

export const REGISTER_IN_PROGRESS = "REGISTER_IN_PROGRESS" as const;
export const REGISTER_FAILED = "REGISTER_FAILED" as const;
export const REGISTER_SUCCESS = "REGISTER_SUCCESS" as const;
export const CREATE_NEW_ACCESS_TOKEN = "CREATE_NEW_ACCESS_TOKEN" as const;
export const LOGIN_VALUE_DATA = "LOGIN_VALUE_DATA" as const;
export const UPDATE_SUCCESS_STATE = "UPDATE_SUCCESS_STATE" as const;
export const SET_CHECK_USER_LOADING = "SET_CHECK_USER_LOADING" as const;
export const SET_CHECK_USER_AUTH = "SET_CHECK_USER_AUTH" as const;

export const FORGOT_PASSWORD_VISITED = "FORGOT_PASSWORD_VISITED" as const;

interface IUserData{
  user:{name: string, email:string},
  accessToken:string,
  refreshToken:string,
  expiresIn?:Date
}
interface IRegisterResponse {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
}

export const markForgotPasswordVisited = () => ({
  type: FORGOT_PASSWORD_VISITED,
});

const refreshTokenExpiry = 30 * 24 * 60 * 60 * 1000;
export const updateSuccessState = (success: boolean) => ({
  type: UPDATE_SUCCESS_STATE,
  success,
});

export const registerInProgress = () => ({
  type: REGISTER_IN_PROGRESS,
});


export const registerSuccess = (
  user: IUserData["user"],
  accessToken: IUserData["accessToken"],
  refreshToken: IUserData["refreshToken"],
  expiresIn?: IUserData["expiresIn"]
) => ({
  type: REGISTER_SUCCESS,
  user,
  accessToken,
  refreshToken,
  expiresIn,
});


export const registerFailed = (error:Error | string) => ({
  type: REGISTER_FAILED,
  error,
});

//функция для сохранения access токена
export const newAccessToken = (accessToken:string) => ({
  type: CREATE_NEW_ACCESS_TOKEN,
  accessToken,
});

//функция для поднятия данных из куки
export function getCookie(name:string) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}
interface CookieOptions {
  expires?: Date | number | string;
  path?: string;
  secure?: boolean;
  samesite?: "lax" | "strict" | "none";
}
//функция для сохранения куки
export const setCookie = (name:string, value:string, options:CookieOptions = {}) => {
  options = {
    path: "/",
    secure: true,
    samesite: "strict",
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey as keyof CookieOptions];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
};

export const clearTokens = () => {
  setCookie("refreshToken", "", { expires: new Date(0) });
  setCookie("accessToken", "", { expires: new Date(0) });
};

//выходим из системы
export const logout = () => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) {
    console.error("No refreshToken found");
    return;
  }
 
  request("auth/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: refreshToken }),
  })
    .then((response) => {
      const logoutResponse = response as IRegisterResponse;
    const { success } = logoutResponse
  
      if (success) {
        clearTokens();
        return {
          type: LOGIN_VALUE_DATA,
          email: "",
          name: "",
          accessToken: "",
          refreshToken: "",
          success: false,
          timestamp: 0,
          errorRegister: false,
          loading: false,
          expiresIn: 0,
        };
      } else {
     console.error("Ошибка при входе")
      }
    })
    .catch((error) => {
      console.error("error in logout: ", error);
    });
};

//при входе в существующий акк
export const newLoginData = (email:string, name:string, accessToken:string, refreshToken:string) => {
  setCookie("refreshToken", refreshToken, {
    expires: new Date(Date.now() + refreshTokenExpiry),
  });
  setCookie("accessToken", accessToken, {
    expires: new Date(Date.now() + 20 * 60 * 1000),
  });

  return {
    type: LOGIN_VALUE_DATA,
    email,
    name,
    refreshToken,
  };
};

type RegisterUserReturnType = (dispatch: Dispatch) => Promise<void>;
//при регистрации
export const registerUser: (registerMail: string, registerPassword: string, registerName: string) => RegisterUserReturnType = (registerMail: string, registerPassword: string, registerName: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(registerInProgress());
    try {
      const data: IUserData = await request("auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: registerMail,
          password: registerPassword,
          name: registerName,
        }),
      });

      const { accessToken, refreshToken, user } = data ;
      setCookie("refreshToken", refreshToken, {
        expires: new Date(Date.now() + refreshTokenExpiry),
      }); // 30 дней
      setCookie("accessToken", accessToken, {
        expires: new Date(Date.now() + 20 * 60 * 1000),
      }); // 20 минут

      dispatch(registerSuccess(user, refreshToken, "1200"));
    } catch (error:unknown) {
      console.error("Registration failed:" + error);
      if(error){  
        dispatch(registerFailed(error as Error ));}
    
    }
  };
};


export const updateToken = async () => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) {
    console.error("Не пройдена регистрация")
    return;
  }

  try {
    const response: IRegisterResponse = await request("auth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: refreshToken }),
    });
   
    if (response.success) {
      const {
        accessToken: newAccessTokenValue,
        refreshToken: newRefreshToken,
      } = response;
      const token = newAccessTokenValue ? newAccessTokenValue.split(" ")[1] : "";
    
      setCookie("accessToken", token, {
        expires: new Date(Date.now() + 20 * 60 * 1000),
      }); 
      if(newRefreshToken){setCookie("refreshToken", newRefreshToken, {
        expires: new Date(Date.now() + refreshTokenExpiry),
      }
    );}else{console.error("Error with newRefreshToken")}
      
      return { type: 'UPDATE_TOKEN_SUCCESS' };
    } else {
      console.error("Не удалось обновить AccessToken");
    }
  } catch (error) {
    console.error("Ошибка при обновлении AccessToken:", error);
  }
}

interface IDataUser{
  success:boolean;
  user:{
      email: string;
      name: string;
  }
  accessToken:string
  refreshToken:string
}

export const loginUserThunk = (loginUservalue: { email: string; password: string }, navigate: any, location: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const datauser: IDataUser = await request("auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginUservalue),
      });

      if (datauser.success) {
        dispatch(newLoginData(datauser.user.email, datauser.user.name, datauser.accessToken, datauser.refreshToken));
        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath, { replace: true });
      }
    } catch (error) {
      console.error("Ошибка в данных пользователя");
    }
  };
};


export const setCheckUserLoading = (isLoading:boolean) => ({
  type: SET_CHECK_USER_LOADING,
  isLoading,
});

export const setCheckUserAuth = (isSuccess:boolean) => ({
  type: SET_CHECK_USER_AUTH,
  isSuccess,
});

export const checkAndUpdateAccessToken = async () => {
  
};

export const passwordResetThunk = (password: string, token: string, navigate: (path: string) => void) => {
  return async (): Promise<void> => {
    try {
      const response = await fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: password, token: `${token}` }),
      });

      const typedResponse = await response.json();
console.log(typedResponse)
try{
      if (typedResponse.success) {
        navigate("/profile");
      } else {
        throw new Error(typedResponse.message);
      }
    }catch(err){console.log(err)}
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        console.log("Unknown error occurred")
      }
    }
  };
};

interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export const forgotPasswordThunk = (email: string, navigate: (path: string) => void) => {
  return async (): Promise<void> => {
    try {
      const response: ResetPasswordResponse = await request("password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.success) {
        navigate("/reset-password"); // Navigate to the reset password page
      } else {
        alert(response.message); // Handle error by showing alert
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      alert(errorMessage);
    }
  };
};