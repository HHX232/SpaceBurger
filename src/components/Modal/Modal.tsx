// Modal.jsx
import  React, { FC, useEffect } from "react";
import ReactDOM from "react-dom";
import style from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {  useNavigate } from "react-router-dom";


interface ModalOverlayProps<T = React.ReactNode> {
  childrenElem: T;
  title: T;
  onClose: () => void;
}

const ModalOverlay: FC<ModalOverlayProps> = ({ childrenElem, title, onClose }) => {
  const navigate = useNavigate();

  const onClickOverlay = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      const newSearchParams = new URLSearchParams();
      newSearchParams.set('modalIsOpen', 'false');
      onClose();
      navigate({
        pathname: '/',
        search: `?${newSearchParams.toString()}`,
      });
    }
  };

  const handleCloseIconClick = () => {
    onClose();
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('modalIsOpen', 'false');
    navigate({
      pathname: '/',
      search: `?${newSearchParams.toString()}`,
    });
  };

  return (
    <div onClick={onClickOverlay} className={style.modalOverlay}>
      <div className={`${style.modal_inner} pl-10 pr-10 pt-10 pb-15`}>
        <div className={style.modal_title_box}>
          <h3 className={`${style.modal_title} text text_type_main-large`}>
            {title}
          </h3>
          <span className={style.close_icon} onClick={handleCloseIconClick}>
            <CloseIcon type="primary" />
          </span>
        </div>
        <div className={style.modal_content}>
          <div>{childrenElem}</div>
        </div>
      </div>
    </div>
  );
};

interface IModal{
title?: string;
 children: React.ReactNode;
 onClose: () => void;
}


const Modal: FC<IModal> = ({ title = "", children, onClose }) =>{
  const navigate = useNavigate();
  const modalRoot = document.getElementById("modals");
  
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const newSearchParams = new URLSearchParams();
        newSearchParams.set("modalIsOpen", "false");
        onClose();
        navigate({
          pathname: "/",
          search: `?${newSearchParams.toString()}`,
        });
      }
    };
    
    // Если уже есть открытые модалки, то удаляем их
    if (modalRoot != null && modalRoot.childNodes.length > 1) {
      modalRoot.childNodes.forEach((elem, index) => {
        if (index !== 0) {
          elem.remove();
        }
      });
      return;
    }
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };

  }, [onClose]);

  if (!modalRoot) {
    return null; // Don't render anything if modalRoot is null
  }
  return ReactDOM.createPortal(
    <div className={style.modal}>
      {modalRoot && modalRoot.childNodes.length <= 1 && (
        <ModalOverlay
          title={title}
          childrenElem={children}
          onClose={onClose}

        ></ModalOverlay>
      )}
    </div>,
   modalRoot
  );
}


export default Modal;
