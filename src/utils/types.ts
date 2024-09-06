interface Ingredient {
  _id: string;
  text: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  isOpen?:boolean| string | null
}

export default Ingredient;
