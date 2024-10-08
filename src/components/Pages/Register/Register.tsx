import  { useState, useEffect, FormEvent } from "react";
import { PasswordInput, EmailInput, Input,  Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Register.module.css';
import { Link, useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";
import { registerUser, updateSuccessState } from '../../../services/actions/register-action';
import { AnyAction, Dispatch as ReduxDispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import rootReducer from '../../../services/reducers/index'
import { useAppDispatch } from "../../../utils/hooks";

const Register = () => {
  const [userdata, setUserData] = useState({  email: "test-data@yandex.ru", password: "password", name: "Username"});
  const [isRedirected, setIsRedirected] = useState(false);
  const navigate = useNavigate();
  type RootState = ReturnType<typeof rootReducer>;
  type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
  const dispatch: AppDispatch = useAppDispatch<AppDispatch>();

  interface IUserState {
    accessToken?: string | undefined;
    errorRegister?: boolean;
    expiresIn?: number;
    forgotPasswordVisited?: boolean;
    loading?: boolean;
    refreshToken?: string;
    success?: boolean;
    timestamp?: number;
    user?: {
      email: string;
      name: string;
    };
  }
  const userRegister:IUserState = useSelector((state:{register:object}) => state.register);


  useEffect(() => {
    console.log("userRegister", userRegister)
    return () => {
      dispatch(updateSuccessState(false));
    };
  }, [dispatch]);

  const onButtonSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(registerUser(userdata.email, userdata.password, userdata.name));
  };

  useEffect(() => {
    if (userRegister.success && userRegister.user && userRegister.user.name.length > 0) {
      if (!isRedirected) {
        navigate("/login");
        setIsRedirected(true);
      }
    }
     else if (userRegister.errorRegister) {
      alert("Какая-то ошибочка");
    }
  }, [userRegister, isRedirected, navigate]);

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setUserData({...userdata, [e.target.name]: e.target.value});
  };

  useEffect(() => {
    return () => {
      dispatch(updateSuccessState(false));
    };
  }, [dispatch]);


   return (
      <section className={`${style.register_section} container`}>
        <form className={`${style.register_section}`} onSubmit={onButtonSubmit}>
         <h2 className={`${style.register_title} text text_type_main-medium`}>Регистрация</h2>
         <div className={`${style.inputs_box}`}>
            <Input
              data-testid="input-name-testid"
               onChange={onChange}
               value={userdata.name}
               name={'name'}
               placeholder="Имя"
               type={"text"}
            />
            <EmailInput
             data-testid="input-email-testid"
               onChange={onChange}
               value={userdata.email}
               name={'email'}
               isIcon={false}
            />
            <PasswordInput
             data-testid="input-password-testid"
               onChange={onChange}
               value={userdata.password}
               name={'password'}
            />
            <Button
             data-testid="button-submit-register-testid"
               htmlType="submit"
               type="primary"
               size="medium"
               extraClass={`${style.register_button} mb-15`}>
               Зарегистрироваться
            </Button>
         </div>
         <p className={`text text_type_main-small text__disactive`}>
            Уже зарегистрированы?
            <Link to="/login" className={`${style.register_link} ml-2 text-secondary`}>Войти</Link>
         </p>
         </form>
      </section>
   );
};

export default Register;
