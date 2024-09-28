import { Tab,CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './FeeditemList.module.css'
import backImage from '../../../images/meat-01.png'
import { useSelector } from 'react-redux';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import formatOrderDate from '../../utils/formatOrderDate';
import Ingredient from '../../utils/types';

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
   const ingredientData: Ingredient[] = useSelector(
     (store: any) => store.ingredients.globalIngredients
   );
 
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
 
 