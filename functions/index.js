const functions = require("firebase-functions");
const unirest = require("unirest");
const detectText = require("./util/detectText");
const detectLabels = require("./util/detectLabels");
const path = require("path");
const unirestKey = require("./googleSecret/unirest");

exports.getRecipes = functions.https.onRequest((req, res) => {
  let ingredients = encodeURIComponent(req.body.join("+"));
  unirest
    .get(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ingredients=${ingredients}`
    )
    .header("X-RapidAPI-Key", unirestKey.RAPID_API_KEY)
    .end(result => {
      console.log(result.status, result.headers, result.body);
      res.send(result);
    });
});

exports.ingredientLookUp = functions.https.onRequest((req, res) => {
  let ingredient = encodeURIComponent(req.body);
  let recipes = unirest
    .get(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?number=5&query=${ingredient}`
    )
    .header("X-RapidAPI-Key", unirestKey.RAPID_API_KEY)
    .end(result => {
      console.log(result.status, result.headers, result.body);
      res.send(result);
    });
});

exports.detectTexts = functions.https.onRequest((req, res) => {
  detectText(req.body)
    .then(ref => {
      return res.send(ref);
    })
    .catch(console.error);
});

exports.detectLabel = functions.https.onRequest((req, res) => {
  detectLabels(req.body)
    .then(ref => {
      return res.send(ref);
    })
    .catch(console.error);
});
