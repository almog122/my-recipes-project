const renderer = new Renderer();

let recipesPages = []

let isDairySensitive = false;
let isGlutenSensitive = false;

const getRecpiesByIngredient = function () {
  let ingredient = $("#ingredient-input").val();
  let sensitivity = {
    isDairySensitive: isDairySensitive ,
    isGlutenSensitive: isGlutenSensitive ,
  };
  $.get(`/recipes/${ingredient}`, sensitivity)
    .then((response) => {
      recipesPages = response
      renderer.renderPages(recipesPages.keys())
      renderer.renderRecipesPage(recipesPages[0]);
    })
    .catch(() => {
      renderer.renderPagesEmpty()
      renderer.renderRecipesPageEmpty()
      console.log(`Failed to find recipes`)
    });
};

const firstIngredientAlert = function () {
  let firstIngredient = $(this).closest(".recipe").find(".Ingredients").children()[0].innerHTML;
  alert(firstIngredient);
};

const getRecpiesPage = function () {
  let page = Number($(this).data('page'));
  renderer.renderRecipesPage(recipesPages[page]);
};

const filterRecpiesBySensitivity = function () {
  isDairySensitive = $("#dairyCheck").is(":checked");
  isGlutenSensitive = $("#glutenCheck").is(":checked");
  getRecpiesByIngredient()
};

$('#searchRecpies').on('click', getRecpiesByIngredient);

$("body").on("click", "img", firstIngredientAlert);

$("body").on("click", ".page", getRecpiesPage);

$("input[type=checkbox]").on("change", filterRecpiesBySensitivity);