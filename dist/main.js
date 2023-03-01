const renderer = new Renderer();

const getRecpiesByIngredient = function () {
  let ingredient = $("#ingredient-input").val();
  $.get(`/recipes/${ingredient}`)
    .then((response) => {
      renderer.renderPage(response);
    })
    .catch((error) => console.log(`No recipes with ${ingredient} found`));
};

const firstIngredientAlert = function () {
  let ingredient = $(this).closest(".recipe").find(".Ingredients").children()[0].innerHTML;
  alert(ingredient);
};

$("body").on("click", "img", firstIngredientAlert);
