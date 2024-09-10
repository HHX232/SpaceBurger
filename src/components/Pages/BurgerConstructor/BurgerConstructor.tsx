import  { FC, useMemo } from "react";
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

import {
  addIngredient,
  removeIngredient,
  reorderIngredients, 
} from "../../../services/actions/constructor-action";
import { submitOrder } from "../../../services/actions/order-details-action";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import Ingredient from "../../../utils/types";
import { useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "../../../services/actions/register-action";
import { request } from "../../../utils/responses";

export interface IIngredient{
  generatedId: string;
  text: string;
  price: number;
  image: string;
  id?:string;
  name?:string;
  originalId?: string
}
interface IMassIngredients{
  ingredients:IIngredient[]
}
const generateUniqueId = (ingredients: IIngredient[]) => {
  let newId = uuidv4();
  while (ingredients.some(item => item.generatedId === newId)) {
    newId = uuidv4();
  }
  return newId;
};

const BurgerItem:FC<IIngredient> = ({ generatedId="", text, price, image })=> {
  const dispatch = useDispatch();

  const onRemove = (generatedId = "without gen-id") => {
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

const BurgerList : FC<IMassIngredients> =({ ingredients }) => {
  const dispatch = useDispatch();
  const setIngredients = (newItems: Ingredient[] = []) => {
    // Передаем новый массив в reducer
    dispatch(reorderIngredients(newItems));
  };

  return (
    <Reorder.Group<IIngredient>
      className={`${style.constructor__list} ${style.custom__scrollbar}`}
      axis="y"
      values={ingredients}
      onReorder={(newOrder: IIngredient[]) => setIngredients(newOrder as Ingredient[])}
    >
      {ingredients.map((item) => (
        <Reorder.Item
          key={item.generatedId}
          value={item}
          className={`${style.constructor__list_el}`}
        >
          <BurgerItem
            generatedId={item.generatedId ?? ""}
            text={item.text}
            price={item.price}
            image={item.image}
          />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}

interface IBurgerConstructorState{
  constructorList:{
    ingredients: IIngredient[];
    bun: IIngredient;
  }
  orderDetails:{
    loading: boolean;
    error: unknown;
  }
}

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const currentLocation = useLocation()
  const { ingredients, bun } = useSelector((state: IBurgerConstructorState) => state.constructorList);
  const { loading, error } = useSelector((state: IBurgerConstructorState) => state.orderDetails);

  const [{ isOver }, dropRef] = useDrop(() => ({ 
    accept: "ingridient",
    drop: (item: Ingredient) => {
      const generatedId = generateUniqueId(ingredients);
      const newItem = { ...item, generatedId };
      dispatch(addIngredient(newItem));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleOrder = async () => {
    try{

     const refreshCookie = getCookie('refreshToken')
      const data:{success: boolean, accessToken: string, refreshToken:string} = await request("auth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: refreshCookie }),
      })
      if(!data.success){
        throw new Error("Ошибка ответа от сервера")
      }
    }catch(err){
      navigate("/login", { state: { from: { pathname: currentLocation } } });
      return
    }
    if (bun && ingredients.length > 0) {
      const ingredientIds = [
        bun.originalId ?? "",
        ...ingredients.map((item) => item.originalId ?? ""),
        bun.originalId ?? "",
      ];
       submitOrder(ingredientIds)(dispatch);
    } else {
      alert("выберите сначала булочку и добавьте ингредиенты");
    }
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
            {
              //Был удален classname, поскольку вызывало непонятную ошибку
            }

          <CurrencyIcon type="primary" />
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


export default BurgerConstructor;
