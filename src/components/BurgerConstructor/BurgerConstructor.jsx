import React from "react";
import data from "./../../utils/data";
import style from "../BurgerConstructor/BurgerConstructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Reorder } from "framer-motion";

function BurgerItem({ id, text, price, image, onRemove }) {
  return (
    <div className={`${style.constructor__list_el}`}>
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={text}
        price={price}
        thumbnail={image}
        handleClose={() => onRemove(id)}
      />
    </div>
  );
}

function BurgerList({ ingridients, onRemove, setIngridients }) {
  return (
    <Reorder.Group
      className={`${style.constructor__list} ${style.custom__scrollbar}`}
      axis="y"
      values={ingridients}
      onReorder={setIngridients}
    >
      {ingridients.map((item, index) => (
        <Reorder.Item
          key={item.id} // Use item.id as key
          value={item}
          className={`${style.constructor__list_el}`}
        >
          <BurgerItem
            id={item.id}
            text={item.text}
            price={item.price}
            image={item.image}
            onRemove={onRemove}
          />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}

const BurgerConstructor = ({ ingridients, onRemove, setIngridients }) => {
  const bun = data.find((item) => item.type === 'bun');
  const totalPrice = ingridients.reduce((total, item) => total + item.price, bun ? bun.price * 2 : 0); 
  return (
    <div className={`${style.constructor} ml-4 mt-25`}>
      {bun && (
        <div className={`${style.constructor__el} ml-8`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      <BurgerList
        ingridients={ingridients}
        onRemove={onRemove}
        setIngridients={setIngridients}
      />
      {bun && (
        <div className={`${style.constructor__el} ml-8 mb-6`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      <div className={style.burger__btn}>
        <div className={style.total__price}>
          <p className={`${style.total__number} text text_type_digits-medium`}>
            {totalPrice}
          </p>
          <CurrencyIcon type="primary" className={style.total_icon} />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
