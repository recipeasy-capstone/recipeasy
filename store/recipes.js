import axios from "axios";
import { userInfo } from "../utils/firebaseFunc";
import { fsGetRecipes, fsGetDirections } from "../secrets/fireFunctions";
import { firestore } from "../firebaseconfig";

const GOT_STARRED_RECIPES = "GOT_STARRED_RECIPES";
const GOT_NEW_RECIPES = "GOT_NEW_RECIPES";
const GOT_RECIPE_DIRECTIONS = "GOT_RECIPE_DIRECTIONS";

const initialState = {
  starredRecipes: [],
  newRecipes: [],
  newStarRecipe: [],
  recipeDirections: ""
};

const gotStarredRecipes = starredRecipes => ({
  type: GOT_STARRED_RECIPES,
  starredRecipes
});
const gotNewRecipes = newRecipes => ({ type: GOT_NEW_RECIPES, newRecipes });
const addedStarRecipe = starRecipe => ({ type: ADD_STAR_RECIPE, starRecipe });
const gotRecipeDirections = recipeDirections => ({
  type: GOT_RECIPE_DIRECTIONS,
  recipeDirections
});

//Thunks
export const fetchStarredRecipes = userId => async dispatch => {
  try {
    const data = await userInfo(userId);
    dispatch(gotStarredRecipes(data.starred));
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
    const currentUserInfo = await userInfo(userId);
    currentUserInfo.starred = recipe;
    await firestore
      .collection("User")
      .doc(userId)
      .set(currentUserInfo);
    dispatch(gotStarredRecipes(recipe));
  } catch (error) {
    console.error(error);
  }
};

export const fetchRecipeDirections = id => async dispatch => {
  try {
    const { data } = await axios.post(fsGetDirections, { id });
    dispatch(gotRecipeDirections(data.body.sourceUrl));
  } catch (error) {
    console.error(error);
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_STARRED_RECIPES:
      return { ...state, starredRecipes: action.starredRecipes };
    case GOT_NEW_RECIPES:
      return { ...state, newRecipes: action.newRecipes };
    case GOT_RECIPE_DIRECTIONS:
      return {
        recipeDirections: action.recipeDirections
      };
    default:
      return state;
  }
}
