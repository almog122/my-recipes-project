class Renderer {
  constructor() {
    this.source = $("#recipes-template").html();
    this.container = $("#recipes-container")
  }

  renderPage(data){
    this.container.empty();
    const template = Handlebars.compile(this.source);
    const newHTML = template(data);
    this.container.append(newHTML);
  }

  renderPageEmpty(){
    this.container.empty();
  }
}