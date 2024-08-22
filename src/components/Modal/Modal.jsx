// Modal.jsx
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import style from './Modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from 'react-router-dom';

function ModalOverlay({ children, onClose, setSearchParams }) {
const navigate = useNavigate()
  const onClickOverlay = (e) => {
    if (e.target === e.currentTarget) {
      // setSearchParams({ modalIsOpen: false });
      // navigate("/ingredients")
      const newSearchParams = new URLSearchParams();
      newSearchParams.set('modalIsOpen', 'false');
      onClose();
      navigate({
        pathname: "/ingredients",
        search: `?${newSearchParams.toString()}`,
      });
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
  setSearchParams: PropTypes.func.isRequired, 
};

function Modal({ title = "", children, onClose, setSearchParams }) {
  const navigate = useNavigate()
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        const newSearchParams = new URLSearchParams();
        newSearchParams.set('modalIsOpen', 'false');
        onClose();
        navigate({
          pathname: "/ingredients",
          search: `?${newSearchParams.toString()}`,
        });
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose, setSearchParams]);
  function onClickButton() {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('modalIsOpen', 'false');
    onClose();
    navigate({
      pathname: "/ingredients",
      search: `?${newSearchParams.toString()}`,
    });
  }
  return ReactDOM.createPortal(
    <div className={style.modal}>
      <ModalOverlay onClose={onClose} setSearchParams={setSearchParams}> 
        <div className={`${style.modal_inner} pl-10 pr-10 pt-10 pb-15`}>
          <div className={style.modal_title_box}>
            <h3 className={`${style.modal_title} text text_type_main-large`}>{title}</h3>
            <CloseIcon className={style.close_icon} onClick={onClickButton } />
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
  setSearchParams: PropTypes.func.isRequired, // Добавляем пропс для setSearchParams
};

export default Modal;
