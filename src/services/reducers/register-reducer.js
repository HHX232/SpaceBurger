import {REGISTER_IN_PROGRESS, REGISTER_FAILED, REGISTER_SUCCESS, CREATE_NEW_ACCESS_TOKEN, LOGIN_VALUE_DATA} from '../actions/register-action'
const initialState = {
   loading: false,
   success: false,
   errorRegister: false,
   user: {
     email: "",
     name: ""
   },
   accessToken: "Bearer ...", 
   refreshToken: "",
   expiresIn: 0, 
   timestamp: 0, 
 };
 const registerReducer = (state = initialState, action) => {
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
         expiresIn: action.expiresIn, 
         timestamp: Date.now(), 
         errorRegister: false
       };
     case REGISTER_FAILED:
       return { ...state, loading: false, success: false, errorRegister: true };
       case CREATE_NEW_ACCESS_TOKEN:
        return {...state,accessToken: action.accessToken}
        case LOGIN_VALUE_DATA:
       return {...state, accessToken: action.accessToken, refreshToken: action.refreshToken, user:{name: action.name, email: action.email}, success: true,timestamp: Date.now(),errorRegister: false, loading: false,expiresIn:1200 }
     default:
       return state;
   }}

export default registerReducer