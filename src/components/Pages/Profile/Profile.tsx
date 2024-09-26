import React, { useEffect, useState } from "react";
import style from './Profile.module.css';
import { Link, Routes, useLocation } from "react-router-dom";
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getCookie, checkAndUpdateAccessToken, logout, updateToken } from "../../../services/actions/register-action";
import { request } from "../../../utils/responses";
import { useSelector } from "react-redux";
import { FeedItemList } from "../Feed/Feed";

interface Order {
   ingredients: string[];
   _id: string;
   status: 'done' | 'created' | 'pending'; // Status type
   number: number;
   createdAt: string;
   updatedAt: string;
   name?:string 
 }

// ProfileInputs Component
interface ProfileInputsProps {
   profileUserData: { name: string; email: string; password: string };
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   boolNewData: boolean;
   onSaveChanges: () => void;
   onCancelChanges: () => void;
}

const ProfileInputs: React.FC<ProfileInputsProps> = ({ profileUserData, onChange, boolNewData, onSaveChanges, onCancelChanges }) => {
   return (
      <ul className={`${style.inputs_list}`}>
         <li className={`${style.inputs_list_item}`}>
            <Input
               onChange={onChange}
               value={profileUserData.name}
               name={'name'}
               placeholder="Имя"
               extraClass="mb-6"
               icon="EditIcon"
            />
         </li>
         <li className={`${style.inputs_list_item}`}>
            <EmailInput
               onChange={onChange}
               value={profileUserData.email}
               name={'email'}
               placeholder="Логин"
               extraClass="mb-6"
               // @ts-ignore
               icon="EditIcon"
            />
         </li>
         <li className={`${style.inputs_list_item}`}>
            <PasswordInput
               onChange={onChange}
               value={profileUserData.password}
               name={'password'}
               icon="EditIcon"
            />
         </li>
         {boolNewData && (
            <li className={`${style.inputs_list_item} mt-2`}>
               <p className={`${style.submit_data} text text_type_main-default`}>
                  Хотите сохранить изменения?
               </p>
               <div className={`${style.button_box}`}>
                  <Button htmlType="button" type="primary" size="medium" onClick={onSaveChanges}>
                     Сохранить
                  </Button>
                  <Button htmlType="button" type="secondary" size="large" onClick={onCancelChanges}>
                     Отменить
                  </Button>
               </div>
            </li>
         )}
      </ul>
   );
};

