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
const gotPantry = pantry => ({
  type: GOT_PANTRY,
  pantry,
});
const addedToPantry = ingredient => ({
  type: ADDED_TO_PANTRY,
  ingredient,
});
const deletedFromPantry = ingredient => ({
  type: DELETED_FROM_PANTRY,
  ingredient,
});

export const settingIngredientsList = (ingredients, uid) => async dispatch => {
  try {
    const currentUserInfo = await userInfo(uid);
    currentUserInfo.pantry = ingredients;
    await firestore
      .collection('User')
      .doc(uid)
      .set(currentUserInfo);
    dispatch(setIngredientsList(ingredients));
  } catch (error) {
    console.error(error);
  }
};

export const fetchPantry = uid => async dispatch => {
  try {
    const pantry = await userInfo(uid);
    if (!pantry) {
      pantry = [];
    }
    dispatch(gotPantry(pantry.pantry));
  } catch (error) {
    console.error(error);
  }
};

export const addToPantry = (ingredient, uid) => async dispatch => {
  try {
    const currentUserInfo = await userInfo(uid);
    currentUserInfo.pantry.push(ingredient);
    await firestore
      .collection('User')
      .doc(uid)
      .set(currentUserInfo);
    dispatch(addedToPantry(ingredient));
  } catch (error) {
    console.error(error);
  }
};

export const deleteFromPantry = (ingredient, uid) => async dispatch => {
  try {
    const currentUserInfo = await userInfo(uid);
    currentUserInfo.pantry = currentUserInfo.pantry.filter(
      item => item !== ingredient
    );
    await firestore
      .collection('User')
      .doc(uid)
      .set(currentUserInfo);
    dispatch(deletedFromPantry(ingredient));
  } catch (error) {
    console.error(error);
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_INGREDIENTS_LIST:
      return { ...state, pantry: [...state.pantry].concat(action.pantry) };
    case GOT_PANTRY:
      return { pantry: action.pantry };
    case ADDED_TO_PANTRY:
      return { pantry: [...state.pantry, action.ingredient] };
    case DELETED_FROM_PANTRY:
      return {
        pantry: [...state.pantry].filter(item => item !== action.ingredient),
      };
    case ADDED_TO_RECIPE_INGREDIENTS:
      return {
        ...state,
        recipeIngredients: [
          ...state.recipeIngredients,
          action.recipeIngredients,
        ],
      };
    default:
      return state;
  }
}
