class Obstacle {
  constructor(gameScreen, speed, height, width, top, startPosition, moveDirection, imgSrc) {

    this.gameScreen = gameScreen;
    this.speed = speed;
    this.top = top;
    this.startPosition = startPosition;
    this.moveDirection = moveDirection;


    this.width = width;
    this.height = height;
    this.left = this.startPosition;

    this.element = document.createElement("img");
    this.element.src = imgSrc;
    this.element.setAttribute("id", "obstacles");
    this.element.style.position = "absolute";
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.top = `${top}px`;
    this.element.style.left = `${this.left}px`;

    this.gameScreen.appendChild(this.element);
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  move() {

    if (this.moveDirection === "left") {
      this.left -= this.speed;
      this.updatePosition();
    }
    else {
      this.left += this.speed;
      this.updatePosition();
    }
  }
}


