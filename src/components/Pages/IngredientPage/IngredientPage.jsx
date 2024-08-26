import style from "./IngredientPage.module.css";
import {  useParams, useSearchParams } from "react-router-dom";
import {  useSelector } from "react-redux";
import preloader from "../../../images/preloader.svg";

const IngredientPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const  globalIngredients  = useSelector((state) => state.ingredients.globalIngredients);
  const isModalClosed = searchParams.get("modalIsOpen") === "false";
  const ingredient = globalIngredients.find(
    (ingr) => ingr._id === id
  );


  if (!ingredient) {
    return (
      <img
      style={{ width: "80px", height: "80px" }}
        src={preloader}
        alt="Loading..."
        
      />
    );
  }

 

  return (
    <div className={`${style.container_ingedient}`} style={{ marginTop: isModalClosed ? "120px" : "initial" }}>
      <h2 className={`${style.ingredient_title} text text_type_main-large`}>
        {"Детали ингредиента"}
      </h2>
      <img
        className={style.ingredient_image}
        src={ingredient.image_large}
        alt=""
      />
      <p className={`${style.ingredient_subtitle} text text_type_main-medium`}>
        {ingredient.name}
      </p>
      <ul className={`${style.pfc_list} mb-5`}>
        <li
          className={`${style.pfc_item} text text_type_main-default text_color_inactive`}
        >
          <p className={`${style.pfc_item_title}`}>Калории,ккал</p>
          <p className={`${style.pfc_item_number}`}>{ingredient.calories}</p>
        </li>
        <li
          className={`${style.pfc_item} text text_type_main-default text_color_inactive`}
        >
          <p className={`${style.pfc_item_title}`}>Белки, г</p>
          <p className={`${style.pfc_item_number}`}>{ingredient.proteins}</p>
        </li>
        <li
          className={`${style.pfc_item} text text_type_main-default text_color_inactive`}
        >
          <p className={`${style.pfc_item_title}`}>Жиры, г</p>
          <p className={`${style.pfc_item_number}`}>{ingredient.fat}</p>
        </li>
        <li
          className={`${style.pfc_item} text text_type_main-default text_color_inactive`}
        >
          <p className={`${style.pfc_item_title}`}>Углеводы, г</p>
          <p className={`${style.pfc_item_number}`}>
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default IngredientPage;
