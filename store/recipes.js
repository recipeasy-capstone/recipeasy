<<<<<<< HEAD
import fireData from "../utils/firebaseFunc";
import axios from "axios";
import { fsGetRecipes } from "../secrets/fireFunctions";
=======
import axios from "axios";
import userInfo from '../utils/firebaseFunc'
import { fsGetRecipes } from "../secrets/fireFunctions"
>>>>>>> 0c2e6b69b4af8c81676210b43015575c403c023d

const GOT_ALL_RECIPES = "GOT_ALL_RECIPES";
const GOT_NEW_RECIPES = "GOT_NEW_RECIPES";
const ADD_STAR_RECIPE = "ADD_STAR_RECIPE";

const initialState = {
  allRecipes: [],
  newRecipes: [],
  newStarRecipe: []
};

const gotAllRecipes = allRecipes => ({ type: GOT_ALL_RECIPES, allRecipes });
const gotNewRecipes = newRecipes => ({ type: GOT_NEW_RECIPES, newRecipes });
const addedStarRecipe = starRecipe => ({ type: ADD_STAR_RECIPE, starRecipe });

//Thunks
export const fetchAllRecipes = userId => async dispatch => {
  try {
<<<<<<< HEAD
    const { data } = await fireData.once("value");
    dispatch(gotAllRecipes(data));
=======
    const {data} = await userInfo(userId)
    dispatch(gotAllRecipes(data))
>>>>>>> 0c2e6b69b4af8c81676210b43015575c403c023d
  } catch (error) {
    console.error(error);
  }
};
export const fetchNewRecipes = ingredients => async dispatch => {
  try {
    const { data } = await axios.post(fsGetRecipes, ingredients);
    dispatch(gotNewRecipes(data));
  } catch (error) {
    console.error(error);
  }
<<<<<<< HEAD
};
export const addingStarRecipe = (recipeId, userId) => async dispatch => {
  try {
    const { data } = await fireData.child("starred").push(recipeId);
    dispatch(addedStarRecipe(data));
  } catch (error) {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_RECIPES:
      return { ...state, allRecipes: action.allRecipes };
=======
}
export const addingStarRecipe = (recipe, userId) => async dispatch => {
  try {
    const {data} = awaituserInfo(userId).child('starred').push(recipe)
    dispatch(addedStarRecipe(data))
  } catch (error) {
  }
}


export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_All_RECIPES:
      return {...state, allRecipes: action.allRecipes}
>>>>>>> 0c2e6b69b4af8c81676210b43015575c403c023d
    case GOT_NEW_RECIPES:
      return { ...state, newRecipes: action.newRecipes };
    case ADD_STAR_RECIPE:
      return { ...state, newStarRecipe: action.starRecipe };
    default:
      return state;
  }
}
