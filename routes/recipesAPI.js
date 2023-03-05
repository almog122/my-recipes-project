const express = require("express");
const axios = require("axios");
const recipesModule = require("./recipesModule");

const router = express.Router();

const LIMIT = 4;

router.get("/recipes/:ingredient", function (req, res) {
  let isDairySensitive = req.query.isDairySensitive == 'true';
  let isGlutenSensitive = req.query.isGlutenSensitive == 'true';
  let ingredient = req.params.ingredient;
  axios
    .get(
      `https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}`
    )
    .then(function (response) {
      let recipes = recipesModule.map(response.data.results);
      recipes = recipesModule.filter(isDairySensitive, isGlutenSensitive , recipes)

      let recipesPages = []
      while(LIMIT < recipes.length){
        recipesPages.push(recipes.splice(0 , LIMIT))
      }

      if(recipes.length > 0){
        recipesPages.unshift(recipes)
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