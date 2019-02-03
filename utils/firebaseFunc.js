import { firestore } from "../firebaseconfig";

export const userInfo = uid => {
  const user = firestore.collection("User").doc(uid);
  return user.get().then(doc => {
    if (!doc.exists) {
      console.log("User does not exist!");
    } else {
      return doc.data();
    }
  });
};
