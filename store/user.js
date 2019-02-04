import { fire, firestore } from '../firebaseconfig';
import { userInfo } from '../utils/firebaseFunc';

const LOGGEDIN_USER = 'LOGGEDIN_USER';
const LOGGEDOUT_USER = 'LOGGEDOUT_USER';
const SIGNED_UP_USER = 'SIGNED_UP_USER';

const defaultUser = {
  uid: null
};

const loggedinUser = uid => ({ type: LOGGEDIN_USER, uid });
const loggedoutUser = () => ({ type: LOGGEDOUT_USER });
const signedUpUser = uid => ({ type: SIGNED_UP_USER, uid });

export const login = (uid) => async dispatch => {
  try {
    const user = await userInfo(uid)
    dispatch(loggedinUser(uid))
  } catch (error) {
    console.error(error)
  }
};

export const signUpUser = (uid, data) => async dispatch => {
  try {
    await firestore.collection('User').doc(uid).set(data)
    dispatch(signedUpUser(uid))
  } catch (error) {
    console.error(error)
  }
  
};

export const logout = () => async dispatch => {
  try {
    dispatch(loggedoutUser());
  } catch (err) {
    console.error(err);
  }
};

export default function(state = defaultUser, action) {
  switch (action.type) {
    case SIGNED_UP_USER:
      return { uid: action.uid };
    case LOGGEDIN_USER:
      return { uid: action.uid };
    case LOGGEDOUT_USER:
      return defaultUser;
    default:
      return state;
  }
}
