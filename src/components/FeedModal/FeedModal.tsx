import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import style from './FeedModal.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import {request} from '../../utils/responses'


import Ingredient from '../../utils/types';
import countIDs from '../../utils/countIDs';
import formatOrderDate from '../../utils/formatOrderDate';
import { useAppSelector } from '../../utils/hooks';

export const FeedListElement = ({image = "", text = "", numberProductCount, productPrice}:{image:string, text:string, numberProductCount:number|string, productPrice:string|number}) =>{

   return <div className={`${style.feed_item_box} mb-4 pr-6`}>
      <div className={`${style.image_box} mr-4 ml-1`}>
        
         <div  style={{ backgroundImage: `url(${image})`, zIndex:10}} className={`  ${style.image_content}`} />
      </div>
      <p className={`${style.image_title} text text_type_main-default`}>{text}</p>
      <div className={`${style.price_item_box}  text text_type_digits-default`}>
         <p className={`${style.price_item_box_count}`}>{numberProductCount ? numberProductCount : "0000"}</p>
         <p> x </p>
         <p className={`${style.price_item_box_count} mr-2`}>{`${productPrice}`}</p>
         <CurrencyIcon type="primary" />
      </div>
   </div>
}
interface IOrderObject {
   createdAt: string;  // Дата создания заказа
   ingredients: string[];  // Массив идентификаторов ингредиентов
   name?: string;  // Название заказа
   number?: number;  // Номер заказа
   owner?: string;  // Идентификатор владельца
   status?: string;  // Статус заказа
   updatedAt?: string;  // Дата обновления заказа
   __v?: number;  // Версия документа (MongoDB)
   _id?: string;  // Идентификатор заказа
 }
 interface IIngredient {
  _id: string;
  image: string;
  name: string;
  price: number;

}
 

  const FeedModal = ({ text = "done" }) => {
   const params = useParams();
   const [currentIngredient, setCurrentIngredient] = useState<{ idString: string; idCount: number }[]>([]);
   const [orderStatus, setOrderStatus] = useState<IOrderObject | null>(null);
   const numberFromParams = params.number;
 const location = useLocation()
 const background = location.state && location.state.background;

 const allIngredients = useAppSelector((state) => state.ingredients.globalIngredients) as IIngredient[];

   useEffect(() => {
     if (numberFromParams) {
       request<{ orders: IOrderObject[], success: boolean }>(`orders/${numberFromParams}`, {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
         },
       })
         .then((response) => {
           if (response.success) {
             const order = response.orders[0] as IOrderObject;
             console.log("order", order);
             setOrderStatus(order);
             const arrayOfIDs = order.ingredients
             const sortedId = countIDs(arrayOfIDs)
             setCurrentIngredient(sortedId)
      
            
           }
         })
         .catch((error) => {
           console.error('Error response:', error);
         });
     }
   }, [numberFromParams]);
  
    return (
        <div style={{
          ...(!background && {
            maxWidth: 640,
            margin: '120px auto 0 auto'
          })
        }} className={`${style.feed_box}`}>   
        
            <h3 style={{
          ...(!background && {
            textAlign: "center"
          })
        }}  className={`${style.feed_title_number} text text_type_digits-default mb-10`}>{`#${numberFromParams}`}</h3>
            <div className={`${style.feed_titles_box} mb-15`}>
               <h2 className={`${style.feed_main_title} text text_type_main-medium mb-3`}>{orderStatus && orderStatus.name}</h2>
               <p style={{color: `${text === "No Info" ? "red" : (text === "done" ? "#00CCCC" : "white") }`}} className={`text text_type_main-small ${style.feed_main_subtitle}`}>{orderStatus && orderStatus.status}</p>
            </div>
            <div className={`${style.feed_text} mb-6 text text_type_main-medium `}>Состав:</div>
            <ul className={`${style.feed_ingredients_list} ${style.custom__scrollbar} mb-10`}>

            {currentIngredient.map((item, index) => (
  <li key={index} className={`${style.feed_ingredients_list_item}`}>
   <FeedListElement
  image={allIngredients.find((ingredient) => ingredient._id === item.idString)?.image ?? ''}
  text={allIngredients.find((ingredient) => ingredient._id === item.idString)?.name ?? ''}
  numberProductCount={`${item.idCount}`}
  productPrice={allIngredients.find((ingredient) => ingredient._id === item.idString)?.price ?? 0}
/>
  </li>
))} 
            </ul>
            <div className={`${style.feed_time_box}`}>
               <p className={`${style.feed_time} text text_type_main-small text_color_inactive`}>{formatOrderDate(orderStatus != null ? orderStatus.createdAt : "")}</p>
               <div className={`${style.feed_price_box}`}>
               <p className={`${style.feed_price_box_number} text text_type_digits-default`}>
  {currentIngredient.reduce((acc, item) => {
    const ingredient = allIngredients.find((ing:any) => ing._id === item.idString);
    return acc + item.idCount * (ingredient?.price || 0);
  }, 0)}
</p>
                  <CurrencyIcon type="primary" />
               </div>
            </div>
        </div>
    )
}
export default FeedModal