import fireData from '../utils/firebaseFunc'
import axios from "axios";
import { fsGetRecipes } from "../secrets/fireFunctions"

const GOT_All_RECIPES = "GOT_ALL_RECIPES";
const GOT_NEW_RECIPES = "GOT_NEW_RECIPES";
const ADD_STAR_RECIPE = "ADD_STAR_RECIPE";

const initialState = {
  allRecipes: [],
  newRecipes: [],
  newStarRecipe: []
};

const gotAllRecipes = allRecipes => ({ type: GOT_All_RECIPES, allRecipes });
const gotNewRecipes = newRecipes => ({ type: GOT_NEW_RECIPES, newRecipes });
const addedStarRecipe = starRecipe => ({ type: ADD_STAR_RECIPE, starRecipe});

//Thunks
export const fetchAllRecipes = userId => async dispatch => {
  try {
    const {data} = await fireData.once('value')
    dispatch(gotAllRecipes(data))
  } catch (error) {
    console.error(error)
  }
}
export const fetchNewRecipes = ingredients => async dispatch => {
  try {
    const {data} = await axios.post(fsGetRecipes, ingredients)
    dispatch(gotNewRecipes(data))
  } catch (error) {
    console.error(error)
  }
}
export const addingStarRecipe = (recipeId, userId) => async dispatch => {
  try {
    const {data} = await fireData.child('starred').push(recipeId)
    dispatch(addedStarRecipe(data))
  } catch (error) {
  }
}


export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_RECIPES:
      return {...state, allRecipes: action.allRecipes}
    case GOT_NEW_RECIPES:
      return {...state, newRecipes: action.newRecipes}
    case ADD_STAR_RECIPE:
      return {...state, newStarRecipe: action.starRecipe}
    default:
      return state;
  }
}
