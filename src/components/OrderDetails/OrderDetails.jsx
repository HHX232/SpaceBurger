import React, { useState } from "react";
import PropTypes from "prop-types";
import style from './OrderDetails.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import doneImg from '../../images/graphics.svg';

function OrderDetails({ title = "00000"}) {
  
  return (
    <>
      <div className={`${style.order_content} mt-9`}>
        <h3 className={`${style.title_big} text text_type_digits-large mb-8`}>{title}</h3>
        <p className={`${style.order_subtitle} text text_type_main-medium mb-15`}>идентификатор заказа</p>
        <img className={`${style.done_img} mb-15`} src={doneImg} alt="check mark" />
        <p className={`${style.cooking_text} text text_type_main-default mb-2`}>
           Ваш заказ начали готовить
        </p>
        <p className={`${style.cooking_decor_text} text text_type_main-default text_color_inactive mb-20`}>Дождитесь готовности на орбитальной станции</p>
      </div>
    </>
  );
}

OrderDetails.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
};

export default OrderDetails;
