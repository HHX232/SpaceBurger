// Modal.jsx
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import style from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Outlet, useNavigate } from "react-router-dom";

function ModalOverlay({ childrenElem, title, onClose, setSearchParams }) {
  const navigate = useNavigate();
  const onClickOverlay = (e) => {
    if (e.target === e.currentTarget) {

      const newSearchParams = new URLSearchParams();
      newSearchParams.set("modalIsOpen", "false");
      onClose();
      navigate({
        pathname: "/",
        search: `?${newSearchParams.toString()}`,
      });
    }
  };
 
  return (
    <div onClick={onClickOverlay} className={style.modalOverlay}>
      <div className={`${style.modal_inner} pl-10 pr-10 pt-10 pb-15`}>
        <div className={style.modal_title_box}>
          <h3 className={`${style.modal_title} text text_type_main-large`}>
            {title}
          </h3>
          <CloseIcon className={style.close_icon} onClick={onClickOverlay} />
        </div>
        <div className={style.modal_content}>
          <div>{childrenElem}</div>
        </div>
      </div>
    </div>
  );
}

ModalOverlay.propTypes = {
  childrenElem: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  setSearchParams: PropTypes.func,
};

function Modal({ title = "", children, onClose, setSearchParams }) {
  const navigate = useNavigate();
  useEffect(() => {
    const handleEsc = (event) => {
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
    if (document.getElementById("modals").childNodes.length > 1) {
      document.getElementById("modals").childNodes.forEach((elem, index) => {
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

  }, [onClose, setSearchParams]);



  return ReactDOM.createPortal(
    <div className={style.modal}>
      {document.getElementById("modals").childNodes.length <= 1 && (
        <ModalOverlay
          title={title}
          childrenElem={children}
          onClose={onClose}
          setSearchParams={setSearchParams}
        ></ModalOverlay>
      )}
    </div>,
    document.getElementById("modals")
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  setSearchParams: PropTypes.func, 
};

export default Modal;
