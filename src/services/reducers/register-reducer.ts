// src/reducers/registerReducer.ts

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

interface User {
  email: string;
  name: string;
}

interface RegisterState {
  loading: boolean;
  success: boolean;
  errorRegister: boolean;
  user: User;
  accessToken?: string;
  refreshToken: string;
  expiresIn: number;
  timestamp: number;
  forgotPasswordVisited: boolean;
}
interface RegisterAction {
  type: string;
  user?: User;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  success?: boolean;
  name?: string;
  email?: string;
  isLoading?: boolean;
  isSuccess?: boolean;
}

const initialState: RegisterState = {
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

// Register reducer function
const registerReducer = (state = initialState, action: RegisterAction): RegisterState => {
  switch (action.type) {
    case REGISTER_IN_PROGRESS:
      return { ...state, loading: true };
    case REGISTER_SUCCESS:
      if (!action.user || !action.accessToken || !action.refreshToken) {
        console.error("Invalid action payload");
        return state;
      }
      return {
        ...state,
        loading: false,
        success: true,
        user: action.user,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        expiresIn: action.expiresIn || 0,
        timestamp: Date.now(),
        errorRegister: false,
      };
    case REGISTER_FAILED:
      return { ...state, loading: false, success: false, errorRegister: true };
    case CREATE_NEW_ACCESS_TOKEN:
      if (!action.accessToken) {
        console.error("Invalid action payload");
        return state;
      }
      return { ...state, accessToken: action.accessToken };
    case LOGIN_VALUE_DATA:
      return {
        ...state,
        accessToken: action.accessToken || "",
        refreshToken: action.refreshToken || "",
        user: { name: action.name || "", email: action.email || "" },
        success: true,
        timestamp: Date.now(),
        errorRegister: false,
        loading: false,
        expiresIn: 1200,
      };
    case UPDATE_SUCCESS_STATE:
      return { ...state, success: action.success || false };
    case FORGOT_PASSWORD_VISITED:
      return {
        ...state,
        forgotPasswordVisited: true,
      };
    case SET_CHECK_USER_LOADING:
      return {
        ...state,
        loading: action.isLoading || false,
      };
    case SET_CHECK_USER_AUTH:
      return {
        ...state,
        success: action.isSuccess || false,
      };
    default:
      return state;
  }
};

export default registerReducer;
