import database from "../firebaseconfig";
import axios from "axios";

const GOT_All_RECIPES = "GOT_ALL_RECIPES";
const GOT_NEW_RECIPES = "GOT_NEW_RECIPES";
const ADD_STAR_RECIPE = "ADD_STAR_RECIPE";

const initialState = {
  allRecipes: [],
  newRecipes: [],
  newStarRecipe: []
};

const gotAllRecipes = allRecipes => ({ type: GOT_All_RECIPES, allRecipes });
const gotNewRecipe = newRecipes => ({ type: GOT_NEW_RECIPE, newRecipes });
const addedStarRecipe = starRecipe => ({ type: ADD_STAR_RECIPE, starRecipe});

//Thunks
export const fetchAllRecipes = userId => async dispatch => {
  try {
    const {data} = await firebase.data().ref('/users/' + userId).once('value')
    dispatch(gotAllRecipes(data))
  } catch (error) {
    console.error(error)
  }
}
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
