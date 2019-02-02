import * as firebase from "firebase";
import "firebase/firestore";
import config from "./secrets/firestore";

export const fire = firebase.initializeApp(config);

export const firestore = fire.firestore();
