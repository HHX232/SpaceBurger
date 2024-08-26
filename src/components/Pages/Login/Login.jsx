import { useState } from "react";
import { PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Login.module.css';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { newLoginData } from "../../../services/actions/register-action";
import { request } from "../../../utils/responses";

const Login = () => {
    const [loginUservalue, setLoginUserValue] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const onChange = e => {
        setLoginUserValue({ ...loginUservalue, [e.target.name]: e.target.value });
    }

    const onLoginButton = async () => {
        try {
            const datauser = await request("auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginUservalue)
            });

            if (datauser.success) {
                dispatch(newLoginData(datauser.user.email, datauser.user.name, datauser.accessToken, datauser.refreshToken));

                const redirectPath = location.state?.from?.pathname || "/";
                navigate(redirectPath, { replace: true });
            }
        } catch (error) {
            alert("Ошибка в данных пользователя");
        }
    }

    return (
        <section className={`${style.login_section} container`}>
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
                onClick={onLoginButton}
                htmlType="button"
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
        </section>
    );
}

export default Login;
