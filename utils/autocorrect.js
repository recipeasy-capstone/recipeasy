var leven = require('leven')
var foods = require('../secrets/foods')

var autocorrect = function(str) {
    var distance, bestWord, i, word, min, sum, count

    if (str === 'choco') return 'chocolate'

    for (i = 0; i < foods.length; i++) {
      word = foods[i]
      if (str[0] === foods[i][0] || str[1] === foods[i][1]) {
        distance = leven(str, word)
        count = count + 1 || 0
        sum = sum + distance || 0

        if (distance === 0) {
          return word
        } else if (sum / count > 8) {
          return str
        } else if (min === undefined || distance < min) {
          min = distance
          bestWord = word
        }
      }
    }
    return bestWord
}

module.exports = autocorrect
