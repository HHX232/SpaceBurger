import PropTypes from "prop-types";
import  React, { FC, useEffect } from "react";
import style from './IngredientDetails.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import testImage from '../../images/meat-01.png';
import { useSelector } from "react-redux";

function getImageNameFromURL(url:string) {
  const parts = url.split('/');
  const filename = parts[parts.length - 1];
  const imageName = filename.split('.')[0]; 
  return imageName;
}

  interface IIngredientDetails{
    ingredientDetailsObject:{
      image?: string;
      food_title?: string;
      calories?: string | number;
      proteins?: string | number;
      fats?: string | number;
      carbohydrates?: string | number;
      cardIndex:number;
    }
  }
  
  interface Ingredient {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    __v: number;
    _id: string;
  }
  interface IngredientsState {
    globalIngredients: Ingredient[];
  }  
  interface RootState {
    ingredients: IngredientsState;
  }

const IngredientDetails: FC<IIngredientDetails>  = ({ ingredientDetailsObject }) =>{
  const {
    image = testImage,
    food_title = "Что-то внеземное и внекосмическое",
    calories = "any amount",
    proteins = "any amount",
    fats = "any amount",
    carbohydrates = "any amount",
    cardIndex
  } = ingredientDetailsObject;

const globalIngredients  = useSelector((state: RootState) => state.ingredients.globalIngredients);
if (globalIngredients.length === 0) {
  return null 
}
console.log(globalIngredients)

const typeOrder:Record<string, number> = {
  bun: 1,
  sauce: 2,
  main: 3
};


const sortedIngredients = [...globalIngredients].sort((a, b) => {
  return typeOrder[a.type] - typeOrder[b.type];
});
const currentIngredient = sortedIngredients[cardIndex]
const imageName = getImageNameFromURL(currentIngredient.image_large);

  return (
    <div  >
      <img  src={currentIngredient.image_large || testImage} alt={`${imageName} – ${food_title}`} className={`${style.image} mb-4`} />
      <p data-testid="testid-ingerdient-title-name" className={`${style.modal_text} text text_type_main-medium mb-8`}>{currentIngredient.name || food_title}</p>
      <ul className={`${style.pfc_list} mb-5`}>
        <li className={`${style.pfc_item} text text_type_main-default text_color_inactive`}>
          <p  className={`${style.pfc_item_title}`}>Калории,ккал</p>
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
    </div>
  );
}


export default IngredientDetails;
