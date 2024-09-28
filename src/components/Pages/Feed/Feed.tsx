import { Tab,CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './Feed.module.css'
import backImage from '../../../images/meat-01.png'
import { useDispatch, useSelector } from 'react-redux';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import formatOrderDate from '../../../utils/formatOrderDate';
import { wsConnect, wsDisconnect } from '../../../services/actions/socketActions';
import { AppDispatch, RootState } from '../../..';
import { useAppDispatch } from '../../../utils/hooks';

export const WS_URL = 'wss://norma.nomoreparties.space/orders/all';
const variants = {
   visible: (i: number) => ({
     opacity: 1,
     transition: {
       delay: i * 0.15,
     },
   }),
   hidden: { opacity: 0 },
 };


interface Ingredient {
  _id: string;
  image: string;
  price: number;
}

export const FeedItemList = ({
  feedNumber = "#00000",
  feedDate = "2021-06-23T14:43:22.587Z",
  feedTitle = "Никогда не существовавший заказ",
  feedIngredients = [],
  feedSubTitle = "",
}: {
  feedNumber: string;
  feedDate: string;
  feedTitle: string;
  feedSubTitle: string;
  feedIngredients: string[];
}) => {
  
  const ingredientData = useSelector((store: RootState) => store.ingredients.globalIngredients) as Ingredient[];

  const getIngredientImage = useCallback(
    (id: string) => {
      const ingredient = ingredientData.find((item) => item._id === id);
      return ingredient ? ingredient.image : backImage;
    },
    [ingredientData]
  );

  const totalPrice = useMemo(() => {
    return feedIngredients.reduce((total, id) => {
      const ingredient = ingredientData.find((item) => item._id === id);
      return total + (ingredient ? ingredient.price : 0);
    }, 0);
  }, [feedIngredients, ingredientData]);

  const ingredientsList = useMemo(() => {
    return feedIngredients.map((id, index) => (
      <li
        key={index}
        className={style.feed_order_ingredients_item}
        style={{
          transform: `translateX(${index * -20}%)`,
          zIndex: `${feedIngredients.length - index}`,
          display: `${index > 5 && feedIngredients.length > 6 ? "none" : "auto"}`,
        }}
      >
        <div className={`${style.feed_order_ingredients_item_border}`}></div>
        <div className={`${style.feed_order_ingredients_item_image}`}>
          {index === 5 && feedIngredients.length > 6 ? (
            <span className={`${style.feed_order_ingredients_item_text} text text_type_main-default`}>
              +{feedIngredients.length - 6}
            </span>
          ) : (
            ""
          )}
          <img
            style={{ opacity: `${index === 5 && feedIngredients.length > 6 ? ".5" : "1"}` }}
            src={getIngredientImage(id)}
            alt=""
            className={style.feed_order_ingredient_image}
          />
        </div>
      </li>
    ));
  }, [feedIngredients, getIngredientImage]);

  const currentLocation = useLocation();

  return (
    <Link
      to={
        currentLocation.pathname.includes("profile/orders")
          ? `/profile/orders/${feedNumber.slice(1)}`
          : `/feed/${feedNumber.slice(1)}`
      }
      state={{ background: currentLocation }}
    >
      <div className={`${style.feed_order_box} p-6`}>
        <div className={`${style.feed_order_subtitle_box}`}>
          <h4 className={`${style.feed_order_subtitle_number} text text_type_digits-default`}>
            {feedNumber}
          </h4>
          <div className={`${style.feed_order_subtitle_date} text text_type_main-default text_color_inactive`}>
            {formatOrderDate(feedDate)}
          </div>
        </div>
        <div className="titles_box">
          <h4 className={`${style.feed_order_title} text text_type_main-medium`}>{feedTitle}</h4>
          {currentLocation.pathname.includes("profile") && (
            <p
              style={{
                color: `${feedSubTitle === "done" ? "#00CCCC" : "#FFFFFF"}`,
              }}
              className={`${style.feed_order_subtitle} text text_type_main-small`}
            >
              {feedSubTitle === "done" ? "Выполнен" : "Готовится"}
            </p>
          )}
        </div>
        <div className={style.feed_order_ingredients_box}>
          <ul className={style.feed_order_ingredients}>{ingredientsList}</ul>
          <div className={style.feed_order_price_box}>
            <span className={`${style.feed_order_price_number} text text_type_digits-default`}>
              {totalPrice}
            </span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};







export interface Order {
   ingredients: string[]; 
   _id: string;
   status: string;
   number: number;
   createdAt: string;
   updatedAt: string;
   name:string
   total:string, 
   totalRoday:string
}


interface FeedTableProps {
   finishedList: (string | number)[];
   notfineshedList: (string | number)[];
   allTimeready: string;
   todayReady: string;
 }
 
 export const FeedTable = ({
   finishedList = ["Zero"],
   notfineshedList = ["Zero"],
   allTimeready = "0",
   todayReady = "0",
 }: FeedTableProps) => {
 
   const finishedListItems = useMemo(() => {
     return finishedList.map((item, index) => (
       <li
         key={index}
         className={`text text_type_digits-default mb-2 ${style.feed_table_cook_list_item_screen_item} ${style.feed_table_cook_list_item_screen_item_ready}`}
       >
         {item}
       </li>
     ));
   }, [finishedList]);
 
   const notFinishedListItems = useMemo(() => {
     return notfineshedList.map((item, index) => (
       <li
         key={index}
         className={`text text_type_digits-default mb-2 ${style.feed_table_cook_list_item_screen_item}`}
       >
         {item}
       </li>
     ));
   }, [notfineshedList]);
 
   return (
     <div className={style.feed_table_box}>
       <div className={style.feed_table_cook_box}>
         <ul className={style.feed_table_cook_list}>
           <li className={style.feed_table_cook_list_item}>
             <h3 className={`text text_type_main-medium mb-6 ${style.feed_table_cook_list_item_title}`}>
               Готовы:
             </h3>
             <ul className={style.feed_table_cook_list_item_screen}>
               {finishedListItems}
             </ul>
           </li>
           <li className={style.feed_table_cook_list_item}>
             <h3 className={`text text_type_main-medium mb-6 ${style.feed_table_cook_list_item_title}`}>
               В работе:
             </h3>
             <ul className={style.feed_table_cook_list_item_screen}>
               {notFinishedListItems}
             </ul>
           </li>
         </ul>
         <div className={`${style.feed_table_big_title_box}`}>
           <h2 className={`${style.big_subtitle} text text_type_main-medium`}>
             Выполнено за все время:
           </h2>
           <h2 className={`${style.big_title} text text_type_digits-large`}>{allTimeready}</h2>
         </div>
         <div className={`${style.feed_table_big_title_box}`}>
           <h2 className={`${style.big_subtitle} text text_type_main-medium`}>
             Выполнено за сегодня:
           </h2>
           <h2 className={`${style.big_title} text text_type_digits-large`}>{todayReady}</h2>
         </div>
       </div>
     </div>
   );
 };

 

const FeedPage = () => {
  
  const dispatch:AppDispatch = useAppDispatch();

const { orders, total, totalToday } = useSelector((state: RootState) => state.socket);

  const finishedFeedsList = useMemo(() => {
    return orders.length > 0
      ? orders.filter((order:any) => order.status === 'done').map((order:any) => order.number)
      : ["Zero"];
  }, [orders]);

  const notFinishedFeedsList = useMemo(() => {
    return orders.length > 0
      ? orders.filter((order:any) => order.status !== 'done').map((order:any) => order.number)
      : ["Zero"];
  }, [orders]);

  
  useEffect(() => {
   dispatch(wsConnect(`wss://norma.nomoreparties.space/orders/all`)); 
    return () => {
      dispatch(wsDisconnect()); 
    };
  }, [dispatch]);

  return (
    <section className='container'>
      <h1 className='text text_type_main-large mt-10 mb-5'>Лента заказов</h1>
      <div className={`${style.feed_container} ${style.custom__scrollbar}`}>
  
        <ul className={`${style.feed_list}`}>
          {orders && orders.map((order:any, index:any) => (
            <motion.li
              custom={index}
              variants={variants}
              initial="hidden"
              animate="visible"
              key={`${index}_${order.number}`}
              className={style.feed_list_item}
            >
              <FeedItemList
                feedNumber={`#${order.number}`}
                feedDate={order.createdAt}
                feedTitle={`${order.name}`}
                feedSubTitle={`${order.status}`}
                feedIngredients={order.ingredients}
              />
            </motion.li>
          ))}
        </ul>

        {/* Таблица выполненных и незавершенных заказов */}
        <FeedTable
          allTimeready={total}
          todayReady={totalToday}
          finishedList={finishedFeedsList}
          notfineshedList={notFinishedFeedsList}
        />
      </div>
    </section>
  );
};

export default FeedPage;
