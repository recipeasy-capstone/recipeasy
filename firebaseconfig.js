import * as firebase from "firebase";
import "firebase/firestore";
import config from "./secrets/firestore";

const fire = firebase.initializeApp(config);

export const firestore = fire.firestore();

//Use this to post new user data to firestore!
//const setData = firestore.collection('User').doc(data.email).set(data)
