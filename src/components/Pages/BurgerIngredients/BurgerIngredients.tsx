import { useState, useRef, useEffect, FC, MouseEvent, RefObject, LegacyRef, MutableRefObject } from "react";
import PropTypes from "prop-types";
import {
  Tab,
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./BurgerIngredients.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addIngredient,
  removeIngredient,
} from "../../../services/actions/constructor-action";
import {
  openIngredientDetails,
  Tingredient,
} from "../../../services/actions/ingredient-details-open-action";
import { v4 as uuidv4 } from "uuid";
import { useDrag } from "react-dnd";
import useOnScreen from "../../../hooks/onScreen.hook";
import { useNavigate, useSearchParams } from "react-router-dom";
import IngredientPage from "../IngredientPage/IngredientPage";
import Modal from "../../Modal/Modal";
import { motion } from "framer-motion";
import Ingredient from "../../../utils/types";
import { IRootReducers } from "../../../services/reducers";
import { useAppDispatch } from "../../../utils/hooks";

interface TingredientBurger  {
  _id?: string | number;
  id?: string | number;
  text?: string;
  type?: string;
  proteins?: number;
  fat?: number;
  name?: string;
  food_title?: string;
  cardIndex?: string | number;
  carbohydrates?: number;
  calories?: number;
  price?: number;
  image?: string;
  image_mobile?: string;
  image_large?: string;
  __v?: number;
  isOpen?: boolean | string | undefined;
  ingredients?: Ingredient[]
};
interface TState {
  constructorList: {
    ingredients: TingredientBurger[];
    bun: TingredientBurger;
  };
}
const Card: FC<TingredientBurger> = ({
  id,
  image,
  price,
  type,
  name,
  proteins,
  fat,
  carbohydrates,
  calories,
  cardIndex
}) => {
  const [count, setCount] = useState(0);
  const [inBasket, setInBasket] = useState(false);
  const dispatch = useAppDispatch();
  const { ingredients, bun } = useSelector(
    (state: TState) => state.constructorList
  );
  const navigate = useNavigate();
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: "ingridient",
      item: {
        originalId: id,
        generatedId: uuidv4(),
        text: name,
        price,
        image,
        type,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const setIngredientDetailsOpen = (item: TingredientBurger) => {
    dispatch(openIngredientDetails(item as Tingredient));
  };

  const onAdd = (item: Ingredient) => {
    dispatch(addIngredient(item));
  };

  const onOneClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const valueModalIsOpen = searchParams.get("modalIsOpen") === "true";

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("modalIsOpen", "true");

    navigate({
      pathname: `/ingredients/${id}`,
      search: `?${newSearchParams.toString()}`,
    });
    setIngredientDetailsOpen({
      isOpen: valueModalIsOpen,
    });
  };

  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    let generatedId = uuidv4();

    const ingredient: Ingredient = {
      _id: generatedId,
      __v: 0,
      text: name ?? "",
      price: price ?? 0,
      image: image ?? "",
      type: type ?? "",
      fat: fat ?? 0,
      calories: calories ?? 0,
      carbohydrates: carbohydrates ?? 0,
      proteins: proteins ?? 0,
      image_mobile: "",
      image_large: "",
    }

    if (type === "bun") {
      // dispatch(removeIngredient(bun.generatedId));
      dispatch(removeIngredient(bun._id?.toString() ?? ""));
      // onAdd({ originalId: id, generatedId, text: name ?? "", price: price ?? 0, image: image ?? "", type });
      onAdd(ingredient);
      return;
    }
    if (!inBasket) {
      setInBasket(true);
    }
    setCount(count + 1);
    onAdd(ingredient);
  };
  useEffect(() => {
    const c = ingredients.filter((item) => item.text === name).length;
    if (type === "bun" && bun.text === name) {
      setCount(1);
    } else {
      setCount(c);
    }
  }, [ingredients, name, bun.text, type]);

  return (
    <div
    data-testid={`test-card-${cardIndex}`}
 
      ref={dragRef}
      style={{
        border: isDragging ? "2px solid purple" : "2px solid transparent",
      }}
      className={style.card}
      onContextMenu={e => handleClick(e)}
      onDoubleClick={e => handleClick(e)}
      onClick={e => onOneClick(e)}
    >
      {count > 0 && <Counter count={count} size="default" />}
      <img src={image} alt={name} className={style.image} />
      <div className={style.info}>
        <div className={`${style.price} text text_type_main-medium`}>
          <span className="mr-2">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <span    data-testcard={`card-name-example-${cardIndex}`} className={`${style.name} text text_type_main-small`}>
          {name}
        </span>
      </div>
    </div>
  );
};

export interface ICardTitleProps {
  title: string;
  refProp: LegacyRef<HTMLHeadingElement>;
  onShow: () => void;
  onHide: () => void;
}

const CardTitle = ({ title, refProp, onShow, onHide }: ICardTitleProps) => {
  const ref: MutableRefObject<HTMLSpanElement | undefined> = useRef();
  const isVisible = useOnScreen(refProp as RefObject<Element>);

  // Отслеживаю видимость заголовка
  useEffect(() => {
    if (!onShow) onShow = () => {};
    if (!onHide) onHide = () => {};
    isVisible ? onShow() : onHide();
  }, [isVisible]);

  return (
    <h2 ref={refProp} className="text text_type_main-medium mb-6">
      <span ref={ref as MutableRefObject<HTMLSpanElement>}>{title}</span>
    </h2>
  );
};

