import database from "../firebaseconfig";
import {firestore} from '../firebaseconfig'

const LOGGEDIN_USER = "LOGGEDIN_USER";
const LOGGEDOUT_USER = "LOGGEDOUT_USER";
const SIGNED_UP_USER = "SIGNED_UP_USER";

initialState = {

}
const defaultUser = {}

const loggedinUser = () => ({type: LOGGEDIN_USER, email, password});
const loggedoutUser = () => ({type: LOGGEDOUT_USER});
const signedUpUser = () => ({type: SIGNED_UP_USER, data});

export const signUpUser = (data) => async dispatch => {
  try {
    await firestore.collection('User').doc(data.email).set(data)
  } catch (error) {
    console.error(error)
  }
};

export const Login = (userId) => async dispatch => {
  try {
    
  } catch (error) {
    
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post("/auth/logout");
    dispatch(removeUser());
  } catch (err) {
    console.error(err);
  }
};

export const Login = (email, password) => async dispatch => {
  try {
    await axios.post("");
    dispatch(loggedinUser())
  } catch (error) {
  }
};

export 

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
