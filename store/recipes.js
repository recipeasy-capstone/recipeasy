import database from "../firebaseconfig";
import axios from "axios";

const GOT_All_RECIPES = "GOT_OLD_RECIPES";
const GOT_NEW_RECIPES = "GOT_NEW_RECIPES";
const ADD_STAR_RECIPE = "ADD_STAR_RECIPE";

const initialState = {
  oldRecipe: [],
  newRecipe: [],
  starredRecipes: []
};

const getOldRecipe = oldRecipe => ({ type: GET_OLD_RECIPE, oldRecipe });
const getStarredRecipe = starredRecipes => ({
  type: GET_STARRED_RECIPE,
  starredRecipes
});
const getNewRecipe = newRecipe => ({ type: GET_NEW_RECIPE, newRecipe });
const addStarRecipe = starRecipe => ({ type: STAR_RECIPE, starRecipe});

//Thunks
export const gotNewRecipes = ingredients => async dispatch => {
  try {
    const {data} = await axios.post('/api/recipes', ingredients)
    dispatch(getNewRecipe(data))
  } catch (error) {
    console.error(error)
  }
}
export const addedStarRecipe = (recipeId, userId) => async dispatch => {
  try {
    const {data} = await firebase.data().ref('/users/' + userId).child('starred').push(recipeId)
    dispatch(addStarRecipe(data))
  } catch (error) {
    
  }
}
export const gotStarredRecipe = (userId) => async dispatch => {
  try {
    const {data} = await firebase.data().ref('/users/' + userId).once('value')
    dispatch(getStarredRecipe(data))
  } catch (error) {
    console.error(error)
  }
}
export const gotOldRecipes = userId => async dispatch => {
  try {
    const {data} = await firebase.data().ref('/users/' + userId).once('value')
    dispatch(getOldRecipe(data))
  } catch (error) {
    console.error(error)
  }
}


export default function(state = initialState, action) {
  switch (action.type) {
    case GET_OLD_RECIPE:
      return {...state, oldRecipe: action.oldRecipe}
    case GET_NEW_RECIPE:
      return {...state, newRecipe: action.newRecipe}
    case GET_STARRED_RECIPE:
      return {...state, starredRecipe: action.starredRecipe}
    case STAR_RECIPE:
      return {...state, starredRecipe: action.starRecipe}
    default:
      return state;
  }
}
