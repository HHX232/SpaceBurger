import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Tab, Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./BurgerIngredients.module.css";
import data from "./../../utils/data";
import IngredientType from '../../utils/types';
const Card = ({ id, image, price, type, name, onAdd, onRemove, ingredients,proteins,fat,carbohydrates,calories, isIngredientDetailsOpen, setIngredientDetailsOpen,food_title }) => {
  const [count, setCount] = useState(0);
  const [inBasket, setInBasket] = useState(false);

  const onOneClick = () =>{
    setIngredientDetailsOpen({isOpen:true, proteins:proteins,fat:fat,carbohydrates:carbohydrates,calories:calories, image: image, food_title:food_title})
  }
  //двойной клик-в корзину
  const handleClick = (e) => {
    e.preventDefault();
    if (type === "bun") {
      onAdd({ id, text: name, price, image, type });
      return;
    }
    if (!inBasket) {
      setInBasket(true);
    }
    setCount(count + 1);
    onAdd({ id: `${id}_${count}`, text: name, price, image, type });
  };
  //правая к
  const handleContextMenu = (e) => {
    e.preventDefault();
    setCount(count - 1);
    if (count <= 1) {
      setCount(0);
      setInBasket(false);
    }
    onRemove(`${id}_${count - 1}`);
  };

  useEffect(() => {
    const c = ingredients.filter((item) => item.id.split("_")[0] === id).length;
    setCount(c);
  }, [ingredients, id]);

  return (
    <div
      className={style.card}
      onContextMenu={handleClick}
      onDoubleClick={handleClick}
      onClick={onOneClick}
    >
      {count > 0 && <Counter count={count} size="default" />}
      <img src={image} alt={name} className={style.image} />
      <div className={style.info}>
        <div className={`${style.price} text text_type_main-medium`}>
          <span className="mr-2">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <span className={`${style.name} text text_type_main-small`}>
          {name}
        </span>
      </div>
    </div>
  );
};


Card.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
  isIngredientDetailsOpen: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    food_title: PropTypes.string.isRequired,
  }).isRequired,
  setIngredientDetailsOpen: PropTypes.func.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  food_title: PropTypes.string.isRequired,
};
const CardTitle = ({ title, refProp }) => {
  return (
    <h2 ref={refProp} className="text text_type_main-medium mb-6">
      {title}
    </h2>
  );
};

CardTitle.propTypes = {
  title: PropTypes.string.isRequired,
  refProp: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
};

const CardSets = ({ ingredients, bunsRef, saucesRef, mainsRef, onAdd, onRemove, newData,isIngredientDetailsOpen, setIngredientDetailsOpen }) => {
  const buns = newData.filter((item) => item.type === "bun");
  const sauces = newData.filter((item) => item.type === "sauce");
  const mains = newData.filter((item) => item.type === "main");

  return (
    <div>
      <CardTitle refProp={bunsRef} title="Булочки" />
      <div className={`${style.cards} mb-10 ml-4`}>
        {buns.map((bun) => (
          <Card
            id={bun._id}
            key={bun._id}
            image={bun.image}
            price={bun.price}
            name={bun.name}
            food_title={bun.name}
            onAdd={onAdd}
            proteins = {bun.proteins}
            fat = {bun.fat}
            carbohydrates = {bun.carbohydrates}
            calories = {bun.calories}
            isIngredientDetailsOpen = {isIngredientDetailsOpen}
            setIngredientDetailsOpen = {setIngredientDetailsOpen}
            type={bun.type}
            onRemove={onRemove}
            ingredients={ingredients}
          />
        ))}
      </div>
      <CardTitle refProp={saucesRef} title="Соусы" />
      <div className={`${style.cards} mb-10 ml-4`}>
        {sauces.map((sauce) => (
          <Card
            id={sauce._id}
            key={sauce._id}
            image={sauce.image}
            price={sauce.price}
            name={sauce.name}
            food_title={sauce.name}
            type={sauce.type}
            proteins = {sauce.proteins}
            fat = {sauce.fat}
            carbohydrates = {sauce.carbohydrates}
            calories = {sauce.calories}
            isIngredientDetailsOpen = {isIngredientDetailsOpen}
              setIngredientDetailsOpen = {setIngredientDetailsOpen}
            onAdd={onAdd}
            onRemove={onRemove}
            ingredients={ingredients}
          />
        ))}
      </div>
      <CardTitle refProp={mainsRef} title="Начинки"/>
      <div className={`${style.cards} mb-10 ml-4`}>
        {mains.map((main) => (
          <Card
            id={main._id}
            key={main._id}
            image={main.image}
            price={main.price}
            name={main.name}
            food_title={main.name}
            type={main.type}
            proteins = {main.proteins}
            fat = {main.fat}
            isIngredientDetailsOpen = {isIngredientDetailsOpen}
              setIngredientDetailsOpen = {setIngredientDetailsOpen}
            carbohydrates = {main.carbohydrates}
            calories = {main.calories}
            onAdd={onAdd}
            onRemove={onRemove}
            ingredients={ingredients}
          />
        ))}
      </div>
    </div>
  );
};

CardSets.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientType).isRequired, //импортируемый IngredientType
  bunsRef: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
  saucesRef: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
  mainsRef: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  newData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
    })
  ).isRequired,
  isIngredientDetailsOpen: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    food_title: PropTypes.string.isRequired,
  }).isRequired,
  setIngredientDetailsOpen: PropTypes.func.isRequired,
};

const TabsComponent = ({ current, setCurrent, bunsRef, saucesRef, mainsRef }) => {
  const handleTabClick = (value) => {
    setCurrent(value);
    if (value === "one") {
      bunsRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (value === "two") {
      saucesRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (value === "three") {
      mainsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ display: "flex", marginBottom: "40px" }}>
      <Tab
        value="one"
        active={current === "one"}
        onClick={() => handleTabClick("one")}
      >
        Булки
      </Tab>
      <Tab
        value="two"
        active={current === "two"}
        onClick={() => handleTabClick("two")}
      >
        Соусы
      </Tab>
      <Tab
        value="three"
        active={current === "three"}
        onClick={() => handleTabClick("three")}
      >
        Начинки
      </Tab>
    </div>
  );
};

TabsComponent.propTypes = {
  current: PropTypes.string.isRequired,
  setCurrent: PropTypes.func.isRequired,
  bunsRef: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
  saucesRef: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
  mainsRef: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
};
 
function BurgerIngredients({ ingredients, onAdd, onRemove, newData, isIngredientDetailsOpen, setIngredientDetailsOpen }) {
  const [current, setCurrent] = useState("one");
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainsRef = useRef(null);

  return (
    <>
      <div className={style.constructor_content}>
        <h1 className="main__title text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h1>
        <TabsComponent
          current={current}
          setCurrent={setCurrent}
          bunsRef={bunsRef}
          saucesRef={saucesRef}
          mainsRef={mainsRef}
        />
        <div className={`${style.content} ${style.custom__scrollbar}`}>
          <ul className={`${style.list}`}>
            <CardSets
              newData={newData}
              ingredients={ingredients}
              isIngredientDetailsOpen = {isIngredientDetailsOpen}
              setIngredientDetailsOpen = {setIngredientDetailsOpen}
              bunsRef={bunsRef}
              saucesRef={saucesRef}
              mainsRef={mainsRef}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          </ul>
        </div>
      </div>
    </>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientType).isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default BurgerIngredients;
