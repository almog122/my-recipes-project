const express = require("express");
const axios = require("axios");
const foodSensitivity = require("./food-sensitivity.json");

const router = express.Router();

let recipes = []
const dairyIngredients = foodSensitivity.dairyIngredients;
const glutenIngredients = foodSensitivity.glutenIngredients;

const mapRecipes = function (recipesArr) {
  return {
    idMeal: recipesArr.idMeal,
    ingredients: recipesArr.ingredients,
    title: recipesArr.title,
    thumbnail: recipesArr.thumbnail,
    href: recipesArr.href,
  };
};

const recipesFilterBySensitivity = (isDairySensitive = false, isGlutenSensitive = false) => {
  recipes = recipes.filter( recipe => {

    if (isDairySensitive) {
      for(dairy of dairyIngredients){
        if(recipe.ingredients.includes(dairy) || recipe.ingredients.includes(dairy.toLowerCase())){

          return false
        }
      }
    }

    if (isGlutenSensitive) {
      for(gluten of glutenIngredients){
        if(recipe.ingredients.includes(gluten)|| recipe.ingredients.includes(gluten.toLowerCase())){

          return false
        }
      }
    }

    return true;
  });
}

router.get("/recipes/:ingredient", function (req, res) {
  let isDairySensitive = req.query.isDairySensitive == 'true';
  let isGlutenSensitive = req.query.isGlutenSensitive == 'true';
  let ingredient = req.params.ingredient;
  axios
    .get(
      `https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}`
    )
    .then(function (response) {
      recipes = response.data.results.map(mapRecipes);
      recipesFilterBySensitivity(isDairySensitive, isGlutenSensitive)
      res.send(recipes);
    })
    .catch(function (error) {
      res.send(`Failed to recipes with ingredient: ${ingredient}`);
    });
});

module.exports = router;