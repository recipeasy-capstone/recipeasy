import axios from 'axios'
import { fsdetectTexts, fsdetectLabel } from '../secrets/fireFunctions'
import autocompleteFunc from '../utils/autocompleteFunc'
import userInfo from '../utils/firebaseFunc'
import {firestore} from '../firebaseconfig'

const GOT_INGREDIENTS_LIST = "GOT_INGREDIENTS_LIST"
const GOT_PANTRY = "GOT_PANTRY"
const ADDED_TO_PANTRY = "ADDED_TO_PANTRY"
const DELETED_FROM_PANTRY = "DELETED_FROM_PANTRY"

const initialState = {
    filteredIngredientList: [],
    pantry: [],
}

const gotIngredientsList = filteredIngredientList => ({ type: GOT_INGREDIENTS_LIST, filteredIngredientList })
const gotPantry = pantry => ({ type: GOT_PANTRY, pantry })
const addedToPantry = ingredient => ({ type: ADDED_TO_PANTRY, ingredient })
const deletedFromPantry = ingredient => ({ type: DELETED_FROM_PANTRY, ingredient })

export const fetchIngredientsList = imageURI => async dispatch => {
    try {
        const {isLabel} = await axios.post(fsdetectLabel, imageURI)
        if (isLabel) {
            const {data} = await axios.post(fsdetectTexts, imageURI)
            const words = autocompleteFunc(data)
            dispatch(gotIngredientsList(words))
        }
    } 
    catch (error) {
        console.error(error)
    }
}

export const fetchPantry = userId => async dispatch => {
    try {
        const data = userInfo(userId)
        const pantry = data.pantry
        dispatch(gotPantry(pantry))
    } 
    catch (error) {
        console.error(error)
    }
}

export const addToPantry = (ingredient, userId) = async dispatch =>{
    try {
        await firestore.collection('User').doc(userId).update({
            pantry: [...pantry, ingredient]
        })
        dispatch(addedToPantry(ingredient))
    } catch (error) {
        console.error(error)
    }
}
