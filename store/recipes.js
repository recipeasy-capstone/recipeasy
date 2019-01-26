import database from "../firebaseconfig";
import axios from "axios";

const GET_OLD_RECIPE = "GET_OLD_RECIPE";
const ADD_RECIPE = "ADD_RECIPE";
const GET_NEW_RECIPE = "GET_NEW_RECIPE";
const GET_STARRED_RECIPE = "GET_STARRED_RECIPE";
const STAR_RECIPE = "STAR_RECIPE";

const inistalState = {
  oldRecipe: [],
  newRecipe: [],
  starredRecipe: []
};

const getOldRecipe = oldRecipe => ({ type: GET_OLD_RECIPE, oldRecipe });
const getStarredRecipe = starredRecipe => ({
  type: GET_STARRED_RECIPE,
  starredRecipe
});
const getNewRecipe = newRecipe => ({ type: GET_NEW_RECIPE, newRecipe });

// export const getAllOrders = () => async dispatch => {
//     try {
//       const {data: allOrders} = await axios.get('/api/order')
//       dispatch(gotAllOrders(allOrders))
//     } catch (err) {
//       console.error(err)
//     }
//   }

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
