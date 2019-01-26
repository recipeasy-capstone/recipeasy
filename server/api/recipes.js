const router = require("express").Router();
const { RAPID_API_KEY } = require("../../secrets/unirest");
const unirest = require("unirest");

router.post("/", async (req, res) => {
  try {
    console.log(req.body, "HERE");
    let ingredients = encodeURIComponent(req.body.ingredients.join("+"));
    let recipes = await unirest
      .get(
        `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ingredients=${ingredients}`
      )
      .header("X-RapidAPI-Key", RAPID_API_KEY)
      .end(function(result) {
        console.log(result.status, result.headers, result.body);
      });
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

module.exports = router;
