import axios from 'axios'
import { fsAutocomplete } from '../secrets/fireFunctions'
import checkWord from 'check-word'

const words = checkWord('en');

export const allFoods = (data) => {
    return data.map(food => {
        if (!words.check(food.toLowerCase())) {
            return await axios.post(fsAutocomplete, food)
        }
        else {
            return food
        }
    })
}