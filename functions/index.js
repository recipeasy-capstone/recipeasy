const functions = require("firebase-functions");
const uni = require("unirest");
const detectText = require("./util/detectText");
const detectLabels = require("./util/detectLabels");
const path = require("path");

exports.getRecipes = functions.https.onRequest((req, res) => {
  try {
    let ingredients = encodeURIComponent(req.body.ingredients.join("+"));
    let recipes = uni
      .get(
        `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ingredients=${ingredients}`
      )
      .header("X-RapidAPI-Key", unirest.key)
      .end(result => {
        console.log(result.status, result.headers, result.body);
      })
      .then(ref => {
        return res.send(ref);
      });
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

exports.ingredientLookUp = functions.https.onRequest((req, res) => {
  try {
    let ingredient = encodeURIComponent(req.body.ingredient);
    let recipes = uni
      .get(
        `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?number=5&query=${ingredient}`
      )
      .header("X-RapidAPI-Key", unirest.key)
      .end(result => {
        console.log(result.status, result.headers, result.body);
      })
      .then(ref => {
        return res.send(ref);
      });
  } catch (err) {
    console.error(err);
    res.send(err);
  }
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
