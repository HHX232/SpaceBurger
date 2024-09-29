import  { useState, useCallback, FC, ReactNode } from "react";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './AppHeader.module.css'
import stylesHeader from "./AppHeader.module.css";
import { Link, useLocation } from "react-router-dom";
import { getCookie } from "../../services/actions/register-action";


interface INavItem {
  icon: ReactNode;
  text: string;
  to: string;
  textType?: string;
}
const NavItem: FC<INavItem> = (props) =>{
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
  const location = useLocation();
  const haveRefreshToken = getCookie('refreshToken');
  const handleDoubleClick = useCallback(() => {
    setIsActive((prevIsActive) => !prevIsActive);
  }, []);


  const buttonText = haveRefreshToken ? "Личный кабинет" : "Войти"; 
  const textType = location.pathname.includes("/profile")? "text text_type_main-default text__active" : "text text_type_main-default text__disactive";

  return (
    <Link
      className={`${style.profile__box}`}
      to="/profile"
      onDoubleClick={handleDoubleClick}
    >
      <ProfileIcon type={location.pathname.includes("/profile") ? "primary" : "secondary"} />
      <p className={textType}>
        {buttonText}
      </p>
    </Link>
  );
};

function AppHeader() {
  const location = useLocation();

  return (
    <header>
    <nav className={`${stylesHeader.header} pt-3 pb-3`}>
      <div className={stylesHeader.header__container}>
        <div className={stylesHeader.header__inner}>
          <ul className={stylesHeader.nav__list}>

            <NavItem
              textType={location.pathname === "/" ? "text text_type_main-default text__active" : "text text_type_main-default text__disactive"}
              icon={<BurgerIcon type={location.pathname === "/" ?  "primary" : "secondary"} />}
              text="Конструктор"
              to="/"
            />
            
  
            <NavItem
              textType={location.pathname.includes("/feed") ? "text text_type_main-default text__active" : "text text_type_main-default text__disactive"}
              icon={<ListIcon type={location.pathname.includes("/feed") ? "primary" : "secondary"} />}
              text="Лента заказов"
              to="/feed"
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