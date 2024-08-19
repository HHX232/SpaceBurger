import React, {useState, useCallback, useEffect} from "react";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './AppHeader.module.css'
import stylesHeader from "./AppHeader.module.css";
import { Link} from "react-router-dom";
import { useSelector } from "react-redux";

function NavItem(props) {
  return (
    <li className={`${stylesHeader.nav__item} pt-4 pb-4  pr-5`}>
      {props.icon}
      <Link className={props.textType} to={props.to}>
        {props.text}
      </Link>
    </li>
  );
}
const ProfileButton = () => {
  const [isActive, setIsActive] = useState(false);
  const [userIsLogin, setUserIsLogin] = useState(false);
  const userRegister = useSelector((state) => state.register);

  const handleDoubleClick = useCallback(() => {
    setIsActive((prevIsActive) => !prevIsActive);
  }, []);

  useEffect(() => {
    if (userRegister.user.name && userRegister.accessToken) {
      setUserIsLogin(true); 
    } else {
      setUserIsLogin(false); 
    }
  }, [userRegister]);

  const buttonText = userIsLogin ? "Личный кабинет" : "Войти"; 

  return (
    <Link
      className={`${style.profile__box}`}
      to="/profile"
      onDoubleClick={handleDoubleClick}
    >
      <ProfileIcon type="secondary" />
      <p className="text text_type_main-default text__disactive">
        {buttonText}
      </p>
    </Link>
  );
};

function AppHeader() {
  return (
    <header>
    <nav className={`${stylesHeader.header} `}>
      <div className={stylesHeader.header__container}>
        <div className={stylesHeader.header__inner}>
          <ul className={stylesHeader.nav__list}>

            <NavItem
              textType="text text_type_main-default text__active"
              icon={<BurgerIcon />}
              text="Конструктор"
              to="/"
            />
            
  
            <NavItem
              textType="text text_type_main-default text__disactive"
              icon={<ListIcon type="secondary" />}
              text="Лента заказов"
              to="/"
            />
          </ul>
          <div className={stylesHeader.header__logo}>
            <Link to="/">
            <Logo /></Link>
          </div>
          
        
          <ProfileButton />
        </div>
      </div>
    </nav>
    </header>
  );
}

export default AppHeader;
