const renderer = new Renderer();

const LIMIT = 4;
let recipesPages = []
let page;

let isDairySensitive = false;
let isGlutenSensitive = false;

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
      renderer.renderPage(recipesPages[page]);
    })
    .catch(() => {
      renderer.renderPageEmpty()
      console.log(`Failed to find recipes`)
    });
};

const getNextRecpiesPage = function(){
  if(page < recipesPages.length){
    renderer.renderPage(recipesPages[++page])
  }else{
    page = 0;
    renderer.renderPage(recipesPages[page])
  }
}

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

$('#nextPage').on('click', getNextRecpiesPage);

$("body").on("click", "img", firstIngredientAlert);

$("input[type=checkbox]").on("change", filterRecpiesBySensitivity);