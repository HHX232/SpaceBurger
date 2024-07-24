import React from "react";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import stylesHeader from "./AppHeader.module.css";

function NavItem(props) {
  return (
    <li className={`${stylesHeader.nav__item} pt-4 pb-4  pr-5`}>
      {props.icon}
      <a className={props.textType} href={props.href}>
        {props.text}
      </a>
    </li>
  );
}

class ProfileButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }
  handleDoubleClick() {
    this.setState((prevState) => ({
      isActive: !prevState.isActive,
    }));
  }
  render() {
    const { isActive } = this.state;
    const buttonText = isActive ? "Войти" : "Личный кабинет";
    const buttonLink = isActive ? "#" : "#";

    return (
      <a
        href={buttonLink}
        className={`${stylesHeader.profile__box} pt-4 pb-4 pl-5 pr-5`}
        onDoubleClick={this.handleDoubleClick}
      >
        <ProfileIcon type="secondary" />
        <p className="text text_type_main-default text__disactive">
          {buttonText}
        </p>
      </a>
    );
  }
}

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
              href="#"
            />
            <NavItem
              textType="text text_type_main-default text__disactive"
              icon={<ListIcon type="secondary" />}
              text="Лента заказов"
              href="#"
            />
          </ul>
          <div className={stylesHeader.header__logo}>
            <Logo />
          </div>
          <ProfileButton />
        </div>
      </div>
    </nav>
    </header>
  );
}

export default AppHeader;
