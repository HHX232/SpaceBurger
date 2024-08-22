import React, { useEffect, useState } from "react";
import style from './IngredientPage.module.css';
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import preloader from '../../images/preloader.svg';
import NotFoundPage from "../NotFound/NotFound";
import { openIngredientDetails } from "../../services/actions/ingredient-details-open-action";

const IngredientPage = () => {
    const { id } = useParams();
    const { global_ingredients } = useSelector(state => state.ingredients);
    const [searchParams] = useSearchParams();
    const [isModalOpen, setIsModalOpen] = useState(false); // состояние для управления модальным окном
    const dispatch = useDispatch();

    useEffect(() => {
        const modalIsOpen = searchParams.get("modalIsOpen") === "true" ? true : false;

        if (modalIsOpen) {
            setIsModalOpen(modalIsOpen);
            dispatch(openIngredientDetails({
                isOpen: modalIsOpen,
                cardIndex: id, 
            }));
        } else {
            dispatch(openIngredientDetails({
                isOpen: false,
                cardIndex: id, 
            }));
            setIsModalOpen(!modalIsOpen);
        }
        console.log("isModalOpen", isModalOpen)
    }, [searchParams, id, dispatch, isModalOpen]);

    if (!global_ingredients || global_ingredients.length === 0) {
        return <img style={{ width: 150, height: 150 }} src={preloader} alt="Loading..." />;
    }

    const typeOrder = {
        bun: 1,
        sauce: 2,
        main: 3
    };

    const sortedIngredients = [...global_ingredients].sort((a, b) => {
        return typeOrder[a.type] - typeOrder[b.type];
    });

    const ingredient = sortedIngredients[id];

    if (!ingredient) {
        return <NotFoundPage />;
    }

    if (isModalOpen) {
        const modalIsOpen2 = searchParams.get("modalIsOpen");
        console.log("modalIsOpen2", modalIsOpen2)
        return null; // если модальное окно открыто, не рендерим страницу
    }

    return (
        <div className={`${style.container_ingedient} mt-30`}>
            <h2 className={`${style.ingredient_title} text text_type_main-large`}>{"Детали ингредиента"}</h2>
            <img className={style.ingredient_image} src={ingredient.image_large} alt="" />
            <p className={`${style.ingredient_subtitle} text text_type_main-medium`}>{ingredient.name}</p>
            <ul className={`${style.pfc_list} mb-5`}>
                <li className={`${style.pfc_item} text text_type_main-default text_color_inactive`}>
                    <p className={`${style.pfc_item_title}`}>Калории,ккал</p>
                    <p className={`${style.pfc_item_number}`}>{ingredient.calories}</p>
                </li>
                <li className={`${style.pfc_item} text text_type_main-default text_color_inactive`}>
                    <p className={`${style.pfc_item_title}`}>Белки, г</p>
                    <p className={`${style.pfc_item_number}`}>{ingredient.proteins}</p>
                </li>
                <li className={`${style.pfc_item} text text_type_main-default text_color_inactive`}>
                    <p className={`${style.pfc_item_title}`}>Жиры, г</p>
                    <p className={`${style.pfc_item_number}`}>{ingredient.fat}</p>
                </li>
                <li className={`${style.pfc_item} text text_type_main-default text_color_inactive`}>
                    <p className={`${style.pfc_item_title}`}>Углеводы, г</p>
                    <p className={`${style.pfc_item_number}`}>{ingredient.carbohydrates}</p>
                </li>
            </ul>
        </div>
    );
}

export default IngredientPage;
