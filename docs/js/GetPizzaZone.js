
class GetPizzaZone {

  constructor(gameScreen) {

    this.gameScreen = gameScreen;

    this.top = 600;
    this.width = 650;
    this.height = 50;

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;

    this.gameScreen.appendChild(this.element);

  }
}