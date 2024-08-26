import  { useMemo } from "react";
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
import IngredientType from "../../../utils/types";
import {
  addIngredient,
  removeIngredient,
  reorderIngredients, 
} from "../../../services/actions/constructor-action";
import { submitOrder } from "../../../services/actions/order-details-action";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

const generateUniqueId = (ingredients) => {
  let newId = uuidv4();
  while (ingredients.some(item => item.generatedId === newId)) {
    newId = uuidv4();
  }
  return newId;
};

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
  const setIngredients = (newItems) => {
    // Передаем новый массив в reducer
    dispatch(reorderIngredients(newItems));
  };

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

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "ingridient",
    drop: (item) => {
      const generatedId = generateUniqueId(ingredients);
      const newItem = { ...item, generatedId };
      dispatch(addIngredient(newItem));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleOrder = () => {
    const ingredientIds = [
      bun.originalId,
      ...ingredients.map((item) => item.originalId),
      bun.originalId,
    ];
    dispatch(submitOrder(ingredientIds));
  };

  const totalPrice = useMemo(() => {
    return ingredients.reduce(
      (total, item) => total + item.price,
      bun ? bun.price * 2 : 0
    );
  }, [ingredients, bun]);

  return (
    <div ref={dropRef} className={`${style.constructor} ml-4 mt-25`}>
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
        <Button
          onClick={handleOrder}
          htmlType="button"
          type="primary"
          size="large"
          disabled={loading}
        >
          {loading ? "Отправка..." : "Оформить заказ"}
        </Button>

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
