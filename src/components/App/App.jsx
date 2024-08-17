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
import { addIngredient } from '../../services/actions/constructor-action';
import { closeIngredientDetails } from '../../services/actions/ingredient-details-open-action';
import { closeOrderDetails} from '../../services/actions/order-details-action'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "../Register/Register";
import Login from "../Login/Login";
import ForgotPassword from "../Forgot-password/ForgotPassword";
import ResetPassword from "../Reset-password/ResetPassword";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFound/NotFound";

function App() {
 
  //данные через redux
  const {ingredientObject} = useSelector(store => store.ingredientDetails)
  const isOpenOrderDetails = useSelector(store => store.orderDetails.isOpen);
  const isOrdertitle = useSelector(store=> store.orderDetails.number)
  const { global_ingredients } = useSelector(state => state.ingredients);
  const dispatch = useDispatch();

  const onAdd = (item) => {
    dispatch(addIngredient(item));
  };

  const closeIngredientDetailsFunction = () => {
   dispatch(closeIngredientDetails())
  };

//получение списка ингридиентов с API + установка начальной булочки (считаю это лучше чем просто заглушки)
// useEffect(() => {
//   if (global_ingredients.length > 0) {
//     const firstBun = global_ingredients.find(ingredient => ingredient.type === 'bun');
//     if (firstBun) {
//       onAdd({
//         ...firstBun,
//         generatedId: uuidv4(),
//         originalId: firstBun._id,
//         text: firstBun.name 
//       });
//     }
//   }
// }, [global_ingredients]);

useEffect(() => {
  dispatch(takeIngredients());
}, [dispatch]);
  
  const handleCloseOrderDetails = () => {
    dispatch(closeOrderDetails());
  }

  return (
    <> 
      

      <Router>
      <AppHeader />
        <Routes>
          <Route path="/" element={ 
            <main className={`${style.container} ${style.main_content}`}>
            <BurgerIngredients/><BurgerConstructor/></main>}>
          </Route>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/forgot-password" element={<ForgotPassword />}/>
          <Route path="/reset-password" element={<ResetPassword />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="*" element={<NotFoundPage />}/>
        </Routes>
      </Router>

     
      {isOpenOrderDetails && <Modal onClose={handleCloseOrderDetails}> <OrderDetails title={String(isOrdertitle) } /></Modal>}
      {ingredientObject.isOpen && <Modal title="Детали ингредиента" onClose={closeIngredientDetailsFunction}> <IngredientDetails ingredientDetailsObject={ingredientObject} /></Modal>}
    </>
  );
}

export default App;
