import React, {useState} from "react";
import { PasswordInput, EmailInput,  Button } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './Login.module.css'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newAccessToken, newLoginData } from "../../services/actions/register-action";
import { request } from "../../utils/responses";

const Login = () =>{
  const [loginUservalue, setLoginUserValue] = useState({email:'', password:''})
  const userRegister = useSelector(state => state.register)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onChange = e => {
    setLoginUserValue({...loginUservalue, [e.target.name]:e.target.value})
    // dispatch(newAccessToken(e.target.value))
  }
const onLoginButton = async ()=> {
  const datauser = await request("auth/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginUservalue)})
  if(datauser.success){
    dispatch(newLoginData(datauser.user.email, datauser.user.name, datauser.accessToken, datauser.refreshToken))
    console.log(datauser)
    console.log("full data", userRegister)
    navigate("/")
  }
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
      <Button onClick={onLoginButton} htmlType="button" type="primary" size="medium" extraClass={`${style.login_button} mb-15`}>
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