const path = '/Users/me/Senior/recipeasy/secrets/foods.txt'
const autocorrect = require('autocorrect')({dictionary: path})

module.exports = autocorrect
