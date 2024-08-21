import React from "react";
import PropTypes from "prop-types";
import Modal from '../Modal/Modal';
import style from './IngredientDetails.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import testImage from '../../images/meat-01.png';

function getImageNameFromURL(url) {
  const parts = url.split('/');
  const filename = parts[parts.length - 1];
  const imageName = filename.split('.')[0]; 
  return imageName;
}
   
function IngredientDetails({ ingredientDetailsObject }) {
  const {
    image = testImage,
    food_title = "Что-то внеземное и внекосмическое",
    calories = 0,
    proteins = 0,
    fats = 0,
    carbohydrates = 0
  } = ingredientDetailsObject;

  const imageName = getImageNameFromURL(image);

  return (
    <>
      <img src={image} alt={`${imageName} – ${food_title}`} className={`${style.image} mb-4`} />
      <p className={`${style.modal_text} text text_type_main-medium mb-8`}>{food_title}</p>
      <ul className={`${style.pfc_list} mb-5`}>
        <li className={`${style.pfc_item} text text_type_main-default text_color_inactive`}>
          <p className={`${style.pfc_item_title}`}>Калории,ккал</p>
          <p className={`${style.pfc_item_number}`}>{calories.toString()}</p>
        </li>
        <li className={`${style.pfc_item} text text_type_main-default text_color_inactive`}>
          <p className={`${style.pfc_item_title}`}>Белки, г</p>
          <p className={`${style.pfc_item_number}`}>{proteins.toString()}</p>
        </li>
        <li className={`${style.pfc_item} text text_type_main-default text_color_inactive`}>
          <p className={`${style.pfc_item_title}`}>Жиры, г</p>
          <p className={`${style.pfc_item_number}`}>{fats.toString()}</p>
        </li>
        <li className={`${style.pfc_item} text text_type_main-default text_color_inactive`}>
          <p className={`${style.pfc_item_title}`}>Углеводы, г</p>
          <p className={`${style.pfc_item_number}`}>{carbohydrates.toString()}</p>
        </li>
      </ul>
    </>
  );
}

IngredientDetails.propTypes = {
  ingredientDetailsObject: PropTypes.shape({
    image: PropTypes.string,
    food_title: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fats: PropTypes.number,
    carbohydrates: PropTypes.number,
  }).isRequired,
};

export default IngredientDetails;
