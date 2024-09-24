import { FC, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../Pages/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../Pages/BurgerConstructor/BurgerConstructor";
import style from "./App.module.css";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { takeIngredients } from "../../services/actions/ingredient-action";
import { closeIngredientDetails } from "../../services/actions/ingredient-details-open-action";
import { closeOrderDetails } from "../../services/actions/order-details-action";
import { Routes, Route, useSearchParams } from "react-router-dom";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import ForgotPassword from "../Pages/Forgot-password/ForgotPassword";
import ResetPassword from "../Pages/Reset-password/ResetPassword";
import Profile from "../Pages/Profile/Profile";
import NotFoundPage from "../Pages/NotFound/NotFound";
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRouteElement";
import UnprotectedRouteElement from "../UnprotectedRouteElement/UnprotectedRouteElement";
import ProtectedResetPasswordRoute from "../ProtectedResetPasswordRoute/ProtectedResetPasswordRoute";
import IngredientPage from "../Pages/IngredientPage/IngredientPage";
import {
  getCookie,
  setCheckUserAuth,
  setCheckUserLoading,
  updateToken,
} from "../../services/actions/register-action";
import { request } from "../../utils/responses";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import FeedPage, { FeedItemList } from "../Pages/Feed/Feed";


interface IIngredientDetails{
  isOpen: boolean
  cardIndex:number;
  ingredientDetailsObject:{
    image?: string;
    food_title?: string;
    calories?: string | number;
    proteins?: string | number;
    fats?: string | number;
    carbohydrates?: string | number;
  }
 
}

interface IAppStore {
  register:{
    success: boolean
  }
  ingredientDetails:{ingredientObject: IIngredientDetails;}
  
  orderDetails:{
    isOpen: boolean;
    number: string;
  }
}
const  App = () => {
  //данные через redux
  const isAuthSuccess = useSelector((store:IAppStore) => store.register.success);
  const { ingredientObject } = useSelector((store:IAppStore) => store.ingredientDetails);
  const isOpenOrderDetails = useSelector((store:IAppStore) => store.orderDetails.isOpen);
  const isOrdertitle = useSelector((store:IAppStore) => store.orderDetails.number);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const modalIsOpen = searchParams.get("modalIsOpen");

  const closeIngredientDetailsFunction = () => {
    dispatch(closeIngredientDetails());
  };

  useEffect(() => {
    (dispatch as ThunkDispatch<{}, {}, Action>)(takeIngredients());
  }, [dispatch]);

  useEffect(() => {
    const accessToken = getCookie("accessToken")?.replace("%20", " ");
  
    dispatch(setCheckUserLoading(true));
    const headers: HeadersInit = accessToken
      ? { authorization: accessToken }
      : {};

    interface AuthResponse {
      success: boolean;

    }
  
    request<AuthResponse>("auth/user", { headers })
      .then((res: AuthResponse) => {
        dispatch(setCheckUserAuth(res.success));
      })
      .catch(() => {
        updateToken();
      })
      .finally(() => {
        dispatch(setCheckUserLoading(false));
      });
  
    const interval = setInterval(() => {
      if (!isAuthSuccess) {
        updateToken();
      }
    }, 20 * 60 * 1000);
  
    return () => clearInterval(interval);
  }, [dispatch, isAuthSuccess]);
  

  useEffect(() => {
    const accessToken = getCookie("accessToken")?.replace("%20", " ");
  
    dispatch(setCheckUserLoading(true));
    request("auth/user", {
      headers: {
        authorization: accessToken,
      },
    })
      .then((res) => {
        const response = res as { success: boolean };
        dispatch(setCheckUserAuth(response.success));
      })
      .catch((error: Error) => {
        console.error('Error checking user auth:', error);
        updateToken().then((action) => {
          if (action) {
            dispatch(action);
          }
        });
      })
      .finally(() => {
        dispatch(setCheckUserLoading(false));
      });
  
    const intervalId = setInterval(() => {
      if (!isAuthSuccess) {
        updateToken().then((action) => {
          if (action) {
            dispatch(action);
          }
        });
      }
    }, 20 * 60 * 1000);
  
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleCloseOrderDetails = () => {
    dispatch(closeOrderDetails());
  };

  return (
    <>
      <AppHeader />
      <Routes>
        {modalIsOpen !== "true" && (
          <Route path="/ingredients/:id" element={<IngredientPage />}></Route>
        )}
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
          <Route path="/feed" element={<FeedPage />}/>
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
        ></Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {isOpenOrderDetails && (
        <Modal
          title=""
          onClose={handleCloseOrderDetails}
        >
          {" "}
          <OrderDetails title={String(isOrdertitle)} />
        </Modal>
      )}
      {ingredientObject.isOpen && (
        <Modal
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
