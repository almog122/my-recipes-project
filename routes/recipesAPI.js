const express = require("express");
const axios = require("axios");
const foodSensitivity = require("./food-sensitivity.json");

const router = express.Router();

let recipes = []
const dairyIngredients = foodSensitivity.dairyIngredients;
const glutenIngredients = foodSensitivity.glutenIngredients;
const LIMIT = 4;

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
        for(ingredient of recipe.ingredients){
          if(ingredient.includes(dairy) || ingredient.includes(dairy.toLowerCase())){

            return false
          }
        }
      }
    }

    if (isGlutenSensitive) {
      for(gluten of glutenIngredients){
        for(ingredient of recipe.ingredients){
          if(ingredient.includes(gluten) || ingredient.includes(gluten.toLowerCase())){

            return false
          }
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

      let recipesPages = []
      while(LIMIT < recipes.length){
        recipesPages.push(recipes.splice(LIMIT))
      }

      if(recipes.length > 0){
        recipesPages.push(recipes)
      }

      if(recipesPages.length == 0){
        res.status(204).send(recipesPages)
        return
      }

      res.send(recipesPages);
    })
    .catch((error) => {
      res.status(400).send(`Failed to get recipes`);
    });
});

module.exports = router;