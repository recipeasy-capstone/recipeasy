import { userInfo } from '../utils/firebaseFunc';
import { firestore } from '../firebaseconfig';

const SET_INGREDIENTS_LIST = 'SET_INGREDIENTS_LIST';
const GOT_PANTRY = 'GOT_PANTRY';
const ADDED_TO_PANTRY = 'ADDED_TO_PANTRY';
const DELETED_FROM_PANTRY = 'DELETED_FROM_PANTRY';
const ADDED_TO_RECIPE_INGREDIENTS = 'ADDED_TO_RECIPE_INGREDIENTS';

const initialState = {
  filteredIngredientList: [],
  pantry: [],
  recipeIngredients: [],
};

const setIngredientsList = pantry => ({
  type: SET_INGREDIENTS_LIST,
  pantry,
});
const gotPantry = pantry => ({ type: GOT_PANTRY, pantry });
const addedToPantry = ingredient => ({ type: ADDED_TO_PANTRY, ingredient });
const deletedFromPantry = ingredient => ({
  type: DELETED_FROM_PANTRY,
  ingredient,
});
const addedToRecipeIngredients = recipeIngredients => ({
  type: ADDED_TO_RECIPE_INGREDIENTS,
  recipeIngredients,
});

export const settingIngredientsList = (ingredients, userId) => async dispatch => {
  try {
    const currentUserInfo = await userInfo(userId)
    currentUserInfo.pantry = ingredients
    await firestore.collection('User').doc(userId).set(currentUserInfo)
    dispatch(setIngredientsList(ingredients));
  } catch (error) {
    console.error(error);
  }
};

export const fetchPantry = userId => async dispatch => {
  try {
    const data = userInfo(userId);
    const pantry = data.pantry;
    dispatch(gotPantry(pantry));
  } catch (error) {
    console.error(error);
  }
};

export const addToPantry = (ingredient, userId) => async dispatch => {
  try {
    await firestore
      .collection('User')
      .doc(userId)
      .update({
        pantry: firestore.FieldValue.arrayUnion(ingredient),
      });
    dispatch(addedToPantry(ingredient));
  } catch (error) {
    console.error(error);
  }
};

export const deleteFromPantry = (ingredient, userId) => async dispatch => {
  try {
    const pantry = await firestore
      .collection('User')
      .doc(userId)
      .get({
        pantry,
      });
    dispatch(deletedFromPantry(ingredient));
  } catch (error) {
    console.error(error);
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_INGREDIENTS_LIST:
      return {...state, pantry: [...state.pantry].concat(action.pantry)};
    case GOT_PANTRY:
      return {...state, pantry: [...state.pantry]};
    case ADDED_TO_PANTRY:
      return {...state, pantry: [...state.pantry, action.ingredient]};
    case DELETED_FROM_PANTRY:
      return {...state, pantry: [...state.pantry]};
    case ADDED_TO_RECIPE_INGREDIENTS:
      return {...state, recipeIngredients: [...state.recipeIngredients, action.recipeIngredients]};
    default:
      return state;
  }
}
