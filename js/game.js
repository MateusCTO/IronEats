class Game {
  constructor() {

    // Variables to later refer to the different possible screens of the webpage
    this.startScreen = document.getElementById('start-screen');
    this.gameScreen = document.getElementById('game-screen');
    this.endScreen = document.getElementById('end-screen');
    this.instructionsScreen = document.getElementById('instructions-screen');
    this.creditsScreen = document.getElementById('credits-screen');
    this.victoryScreen = document.getElementById('victory-screen');
    this.gameContainer = document.getElementById('game-container');

    // Creating the zone property where the player acquires the prize
    this.getPrize = new GetPrizeZone(this.gameScreen);

    // Variable for frame count
    this.frameCount = 0;

    // Creating prize deposit zone property
    this.depositPrize = new DepositPrizeZone(this.gameScreen);

    // Player's life system
    this.lives = 3;

    // Controls of the gamespeed
    this.gamespeed = 0.5;


    // Player's score system
    this.score = 0;

    // Visual queue for the score
    this.scoreArray = [];

    // Game State Boolean
    this.gameIsOver = false;

    // game over flag
    this.gameIsOver = false;

    //  player starts with pizza in his hand
    this.prizeInHand = true;

    // Creating the player property
    this.player = new Player(this.gameScreen, 300, 600, 50, 50, "./images/playerPizzaDown.png");

    //might be deprecated, UNSURE
    // Tracker if player is on top of an obstacle)
    // this.playerInObstacle = false;


    // Create the obstacles array of arrays
    this.obstaclesArray = [[], [], [], [], [], [], [], [], [], [], []];

    //define the height and width we want to apply to the gameScreen once game is running 
    this.height = 650;
    this.width = 650;

    // gameScreen will by default have 0x 
    // When variable game is assigned to Game class and initialized, the gameScreen will have the height and width defined above.
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
  }

  // Method to start the game
  start() {

    // Change the  "windows" to display and to disappear
    this.startScreen.style.display = 'none';
    this.endScreen.style.display = 'none';
    this.gameScreen.style.display = 'block';
    this.gameContainer.style.display = 'block';

    // Run the gameloop
    this.gameLoop();
  }

  // Method of the gameloop
  gameLoop() {


    // checks if the game is over to interrupt the game loop, else is just runs the update method
    if (this.gameIsOver) {
      return;
    }

    this.update();

    // javascript magic to make animations and the game update via frames
    window.requestAnimationFrame(() => this.gameLoop());
    // increased the frameCount variable by 1 each time it loops so we can store the current frame as the game is being played
    this.frameCount++;
  }

  // Method that handles the first 5 rows of obstacles (aka the cars)
  // It handles spawns (pushing to obstaclesArray), collision with player and removal of obstacles once they are outside of specified boundaries. 
  updateGroupObjectsGround(arr, order) {

    // Check for collision and position of each obstacle in the given array
    for (let i = 0; i < arr.length; i++) {

      // grabs an obstacle and runs its move method so they actively move throughout the screen
      const obstacle = arr[i];
      obstacle.move();

      // Check if the player collided with an obstacle
      if (this.player.didCollide(obstacle)) {

        // player returns to his starting position
        this.player.left = 300;
        this.player.top = 600;

        // Reduce player's life by 1
        this.lives--;
        // player starts again at the starting piont with the prize in his hand
        this.prizeInHand = true;
        damageSound.play();

      }

      // Check if the obstacle is beyond the given boundaries (either left or right)
      else if (obstacle.left < -100 || obstacle.left + obstacle.width > 750) {

        // Remove the obstacle from the HTML
        obstacle.element.remove();

        // Remove the object from the array
        this.obstaclesArray[order].splice(i, 1);

      }
    }

    //gameScreen, speed, height, width, top, startPosition, moveDirection, imgSrc

    // with the method parameter "order", we specify which object we want to push at a given time and which array inside the main array do we want to push it to.
    // we can control in with frame interval each obstacle spawns in their respective row and the max amount of objects per row
    if (order == 0) {
      if (this.frameCount % 110 / (this.gamespeed * 100) === 0 && this.obstaclesArray[0].length < 3) {
        this.obstaclesArray[0].push(new Obstacle(this.gameScreen, 2 * this.gamespeed, 50, 50, 550, 650, "left", "./images/Car1-test2-green.png"));
      }
    }
     if (order == 1) {
      if (this.frameCount % 130 / (this.gamespeed * 100) === 0 && this.obstaclesArray[1].length < 3) {
        this.obstaclesArray[1].push(new Obstacle(this.gameScreen, 1.5 * this.gamespeed, 50, 50, 500, -100, "right", "./images/Car1-test2.orange.png"));
      }
    }

     if (order == 2) {
      if (this.frameCount % 130 / (this.gamespeed * 100) === 0 && this.obstaclesArray[2].length < 3) {
        this.obstaclesArray[2].push(new Obstacle(this.gameScreen, 2.5 * this.gamespeed, 50, 50, 450, 650, "left", "./images/Car1-test2-blue2.png"));
      }
    }

     if (order == 3) {
      if (this.frameCount % 200 / (this.gamespeed * 100) === 0 && this.obstaclesArray[3].length < 3) {
        this.obstaclesArray[3].push(new Obstacle(this.gameScreen, 2 * this.gamespeed, 50, 50, 400, -100, "right", "./images/Car1-test2-yellow.png"));
      }
    }

     if (order == 4) {
      if (this.frameCount % 130 / (this.gamespeed * 100) === 0 && this.obstaclesArray[4].length < 3) {
        this.obstaclesArray[4].push(new Obstacle(this.gameScreen, 3.5 * this.gamespeed, 50, 100, 350, 650, "left", "./images/truck1.png"));
      }
    }
    if (order == 5) {
      if (this.frameCount % 200 / (this.gamespeed * 20) === 0 && this.obstaclesArray[5].length < 3) {
        this.obstaclesArray[5].push(new Obstacle(this.gameScreen, 2 * this.gamespeed, 50, 100, 250, 650, "left", "./images/boatMedium.png"));
      }
    }

    if (order == 6) {
      if (this.frameCount % 150 / (this.gamespeed * 20) === 0 && this.obstaclesArray[6].length < 3) {
        this.obstaclesArray[6].push(new Obstacle(this.gameScreen, 1.5 * this.gamespeed, 50, 100, 200, -100, "right", "./images/boat1blue.png"));
      }
    }

    if (order == 7) {
      if (this.frameCount % 150 / (this.gamespeed * 20) === 0 && this.obstaclesArray[7].length < 3) {
        this.obstaclesArray[7].push(new Obstacle(this.gameScreen, 2.5 * this.gamespeed, 50, 100, 150, 650, "left", "./images/bigboat1.png"));
      }
    }

    if (order == 8) {
      if (this.frameCount % 150 / (this.gamespeed * 20) === 0 && this.obstaclesArray[8].length < 3) {
        this.obstaclesArray[8].push(new Obstacle(this.gameScreen, 2 * this.gamespeed, 50, 100, 100, -100, "right", "./images/boat1orange.png"));
      }
    }
    if (order == 9) {
      if (this.frameCount % 150 / (this.gamespeed * 20) === 0 && this.obstaclesArray[9].length < 3) {
        this.obstaclesArray[9].push(new Obstacle(this.gameScreen, 3.5 * this.gamespeed, 50, 100, 50, 650, "left", "./images/boatMedium2.png"));
      }
    }

  }

  update() {

    

    // Set background to darken when the the gameScreen is running
    if (this.gameScreen.style.display === "block"
      || this.victoryScreen.style.display === "block"
      || this.endScreen.style.display === "block"
      || this.creditsScreen.style.display === "block"
      || this.instructionsScreen.style.display === "block"
    ) {
      document.body.style.backgroundImage = "url('./images/Background2.png')";
    }

    // Score and lives system
    let score = document.getElementById('score');
    let lives = document.getElementById('lives');


    // End/lose the game if lives are 0
    if (this.lives <= 0) {
      this.endGame();
    }


    if (this.score === 3) {
      this.victoryGame();
    }

    // Player's method for ensuring it stays inside of the gameScreen's boundaries
    this.player.stayInPlay();

    // Check to see if player has collided with the prize zone
    if (this.player.gotPrize(this.getPrize)) {

      // If player did collide, then he will have not the prize in hand.
      this.prizeInHand = false;
      this.player.element.src = "./images/playerUp";
 }

    for (let order = 0; order < 10; order++) {
      this.updateGroupObjectsGround(this.obstaclesArray[order], order);
  }


    // Check the amount of player lives to remove a coin image

    for (let i = 1; i <= 6; i++) {
      const coinElement = document.getElementById(`coin-${i}`);
      if (coinElement) {
          coinElement.style.display = "none";
      }
  }
  
  // Show the number of coins based on the current number of lives
  for (let i = 1; i <= this.lives; i++) {
      const coinElement = document.getElementById(`coin-${i}`);
      if (coinElement) {
          coinElement.style.display = "block"; 
      }
  }

    // Check the ammount of coins to add them
    if (this.score === 1) {
      document.getElementById("coin-4").style.display = "block";
    }
    else if (this.score === 2) {
      document.getElementById("coin-4").style.display = "block";
      document.getElementById("coin-5").style.display = "block";
    }
    else if (this.score === 3) {
      document.getElementById("coin-4").style.display = "block";
      document.getElementById("coin-5").style.display = "block";
      document.getElementById("coin-6").style.display = "block";
    }
   

    // Check if player has deposited the prize at the end zone and returned back to the starting point
    if (this.prizeInHand === false && this.player.touchDepositArea(this.depositPrize) === true) {

      // When player reaches the deposit zone, remove prize in hand, add to total score and increase the overall speed of all obstacles.
      this.prizeInHand = true;
      this.score++;
      this.gamespeed += 0.2;
      this.player.element.src = "./images/playerPizza.png";
      successSound.play()
      console.log(`Game speed has now been increased to${this.gamespeed}`);
    }


  }

  // Method that ends the game
  endGame() {

    // Removes player
    this.player.element.remove();

    // Remove all obstacles from the array of obstacles
    this.obstaclesArray.forEach(array => {

      array.forEach(obstacle => {
        // remove from the HTML
        obstacle.element.remove();
      })

    });

    // variable becomes true
    this.gameIsOver = true;

    // gameScreen and container are no longer displayed
    this.gameScreen.style.display = 'none';
    this.gameContainer.style.display = 'none';

    // show end game screen
    this.endScreen.style.display = 'block';
  }

  // method for victory screen
  victoryGame() {

    // Remove player
    this.player.element.remove();

    // Remove all obstacles from the array of obstacles
    this.obstaclesArray.forEach(array => {

      array.forEach(obstacle => {
        // remove from the HTML
        obstacle.element.remove();
      })

    });

    // variable becomes true
    this.gameIsOver = true;

    // gameScreen and container are no longer displayed
    this.gameScreen.style.display = 'none';
    this.gameContainer.style.display = 'none';


    // show victory game screen
    this.victoryScreen.style.display = 'block';

    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;

    let victoryMusic = new Audio('./audio/victory.wav')
    victoryMusic.play();
  }

}

let backgroundMusic = new Audio('./audio/backgroundSong.wav');
let damageSound = new Audio('./audio/damage.wav');
let pastelSound = new Audio('./audio/pastel.wav');
let successSound = new Audio('./audio/success.wav');