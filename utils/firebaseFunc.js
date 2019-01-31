import { firestore } from "../firebaseconfig";

export const userInfo = userId => {
  const user = firestore.collection("User").doc(userId);
  return user.get().then(doc => {
    if (!doc.exists) {
      console.log("User does not exist!");
    } else {
      return doc.data();
    }
  });
};
