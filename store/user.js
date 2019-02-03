import { fire, firestore } from '../firebaseconfig';
import { userInfo } from '../utils/firebaseFunc';

const LOGGEDIN_USER = 'LOGGEDIN_USER';
const LOGGEDOUT_USER = 'LOGGEDOUT_USER';
const SIGNED_UP_USER = 'SIGNED_UP_USER';
const AUTHED_USER = 'AUTHED_USER';

const defaultUser = {
  user: {},
};

const authUser = () => ({ type: AUTHED_USER });
const loggedinUser = user => ({ type: LOGGEDIN_USER, user });
const loggedoutUser = () => ({ type: LOGGEDOUT_USER });
const signedUpUser = userData => ({ type: SIGNED_UP_USER, userData });

// export const authListener = () => async dispatch => {
//   fire.auth().onAuthStateChanged(user => {
//     if (user) {
//       console.log('user in user', user);
//       this.setState({ user });
//     } else {
//       console.log('no user in user');
//       this.setState({ user: null });
//     }
//   });
//   dispatch(authUser(user));
// };

export const login = (userId, password) => async dispatch => {
  console.log('hi', userId, password);
  fire.auth
    .signInWithEmailAndPassword(userId, password)
    .then(u => {
      console.log('WHAT IS U', u);
    })
    .catch(error => {
      console.error(error);
    });
};

export const signUpUser = data => async dispatch => {
  fire
    .auth()
    .createUserWithEmailAndPassword(data.userId, data.password)
    .then(u => {
      console.log('UUUU', u);
    })
    .catch(error => {
      console.error(error);
    });
};

// export const signUpUser = data => async dispatch => {
//   try {
//     const info = {
//       email: data.email,
//       pantry: data.pantry,
//       password: data.password,
//       recipes: data.recipes,
//       starred: data.starred,
//     };
//     await firestore
//       .collection('User')
//       .doc(data.email)
//       .set(info);
//     dispatch(signedUpUser(data));
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const login = (userId, password) => async dispatch => {
//   try {
//     const user = await userInfo(userId);
//     dispatch(loggedinUser(user));
//   } catch (error) {
//     console.error(error);
//   }
// };

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
    case AUTHED_USER:
      return { state };
    case SIGNED_UP_USER:
      return {
        user: action.userData,
      };
    case LOGGEDIN_USER:
      return { user: action.user };
    case LOGGEDOUT_USER:
      return state.user;
    default:
      return state;
  }
}
