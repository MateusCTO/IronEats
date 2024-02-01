class Game {
  constructor() {


    this.startScreen = document.getElementById('start-screen');
    this.gameScreen = document.getElementById('game-screen');
    this.endScreen = document.getElementById('end-screen');
    this.instructionsScreen = document.getElementById('instructions-screen');
    this.creditsScreen = document.getElementById('credits-screen');
    this.victoryScreen = document.getElementById('victory-screen');
    this.gameContainer = document.getElementById('game-container');

    this.deliverPizza = new DeliverPizzaZone(this.gameScreen);

    this.getPizza = new GetPizzaZone(this.gameScreen);

    this.coins = 3;

    this.gamespeed = 1;

    this.gameIsOver = false;

    this.pizzaInHand = true;

    this.player = new Player(this.gameScreen, 300, 600, 50, 50, "./docs/images/playerPizzaDown.png");

    this.obstaclesArray = [[], [], [], [], [], [], [], [], [], []];

    this.height = 650;
    this.width = 650;
  }

  start() {
    this.startScreen.style.display = 'none';
    this.endScreen.style.display = 'none';
    this.gameScreen.style.display = 'block';
    this.gameContainer.style.display = 'block';
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    backgroundMusic.play();
    this.gameLoop();
  }

  gameLoop() {
    if (this.gameIsOver) {
      return;
    }
    this.update();
    window.requestAnimationFrame(() => this.gameLoop());
  }

  updateGroupObjectsGround(arr, order) {
    for (let i = 0; i < arr.length; i++) {

      const obstacle = arr[i];
      obstacle.move();

      if (this.player.didCollide(obstacle)) {

        this.player.left = 300;
        this.player.top = 600;
        this.coins--;
        this.gamespeed -= 0.6;
        gotHitSound.play();
        this.pizzaInHand = true;
      }
      else if (obstacle.left < -100 || obstacle.left + obstacle.width > 750) {
        obstacle.element.remove();
        this.obstaclesArray[order].splice(i, 1);
      }
    }


    const obstaclesDetails = [
      { speed: 2, height: 50, width: 50, top: 550, startPosition: 650, moveDirection: "left", imgSrc: "./docs/images/Car1-test2-green.png" },
      { speed: 1.5, height: 50, width: 50, top: 500, startPosition: -100, moveDirection: "right", imgSrc: "./docs/images/Car1-test2.orange.png" },
      { speed: 3, height: 50, width: 100, top: 450, startPosition: 650, moveDirection: "left", imgSrc: "./docs/images/train1.png" },
      { speed: 2, height: 50, width: 50, top: 400, startPosition: -100, moveDirection: "right", imgSrc: "./docs/images/Car1-test2-yellow.png" },
      { speed: 3.5, height: 50, width: 100, top: 350, startPosition: 650, moveDirection: "left", imgSrc: "./docs/images/truck1.png" },
      { speed: 2, height: 50, width: 100, top: 250, startPosition: 650, moveDirection: "left", imgSrc: "./docs/images/truck2.png" },
      { speed: 1.5, height: 50, width: 100, top: 200, startPosition: -100, moveDirection: "right", imgSrc: "./docs/images/train1.png" },
      { speed: 2.5, height: 50, width: 100, top: 150, startPosition: 650, moveDirection: "left", imgSrc: "./docs/images/Car2-black.png" },
      { speed: 2, height: 50, width: 50, top: 100, startPosition: -100, moveDirection: "right", imgSrc: "./docs/images/Car1-test2-blue.png" },
      { speed: 3.5, height: 50, width: 100, top: 50, startPosition: 650, moveDirection: "left", imgSrc: "./docs/images/truck2.png" }
    ]

    const config = obstaclesDetails[order];
const { speed, height, width, top, startPosition, moveDirection, imgSrc } = config;

    for (let i = 0; i < obstaclesDetails.length; i++) {
      if (order === i && this.obstaclesArray[i].length < 1) {
        this.obstaclesArray[i].push(new Obstacle(this.gameScreen, speed * this.gamespeed, height, width, top, startPosition, moveDirection, imgSrc));
      }
    }

  }

  update() {

    document.body.style.backgroundImage = "url('./docs/images/Background2.png')";

    if (this.coins <= 0) {
      this.endGame();
    }

    if (this.coins === 5) {
      this.victoryGame();
    }

    this.player.stayInPlay();

    if (this.player.gotPrize(this.deliverPizza)) {
      this.pizzaInHand = false;
      this.player.element.src = "./docs/images/playerUp.png";
      pizzaSound.play();
      pizzaSound.loop = false;
    }

    for (let order = 0; order < 10; order++) {
      this.updateGroupObjectsGround(this.obstaclesArray[order], order);
    }

    for (let i = 1; i <= 6; i++) {
      const displayCoin = document.getElementById(`coin-${i}`)
      if (displayCoin) {
        if (i <= this.coins) {
          displayCoin.style.display = "block";
        } else {
          displayCoin.style.display = "none";
        }
      }
    }

    if (this.pizzaInHand === false && this.player.touchDepositArea(this.getPizza) === true) {
      this.pizzaInHand = true;
      this.coins++;
      this.gamespeed += 0.8;
      this.player.element.src = "./docs/images/playerPizzaUp.png";
    }
  }


  endGame() {
    this.player.element.remove();
    this.obstaclesArray.forEach(array => {
      array.forEach(obstacle => {
        obstacle.element.remove();
      })

    });
    this.gameIsOver = true;
    this.gameScreen.style.display = 'none';
    this.gameContainer.style.display = 'none';
    this.endScreen.style.display = 'block';


    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    gameOverSound.play();
  }

  victoryGame() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    winingSong.play();
    this.player.element.remove();
    this.obstaclesArray.forEach(array => {
      array.forEach(obstacle => {
        obstacle.element.remove();
      })
    });

    this.gameIsOver = true;
    this.gameScreen.style.display = 'none';
    this.gameContainer.style.display = 'none';
    this.victoryScreen.style.display = 'block';
  }
}

let backgroundMusic = new Audio("./docs/sounds/game.wma");
let winingSong = new Audio("./docs/sounds/winScreen.wma");
let gameOverSound = new Audio("./docs/sounds/endscreen.mp3")
let gotHitSound = new Audio("./docs/sounds/carHorn.mp3")
let pizzaSound = new Audio("./docs/sounds/pizzaa.mp3")
