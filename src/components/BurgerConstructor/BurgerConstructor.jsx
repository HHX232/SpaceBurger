import React from "react";
import PropTypes from "prop-types";
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

BurgerItem.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

function BurgerList({ ingredients, onRemove, setIngredients }) {
  return (
    <Reorder.Group
      className={`${style.constructor__list} ${style.custom__scrollbar}`}
      axis="y"
      values={ingredients}
      onReorder={setIngredients}
    >
      {ingredients.map((item) => (
        <Reorder.Item
          key={item.id}
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
 
BurgerList.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
  setIngredients: PropTypes.func.isRequired,
};



const BurgerConstructor = ({ ingredients = [], bun = null, onRemove, setIngredients, openOrderDetails }) => {
  const totalPrice = ingredients.reduce(
    (total, item) => total + item.price,
    bun ? bun.price * 2 : 0
  );

  return (
    <div className={`${style.constructor} ml-4 mt-25`}>
      {bun && (
        <div className={`${style.constructor__el} ml-8`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.text} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      <BurgerList
        ingredients={ingredients}
        onRemove={onRemove}
        setIngredients={setIngredients}
      />
      {bun && (
        <div className={`${style.constructor__el} ml-8 mb-6`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.text} (низ)`}
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
        <Button onClick={openOrderDetails} htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  bun: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }),
  onRemove: PropTypes.func.isRequired,
  setIngredients: PropTypes.func.isRequired,
  openOrderDetails: PropTypes.func.isRequired,
};

export default BurgerConstructor;