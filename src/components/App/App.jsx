import { useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import style from './App.module.css';
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { takeIngredients } from '../../services/actions/ingredient-action';
import { addIngredient, removeIngredient, reorderIngredients } from '../../services/actions/constructor-action';
import { openIngredientDetails, closeIngredientDetails } from '../../services/actions/ingredient-details-open-action';
import {openOrderDetails, closeOrderDetails} from '../../services/actions/order-details-action'
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
 

  //данные через redux
  const dispatch = useDispatch();
  const { global_ingredients } = useSelector(state => state.ingredients);
  const { ingredients, bun } = useSelector(state => state.constructorList);
  const {ingredientObject} = useSelector(store => store.ingredientDetails)
  const isOpenOrderDetails = useSelector(store => store.orderDetails.isOpen);
  
function setIngredientDetailsOpen2(item){
dispatch(openIngredientDetails(item))
}
 
  function setIngredients(item) {
    dispatch(reorderIngredients(item));
  }

  useEffect(() => {
    dispatch(takeIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (global_ingredients.length > 0) {
      const firstBun = global_ingredients.find(ingredient => ingredient.type === 'bun');
      if (firstBun) {
        onAdd({
          ...firstBun,
          text: firstBun.name 
        });
      }
    }
  }, [global_ingredients]);

  const onAdd = (item) => {
    dispatch(addIngredient(item));
  };

  const onRemove = (id) => {
    dispatch(removeIngredient(id));
  };

  

  const closeIngredientDetailsFunction = () => {
   dispatch(closeIngredientDetails())
  };


  const handleOpenOrderDetails = () => {
    dispatch(openOrderDetails());
  };
  
  const handleCloseOrderDetails = () => {
    dispatch(closeOrderDetails());
  };

  return (
    <>
      <AppHeader />
      <main className={`${style.container} ${style.main_content}`}>
        <BurgerIngredients
          ingredients={ingredients}
          onAdd={onAdd}
          onRemove={onRemove}
          newData={global_ingredients}
          setIngredientDetailsOpen={setIngredientDetailsOpen2}
          isIngredientDetailsOpen={ingredientObject}
        />
        <BurgerConstructor
          ingredients={ingredients}
          bun={bun}
          onRemove={onRemove}
          setIngredients={setIngredients}
          openOrderDetails={handleOpenOrderDetails}
        />
      </main>
      {isOpenOrderDetails && <Modal onClose={handleCloseOrderDetails}> <OrderDetails onClose={handleCloseOrderDetails} /></Modal>}
      {ingredientObject.isOpen && <Modal title="Детали ингредиента" onClose={closeIngredientDetailsFunction}> <IngredientDetails ingredientDetailsObject={ingredientObject} /></Modal>}
    </>
  );
}

export default App;
