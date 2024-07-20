import { useState } from "react";
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerIngridients from "./components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";

function App() {
  const [ingridients, setIngridients] = useState([]);

  const onAdd = (item) => {
    console.log(item);
    setIngridients([...ingridients, item]);
  };

  const onRemove = (id) => {
    console.log(id);
    setIngridients(ingridients.filter((item) => item.id !== id));
  };
 
  return (
    <>
      <AppHeader />
      <section className="container main-content">
        <BurgerIngridients
          ingridients={ingridients}
          onAdd={onAdd}
          onRemove={onRemove}
        />
        <BurgerConstructor
          ingridients={ingridients}
          onRemove={onRemove}
          setIngridients={setIngridients}
        />
      </section>
    </>
  );
}

export default App;
