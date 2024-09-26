import { useState } from "react";
import style from './ResetPassword.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from "react-router-dom";

import { getCookie, passwordResetThunk } from "../../../services/actions/register-action";

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState<string | null>(null);  // Разрешаем строку и null
  const navigate = useNavigate()
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setToken(e.target.value);
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    passwordResetThunk(password, token, navigate )()
  };

  return (
    <section className={`${style.reset_section} container`}>
 <form onSubmit={handleSubmit}  className={`${style.reset_section} container`}>
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
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={`${style.reset_button} mb-15`}
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
      </form>
    </section>
  );
};

export default ResetPassword;
