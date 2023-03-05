
const foodSensitivity = require("./food-sensitivity.json");
const dairyIngredients = foodSensitivity.dairyIngredients;
const glutenIngredients = foodSensitivity.glutenIngredients;

const recipesModule = function () {
  const mapRecipes = function (recipes) {
    return recipes.map((r) => {
      return {
        idMeal: r.idMeal,
        ingredients: r.ingredients,
        title: r.title,
        thumbnail: r.thumbnail,
        href: r.href,
      };
    });
  };

  const recipesFilterBySensitivity = (
    isDairySensitive = false,
    isGlutenSensitive = false,
    recipes
  ) => {
    return recipes.filter((recipe) => {
      if (isDairySensitive) {
        for (dairy of dairyIngredients) {
          for (ingredient of recipe.ingredients) {
            if (
              ingredient.includes(dairy) ||
              ingredient.includes(dairy.toLowerCase())
            ) {
              return false;
            }
          }
        }
      }

      if (isGlutenSensitive) {
        for (gluten of glutenIngredients) {
          for (ingredient of recipe.ingredients) {
            if (
              ingredient.includes(gluten) ||
              ingredient.includes(gluten.toLowerCase())
            ) {
              return false;
            }
          }
        }
      }

      return true;
    });
  };

  return {
    map: mapRecipes,
    filter: recipesFilterBySensitivity,
  };
};

module.exports = recipesModule();
