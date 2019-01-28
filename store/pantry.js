import database from '../firebaseconfig'

const GET_PANTRY = 'GET_PANTRY'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'

const initialState = {
    pantry: ['hello', 'goodbye']
}

const getPantry = pantry => ({
    type: GET_PANTRY,
    pantry
})

const addItem = item => ({
    type: ADD_ITEM,
    item
})

const removeItem = item => ({
    type: REMOVE_ITEM,
    item
})

export const gotPantry = userId => async dispatch => {
    try {
        const {data} = await database.data().ref('/users/' + userId).once('value')
        dispatch(getPantry(data))
    }
    catch (error) {
        console.error(error)
    }
}

export const addedItem = (item, userId) => async dispatch => {
    try {
        const {data} = await database.data().ref('/users/' + userId).child('pantry').push(item)
        dispatch(addItem(data))
    }
    catch (error) {
        console.error(error)
    }
}

export const removedItem = (item, userId) => async dispatch => {
    try {
        const {data} = await database.data().ref('/users/' + userId).child('pantry').child(item).remove()
        dispatch(removeItem(data))
    }
    catch (error) {
        console.error(error)
    }
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_PANTRY:
            return [action.pantry]
        case ADD_ITEM:
            return {pantry: [...state.pantry, action.item]}
        case REMOVE_ITEM:
            return {pantry: [...state.pantry].filter(food => food !== action.item)}
        default:
            return state
    }
}
