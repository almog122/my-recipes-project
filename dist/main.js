const renderer = new Renderer()

const fetch = function () {
  $.get("/wonders", function (response) {
    renderer.renderPage(response);
  });
};

const getRecpiesByIngredient = function () {
  let ingredient = $("#ingredient-input").val();
  $.get(`/recipes/${ingredient}`)
  .then((response) => {
    renderer.renderPage(response);
  })
  .catch((error) => console.log(`No recipes with ${ingredient} found`));
  
};