import React, {useEffect, useState} from "react";
import style from './Profile.module.css'
import { Link } from "react-router-dom";
import { PasswordInput, EmailInput, Input, EditIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { getCookie, updateAccessToken } from "../../services/actions/register-action";
import { request } from "../../utils/responses";
import { useDispatch, useSelector } from "react-redux";


const Profile = () => {
   const [profileUserData, setUserData] = useState({name: "yourName", email: "yourEmail@gmail.com2", password: "Numbers12$$" })
   const [startInputsValue, setStartInputsValue] = useState({name: "yourName", email: "yourEmail@gmail.com2", password: "Numbers12$$"})
   const [boolUserAccess, setBoolUserAccess] = useState(false)

   const dispatch = useDispatch()
   const refreshToken = getCookie('refreshToken');
   const accessTokenFromStore = useSelector(store => store.register.accessToken);
   const accessToken = accessTokenFromStore.split(' ')[1]
   // console.log("accessTokenFromStore: ", accessTokenFromStore)
   // console.log("accessToken: ", accessToken)

   const getUserInfoFromApi = async () =>{
      console.log("refreshToken",refreshToken)
      if(!boolUserAccess){
   
         try{ 
            await updateAccessToken(refreshToken)
            setBoolUserAccess(true)}catch(error){
               console.error("some message", error)
            }
        
      }
      if(boolUserAccess){}
     const data =  await request("auth/user", {
         method: 'GET',
         headers: {
           'Authorization': `Bearer ${accessToken}`,
         },
       })
       const {success, user} = data
       setUserData({...profileUserData, name: user.name, email: user.email})
   }
   

   useEffect(()=>{
      const reloadAccessToken = async () =>{
         await dispatch(updateAccessToken(refreshToken)) 
      }
      reloadAccessToken()
      getUserInfoFromApi()
      setStartInputsValue({...profileUserData})
   }, [])
   
   
     const onChange = e => {
      setUserData({...profileUserData, [e.target.name]: e.target.value})
     }
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
               <Link className="text text_type_main-medium text_color_inactive" to="profile">Выход</Link>
            </li>
            <li className={`${style.profile_links_text} text-secondary`}>
             <p className="text text_type_main-small">В этом разделе вы можете <br />
             изменить свои персональные данные</p>
            </li>

         </ul>
         <ul className={`${style.inputs_list}`}>
            <li className={`${style.inputs_list_item}`}>
            <PasswordInput
        onChange={onChange}
        value={profileUserData.name}
        name={'name'}
        placeholder="Имя"
      //   isIcon={true}
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
      //   isIcon={true}
        extraClass="mb-6"
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
         </ul>
      </div>
   </section>
}

export default Profile