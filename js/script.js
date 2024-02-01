window.onload = function () {

  let playButton = document.getElementById('play-button');
  let instructionsButton = document.getElementById('instructions-button');
  let creditsbutton = document.getElementById('credits-button');
  let restartButton = document.querySelectorAll(".restart-button");

  let game;

  playButton.addEventListener('click', function () {
    startGame();
  });

  instructionsButton.addEventListener('click', function () {
    instructions();
  });

  creditsbutton.addEventListener('click', function () {
    credits();
  });

  //querySelectorAll returns a Nodelist and we can iterate through its length using a for loop
  for (let i = 0; i < restartButton.length; i++) {
    let currentRestartButton = restartButton[i];
    currentRestartButton.addEventListener('click', function () {
      location.reload();
    });
  }

  function startGame() {
    game = new Game();
    game.start();
  }

  function instructions() {
    let instructionsScreen = document.getElementById("instructions-screen");
    let startScreen = document.getElementById("start-screen");
    startScreen.style.display = "none";
    instructionsScreen.style.display = "block";
  }

  function credits() {
    let creditsScreen = document.getElementById("credits-screen");
    let startScreen = document.getElementById("start-screen");
    startScreen.style.display = "none";
    creditsScreen.style.display = "block";
  }

  function handleKeyDown(event) {
    const key = event.key;
    const possibleKeystrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown"
    ]

    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();


      if (game && game.pizzaInHand) {
        switch (key) {
          case "ArrowLeft":
            game.player.left += -50;
            game.player.element.src = "./images/playerPizzaLeft.png";
            break;

          case "ArrowUp":
            game.player.top += -50;
            game.player.element.src = "./images/playerPizzaUp.png"
            break;

          case "ArrowRight":
            game.player.left += 50;
            game.player.element.src = "../images/playerPizzaRight.png"
            break;

          case "ArrowDown":
            game.player.top += 50;
            game.player.element.src = "./images/playerPizzaDown.png"
            break;

        }
      }
      if (game && !game.pizzaInHand) {
        switch (key) {
          case "ArrowLeft":
            game.player.left += -50;
            game.player.element.src = "./images/playerLeft.png";

            break;

          case "ArrowUp":
            game.player.top += -50;
            game.player.element.src = "./images/playerUp.png"

            break;

          case "ArrowRight":
            game.player.left += 50;
            game.player.element.src = "./images/playerRight.png"

            break;

          case "ArrowDown":
            game.player.top += 50;
            game.player.element.src = "./images/playerDown.png"

            break;

        }
      }

    }
  }
  window.addEventListener("keydown", handleKeyDown);
};
