class Renderer {
  constructor() {
    this.recipesSource = $("#recipes-template").html();
    this.recipesContainer = $("#recipes-container")

    this.pagesSource = $("#pages-template").html();
    this.pagesContainer = $("#pages-container")
  }

  renderRecipesPage(data){
    this.recipesContainer.empty();
    const template = Handlebars.compile(this.recipesSource);
    const newHTML = template(data);
    this.recipesContainer.append(newHTML);
  }

  renderPages(data){
    this.pagesContainer.empty();
    const template = Handlebars.compile(this.pagesSource);
    const newHTML = template(data);
    this.pagesContainer.append(newHTML);
  }

  renderPagesEmpty(){
    this.pagesContainer.empty();
  }

  renderRecipesPageEmpty(){
    this.recipesContainer.empty();
  }
}