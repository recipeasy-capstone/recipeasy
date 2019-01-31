import axios from "axios";
import userInfo from "../utils/firebaseFunc";
import { fsGetRecipes } from "../secrets/fireFunctions";

const GOT_ALL_RECIPES = "GOT_ALL_RECIPES";
const GOT_NEW_RECIPES = "GOT_NEW_RECIPES";
const ADD_STAR_RECIPE = "ADD_STAR_RECIPE";

const initialState = {
  allRecipes: [],
  newRecipes: ["Recipe1", "recipe2"],
  newStarRecipe: []
};

const gotAllRecipes = allRecipes => ({ type: GOT_ALL_RECIPES, allRecipes });
const gotNewRecipes = newRecipes => ({ type: GOT_NEW_RECIPES, newRecipes });
const addedStarRecipe = starRecipe => ({ type: ADD_STAR_RECIPE, starRecipe });

//Thunks
export const fetchAllRecipes = userId => async dispatch => {
  try {
    const { data } = await userInfo(userId);
    dispatch(gotAllRecipes(data));
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
};
export const addingStarRecipe = (recipe, userId) => async dispatch => {
  try {
    const { data } = await userInfo(userId)
      .child("starred")
      .push(recipe);
    dispatch(addedStarRecipe(data));
  } catch (error) {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_RECIPES:
      return { ...state, allRecipes: action.allRecipes };
    case GOT_NEW_RECIPES:
      return { ...state, newRecipes: action.newRecipes };
    case ADD_STAR_RECIPE:
      return { ...state, newStarRecipe: action.starRecipe };
    default:
      return state;
  }
}
