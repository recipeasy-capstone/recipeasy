import { firestore } from '../firebaseconfig';

const LOGGEDIN_USER = 'LOGGEDIN_USER';
const LOGGEDOUT_USER = 'LOGGEDOUT_USER';
const SIGNED_UP_USER = 'SIGNED_UP_USER';

const defaultUser = {};

const loggedinUser = user => ({ type: LOGGEDIN_USER, user });
const loggedoutUser = () => ({ type: LOGGEDOUT_USER });
const signedUpUser = userData => ({ type: SIGNED_UP_USER, userData });

export const signUpUser = data => async dispatch => {
  try {
    await firestore
      .collection('User')
      .doc(data.email)
      .set(data);
    dispatch(signedUpUser(data));
  } catch (error) {
    console.error(error);
  }
};

export const login = (userId, password) => async dispatch => {
  try {
    const user = await firestore
      .collection('User')
      .doc(userId)
      .get();
    if (!user.exist) {
      console.log('you have no email!!');
    } else {
      dispatch(loggedinUser(user.data));
    }
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
  } catch (err) {
    console.error(err);
  }
};

export default function(state = defaultUser, action) {
  switch (action.type) {
    case SIGNED_UP_USER:
      return action.userData
    case LOGGEDIN_USER:
      return action.user;
    default:
      return state;
  }
}
