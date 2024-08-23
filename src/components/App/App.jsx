import { useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import style from "./App.module.css";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { takeIngredients } from "../../services/actions/ingredient-action";
import { addIngredient } from "../../services/actions/constructor-action";
import { closeIngredientDetails } from "../../services/actions/ingredient-details-open-action";
import { closeOrderDetails } from "../../services/actions/order-details-action";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useSearchParams,
} from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import ForgotPassword from "../Forgot-password/ForgotPassword";
import ResetPassword from "../Reset-password/ResetPassword";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFound/NotFound";
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRouteElement";
import UnprotectedRouteElement from "../UnprotectedRouteElement/UnprotectedRouteElement";
import ProtectedResetPasswordRoute from "../ProtectedResetPasswordRoute/ProtectedResetPasswordRoute";
import IngredientPage from "../IngredientPage/IngredientPage";

function App() {
  //данные через redux
  const { ingredientObject } = useSelector((store) => store.ingredientDetails);
  const isOpenOrderDetails = useSelector((store) => store.orderDetails.isOpen);
  const isOrdertitle = useSelector((store) => store.orderDetails.number);
  const { global_ingredients } = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const modalIsOpen = searchParams.get("modalIsOpen");

  const closeIngredientDetailsFunction = () => {
    dispatch(closeIngredientDetails());
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
  };

  return (
    <>
      <AppHeader />
      <Routes>
        
       

        { modalIsOpen !== "true" && <Route path="/ingredients/:id" element={<IngredientPage />}></Route> }
        <Route
          path="/"
          element={
            <main className={`${style.container} ${style.main_content}`}>
              <BurgerIngredients />
              <BurgerConstructor />
            </main>
          }
        >
          <Route path="ingredients/:id" element={<IngredientPage />}></Route>
        </Route>

        <Route
          path="/login"
          element={
            <UnprotectedRouteElement>
              <Login />
            </UnprotectedRouteElement>
          }
        />
        <Route
          path="/register"
          element={
            <UnprotectedRouteElement>
              <Register />
            </UnprotectedRouteElement>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <UnprotectedRouteElement>
              <ForgotPassword />
            </UnprotectedRouteElement>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedResetPasswordRoute>
              <ResetPassword />
            </ProtectedResetPasswordRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRouteElement>
              <Profile />
            </ProtectedRouteElement>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {isOpenOrderDetails && (
        <Modal
          objectParams={searchParams}
          setSearchParams={setSearchParams}
          onClose={handleCloseOrderDetails}
        >
          {" "}
          <OrderDetails title={String(isOrdertitle)} />
        </Modal>
      )}
      {ingredientObject.isOpen && (
        <Modal
          objectParams={searchParams}
          setSearchParams={setSearchParams}
          title="Детали ингредиента"
          onClose={closeIngredientDetailsFunction}
        >
          {" "}
          <IngredientDetails ingredientDetailsObject={ingredientObject} />
        </Modal>
      )}
    </>
  );
}

export default App;
