
import PropTypes from 'prop-types';
const IngredientType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
});
export  default IngredientType
