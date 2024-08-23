import React, {useEffect, useState} from "react";
import style from './Profile.module.css'
import { Link } from "react-router-dom";
import { PasswordInput, EmailInput, Input,  Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { getCookie, checkAndUpdateAccessToken, logout } from "../../../services/actions/register-action";
import { request } from "../../../utils/responses";



const Profile = () => {
   const [profileUserData, setUserData] = useState({name: "", email: "", password: "Are you want create new password?" })
   const [startInputsValue, setStartInputsValue] = useState({name: "", email: "", password: "Are you want create new password?"})
   const [boolUserAccess, setBoolUserAccess] = useState(false);
   const [boolNewData, setBoolNewData] = useState(false);

   const accessTokenFromCookie = getCookie('accessToken')
 

   const accessToken = accessTokenFromCookie ? accessTokenFromCookie.replace('Bearer%20', '') : "";
   const getUserInfoFromApi = async () =>{

      if(!boolUserAccess){ 
         try{ 
            await checkAndUpdateAccessToken()
            setBoolUserAccess(true)
         }catch(error){
               console.error("some message", error)
            }
        
      }
try{
     const data =  await request("auth/user", {
         method: 'GET',
         headers: {
           'Authorization': `Bearer ${accessToken}`,
         },
       })

       const {success, user} = data
       setUserData({...profileUserData, name: user.name, email: user.email})
      }catch(error){
         alert("Попробуйте войти в аккаунт заново")
         console.error("ошибка access токена", error)
      }
   }
   

   useEffect(()=>{
      getUserInfoFromApi()
      setStartInputsValue({...profileUserData})
   }, [])
   
   
   const onChange = e => {
      setUserData({ ...profileUserData, [e.target.name]: e.target.value });
      setBoolNewData(true); // Показать кнопки сохранения
   };

   const onSaveChanges = async () => {
      const payload = {
         name: profileUserData.name,
         email: profileUserData.email,
         password: profileUserData.password !== startInputsValue.password ? profileUserData.password : '' 
      };

      try {
         const data = await request("auth/user", {
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
      setUserData({ ...startInputsValue }); // Восстановление начальных значений
      setBoolNewData(false);
   };

   return <section className={`container pt-30`}>
      <div className={`${style.profile_content}`}>
         <ul className={`${style.profile_links}  `}>
            <li className={`${style.profile_links_item}`}>
               <Link className="text text_type_main-medium" to="profile">Профиль</Link>
            </li>
            <li className={`${style.profile_links_item} `}>
               <Link className="text text_type_main-medium text_color_inactive" to="profile">История заказов</Link>
            </li>
            <li className={`${style.profile_links_item}`}>
               <Link onClick={e =>{
               
                  logout()
               }} className="text text_type_main-medium text_color_inactive" to="/">Выход</Link>
            </li>
            <li className={`${style.profile_links_text} text-secondary`}>
             <p className="text text_type_main-small">В этом разделе вы можете <br />
             изменить свои персональные данные</p>
            </li>

         </ul>
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
        extraClass="mb-6 "
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
            {boolNewData ? <li className={`${style.inputs_list_item} mt-2`}>
               <p className={`${style.submit_data} text text_type_main-default `}>Хотите сохранить изменения?</p>
               <div className={`${style.button_box}`}>
               <Button htmlType="button" type="primary" size="medium" onClick={onSaveChanges}>
Сохранить
</Button>
<Button htmlType="button" type="secondary" size="large" onClick={onCancelChanges}>
Отменить
</Button>
</div>
            </li> : ""}
            
         </ul>
      </div>
   </section>
}

export default Profile