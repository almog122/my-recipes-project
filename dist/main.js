const renderer = new Renderer();

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
      renderer.renderPage(response);
    })
    .catch(() => {
      renderer.renderPageEmpty()
      alert(`Failed to find recipes`)
    });
};

const firstIngredientAlert = function () {
  let firstIngredient = $(this).closest(".recipe").find(".Ingredients").children()[0].innerHTML;
  alert(firstIngredient);
};

const filterRecpiesBySensitivity = function () {
  isDairySensitive = $("#dairyCheck").is(":checked");
  isGlutenSensitive = $("#glutenCheck").is(":checked");
  getRecpiesByIngredient()
};

$('#searchRecpies').on('click', getRecpiesByIngredient);

$("body").on("click", "img", firstIngredientAlert);

$("input[type=checkbox]").on("change", filterRecpiesBySensitivity);