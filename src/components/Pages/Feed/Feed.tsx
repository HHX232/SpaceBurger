import { Tab,CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './Feed.module.css'
import backImage from '../../../images/meat-01.png'
import { useSelector } from 'react-redux';
import Ingredient from '../../../utils/types';
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from 'react-router-dom';

const WS_URL = 'wss://norma.nomoreparties.space/orders/all';
const variants = {
   visible: (i: number) => ({
     opacity: 1,
     transition: {
       delay: i * 0.15,
     },
   }),
   hidden: { opacity: 0 },
 };
export const formatOrderDate = (dateString: string): string => {
   const date = new Date(dateString);
   const now = new Date();
 
   const formatTime = (date: Date) => {
     return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
   };
   if (now.toDateString() === date.toDateString()) {
     return `Сегодня, ${formatTime(date)}`;
   }
   const yesterday = new Date(now);
   yesterday.setDate(now.getDate() - 1);
 
   if (yesterday.toDateString() === date.toDateString()) {
     return `Вчера, ${formatTime(date)}`;
   }
 
   const differenceInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
 
   if (differenceInDays > 1 && differenceInDays <= 5) {
     return `${differenceInDays} дня назад, ${formatTime(date)}`;
   }
 
   return `${differenceInDays} дней назад, ${formatTime(date)}`;
 };
 

 
export const FeedItemList = ({ 
   feedNumber = "#00000", 
   feedDate = "2021-06-23T14:43:22.587Z", 
   feedTitle = "Никогда не существовавший заказ", 
   feedIngredients = [], feedSubTitle="" }: { 
   feedNumber: string; 
   feedDate: string; 
   feedTitle: string; 
   feedSubTitle: string; 
   feedIngredients: string[] }) =>{
//@ts-ignore
const ingredientData: Ingredient[] = useSelector(store  => store.ingredients.globalIngredients)

const getIngredientImage = (id: string) => {
   const ingredient = ingredientData.find((item: Ingredient) => item._id === id);
   return ingredient ? ingredient.image : backImage;
};

const currentLocation = useLocation()
// /feed/${feedNumber.slice(1)}
return (
   <Link to={`${currentLocation.pathname.includes("profile/orders") ?  `/profile/orders/${feedNumber.slice(1)}` :`/feed/${feedNumber.slice(1)}` }`} state={{ background: currentLocation }}>
   <div className={`${style.feed_order_box} p-6 `}>
       <div className={`${style.feed_order_subtitle_box} `}>
           <h4 className={`${style.feed_order_subtitle_number} text text_type_digits-default`}>{feedNumber}</h4>
           <div className={`${style.feed_order_subtitle_date} text text_type_main-default text_color_inactive`}>{formatOrderDate(feedDate) }</div>
       </div>
       <div className="titles_box">
       <h4 className={`${style.feed_order_title} text text_type_main-medium`}>{feedTitle}</h4>
       {currentLocation.pathname.includes("profile") ? (<p style={{color: `${feedSubTitle === "done" ? "#00CCCC" : "#FFFFFF"}`}} className={`${style.feed_order_subtitle} text text_type_main-small`}>{feedSubTitle === "done" ? "Выполнен" : "Готовится" }</p>) : ""}
       
       </div>
       <div className={style.feed_order_ingredients_box}>
           <ul className={style.feed_order_ingredients}>
               {feedIngredients.map((id, index) => (
                  <li
                  key={index}
                  
                  className={style.feed_order_ingredients_item}
                  style={{ transform: `translateX(${index * -20}%) `,zIndex: `${feedIngredients.length - index}`, display: `${index > 5 && feedIngredients.length > 6 ? "none" : "auto"}` }} 
                >
                       <div className={`${style.feed_order_ingredients_item_border}`}></div>
                       <div className={`${style.feed_order_ingredients_item_image}`}>
                       {index === 5 && feedIngredients.length > 6 ? (
        <span className={`${style.feed_order_ingredients_item_text} text text_type_main-default`}>
          +{feedIngredients.length - 6} 
        </span>
      ) :""
      }
       <img
          style={{ opacity: `${index === 5 && feedIngredients.length > 6 ? ".5" : "1"}` }} 
          src={getIngredientImage(id)}
          alt=""
          className={style.feed_order_ingredient_image}
        />
    </div>
                   </li>
               ))}
           </ul>
           <div className={style.feed_order_price_box}>
           <span className={`${style.feed_order_price_number} text text_type_digits-default`}>
  {feedIngredients.reduce((total, id) => {
    const ingredient = ingredientData.find(item => item._id === id); 
    return total + (ingredient ? ingredient.price : 0); 
  }, 0)}
</span>
               <CurrencyIcon type="primary" />
           </div>
       </div>
   </div>
   </Link>
);

}


interface Order {
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


const FeedTable = ({finishedList = ["Zero"], notfineshedList = ["Zero"], allTimeready = "0", todayReady="0" }:{todayReady:string,allTimeready: string,finishedList:string[] | number[], notfineshedList:string[]| number[]}) =>{
   return <div className={style.feed_table_box}>
      <div className={style.feed_table_cook_box}>
         <ul className={style.feed_table_cook_list}>
            <li className={style.feed_table_cook_list_item}>
               <h3 className={`text text_type_main-medium mb-6 ${style.feed_table_cook_list_item_title}`}>Готовы:</h3>
               <ul className={style.feed_table_cook_list_item_screen}>
                  {finishedList.map((item) =>(  <li className={`text text_type_digits-default mb-2 ${style.feed_table_cook_list_item_screen_item} ${style.feed_table_cook_list_item_screen_item_ready}`}>{item}</li>))}
               </ul>
            </li>
            <li className={style.feed_table_cook_list_item}>
               <h3 className={`text text_type_main-medium mb-6 ${style.feed_table_cook_list_item_title}`}>В работе:</h3>
               <ul className={style.feed_table_cook_list_item_screen}>
               {notfineshedList.map((item) =>(   <li className={`text text_type_digits-default mb-2 ${style.feed_table_cook_list_item_screen_item}`}>{item}</li>))}
               </ul>
            </li>
         </ul>
        <div className={`${style.feed_table_big_title_box}`}>
         <h2 className={`${style.big_subtitle}  text text_type_main-medium `}>Выполнено за все время:</h2>
         <h2 className={`${style.big_title} text text_type_digits-large`}>{allTimeready}</h2>
        </div>
        <div className={`${style.feed_table_big_title_box}`}>
         <h2 className={`${style.big_subtitle } text text_type_main-medium`}>Выполнено за сегодня:</h2>
         <h2 className={`${style.big_title} text text_type_digits-large`}>{todayReady}</h2>
        </div>
      </div>
   </div>
}


//! mainComponent
const FeedPage = () =>{
   const [wsOrder, setWsOrder] = useState<Order[]>()
const [allReady,setAllReady] = useState("")
const [allReadyToday,setAllReadyToday] = useState("")

const finishedFeedsList  = wsOrder ? wsOrder.filter(order => order.status === 'done').map(order => order.number) : ["Zero"];
const notFinishedFeedsList = wsOrder ? wsOrder.filter(order => order.status !== 'done').map(order => order.number) : ["Zero"];
   useEffect(()=>{
      const ws = new WebSocket(WS_URL);
      ws.onopen= () =>{
         console.log("WS OPEN")
      }
      ws.onclose = () =>{
         console.log("WS CLOSE")
      }
      ws.onmessage = (event) =>{
         const data = JSON.parse(event.data);
            if (data.success) {
               setWsOrder(data.orders); 
               setAllReady(data.total)
               setAllReadyToday(data.totalToday)
               // console.log(data.orders.map( (item: {status:string}) => console.log(item.status)))
            }
      }
      ws.onerror = (error) =>{
console.error(error)
      }
      ws.onclose = () => {
         console.log('WebSocket connection closed');
     };
     
     return () => {
      ws.close();
  };
   }, [])

    return (
        <section className='container' >
                <h1 className='text text_type_main-large mt-10 mb-5'>Лента заказов</h1>
         <div className={`${style.feed_container} ${style.custom__scrollbar}`}>
            <ul className={`${style.feed_list} `}>
            {wsOrder && wsOrder.map((order, index) => (
                        <motion.li custom={index}
                        variants={variants}
                         initial="hidden"
                  animate="visible" key={`${index}_${order.number}`} className={style.feed_list_item}>
               
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
           {
            //** Второй элемент экрана
           }
            <FeedTable allTimeready={allReady && allReady} todayReady={allReadyToday && allReadyToday} finishedList={finishedFeedsList} notfineshedList={notFinishedFeedsList}/>
            </div>
        </section>
    )
}

export default FeedPage




