import React, {useState, useEffect} from "react";
import { PasswordInput, EmailInput, Input,  Button } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './Register.module.css'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../services/actions/register-action";

const Register = () =>{

   const [userdata, setUsetData] = useState({  email: "test-data@yandex.ru", password: "password", name: "Username"})
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const userRegister = useSelector(state => state.register)
 
  const onChange = e => {
   setUsetData({...userdata, [e.target.name]: e.target.value})

  }

   const onButtonSubmit = () => {
      dispatch(registerUser(userdata.email, userdata.password, userdata.name));
   }

   useEffect(() => {
      if (userRegister.success && userRegister.user.name.length > 0 && userRegister.refreshToken.length > 0) {
        navigate("/login");
      } else if (userRegister.errorRegister) {
        alert("Какая-то ошибочка");
      }
    }, [userRegister, navigate]);

  return <section className={`${style.register_section} container`}>
   <h2 className={`${style.register_title} text text_type_main-medium`}>Регистрация</h2>
   <div className={`${style.inputs_box} `}>
   <Input
      onChange={onChange}
      value={userdata.name}
      name={'name'}
      placeholder="Имя"
      type={"text"}

      />
   <EmailInput
        onChange={onChange}
        value={userdata.email}
        name={'email'}
        isIcon={false}
      />
       <PasswordInput
        onChange={onChange}
        value={userdata.password}
        name={'password'}
      />

      <Button onClick={onButtonSubmit} htmlType="button" type="primary" size="medium" extraClass={`${style.register_button} mb-15`}>
      Зарегистрироваться
</Button>
   </div>
   <p className={`text text_type_main-small text__disactive`}>
   Уже зарегистрированы?
      <Link to="/login" className={`${style.register_link} ml-2 text-secondary`}>Войти</Link>
   </p>
  </section>
}
export default Register