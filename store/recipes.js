import axios from 'axios';
import userInfo from '../utils/firebaseFunc';
import { fsGetRecipes } from '../secrets/fireFunctions';

const GOT_STARRED_RECIPES = 'GOT_STARRED_RECIPES';
const GOT_NEW_RECIPES = 'GOT_NEW_RECIPES';
const ADD_STAR_RECIPE = 'ADD_STAR_RECIPE';

const initialState = {
  starredRecipes: [],
  newRecipes: ['Recipe1', 'recipe2'],
  newStarRecipe: [],
};

const gotStarredRecipes = allRecipes => ({
  type: GOT_STARRED_RECIPES,
  starredRecipes,
});
const gotNewRecipes = newRecipes => ({ type: GOT_NEW_RECIPES, newRecipes });
const addedStarRecipe = starRecipe => ({ type: ADD_STAR_RECIPE, starRecipe });

//Thunks
export const fetchStarredRecipes = userId => async dispatch => {
  try {
    const { data } = await userInfo(userId).child('starred');
    dispatch(gotStarredRecipes(data));
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
      .child('starred')
      .push(recipe);
    dispatch(addedStarRecipe(data));
  } catch (error) {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_STARRED_RECIPES:
      return { ...state, starredRecipes: action.starredRecipes };
    case GOT_NEW_RECIPES:
      return { ...state, newRecipes: action.newRecipes };
    case ADD_STAR_RECIPE:
      return { ...state, newStarRecipe: action.starRecipe };
    default:
      return state;
  }
}
