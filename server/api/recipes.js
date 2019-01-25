import { RAPID_API_KEY } from './secrets/unirest';

import RapidAPI from 'react-native-rapid-api';
const rapid = new RapidAPI('recipeasy', RAPID_API_KEY);

export default rapid
  .call(
    'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ingredients=bananas%2C+chocolate%2C+flour'
  )
  .header('X-RapidAPI-Key', RAPID_API_KEY)
  .end(function(result) {
    console.log(result.status, result.headers, result.body);
  });
