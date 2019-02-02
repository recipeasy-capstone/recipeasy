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

export const addIngredient = async (ingredient, userId) => {
  const currentUser = await firestore.collection('User').doc(userId)
  currentUser.pantry = [...currentUser.pantry, ingredient]

  await firestore.collection('User').doc(userId).set(currentUser)
}

export const deleteIngredient = async (ingredient, userId) => {
  const currentUser = await firestore.collection('User').doc(userId)
  currentUser.pantry = [...currentUser.pantry].filter(food => food !== ingredient)
  
  await firestore.collection('User').doc(userId).set(currentUser)
}