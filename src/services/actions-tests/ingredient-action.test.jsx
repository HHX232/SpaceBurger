import {thunk} from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import { TAKE_INGREDIENTS_PROGRESS, TAKE_INGREDIENTS_SUCCESS, takeIngredients, TAKE_INGREDIENTS_ERROR} from '../actions/ingredient-action';

const ingredient = {
  _id: "1234567890",
  text: "Chicken Breast",
  proteins: 35,
  fat: 10,
  carbohydrates: 0,
  calories: 165,
  price: 250,
  image: "https://example.com/chicken-breast.jpg",
  image_mobile: "https://example.com/chicken-breast-mobile.jpg",
  image_large: "https://example.com/chicken-breast-large.jpg",
  __v: 0,
  name: "Chicken Breast",
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async ingredients action", () => {
  afterEach(() => {
    fetchMock.restore(); 
  });
 
  it("successfully takes ingredients in progress", () => {
    fetchMock.getOnce('https://norma.nomoreparties.space/api/ingredients', {
      body: { data: [ingredient, ingredient], success: true },
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { type: TAKE_INGREDIENTS_PROGRESS },
      { type: TAKE_INGREDIENTS_SUCCESS, ingredients: [ingredient, ingredient] },
      {type:TAKE_INGREDIENTS_ERROR}
    ];

    const store = mockStore({ globalIngredients: [] });

    
  store.dispatch(takeIngredients());
  
  setTimeout(() => {
   expect(store.getActions()).toEqual(expectedActions);
 }, 0);
 
  });
});
