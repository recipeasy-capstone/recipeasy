const firebase = require('firebase')
const config = require('./secrets/firestore.js')

const fire = firebase.initializeApp(config)

const firestore = fire.firestore()

//Use this to post new user data to firestore!
// const setData = firestore.collection('User').doc(data.email).set(data)

const userInfo = (userId) => {
    const user = firestore.collection('User').doc(userId)
    return user.get()
    .then(doc => {
        if (!doc.exists) {
            console.log('User does not exist!')
        } else {
            console.log(doc.data())
        }
    })
}

userInfo('ibwqJn7EF07JitnFqjb3')
