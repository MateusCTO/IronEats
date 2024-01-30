class Player {

  constructor(gameScreen, left, top, width, height, imgSrc) {

    this.gameScreen = gameScreen;

    // horizontal position of the player (via position absolute)
    this.left = left;
    // vertical position of the player (via position absolute)
    this.top = top;
    // width of the player
    this.width = width;
    //  height of the player
    this.height = height;
    // direction of the player's moving horizontally
    // create the img tag fro the player, define src and default
    this.element = document.createElement('img');
    this.element.setAttribute("id", "player");
    this.element.style.position = 'absolute';
    this.element.src = imgSrc;
    //  set up default element's properties
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.top = `${top}px`;
    this.element.style.left = `${left}px`;

    //append Player to the Game Screen
    this.gameScreen.appendChild(this.element);
  }

  // function that limits the player's boundaries
  stayInPlay() {
    // Right Side boundary
    if (this.left + this.width > this.gameScreen.offsetWidth) {
      this.left = this.gameScreen.offsetWidth - this.width;
    }

    // Left side boundary
    else if (this.left < 0) {
      this.left = 0;
    }

    // handle top and bottom borders
    // bottom side boundary
    if (this.top + this.height > this.gameScreen.offsetHeight) {
      this.top = this.gameScreen.offsetHeight - this.height;

      // top side boundary 
    }
    else if (this.top < 0) {
      this.top = 0;
    }

    this.updatePosition();

  }


  
  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  gotPrize(getPrize) {
    // .getBoundinClientRect() return info about top, left, right, bottom, width, height of an html element

    const playerRect = this.element.getBoundingClientRect();
    const getPrizeRect = getPrize.element.getBoundingClientRect();

    if (playerRect.left < getPrizeRect.right &&
      playerRect.right > getPrizeRect.left &&
      playerRect.top < getPrizeRect.bottom &&
      playerRect.bottom > getPrizeRect.top) {
      return true;
    }
    else {
      return false;
    }
  }

  touchDepositArea(prizeCheck) {
    // .getBoundinClientRect() return info about top, left, right, bottom, width, height of an html element

    const playerRect = this.element.getBoundingClientRect();
    const prizeCheckRect = prizeCheck.element.getBoundingClientRect();

    if (playerRect.left < prizeCheckRect.right &&
      playerRect.right > prizeCheckRect.left &&
      playerRect.top < prizeCheckRect.bottom &&
      playerRect.bottom > prizeCheckRect.top) {
      return true;

    }
    else {
      return false;
    }
  }

  didCollide(obstacle) {
    // .getBoundinClientRect() return info about top, left, right, bottom, width, height of an html element

    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top) {
      return true;

    }
    else {
      return false;
    }
  }
}