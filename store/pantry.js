import axios from "axios";
import { fsdetectTexts, fsdetectLabel } from "../secrets/fireFunctions";
// import autocompleteFunc from '../utils/autocompleteFunc'
import { userInfo } from "../utils/firebaseFunc";
import { firestore } from "../firebaseconfig";
// import admin from "firebase-admin";

const GOT_INGREDIENTS_LIST = "GOT_INGREDIENTS_LIST";
const GOT_PANTRY = "GOT_PANTRY";
const ADDED_TO_PANTRY = "ADDED_TO_PANTRY";
const DELETED_FROM_PANTRY = "DELETED_FROM_PANTRY";

const initialState = {
  filteredIngredientList: [],
  pantry: []
};

const gotIngredientsList = filteredIngredientList => ({
  type: GOT_INGREDIENTS_LIST,
  filteredIngredientList
});
const gotPantry = pantry => ({ type: GOT_PANTRY, pantry });
const addedToPantry = ingredient => ({ type: ADDED_TO_PANTRY, ingredient });
const deletedFromPantry = ingredient => ({
  type: DELETED_FROM_PANTRY,
  ingredient
});

export const fetchIngredientsList = imageURI => async dispatch => {
  try {
    const { isLabel } = await axios.post(fsdetectLabel, imageURI);
    console.log("ISLABEL", isLabel);
    if (isLabel) {
      const { data } = await axios.post(fsdetectTexts, imageURI);
      // const words = autocompleteFunc(data)
      console.log("DATA in store\n\n", data);
      dispatch(gotIngredientsList(data));
    }
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
      .collection("User")
      .doc(userId)
      .update({
        pantry: firebase.firestore.FieldValue.arrayUnion(ingredient)
      });
    dispatch(addedToPantry(ingredient));
  } catch (error) {
    console.error(error);
  }
};

export const deleteFromPantry = (ingredient, userId) => async dispatch => {
  try {
    const pantry = await firestore
      .collection("User")
      .doc(userId)
      .get({
        pantry
      });
    dispatch(deletedFromPantry(ingredient));
  } catch (error) {
    console.error(error);
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_INGREDIENTS_LIST:
      return [...pantry].concat(action.filteredIngredientList);
    case GOT_PANTRY:
      return [...pantry];
    case ADDED_TO_PANTRY:
      return [...pantry, action.ingredient];
    case DELETED_FROM_PANTRY:
      return [...pantry];
    default:
      return state;
  }
}