// Profile Component
const Profile = () => {
   const [profileUserData, setUserData] = useState({ name: "", email: "", password: "Are you want create new password?" });
   const [startInputsValue, setStartInputsValue] = useState({ name: "", email: "", password: "Are you want create new password?" });
   const [boolUserAccess, setBoolUserAccess] = useState(false);
   const [boolNewData, setBoolNewData] = useState(false);
   const [orders, setOrders] = useState<Order[]>([])
   const accessTokenFromCookie = getCookie('accessToken');
   const accessToken = accessTokenFromCookie ? accessTokenFromCookie.replace('Bearer%20', '') : "";
   const location = useLocation()
   const allIngredients = useSelector((state:any) => state.ingredients.globalIngredients);
   const getUserInfoFromApi = async () => {
      if (!boolUserAccess) {
         try {
            await checkAndUpdateAccessToken();
            setBoolUserAccess(true);
         } catch (error) {
            console.error("some message", error);
         }
      }
      try {
         const data: { success: boolean; user: { name: string, email: string } } = await request("auth/user", {
            method: 'GET',
            headers: {
               'Authorization': `Bearer ${accessToken}`,
            },
         });
         const { success, user } = data;
         setUserData({ ...profileUserData, name: user.name, email: user.email });
      } catch (error) {
         alert("Попробуйте войти в аккаунт заново");
         console.error("ошибка access токена", error);
      }
   };

   useEffect(() => {
      getUserInfoFromApi();
      setStartInputsValue({ ...profileUserData });
   }, []);

      useEffect( () =>{    
      const wsAccessTokenWithBear = getCookie('accessToken');
      const wsAccessToken = wsAccessTokenWithBear ? wsAccessTokenWithBear.replace('Bearer%20', '') : "";
         const ws = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${wsAccessToken}`)
         if(!ws){console.error("WS not defined")}
         ws.onopen = () => {
            console.log("WS OPEN")
         }
         ws.onmessage = (event) =>{
          const newData = JSON.parse(event.data)
          setOrders(newData.orders)
         }
         ws.onclose = () => {
            console.log("WS CLOSE")
         }
         ws.onerror = (error) => {
            console.error("WS error", error)
         }
         return () => {
            ws.close()
          }
      }, [])

      // useEffect(() => {
      //    const connectWebSocket = async () => {
      //      // Вызов асинхронной функции обновления токена
      //      await updateToken();
       
      //      // Получение токена после обновления
      //      const wsAccessTokenWithBear = getCookie('accessToken');
      //      const wsAccessToken = wsAccessTokenWithBear ? wsAccessTokenWithBear.replace('Bearer%20', '') : "";
       
      //      // Создание соединения WebSocket
      //      const ws = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${wsAccessToken}`);
       
      //      if (!ws) {
      //        console.error("WS not defined");
      //        return;
      //      }
       
      //      ws.onopen = () => {
      //        console.log("WS OPEN");
      //      };
       
      //      ws.onmessage = (event) => {
      //        const newData = JSON.parse(event.data);
      //        console.log(newData);
      //      };
       
      //      ws.onclose = () => {
      //        console.log("WS CLOSE");
      //      };
       
      //      ws.onerror = (error) => {
      //        console.error("WS error", error);
      //      };
       
      //      // Очистка соединения при размонтировании компонента
      //      return () => {
      //        ws.close();
      //      };
      //    };
       
      //    // Вызов асинхронной функции
      //    connectWebSocket();
      //  }, []);
       
   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserData({ ...profileUserData, [e.target.name]: e.target.value });
      setBoolNewData(true);
   };
 
   const onSaveChanges = async () => {
      const payload = {
         name: profileUserData.name,
         email: profileUserData.email,
         password: profileUserData.password !== startInputsValue.password ? profileUserData.password : ''
      };

      try {
         const data: { success: boolean; user: { name: string; email: string; } } = await request("auth/user", {
            method: 'PATCH',
            headers: {
               'Authorization': `Bearer ${accessToken}`,
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
         });

         const { success, user } = data;
         if (success) {
            setStartInputsValue({ ...profileUserData, name: user.name, email: user.email });
            setUserData({ ...profileUserData, name: user.name, email: user.email });
            setBoolNewData(false);
         }
      } catch (error) {
         console.error("Error saving changes:", error);
      }
   };

   const onCancelChanges = () => {
      setUserData({ ...startInputsValue });
      setBoolNewData(false);
   };


   return (
      <section className={`container`}>
         <form className={`container pt-30`} onSubmit={(e) => { e.preventDefault(); onSaveChanges(); }}>
            <div className={`${style.profile_content}`}>
               <ul className={`${style.profile_links}`}>
                  <li className={`${style.profile_links_item}`}>
                     <Link className={`text text_type_main-medium ${location.pathname.includes("orders") ?  "text_color_inactive" : "" } `} to="/profile">Профиль</Link>
                  </li>
                  <li className={`${style.profile_links_item}`}>
                     <Link className={`text text_type_main-medium  ${location.pathname.includes("orders") ? "" : "text_color_inactive"}`} to="/profile/orders">История заказов</Link>
                  </li>
                  <li className={`${style.profile_links_item}`}>
                     <Link onClick={() => { logout(); }} className="text text_type_main-medium text_color_inactive" to="/">Выход</Link>
                  </li>
                  <li className={`${style.profile_links_text} text-secondary`}>
                     <p className="text text_type_main-small">
                        В этом разделе вы можете <br />
                        изменить свои персональные данные
                     </p>
                  </li>
               </ul>
               
        {location.pathname.includes("profile/orders") ? 
        <ul className={`${style.orders_list}`}>
        {orders.map((item,index)=>{
         return <li key={index}> <FeedItemList feedDate={item.createdAt} feedNumber={`#${item.number.toString()}`} feedSubTitle={item.status} feedTitle={(item.name) as any} feedIngredients={item.ingredients}/></li>
        })}
        </ul> : <ProfileInputs
                  profileUserData={profileUserData}
                  onChange={onChange}
                  boolNewData={boolNewData}
                  onSaveChanges={onSaveChanges}
                  onCancelChanges={onCancelChanges}
               />}
              
         
            </div>
         </form>
      </section>
   );
};

export default Profile;
