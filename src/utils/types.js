import PropTypes from 'prop-types';

const IngredientType = PropTypes.shape({
  originalId: PropTypes.string.isRequired,
  generatedId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});

export default IngredientType;
