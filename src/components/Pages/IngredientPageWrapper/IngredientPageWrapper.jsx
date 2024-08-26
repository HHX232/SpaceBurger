import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import IngredientPage from '../Pages/IngredientPage/IngredientPage';
import Modal from '../Modal/Modal';

function IngredientPageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const modalIsOpen = searchParams.get('modalIsOpen') === 'true';
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setSearchParams({ modalIsOpen: 'false' });
    navigate('/ingredients'); 
  };

  if (modalIsOpen) {
    return (
      <Modal onClose={handleCloseModal} setSearchParams={setSearchParams}>
        <IngredientPage />
      </Modal>
    );
  } else {
    return <IngredientPage />;
  }
}

export default IngredientPageWrapper;
