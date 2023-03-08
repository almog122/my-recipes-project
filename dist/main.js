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
      firstPage = response[0]
      Pages = response[1]
      renderer.renderPages(Pages)
      renderer.renderRecipesPage(firstPage);
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
  $.get(`/recipesPage/${page}`)
    .then((response) => {
      renderer.renderRecipesPage(response);
    })
    .catch(() => {
      renderer.renderPagesEmpty()
      renderer.renderRecipesPageEmpty()
      console.log(`Failed to find page`)
    });
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