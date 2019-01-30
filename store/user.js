import database from "../firebaseconfig";

const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";
const LOGGEDIN_USER = "LOGGEDIN_USER";
const LOGGEDOUT_USER = "LOGGEDOUT_USER";
const SIGNED_UP_USER = "SIGNED_UP_USER";

initialState = {

}
const defaultUser = {}

const getUser = userId => ({ type: GET_USER, userId });
const removeUser = () => ({ type: REMOVE_USER });
const loggedinUser = () => ({type: LOGGEDIN_USER, userId, password});
const loggedoutUser = () => ({type: LOGGEDOUT_USER});
const signedUpUser = () => ({type: SIGNED_UP_USER, userId, password, email});

export const me = () => async dispatch => {
  try {
    const res = await database.get("/auth/me");
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password, method) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, { email, password });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post("/auth/logout");
    dispatch(removeUser());
  } catch (err) {
    console.error(err);
  }
};

export const userSignUp

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
