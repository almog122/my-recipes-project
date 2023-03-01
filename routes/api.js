const express = require("express");
const axios = require("axios");

const router = express.Router();

const mapRecipes = function (recipesArr) {
  return {
    idMeal: recipesArr.idMeal,
    ingredients: recipesArr.ingredients,
    title: recipesArr.title,
    thumbnail: recipesArr.thumbnail,
    href: recipesArr.href,
  };
};

router.get("/recipes/:ingredient", function (req, res) {
  let ingredient = req.params.ingredient;
  axios
    .get(`https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}`)
    .then(function (response) {
      res.send(response.data.results.map(mapRecipes));
    })
    .catch(function (error) {
      res.send(`Failed to recipes with ingredient: ${ingredient}`);
    });
});

module.exports = router;
