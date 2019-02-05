const path = '/Users/me/Senior/recipeasy/utils/foods.txt'
const autocorrect = require('autocorrect')({dictionary: path})

module.exports = autocorrect
