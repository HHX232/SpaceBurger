import React, { useState } from "react";
import style from './ResetPassword.module.css'
import { PasswordInput, EmailInput, Input, EditIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from "react-router-dom";
import { request } from "../../utils/responses";

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState(null);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      password,
      token,
    };
    request('password-reset/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.success) {
         alert("success")
        } else {
          setError(response.message);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <section className={`${style.reset_section} container`}>
      <h2 className={`${style.register_title} text text_type_main-medium`}>
        Восстановление пароля
      </h2>
      <PasswordInput
        onChange={handlePasswordChange}
        value={password}
        name={'password'}
      />
      <Input
        onChange={handleTokenChange}
        value={token}
        name={'token'}
        placeholder="Введите код из письма"
        type={"text"}
      />
      <Button
        htmlType="button"
        type="primary"
        size="medium"
        extraClass={`${style.reset_button} mb-15`}
        onClick={handleSubmit}
      >
        Сохранить
      </Button>
      {error && <p className="text text_type_main-small text__disactive">{error}</p>}
      <div className={`${style.reset__text_box}`}>
        <p className={`text text_type_main-small text__disactive`}>
          Вспомнили пароль?
          <Link to="/login" className={`${style.reset_link} ml-2 text-secondary`}>
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;