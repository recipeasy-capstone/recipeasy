import { fire, firestore } from '../firebaseconfig';
import { userInfo } from '../utils/firebaseFunc';

const LOGGEDIN_USER = 'LOGGEDIN_USER';
const LOGGEDOUT_USER = 'LOGGEDOUT_USER';
const SIGNED_UP_USER = 'SIGNED_UP_USER';

const defaultUser = {
  user: {},
};

const loggedinUser = user => ({ type: LOGGEDIN_USER, user });
const loggedoutUser = () => ({ type: LOGGEDOUT_USER });
const signedUpUser = userData => ({ type: SIGNED_UP_USER, userData });

export const login = (userId, password) => async dispatch => {
  fire
    .auth()
    .signInWithEmailAndPassword(userId, password)
    .then(u => {
      // console.log('WHAT IS U', u);
      return;
    })
    .catch(error => {
      console.error(error);
    });
};

export const signUpUser = data => dispatch => {
  console.log('signedupdsda');
  fire
    .auth()
    .createUserWithEmailAndPassword(data.userId, data.password)
    .then(ref => {
      console.log('REEEF', ref.user.uid);
      const user = firestore.collection('User').doc(ref.user.uid);
      // console.log('USER', user);
      user.get().then(doc => dispatch(signedUpUser(doc.data())));
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
