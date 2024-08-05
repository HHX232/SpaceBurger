import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Tab, Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./BurgerIngredients.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addIngredient, removeIngredient } from '../../services/actions/constructor-action';
import { openIngredientDetails } from '../../services/actions/ingredient-details-open-action';
import { v4 as uuidv4 } from 'uuid';

const Card = ({ id, image, price, type, name, ingredients, proteins, fat, carbohydrates, calories, food_title }) => {
  const [count, setCount] = useState(0);
  const [inBasket, setInBasket] = useState(false);
  const dispatch = useDispatch();

  const setIngredientDetailsOpen = (item) => {
    dispatch(openIngredientDetails(item));
  };

  const onAdd = (item) => {
    dispatch(addIngredient(item));
  };

  const onRemove = (generatedId) => {
    dispatch(removeIngredient(generatedId));
  };

  const onOneClick = () => {
    setIngredientDetailsOpen({ isOpen: true, proteins, fat, carbohydrates, calories, image, food_title });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const generatedId = uuidv4();
    if (type === "bun") {
      onAdd({ originalId: id, generatedId, text: name, price, image, type });
      return;
    }
    if (!inBasket) {
      setInBasket(true);
    }
    setCount(count + 1);
    onAdd({ originalId: id, generatedId, text: name, price, image, type });
  };
  
  const handleContextMenu = (e) => {
    e.preventDefault();
    setCount(count - 1);
    if (count <= 1) {
      setCount(0);
      setInBasket(false);
    }
    onRemove(id);
  };

  useEffect(() => {
    const c = ingredients.filter((item) => item.text === name).length;
    setCount(c);
  }, [ingredients, name]);

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
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  food_title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
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

const CardSets = ({ bunsRef, saucesRef, mainsRef }) => {
  const { global_ingredients } = useSelector(state => state.ingredients);
  const { ingredients } = useSelector(state => state.constructorList);
  const buns = global_ingredients.filter((item) => item.type === "bun");
  const sauces = global_ingredients.filter((item) => item.type === "sauce");
  const mains = global_ingredients.filter((item) => item.type === "main");

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
            proteins={bun.proteins}
            fat={bun.fat}
            carbohydrates={bun.carbohydrates}
            calories={bun.calories}
            type={bun.type}
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
            proteins={sauce.proteins}
            fat={sauce.fat}
            carbohydrates={sauce.carbohydrates}
            calories={sauce.calories}
            type={sauce.type}
            ingredients={ingredients}
          />
        ))}
      </div>
      <CardTitle refProp={mainsRef} title="Начинки" />
      <div className={`${style.cards} mb-10 ml-4`}>
        {mains.map((main) => (
          <Card
            id={main._id}
            key={main._id}
            image={main.image}
            price={main.price}
            name={main.name}
            food_title={main.name}
            proteins={main.proteins}
            fat={main.fat}
            carbohydrates={main.carbohydrates}
            calories={main.calories}
            type={main.type}
            ingredients={ingredients}
          />
        ))}
      </div>
    </div>
  );
};

CardSets.propTypes = {
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

function BurgerIngredients() {
  const [current, setCurrent] = useState("one");
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainsRef = useRef(null);
  const contentRef = useRef(null);
  
  const handleScroll = () => {
    const contentTop = contentRef.current.getBoundingClientRect().top;
    const bunsTop = bunsRef.current.getBoundingClientRect().top;
    const saucesTop = saucesRef.current.getBoundingClientRect().top;
    const mainsTop = mainsRef.current.getBoundingClientRect().top;

    const diffBuns = Math.abs(contentTop - bunsTop);
    const diffSauces = Math.abs(contentTop - saucesTop);
    const diffMains = Math.abs(contentTop - mainsTop);

    if (diffBuns < diffSauces && diffBuns < diffMains) {
      setCurrent("one");
    } else if (diffSauces < diffBuns && diffSauces < diffMains) {
      setCurrent("two");
    } else {
      setCurrent("three");
    }
  };

  useEffect(() => {
    const contentNode = contentRef.current;
    contentNode.addEventListener("scroll", handleScroll);
    return () => {
      contentNode.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        <div className={`${style.content} ${style.custom__scrollbar}`} ref={contentRef}>
          <ul className={`${style.list}`}>
            <CardSets
              bunsRef={bunsRef}
              saucesRef={saucesRef}
              mainsRef={mainsRef}
            />
          </ul>
        </div>
      </div>
    </>
  );
}

export default BurgerIngredients;
