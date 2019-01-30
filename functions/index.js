const functions = require('firebase-functions');
const { RAPID_API_KEY } = require("../secrets/unirest");
const unirest = require("unirest");
const {detectText} = require('../utils')
const {detectLabels} = require('../utils')

exports.getRecipes = functions.https.onRequest((req, res) => {
    try {
      let ingredients = encodeURIComponent(req.body.ingredients.join("+"));
      let recipes =  unirest
        .get(
          `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ingredients=${ingredients}`
        )
        .header("X-RapidAPI-Key", RAPID_API_KEY)
        .end((result) => {
          console.log(result.status, result.headers, result.body);
        })
        .then((ref)=>{
            return res.send(ref);
        })
    } catch (err) {
      console.error(err);
      res.send(err);
    }
  })

  exports.ingredientLookUp = functions.https.onRequest((req, res) => {
    try {
      let ingredient = encodeURIComponent(req.body.ingredient);
      let recipes =  unirest
        .get(
          `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?number=5&query=${ingredient}`
        )
        .header("X-RapidAPI-Key", RAPID_API_KEY)
        .end((result) => {
          console.log(result.status, result.headers, result.body);
        })
        .then((ref)=>{
            return res.send(ref);
        })
    } catch (err) {
      console.error(err);
      res.send(err);
    }
  })

  exports.detectTexts = functions.https.onRequest((req, res) => {
    try {
        const {data} = detectText('./receipt.jpg')
        .then((ref)=>{
            return res.send(ref)
        })
    }
    catch (err) {
        console.error(err)
    }
  })

  exports.detectLabel = functions.https.onRequest((req,res) => {
    try {
        const {data} = detectLabels('./receipt.jpg')
        .then((ref)=>{
            return res.send(ref)
        })
    }
    catch (err) {
        console.error(err)
    }
  })