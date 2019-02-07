var leven = require("leven");
var foods = require("../secrets/foods");

var autocorrect = function(str) {
  var distance, bestWord, i, word, min;

  if (foods.includes(str)) {
    return str
  }

  for (i = 0; i < foods.length; i++) {
    word = foods[i];

    if (str[0] === word[0]) {
      distance = leven(str, word);

      if (distance === 0) {
        return word;
      }

      else if (str.includes(word)) {
        return word
      }

      else if (min === undefined || distance < min) {
        min = distance;
        bestWord = word;
      }
    }
  }
  return bestWord;
};

module.exports = autocorrect;
