import * as firebase from 'firebase';
import config from './secrets/firebase';

firebase.initializeApp(config);
const database = firebase.database();
export default database;
