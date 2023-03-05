const renderer = new Renderer();

const LIMIT = 4;
let recipesPages = []

let isDairySensitive = false;
let isGlutenSensitive = false;

const getRecpiesByIngredient = function () {
  let ingredient = $("#ingredient-input").val();
  let sensitivity = {
    isDairySensitive: isDairySensitive ,
    isGlutenSensitive: isGlutenSensitive ,
  };
  $.get(`/recipes/${ingredient}/${LIMIT}`, sensitivity)
    .then((response) => {
      recipesPages = response
      page = 0
      renderer.renderPages(recipesPages.keys())
      renderer.renderRecipesPage(recipesPages[page]);
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
  let page = Number($(this).text());
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

// const getRecpiesByIngredient = function () {
//   let ingredient = $("#ingredient-input").val();
//   let sensitivity = {
//     isDairySensitive: isDairySensitive ,
//     isGlutenSensitive: isGlutenSensitive ,
//   };
//   $.get(`/recipes/${ingredient}`, sensitivity)
//     .then((response) => {
//       renderer.renderPage(response);
//     })
//     .catch(() => {
//       renderer.renderPageEmpty()
//       console.log(`Failed to find recipes`)
//     });
// };