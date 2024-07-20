import { useState, useRef, useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./BurgerIngredients.module.css";
import data from "./../../utils/data";

// компонент для карточки со счетчиками
const Card = ({ id, image, price, name, onAdd, onRemove, ingridients }) => {
  const [count, setCount] = useState(0);
  const [inBasket, setInBasket] = useState(false);

  const handleClick = () => {
    if (!inBasket) {
      setInBasket(true);
    }
    setCount(count + 1);
    onAdd({ id: `${id}_${count}`, text: name, price, image });
  };

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
    const c = ingridients.filter((item) => item.id.split("_")[0] === id).length;
    setCount(c);
  }, [ingridients]);

  return (
    <div
      className={style.card}
      onContextMenu={handleContextMenu}
      onClick={handleClick}
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

// компонент заголовка секции меню
const CardTitle = ({ title, refProp }) => {
  return (
    <h2 ref={refProp} className="text text_type_main-medium mb-6">
      {title}
    </h2>
  );
};

// компонент для отображения меню
const CardSets = ({
  ingridients,
  bunsRef,
  saucesRef,
  mainsRef,
  onAdd,
  onRemove,
}) => {
  const buns = data.filter((item) => item.type === "bun");
  const sauces = data.filter((item) => item.type === "sauce");
  const mains = data.filter((item) => item.type === "main");

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
            onAdd={onAdd}
            onRemove={onRemove}
            ingridients={ingridients}
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
            onAdd={onAdd}
            onRemove={onRemove}
            ingridients={ingridients}
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
            onAdd={onAdd}
            onRemove={onRemove}
            ingridients={ingridients}
          />
        ))}
      </div>
    </div>
  );
};

// Компонент для табов
const TabsComponent = ({
  current,
  setCurrent,
  bunsRef,
  saucesRef,
  mainsRef,
}) => {
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

// Главный компонент
function BurgerIngredients({ ingridients, onAdd, onRemove }) {
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
              ingridients={ingridients}
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

export default BurgerIngredients;
