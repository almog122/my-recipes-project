const express = require("express");
const axios = require("axios");
const recipesModule = require("./recipesModule");

const router = express.Router();

const LIMIT = 4;
const RECIPES_URL = "https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient";
let recipesPages

router.get("/recipes/:ingredient", function (req, res) {
  let isDairySensitive = req.query.isDairySensitive == 'true';
  let isGlutenSensitive = req.query.isGlutenSensitive == 'true';
  let ingredient = req.params.ingredient;
  
  axios.get(`${RECIPES_URL}/${ingredient}`)
    .then(function (response) {
      let recipes = recipesModule.map(response.data.results);
      recipes = recipesModule.filter(isDairySensitive, isGlutenSensitive , recipes)

      recipesPages = []
      while(LIMIT < recipes.length){
        recipesPages.push(recipes.splice(0 , LIMIT))
      }

      if(recipes.length > 0){
        recipesPages.push(recipes)
      }

      if(recipesPages.length == 0){
        res.status(204).send(recipesPages)
        return
      }

      res.send([recipesPages[0], Object.keys(recipesPages)]);
    })
    .catch((error) => {
      res.status(400).send(`Failed to get recipes`);
    });
});

router.get("/recipesPage/:page", function (req, res) {
  let page = req.params.page;

  if(recipesPages[page] == undefined){
    res.status(404).end()
    return
  }

  res.send(recipesPages[page])
});

module.exports = router;