import React from "react";
import PropTypes from "prop-types";
import Modal from '../Modal/Modal';
import style from './IngredientDetails.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import testImage from '../../images/meat-01.png';
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

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
    calories = "any amount",
    proteins = "any amount",
    fats = "any amount",
    carbohydrates = "any amount",

    cardIndex
  } = ingredientDetailsObject;
// const [a,b] = useSearchParams()
const { global_ingredients } = useSelector((state) => state.ingredients);
if (global_ingredients.length === 0) {
  return ; 
}

const typeOrder = {
  bun: 1,
  sauce: 2,
  main: 3
};

// Сортируем массив по типам
const sortedIngredients = [...global_ingredients].sort((a, b) => {
  return typeOrder[a.type] - typeOrder[b.type];
});
// console.log("sortedIngredients details", sortedIngredients)
const currentIngredient = sortedIngredients[cardIndex]
// console.log(currentIngredient) 
const imageName = getImageNameFromURL(currentIngredient.image_large);

  return (
    <>
      <img src={currentIngredient.image_large || testImage} alt={`${imageName} – ${food_title}`} className={`${style.image} mb-4`} />
      <p className={`${style.modal_text} text text_type_main-medium mb-8`}>{currentIngredient.name || food_title}</p>
      <ul className={`${style.pfc_list} mb-5`}>
        <li className={`${style.pfc_item} text text_type_main-default text_color_inactive`}>
          <p className={`${style.pfc_item_title}`}>Калории,ккал</p>
          <p className={`${style.pfc_item_number}`}>{currentIngredient.calories || calories}</p>
        </li>
        <li className={`${style.pfc_item} text text_type_main-default text_color_inactive`}>
          <p className={`${style.pfc_item_title}`}>Белки, г</p>
          <p className={`${style.pfc_item_number}`}>{currentIngredient.proteins || proteins}</p>
        </li>
        <li className={`${style.pfc_item} text text_type_main-default text_color_inactive`}>
          <p className={`${style.pfc_item_title}`}>Жиры, г</p>
          <p className={`${style.pfc_item_number}`}>{currentIngredient.fat || fats}</p>
        </li>
        <li className={`${style.pfc_item} text text_type_main-default text_color_inactive`}>
          <p className={`${style.pfc_item_title}`}>Углеводы, г</p>
          <p className={`${style.pfc_item_number}`}>{currentIngredient.carbohydrates|| carbohydrates}</p>
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
