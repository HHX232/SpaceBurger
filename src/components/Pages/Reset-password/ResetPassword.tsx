import { useState } from "react";
import style from './ResetPassword.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from "react-router-dom";
import { request } from "../../../utils/responses";

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState<string | null>(null);  // Разрешаем строку и null

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setToken(e.target.value);
  };

  interface IResetPass {
    success: boolean;
    message: string;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
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
        const typedResponse = response as IResetPass;
        if (typedResponse.success) {
          alert("Success");
        } else {
          setError(typedResponse.message);
        }
      })
      .catch((error) => {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Unknown error occurred");
        }
      });
  };

  return (
    <section className={`${style.reset_section} container`}>
      <h2 className={`${style.register_title} text text_type_main-medium`}>
        Восстановление пароля
      </h2>
      <form onSubmit={handleSubmit}>
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
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={`${style.reset_button} mb-15`}
        >
          Сохранить
        </Button>
      </form>
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
