import axios from 'axios'
import { fsdetectTexts, fsdetectLabel } from '../secrets/fireFunctions'

const GOT_INGREDIENTS_LIST = "GOT_INGREDIENTS_LIST"
const GOT_PANTRY = "GOT_PANTRY"
const ADDED_TO_PANTRY = "ADDED_TO_PANTRY"
const DELETED_FROM_PANTRY = "DELETED_FROM_PANTRY"

const initialState = {
    filteredIngredientList: [],
    manualIngredientList: [],
    pantry: [],
}

const gotIngredientsList = filteredIngredientList => ({ type: GOT_INGREDIENTS_LIST, filteredIngredientList })
const gotPantry = pantry => ({ type: GOT_PANTRY, pantry })
const addedToPantry = manualIngredientList => ({ type: ADDED_TO_PANTRY, manualIngredientList })
const deletedFromPantry = ingredient => ({ type: DELETED_FROM_PANTRY, ingredient })
