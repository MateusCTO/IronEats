class Player {

  constructor(gameScreen, left, top, width, height, imgSrc) {

    this.gameScreen = gameScreen;

    this.left = left;
  
    this.top = top;

    this.width = width;
  
    this.height = height;
  
    this.element = document.createElement('img');
 
    this.element.style.position = 'absolute';
    this.element.src = imgSrc;
  
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.top = `${top}px`;
    this.element.style.left = `${left}px`;

    this.gameScreen.appendChild(this.element);
  }


  stayInPlay() {
  
    if (this.left + this.width > this.gameScreen.offsetWidth) {
      this.left = this.gameScreen.offsetWidth - this.width;
    }

  
    else if (this.left < 0) {
      this.left = 0;
    }

 
    if (this.top + this.height > this.gameScreen.offsetHeight) {
      this.top = this.gameScreen.offsetHeight - this.height;
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