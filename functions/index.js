const functions = require("firebase-functions");
const unirest = require("unirest");
const detectText = require("./util/detectText");
const detectLabels = require("./util/detectLabels");
const path = require("path");
const unirestKey = require("./googleSecret/unirest");
const _ = require("lodash");

exports.getRecipes = _.throttle(goGetRecipe, 2000);

goGetRecipe = functions.https.onRequest((req, res) => {
  let ingredients = encodeURIComponent(req.body.join("+"));
  unirest
    .get(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=20&ranking=1&ingredients=${ingredients}`
    )
    .header("X-RapidAPI-Key", unirestKey.RAPID_API_KEY)
    .end(result => {
      res.send(result);
    });
});

exports.getDirections = functions.https.onRequest((req, res) => {
  unirest
    .get(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${
        req.body.id
      }/information`
    )
    .header("X-RapidAPI-Key", unirestKey.RAPID_API_KEY)
    .end(result => {
      res.send(result);
    });
});

exports.ingredientLookUp = functions.https.onRequest((req, res) => {
  unirest
    .get(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?number=20&query=${
        req.body
      }`
    )
    .header("X-RapidAPI-Key", unirestKey.RAPID_API_KEY)
    .end(result => {
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
