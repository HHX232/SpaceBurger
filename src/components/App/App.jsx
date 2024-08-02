import { useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import style from './App.module.css';
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal'
import { useDispatch, useSelector } from 'react-redux';
import  { takeIngredients } from '../../services/actions/ingredient-action'
import { addIngredient, removeIngredient, reorderIngredients } from '../../services/actions/constructor-action'

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
  const [ingredients2, setIngredients] = useState([]);
  //старая булочка из useState
  const [bun2, setBun] = useState(initialBun);
  const [isOrderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [isIngredientDetailsOpen, setIngredientDetailsOpen] = useState({isOpen:false, proteins:0,fat:0,carbohydrates:0,calories:110, image: initialBun.image, food_title:""});
  
//данные через redux
  const dispatch = useDispatch();
  const { global_ingredients } = useSelector(state => state.ingredients);
  const { ingredients, bun } = useSelector(state => state.constructor);

    
  useEffect(() => {
    dispatch(takeIngredients());
    dispatch(reorderIngredients())
  }, [dispatch]);


  const onAdd = (item) => {
   dispatch(addIngredient(item))
  };

  const onRemove = (id) => {
    dispatch(removeIngredient(id))
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
          ingredients={ingredients2}
          onAdd={onAdd}
          onRemove={onRemove}
          newData={global_ingredients}
          setIngredientDetailsOpen={setIngredientDetailsOpen}
          isIngredientDetailsOpen={isIngredientDetailsOpen}
        />
        <BurgerConstructor
          ingredients={ingredients2}
          bun={bun2}
          onRemove={onRemove}
          setIngredients={setIngredients}
          openOrderDetails={openOrderDetails}
        />
      </main>
      {isOrderDetailsOpen && <Modal onClose={closeOrderDetails}> <OrderDetails onClose={closeOrderDetails} /></Modal>}
      {isIngredientDetailsOpen.isOpen && <Modal title="Детали ингредиента" onClose={closeIngredientDetails}> <IngredientDetails ingredientDetailsObject={isIngredientDetailsOpen} /></Modal>}
    </>
  );
}

export default App;
