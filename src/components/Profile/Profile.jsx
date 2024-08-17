import React, {useState} from "react";
import style from './Profile.module.css'
import { Link } from "react-router-dom";
import { PasswordInput, EmailInput, Input, EditIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
const Profile = () => {
   const [value, setValue] = useState('bob@example.com')
   const [value2, setValue2] = useState('bob@example.com')

  const onChange = e => {
    setValue(e.target.value)
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
            <EmailInput
        onChange={onChange}
        value={value}
        name={'text'}
        placeholder="Имя"
        isIcon={true}
        extraClass="mb-6"
      />
            </li>
            <li className={`${style.inputs_list_item}`}>
            <EmailInput
        onChange={onChange}
        value={value}
        name={'mail'}
        placeholder="Логин"
        isIcon={true}
        extraClass="mb-6"
      />
            </li>
            <li className={`${style.inputs_list_item}`}>
            <PasswordInput
        onChange={onChange}
        value={value}
        name={'password'}
        icon="EditIcon"
        
      />
            </li>
         </ul>
      </div>
   </section>
}

export default Profile