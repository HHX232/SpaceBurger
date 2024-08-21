import React, {useEffect, useState} from "react";
import style from './ForgotPassword.module.css'
import { PasswordInput, EmailInput, Input, EditIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from "react-router-dom";
import {request} from '../../utils/responses'
import { markForgotPasswordVisited } from "../../services/actions/register-action";
import { useDispatch } from "react-redux";



const ForgotPassword = () => {
  const [mailForgot, setMailForgot] = useState('yourmail@gmail.com')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onChange = e => {
    setMailForgot(e.target.value)
  }
  useEffect(() => {
    dispatch(markForgotPasswordVisited());
}, [dispatch]);

  async function  onResButton(){
    const { success, message } = await request('password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: mailForgot }),
    });

    if (success) {
      navigate('/reset-password');
    } else {
      alert(message)
    }
  }



return  <section className={`${style.forgot_section} container`}>
<h2 className={`${style.register_title} text text_type_main-medium`}>Восстановление пароля</h2>
<EmailInput
  onChange={onChange}
  value={mailForgot}
name={'Email'}
isIcon={false}
/>

<Button onClick={onResButton} htmlType="button" type="primary" size="medium" extraClass={`${style.forgot_button} mb-15`}>
Восстановить
</Button>

<div className={`${style.forgot__text_box}`}>
<p className={`text text_type_main-small text__disactive`}>
Вспомнили пароль?
<Link to="/login" className={`${style.forgot_link} ml-2 text-secondary`}>Войти</Link>
</p>
</div>
</section>
}
export default ForgotPassword