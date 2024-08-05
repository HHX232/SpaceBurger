import React from "react";
import PropTypes from "prop-types";
import style from "../BurgerConstructor/BurgerConstructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Reorder } from "framer-motion";
import {
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientType from '../../utils/types';
import { removeIngredient, reorderIngredients } from '../../services/actions/constructor-action';
import { submitOrder } from '../../services/actions/order-details-action';

function BurgerItem({ generatedId, text, price, image }) {
  const dispatch = useDispatch();

  const onRemove = (generatedId) => {
    dispatch(removeIngredient(generatedId));
  };

  return (
    <div className={`${style.constructor__list_el}`}>
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={text}
        price={price}
        thumbnail={image}
        handleClose={() => onRemove(generatedId)}
      />
    </div>
  );
}

BurgerItem.propTypes = {
  generatedId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

function BurgerList({ ingredients }) {
  const dispatch = useDispatch();

  function setIngredients(items) {
    dispatch(reorderIngredients(items));
  }

  return (
    <Reorder.Group
      className={`${style.constructor__list} ${style.custom__scrollbar}`}
      axis="y"
      values={ingredients}
      onReorder={setIngredients}
    >
      {ingredients.map((item) => (
        <Reorder.Item
          key={item.generatedId}
          value={item}
          className={`${style.constructor__list_el}`}
        >
          <BurgerItem
            generatedId={item.generatedId}
            text={item.text}
            price={item.price}
            image={item.image}
          />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}

BurgerList.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      generatedId: PropTypes.string.isRequired,
      originalId: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

const BurgerConstructor = () => {
  
  const dispatch = useDispatch();
  const { ingredients, bun } = useSelector((state) => state.constructorList);
  const { loading, error } = useSelector((state) => state.orderDetails);
console.log("ingredients: ", ingredients, "\n bun: ", bun)

  const handleOrder = () => {
    const ingredientIds = [
      bun.originalId,
      ...ingredients.map((item) => item.originalId),
      bun.originalId,
    ];
    console.log("Submitting order with ingredients:", ingredientIds);

    dispatch(submitOrder(ingredientIds));
  };

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
      <BurgerList ingredients={ingredients} />
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
        <Button onClick={handleOrder} htmlType="button" type="primary" size="large" disabled={loading}>
          {loading ? 'Отправка...' : 'Оформить заказ'}
        </Button>
        {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientType),
  bun: PropTypes.shape({
    originalId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }),
};

export default BurgerConstructor;
