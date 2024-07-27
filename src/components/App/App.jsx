import { useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import style from './App.module.css';
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from '../IngredientDetails/IngredientDetails';

const initialBun = {
  _id: "60666c42cc7b410027a1a9b1",
  text: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
};
const API = "https://norma.nomoreparties.space/api/ingredients"

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [bun, setBun] = useState(initialBun);
  const [newData, setNewData] = useState([]);
  const [isOrderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [isIngredientDetailsOpen, setIngredientDetailsOpen] = useState({isOpen:false, proteins:0,fat:0,carbohydrates:0,calories:110, image: initialBun.image, food_title:""});

  useEffect(() => {
    fetch(API)
      .then(response => response.json())
      .then(data => setNewData(data.data))
      .catch(error => console.error('Ошибка:', error));
  }, []);

  const onAdd = (item) => {
    if (item.type === "bun") {
      setBun(item);
      return;
    }
    setIngredients([...ingredients, item]);
  };

  const onRemove = (id) => {
    setIngredients(ingredients.filter((item) => item._id !== id));
  };
  const openIngredientDetails = () =>{
    setIngredientDetailsOpen({...isIngredientDetailsOpen, isOpen:true});
  }
  const closeIngredientDetails = () =>{
    setIngredientDetailsOpen({...isIngredientDetailsOpen, isOpen:false});
  }
  const openOrderDetails = () => {
    setOrderDetailsOpen(true);
  };

  const closeOrderDetails = () => {
    setOrderDetailsOpen(false);
  };

  return (
    <>
      <AppHeader />
      <main className={`${style.container} ${style.main_content}`}>
        <BurgerIngredients
          ingredients={ingredients}
          onAdd={onAdd}
          onRemove={onRemove}
          newData={newData}
          setIngredientDetailsOpen={setIngredientDetailsOpen}
          isIngredientDetailsOpen={isIngredientDetailsOpen}
        />
        <BurgerConstructor
          ingredients={ingredients}
          bun={bun}
          onRemove={onRemove}
          setIngredients={setIngredients}
          openOrderDetails={openOrderDetails}
        />
      </main>
      {isOrderDetailsOpen && <OrderDetails onClose={closeOrderDetails} />}
      {isIngredientDetailsOpen.isOpen && <IngredientDetails image={isIngredientDetailsOpen.image} calories={isIngredientDetailsOpen.calories} proteins={isIngredientDetailsOpen.proteins} fats={isIngredientDetailsOpen.fat}  food_title={isIngredientDetailsOpen.food_title} carbohydrates={isIngredientDetailsOpen.carbohydrates} onClose={closeIngredientDetails} />}
    </>
  );
}

export default App;
