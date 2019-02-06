var leven = require("leven");
var foods = require("../secrets/foods");

var autocorrect = function(str) {
  var distance, bestWord, i, word, min;

  for (i = 0; i < foods.length; i++) {
    word = foods[i];
    if (str[0] === foods[i][0] || str[1] === foods[i][1]) {
      distance = leven(str, word);

      if (distance === 0) {
        return word;
      } else if (min === undefined || distance < min) {
        min = distance;
        bestWord = word;
      }
    }
  }
  return bestWord;
};

module.exports = autocorrect;
