import { useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import style from './App.module.css';

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

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [bun, setBun] = useState(initialBun);

  const onAdd = (item) => {
    if (item.type === "bun") {
      setBun(item);
      return;
    }
    setIngredients([...ingredients, item]);
  };

  const onRemove = (id) => {
    setIngredients(ingredients.filter((item) => item.id !== id));
  };

  return (
    <>
      <AppHeader />
      <main className={`${style.container} ${style.main_content}`}>
        <BurgerIngredients
          ingredients={ingredients}
          onAdd={onAdd}
          onRemove={onRemove}
        />
        <BurgerConstructor
          ingredients={ingredients}
          bun={bun}
          onRemove={onRemove}
          setIngredients={setIngredients}
        />
      </main>
    </>
  );
}

export default App;
