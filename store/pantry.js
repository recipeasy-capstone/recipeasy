import axios from 'axios';
import { fsdetectTexts, fsdetectLabel } from '../secrets/fireFunctions';
// import autocompleteFunc from '../utils/autocompleteFunc'
import { userInfo } from '../utils/firebaseFunc';
import { firestore } from '../firebaseconfig';
// import admin from "firebase-admin";

const GOT_INGREDIENTS_LIST = 'GOT_INGREDIENTS_LIST';
const GOT_PANTRY = 'GOT_PANTRY';
const ADDED_TO_PANTRY = 'ADDED_TO_PANTRY';
const DELETED_FROM_PANTRY = 'DELETED_FROM_PANTRY';
const ADDED_TO_RECIPE_INGREDIENTS = 'ADDED_TO_RECIPE_INGREDIENTS';

const initialState = {
  filteredIngredientList: [],
  pantry: [],
  recipeIngredients: [],
};

const gotIngredientsList = filteredIngredientList => ({
  type: GOT_INGREDIENTS_LIST,
  filteredIngredientList,
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

export const fetchIngredientsList = ingredients => dispatch => {
  try {
    dispatch(gotIngredientsList(ingredients));
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
        pantry: firebase.firestore.FieldValue.arrayUnion(ingredient),
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
    case GOT_INGREDIENTS_LIST:
      return {...state, pantry: [...state.pantry].concat(action.filteredIngredientList)};
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