CardTitle.propTypes = {
  title: PropTypes.string.isRequired,
  refProp: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export interface ICardSetsProps {
  bunsRef: LegacyRef<HTMLHeadingElement>;
  saucesRef: LegacyRef<HTMLHeadingElement>;
  mainsRef: LegacyRef<HTMLHeadingElement>;
  setCurrentTab: (tab: string) => void;
}

const CardSets = ({ bunsRef, saucesRef, mainsRef, setCurrentTab }: ICardSetsProps) => {
  const globalIngredients = useSelector(
    (state: IRootReducers) => state.ingredients.globalIngredients
  );
  const { ingredients } = useSelector((state: IRootReducers) => state.constructorList);
  const buns = globalIngredients.filter((item) => item.type === "bun");
  const sauces = globalIngredients.filter((item) => item.type === "sauce");
  const mains = globalIngredients.filter((item) => item.type === "main");
  const [bunsVisible, setBunsVisible] = useState(true);

  const variants = {
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.15,
      },
    }),
    hidden: { opacity: 0 },
  };

  //! У компонентов CardTitle слушаю колбэки onHide и onShow и меняю текущий Tab
  return (
    <div>
      <CardTitle
        title="Булочки"
        onHide={() => setCurrentTab("two")}
        onShow={() => setCurrentTab("one")}
        refProp={bunsRef}
      />
      <div className={`${style.cards} mb-10 ml-4`}>
        {/* вот для этого множества нужно сделать анимацию*/}
        {buns.map((bun: Ingredient, index) => (
          <motion.li
            key={bun._id}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={variants}
          >
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
              cardIndex={index}
            />
          </motion.li>
        ))}
      </div>
      <CardTitle
        onShow={() => !bunsVisible && setCurrentTab("two")}
        onHide={() => setCurrentTab("three")}
        refProp={saucesRef}
        title="Соусы"
      />
      <div className={`${style.cards} mb-10 ml-4`}>
        {/* вот для этого множества нужно сделать анимацию*/}
        {sauces.map((sauce, index) => (
          <motion.li
            key={sauce._id}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={variants}
          >
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
              cardIndex={buns.length + index}
            />
          </motion.li>
        ))}
      </div>
      <CardTitle
        onShow={() => setBunsVisible(false)}
        refProp={mainsRef}
        title="Начинки"
        onHide={() => {}}
      />
      <div className={`${style.cards} mb-10 ml-4`}>
        {/* вот для этого множества нужно сделать анимацию*/}
        {mains.map((main, index) => (
          <motion.li
            key={main._id}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={variants}
          >
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
              cardIndex={buns.length + sauces.length + index}
            />
          </motion.li>
        ))}
      </div>
    </div>
  );
};


interface ITabsComponentProps{
  current: string;
  setCurrent: (tab: string) => void;
  bunsRef: RefObject<HTMLHeadingElement>;
  contentRef: RefObject<HTMLHeadingElement>;
  saucesRef: RefObject<HTMLHeadingElement>;
  mainsRef: RefObject<HTMLHeadingElement>;
}

const TabsComponent:FC<ITabsComponentProps>  = ({
  current,
  setCurrent,
  bunsRef,
  saucesRef,
  mainsRef,
}) => {
  const handleTabClick = (value:string) => {
    setCurrent(value);
    if (value === "one" && bunsRef?.current) {
      bunsRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (value === "two" && saucesRef?.current) {
      saucesRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (value === "three" && mainsRef?.current) {
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




function BurgerIngredients() {
  const [current, setCurrent] = useState("one");
  const bunsRef = useRef<HTMLDivElement | null>(null);
  const saucesRef = useRef<HTMLDivElement | null>(null);
  const mainsRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null); 
  const [searchParams] = useSearchParams();
  const modalIsOpen = searchParams.get("modalIsOpen");

  
  const handleScroll = () => {
    const contentTop = contentRef.current ? contentRef.current.getBoundingClientRect().top : 0;
    const bunsTop = bunsRef.current ? bunsRef.current.getBoundingClientRect().top : 0;
    const saucesTop = saucesRef.current ? saucesRef.current.getBoundingClientRect().top : 0;
    const mainsTop = mainsRef.current ? mainsRef.current.getBoundingClientRect().top : 0;

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

    if (contentNode) {
      contentNode.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (contentNode) {
        contentNode.removeEventListener("scroll", handleScroll);
      }
    };
  }, [contentRef]); 

  const navigate = useNavigate();
  const closeIngredientDetails = () => {
    navigate({
      pathname: `/ingredients/`,
    });
  };

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
          contentRef={contentRef}
        />
        <div
          className={`${style.content} ${style.custom__scrollbar}`}
          ref={contentRef}
        >
          <ul className={`${style.list}`}>
            <CardSets
              bunsRef={bunsRef}
              saucesRef={saucesRef}
              mainsRef={mainsRef}
              setCurrentTab={setCurrent}
            />
          </ul>
        </div>
      </div>
      {modalIsOpen === "true" && (
        <Modal
          onClose={() => closeIngredientDetails()}
          children={<IngredientPage />}
        ></Modal>
      )}
    </>
  );
}

export default BurgerIngredients;
