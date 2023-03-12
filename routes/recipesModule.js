const foodSensitivity = require("./food-sensitivity.json");

let foodSensitivityArr = Object.values(foodSensitivity);

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

  const FilterSensitivity = function (sensitivityIngredients, recipe) {
    for (senIngredients of sensitivityIngredients) {
      for (recIngredient of recipe.ingredients) {
        if (recIngredient.includes(senIngredients) || recIngredient.includes(senIngredients.toLowerCase())) {
          return false;
        }
      }
    }

    return true;
  };

  const recipesFilterBySensitivities = (sensitivity, recipes) => {
    return recipes.filter((recipe) => {
      let flag = true;

      for (index in foodSensitivityArr) {
        if (sensitivity[index] == "true") {
          flag = FilterSensitivity(foodSensitivityArr[index], recipe) && flag;
        }
      }

      return flag;
    });
  };

  return {
    map: mapRecipes,
    filter: recipesFilterBySensitivities,
  };
};

module.exports = recipesModule();
