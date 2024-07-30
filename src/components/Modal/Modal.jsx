import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import style from './Modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function ModalOverlay({ children, onClose }) {
  const onClickOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div onClick={onClickOverlay} className={style.modalOverlay}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

function Modal({ title = "", children, onClose }) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className={style.modal}>
      <ModalOverlay onClose={onClose}>
        <div className={`${style.modal_inner} pl-10 pr-10 pt-10 pb-15`}>
          <div className={style.modal_title_box}>
            <h3 className={`${style.modal_title} text text_type_main-large`}>{title}</h3>
            <CloseIcon className={style.close_icon} onClick={onClose} />
          </div>
          <div className={style.modal_content}>
            {children}
          </div>
        </div>
      </ModalOverlay>
    </div>,
    document.getElementById('modals')
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
