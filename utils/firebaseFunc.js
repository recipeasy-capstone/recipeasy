import database from "../firebaseconfig";

const fireData = database.data().ref('/users/' + userId)

module.exports = fireData