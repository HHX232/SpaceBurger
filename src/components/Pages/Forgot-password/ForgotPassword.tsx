import { FormEvent, useEffect, useState } from "react";
import style from "./ForgotPassword.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../../../utils/responses";
import { forgotPasswordThunk, markForgotPasswordVisited } from "../../../services/actions/register-action";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const [mailForgot, setMailForgot] = useState("yourmail@gmail.com");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setMailForgot(target.value);
  };
  useEffect(() => {
    dispatch(markForgotPasswordVisited());
  }, [dispatch]);

  interface ResetPasswordResponse {
    success: boolean;
    message: string;
  }
  async function onResButton(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
forgotPasswordThunk(mailForgot, navigate)()
   
  }

  return (
    <section className={`${style.forgot_section} `}>
      <form className={`${style.forgot_section} container`}  onSubmit={onResButton}>
      <h2  className={`${style.register_title} text text_type_main-medium`}>
        Восстановление пароля
      </h2>
      <EmailInput
        onChange={onChange as () => void}
        value={mailForgot}
        name={"Email"}
        isIcon={false}
      />
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        extraClass={`${style.forgot_button} mb-15`}
      >
        Восстановить
      </Button>

      <div className={`${style.forgot__text_box}`}>
        <p className={`text text_type_main-small text__disactive`}>
          Вспомнили пароль?
          <Link
            to="/login"
            className={`${style.forgot_link} ml-2 text-secondary`}
          >
            Войти
          </Link>
        </p>
      </div>
      </form>
    </section>
  );
};
export default ForgotPassword;
