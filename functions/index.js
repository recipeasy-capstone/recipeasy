const functions = require("firebase-functions");
const uni = require("unirest");
const { detectText } = require("../utils");
const { detectLabels } = require("../utils");
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

exports.detectTexts = functions.https.onRequest((req, res) => {
  try {
    const { data } = detectText("./receipt.jpg").then(ref => {
      return res.send(ref);
    });
  } catch (err) {
    console.error(err);
  }
});

exports.detectLabel = functions.https.onRequest((req, res) => {
  try {
    const { data } = detectLabels("./receipt.jpg").then(ref => {
      return res.send(ref);
    });
  } catch (err) {
    console.error(err);
  }
});
