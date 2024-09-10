import { FormEvent, useState } from "react";
import { PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Login.module.css';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUserThunk, newLoginData } from "../../../services/actions/register-action";
import { request } from "../../../utils/responses";

interface IDataUser{
    success:boolean;
    user:{
        email: string;
        name: string;
    }
    accessToken:string
    refreshToken:string
}
const Login = () => {
    const [loginUservalue, setLoginUserValue] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginUserValue({ ...loginUservalue, [e.target.name]: e.target.value });
    }

    const onLoginButton = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginUserThunk(loginUservalue, navigate, location)(dispatch)
      };

    return (
        <section className={`${style.login_section} container`}>
            <form className={`${style.login_section} `} onSubmit={onLoginButton}>
            <h2 className={`${style.register_title} text text_type_main-medium`}>Вход</h2>
            <EmailInput
                onChange={onChange}
                value={loginUservalue.email}
                name={'email'}
                isIcon={false}
            />
            <PasswordInput
                onChange={onChange}
                value={loginUservalue.password}
                name={'password'}
            />
            <Button
                htmlType="submit"
                type="primary"
                size="medium"
                extraClass={`${style.login_button} mb-15`}
            >
                Войти
            </Button>
            <div className={`${style.login__text_box}`}>
                <p className={`text text_type_main-small text__disactive`}>
                    Вы — новый пользователь?
                    <Link to="/register" className={`${style.login_link} ml-2 text-secondary`}>Зарегистрироваться</Link>
                </p>
                <p className={`text text_type_main-small text__disactive`}>
                    Забыли пароль?
                    <Link to="/forgot-password" className={`${style.login_link} ml-2 text-secondary`}>Восстановить пароль</Link>
                </p>
            </div>
            </form>
        </section>
    );
}

export default Login;
