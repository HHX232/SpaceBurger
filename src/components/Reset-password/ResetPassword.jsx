import React, {useState} from "react";
import style from './ResetPassword.module.css'
import { PasswordInput, EmailInput, Input, EditIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from "react-router-dom";
const ResetPassword = () => {
   const [value, setValue] = useState('bob@example.com')
   const [value2, setValue2] = useState('bob@example.com')

  const onChange = e => {
    setValue(e.target.value)
  }

  const onChange2 = e => {
   setValue2(e.target.value)
  }
return  <section className={`${style.reset_section} container`}>
<h2 className={`${style.register_title} text text_type_main-medium`}>Восстановление пароля</h2>
<PasswordInput
        onChange={onChange2}
        value={value2}
        name={'password'}
        
      />
<Input
      onChange={onChange2}
      value={value2}
      name={'name'}
      placeholder="Введите код из письма"
      // isIcon={false}
      type={"text"}
      // extraClass="mb-6"
      />
<Button htmlType="button" type="primary" size="medium" extraClass={`${style.reset_button} mb-15`}>
Сохранить
</Button>
<div className={`${style.reset__text_box}`}>
<p className={`text text_type_main-small text__disactive`}>
Вспомнили пароль?
<Link to="/login" className={`${style.reset_link} ml-2 text-secondary`}>Войти</Link>
</p>
</div>
</section>
}
export default ResetPassword