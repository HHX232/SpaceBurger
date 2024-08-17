import React, {useState} from "react";
import { PasswordInput, EmailInput,  Button } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './Login.module.css'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () =>{
  const [loginUservalue, setLoginUserValue] = useState({email:'', password:''})
  const userRegister = useSelector(state => state.register)

  const onChange = e => {
    setLoginUserValue({...loginUservalue, [e.target.name]:e.target.value})
  }


   return <section className={`${style.login_section} container`}>
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
      <Button htmlType="button" type="primary" size="medium" extraClass={`${style.login_button} mb-15`}>
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
}
export default Login